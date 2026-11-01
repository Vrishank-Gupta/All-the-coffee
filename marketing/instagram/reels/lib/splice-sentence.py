"""Replace one sentence of a finished reel voice, without regenerating the others.

Usage: python splice-sentence.py VOICE_DIR SPEAKER SCRIPT.txt INDEX NEW_TAKE_DIR

VOICE_DIR holds voice-<SPEAKER>.wav and .json from make_voice.py. NEW_TAKE_DIR holds the same files
for a one-line script with the new wording (make_voice.py run on just that line). The new sentence
replaces sentence INDEX (counting from 0); every later sentence moves by the difference in length,
and the json timings are updated to match. SCRIPT.txt must already have the new line at INDEX.
"""
import json
import pathlib
import sys

import numpy as np
import soundfile as sf

vdir, spk, script, idx, newdir = pathlib.Path(sys.argv[1]), sys.argv[2], pathlib.Path(sys.argv[3]), int(sys.argv[4]), pathlib.Path(sys.argv[5])
audio, sr = sf.read(vdir / f"voice-{spk}.wav", dtype="float32")
timings = json.loads((vdir / f"voice-{spk}.json").read_text())
new_audio, sr2 = sf.read(newdir / f"voice-{spk}.wav", dtype="float32")
new_t = json.loads((newdir / f"voice-{spk}.json").read_text())[0]
assert sr == sr2

old = timings[idx]
piece = new_audio[int(new_t["start"] * sr):int(new_t["end"] * sr)]
a, b = int(old["start"] * sr), int(old["end"] * sr)
out = np.concatenate([audio[:a], piece, audio[b:]])
delta = len(piece) / sr - (old["end"] - old["start"])

expected = [l.split("|")[1].strip() for l in script.read_text(encoding="utf-8").splitlines() if l.strip()]
timings[idx] = {"text": expected[idx], "start": old["start"], "end": round(old["start"] + len(piece) / sr, 3)}
for t in timings[idx + 1:]:
    t["start"] = round(t["start"] + delta, 3)
    t["end"] = round(t["end"] + delta, 3)

sf.write(vdir / f"voice-{spk}.wav", out, sr)
(vdir / f"voice-{spk}.json").write_text(json.dumps(timings, indent=1) + "\n")
report = vdir / f"voice-{spk}.txt"
report.write_text(report.read_text() + f"\nSentence {idx} replaced by a new take ({len(piece) / sr:.1f}s):\n" + (newdir / f"voice-{spk}.txt").read_text())
print(f"Replaced sentence {idx}: {old['end'] - old['start']:.2f}s -> {len(piece) / sr:.2f}s; voice is now {len(out) / sr:.1f}s")
