#!/usr/bin/env bash
# Build the Chapter 9 reel: voice, presenter, then the animated screens with her in them, to ch9-reel.mp4 (1080x1920).
# Run on the host (flatpak-spawn --host bash build.sh) after avatar-test/scripts/setup.sh, with a
# ComfyUI server running as in avatar-test/NOTES.md. Steps whose output already exists are skipped;
# delete a file to redo that step.
set -euo pipefail
cd "$(dirname "$0")"
V=~/.cache/atc-avatar
S=../../avatar-test/scripts
export HIP_VISIBLE_DEVICES=0

# 1. Voice: best of 6 takes per sentence, plus each sentence's start and end for captions and scenes
if [ ! -f voice.wav ]; then
  $V/venv-tts/bin/python $S/make_voice.py $V/out/ch9-voice Mary 6 script.txt
  cp $V/out/ch9-voice/voice-Mary.wav voice.wav
  cp $V/out/ch9-voice/voice-Mary.txt voice-whisper-check.txt
  { echo "// Sentence timings of voice.wav, written by build.sh"; echo -n "window.TIMINGS = "
    cat $V/out/ch9-voice/voice-Mary.json; echo ";"; } > timings.js
  rm -f words.js
fi

# 2. Presenter: a square head-and-shoulders crop of the portrait, animated by InfiniteTalk
[ -f $V/out/ch9-avatar.mp4 ] || $V/venv-main/bin/python $S/infinitetalk.py ../../avatar-test/portrait.png voice.wav \
  $V/out/ch9-avatar.mp4 --size 576 576 --crop 35 60 615 640

# 3. Word timings and loudness for the captions and the presenter ring
[ -f words.js ] || $V/venv-tts/bin/python ../word-timings.py voice.wav timings.js words.js

# 4. Phone screenshots of allthecoffee.in for the closing scenes (delete site/ to refresh them)
[ -f site/landing.jpg ] || $V/venv-reel/bin/python ../site-shots.py site

# 5. Screens, captions and the presenter, from ch9-reel.html. After her video ends the page
#    holds frame 979, where her eyes are open (the last frame is mid-blink).
$V/venv-reel/bin/python ../render-reel.py ch9-reel.html $V/out/ch9-screens.mp4 $V/out/ch9-avatar.mp4 979

# 6. Add the voice, padded with silence to the end of the screens
ffmpeg -y -loglevel error -i $V/out/ch9-screens.mp4 -i voice.wav -filter_complex "[1:a]apad[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart ch9-reel.mp4
echo "Wrote $(pwd)/ch9-reel.mp4"
