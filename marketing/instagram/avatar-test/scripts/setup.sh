#!/usr/bin/env bash
# One-time setup for the avatar test on the CachyOS desktop (AMD RX 9070 XT, ROCm).
# Creates four venvs, ComfyUI and every model in ~/.cache/atc-avatar (about 50 GB downloaded).
# Nothing here needs an account: every model below is ungated on Hugging Face.
# Run on the host, not inside the VS Code Flatpak sandbox: flatpak-spawn --host bash setup.sh
# Safe to rerun: finished downloads are skipped, partial ones resume.
set -euo pipefail
ROOT=~/.cache/atc-avatar
M=$ROOT/models
K=$ROOT/wheels
mkdir -p "$M" "$K"
command -v uv >/dev/null || curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH=$HOME/.local/bin:$PATH UV_HTTP_TIMEOUT=600

# The network here stalls often and uv/hf give up on big files, so large files go through curl:
# resume with -C -, restart on a stall (<10 KB/s for 60 s), check sha256, mark done with .ok
fetch() {
  local url=$1 out=$2 sha=$3
  [ -f "$out.ok" ] && return
  until curl -fL -C - --speed-limit 10000 --speed-time 60 --connect-timeout 30 -s -o "$out" "$url"; do
    echo "$(date +%T) stalled at $(stat -c %s "$out" 2>/dev/null) bytes: $out"; sleep 5
  done
  if echo "$sha  $out" | sha256sum -c --quiet; then touch "$out.ok"; else mv "$out" "$out.bad"; echo "bad hash: $out"; exit 1; fi
}

# PyTorch 2.10.0 for ROCm 7.0, Python 3.11 (about 4.8 GB)
P=https://download-r2.pytorch.org/whl/rocm7.0
fetch "$P/torch-2.10.0%2Brocm7.0-cp311-cp311-manylinux_2_28_x86_64.whl" $K/torch-2.10.0+rocm7.0-cp311-cp311-manylinux_2_28_x86_64.whl f2e673a40d0c724a1713ca953d4a17eafb01b689c3aeb271aa4f4d30d7b69d6f
fetch "$P/torchvision-0.25.0%2Brocm7.0-cp311-cp311-manylinux_2_28_x86_64.whl" $K/torchvision-0.25.0+rocm7.0-cp311-cp311-manylinux_2_28_x86_64.whl 09ba2df764003906279b2dbd46e2fe2ab7e09756c836040c5a8d0b1e78078cda
fetch "$P/torchaudio-2.10.0%2Brocm7.0-cp311-cp311-manylinux_2_28_x86_64.whl" $K/torchaudio-2.10.0+rocm7.0-cp311-cp311-manylinux_2_28_x86_64.whl 377da741429b302de8710113f8e105737f515d890bcf146f151d451f81b152f9
TORCH=($K/torch-2.10.0+rocm7.0-*.whl $K/torchvision-0.25.0+rocm7.0-*.whl $K/torchaudio-2.10.0+rocm7.0-*.whl
       --extra-index-url $P --index-strategy unsafe-best-match)

# venv-main: the portrait (diffusers SDXL) and ComfyUI, which runs InfiniteTalk
[ -d "$ROOT/venv-main" ] || uv venv -p 3.11 "$ROOT/venv-main"
VIRTUAL_ENV=$ROOT/venv-main uv pip install "${TORCH[@]}" "diffusers==0.34.0" "transformers==4.51.3" accelerate \
  safetensors sentencepiece pillow
C=$ROOT/comfyui
if [ ! -d "$C" ]; then
  git clone -q https://github.com/comfyanonymous/ComfyUI.git "$C"
  git clone -q https://github.com/kijai/ComfyUI-WanVideoWrapper.git "$C/custom_nodes/ComfyUI-WanVideoWrapper"
  git clone -q https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git "$C/custom_nodes/ComfyUI-VideoHelperSuite"
  git clone -q https://github.com/kijai/ComfyUI-KJNodes.git "$C/custom_nodes/ComfyUI-KJNodes"
