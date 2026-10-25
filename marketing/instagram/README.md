# Instagram content

**Canvas (open to view, edit, or export images):** https://claude.ai/artifact/1wG834ufUqfZdwpSNfjkC5

This canvas is the single source of truth for every Instagram image: feed posts, Highlight covers, and Highlight stories. It's a private Claude Artifact, so open it from the same Claude account on either laptop. The exact text/markup for every board is also versioned here under `project/*.dc.html`, so both laptops can see exactly what exists (and diff changes in git) without needing to open the canvas just to check.

Captions live in [`captions.md`](captions.md), one per feed post.

**Role series canvas (posts 12-16 and the five "Steal this prompt" stories):** https://claude.ai/artifact/AkAPHUsHNJSbbeBBycHrFH

These ten boards live on their own canvas because they were made from a Claude account that can't open the main canvas above. It's private to that account. On it, post 12 (`PostCampaignReport.dc.html` here) is the board named `Main.dc.html`, because a canvas needs its first board named that; the other nine keep the same filenames as here.

## Bio link: use the tagged URL

Set the Instagram bio link to **https://allthecoffee.in/?src=ig**, not the bare domain. The site logs the `src` tag once per visit (as `/_event/src-ig`), which is the only way to tell Instagram visitors apart from everyone else. Use other tags the same way for other channels, e.g. `?src=linkedin` or `?src=whatsapp`.

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
| 12 | `PostCampaignReport.dc.html` | Marketing: the Monday campaign report, using vs building | `/blog/ai-marketing-practical-guide` |
| 13 | `PostCopilotFinance.dc.html` | Finance: should we buy Copilot for the team (real India prices) | `/blog/copilot-excel-worth-it-india` |
| 14 | `PostLegalCitations.dc.html` | Legal: Supreme Court sets aside orders built on judgments that didn't exist | — |
| 15 | `PostHrSpreadsheet.dc.html` | HR: old employee spreadsheets and DPDP from 13 May 2027 | `/blog/dpdp-employee-data-hr` |
| 16 | `PostSalesFollowUps.dc.html` | Sales: the follow-ups that never happened | `/blog/ai-sales-without-sounding-robotic` |

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

## "Steal this prompt" stories (1080x1920, one per role, standalone)

Each gives one copy-paste prompt for a specific job, plus a data-safety line. Post on the same day as that role's feed post if you can, and add a link sticker to the matching blog post where there is one.

| File | Role | Prompt for | Pairs with |
|---|---|---|---|
| `PromptMarketing.dc.html` | Marketing | Turning a messy ad export into a summary | Post 12 |
| `PromptFinance.dc.html` | Finance | Making an inherited Excel formula explain itself | Post 13 |
| `PromptLegal.dc.html` | Legal | A first-pass issue list from a long agreement, with clause numbers | Post 14 |
| `PromptHr.dc.html` | HR | Rewriting a policy circular in simple English and Hindi | Post 15 |
| `PromptSales.dc.html` | Sales | A WhatsApp follow-up that doesn't sound like a bot | Post 16 |

## Posting log

Check items off here as you post them, and commit, so the other laptop can see what's already live and what's still queued.

- [ ] Post 6: ChatGPT Go
- [ ] Post 7: Automated my job
- [ ] Post 8: Appraisal self-review
- [ ] Post 9: Shadow AI
- [ ] Post 10: GST reconciliation
- [ ] Post 11: Fewer junior hires
- [ ] Post 12: Marketing campaign report
- [ ] Post 13: Finance, Copilot
- [ ] Post 14: Legal, fake citations
- [ ] Post 15: HR, old spreadsheets
- [ ] Post 16: Sales follow-ups
- [ ] Highlight covers set up (Start / Certificate / Pricing / FAQ) with their stories attached
- [ ] ByteFact1 posted
- [ ] ByteFact2 posted
- [ ] ByteFact3 posted
- [ ] ByteFact4 posted
- [ ] ByteFact5 posted
- [ ] ByteFact6 posted
- [ ] ByteFact7 posted
- [ ] PromptMarketing posted
- [ ] PromptFinance posted
- [ ] PromptLegal posted
- [ ] PromptHr posted
- [ ] PromptSales posted
