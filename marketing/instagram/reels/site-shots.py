"""Phone-size screenshots of the live site for reels, without the Netlify badge or sticky bars.

Usage: python site-shots.py OUT_DIR
Writes landing.jpg and overview.jpg (780 px wide, 2x of a 390 px phone). Supabase requests are
blocked so the shots do not count as visits in the site's stats. Run with venv-reel.
"""
import pathlib
import subprocess
import sys
import tempfile

from playwright.sync_api import sync_playwright

out = pathlib.Path(sys.argv[1])
out.mkdir(parents=True, exist_ok=True)
HIDE = """for (const e of document.querySelectorAll('body *')) { const p = getComputedStyle(e).position;
  if ((p === 'fixed' || p === 'sticky') && !e.closest('header')) e.style.display = 'none'; }"""
# Page, URL and how much of the top to keep, in CSS pixels
PAGES = [("landing", "https://allthecoffee.in/", 2300), ("overview", "https://allthecoffee.in/overview", 2000)]

with tempfile.TemporaryDirectory() as tmp, sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    page.route("**/*supabase*/**", lambda r: r.abort())
    for name, url, keep in PAGES:
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(2500)
        page.evaluate(HIDE)
        page.screenshot(path=f"{tmp}/{name}.png", full_page=True)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", f"{tmp}/{name}.png", "-vf", f"crop=780:{2 * keep}:0:0",
                        "-q:v", "3", str(out / f"{name}.jpg")], check=True)
    browser.close()
print(f"Wrote {out}/landing.jpg and overview.jpg")
