"""Animate the portrait from the voice WAV with EchoMimic V3 Flash, one shot per sentence.

Usage: python animate.py PORTRAIT.png VOICE.wav OUT.mp4 [--seconds N] [--shots pauses|none]
                         [--punch 1.1] [--segment 113] [--seed 43]

Writes OUT.mp4 at the model's native size (576x1008 for the 768x1344 portrait), 25 fps, with the
voice muxed in. finish.sh upscales it to 1080x1920 for Instagram.

Built on infer_flash.py (single clip) and app_mm.py (segment loop) from antgroup/echomimic_v3,
changed to fit 16 GB VRAM and 14 GB RAM: the 11 GB umT5 encoder runs once and is freed before
the video model loads, and frames stream to ffmpeg instead of piling up in RAM. The speech is split
into shots at the pauses between sentences. Each shot starts from the portrait; a shot longer than
one segment (113 frames) chains overlapping segments that restart from the previous segment's last
frames. Every other shot is punched in 10% so the cuts read as jump cuts.
On ROCm the Wan VAE's conv3d layers run as sums of conv2d (rocm_conv3d.py), about 40x faster.

Needs the venv from setup.sh, the echomimic_v3 checkout in $ATC_ECHOMIMIC and models in $ATC_MODELS.
"""
import argparse
import gc
import math
import os
import pathlib
import subprocess
import sys
import time

HOME = pathlib.Path.home() / ".cache/atc-avatar"
MODELS = pathlib.Path(os.environ.get("ATC_MODELS", HOME / "models"))
ECHOMIMIC = pathlib.Path(os.environ.get("ATC_ECHOMIMIC", HOME / "echomimic_v3"))
sys.path.insert(0, str(ECHOMIMIC))
os.chdir(ECHOMIMIC)

import librosa  # noqa: E402
import numpy as np  # noqa: E402
import pyloudnorm as pyln  # noqa: E402
import torch  # noqa: E402
import torch.nn.functional as F  # noqa: E402
from einops import rearrange  # noqa: E402
from omegaconf import OmegaConf  # noqa: E402
from PIL import Image  # noqa: E402
from safetensors.torch import load_file  # noqa: E402
from transformers import AutoTokenizer, Wav2Vec2FeatureExtractor  # noqa: E402

from src.cache_utils import get_teacache_coefficients  # noqa: E402
from src.fm_solvers_unipc import FlowUniPCMultistepScheduler  # noqa: E402
from src.pipeline_wan_fun_inpaint_audio_2512 import WanFunInpaintAudioPipeline  # noqa: E402
from src.utils import filter_kwargs, get_image_to_video_latent3  # noqa: E402
from src.wan_image_encoder import CLIPModel  # noqa: E402
from src.wan_text_encoder import WanT5EncoderModel  # noqa: E402
from src.wan_transformer3d_audio_2512 import WanTransformerAudioMask3DModel  # noqa: E402
from src.wan_vae import AutoencoderKLWan  # noqa: E402
from src.wav2vec2 import Wav2Vec2Model  # noqa: E402
from rocm_conv3d import patch_wan_vae  # noqa: E402

patch_wan_vae()

ap = argparse.ArgumentParser()
ap.add_argument("image")
ap.add_argument("audio")
ap.add_argument("out")
ap.add_argument("--seconds", type=float, default=None, help="only render the first N seconds")
ap.add_argument("--segment", type=int, default=113, help="frames per segment (4k+1)")
ap.add_argument("--overlap", type=int, default=8)
ap.add_argument("--steps", type=int, default=8)
ap.add_argument("--audio-cfg", type=float, default=3.0)
ap.add_argument("--seed", type=int, default=43)
ap.add_argument("--shots", choices=["pauses", "none"], default="pauses",
                help="pauses: restart from the portrait at each pause in the speech; none: one chained shot")
ap.add_argument("--punch", type=float, default=1.1, help="zoom on every other shot, to make the cuts read as edits")
ap.add_argument("--size", type=int, nargs=2, default=[768, 768], help="target pixel area, as in the original")
ap.add_argument("--prompt", default=(
    "A calm, warm, professional Indian woman is talking to the camera, explaining something clearly. "
    "She blinks naturally, moves her head slightly and makes small relaxed hand gestures."
))
args = ap.parse_args()

