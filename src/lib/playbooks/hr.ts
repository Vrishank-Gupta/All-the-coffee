import type { Playbook, RunResult } from "./types.ts";
import { records, parseMoney, parseDate, inr2, round2, settings } from "./common.ts";

// ---------- Build 1: attendance to loss-of-pay ----------
const ATTENDANCE_CSV = `employee,monthly_gross,leave_balance,absent_days,half_days
Priya Nair,62000,2,1,0
Arjun Malhotra,90000,1,3,1
Kavya Reddy,45000,0,2,0
Mohammed Khan,75000,4,2,2
Vikram Singh,38000,0.5,0,3`;

const LOP_SETTINGS = `Month: October 2026
Days in month: 31`;

export function lop([csv, conf]: string[]): RunResult {
  const days = Number(settings(conf ?? "")["days in month"] ?? 30);
  let total = 0;
  const rows = records(csv).map((r) => {
    const gross = parseMoney(r.monthly_gross) ?? 0;
    const away = Number(r.absent_days || 0) + 0.5 * Number(r.half_days || 0);
    const lopDays = Math.max(0, away - Number(r.leave_balance || 0));
    const cut = round2((gross / days) * lopDays);
    total += cut;
    return [r.employee, away, Number(r.leave_balance || 0), lopDays, inr2(cut)];
  });
  return {
    stats: [
      { label: "People with loss of pay", value: String(rows.filter((r) => Number(r[3]) > 0).length), tone: "warn" },
      { label: "Total deduction", value: inr2(round2(total)), tone: "warn" },
    ],
    columns: ["Employee", "Days away", "Leave balance", "Loss-of-pay days", "Deduction"],
    rows,
    rowTones: rows.map((r) => (Number(r[3]) > 0 ? "warn" : undefined)),
    notes: [`Rule used: monthly gross ÷ ${days} calendar days × loss-of-pay days, after using up leave balance. Check this matches your company's policy before payroll.`],
  };
}

// ---------- Build 2: interview notes with names hidden (AI inside) ----------
const NOTES_TXT = `Riya Sharma: Strong on Excel modelling. She explained the variance analysis clearly. Riya asked good questions about the team.

Karan Mehta: Good communicator. He struggled with the case study numbers. Karan has 4 years in payroll; his references are strong.`;

const CANDIDATES_CSV = `name
Riya Sharma
Karan Mehta`;

const PRONOUNS: [RegExp, string][] = [[/\bshe\b/gi, "they"], [/\bhe\b/gi, "they"], [/\bhis\b/gi, "their"], [/\bhim\b/gi, "them"], [/\bhers\b/gi, "theirs"]];
const keepCase = (orig: string, repl: string) => (orig[0] === orig[0].toUpperCase() ? repl[0].toUpperCase() + repl.slice(1) : repl);

export function blindNotes([notes, candidatesCsv]: string[]): RunResult {
  let text = notes, names = 0, pronouns = 0;
  const people = records(candidatesCsv).map((r) => r.name).filter(Boolean);
  people.forEach((full, i) => {
    const label = `Candidate ${String.fromCharCode(65 + i)}`;
    for (const form of [full, full.split(/\s+/)[0]]) {
      const re = new RegExp(`\\b${form}\\b`, "g");
      names += (text.match(re) ?? []).length;
      text = text.replace(re, label);
    }
  });
  for (const [re, repl] of PRONOUNS) text = text.replace(re, (m) => { pronouns++; return keepCase(m, repl); });
  const left = people.flatMap((p) => p.split(/\s+/)).filter((w) => new RegExp(`\\b${w}\\b`, "i").test(text));
  return {
    stats: [
      { label: "Names hidden", value: String(names), tone: "good" },
      { label: "Pronouns made neutral", value: String(pronouns), tone: "good" },
      { label: "Names still visible", value: String(left.length), tone: left.length ? "bad" : "good" },
    ],
    columns: ["What the AI gets to read"],
    rows: text.split(/\n\s*\n/).map((p) => [p]),
    notes: ["Only this version goes to the AI for summarising. The key (Candidate A = ...) stays with you."],
  };
}

