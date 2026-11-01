"""Synthesise the presenter voice with Indic Parler-TTS, sentence by sentence.

Usage: python make_voice.py OUT_DIR SPEAKER [TAKES] [SCRIPT.txt]

For each sentence it generates TAKES takes, transcribes each with Whisper and keeps the
take whose transcript best matches what the sentence should sound like. The kept takes are
joined with short pauses into OUT_DIR/voice-<speaker>.wav (44.1 kHz mono), a report of
every take's transcript goes to OUT_DIR/voice-<speaker>.txt, and the start and end of each
sentence in the WAV go to OUT_DIR/voice-<speaker>.json (for captions and scene timing).

SCRIPT.txt has one sentence per line: what the TTS reads | what a listener should hear |
optional pause after it in seconds. Without it, the avatar test script below is used.

Set VOICE_STYLE to change the delivery (default: calm and warm). For a Hindi or Hinglish script, set VOICE_LANG=hindi: write the TTS side in Devanagari and the
expected side as Whisper writes Hinglish (Devanagari, with English terms such as VLOOKUP in Latin
letters); takes are then scored by character error rate, which copes with the mixed scripts.

Needs venv-tts from setup.sh and models in $ATC_MODELS (default ~/.cache/atc-avatar/models).
"""
import json
import os
import pathlib
import re
import sys

import jiwer
import numpy as np
import pyloudnorm as pyln
import soundfile as sf
import torch
from parler_tts import ParlerTTSForConditionalGeneration
from scipy.signal import resample_poly
from transformers import AutoTokenizer, pipeline, set_seed

MODELS = pathlib.Path(os.environ.get("ATC_MODELS", pathlib.Path.home() / ".cache/atc-avatar/models"))
out_dir = pathlib.Path(sys.argv[1])
speaker = sys.argv[2]
takes = int(sys.argv[3]) if len(sys.argv) > 3 else 6
script = pathlib.Path(sys.argv[4]) if len(sys.argv) > 4 else None
out_dir.mkdir(parents=True, exist_ok=True)
LANG = os.environ.get("VOICE_LANG", "english")

# (what the TTS reads, what a listener should hear). The left side spells out the words
# TTS tends to get wrong; the right side is the script from CLAUDE.md, used for scoring.
SENTENCES = [
    ("Hi, I'm with All The Coffee.", "Hi, I'm with All The Coffee."),
    ("If you've ever used Chat G P T to rewrite an email, you're already halfway there.",
     "If you've ever used ChatGPT to rewrite an email, you're already halfway there."),
    ("In Chapter One, you build a meeting cost calculator in about twenty minutes, right in your browser.",
     "In Chapter one, you build a meeting cost calculator in about twenty minutes, right in your browser."),
    ("Whether it's G S T R two B reconciliation, or a messy Excel export, AI can help, as long as you check its work.",
     "Whether it's GSTR two B reconciliation or a messy Excel export, AI can help, as long as you check its work."),
    ("Chapters zero to three are free.", "Chapters zero to three are free."),
    ("The rest is a one-time five hundred and ninety-nine rupees.",
     "The rest is a one time five hundred and ninety nine rupees."),
    ("Start free at all the coffee dot in.", "Start free at all the coffee dot in."),
]
PAUSE_S = 0.32
pauses = [PAUSE_S] * len(SENTENCES)
if script:
    rows = [[f.strip() for f in line.split("|")] for line in script.read_text().splitlines() if line.strip()]
    SENTENCES = [(r[0], r[1] if len(r) > 1 and r[1] else r[0]) for r in rows]
    pauses = [float(r[2]) if len(r) > 2 else PAUSE_S for r in rows]

# VOICE_STYLE replaces the delivery part of the description, e.g. "a cheerful, lively and warm voice".
STYLE = os.environ.get("VOICE_STYLE", "a calm, warm and clear voice with a moderate pace and a balanced pitch, slightly expressive")
DESCRIPTION = (
    f"{speaker} speaks in {STYLE}, like a friendly presenter. The recording is of very high quality, "
    "close-mic, with no background noise."
)


