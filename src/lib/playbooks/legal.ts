import type { Playbook, RunResult, Tone } from "./types.ts";
import { records, parseDate, daysBetween, shortDate, settings, DAY } from "./common.ts";

// ---------- Build 1: compare two versions of a contract ----------
const V1 = `1. Term. This Agreement starts on 1 December 2026 and continues for 12 months.
2. Fees. The Client will pay Rs 1,50,000 per month plus GST.
3. Payment. Invoices are payable within 30 days.
4. Notice. Either party may end this Agreement with 60 days' written notice.
5. Termination for convenience. The Client may end this Agreement at any time with 30 days' notice.
6. Jurisdiction. The courts at Mumbai shall have jurisdiction.`;

const V2 = `1. Term. This Agreement starts on 1 December 2026 and continues for 12 months.
2. Fees. The Client will pay Rs 1,50,000 per month
plus GST.
3. Payment. Invoices are payable within 15 days.
4. Notice. Either party may end this Agreement with 90 days' written notice.
5. Jurisdiction. The courts at Mumbai shall have jurisdiction.
6. Renewal. This Agreement will renew automatically for further periods of 12 months.`;

// Clauses keyed by heading ("Payment"), so renumbering doesn't hide or invent changes
export function clauses(text: string) {
  const out = new Map<string, string>();
  for (const block of text.replace(/\r/g, "").split(/\n(?=\s*\d+[.)]\s)/)) {
    const m = /^\s*\d+[.)]\s+([^.]+)\.\s*([\s\S]*)$/.exec(block.trim());
    if (m) out.set(m[1].trim().toLowerCase(), m[2].replace(/\s+/g, " ").trim());
  }
  return out;
}

const numbersOf = (s: string) => s.match(/\d[\d,]*(?:\.\d+)?%?/g) ?? [];

export function compareContracts([a, b]: string[]): RunResult {
  const A = clauses(a), B = clauses(b);
  const rows: (string | number)[][] = [], tones: (Tone | undefined)[] = [];
  let same = 0;
  for (const [k, t] of A) {
    if (!B.has(k)) { rows.push([cap(k), "Removed", t]); tones.push("bad"); continue; }
    const t2 = B.get(k)!;
    if (t === t2) { same++; continue; }
    const before = numbersOf(t), after = numbersOf(t2);
    const changedNums = before.map((n, i) => (n !== after[i] ? `${n} → ${after[i] ?? "gone"}` : "")).filter(Boolean);
    rows.push([cap(k), "Changed", changedNums.length ? changedNums.join(", ") : t2]); tones.push("warn");
  }
  for (const [k, t] of B) if (!A.has(k)) { rows.push([cap(k), "Added", t]); tones.push("warn"); }
  const count = (s: string) => rows.filter((r) => r[1] === s).length;
  return {
    stats: [
      { label: "Unchanged", value: String(same), tone: "good" },
      { label: "Changed", value: String(count("Changed")), tone: "warn" },
      { label: "Added", value: String(count("Added")), tone: "warn" },
      { label: "Removed", value: String(count("Removed")), tone: "bad" },
    ],
    columns: ["Clause", "What happened", "Detail"],
    rows, rowTones: tones,
    notes: ["Clauses are matched by their heading, so a renumbered clause isn't reported as changed, and line breaks don't count as changes."],
  };
}
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

// ---------- Build 2: renewal and notice-deadline tracker ----------
const CONTRACTS_CSV = `contract,party,start,term_months,notice_days,auto_renew
Housekeeping,Brightline Facility,2025-12-01,12,90,yes
Software licence,CloudNine IT,2026-01-15,12,30,yes
Office lease,Prestige Spaces,2024-04-01,36,180,no
Annual maintenance,Delta Elevators,2026-03-01,12,60,yes
Courier services,FastShip,2026-06-01,12,30,yes`;

const RENEWAL_SETTINGS = `Today: 2026-11-02
Warn within days: 60`;

// The last day of a term: start + months, minus one day (a 12-month term from 1 Dec ends on 30 Nov)
export function endDate(start: Date, months: number) {
  const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + months, start.getUTCDate()));
  return new Date(d.getTime() - DAY);
}

