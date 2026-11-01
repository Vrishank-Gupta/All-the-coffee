#!/usr/bin/env bash
# Build the Chapter 5 GSTR-2B reel (Hinglish voice, no presenter) to gst-reel.mp4 (1080x1920).
# Run on the host (flatpak-spawn --host bash build.sh) after avatar-test/scripts/setup.sh. Needs
# Node (for make-data.ts) on PATH or in ~/.cache/atc-node. Steps whose output already exists are
# skipped; delete a file to redo that step. Changing only gst-reel.html needs just step 4.
set -euo pipefail
cd "$(dirname "$0")"
V=~/.cache/atc-avatar
S=../../avatar-test/scripts
export HIP_VISIBLE_DEVICES=0 PATH=~/.cache/atc-node/bin:$PATH

# 1. Voice: Indic Parler-TTS speaker Rani in Hinglish, best of 4 takes per sentence by Whisper
if [ ! -f voice.wav ]; then
  VOICE_LANG=hindi $V/venv-tts/bin/python $S/make_voice.py $V/out/gst-voice Rani 4 script.txt
  cp $V/out/gst-voice/voice-Rani.wav voice.wav
  cp $V/out/gst-voice/voice-Rani.txt voice-whisper-check.txt
  { echo "// Sentence timings of voice.wav, written by build.sh"; echo -n "window.TIMINGS = "
    cat $V/out/gst-voice/voice-Rani.json; echo ";"; } > timings.js
  rm -f words.js
fi

# 2. Word timings and loudness, for the word-by-word captions
[ -f words.js ] || $V/venv-tts/bin/python ../word-timings.py voice.wav timings.js words.js hindi

# 3. The sample files and what the chapter's reconciler makes of them
npx -y tsx make-data.ts

# 4. Screens and captions, then the voice, padded with silence to the end of the screens
$V/venv-reel/bin/python ../render-reel.py gst-reel.html $V/out/gst-screens.mp4
ffmpeg -y -loglevel error -i $V/out/gst-screens.mp4 -i voice.wav -filter_complex "[1:a]apad[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart gst-reel.mp4
echo "Wrote $(pwd)/gst-reel.mp4"