// ---------- Build 3: leave balance tracker ----------
const LEAVE_CSV = `employee,joining_date,carry_forward,leave_taken
Priya Nair,2024-03-01,12,4.5
Arjun Malhotra,2026-06-15,0,2
Kavya Reddy,2026-04-01,0,3.5
Mohammed Khan,2025-11-10,1.5,6
Vikram Singh,2026-10-20,0,0`;

const LEAVE_POLICY = `As of: 2026-11-02
Leave year starts: 2026-01-01
Accrual per full month: 1.5
Carry forward cap: 10`;

// Full calendar months worked in the leave year, up to the end of the month before "as of".
// A month counts if the person had joined by its 1st.
export function fullMonths(joined: Date, yearStart: Date, asOf: Date) {
  let count = 0;
  for (let m = new Date(yearStart); m.getTime() < Date.UTC(asOf.getUTCFullYear(), asOf.getUTCMonth(), 1); m = new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth() + 1, 1)))
    if (joined.getTime() <= m.getTime()) count++;
  return count;
}

export function leaveBalances([csv, policy]: string[]): RunResult {
  const p = settings(policy);
  const asOf = parseDate(p["as of"])!, start = parseDate(p["leave year starts"])!;
  const rate = Number(p["accrual per full month"]), cap = Number(p["carry forward cap"]);
  const rows = records(csv).map((r) => {
    const months = fullMonths(parseDate(r.joining_date)!, start, asOf);
    const carry = Math.min(cap, Number(r.carry_forward || 0));
    const bal = carry + months * rate - Number(r.leave_taken || 0);
    return [r.employee, carry, months * rate, Number(r.leave_taken || 0), bal];
  });
  return {
    stats: [{ label: "As of", value: p["as of"] }],
    columns: ["Employee", "Carried forward (capped)", "Earned this year", "Taken", "Balance"],
    rows,
    rowTones: rows.map((r) => (Number(r[4]) < 0 ? "bad" : undefined)),
    notes: [`Earned: ${rate} days per full month worked since ${p["leave year starts"]}. Carry forward capped at ${cap} days.`],
  };
}