export function renewals([csv, conf]: string[]): RunResult {
  const s = settings(conf ?? "");
  const today = parseDate(s.today) ?? new Date(), warn = Number(s["warn within days"] ?? 60);
  const list = records(csv).map((r) => {
    const end = endDate(parseDate(r.start)!, Number(r.term_months));
    const deadline = new Date(end.getTime() - Number(r.notice_days) * DAY);
    const left = daysBetween(today, deadline);
    const auto = /^y/i.test(r.auto_renew);
    const status = left < 0 ? (auto ? `Missed by ${-left} days: renews automatically` : `Missed by ${-left} days: decide now`) : left <= warn ? `Act within ${left} days` : "Later";
    return { r, end, deadline, left, status };
  }).sort((a, b) => a.left - b.left);
  return {
    stats: [
      { label: "Deadline missed", value: String(list.filter((x) => x.left < 0).length), tone: "bad" },
      { label: `Due within ${warn} days`, value: String(list.filter((x) => x.left >= 0 && x.left <= warn).length), tone: "warn" },
    ],
    columns: ["Contract", "Party", "Term ends", "Notice deadline", "Status"],
    rows: list.map((x) => [x.r.contract, x.r.party, shortDate(x.end), shortDate(x.deadline), x.status]),
    rowTones: list.map((x): Tone | undefined => (x.left < 0 ? "bad" : x.left <= warn ? "warn" : undefined)),
    notes: ["Notice deadline = last day of the term minus the notice period. Put each one in your calendar with a reminder a week earlier."],
  };
}

// ---------- Build 3: citation checker ----------
const DRAFT_TXT = `As held in Mehra v. Union Textiles (2019), a notice must state its reasons. This was followed in Kapoor v. State Bank Staff Union (2017). The same principle appears in Rao v. Deccan Mills (2021), and earlier in Iyer vs Coastal Shipping (2015).`;

const VERIFIED_CSV = `case,year
Mehra v. Union Textiles,2019
Kapoor v. State Bank Staff Union,2016
Iyer v. Coastal Shipping,2015`;

const caseKey = (s: string) => s.toLowerCase().replace(/\bvs?\.?\s/g, "v ").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

export function citations([draft, verifiedCsv]: string[]): RunResult {
  const known = new Map(records(verifiedCsv).map((r) => [caseKey(r.case), r.year]));
  // Party names are runs of capitalised words either side of v, v. or vs: "Kapoor v. State Bank Staff Union (2017)"
  const party = "[A-Z][\\w&']*(?:\\s+(?:of\\s+)?[A-Z][\\w&'.]*)*";
  const found = [...draft.matchAll(new RegExp(`(${party}\\s+vs?\\.?\\s+${party})\\s*\\((\\d{4})\\)`, "g"))];
  const rows = found.map(([, name, year]) => {
    const cleaned = name.trim();
    const y = known.get(caseKey(cleaned));
    return [cleaned, year, y === undefined ? "Not found in your verified list" : y === year ? "Verified" : `Year differs: your list says ${y}`];
  });
  const status = (s: string) => rows.filter((r) => String(r[2]).startsWith(s)).length;
  return {
    stats: [
      { label: "Citations", value: String(rows.length) },
      { label: "Verified", value: String(status("Verified")), tone: "good" },
      { label: "Year differs", value: String(status("Year differs")), tone: "warn" },
      { label: "Not found", value: String(status("Not found")), tone: "bad" },
    ],
    columns: ["Case", "Year in draft", "Check"],
    rows,
    rowTones: rows.map((r): Tone => (r[2] === "Verified" ? "good" : String(r[2]).startsWith("Year") ? "warn" : "bad")),
    notes: ["A citation that isn't in your list isn't necessarily fake, but it must be checked in a law report or database before the draft goes anywhere."],
  };
}