def normalise(text):
    if LANG != "english":
        return re.sub(r"[^a-z0-9\u0900-\u0963\u0966-\u097f]", "", text.lower())
    text = text.lower().replace("-", " ")
    text = re.sub(r"\bg\.? ?s\.? ?t\.? ?r\b", "gstr", text)
    text = re.sub(r"\bchat ?g\.? ?p\.? ?t\.?\b", "chatgpt", text)
    text = text.replace("96", "ninety six").replace("12", "twelve").replace("chapter 9", "chapter nine")
    text = text.replace("allthecoffee", "all the coffee").replace("2b", "two b").replace("1", "one")
    text = text.replace("599", "five hundred and ninety nine").replace(".in", " dot in")
    return " ".join(re.sub(r"[^a-z0-9' ]", " ", text).split())


device = "cuda"
model = ParlerTTSForConditionalGeneration.from_pretrained(MODELS / "indic-parler-tts").to(device)
tokenizer = AutoTokenizer.from_pretrained(MODELS / "indic-parler-tts")
description_tokenizer = AutoTokenizer.from_pretrained(MODELS / "flan-t5-large")
sr = model.config.sampling_rate
asr = pipeline("automatic-speech-recognition", model=str(MODELS / "whisper-large-v3-turbo"),
               torch_dtype=torch.float16, device=device)

desc = description_tokenizer(DESCRIPTION, return_tensors="pt").to(device)
pieces, report, timings = [], [], []
t = 0.25
for i, (spoken, expected) in enumerate(SENTENCES):
    best = None
    for take in range(takes):
        set_seed(100 * i + take)
        prompt = tokenizer(spoken, return_tensors="pt").to(device)
        audio = model.generate(input_ids=desc.input_ids, attention_mask=desc.attention_mask,
                               prompt_input_ids=prompt.input_ids, prompt_attention_mask=prompt.attention_mask,
                               do_sample=True, temperature=1.0).cpu().numpy().squeeze().astype(np.float32)
        heard = asr(resample_poly(audio, 16000, sr).astype(np.float32),
                    generate_kwargs={"language": LANG})["text"].strip()
        score = jiwer.wer if LANG == "english" else jiwer.cer
        wer = score(normalise(expected), normalise(heard))
        report.append(f"[{i}.{take}] wer={wer:.2f} {len(audio) / sr:.1f}s | {heard}")
        print(report[-1], flush=True)
        if best is None or wer < best[0]:
            best = (wer, audio, take)
    report.append(f"  -> sentence {i} keeps take {best[2]} (wer {best[0]:.2f})")
    # Trim leading/trailing near-silence so the pauses between sentences are even
    audio = best[1]
    loud = np.flatnonzero(np.abs(audio) > 0.01)
    if len(loud):
        audio = audio[max(loud[0] - int(0.03 * sr), 0): loud[-1] + int(0.08 * sr)]
    timings.append({"text": expected, "start": round(t, 3), "end": round(t + len(audio) / sr, 3)})
    t += (len(audio) + int(pauses[i] * sr)) / sr
    pieces += [audio, np.zeros(int(pauses[i] * sr), np.float32)]

voice = np.concatenate([np.zeros(int(0.25 * sr), np.float32)] + pieces)
voice = pyln.normalize.loudness(voice, pyln.Meter(sr).integrated_loudness(voice), -16.0)
voice = np.clip(voice, -0.98, 0.98)
sf.write(out_dir / f"voice-{speaker}.wav", voice, sr)
(out_dir / f"voice-{speaker}.json").write_text(json.dumps(timings, indent=1) + "\n")
(out_dir / f"voice-{speaker}.txt").write_text(DESCRIPTION + "\n\n" + "\n".join(report) + "\n")
print(f"Wrote {out_dir / f'voice-{speaker}.wav'} ({len(voice) / sr:.1f}s)")
