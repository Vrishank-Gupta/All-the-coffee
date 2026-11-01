"""Animate the portrait from the voice WAV with InfiniteTalk (Wan 2.1 I2V 14B), through ComfyUI.

Usage: python infinitetalk.py PORTRAIT.png VOICE.wav OUT.mp4 [--seconds N] [--size 480 848]

Needs a ComfyUI server (default http://127.0.0.1:8188) with ComfyUI-WanVideoWrapper,
ComfyUI-VideoHelperSuite, ComfyUI-KJNodes and comfy_rocm_patch, and the models from setup.sh.
Follows the wrapper's example_workflows/wanvideo_2_1_14B_I2V_InfiniteTalk_example_03.json, changed
for ROCm (sdpa attention instead of sageattn, bf16 instead of fp16_fast) and for a 9:16 presenter.

InfiniteTalk renders long audio as 81-frame windows that each continue from the last 9 frames of
the one before, with the portrait as a reference throughout, so there are no cuts. Each window is
decoded with the tiled VAE and written to disk as PNGs (holding 34 s of frames in memory and an
untiled decode ran a 16 GB card out of VRAM after 6 windows), then ffmpeg joins them with the
voice into OUT.mp4 at the render size; finish.sh upscales it to 1080x1920.
"""
import argparse
import json
import os
import pathlib
import shutil
import subprocess
import time
import urllib.request
import uuid

from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("image")
ap.add_argument("audio")
ap.add_argument("out")
ap.add_argument("--seconds", type=float, default=None, help="only render the first N seconds")
ap.add_argument("--size", type=int, nargs=2, default=[480, 848], help="width height, multiples of 16")
ap.add_argument("--crop", type=int, nargs=4, default=[40, 0, 616, 1024],
                help="left top right bottom crop of the portrait before resizing (head to waist, 9:16)")
ap.add_argument("--steps", type=int, default=6)
ap.add_argument("--seed", type=int, default=2)
ap.add_argument("--blocks-to-swap", type=int, default=20,
                help="transformer blocks kept on the CPU; more than about 24 fills 14 GB of RAM and swaps")
ap.add_argument("--server", default="http://127.0.0.1:8188")
ap.add_argument("--comfy", default=os.environ.get("ATC_COMFY", pathlib.Path.home() / ".cache/atc-avatar/comfyui"))
ap.add_argument("--prompt", default=(
    "A calm, warm, professional Indian woman talks to the camera in her home office, explaining "
    "something clearly, with natural facial expressions, blinking and small head movements."
))
args = ap.parse_args()

NEGATIVE = (
    "bright tones, overexposed, static, blurred details, subtitles, style, works, paintings, images, "
    "static, overall gray, worst quality, low quality, JPEG compression residue, ugly, incomplete, "
    "extra fingers, poorly drawn hands, poorly drawn faces, deformed, disfigured, misshapen limbs, "
    "fused fingers, still picture, messy background, three legs, many people in the background, "
    "walking backwards"
)
width, height = args.size
comfy = pathlib.Path(args.comfy)
tag = uuid.uuid4().hex[:8]
frames_dir = pathlib.Path(args.out).resolve().parent / f"frames-{tag}"

# Inputs go into ComfyUI's input folder: the cropped portrait and the (optionally trimmed) voice
(comfy / "input").mkdir(exist_ok=True)
image_name, audio_name = f"atc-{tag}.png", f"atc-{tag}.wav"
Image.open(args.image).convert("RGB").crop(args.crop).save(comfy / "input" / image_name)
trim = ["-t", str(args.seconds)] if args.seconds else []
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", args.audio, *trim, str(comfy / "input" / audio_name)],
               check=True)