export const LEGAL: Playbook = {
  slug: "legal",
  role: "Legal & compliance",
  title: "Legal & Compliance Playbook",
  tagline: "See exactly what changed between two contract drafts, never miss a renewal notice again, and check every case a draft cites.",
  forWho: "In-house legal, compliance, contract managers, founders who sign",
  toolSlug: "contract-compare",
  yourTurn: [
    "An NDA register that shows which NDAs expire this quarter",
    "A compliance calendar from a list of filings and due dates",
    "A clause finder: your standard clause for each topic, from past contracts",
    "A hearing-date tracker from your matter list",
  ],
  builds: [
    {
      id: "legal-compare", title: "What changed between two drafts", minutes: "35 min", where: "browser",
      why: "The other side sends \"the final version\" with a note saying nothing material changed. Reading both side by side takes an hour. A clause-by-clause comparison takes a second, if it's built so renumbering and line breaks don't fool it.",
      files: [{ name: "v1.txt", content: V1 }, { name: "v2.txt", content: V2 }],
      prompt: `Who it's for: I review contracts that come back with edits.

What it does: two boxes, the old version and the new version. The tool
splits each into numbered clauses and matches them by their heading (the
words after the number, like "Payment"), not by number. For each clause
say: unchanged, changed, added or removed. For changed clauses, show
which numbers changed (like 30 days to 15 days).

What good looks like: if clauses are renumbered, I still see the real
changes.

What to avoid: a line break or extra space is not a change.`,
      check: "Unchanged: Term, Fees and Jurisdiction (3). Changed: Payment (30 → 15 days) and Notice (60 → 90 days). Removed: Termination for convenience. Added: Renewal (it now renews automatically).",
      trap: {
        pattern: "matching",
        title: "Fooled by renumbering and line breaks",
        text: "If Fees shows as changed, the tool counted a line break as an edit. If Jurisdiction shows as changed, it compared clause 5 with clause 5, which are different clauses now that one was deleted. Meanwhile the change that matters, the new auto-renewal, can get lost in the noise.",
        fix: `I expected: Fees and Jurisdiction unchanged.
What happened instead: [what you see].

Ignore differences in spaces and line breaks. Match clauses by their
heading, not their number, because clauses get renumbered when one is
removed. Explain what went wrong, then fix it.`,
      },
      run: compareContracts,
      tryIt: [
        "Change \"Rs 1,50,000\" to \"Rs 1,65,000\" in v2 and check the tool shows the number change.",
        "Add a Copy button that writes the changes as an email to the other side.",
      ],
    },
    {
      id: "legal-renewals", title: "Renewal and notice-deadline tracker", minutes: "30 min", where: "browser",
      why: "Auto-renewing contracts are only a problem if you miss the notice deadline, which is months before the contract ends. A list of contracts becomes a list of dates to act by.",
      files: [{ name: "contracts.csv", content: CONTRACTS_CSV }, { name: "settings.txt", content: RENEWAL_SETTINGS }],
      prompt: `Who it's for: I manage our company's vendor contracts.

What it does: I upload contracts.csv (columns: contract, party, start,
term_months, notice_days, auto_renew). For each contract:
- the term ends on the last day of the term (a 12-month term starting
  1 December 2025 ends on 30 November 2026)
- the notice deadline = the end date minus the notice days
Using today's date in a box (2 November 2026 for now), mark each one:
deadline missed, act within 60 days, or later. Sort by deadline.

What good looks like: every date can be checked on a calendar.

What to avoid: don't be off by a day; the last day to give notice
matters.`,
      check: "Missed: Housekeeping (deadline 1 Sep 2026, 62 days ago: it renews automatically) and Office lease (2 Oct 2026, 31 days ago: decide now). Act soon: Software licence by 15 Dec 2026 (43 days) and Annual maintenance by 30 Dec 2026 (58 days). Later: Courier services, 1 May 2027.",
      trap: {
        pattern: "offbyone",
        title: "Off by one day",
        text: "If the Housekeeping deadline shows 2 September, the tool ended the term on 1 December 2026 instead of 30 November. A 12-month term starting 1 December ends the day before the anniversary. One day sounds trivial, until it's the day your notice arrives late.",
        fix: `I expected: the Housekeeping notice deadline to be 1 September 2026.
What happened instead: [the date you see].

A term of N months ends one day before the same date N months later
(start 1 December 2025, 12 months: ends 30 November 2026). Explain what
went wrong, then fix it.`,
      },
      run: renewals,
      tryIt: [
        "Change \"warn within\" to 30 days and see which contracts drop out of the list.",
        "Add a button that downloads each deadline as a calendar file.",
      ],
    },
    {
      id: "legal-citations", title: "Citation checker for AI-assisted drafts", minutes: "30 min", where: "browser",
      why: "AI drafting tools can cite cases that don't exist, or get the year wrong, and courts have taken it seriously. The fix isn't to stop using AI; it's to check every citation against a source you trust before anything is filed or sent.",
      files: [{ name: "draft.txt", content: DRAFT_TXT }, { name: "verified-cases.csv", content: VERIFIED_CSV }],
      prompt: `Who it's for: I'm in legal and review drafts that cite cases.

What it does: a box for the draft, and a list of cases I've verified
myself (verified-cases.csv: case, year). The tool finds every citation
in the draft written like "Name v. Name (year)" or "Name vs Name
(year)", and marks each one:
- Verified (name and year match my list)
- Year differs (name matches, year doesn't)
- Not found (check it before using it)

What good looks like: nothing goes out with an unchecked citation.

What to avoid: "v.", "v" and "vs" mean the same thing.`,
      check: "4 citations. Verified: Mehra v. Union Textiles (2019) and Iyer vs Coastal Shipping (2015). Year differs: Kapoor v. State Bank Staff Union (your list says 2016, the draft says 2017). Not found: Rao v. Deccan Mills (2021). All the cases here are invented for practice.",
      trap: {
        pattern: "matching",
        title: "\"vs\" isn't a different case",
        text: "If Iyer vs Coastal Shipping shows as not found, the tool compared the text exactly, and \"vs\" doesn't match \"v.\". A checker that cries wolf gets ignored, which is worse than no checker. Make it match the way lawyers actually write citations.",
        fix: `I expected: Iyer vs Coastal Shipping (2015) marked Verified.
What happened instead: Not found.

Treat "v.", "v" and "vs" (with or without a full stop) as the same, and
ignore capital letters and extra spaces when comparing case names.
Explain what went wrong, then fix it.`,
      },
      run: citations,
      tryIt: [
        "Add a column for where you verified each case (law report, database) to your list.",
        "Make the tool refuse to show a Copy button until every citation is Verified.",
      ],
    },
  ],
};
