import type { Playbook, RunResult } from "./types.ts";
import { records } from "./common.ts";

// ---------- Build 1: feedback theme finder (AI inside, with quote check) ----------
const FEEDBACK_CSV = `id,comment
1,The dashboard takes forever to load in the morning.
2,Please let me export reports to Excel.
3,"Love the new design, very clean."
4,Loading is slow on my office laptop.
5,Pricing is too high for a team of five.
6,Export to Excel would save me an hour every week.
7,App crashes when I upload a big CSV.
8,Too expensive compared to spreadsheets.
9,Search is slow when there are many projects.
10,"Clean and simple, my team picked it up quickly."`;

const THEMES_REPLY = `Slow performance | The dashboard takes forever to load in the morning.
Slow performance | Loading is slow on my office laptop.
Slow performance | Search is slow when there are many projects.
Excel export | Please let me export reports to Excel.
Excel export | Export to Excel would save me an hour every week.
Price | Pricing is too high for a team of five.
Price | Too expensive compared to spreadsheets.
Price | We would pay more if it had integrations.
Design | Love the new design, very clean.
Design | Clean and simple, my team learned it fast.
Reliability | App crashes when I upload a big CSV.`;

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

export function themeCheck([csv, reply]: string[]): RunResult {
  const comments = records(csv).map((r) => ({ id: r.id, text: norm(r.comment) }));
  const covered = new Set<string>();
  const themes = new Map<string, number>();
  const rows: (string | number)[][] = [];
  for (const line of reply.split("\n")) {
    const [theme, quote] = line.split("|").map((x) => x?.trim());
    if (!theme || !quote) continue;
    const hit = comments.find((c) => c.text.includes(norm(quote).replace(/[.]$/, "")));
    if (hit) { covered.add(hit.id); themes.set(theme, (themes.get(theme) ?? 0) + 1); }
    else rows.push([theme, quote, "Not found in the feedback"]);
  }
  const sorted = [...themes].sort((a, b) => b[1] - a[1]);
  const uncovered = comments.filter((c) => !covered.has(c.id)).length;
  return {
    stats: [
      { label: "Comments", value: String(comments.length) },
      { label: "Quotes not found", value: String(rows.length), tone: rows.length ? "bad" : "good" },
      { label: "Comments not covered", value: String(uncovered), tone: uncovered ? "warn" : "good" },
      ...sorted.map(([t, n]) => ({ label: t, value: `${n} comment${n === 1 ? "" : "s"}` })),
    ],
    columns: ["Theme", "Quote AI gave", "Check"],
    rows,
    rowTones: rows.map(() => "bad"),
    notes: ["Only verified quotes count towards a theme. A quote that isn't in the feedback is either reworded or invented: either way, don't put it in a deck."],
  };
}

// ---------- Build 2: RICE prioritiser ----------
const FEATURES_CSV = `feature,reach,impact,confidence,effort
Excel export,1200,2,80%,3
Dark mode,3000,0.5,90%,2
Bulk upload,600,3,50%,5
WhatsApp alerts,2500,1,0.7,4
SSO login,400,2,100,6`;

// Confidence arrives as 80%, 80 or 0.8: all mean the same thing
export function confidence(text: string) {
  const n = Number(text.replace("%", "").trim());
  return text.includes("%") || n > 1 ? n / 100 : n;
}

export function rice([csv]: string[]): RunResult {
  const scored = records(csv).map((r) => {
    const reach = Number(r.reach), impact = Number(r.impact), conf = confidence(r.confidence), effort = Number(r.effort);
    return { name: r.feature, reach, impact, conf, effort, score: (reach * impact * conf) / effort };
  }).sort((a, b) => b.score - a.score);
  return {
    stats: [{ label: "Build first", value: scored[0]?.name ?? "-", tone: "good" }],
    columns: ["Rank", "Feature", "Reach", "Impact", "Confidence", "Effort", "RICE score"],
    rows: scored.map((f, i) => [i + 1, f.name, f.reach, f.impact, `${Math.round(f.conf * 100)}%`, f.effort, Math.round(f.score * 10) / 10]),
    rowTones: scored.map((_, i) => (i === 0 ? "good" : undefined)),
    notes: ["RICE = reach × impact × confidence ÷ effort. It's a conversation starter, not a verdict."],
  };
}