FPS = 25
dtype = torch.bfloat16
device = "cuda"
flash = MODELS / "EchoMimicV3/echomimicv3-flash-pro/diffusion_pytorch_model.safetensors"
base = MODELS / "Wan2.1-Fun-V1.1-1.3B-InP"
wav2vec_dir = MODELS / "chinese-wav2vec2-base"
config = OmegaConf.load("config/config.yaml")
t0 = time.time()


def fit(n):
    """Round a frame count down to 4k+1, which the Wan VAE needs."""
    return (n - 1) // 4 * 4 + 1


def fit_up(n):
    """Round a frame count up to 4k+1."""
    return (n + 2) // 4 * 4 + 1


def loudness_norm(audio, sr, lufs=-23):
    loudness = pyln.Meter(sr).integrated_loudness(audio)
    return audio if abs(loudness) > 100 else pyln.normalize.loudness(audio, loudness, lufs)


# --- audio features (CPU) ---
speech, sr = librosa.load(args.audio, sr=16000)
if args.seconds:
    speech = speech[: int(args.seconds * sr)]
video_length = fit(int(len(speech) / sr * FPS))
speech = loudness_norm(speech, sr)[: int(video_length / FPS * sr)]
# Each segment restarts from the last frames of the one before, and over several segments the face
# drifts away from the portrait (by 34 s it was visibly a different woman). So the clip is split into
# shots at pauses between sentences; every shot starts again from the portrait and chains at most a
# couple of segments. Shots under 1.5 s are merged into the one before.
cuts = [0]
if args.shots == "pauses":
    voiced = librosa.effects.split(speech, top_db=35, frame_length=1024, hop_length=256)
    for (_, gap_start), (gap_end, _) in zip(voiced[:-1], voiced[1:]):
        cut = round((gap_start + gap_end) / 2 / sr * FPS)
        if (gap_end - gap_start) / sr >= 0.2 and cut - cuts[-1] >= 1.5 * FPS and video_length - cut >= 1.5 * FPS:
            cuts.append(cut)
shots = list(zip(cuts, cuts[1:] + [video_length]))
seg = fit(args.segment)
step = seg - args.overlap
# Audio padded with silence so a shot's last segment can run past the end and be trimmed
render_length = video_length + seg
speech = np.pad(speech, (0, int(render_length / FPS * sr) - len(speech)))
audio_encoder = Wav2Vec2Model.from_pretrained(wav2vec_dir, local_files_only=True)
audio_encoder.feature_extractor._freeze_parameters()
extractor = Wav2Vec2FeatureExtractor.from_pretrained(wav2vec_dir, local_files_only=True)
features = torch.from_numpy(np.squeeze(extractor(speech, sampling_rate=sr).input_values)).float()[None]
with torch.no_grad():
    hidden = audio_encoder(features, seq_len=render_length, output_hidden_states=True).hidden_states
audio_emb = rearrange(torch.stack(hidden[1:], dim=1).squeeze(0), "b s d -> s b d")
# Each frame sees the audio of frames -2..+2 around it, as in infer_flash.py
window = torch.arange(render_length)[:, None] + (torch.arange(5) - 2)[None]
audio_emb = audio_emb[window.clamp(0, audio_emb.shape[0] - 1)][None].to(device, dtype)  # 1 F 5 12 768
del audio_encoder, hidden, features
print(f"audio: {video_length / FPS:.2f}s -> {video_length} frames, embeds {tuple(audio_emb.shape)}", flush=True)
print("shots (s): " + ", ".join(f"{a / FPS:.2f}-{b / FPS:.2f}" for a, b in shots), flush=True)

