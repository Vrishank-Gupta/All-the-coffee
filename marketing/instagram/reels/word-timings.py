"""Word start times of a reel voice, for word-by-word captions.

Usage: python word-timings.py voice.wav timings.js words.js [LANGUAGE]

LANGUAGE is Whisper's name for it, english by default (hindi for a Hinglish voice).

timings.js holds window.TIMINGS (one {text, start, end} per sentence, written by build.sh).
Each sentence is cut out of the voice and run through Whisper with word timestamps; words.js
gets window.WORDS, one list of [word, start, end] per sentence, in seconds from the reel start,
and window.LEVELS, the loudness of the voice for each 1/30 s from 0 to 1 (the presenter ring glows with it).
Run with venv-tts (avatar-test/scripts/setup.sh), which has Whisper large-v3-turbo.
"""
import json
import pathlib
import re
import sys

import numpy as np
import soundfile as sf
import torch
from scipy.signal import resample_poly
from transformers import pipeline

MODELS = pathlib.Path.home() / ".cache/atc-avatar/models"
voice, timings_js, words_js = sys.argv[1:4]
lang = sys.argv[4] if len(sys.argv) > 4 else "english"

timings = json.loads(re.search(r"=\s*(\[.*\])", pathlib.Path(timings_js).read_text(), re.S).group(1))
audio, sr = sf.read(voice, dtype="float32")
if audio.ndim > 1:
    audio = audio.mean(axis=1)
asr = pipeline("automatic-speech-recognition", model=str(MODELS / "whisper-large-v3-turbo"),
               torch_dtype=torch.float16, device="cuda")

words = []
for s in timings:
    a, b = max(0, s["start"] - 0.1), s["end"] + 0.1
    clip = resample_poly(audio[int(a * sr):int(b * sr)], 16000, sr).astype("float32")
    out = asr(clip, return_timestamps="word", generate_kwargs={"language": lang})
    row = [[c["text"].strip(), round(a + c["timestamp"][0], 3), round(a + (c["timestamp"][1] or b - a), 3)]
           for c in out["chunks"]]
    print(" ".join(f"{w}@{t0:.2f}" for w, t0, _ in row), flush=True)
    words.append(row)

hop = sr // 30
rms = [float(np.sqrt(np.mean(audio[i:i + hop] ** 2))) for i in range(0, len(audio), hop)]
peak = np.percentile(rms, 98)
levels = [round(min(1.0, r / peak), 2) for r in rms]

pathlib.Path(words_js).write_text(
    "// Word timings and loudness of voice.wav, written by word-timings.py\nwindow.WORDS = "
    + json.dumps(words) + ";\nwindow.LEVELS = " + json.dumps(levels) + ";\n")
print(f"Wrote {words_js}")
