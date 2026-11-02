"""Generate a reel's soundtrack and mix it under the voice. Everything is synthesised here, so
there's no licensed music and no copyright risk.

Usage: python soundtrack.py PAGE.html voice.wav timings.js OUT.wav

- Music: an uplifting major-key groove at 112 BPM (C, G, Am, F): soft pad, plucked arpeggio, bass,
  kick, claps and hats. It starts at full energy on frame 0, and ducks under the voice whenever
  she speaks.
- Hook: an impact and a bright chord stab at 0 s, and a riser into the first cut.
- A whoosh on every scene change (read from the page's .scene data-from attributes and the
  cold-open hook), and a "ding" on the moments listed in the page's <meta name="sfx-ding">
  (sentence positions like "4.05, 6.5"; the website address landing is always one).
- The mix is normalised to -14 LUFS, Instagram's loudness target, with peaks kept under -1 dBFS.
"""
import json
import pathlib
import re
import sys

import numpy as np
import pyloudnorm as pyln
import soundfile as sf
from scipy.signal import butter, sosfilt

SR = 48000
page, voice_path, timings_path, out_path = sys.argv[1:5]
html = pathlib.Path(page).read_text(encoding="utf-8")
T = json.loads(re.search(r"=\s*(\[.*\])", pathlib.Path(timings_path).read_text(), re.S).group(1))
voice, vsr = sf.read(voice_path, dtype="float32")
if voice.ndim > 1:
    voice = voice.mean(axis=1)
if vsr != SR:
    from scipy.signal import resample_poly
    voice = resample_poly(voice, SR, vsr).astype(np.float32)
tail = float(m.group(1)) if (m := re.search(r"tail:\s*([\d.]+)", html)) else 1.5
duration = T[-1]["end"] + tail
N = int(duration * SR)
t = np.arange(N) / SR
rng = np.random.default_rng(7)


def at(v):
    i, f = int(v), v - int(v)
    if i >= len(T):
        return duration
    return T[i]["start"] + f * (T[i]["end"] - T[i]["start"])


def lp(x, hz):
    return sosfilt(butter(2, hz, "low", fs=SR, output="sos"), x)


def hp(x, hz):
    return sosfilt(butter(2, hz, "high", fs=SR, output="sos"), x)


def place(buf, sound, at_s, gain=1.0):
    i = int(at_s * SR)
    if i >= len(buf):
        return
    n = min(len(sound), len(buf) - i)
    buf[i:i + n] += gain * sound[:n]


def env(n, attack, decay):
    e = np.exp(-np.arange(n) / (decay * SR))
    a = int(attack * SR)
    if a:
        e[:a] *= np.linspace(0, 1, a)
    return e


def note(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


# --- Music bed ---------------------------------------------------------------------------------
BPM = 112
beat = 60 / BPM
# C - G - Am - F, two bars each, as MIDI chord tones (root position, middle register)
CHORDS = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]]
BASS = [36, 31, 33, 29]
music = np.zeros(N)
bars = int(duration / (4 * beat)) + 2

# Pad: soft detuned saws through a low-pass, one chord per two bars
for b in range(0, bars, 2):
    c = (b // 2) % 4
    start = b * 4 * beat
    n = int(8 * beat * SR)
    tt = np.arange(n) / SR
    pad = np.zeros(n)
    for m in CHORDS[c]:
        for det in (-0.08, 0.08):
            f = note(m) * 2 ** (det / 12)
            pad += sum(np.sin(2 * np.pi * f * k * tt) / k for k in range(1, 5))
    shape = np.minimum(1, tt / 0.4) * np.minimum(1, (8 * beat - tt) / 0.4)
    place(music, lp(pad, 1800) * shape, start, 0.018)

# Pluck arpeggio on 8th notes: chord tones up an octave, bright and bouncy
pattern = [0, 1, 2, 1, 0, 2, 1, 2]
step = beat / 2
for i in range(int(duration / step) + 1):
    c = int(i * step / (8 * beat)) % 4
    m = CHORDS[c][pattern[i % 8] % 3] + 12
    n = int(0.35 * SR)
    tt = np.arange(n) / SR
    tone = np.sin(2 * np.pi * note(m) * tt) + 0.35 * np.sin(4 * np.pi * note(m) * tt)
    place(music, tone * env(n, 0.003, 0.11), i * step, 0.10)

# Bass: root on 8ths, a little punch
for i in range(int(duration / step) + 1):
    c = int(i * step / (8 * beat)) % 4
    n = int(0.22 * SR)
    tt = np.arange(n) / SR
    f = note(BASS[c])
    tone = np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt)
    place(music, lp(tone, 400) * env(n, 0.004, 0.09), i * step, 0.30)

# Drums: kick on every beat, claps on 2 and 4, hats on the off-beats
for i in range(int(duration / beat) + 1):
    n = int(0.3 * SR)
    tt = np.arange(n) / SR
    sweep = 2 * np.pi * np.cumsum(45 + 90 * np.exp(-tt / 0.03)) / SR
    place(music, np.sin(sweep) * env(n, 0.001, 0.11), i * beat, 0.55)
    if i % 2 == 1:
        nc = int(0.18 * SR)
        clap = sosfilt(butter(2, [900, 3500], "band", fs=SR, output="sos"), rng.standard_normal(nc))
        place(music, clap * env(nc, 0.001, 0.05), i * beat, 0.20)
    nh = int(0.06 * SR)
    place(music, hp(rng.standard_normal(nh), 7000) * env(nh, 0.0005, 0.018), i * beat + beat / 2, 0.10)

