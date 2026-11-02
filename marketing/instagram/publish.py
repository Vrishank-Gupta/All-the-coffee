"""Publish a reel to @all.the_coffee through the Instagram Graph API.

Usage:
  python publish.py check
  python publish.py reel VIDEO.mp4 "Reel 3" [--ai] [--cover-ms=27900] [--yes]
  python publish.py fbreel VIDEO.mp4 "Reel 3" [--ai] [--at=2026-11-01T19:30+05:30] [--yes]
  python publish.py photo IMAGE_URL "Post name" [--yes]        feed photo on Instagram and the Facebook Page
  python publish.py story MEDIA [--ai] [--yes]                 Story on Instagram and the Facebook Page
  python publish.py due [--yes]                                 post whatever schedule.json says is due

photo   IMAGE_URL must be a public https JPEG (e.g. one placed in public/ig/ and deployed); the
        caption comes from captions.md like reels do.
story   MEDIA is a local .mp4 (up to 60 s) or a public https JPEG. Stories have no caption, and
        link stickers can't be added through the API: add one in the app if you want a link.

check   shows which account the token reaches, to test the setup.
due     posts every item in schedule.json whose time has come and that isn't done yet, in order, and
        records the result in the file. The GitHub Actions workflow .github/workflows/post-queue.yml runs it
        every 15 minutes, so posts go out with this PC off. Only photos and Stories from public URLs can
        be queued (reels need the local video file). An item more than 6 hours late is marked missed, not
        posted; after a failure the queue stops, so nothing posts out of order.
reel    uploads VIDEO.mp4 straight from this machine (resumable upload, no public URL needed)
        with the caption from the captions.md section whose heading starts with the given name,
        e.g. "Reel 3". --ai turns on Instagram's "AI info" label (is_ai_generated); use it for
        every video with the AI presenter or the AI voice. --cover-ms picks the cover frame (milliseconds
        into the video; Instagram's thumb_offset), otherwise it's the first frame. Without --yes it only prints what it
        would post. A post is public as soon as it is published: run with --yes only after the
        owner has approved that exact video and caption.

fbreel   posts the same video and caption as a reel on the Facebook Page linked to the account,
        using a Page token fetched with the system-user token. --at schedules it on Facebook's side
        (10 minutes to 29 days ahead); without it, it's published straight away. Facebook wants stereo
        AAC audio and a keyframe every 2 to 5 seconds: upload the -upload.mp4 copy (see README).

The token and account ID come from the IG_ACCESS_TOKEN and IG_USER_ID environment variables if set
(GitHub Actions secrets), otherwise from PRIVATE-HANDOFF.md (gitignored, section 6). A token from
"API setup with Instagram login" (starts with IG) talks to graph.instagram.com and needs no
Facebook Page; a Facebook-login token (starts with EAA) talks to graph.facebook.com and reaches the
account only through a Facebook Page linked to it. Standard library only, so it runs with any Python 3.
"""
import datetime
import json
import os
import pathlib
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "v23.0"
HERE = pathlib.Path(__file__).resolve().parent
if os.environ.get("IG_ACCESS_TOKEN"):
    TOKEN, IG_USER = os.environ["IG_ACCESS_TOKEN"], os.environ["IG_USER_ID"]
else:
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


def fb_reel(video, name, ai, yes, at=None):
    import datetime
    video = pathlib.Path(video)
    caption = caption_for(name)
    page = graph("GET", "me/accounts", fields="id,name,access_token,instagram_business_account")["data"]
    page = next(p for p in page if p.get("instagram_business_account", {}).get("id") == IG_USER)
    when = int(datetime.datetime.fromisoformat(at).timestamp()) if at else None
    print(f"Facebook Page: {page['name']}\nVideo: {video}\nAI info: {'on' if ai else 'OFF'}\n"
          f"When: {datetime.datetime.fromtimestamp(when).isoformat() if when else 'now'}\nCaption:\n{caption}\n")
    if not yes:
        print("Dry run: nothing posted. Add --yes to publish.")
        return
    tok, pid = page["access_token"], page["id"]
    url = f"https://graph.facebook.com/{API}/{pid}/video_reels"
    vid = call("POST", url, {"upload_phase": "start", "access_token": tok})["video_id"]
    call("POST", f"https://rupload.facebook.com/video-upload/{API}/{vid}", video.read_bytes(),
         {"Authorization": f"OAuth {tok}", "offset": "0", "file_size": str(video.stat().st_size)})
    params = {"upload_phase": "finish", "video_id": vid, "description": caption, "access_token": tok,
              "video_state": "SCHEDULED" if when else "PUBLISHED"}
    if when:
        params["scheduled_publish_time"] = str(when)
    if ai:
        params["is_ai_generated"] = "true"
    print("Finish:", call("POST", url, params))
    for _ in range(60):
        st = call("GET", f"https://graph.facebook.com/{API}/{vid}?" + urllib.parse.urlencode({"fields": "status", "access_token": tok}))["status"]
        if st.get("video_status") in ("ready", "upload_complete") or st.get("publishing_phase", {}).get("status") == "complete":
            break
        if st.get("video_status") in ("error", "upload_failed", "expired"):
            sys.exit(f"Facebook could not process the video: {st}")
        time.sleep(10)
    print(f"Facebook reel {vid}: {'scheduled' if when else 'published'}. Status: {st}")


