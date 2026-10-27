"""Add the voiceover to a rendered reel.

Usage: python add-voiceover.py intro-reel.mp4 intro-reel-voiceover.mp4 path/to/kokoro-model-folder

Each line is spoken by Kokoro's bm_george voice (British English male), which runs locally and
offline, and placed at its start time so it lines up with the scenes in intro-reel.html.
If you change a line, check it still ends before the next one starts; the script stops if it doesn't.

Needs ffmpeg, pip install kokoro-onnx soundfile, and kokoro-v1.0.onnx plus voices-v1.0.bin in the
model folder (from https://github.com/thewh1teagle/kokoro-onnx/releases, model-files-v1.0).
"""
import pathlib
import shutil
import subprocess
import sys
import tempfile

import espeakng_loader
import soundfile
from kokoro_onnx import EspeakConfig, Kokoro

VOICE = "bm_george"
LANG = "en-gb"
SPEED = 0.95
# (start in seconds, line)
LINES = [
    (0.2, "You've used ChatGPT to rewrite an email. And that's about it."),
    (6.0, "Here's the next step. Describe a tool in plain English, and AI builds it."),
    (12.6, "In Chapter 1, you build a meeting cost calculator, in about twenty minutes."),
    (18.7, "Then you learn to check it, fix it, and use it at work."),
    (22.85, "The first four chapters are free. No card."),
    (26.55, "You're not behind. Link in bio."),
]
TRIM = ("silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
        "silenceremove=start_periods=1:start_threshold=-45dB,areverse")

video = pathlib.Path(sys.argv[1]).resolve()
out = pathlib.Path(sys.argv[2]).resolve()
models = pathlib.Path(sys.argv[3]).resolve()


def duration(path):
    return float(subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True).stdout)


with tempfile.TemporaryDirectory() as tmp:
    # espeak silently ignores data paths over its length limit, and a venv path is often too long,
    # so give it a copy at a short temporary path
    espeak_data = shutil.copytree(espeakng_loader.get_data_path(), f"{tmp}/esd")
    kokoro = Kokoro(str(models / "kokoro-v1.0.onnx"), str(models / "voices-v1.0.bin"),
                    espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(), data_path=espeak_data))
    clips = []
    for i, (start, text) in enumerate(LINES):
        raw, wav = f"{tmp}/raw{i}.wav", f"{tmp}/l{i}.wav"
        samples, rate = kokoro.create(text, voice=VOICE, speed=SPEED, lang=LANG)
        soundfile.write(raw, samples, rate)
        # Cut the silence around each line so the start times are exact
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-af", TRIM,
                        "-ar", "44100", "-ac", "2", wav], check=True)
        end = start + duration(wav)
        limit = LINES[i + 1][0] if i + 1 < len(LINES) else 30
        print(f"Line {i + 1}: {start:.2f}s to {end:.2f}s")
        if end > limit:
            sys.exit(f"Line {i + 1} ends at {end:.2f}s, after {limit}s. Shorten it or move its start.")
        clips.append((start, wav))

    inputs, filters = [], []
    for i, (start, wav) in enumerate(clips):
        inputs += ["-i", wav]
        ms = int(start * 1000)
        filters.append(f"[{i + 1}]adelay={ms}|{ms}[v{i}]")
    mix = "".join(f"[v{i}]" for i in range(len(clips)))
    filters.append(f"{mix}amix=inputs={len(clips)}:normalize=0,apad,atrim=0:30,loudnorm=I=-14:TP=-1.5[a]")
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(video), *inputs,
         "-filter_complex", ";".join(filters), "-map", "0:v", "-map", "[a]",
         "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-movflags", "+faststart", str(out)],
        check=True,
    )
print(f"Wrote {out}")
