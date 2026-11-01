"""Publish a reel to @all.the_coffee through the Instagram Graph API.

Usage:
  python publish.py check
  python publish.py reel VIDEO.mp4 "Reel 3" [--ai] [--cover-ms=27900] [--yes]

check   shows which account the token reaches, to test the setup.
reel    uploads VIDEO.mp4 straight from this machine (resumable upload, no public URL needed)
        with the caption from the captions.md section whose heading starts with the given name,
        e.g. "Reel 3". --ai turns on Instagram's "AI info" label (is_ai_generated); use it for
        every video with the AI presenter or the AI voice. --cover-ms picks the cover frame (milliseconds
        into the video; Instagram's thumb_offset), otherwise it's the first frame. Without --yes it only prints what it
        would post. A post is public as soon as it is published: run with --yes only after the
        owner has approved that exact video and caption.

The token and account ID are read from PRIVATE-HANDOFF.md (gitignored, section 6). A token from
"API setup with Instagram login" (starts with IG) talks to graph.instagram.com and needs no
Facebook Page; a Facebook-login token (starts with EAA) talks to graph.facebook.com and reaches the
account only through a Facebook Page linked to it. Standard library only, so it runs with any Python 3.
"""
import json
import pathlib
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "v23.0"
HERE = pathlib.Path(__file__).resolve().parent
handoff = (HERE.parents[1] / "PRIVATE-HANDOFF.md").read_text()
TOKEN = re.search(r"^IG_ACCESS_TOKEN=(\S+)", handoff, re.M).group(1)
IG_USER = re.search(r"^IG_USER_ID=(\d+)", handoff, re.M).group(1)
HOST = "graph.instagram.com" if TOKEN.startswith("IG") else "graph.facebook.com"
if HOST == "graph.instagram.com":
    IG_USER = "me"  # the token is for one account; its ID there differs from Business settings


def call(method, url, data=None, headers=None):
    body = urllib.parse.urlencode(data).encode() if isinstance(data, dict) else data
    req = urllib.request.Request(url, data=body, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        err = json.load(e).get("error", {})
        sys.exit(f"Graph API error {e.code}: {err.get('message')} (code {err.get('code')}, subcode {err.get('error_subcode')})")


def graph(method, path, **params):
    params["access_token"] = TOKEN
    url = f"https://{HOST}/{API}/{path}"
    if method == "GET":
        return call("GET", url + "?" + urllib.parse.urlencode(params))
    return call("POST", url, params)


def caption_for(name):
    text = (HERE / "captions.md").read_text()
    m = re.search(rf"^## {re.escape(name)}\b.*?```\n(.*?)```", text, re.M | re.S)
    if not m:
        sys.exit(f'No section starting "## {name}" with a caption block in captions.md')
    return m.group(1).strip()


def check():
    me = graph("GET", IG_USER, fields="user_id,username,account_type,media_count" if IG_USER == "me" else "id,username,media_count")
    print(f"Token reaches @{me['username']} ({me['media_count']} posts).")


def reel(video, name, ai, yes, cover_ms=None):
    video = pathlib.Path(video)
    caption = caption_for(name)
    size = video.stat().st_size
    print(f"Video:   {video} ({size / 1e6:.1f} MB)\nAI info: {'on' if ai else 'OFF'}\nCover:   {f'{cover_ms / 1000:.1f} s in' if cover_ms else 'first frame'}\nCaption:\n{caption}\n")
    if not yes:
        print("Dry run: nothing posted. Add --yes to publish.")
        return
    params = {"media_type": "REELS", "upload_type": "resumable", "caption": caption, "share_to_feed": "true"}
    if ai:
        params["is_ai_generated"] = "true"
    if cover_ms:
        params["thumb_offset"] = str(cover_ms)
    container = graph("POST", f"{IG_USER}/media", **params)["id"]
    print(f"Container {container}; uploading...")
    call("POST", f"https://rupload.facebook.com/ig-api-upload/{API}/{container}", video.read_bytes(),
         {"Authorization": f"OAuth {TOKEN}", "offset": "0", "file_size": str(size)})
    for _ in range(120):
        status = graph("GET", container, fields="status_code,status")
        if status["status_code"] == "FINISHED":
            break
        if status["status_code"] in ("ERROR", "EXPIRED"):
            sys.exit(f"Instagram could not process the video: {status}")
        time.sleep(10)
    else:
        sys.exit("Still processing after 20 minutes; check the container later.")
    media = graph("POST", f"{IG_USER}/media_publish", creation_id=container)["id"]
    link = graph("GET", media, fields="permalink")["permalink"]
    print(f"Published: {link}")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if args[:1] == ["check"]:
        check()
    elif args[:1] == ["reel"] and len(args) == 3:
        cover = next((int(a.split("=", 1)[1]) for a in sys.argv if a.startswith("--cover-ms=")), None)
        reel(args[1], args[2], "--ai" in sys.argv, "--yes" in sys.argv, cover)
    else:
        sys.exit(__doc__)