def _page():
    pages = graph("GET", "me/accounts", fields="id,name,access_token,instagram_business_account")["data"]
    return next(p for p in pages if p.get("instagram_business_account", {}).get("id") == IG_USER)


def _wait_ig(container):
    for _ in range(120):
        st = graph("GET", container, fields="status_code,status")
        if st["status_code"] == "FINISHED":
            return
        if st["status_code"] in ("ERROR", "EXPIRED"):
            sys.exit(f"Instagram could not process it: {st}")
        time.sleep(5)
    sys.exit("Instagram still processing after 10 minutes")


def photo(url, name, yes):
    caption = caption_for(name)
    print(f"Photo: {url}\nCaption:\n{caption}\n")
    if not yes:
        print("Dry run: nothing posted. Add --yes to publish.")
        return
    c = graph("POST", f"{IG_USER}/media", image_url=url, caption=caption)["id"]
    _wait_ig(c)
    media = graph("POST", f"{IG_USER}/media_publish", creation_id=c)["id"]
    print("Instagram:", graph("GET", media, fields="permalink")["permalink"])
    page = _page()
    r = call("POST", f"https://graph.facebook.com/{API}/{page['id']}/photos", {"url": url, "message": caption, "access_token": page["access_token"]})
    print(f"Facebook: https://www.facebook.com/{r.get('post_id', r.get('id'))}")


def story(media, ai, yes):
    is_video = media.endswith(".mp4")
    print(f"Story: {media} ({'video' if is_video else 'image'}), AI info: {'on' if ai else 'OFF'}")
    if not yes:
        print("Dry run: nothing posted. Add --yes to publish.")
        return
    # Instagram
    if is_video:
        path = pathlib.Path(media)
        params = {"media_type": "STORIES", "upload_type": "resumable"}
        if ai:
            params["is_ai_generated"] = "true"
        c = graph("POST", f"{IG_USER}/media", **params)["id"]
        call("POST", f"https://rupload.facebook.com/ig-api-upload/{API}/{c}", path.read_bytes(),
             {"Authorization": f"OAuth {TOKEN}", "offset": "0", "file_size": str(path.stat().st_size)})
    else:
        c = graph("POST", f"{IG_USER}/media", media_type="STORIES", image_url=media)["id"]
    _wait_ig(c)
    print("Instagram story:", graph("POST", f"{IG_USER}/media_publish", creation_id=c)["id"])
    # Facebook Page
    page = _page()
    tok, pid = page["access_token"], page["id"]
    if is_video:
        url = f"https://graph.facebook.com/{API}/{pid}/video_stories"
        vid = call("POST", url, {"upload_phase": "start", "access_token": tok})["video_id"]
        call("POST", f"https://rupload.facebook.com/video-upload/{API}/{vid}", path.read_bytes(),
             {"Authorization": f"OAuth {tok}", "offset": "0", "file_size": str(path.stat().st_size)})
        r = call("POST", url, {"upload_phase": "finish", "video_id": vid, "access_token": tok})
    else:
        ph = call("POST", f"https://graph.facebook.com/{API}/{pid}/photos", {"url": media, "published": "false", "access_token": tok})["id"]
        r = call("POST", f"https://graph.facebook.com/{API}/{pid}/photo_stories", {"photo_id": ph, "access_token": tok})
    print("Facebook story:", r)


def due(yes):
    path = HERE / "schedule.json"
    queue = json.loads(path.read_text())
    now = datetime.datetime.now(datetime.timezone.utc)
    for item in queue:
        if item.get("done") or item.get("failed") or item.get("missed"):
            continue
        at = datetime.datetime.fromisoformat(item["at"])
        if at > now:
            continue
        label = f'{item["kind"]} {" ".join(item["args"])}'
        if now - at > datetime.timedelta(hours=6):
            print(f"Missed (more than 6 hours late), not posting: {label}")
            item["missed"] = now.isoformat(timespec="minutes")
            continue
        print(f"Due since {item['at']}: {label}")
        if not yes:
            print("Dry run: nothing posted.")
            continue
        try:
            if item["kind"] == "photo":
                photo(item["args"][0], item["args"][1], True)
            elif item["kind"] == "story":
                story(item["args"][0], item.get("ai", False), True)
            else:
                sys.exit(f"Can't queue {item['kind']}: only photo and story")
            item["done"] = now.isoformat(timespec="minutes")
        except SystemExit as e:
            item["failed"] = str(e)
            print(f"FAILED: {e}. Stopping the queue here.")
            break
    if yes:
        path.write_text(json.dumps(queue, indent=2, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if args[:1] == ["check"]:
        check()
    elif args[:1] == ["reel"] and len(args) == 3:
        cover = next((int(a.split("=", 1)[1]) for a in sys.argv if a.startswith("--cover-ms=")), None)
        reel(args[1], args[2], "--ai" in sys.argv, "--yes" in sys.argv, cover)
    elif args[:1] == ["fbreel"] and len(args) == 3:
        at = next((a.split("=", 1)[1] for a in sys.argv if a.startswith("--at=")), None)
        fb_reel(args[1], args[2], "--ai" in sys.argv, "--yes" in sys.argv, at)
    elif args[:1] == ["photo"] and len(args) == 3:
        photo(args[1], args[2], "--yes" in sys.argv)
    elif args[:1] == ["due"]:
        due("--yes" in sys.argv)
    elif args[:1] == ["story"] and len(args) == 2:
        story(args[1], "--ai" in sys.argv, "--yes" in sys.argv)
    else:
        sys.exit(__doc__)