// ---------- Build 3: release notes from a ticket export (Python) ----------
const TICKETS_CSV = `key,summary,type,status,labels,customer_note
ATC-101,Add export to Excel on reports,Feature,Done,,Export any report to Excel in one click.
ATC-102,Refactor auth middleware,Improvement,Done,internal,
ATC-103,Fix dashboard timeout on large accounts,Bug,Done,,Dashboards for large accounts now load without timing out.
ATC-104,Dark mode,Feature,In Progress,,
ATC-105,Faster search,Improvement,Done,,Search is now up to 3x faster.
ATC-106,Upgrade logging library,Improvement,Done,internal,
ATC-107,Fix wrong GST total on invoices with discounts,Bug,Done,,Invoice totals are now correct when a discount is applied.
ATC-108,WhatsApp alerts,Feature,Done,,Get alerts on WhatsApp when a report is ready.`;

const SECTION: Record<string, string> = { feature: "New", improvement: "Improved", bug: "Fixed" };

export function releaseNotes([csv]: string[]): RunResult {
  const rows: (string | number)[][] = [];
  let skipped = 0;
  for (const r of records(csv)) {
    const internal = r.labels.toLowerCase().split(/[;,\s]+/).includes("internal");
    if (r.status.toLowerCase() !== "done" || internal) { skipped++; continue; }
    rows.push([SECTION[r.type.toLowerCase()] ?? "Other", r.customer_note || r.summary, r.key]);
  }
  const order = ["New", "Improved", "Fixed", "Other"];
  rows.sort((a, b) => order.indexOf(String(a[0])) - order.indexOf(String(b[0])));
  return {
    stats: [
      { label: "In the notes", value: String(rows.length), tone: "good" },
      { label: "Left out", value: String(skipped) },
    ],
    columns: ["Section", "Note", "Ticket"],
    rows,
    notes: ["Left out: tickets that aren't Done, and anything labelled internal."],
  };
}

