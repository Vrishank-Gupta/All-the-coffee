# Writes the showcase boards (Posts 18 to 23): each as a feed image (1080x1350, Showcase*Feed.html)
# and a matching Story (1080x1920, Showcase*Story.html), from one content block below, in the same
# style as ByteFact3Feed.html. Render them with render-boards.py. Every number here is checkable on
# the site: steps and traps in src/lib/method.ts, the 38 hours from the Brief Builder's own example,
# the playbooks in src/lib/playbooks, the tools in src/lib/tools/registry.ts.
import pathlib

HERE = pathlib.Path(__file__).parent
CUP = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#241711" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>'

def numbered(items, size=30, gap=16):
    """Rows of (number, bold, light) on cream cards."""
    rows = "".join(
        f'<div style="display:flex;gap:18px;align-items:baseline;padding:{gap}px 0;border-bottom:2px solid #E8D9C4;">'
        f'<b style="font:700 {size}px Fraunces,serif;color:#B5562B;min-width:40px;">{n}</b>'
        f'<span style="font-size:{size}px;line-height:1.3;"><b>{a}</b>{f" <span style=color:#6B5444>{b}</span>" if b else ""}</span></div>'
        for n, a, b in items)
    return f'<div style="background:#FBF1E2;color:#241711;border-radius:28px;padding:10px 36px;font-family:Inter,sans-serif;">{rows}</div>'

def chips(items, size=28):
    return '<div style="display:flex;flex-wrap:wrap;gap:12px;">' + "".join(
        f'<span style="font:600 {size}px Inter,sans-serif;padding:14px 20px;border-radius:16px;background:#33221A;border:2px solid #4A3428;color:#FBF1E2;">{c}</span>' for c in items) + '</div>'

STEPS = [("1", "Spot it.", "Is this task worth a tool?"), ("2", "Size it.", "What's the smallest useful version?"),
         ("3", "Choose where.", "Browser, Python, AI inside, or no tool?"), ("4", "Brief it.", "Could a new intern build it from this?"),
         ("5", "Know the answer first.", "What should it say, worked out by hand?"), ("6", "Build in slices.", "What's the next small piece?"),
         ("7", "Test like a sceptic.", "How could it be wrong without telling you?"), ("8", "Before real use.", "Is it safe for real work?")]

TRAPS = [("📅", "03/04/2026", "read as 4 March"), ("₹", "1.2L", "read as ₹1.20"), ("➕", "A Total row", "added as if it were data"),
         ("⏱", "2d", "read as 2 hours"), ("◻", "A blank budget", "read as ₹0"), ("❝", "A quote", "AI made up, that was never in your file")]

ROLES = [("📈 Sales", "Stale-deal finder · GST quotation · Lead scorer"), ("📣 Marketing", "UTM builder · ROAS report · Caption rewriter"),
         ("💰 Finance", "Payment ageing · Statement categoriser · Expense checker"), ("🧭 Product", "Feedback themes · RICE prioritiser · Release notes"),
         ("🧑‍💼 HR", "Loss of pay · Blind interview notes · Leave balances"), ("⚖️ Legal", "Draft compare · Renewal deadlines · Citation checker"),
         ("📦 Operations", "Vendor quotes · Reorder alerts · Workload heatmap")]

TOOLS = ["📝 Brief Builder", "💰 CTC to in-hand", "💬 WhatsApp follow-ups", "📄 Bulk offer letters", "🧾 Invoice PDFs to Excel",
         "⚖️ Contract red flags", "🧾 GST quotation", "🔗 UTM builder", "📊 Payment ageing", "🧭 RICE prioritiser",
         "🗓 Loss of pay", "🔍 Compare contract drafts", "📦 Vendor quotes"]