# Fade the bed out over the last second
music[-SR:] *= np.linspace(1, 0, SR)

# --- Duck the music under the voice --------------------------------------------------------------
vfull = np.zeros(N)
vfull[:min(N, len(voice))] = voice[:N]
hop = 480
rms = np.sqrt(np.convolve(vfull ** 2, np.ones(hop) / hop, mode="same"))
speaking = np.clip(rms / (np.percentile(rms[rms > 1e-4], 60) + 1e-9), 0, 1)
speaking = sosfilt(butter(1, 4, "low", fs=SR, output="sos"), speaking)  # smooth: ~80 ms
speech_mask = speaking > 0.5
duck = 1.0 - 0.72 * np.clip(speaking, 0, 1)
duck[: int(0.8 * SR)] = 1.0  # the hook's first beat hits at full strength
music *= 0.62 * duck

# --- Effects --------------------------------------------------------------------------------------
fx = np.zeros(N)
# Hook: an impact and a bright chord stab on frame 0
n = int(1.4 * SR)
tt = np.arange(n) / SR
boom = np.sin(2 * np.pi * np.cumsum(32 + 70 * np.exp(-tt / 0.05)) / SR) * env(n, 0.001, 0.35)
crash = hp(rng.standard_normal(n), 2500) * env(n, 0.001, 0.25)
place(fx, boom + 0.25 * crash, 0.0, 0.85)
n = int(0.9 * SR)
tt = np.arange(n) / SR
stab = sum(np.sin(2 * np.pi * note(m + 12) * tt) + 0.4 * np.sin(4 * np.pi * note(m + 12) * tt) for m in CHORDS[0])
place(fx, stab * env(n, 0.002, 0.22), 0.0, 0.22)


def whoosh(length=0.5):
    n = int(length * SR)
    noise = rng.standard_normal(n)
    # a band of noise sweeping up then down, shaped like a breath
    out = np.zeros(n)
    for k, centre in enumerate(np.linspace(600, 5000, 8)):
        seg = slice(int(k * n / 8), int((k + 1) * n / 8))
        out[seg] = sosfilt(butter(2, [centre * 0.7, centre * 1.3], "band", fs=SR, output="sos"), noise[seg])
    shape = np.sin(np.linspace(0, np.pi, n)) ** 2
    return out * shape


hook_end = None
if 'id="hook"' in html:
    m = re.search(r"hookEnd:\s*window\.TIMINGS\[(\d+)\]\.start\s*-\s*([\d.]+)", html)
    hook_end = T[int(m.group(1))]["start"] - float(m.group(2)) if m else 2.2
    # Riser into the first cut
    n = int(1.2 * SR)
    tt = np.arange(n) / SR
    riser = hp(rng.standard_normal(n), 1500) * (tt / tt[-1]) ** 2
    place(fx, riser, hook_end - 1.2, 0.10)
cuts = sorted({float(v) for v in re.findall(r'class="scene[^"]*"\s+data-from="(\d+)"', html)})
cut_times = [T[int(c)]["start"] - 0.15 for c in cuts if int(c) < len(T) and int(c) > 0]
if hook_end:
    cut_times.append(hook_end - 0.2)
for c in sorted(set(round(x, 2) for x in cut_times)):
    place(fx, whoosh(), max(0, c - 0.25), 0.16)


def ding():
    n = int(1.1 * SR)
    tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * 1318.5 * tt) + 0.5 * np.sin(2 * np.pi * 1975.5 * tt) + 0.25 * np.sin(2 * np.pi * 2637 * tt)) * env(n, 0.002, 0.28)


dings = []
if m := re.search(r'<meta name="sfx-ding" content="([^"]+)"', html):
    dings = [float(v) for v in m.group(1).split(",") if v.strip()]
url_at = re.search(r"R\.cta\(t,\s*at\(([\d.]+)\)\)", html)
if url_at:
    dings.append(float(url_at.group(1)) + 0.3)
for d in dings:
    place(fx, ding(), at(d), 0.13)

# --- Mix ------------------------------------------------------------------------------------------
meter = pyln.Meter(SR)
v_l = meter.integrated_loudness(vfull)
m_l = meter.integrated_loudness(music)
mix = vfull + music + fx
# Normalise to -14 LUFS with a soft limiter on peaks only (ceiling about -1 dBFS); repeat because
# limiting lowers the loudness a little each time
for _ in range(5):
    mix = pyln.normalize.loudness(mix, meter.integrated_loudness(mix), -14.0)
    mix = 0.89 * np.tanh(mix / 0.89)
stereo = np.stack([mix, mix], axis=1).astype(np.float32)
sf.write(out_path, stereo, SR)
print(f"Wrote {out_path}: {duration:.1f}s, {len(cut_times)} whooshes, {len(dings)} dings, "
      f"{meter.integrated_loudness(mix):.1f} LUFS, peak {20 * np.log10(np.max(np.abs(mix))):.1f} dBFS, "
      f"music {m_l - v_l:+.1f} dB relative to the voice overall, "
      f"{20 * np.log10(np.sqrt(np.mean(music[speech_mask] ** 2)) / np.sqrt(np.mean(vfull[speech_mask] ** 2))):+.1f} dB while she speaks")