export const HR: Playbook = {
  slug: "hr",
  role: "HR",
  title: "HR Playbook",
  tagline: "Payroll-ready loss-of-pay numbers, interview notes summarised without names getting in the way, and leave balances everyone can check.",
  forWho: "HR generalists, payroll, people managers, founders who hire",
  toolSlug: "lop-calculator",
  builds: [
    {
      id: "hr-lop", title: "Attendance to loss-of-pay", minutes: "30 min", where: "browser",
      why: "Every payroll cycle, someone works out who was absent beyond their leave and how much to deduct. It's simple arithmetic that goes wrong in the same two places every month: half days, and which number to divide by.",
      files: [{ name: "attendance.csv", content: ATTENDANCE_CSV }, { name: "settings.txt", content: LOP_SETTINGS }],
      prompt: `Who it's for: I run payroll for a small team.

What it does: I upload attendance.csv (columns: employee, monthly_gross,
leave_balance, absent_days, half_days). For each person:
- days away = absent days + half of the half days
- loss-of-pay days = days away minus leave balance, never below zero
- deduction = monthly gross / number of calendar days in the month x
  loss-of-pay days
The month is October 2026, which has 31 days; put it in a box I can
change. Show each person's deduction and the total, to the paisa.

What good looks like: I can check any row with a calculator.

What to avoid: don't round anything until the final deduction.`,
      check: "Three people have loss of pay: Arjun Malhotra 2.5 days, ₹7,258.06; Kavya Reddy 2 days, ₹2,903.23; Vikram Singh 1 day, ₹1,225.81. Total ₹11,387.10. Priya and Mohammed are covered by their leave.",
      trap: {
        title: "Dividing by 30 in a 31-day month",
        text: "If the total is ₹11,766.67, the tool divided by 30 every month. Plenty of payroll habits do, but the brief said calendar days, and October has 31. Each deduction is off by a little; across a company and a year it's real money, and it's the kind of error an employee will find before you do.",
        fix: `I expected: total deduction of ₹11,387.10.
What happened instead: [your total].

Divide monthly gross by the number of days in the month in the box
(31 for October), not 30. Explain what went wrong, then fix it.`,
      },
      run: lop,
      tryIt: [
        "Set the month to November (30 days) and check one person by hand.",
        "Some companies divide by working days instead. Add a switch, and label clearly which rule is in use.",
      ],
    },
    {
      id: "hr-blind-notes", title: "Interview notes, summarised blind", minutes: "35 min", where: "ai-inside",
      why: "Interview notes are full of names and he or she, and a summary written from them can carry the same bias. Hiding names and pronouns before the AI reads them is a small step that keeps the summary about the work.",
      files: [{ name: "notes.txt", content: NOTES_TXT }, { name: "candidates.csv", content: CANDIDATES_CSV }],
      prompt: `Who it's for: I'm in HR and summarise interview panel notes.

What it does: a box for the panel's notes and a list of candidate names.
Before anything goes to AI, the tool:
- replaces each candidate's full name AND first name with Candidate A,
  Candidate B, and so on
- replaces he, she, his, him, hers with they, their, them, theirs
- shows me the cleaned text and how many replacements it made
Then a Summarise button asks AI for each candidate's strengths and
concerns, each with the exact words from the notes as evidence.

What good looks like: no name or gendered pronoun reaches the AI.

What to avoid: the key (Candidate A = who) never leaves my screen.`,
      check: "With the sample notes: 4 names hidden (each full name once, each first name once) and 3 pronouns made neutral (She, He, his), with 0 names still visible. The AI reads \"Candidate A: ... They explained the variance analysis clearly. Candidate A asked good questions...\"",
      trap: {
        title: "The first name slips through",
        text: "If the cleaned text still says \"Riya asked good questions\", the tool only replaced full names. People write full names once, then first names for the rest of the notes. One leftover name undoes the whole point.",
        fix: `I expected: no names left in the cleaned text.
What happened instead: "Riya" and "Karan" still appear.

Replace each candidate's first name on its own too, not just the full
name, and show how many names are still visible (it should be 0).
Explain what went wrong, then fix it.`,
      },
      run: blindNotes,
      tryIt: [
        "Add college names to the list of things to hide: they can bias a summary too.",
        "Make the Summarise button refuse to run if any name is still visible.",
      ],
    },
    {
      id: "hr-leave", title: "Leave balance tracker", minutes: "30 min", where: "browser",
      why: "\"How much leave do I have?\" is a question HR answers every week, from a spreadsheet nobody fully trusts. With mid-year joiners and a carry-forward cap, the rules are simple but easy to apply wrongly.",
      files: [{ name: "leave.csv", content: LEAVE_CSV }, { name: "policy.txt", content: LEAVE_POLICY }],
      prompt: `Who it's for: I'm in HR and track leave balances.

What it does: I upload leave.csv (columns: employee, joining_date,
carry_forward, leave_taken) and policy.txt. The rules:
- the leave year started on 1 January 2026; today is 2 November 2026
- people earn 1.5 days for each full calendar month worked this year
  (a month counts only if they'd joined by its 1st)
- leave carried forward from last year is capped at 10 days
- balance = carried forward (after the cap) + earned - taken
Show each person's balance and how it was worked out.

What good looks like: anyone can check their own balance from the table.

What to avoid: half days (like 4.5) must stay exact.`,
      check: "Priya Nair 20.5 (10 carried after the cap + 15 earned - 4.5 taken), Arjun Malhotra 4 (joined 15 June: July to October, 6 earned - 2), Kavya Reddy 7 (April to October, 10.5 - 3.5), Mohammed Khan 10.5 (1.5 + 15 - 6), Vikram Singh 0 (joined 20 October: no full month yet).",
      trap: {
        title: "The cap that wasn't applied",
        text: "If Priya shows 22.5, the tool added all 12 carried-forward days, ignoring the cap of 10. If Arjun shows 5.5, it counted June even though he joined mid-month. Both are rules written in the brief; both are easy for a first build to skip.",
        fix: `I expected: Priya 20.5 and Arjun 4.
What happened instead: [their balances].

Cap carried-forward leave at 10 days before adding. Count a month only
if the person had joined by the 1st of that month. Explain what went
wrong, then fix it.`,
      },
      run: leaveBalances,
      tryIt: [
        "Change \"as of\" to 1 December 2026 and check Vikram now has 1.5 days.",
        "Add a warning for anyone whose balance would go negative if they took a planned week off.",
      ],
    },
  ],
};
