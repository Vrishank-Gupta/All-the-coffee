# AI presenter test (October 2026)

A test of whether a believable presenter can be made locally, free, with no accounts. The first reel built with her is in `../reels/ch9-merge/`.

Files here:
- `portrait.png`: the presenter, generated (she does not exist). Seed 2002 of 16 candidates.
- `voice-whisper-check.txt`: every voice take of the test script, what Whisper heard, and which take was kept.
- The test video (`final.mp4`, 1080x1920, 34.2 s, one continuous InfiniteTalk shot) and its voice (`voice.wav`) were deleted after review to save space; regenerate them with the commands at the end of this file.
- `scripts/`: everything needed to regenerate it (see the end of this file).

## Pipeline

| Step | Model | Licence | Settings |
|---|---|---|---|
| Face | RealVisXL V5.0 (SDXL), fp16 | OpenRAIL++ (commercial use allowed, with use restrictions) | 768x1344, 30 steps, DPM++ SDE Karras, CFG 4.5 |
| Voice | Indic Parler-TTS (ungated mirror `naklitechie/indic-parler-tts`, same sha256 as `ai4bharat/indic-parler-tts`) | Apache-2.0 | speaker Mary, "calm, warm and clear voice with a moderate pace", 6 sampled takes per sentence |
| Voice check | Whisper large-v3-turbo | MIT | keeps the take per sentence with the lowest word error rate |
| Animation | InfiniteTalk (single, Q8 GGUF by Kijai) on Wan 2.1 I2V 14B 480p (Q4_K_M GGUF by city96), lightx2v I2V 4-step distill LoRA rank 64, CLIP vision H, umt5-xxl text encoder, audio from chinese-wav2vec2-base | Apache-2.0 for all of these; wav2vec2 is MIT | 480x848, 6 steps, CFG 1, shift 11, dpm++_sde, 81-frame windows with 9 motion frames, seed 2, tiled VAE |
| Finish | ffmpeg | | Lanczos to 1920 high, centre crop to 1080 wide, light unsharp, CRF 20 |

Run through ComfyUI (commit 08cf028) with ComfyUI-WanVideoWrapper (088128b), ComfyUI-VideoHelperSuite (4d907be) and ComfyUI-KJNodes (2371136). `scripts/infinitetalk.py` builds the workflow from the wrapper's InfiniteTalk example and submits it to a running ComfyUI server. Software: torch 2.10.0+rocm7.0, Python 3.11 via uv. Hardware: RX 9070 XT 16 GB, 14 GB RAM, CachyOS.

InfiniteTalk renders long audio as 81-frame windows, each continuing from the last 9 frames of the one before, with the portrait as a reference throughout. That is why the video has no cuts.