fi
git -C "$C" checkout -q 08cf028
git -C "$C/custom_nodes/ComfyUI-WanVideoWrapper" checkout -q 088128b
git -C "$C/custom_nodes/ComfyUI-VideoHelperSuite" checkout -q 4d907be
git -C "$C/custom_nodes/ComfyUI-KJNodes" checkout -q 2371136
# Routes every 3D convolution through rocm_conv3d.py (see NOTES.md)
ln -sfn "$(cd "$(dirname "$0")" && pwd)/comfy_rocm_patch" "$C/custom_nodes/comfy_rocm_patch"
# Keep the ROCm torch: ComfyUI's requirements would otherwise pull the CUDA build
grep -v -E "^torch(vision|audio)?$" "$C/requirements.txt" > "$ROOT/comfy-req.txt"
printf 'torch==2.10.0+rocm7.0\ntorchvision==0.25.0+rocm7.0\ntorchaudio==2.10.0+rocm7.0\n' > "$ROOT/keep-torch.txt"
VIRTUAL_ENV=$ROOT/venv-main uv pip install -c "$ROOT/keep-torch.txt" --find-links "$K" -r "$ROOT/comfy-req.txt" \
  -r "$C/custom_nodes/ComfyUI-WanVideoWrapper/requirements.txt" \
  -r "$C/custom_nodes/ComfyUI-VideoHelperSuite/requirements.txt" -r "$C/custom_nodes/ComfyUI-KJNodes/requirements.txt"
cat > "$C/extra_model_paths.yaml" <<YAML
atc:
  base_path: $ROOT/comfy-models
  diffusion_models: diffusion_models
  loras: loras
  clip_vision: clip_vision
YAML

# venv-tts: Indic Parler-TTS pins transformers 4.46.1, so it gets its own venv
[ -d "$ROOT/venv-tts" ] || uv venv -p 3.11 "$ROOT/venv-tts"
VIRTUAL_ENV=$ROOT/venv-tts uv pip install "${TORCH[@]}" \
  "parler-tts @ git+https://github.com/huggingface/parler-tts.git@d108732cd57788ec86bc857d99a6cabd66663d68" \
  jiwer pyloudnorm soundfile scipy librosa

# venv-ls: LatentSync 1.6 (optional lip-sync pass), with MediaPipe in place of insightface
[ -d "$ROOT/latentsync" ] || git clone -q https://github.com/bytedance/LatentSync.git "$ROOT/latentsync"
git -C "$ROOT/latentsync" checkout -q a229c39
[ -d "$ROOT/venv-ls" ] || uv venv -p 3.11 "$ROOT/venv-ls"
VIRTUAL_ENV=$ROOT/venv-ls uv pip install "${TORCH[@]}" \
  diffusers==0.32.2 transformers==4.48.0 decord==0.6.0 accelerate==0.26.1 einops==0.7.0 omegaconf==2.3.0 \
  opencv-python==4.9.0.80 mediapipe==0.10.11 python_speech_features==0.6 librosa==0.10.1 scenedetect==0.6.1 \
  ffmpeg-python==0.2.0 imageio==2.31.1 imageio-ffmpeg==0.5.1 kornia==0.8.0 DeepCache==0.1.1 numpy==1.26.4 \
  huggingface-hub==0.30.2

# venv-reel: Playwright, for rendering reel pages to video (reels/render-reel.py)
[ -d "$ROOT/venv-reel" ] || uv venv -p 3.11 "$ROOT/venv-reel"
VIRTUAL_ENV=$ROOT/venv-reel uv pip install playwright
"$ROOT/venv-reel/bin/playwright" install chromium

# Models. Use one --include per pattern: a bare filename after --include is taken as a file to
# download and the other patterns are silently dropped.
H="uvx --from huggingface_hub[hf_xet] hf download"
cd "$M"
$H SG161222/RealVisXL_V5.0 --include "unet/diffusion_pytorch_model.fp16.safetensors" --include "vae/*.fp16.safetensors" \
  --include "text_encoder*/model.fp16.safetensors" --include "*.json" --include "tokenizer*/*" --local-dir RealVisXL_V5.0