prompt = {
    "image": {"class_type": "LoadImage", "inputs": {"image": image_name}},
    "resize": {"class_type": "ImageResizeKJv2", "inputs": {
        "image": ["image", 0], "width": width, "height": height, "upscale_method": "lanczos",
        "keep_proportion": "crop", "pad_color": "0, 0, 0", "crop_position": "center", "divisible_by": 16,
        "device": "cpu"}},
    "audio": {"class_type": "LoadAudio", "inputs": {"audio": audio_name}},
    "wav2vec": {"class_type": "DownloadAndLoadWav2VecModel", "inputs": {
        "model": "TencentGameMate/chinese-wav2vec2-base", "base_precision": "fp16", "load_device": "main_device"}},
    "audio_embeds": {"class_type": "MultiTalkWav2VecEmbeds", "inputs": {
        "wav2vec_model": ["wav2vec", 0], "audio_1": ["audio", 0], "normalize_loudness": True,
        "num_frames": 2000, "fps": 25.0, "audio_scale": 1.0, "audio_cfg_scale": 1.0, "multi_audio_type": "para"}},
    "clip_vision": {"class_type": "CLIPVisionLoader", "inputs": {"clip_name": "clip_vision_h.safetensors"}},
    "clip_embeds": {"class_type": "WanVideoClipVisionEncode", "inputs": {
        "clip_vision": ["clip_vision", 0], "image_1": ["resize", 0], "strength_1": 1.0, "strength_2": 1.0,
        "crop": "center", "combine_embeds": "average", "force_offload": True, "tiles": 0, "ratio": 0.5}},
    "vae": {"class_type": "WanVideoVAELoader", "inputs": {
        "model_name": "Wan2_1_VAE_bf16.safetensors", "precision": "bf16"}},
    "image_embeds": {"class_type": "WanVideoImageToVideoMultiTalk", "inputs": {
        "vae": ["vae", 0], "width": width, "height": height, "frame_window_size": 81, "motion_frame": 9,
        "force_offload": False, "colormatch": "disabled", "start_image": ["resize", 0], "tiled_vae": True,
        "clip_embeds": ["clip_embeds", 0], "mode": "infinitetalk", "output_path": str(frames_dir)}},
    "text": {"class_type": "WanVideoTextEncodeCached", "inputs": {
        "model_name": "umt5-xxl-enc-bf16.safetensors", "precision": "bf16", "positive_prompt": args.prompt,
        "negative_prompt": NEGATIVE, "quantization": "disabled", "use_disk_cache": True, "device": "gpu"}},
    "infinitetalk": {"class_type": "MultiTalkModelLoader", "inputs": {"model": "Wan2_1-InfiniteTalk_Single_Q8.gguf"}},
    "lora": {"class_type": "WanVideoLoraSelect", "inputs": {
        "lora": "lightx2v_I2V_14B_480p_cfg_step_distill_rank64_bf16.safetensors", "strength": 1.0,
        "low_mem_load": False, "merge_loras": False}},
    "block_swap": {"class_type": "WanVideoBlockSwap", "inputs": {
        "blocks_to_swap": args.blocks_to_swap, "offload_img_emb": False, "offload_txt_emb": False,
        "use_non_blocking": False, "vace_blocks_to_swap": 0, "prefetch_blocks": 0, "block_swap_debug": False}},
    "model": {"class_type": "WanVideoModelLoader", "inputs": {
        "model": "wan2.1-i2v-14b-480p-Q4_K_M.gguf", "base_precision": "bf16", "quantization": "disabled",
        "load_device": "offload_device", "attention_mode": "sdpa", "block_swap_args": ["block_swap", 0],
        "lora": ["lora", 0], "multitalk_model": ["infinitetalk", 0]}},
    "sampler": {"class_type": "WanVideoSampler", "inputs": {
        "model": ["model", 0], "image_embeds": ["image_embeds", 0], "text_embeds": ["text", 0],
        "multitalk_embeds": ["audio_embeds", 0], "steps": args.steps, "cfg": 1.0, "shift": 11.0,
        "seed": args.seed, "force_offload": True, "scheduler": "dpm++_sde", "riflex_freq_index": 0,
        "denoise_strength": 1.0, "batched_cfg": False, "rope_function": "comfy", "start_step": 0,
        "end_step": -1, "add_noise_to_samples": True}},
    "frames": {"class_type": "WanVideoPassImagesFromSamples", "inputs": {"samples": ["sampler", 0]}},
    # with output_path set the sampler returns a dummy tensor; this preview only makes ComfyUI run the graph
    "save": {"class_type": "PreviewImage", "inputs": {"images": ["frames", 0]}},
}


def api(path, data=None):
    req = urllib.request.Request(args.server + path, data=json.dumps(data).encode() if data else None,
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as r:
        return json.load(r)


t0 = time.time()
prompt_id = api("/prompt", {"prompt": prompt, "client_id": tag})["prompt_id"]
print(f"queued {prompt_id}", flush=True)
while True:
    time.sleep(10)
    entry = api(f"/history/{prompt_id}").get(prompt_id)
    if entry and entry.get("status", {}).get("completed") is not None:
        break
status = entry["status"]
if status.get("status_str") != "success":
    raise SystemExit(f"ComfyUI failed: {json.dumps(status.get('messages'), indent=1)[-3000:]}")
# the wrapper writes the frames to a timestamped folder inside output_path
frames = sorted(frames_dir.glob("*/frame_*.png"))
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", "25",
                "-i", str(frames[0].parent / "frame_%05d.png"), "-i", str(comfy / "input" / audio_name),
                "-c:v", "libx264", "-crf", "12", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
                "-shortest", args.out], check=True)
shutil.rmtree(frames_dir)
for name in (image_name, audio_name):
    (comfy / "input" / name).unlink()
print(f"Wrote {args.out} in {time.time() - t0:.0f}s")