No face restore was used. A LatentSync 1.6 lip-sync pass is set up (`scripts/lipsync.py`, with MediaPipe Face Mesh, Apache-2.0, in place of LatentSync's insightface detector, whose models are non-commercial), but it was not applied: the owner judged InfiniteTalk's mouth and movement natural enough, and the pass would cost another GPU hour per video. Its face alignment was checked on a frame and lands correctly.

## The first attempt: EchoMimic V3 (rejected)

The first version used EchoMimic V3 Flash on Wan2.1-Fun 1.3B (`scripts/animate.py`, kept for reference; its models are no longer in `setup.sh`, see git history before 31 Oct 2026). Chained segments drifted into a visibly different woman within 34 s, so each sentence had to restart from the portrait, which gave a jump cut every few seconds. The owner's verdict: "lip movement is not natural at all, teeth look unnatural as well, video looks like multiple cuts". InfiniteTalk replaced it.

## Render time

- Portraits: about 30 s each.
- Voice: about 20 minutes for 42 takes plus Whisper.
- Animation: 64 minutes for 34 s (12 windows of about 4 to 5.5 minutes each). The first run on a machine also spends about 30 minutes encoding the prompt with the 11 GB text encoder, which swaps on 14 GB of RAM; the result is cached on disk, so later runs skip it.
- Finish: under a minute.

## What had to change to run on AMD (ROCm) with 14 GB of RAM

- The SDXL VAE runs out of GPU memory on ROCm, so `make_portrait.py` decodes it on the CPU.
- MIOpen's 3D convolutions are very slow on this card. `rocm_conv3d.py` rewrites each one as a sum of 2D convolutions (same output to within about 1e-4, about 40x faster), and the `comfy_rocm_patch` custom node applies it inside ComfyUI. ComfyUI must be started with `COMFYUI_ENABLE_MIOPEN=1`, or it disables MIOpen on AMD.
- 20 of the 40 transformer blocks are kept in system RAM (block swap). Fewer runs the GPU out of memory; 30 fills the 14 GB of RAM and the machine swaps to a crawl.
- An untiled VAE decode ran out of VRAM after 6 windows (memory fragmentation; PyTorch's `expandable_segments` is not supported on ROCm). The fix is the tiled VAE plus writing each window's frames to disk instead of holding 34 s of frames in RAM. `PYTORCH_HIP_ALLOC_CONF=garbage_collection_threshold:0.8,max_split_size_mb:512` is also set.
- `HIP_VISIBLE_DEVICES=0`, because the integrated GPU is also a ROCm device.

## Pronunciation (what Whisper heard in the kept take)

| Term | Fed to TTS as | Heard as | Notes |
|---|---|---|---|
| ChatGPT | "Chat G P T" | ChatGPT | 2 of 6 takes were wrong ("Chats GPT", "ChartGPT") |
| Chapter 1 | "Chapter One" | Chapter 1 | all takes right |
| GSTR-2B | "G S T R two B" | GSTR 2B | 3 of 6 takes ran it together or misread it |
| Excel | "Excel" | Excel | all takes right |
| ₹599 | "five hundred and ninety-nine rupees" | 599 rupees | all takes right |
| allthecoffee.in | "all the coffee dot in" | all the coffee.in | all takes right |

Whisper confirms the words are intelligible. It does not judge prosody or accent: listen for that. One trap found on the reel: "It's year-end" was heard as "It's your end" in all 6 takes, so it became "It's the end of the year".

## Honest assessment

What works:
- One continuous shot with no cuts. She blinks, moves her head and eyebrows, and changes expression; mouth shapes follow the words (open vowels, rounded "o", near-closed consonants), clearly better than EchoMimic. The owner's verdict: "she looks okay, movements are natural".
- The small bindi from the portrait now survives in the video.
- Every word in the script is intelligible, including the hard ones.
- Everything runs locally for free, with no accounts.

Visible flaws:
- **Mild identity drift.** Over 34 s her face gets a little narrower and younger-looking, with larger eyes and higher eyebrows. Much less than EchoMimic, but visible side by side with the first frame.
- **Occasional off expressions.** A few frames show a frown or squint that does not fit a calm, warm presenter, and some mouth openings are wider than natural.
- **Resolution.** Rendered at 480x848 and upscaled, so skin is smooth and teeth are soft at full size. Much less noticeable on a phone, and hidden almost entirely when she is shown small.
- **No hands.** The frame holds head to chest; there are no gestures.
- **Voice prosody.** Clear, but the pauses between sentences are set by script, and the delivery is even rather than lively.

Compared with hosted tools such as HeyGen: those render natively at 1080p with sharp teeth, steady identity, gestures and more natural voices, and take minutes instead of an hour. This local result is not at that level full-screen. It is good enough as a smaller presenter next to on-screen content, which is how the reels use her: the owner's direction is a tool demo on screen with her in a corner, and at that size the drift and softness mostly disappear.

## Rules for using her

- Turn on Instagram's "AI info" label on every post that shows her. The reels also say "AI-generated presenter" under her.
- She is a presenter for the course. Never present her as a real learner, a real instructor or a testimonial.

## Regenerating

Run everything on the host, outside the VS Code Flatpak sandbox (`flatpak-spawn --host bash -c '...'`).

```
bash scripts/setup.sh                       # venvs, ComfyUI and about 50 GB of models in ~/.cache/atc-avatar
V=~/.cache/atc-avatar
$V/venv-main/bin/python scripts/make_portrait.py $V/out/portraits 8 2000     # seeds 2000-2007
$V/venv-tts/bin/python scripts/make_voice.py $V/out/voice Mary 6
# ComfyUI server, left running in another terminal:
cd $V/comfyui && PYTORCH_HIP_ALLOC_CONF=garbage_collection_threshold:0.8,max_split_size_mb:512 \
  COMFYUI_ENABLE_MIOPEN=1 HIP_VISIBLE_DEVICES=0 $V/venv-main/bin/python main.py --listen 127.0.0.1 --port 8188 --cache-none
$V/venv-main/bin/python scripts/infinitetalk.py portrait.png $V/out/voice/voice-Mary.wav $V/out/raw.mp4
bash scripts/finish.sh $V/out/raw.mp4 $V/out/voice/voice-Mary.wav final.mp4
# Optional lip-sync pass on the 1080x1920 result:
$V/venv-ls/bin/python scripts/lipsync.py final.mp4 voice.wav final-lipsync.mp4
```

TTS sampling is seeded, but GPU kernels are not fully deterministic, so a rerun can pick slightly different takes and render slightly different frames.