# --- text embeddings: load the 11 GB umT5 encoder, encode once, free it ---
# The echomimic loaders call .endswith() on their path and, given a Path, fall back silently to an
# fp32 load that needs over 20 GB of RAM, so every path passed to them is a str
tokenizer = AutoTokenizer.from_pretrained(base / config["text_encoder_kwargs"]["tokenizer_subpath"])
_load = torch.load
torch.load = lambda *a, **k: _load(*a, **{**k, "mmap": True, "weights_only": False})
text_encoder = WanT5EncoderModel.from_pretrained(
    str(base / config["text_encoder_kwargs"]["text_encoder_subpath"]),
    additional_kwargs=OmegaConf.to_container(config["text_encoder_kwargs"]),
    low_cpu_mem_usage=True, torch_dtype=dtype,
).eval().to(device)
torch.load = _load


class TextEncoderStub(torch.nn.Module):
    """Stands in for the freed T5: the pipeline only reads its dtype and device. The CPU offload
    hooks need every component to own at least one parameter, hence the placeholder."""
    dtype = torch.bfloat16
    device = torch.device(device)

    def __init__(self):
        super().__init__()
        self.placeholder = torch.nn.Parameter(torch.zeros(1, dtype=torch.bfloat16), requires_grad=False)


class Embeds(list):
    """encode_prompt returns a list of tensors, but __call__ and check_inputs read .shape."""
    @property
    def shape(self):
        return (len(self),)


vae = AutoencoderKLWan.from_pretrained(
    str(base / config["vae_kwargs"]["vae_subpath"]), additional_kwargs=OmegaConf.to_container(config["vae_kwargs"])
).to(dtype)
scheduler_kwargs = OmegaConf.to_container(config["scheduler_kwargs"])
scheduler_kwargs["shift"] = 1
scheduler = FlowUniPCMultistepScheduler(**filter_kwargs(FlowUniPCMultistepScheduler, scheduler_kwargs))
pipe = WanFunInpaintAudioPipeline(transformer=None, vae=vae, tokenizer=tokenizer,
                                  text_encoder=text_encoder, scheduler=scheduler, clip_image_encoder=None)
with torch.no_grad():
    # The Flash sampler's guidance only drops the audio, so the negative text is never used
    prompt_embeds = Embeds(pipe.encode_prompt(args.prompt, None, False, device=device, dtype=dtype)[0])
del pipe, text_encoder
gc.collect()
torch.cuda.empty_cache()
print(f"text encoded and T5 freed at {time.time() - t0:.0f}s", flush=True)

# --- video model ---
transformer = WanTransformerAudioMask3DModel.from_pretrained(
    str(base), transformer_additional_kwargs=OmegaConf.to_container(config["transformer_additional_kwargs"]),
    low_cpu_mem_usage=True, torch_dtype=dtype,
)
# The audio layers are not in the Wan base checkpoint, so they are still meta tensors here;
# assign=True puts the Flash tensors in place instead of copying into them (a no-op on meta)
missing, unexpected = transformer.load_state_dict(load_file(flash), strict=False, assign=True)
transformer.to(dtype)
still_meta = [n for n, p in transformer.named_parameters() if p.is_meta]
print(f"flash weights: missing {len(missing)}, unexpected {len(unexpected)}, still empty {len(still_meta)}", flush=True)
assert not still_meta, still_meta[:5]
clip = CLIPModel.from_pretrained(str(base / config["image_encoder_kwargs"]["image_encoder_subpath"])).to(dtype).eval()
pipe = WanFunInpaintAudioPipeline(transformer=transformer, vae=vae, tokenizer=tokenizer,
                                  text_encoder=TextEncoderStub(), scheduler=scheduler, clip_image_encoder=clip)
# Each model moves to the GPU only while it runs. On ROCm the Wan VAE's conv3d asks MIOpen for a
# 5-6 GiB workspace, which only fits when the transformer and CLIP are back on the CPU
pipe.enable_model_cpu_offload(device=device)
coefficients = get_teacache_coefficients(str(base))
if coefficients is not None:
    pipe.transformer.enable_teacache(coefficients, args.steps, 0.1, num_skip_start_steps=5, offload=False)
print(f"models loaded at {time.time() - t0:.0f}s", flush=True)