BOARDS = {
    "Method": dict(
        title="The Builder's Method", eyebrow="The Builder's Method",
        h1="You don't need to learn coding.", sub="You need 8 questions.",
        body=lambda story: numbered(STEPS, 28 if not story else 31, 13 if not story else 22),
        foot="Free to read", cta="allthecoffee.in/method"),
    "BriefBuilder": dict(
        title="Free tool: Brief Builder", eyebrow="Free tool · No sign-up",
        h1="Is that weekly task worth a tool?", sub="Ask before you build.",
        body=lambda story: (
            '<div style="background:#FBF1E2;color:#241711;border-radius:28px;padding:34px 38px;font-family:Inter,sans-serif;">'
            '<p style="margin:0;font-size:24px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#B5562B;">Example</p>'
            '<p style="margin:14px 0 0;font-size:34px;line-height:1.4;font-weight:500;">45 minutes, every week<br>= about <b style="color:#3F6E3A;">38 hours a year</b> by hand.</p>'
            '<p style="margin:16px 0 0;font-size:30px;font-weight:700;color:#3F6E3A;">Worth building.</p></div>'
            f'<p style="margin:{40 if story else 34}px 0 0;font-size:{34 if story else 31}px;line-height:1.45;color:#E5D6C3;">Describe the task. The Brief Builder tells you where to build it, writes a brief to paste into any AI chat, shows how to check the answer, and lists the traps to test for.</p>'),
        foot="Free, no sign-up", cta="allthecoffee.in/tools/brief-builder"),
    "Traps": dict(
        title="Quietly wrong", eyebrow="Save this",
        h1="AI-built tools don't crash.", sub="They go quietly wrong.",
        body=lambda story: '<div style="display:flex;flex-direction:column;gap:%dpx;">' % (18 if story else 12) + "".join(
            f'<div style="background:#FBF1E2;color:#241711;border-radius:20px;padding:{20 if story else 16}px 28px;font:500 {32 if story else 29}px Inter,sans-serif;display:flex;gap:16px;align-items:center;">'
            f'<span style="width:40px;text-align:center;">{i}</span><span><b>{a}</b> <span style="color:#A43D24;">{b}</span></span></div>' for i, a, b in TRAPS) + '</div>',
        foot="All 11 traps, and how to test for each", cta="allthecoffee.in/method"),
    "Playbooks": dict(
        title="Role Playbooks", eyebrow="Role Playbooks",
        h1="7 jobs. 21 tools you build yourself.", sub="No coding. Each with the trap to catch.",
        body=lambda story: '<div style="display:flex;flex-direction:column;gap:%dpx;">' % (16 if story else 10) + "".join(
            f'<div style="background:#33221A;border:2px solid #4A3428;border-radius:18px;padding:{18 if story else 13}px 24px;font-family:Inter,sans-serif;">'
            f'<b style="font-size:{30 if story else 27}px;color:#FBF1E2;">{r}</b><span style="display:block;margin-top:4px;font-size:{25 if story else 23}px;color:#E9C79B;">{t}</span></div>' for r, t in ROLES) + '</div>',
        foot="In the full course. Start free.", cta="allthecoffee.in/playbooks"),
    "FreeTools": dict(
        title="13 free tools", eyebrow="Free tools",
        h1="13 tools for office work.", sub="Free. No sign-up. Built for Indian offices.",
        body=lambda story: chips(TOOLS, 30 if story else 27) +
            f'<p style="margin:{40 if story else 30}px 0 0;font-size:{33 if story else 30}px;line-height:1.45;color:#E5D6C3;">Every one of them is also a build in the course. Use the tool today, then learn to make your own.</p>',
        foot="Use them free", cta="allthecoffee.in/tools"),
    "ByteFact8": dict(
        title="Byte-sized fact: AI fills the gaps", eyebrow="Byte-sized AI fact",
        h1="AI fills every gap in your brief with a guess.", sub="And the guess usually looks fine.",
        body=lambda story: (
            '<div style="background:#FBF1E2;color:#241711;border-radius:28px;padding:34px 38px;font-family:Inter,sans-serif;">'
            '<p style="margin:0;font-size:24px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#B5562B;">Real example</p>'
            '<p style="margin:14px 0 0;font-size:33px;line-height:1.4;font-weight:500;">Ask AI to build a GST quotation and it may split the tax into CGST + SGST every time. For a customer in another state it should be <b style="color:#3F6E3A;">IGST</b>. Same total, wrong tax heads.</p></div>'
            f'<p style="margin:{44 if story else 36}px 0 0;font-size:{35 if story else 32}px;line-height:1.45;color:#E5D6C3;">Brief it like a new intern: write down the rules you\'d explain to a new colleague, especially the obvious ones.</p>'),
        foot="Small facts. Fewer blind spots.", cta=None),
}

def page(name, b, story):
    w, h = 1080, 1920 if story else 1350
    pad = "110px 80px 96px" if story else "80px 80px 68px"
    h1 = 84 if story else (78 if len(b["h1"]) < 40 else 70)
    cta = (f'<span style="font:700 26px Inter,sans-serif;color:#241711;background:#F2BD7C;padding:14px 24px;border-radius:99px;">{b["cta"]}</span>'
           if b["cta"] else '<span style="font:700 24px Inter,sans-serif;color:#E9A24F;">Follow for more →</span>')
    gap = "flex:1;display:flex;flex-direction:column;justify-content:center;" + ("" if story else "padding-top:20px;")
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{'Story' if story else 'Feed'}: {b['title']}</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Source+Serif+4:wght@400;600&family=Inter:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  /* Written by showcase.py: edit the content there, not here */
  body {{ margin: 0; }}
  .fd {{ font-family: 'Fraunces', Georgia, serif; }}
</style>
</head>
<body>
<div id="card" style="width:{w}px;height:{h}px;box-sizing:border-box;background:#241711;display:flex;flex-direction:column;padding:{pad};font-family:'Source Serif 4',Georgia,serif;color:#FBF1E2;">
  <div style="display:flex;align-items:center;gap:14px;">
    <div style="width:56px;height:56px;border-radius:999px;background:#FBF1E2;display:flex;align-items:center;justify-content:center;">{CUP}</div>
    <span class="fd" style="font-size:30px;font-weight:700;">All The Coffee</span>
  </div>
  <p style="margin:{60 if story else 44}px 0 0;font:700 24px 'Inter',sans-serif;letter-spacing:0.12em;text-transform:uppercase;color:#F2BD7C;">{b['eyebrow']}</p>
  <h1 class="fd" style="margin:16px 0 0;font-size:{h1}px;font-weight:700;line-height:1.08;">{b['h1']}</h1>
  <p class="fd" style="margin:18px 0 0;font-size:{40 if story else 36}px;font-weight:600;color:#E9A24F;">{b['sub']}</p>
  <div style="{gap}">{b['body'](story)}</div>
  <div style="margin-top:auto;padding-top:28px;display:flex;justify-content:space-between;align-items:center;gap:20px;">
    <span class="fd" style="font-size:27px;color:#C9B7A3;">{b['foot']}</span>
    {cta}
  </div>
</div>
</body>
</html>
"""

for name, b in BOARDS.items():
    for story in (False, True):
        f = HERE / f"Showcase{name}{'Story' if story else 'Feed'}.html"
        f.write_text(page(name, b, story), encoding="utf-8")
        print("wrote", f.name)
