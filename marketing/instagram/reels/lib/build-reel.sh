#!/usr/bin/env bash
# Build one of the v2 reels (tool reels 4 to 8, and reels 9 to 11 on the Builder's Method and Role Playbooks).
# Usage: bash lib/build-reel.sh REEL_DIR PAGE.html SPEAKER LANGUAGE [HOLD_FRAME]
#   e.g. bash lib/build-reel.sh ctc-salary ctc-reel.html Rani hindi
#   (HOLD_FRAME can also come from a file called hold-frame in the reel folder)
#        bash lib/build-reel.sh whatsapp-desk wa-reel.html Mary english 0
# The voice and the presenter are made first, by the GPU jobs in NOTES.md (make_voice.py into
# ~/.cache/atc-avatar/out/<name>-voice, infinitetalk.py into <name>-avatar.mp4). If that avatar
# video exists, she is put in the ring; HOLD_FRAME is the frame shown after her video ends (0 = last).
set -euo pipefail
cd "$(dirname "$0")/.."
R=$1; PAGE=$2; SPK=$3; LANG=$4; HOLD=${5:-0}
# A reel folder can name its hold frame in a file called hold-frame (chosen by eye: eyes open, not mid-blink)
[ "$HOLD" = 0 ] && [ -f "$R/hold-frame" ] && HOLD=$(cat "$R/hold-frame")
V=~/.cache/atc-avatar
export PATH=~/.cache/atc-node/bin:$PATH HIP_VISIBLE_DEVICES=0
declare -A NAME=([ctc-salary]=ctc [whatsapp-desk]=wa [offer-letters]=letters [invoice-reader]=inv [contract-check]=contract [brief-builder]=brief [trap-catalogue]=trap [role-playbooks]=playbooks)
# The finished videos all go in reels/new-reels, named by reel number
declare -A FINAL=([ctc-salary]=reel-4-ctc-calculator-hinglish [whatsapp-desk]=reel-5-whatsapp-follow-ups-english [offer-letters]=reel-6-offer-letters-hinglish [invoice-reader]=reel-7-invoice-pdfs-english [contract-check]=reel-8-contract-check-hinglish [brief-builder]=reel-9-brief-builder-hinglish [trap-catalogue]=reel-10-trap-catalogue-english [role-playbooks]=reel-11-role-playbooks-english)
N=${NAME[$R]}
cd "$R"

# 1. The voice and its sentence timings
cp $V/out/$N-voice/voice-$SPK.wav voice.wav
cp $V/out/$N-voice/voice-$SPK.txt voice-whisper-check.txt
{ echo "// Sentence timings of voice.wav, written by build-reel.sh"; echo -n "window.TIMINGS = "; cat $V/out/$N-voice/voice-$SPK.json; echo ";"; } > timings.js

# 2. Word timings and loudness, for captions and the presenter ring
$V/venv-tts/bin/python ../word-timings.py voice.wav timings.js words.js "$LANG"

# 3. Numbers from the site's own tool code, if this reel has a data step
[ -f make-data.ts ] && npx -y tsx make-data.ts

# 4. Frames (with the presenter, if there is one), then the voice padded to the end
AV=$V/out/$N-avatar.mp4
if [ -f "$AV" ]; then
  [ "$HOLD" = 0 ] && HOLD=$(ffprobe -v error -count_frames -select_streams v -show_entries stream=nb_read_frames -of csv=p=0 "$AV")
  $V/venv-reel/bin/python ../render-reel.py "$PAGE" $V/out/$N-screens.mp4 "$AV" "$HOLD"
else
  $V/venv-reel/bin/python ../render-reel.py "$PAGE" $V/out/$N-screens.mp4
fi
mkdir -p ../new-reels
OUT=../new-reels/${FINAL[$R]}.mp4
# 5. The soundtrack (generated music, whooshes, dings) mixed under the voice, then the final video
$V/venv-tts/bin/python ../lib/soundtrack.py "$PAGE" voice.wav timings.js $V/out/$N-mix.wav
ffmpeg -y -loglevel error -i $V/out/$N-screens.mp4 -i $V/out/$N-mix.wav \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$OUT"
echo "Wrote $(cd ../new-reels && pwd)/${FINAL[$R]}.mp4"