export const PRODUCT: Playbook = {
  slug: "product",
  role: "Product",
  title: "Product Manager Playbook",
  tagline: "Turn a pile of feedback into themes you can defend, rank the roadmap with numbers, and write release notes customers can read.",
  forWho: "Product managers, product owners, founders, customer success leads",
  toolSlug: "rice-prioritiser",
  builds: [
    {
      id: "product-themes", title: "Feedback theme finder that proves every quote", minutes: "35 min", where: "ai-inside",
      why: "Two hundred NPS comments and a roadmap meeting on Thursday. AI can group them into themes in seconds, but it also tidies quotes into things customers never said. Build it so every quote is checked against the real feedback.",
      files: [{ name: "feedback.csv", content: FEEDBACK_CSV }, { name: "ai-reply.txt", content: THEMES_REPLY }],
      prompt: `Who it's for: I'm a product manager. I collect customer feedback.

What it does: I paste or upload feedback.csv (columns: id, comment). An
Analyse button asks AI to group the comments into themes and give, for
each theme, the exact comments that belong to it, word for word, one
per line as "theme | comment". Then the tool itself checks every quote:
- if a quote isn't found in the feedback, show it as "Not found"
- count each theme using only the quotes that were found
- say how many comments weren't covered by any theme

What good looks like: every number I put in a slide can be traced back
to real comments.

What to avoid: never count a quote that isn't really in the feedback.`,
      check: "Using the sample AI reply (ai-reply.txt): 2 quotes are not found. \"We would pay more if it had integrations\" was invented, and \"Clean and simple, my team learned it fast\" is a rewording of comment 10. Verified themes: Slow performance 3, Excel export 2, Price 2, Design 1, Reliability 1. One comment (number 10) isn't covered.",
      trap: {
        title: "A quote that's almost right",
        text: "The invented quote is easy to spot once you look. The reworded one isn't: \"my team learned it fast\" sounds exactly like \"my team picked it up quickly\". If it's in a slide as a customer quote, it's a quote no customer gave. That's why the check matches the exact words, not the meaning.",
        fix: `I expected: 2 quotes marked "Not found".
What happened instead: [what you see].

A quote counts only if its exact words appear in a comment (ignore
capital letters and the final full stop). Show reworded quotes as "Not
found" too. Explain what went wrong, then fix it.`,
      },
      run: themeCheck,
      tryIt: [
        "Ask the AI for a one-line summary of each theme, and check that the summary doesn't add new claims.",
        "Add a button that copies the verified quotes for a theme, ready for a slide.",
      ],
    },
    {
      id: "product-rice", title: "RICE prioritiser", minutes: "25 min", where: "browser",
      why: "Every roadmap meeting has the same fight: whose feature goes first. A RICE score doesn't end the argument, but it makes everyone argue about the same numbers.",
      files: [{ name: "features.csv", content: FEATURES_CSV }],
      prompt: `Who it's for: I'm a product manager deciding what to build next.

What it does: I upload features.csv (columns: feature, reach, impact,
confidence, effort). For each feature, RICE score = reach x impact x
confidence / effort. Show the features ranked by score, highest first,
with the score to one decimal place.

What good looks like: confidence written as 80%, 80 or 0.8 is treated
the same way (80 percent).

What to avoid: don't change the numbers in the file.`,
      check: "Dark mode first (675), then Excel export (640), WhatsApp alerts (437.5), Bulk upload (180) and SSO login (133.3).",
      trap: {
        title: "80 percent isn't 80",
        text: "If SSO login or Excel export suddenly tops the list with a score in the tens of thousands, the tool read \"100\" or \"80%\" as the number 100 or 80 instead of a percentage. Real spreadsheets mix 80%, 80 and 0.8 in the same column, and a ranking built on that is confidently wrong.",
        fix: `I expected: Dark mode first, with 675.
What happened instead: [your ranking].

Confidence is a percentage. Treat 80%, 80 and 0.8 all as 80 percent
(0.8 in the formula). Explain what went wrong, then fix it.`,
      },
      run: rice,
      tryIt: [
        "Add your own feature and argue with its score: which of the four numbers is the weakest guess?",
        "Add a column showing how the ranking changes if effort doubles for each feature.",
      ],
    },
    {
      id: "product-release-notes", title: "Release notes from a ticket export", minutes: "35 min", where: "python",
      why: "Release day: someone exports the tickets and rewrites them into notes customers understand. A script that groups them, leaves out internal work and unfinished tickets, and uses the customer-friendly line does it in a second.",
      files: [{ name: "tickets.csv", content: TICKETS_CSV }],
      prompt: `Who it's for: I write release notes for our customers.

What it does: write a Python script called release_notes.py. It reads
tickets.csv (columns: key, summary, type, status, labels, customer_note)
and writes release_notes.md with three sections: New (type Feature),
Improved (type Improvement) and Fixed (type Bug). Include only tickets
whose status is Done. Leave out any ticket labelled internal. Use the
customer_note when there is one, otherwise the summary.

What good looks like: notes a customer can read without knowing our
ticket system.

What to avoid: never include unfinished or internal work.`,
      check: "5 notes. New: Excel export, WhatsApp alerts. Improved: faster search. Fixed: the dashboard timeout, the GST total with discounts. Left out: Dark mode (still in progress) and the two internal tickets.",
      trap: {
        title: "Announcing work that isn't shipped",
        text: "If Dark mode appears under New, your notes announce a feature customers can't use yet. If \"Refactor auth middleware\" appears, they read about your internals. Both come from the same gap: the brief said which tickets to include, and the first build didn't apply both rules.",
        fix: `I expected: 5 notes, without Dark mode or any internal ticket.
What happened instead: [what you see].

Include a ticket only if its status is Done AND it doesn't have the
internal label. Explain what went wrong, then give me the whole script
again.`,
      },
      run: releaseNotes,
      tryIt: [
        "Add a date and version number at the top of the notes.",
        "Make it also write a short Hinglish version for the WhatsApp community group.",
      ],
    },
  ],
};
