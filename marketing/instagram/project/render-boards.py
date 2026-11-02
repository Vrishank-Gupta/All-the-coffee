# Renders board HTML files (a #card element, or the board inside <x-dc> in the .dc.html canvas files) to PNG
# and JPEG in out/, for posting.
# Usage: python render-boards.py ShowcaseMethodFeed.html ShowcaseMethodStory.html ...
# Needs Playwright with Chromium. The JPEGs are what publish.py posts (copy them to public/ig/).
import sys, pathlib, subprocess
from playwright.sync_api import sync_playwright

here = pathlib.Path(__file__).parent
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1080, "height": 1920})
    for name in sys.argv[1:]:
        src = (here / name).resolve(); stem = src.stem
        pg.goto(src.as_uri()); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(1000)
        sel = "#card" if pg.locator("#card").count() else "body > x-dc > div"
        card = pg.locator(sel).first
        over = pg.evaluate(f"(() => {{ const c = document.querySelector('{sel}'); return c.scrollHeight > c.clientHeight + 1; }})()")
        png = here / "out" / f"{stem}.png"; card.screenshot(path=str(png))
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(png), "-q:v", "2", str(png.with_suffix(".jpg"))], check=True)
        print(stem, "OVERFLOW" if over else "ok")
    b.close()
