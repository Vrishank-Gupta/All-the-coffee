# Instagram content

**Canvas (open to view, edit, or export images):** https://claude.ai/artifact/1wG834ufUqfZdwpSNfjkC5

This canvas is the single source of truth for every Instagram image: feed posts, Highlight covers, and Highlight stories. It's a private Claude Artifact, so open it from the same Claude account on either laptop. The exact text/markup for every board is also versioned here under `project/*.dc.html`, so both laptops can see exactly what exists (and diff changes in git) without needing to open the canvas just to check.

Captions live in [`captions.md`](captions.md), one per feed post.

## How to post something from here

1. Open the canvas link above.
2. Find the board by name (matches the filenames in the tables below, titles are also shown on each board in the canvas).
3. Select it, export/download as a PNG (or screenshot at the board's native resolution).
4. Transfer to your phone, post to Instagram.
   - **Feed post**: use the matching caption from `captions.md`.
   - **Highlight story**: post as a Story, then tap "Highlight" to save it under the matching cover (see the Highlight tables below for which stories belong under which cover).
5. Check it off in the posting log at the bottom of this file and commit/push, so the other laptop knows it's already gone out and doesn't duplicate it.

To add new boards or edit existing ones, see `CLAUDE.md`-style instructions in the canvas itself (it's a Claude Design-type Artifact); the short version is: edit the local `project/*.dc.html` file, then republish it to the same canvas URL.

## Feed posts (1080x1080, square grid posts)

| # | File | Topic | Blog tie-in |
|---|---|---|---|
| 1 | `Intro.dc.html` | Pinned welcome post: who the course is for, what's free | — |
| 2 | `Main.dc.html` | "Vibe coding," explained in plain language | — |
| 3 | `Hallucination.dc.html` | What an AI hallucination actually is | — |
| 4 | `Api.dc.html` | What an API is, explained simply | — |
| 5 | `UsingVsBuilding.dc.html` | Using AI vs. building with AI | — |
| 6 | `ChatgptGo.dc.html` | Your free ChatGPT Go year is ending | `/blog/chatgpt-go-free-year-ending` |
| 7 | `PostAutomatedJob.dc.html` | "I automated 60% of my job, should I tell my manager?" | `/blog/automated-my-job-tell-manager` |
| 8 | `PostAppraisal.dc.html` | Showing AI wins honestly in your appraisal self-review | `/blog/ai-work-appraisal-self-review` |
| 9 | `PostShadowAi.dc.html` | Shadow AI: 92% of Indian knowledge workers already use it | `/blog/shadow-ai-your-team` |
| 10 | `PostGstRecon.dc.html` | GSTR-2B reconciliation: where AI helps, where it must not decide | `/blog/gstr-2b-reconciliation-ai` |
| 11 | `PostFewerJuniors.dc.html` | Fewer junior hires: who does the grunt work now | `/blog/fewer-junior-hires-grunt-work` |

## Highlight covers (500x500, icon-only, used as the circle art for a permanent Story Highlight)

| File | Highlight name to use | Icon |
|---|---|---|
| `HighlightStart.dc.html` | "Start" | Lightning bolt |
| `HighlightCertificate.dc.html` | "Certificate" | Sparkle |
| `HighlightPricing.dc.html` | "Pricing" | Rupee symbol |
| `HighlightFaq.dc.html` | "FAQ" | Question mark |

## Evergreen Highlight stories (1080x1920, post as Stories once, then save under the matching Highlight cover above)

| Highlight | Files, in order | What it covers |
|---|---|---|
| Start | `Start1.dc.html` → `Start5.dc.html` | Who the course is for, free/no-install, Chapters 0-3 free, CTA |
| Certificate | `Certificate1.dc.html` → `Certificate4.dc.html` | What the certificate names, verifiable with QR + ID, CTA |
| Pricing | `Pricing1.dc.html` → `Pricing5.dc.html` | Chapters 0-3 free, Chapters 4-11 one-time ₹599, refund window, CTA |
| FAQ | `Faq1.dc.html` → `Faq5.dc.html` | Coding experience, developer jobs, refunds, data privacy, CTA |

## Byte-sized AI fact stories (1080x1920, standalone daily engagement content, not tied to a Highlight)

| File | Fact |
|---|---|
| `ByteFact1.dc.html` | AI doesn't learn from talking to you, not even with "memory" on |
| `ByteFact2.dc.html` | AI can give two different answers to the same question (sampling randomness) |
| `ByteFact3.dc.html` | AI's knowledge has a training cutoff unless the app adds live search |
| `ByteFact4.dc.html` | Long AI chats can lose things buried in the middle ("lost in the middle") |
| `ByteFact5.dc.html` | AI tends to perform better in English than Hindi/other Indian languages |
| `ByteFact6.dc.html` | Free-tier AI chats may train future models unless you opt out; paid/business usually doesn't |
| `ByteFact7.dc.html` | AI reads in chunks called tokens, not letter by letter, so counting/spelling tasks can go wrong |

Post these as plain Stories (native "Add post to your story" style text/image, no CTA needed beyond "Follow for more") roughly one a day; they're meant to be a rotation, not a one-time batch.

## Posting log

Check items off here as you post them, and commit, so the other laptop can see what's already live and what's still queued.

- [ ] Post 6: ChatGPT Go
- [ ] Post 7: Automated my job
- [ ] Post 8: Appraisal self-review
- [ ] Post 9: Shadow AI
- [ ] Post 10: GST reconciliation
- [ ] Post 11: Fewer junior hires
- [ ] Highlight covers set up (Start / Certificate / Pricing / FAQ) with their stories attached
- [ ] ByteFact1 posted
- [ ] ByteFact2 posted
- [ ] ByteFact3 posted
- [ ] ByteFact4 posted
- [ ] ByteFact5 posted
- [ ] ByteFact6 posted
- [ ] ByteFact7 posted
