"""Render a reel HTML file to a 1080x1920 MP4 for Instagram.

Usage: python render-reel.py PAGE.html OUT.mp4 [PRESENTER.mp4 [HOLD_FRAME]]

Needs Python Playwright (pip install playwright, then playwright install chromium) and ffmpeg.
The page must define window.seek(t) and skip its live preview when the URL has ?render. It can
set window.DURATION in seconds; otherwise the reel is 30 seconds long.

With a presenter video, its frames are handed to the page through window.setAvatar(dir, count,
fps, hold), and seek(t) returns a promise that settles once her frame for t is loaded. After the
video ends the page shows frame HOLD_FRAME (1-based; default the last one).
"""
import json
import pathlib
import subprocess
import sys
import tempfile

from playwright.sync_api import sync_playwright

FPS = 30

src = pathlib.Path(sys.argv[1]).resolve()
out = pathlib.Path(sys.argv[2]).resolve()
presenter = pathlib.Path(sys.argv[3]).resolve() if len(sys.argv) > 3 else None

with tempfile.TemporaryDirectory(dir=out.parent) as tmp, sync_playwright() as p:
    frames = pathlib.Path(tmp)
    browser = p.chromium.launch(args=["--allow-file-access-from-files"])
    page = browser.new_page(viewport={"width": 1080, "height": 1920})
    page.goto(src.as_uri() + "?render")
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(500)
    if presenter:
        av = frames / "avatar"
        av.mkdir()
        subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(presenter), "-q:v", "2", f"{av}/f%05d.jpg"], check=True)
        count = len(list(av.glob("f*.jpg")))
        rate = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries", "stream=r_frame_rate",
                               "-of", "csv=p=0", str(presenter)], capture_output=True, text=True, check=True).stdout.strip()
        num, den = map(int, rate.split("/"))
        hold = int(sys.argv[4]) if len(sys.argv) > 4 else count
        page.evaluate(f"window.setAvatar({json.dumps(av.as_uri())}, {count}, {num / den}, {hold})")
    duration = page.evaluate("window.DURATION || 30")
    stage = page.locator("#stage")
    for i in range(round(FPS * duration)):
        page.evaluate(f"window.seek({i / FPS})")
        stage.screenshot(path=f"{frames}/f{i:04d}.png")
    browser.close()
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", f"{frames}/f%04d.png",
         # Silent stereo track, so Instagram treats it as a normal video you can add music to
         "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-shortest",
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "slow",
         "-c:a", "aac", "-movflags", "+faststart", str(out)],
        check=True,
    )
print(f"Wrote {out}")
