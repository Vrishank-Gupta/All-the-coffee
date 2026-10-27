"""Render a reel HTML file to a 1080x1920 MP4 for Instagram.

Usage: python render-reel.py intro-reel.html intro-reel.mp4

Needs Python Playwright (pip install playwright, then playwright install chromium) and ffmpeg.
The page must define window.seek(t) and skip its live preview when the URL has ?render.
"""
import pathlib
import subprocess
import sys
import tempfile

from playwright.sync_api import sync_playwright

FPS = 30
DURATION = 30

src = pathlib.Path(sys.argv[1]).resolve()
out = pathlib.Path(sys.argv[2]).resolve()

with tempfile.TemporaryDirectory() as frames, sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1080, "height": 1920})
    page.goto(src.as_uri() + "?render")
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(500)
    stage = page.locator("#stage")
    for i in range(FPS * DURATION):
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
