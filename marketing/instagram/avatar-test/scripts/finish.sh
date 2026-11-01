#!/usr/bin/env bash
# Upscale the native render (480x848 from InfiniteTalk, 576x1008 from EchoMimic) to 1080x1920
# H.264 + AAC for Instagram. Both are a touch wider than 9:16, so they are scaled to 1920 high and
# centre-cropped to 1080 wide rather than squashed.
# Usage: finish.sh IN.mp4 VOICE.wav OUT.mp4
# Lanczos plus a light unsharp mask. CRF 20: the detail only goes up to the source width, and
# Instagram re-encodes anyway, so a lower CRF only makes the file bigger.
set -euo pipefail
ffmpeg -y -loglevel error -i "$1" -i "$2" \
  -map 0:v -map 1:a -shortest \
  -vf "scale=-2:1920:flags=lanczos,crop=1080:1920,unsharp=5:5:0.4:5:5:0.0,format=yuv420p" \
  -c:v libx264 -preset slow -crf 20 -profile:v high -r 25 \
  -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart "$3"
echo "Wrote $3"