# Byte-identical ungated mirror of ai4bharat/indic-parler-tts (Apache-2.0); the official repo
# needs a Hugging Face login. Same sha256 for model.safetensors (c68daecb...2c90).
$H naklitechie/indic-parler-tts --local-dir indic-parler-tts
$H google/flan-t5-large --include "*.json" --include "spiece.model" --local-dir flan-t5-large
$H openai/whisper-large-v3-turbo --include "*.json" --include "*.txt" --include "model.safetensors" --local-dir whisper-large-v3-turbo

# InfiniteTalk on Wan 2.1 I2V 14B (quantised GGUF), with the 4-step lightx2v LoRA
D=$ROOT/comfy-models
mkdir -p $D/diffusion_models $D/loras $D/clip_vision
HF=https://huggingface.co
fetch $HF/city96/Wan2.1-I2V-14B-480P-gguf/resolve/main/wan2.1-i2v-14b-480p-Q4_K_M.gguf $D/diffusion_models/wan2.1-i2v-14b-480p-Q4_K_M.gguf d91f7139acadb42ea05cdf97b311e5099f714f11fbe4d90916500e2f53cbba82
fetch $HF/Kijai/WanVideo_comfy_GGUF/resolve/main/InfiniteTalk/Wan2_1-InfiniteTalk_Single_Q8.gguf $D/diffusion_models/Wan2_1-InfiniteTalk_Single_Q8.gguf c5e251c56174995d940494ec02fdf9d36da00dffdde6827829801cd171fe8ffd
fetch $HF/Kijai/WanVideo_comfy/resolve/main/Lightx2v/lightx2v_I2V_14B_480p_cfg_step_distill_rank64_bf16.safetensors $D/loras/lightx2v_I2V_14B_480p_cfg_step_distill_rank64_bf16.safetensors 85c4a61c30e0497aa44b91d93a893b624708461a56fe5485183b28fa07e2dfb3
fetch $HF/Comfy-Org/Wan-2.1/resolve/main/split_files/clip_vision/clip_vision_h.safetensors $D/clip_vision/clip_vision_h.safetensors 64a7ef761bfccbadbaa3da77366aac4185a6c58fa5de5f589b42a65bcc21f161
$H Kijai/WanVideo_comfy umt5-xxl-enc-bf16.safetensors --local-dir "$C/models/text_encoders"
$H Kijai/WanVideo_comfy Wan2_1_VAE_bf16.safetensors --local-dir "$C/models/vae"
$H TencentGameMate/chinese-wav2vec2-base --include "*.json" --include "pytorch_model.bin" \
  --local-dir "$C/models/transformers/TencentGameMate/chinese-wav2vec2-base"

# LatentSync 1.6 inference weights
L=$ROOT/latentsync/checkpoints
mkdir -p $L/whisper $L/sd-vae-ft-mse
fetch $HF/ByteDance/LatentSync-1.6/resolve/main/whisper/tiny.pt $L/whisper/tiny.pt 65147644a518d12f04e32d6f3b26facc3f8dd46e5390956a9424a650c0ce22b9
fetch $HF/ByteDance/LatentSync-1.6/resolve/main/latentsync_unet.pt $L/latentsync_unet.pt 0a478e89eb660f82da4c35dbdde8a5adfb27f99d1b4e50edd03729e1e98316d3
fetch $HF/stabilityai/sd-vae-ft-mse/resolve/main/diffusion_pytorch_model.safetensors $L/sd-vae-ft-mse/diffusion_pytorch_model.safetensors a1d993488569e928462932c8c38a0760b874d166399b14414135bd9c42df5815
curl -fsL $HF/stabilityai/sd-vae-ft-mse/resolve/main/config.json -o $L/sd-vae-ft-mse/config.json

uv cache clean -q || true
echo "Setup done. Models in $M and $D"