# --- shots ---
ref = Image.open(args.image).convert("RGB")
w, h = ref.size
scale = math.sqrt(w * h / (args.size[0] * args.size[1]))
height, width = int(h / scale // 16 * 16), int(w / scale // 16 * 16)
_, _, clip_image = get_image_to_video_latent3(ref, None, video_length=1, sample_size=[height, width])
generator = torch.Generator(device=device).manual_seed(args.seed)

# Finished frames go straight to ffmpeg as 8-bit RGB; holding the whole clip as float32 tensors
# needs over 12 GB of RAM by the last segment and gets the process killed on a 14 GB machine.
# Only the last `overlap` frames of each segment stay in memory, to blend with the next one.
out = pathlib.Path(args.out).resolve()
encoder = subprocess.Popen(
    ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{width}x{height}",
     "-r", str(FPS), "-i", "-", "-i", args.audio, "-t", f"{video_length / FPS:.3f}", "-map", "0:v", "-map", "1:a",
     "-c:v", "libx264", "-crf", "14", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", str(out)],
    stdin=subprocess.PIPE)
written = 0


def write(frames):
    """Send frames (C F H W floats in 0-1) to ffmpeg."""
    global written
    rgb = (frames.permute(1, 2, 3, 0).clamp(0, 1) * 255).round().to(torch.uint8).numpy()
    encoder.stdin.write(rgb.tobytes())
    written += frames.shape[1]


def punch_in(frames, zoom):
    """Crop to 1/zoom of the frame, centred, a little above the middle (her face), and scale back."""
    c, f, h, w = frames.shape
    ch, cw = round(h / zoom), round(w / zoom)
    y0, x0 = round((h - ch) * 0.3), (w - cw) // 2
    crop = frames[:, :, y0:y0 + ch, x0:x0 + cw].permute(1, 0, 2, 3)
    return F.interpolate(crop, size=(h, w), mode="bicubic", antialias=True).permute(1, 0, 2, 3)


def render_shot(first, n):
    """Yield the n frames of a shot starting at frame `first`, as C F H W chunks, from the portrait."""
    start_images, done, tail = ref, first, None
    ramp = torch.linspace(0, 1, args.overlap + 2)[1:-1].view(1, -1, 1, 1)
    while True:
        remaining = n - (done - first)
        length = seg if remaining > seg else fit_up(remaining)
        input_video, input_mask, _ = get_image_to_video_latent3(
            start_images, None, video_length=length, sample_size=[height, width])
        ts = time.time()
        with torch.no_grad():
            sample = pipe(
                prompt_embeds=prompt_embeds, negative_prompt_embeds=prompt_embeds,
                num_frames=length, audio_embeds=audio_emb[:, done:done + length], audio_scale=1.0,
                height=height, width=width, generator=generator,
                guidance_scale=6.0, audio_guidance_scale=args.audio_cfg, neg_scale=1.0, neg_steps=0,
                num_inference_steps=args.steps, video=input_video, mask_video=input_mask,
                clip_image=clip_image, cfg_skip_ratio=0.0, shift=5.0,
            ).videos[0]
        print(f"segment frames {done}-{done + length - 1} ({width}x{height}) took {time.time() - ts:.0f}s, "
              f"peak {torch.cuda.max_memory_allocated() / 2**30:.1f} GiB", flush=True)
        if tail is not None:
            sample[:, :args.overlap] = tail * (1 - ramp) + sample[:, :args.overlap] * ramp
        if remaining <= seg:
            yield sample[:, :remaining]
            return
        yield sample[:, :-args.overlap]
        tail = sample[:, -args.overlap:].clone()
        start_images = [Image.fromarray((tail[:, i].permute(1, 2, 0) * 255).numpy().astype(np.uint8))
                        for i in range(args.overlap)]
        done += step


for i, (a, b) in enumerate(shots):
    for frames in render_shot(a, b - a):
        write(punch_in(frames, args.punch) if i % 2 and args.punch != 1 else frames)

encoder.stdin.close()
encoder.wait()
assert encoder.returncode == 0, "ffmpeg failed"
print(f"Wrote {out}: {written} frames ({written / FPS:.2f}s) in {time.time() - t0:.0f}s total")
