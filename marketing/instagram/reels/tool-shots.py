"""Phone-size screenshots of /tools pages for the reels, from a running copy of the site.

Usage: python tool-shots.py BASE_URL OUT_DIR slug [slug ...]
e.g.   python tool-shots.py http://127.0.0.1:5199 tool-shots ctc-calculator whatsapp-follow-ups
Writes OUT_DIR/<slug>.jpg (780 px wide, the top 1,800 CSS pixels). Supabase requests are blocked so
the shots don't count as visits. Run with venv-reel.
"""
import pathlib
import subprocess
import sys
import tempfile

from playwright.sync_api import sync_playwright

base, out, slugs = sys.argv[1], pathlib.Path(sys.argv[2]), sys.argv[3:]
out.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory() as tmp, sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    page.route("**/*supabase*/**", lambda r: r.abort())
    # Three made-up follow-ups, so the WhatsApp desk isn't empty in the shot (numbers aren't shown)
    page.goto(f"{base}/tools", wait_until="networkidle")
    page.evaluate("""() => localStorage.setItem('atc-whatsapp-desk-v1', JSON.stringify({ template: 'Hi {name}, just following up on {about}. Is today a good time for a quick call?', leads: [
      { id: '1', name: 'Anita Desai', phone: '9800000001', about: 'the renewal', due: '2026-10-28', done: false },
      { id: '2', name: 'Rahul Verma', phone: '9800000002', about: 'quotation #A-104', due: '2026-11-01', done: false },
      { id: '3', name: 'Vikram Singh', phone: '9800000003', about: 'samples', due: '2026-11-09', done: false } ] }))""")
    for slug in slugs:
        page.goto(f"{base}/tools/{slug}", wait_until="networkidle")
        if slug == "invoice-reader":
            page.get_by_role("button", name="Try 12 sample invoices").click()
            page.wait_for_timeout(4000)
        page.wait_for_timeout(800)
        page.screenshot(path=f"{tmp}/{slug}.png", full_page=True)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", f"{tmp}/{slug}.png", "-vf", "crop=780:min(ih\\,3600):0:0",
                        "-q:v", "3", str(out / f"{slug}.jpg")], check=True)
    browser.close()
print(f"Wrote {len(slugs)} shots to {out}")
