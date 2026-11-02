import type { Playbook, RunResult, Tone } from "./types.ts";
import { records, parseMoney, parseDate, daysBetween, inr, settings } from "./common.ts";

// ---------- Build 1: payment ageing and reminders ----------
const INVOICES_CSV = `customer,invoice,invoice_date,due_date,amount,paid
Acme Foods,INV-301,2026-08-10,2026-09-09,"1,18,000",0
Acme Foods,INV-322,2026-09-25,2026-10-25,"59,000","20,000"
BlueStone,INV-310,2026-09-01,2026-10-01,"2,36,000","2,36,000"
BlueStone,INV-335,2026-10-20,2026-11-19,"47,200",0
Coastal Hotels,INV-288,2026-07-01,2026-07-31,"88,500","50,000"
Delta Logistics,INV-330,2026-10-05,2026-10-20,"35,400",0`;

const AGEING_SETTINGS = `Report date: 2026-11-02
Company: Your Company Pvt Ltd`;

const BUCKETS = ["Not yet due", "1 to 30 days", "31 to 60 days", "61 to 90 days", "Over 90 days"];
const bucketOf = (late: number) => (late <= 0 ? 0 : late <= 30 ? 1 : late <= 60 ? 2 : late <= 90 ? 3 : 4);

export function ageing([csv, conf]: string[]): RunResult {
  const s = settings(conf ?? "");
  const today = parseDate(s["report date"]) ?? new Date();
  const totals = [0, 0, 0, 0, 0];
  const byCustomer = new Map<string, { amount: number; invoices: string[]; worst: number }>();
  const rows: (string | number)[][] = [], tones: (Tone | undefined)[] = [];
  for (const r of records(csv)) {
    const due = parseDate(r.due_date), amount = parseMoney(r.amount) ?? 0, paid = parseMoney(r.paid) ?? 0;
    const open = amount - paid;
    if (!due || open <= 0) continue;
    const late = daysBetween(due, today), b = bucketOf(late);
    totals[b] += open;
    rows.push([r.customer, r.invoice, inr(amount), inr(paid), inr(open), late > 0 ? `${late} days late` : "not yet due", BUCKETS[b]]);
    tones.push(b >= 3 ? "bad" : b >= 1 ? "warn" : undefined);
    if (late > 0) {
      const c = byCustomer.get(r.customer) ?? { amount: 0, invoices: [], worst: 0 };
      c.amount += open; c.invoices.push(r.invoice); c.worst = Math.max(c.worst, late);
      byCustomer.set(r.customer, c);
    }
  }
  const outstanding = totals.reduce((a, b) => a + b, 0);
  return {
    stats: [
      { label: "Outstanding", value: inr(outstanding) },
      { label: "Overdue", value: inr(outstanding - totals[0]), tone: "warn" },
      ...BUCKETS.map((b, i) => ({ label: b, value: inr(totals[i]), tone: (i >= 3 && totals[i] ? "bad" : undefined) as Tone | undefined })),
    ],
    columns: ["Customer", "Invoice", "Amount", "Paid", "Outstanding", "Status", "Bucket"],
    rows, rowTones: tones,
    notes: [...byCustomer].map(([c, v]) =>
      `Reminder for ${c}: "Hi, a gentle reminder that ${inr(v.amount)} is overdue on ${v.invoices.join(" and ")}${v.worst > 60 ? `, the oldest by ${v.worst} days` : ""}. Could you share a payment date? Thank you, ${s.company ?? "Accounts"}."`),
  };
}

// ---------- Build 2: bank statement categoriser (Python) ----------
const STATEMENT_CSV = `date,narration,debit,credit
01/10/2026,SALARY OCT ACME PVT LTD,,"85,000.00"
02/10/2026,UPI/SWIGGY/ORDER 8841,450.00,
03/10/2026,UPI/UBER INDIA/TRIP,320.00,
05/10/2026,RENT OCTOBER NEFT,"22,000.00",
07/10/2026,UPI/AMAZON PAY/ORDER,"3,499.00",
09/10/2026,UPI/ZOMATO/ORDER 2210,680.00,
12/10/2026,AIRTEL POSTPAID BILL,799.00,
14/10/2026,UPI/AMAZON PAY/REFUND,,"1,299.00"
18/10/2026,IRCTC TICKET BOOKING,"1,845.00",
21/10/2026,UPI/RAMESH KIRANA,560.00,
25/10/2026,UPI/SWIGGY/ORDER 9917,390.00,
28/10/2026,UPI/OLA/RIDE,275.00,`;

const RULES_CSV = `keyword,category
SALARY,Income
SWIGGY,Food
ZOMATO,Food
UBER,Travel
OLA,Travel
IRCTC,Travel
AMAZON,Shopping
AIRTEL,Bills
RENT,Rent`;

export function categorise([statement, rulesCsv]: string[]): RunResult {
  const rules = records(rulesCsv).map((r) => [r.keyword.toUpperCase(), r.category] as const);
  const spend = new Map<string, number>();
  let income = 0;
  const unknown: string[] = [];
  for (const r of records(statement)) {
    const debit = parseMoney(r.debit) ?? 0, credit = parseMoney(r.credit) ?? 0;
    const cat = rules.find(([k]) => new RegExp(`\\b${k}\\b`).test(r.narration.toUpperCase()))?.[1] ?? "Uncategorised";
    if (cat === "Income") { income += credit - debit; continue; }
    // A credit in a spending category is a refund: it reduces that category
    spend.set(cat, (spend.get(cat) ?? 0) + debit - credit);
    if (cat === "Uncategorised") unknown.push(r.narration);
  }
  const total = [...spend.values()].reduce((a, b) => a + b, 0);
  const sorted = [...spend].sort((a, b) => b[1] - a[1]);
  return {
    stats: [
      { label: "Income", value: inr(income), tone: "good" },
      { label: "Spending", value: inr(total), tone: "warn" },
      { label: "Left over", value: inr(income - total) },
    ],
    columns: ["Category", "Spent", "Share"],
    rows: sorted.map(([c, v]) => [c, inr(v), `${Math.round((v / total) * 100)}%`]),
    rowTones: sorted.map(([c]) => (c === "Uncategorised" ? "warn" : undefined)),
    notes: unknown.length ? [`Needs a rule: ${unknown.join(", ")}`] : [],
  };
}

// ---------- Build 3: expense claims against policy ----------
const CLAIMS_CSV = `employee,date,category,city,amount,description
Priya,2026-10-14,Meal,Mumbai,350,Lunch with client
Priya,2026-10-14,Meal,Mumbai,420,Dinner
Priya,2026-10-14,Hotel,Mumbai,5800,Hotel 1 night
Rahul,2026-10-15,Hotel,Nashik,4200,Hotel 1 night
Rahul,2026-10-15,Meal,Nashik,540,Dinner
Anita,2026-10-16,Meal,Bengaluru,300,Breakfast
Anita,2026-10-16,Meal,Bengaluru,250,Lunch
Anita,2026-10-17,Hotel,Bengaluru,6400,Hotel 1 night`;

const POLICY = `Meals per person per day: 600
Hotel per night, tier 1 city: 6000
Hotel per night, other cities: 3500
Tier 1 cities: Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Kolkata, Pune`;

export function expenseCheck([csv, policy]: string[]): RunResult {
  const p = settings(policy);
  const mealCap = Number(p["meals per person per day"]), t1Cap = Number(p["hotel per night, tier 1 city"]), otherCap = Number(p["hotel per night, other cities"]);
  const tier1 = (p["tier 1 cities"] ?? "").split(",").map((c) => c.trim().toLowerCase());
  const claims = records(csv).map((r): Record<string, string> & { amt: number } => Object.assign({}, r, { amt: parseMoney(r.amount) ?? 0 }));
  const rows: (string | number)[][] = [];
  let over = 0;
  // Meals: one limit per person per day, across all meals that day
  const meals = new Map<string, number>();
  for (const c of claims) if (c.category.toLowerCase() === "meal") meals.set(`${c.employee}|${c.date}`, (meals.get(`${c.employee}|${c.date}`) ?? 0) + c.amt);
  for (const [k, total] of meals) if (total > mealCap) {
    const [emp, date] = k.split("|");
    over += total - mealCap;
    rows.push([emp, date, "Meals (day total)", inr(total), inr(mealCap), inr(total - mealCap)]);
  }
  for (const c of claims) if (c.category.toLowerCase() === "hotel") {
    const cap = tier1.includes(c.city.toLowerCase()) ? t1Cap : otherCap;
    if (c.amt > cap) { over += c.amt - cap; rows.push([c.employee, c.date, `Hotel, ${c.city}`, inr(c.amt), inr(cap), inr(c.amt - cap)]); }
  }
  const claimed = claims.reduce((a, c) => a + c.amt, 0);
  return {
    stats: [
      { label: "Claimed", value: inr(claimed) },
      { label: "Over policy", value: inr(over), tone: over ? "bad" : "good" },
      { label: "Within policy", value: inr(claimed - over), tone: "good" },
    ],
    columns: ["Employee", "Date", "What", "Claimed", "Limit", "Over by"],
    rows, rowTones: rows.map(() => "bad"),
    notes: ["Flags go to the approver with the reason; the tool doesn't reject anything on its own."],
  };
}

export const FINANCE: Playbook = {
  slug: "finance",
  role: "Finance & accounts",
  title: "Finance & Accounts Playbook",
  tagline: "Who owes what and since when, where the money went last month, and which expense claims break policy, each one checkable to the rupee.",
  forWho: "Accounts, finance, founders and anyone who chases payments",
  toolSlug: "payment-ageing",
  yourTurn: [
    "A payment run: which vendor invoices to pay this week, by due date and cash available",
    "A duplicate invoice finder across a year of payments",
    "Budget versus actual by department, from two exports",
    "A petty cash register with a running balance and missing-receipt flags",
  ],
  builds: [
    {
      id: "finance-ageing", title: "Payment ageing with polite reminders", minutes: "35 min", where: "browser",
      why: "Month end, and the question is always the same: who owes us, how late is it, and who do we chase first? The invoice list knows. It just needs sorting into the buckets everyone uses, minus what's already been paid.",
      files: [{ name: "invoices.csv", content: INVOICES_CSV }, { name: "settings.txt", content: AGEING_SETTINGS }],
      prompt: `Who it's for: I work in accounts and chase customer payments.

What it does: I upload invoices.csv (columns: customer, invoice,
invoice_date, due_date, amount, paid). For each invoice, outstanding =
amount minus paid; skip fully paid invoices. Using a report date in a
box (2 November 2026 for now), put each invoice in a bucket by days past
its due date: not yet due, 1 to 30, 31 to 60, 61 to 90, over 90.
Show the total in each bucket, and for each customer with overdue
invoices, a short polite reminder message I can copy.

What good looks like: amounts like "1,18,000" are read correctly, and
every total can be checked by hand.

What to avoid: never include an invoice that's fully paid.`,
      check: "Outstanding ₹2,78,100, of which ₹2,30,900 is overdue. Buckets: not yet due ₹47,200; 1 to 30 days ₹74,400; 31 to 60 days ₹1,18,000; 61 to 90 days ₹0; over 90 days ₹38,500. Reminders go to Acme Foods (₹1,57,000 on INV-301 and INV-322), Coastal Hotels (₹38,500) and Delta Logistics (₹35,400). BlueStone's paid invoice doesn't appear.",
      trap: {
        pattern: "totals",
        title: "Chasing money that's already been paid",
        text: "If your total is ₹5,84,100, the tool ignored the paid column: it's chasing BlueStone for ₹2,36,000 they've already paid, and Acme and Coastal for their full amounts. Sending that reminder is how you lose a good customer's goodwill.",
        fix: `I expected: total outstanding of ₹2,78,100.
What happened instead: [your total].

Outstanding is amount minus paid. Skip invoices where that's zero, and
use the outstanding amount (not the invoice amount) in the buckets and
the reminders. Explain what went wrong, then fix it.`,
      },
      run: ageing,
      tryIt: [
        "Move the report date to 1 December 2026: watch INV-301 move into the 61 to 90 bucket.",
        "Add a firmer second reminder for anything over 60 days late.",
      ],
    },
    {
      id: "finance-statement", title: "Bank statement categoriser", minutes: "40 min", where: "python",
      why: "Where did the money go last month? The bank statement says UPI/SWIGGY/ORDER 8841, not \"Food\". A small script with your own rules turns any month's statement into a summary in a second, the same way every time.",
      files: [{ name: "statement.csv", content: STATEMENT_CSV }, { name: "rules.csv", content: RULES_CSV }],
      prompt: `Who it's for: I want a monthly summary of a bank account's spending.

What it does: write a Python script called categorise.py. It reads
statement.csv (columns: date, narration, debit, credit) and rules.csv
(columns: keyword, category). Each transaction gets the category of the
first keyword found in its narration; anything else is "Uncategorised".
Print total income, total spending by category (largest first) with
each category's share, and the list of uncategorised narrations so I
can add rules.

What good looks like: I run it each month on a new statement.

What to avoid: keep it simple, with a short comment above each part.
Tell me which libraries I need and the exact command to install them.`,
      check: "Income ₹85,000. Spending ₹29,519: Rent ₹22,000, Travel ₹2,440, Shopping ₹2,200, Food ₹1,520, Bills ₹799, Uncategorised ₹560 (RAMESH KIRANA). Left over ₹55,481.",
      trap: {
        pattern: "totals",
        title: "A refund counted as spending",
        text: "Amazon refunded ₹1,299 on 14 October. If Shopping shows ₹4,798, the refund was added as if it were another purchase. If it shows ₹3,499, the refund was ignored. Either way you'd think you spent more than you did. A credit in a spending category is money coming back.",
        fix: `I expected: Shopping of ₹2,200.
What happened instead: [your Shopping total].

The Amazon line on 14 October is a refund: it's in the credit column.
In a spending category, subtract credits from debits. Explain what went
wrong, then give me the whole script again.`,
      },
      run: categorise,
      tryIt: [
        "Add a rule so RAMESH KIRANA counts as Groceries.",
        "Make the script save the summary to an Excel file as well as printing it.",
      ],
    },
    {
      id: "finance-expenses", title: "Expense claims against policy", minutes: "30 min", where: "browser",
      why: "Approving expense claims means checking every line against the policy: meal limits, hotel caps that depend on the city. A tool can do the checking so the approver only reads the exceptions.",
      files: [{ name: "claims.csv", content: CLAIMS_CSV }, { name: "policy.txt", content: POLICY }],
      prompt: `Who it's for: I approve my team's travel expense claims.

What it does: I upload claims.csv (columns: employee, date, category,
city, amount, description) and policy.txt, which says:
- meals: up to 600 per person per day
- hotels: up to 6000 a night in tier 1 cities (listed in the file),
  3500 elsewhere
Flag every claim over policy, with the limit and how much it's over by,
and show the total claimed, total over policy, and total within policy.

What good looks like: I only have to look at the flagged lines.

What to avoid: don't reject anything automatically; just flag it.`,
      check: "Claimed ₹18,260; over policy ₹1,270; within policy ₹16,990. Three flags: Priya's meals on 14 October (₹770, over the ₹600 day limit by ₹170), Rahul's hotel in Nashik (₹4,200 against ₹3,500, over by ₹700) and Anita's hotel in Bengaluru (₹6,400 against ₹6,000, over by ₹400).",
      trap: {
        pattern: "scope",
        title: "A daily limit checked one meal at a time",
        text: "If Priya isn't flagged, the tool checked each meal separately: ₹350 and ₹420 are each under ₹600. But the limit is per day, and together they're ₹770. Policies are full of \"per day\" and \"per trip\" rules, and AI often checks one line at a time unless told.",
        fix: `I expected: Priya flagged for 14 October, ₹170 over.
What happened instead: no flag for Priya.

The meal limit is per person per day: add up each person's meals for
each date, then compare the day's total with 600. Explain what went
wrong, then fix it.`,
      },
      run: expenseCheck,
      tryIt: [
        "Add Ahmedabad to the tier 1 list and see whose claims change (none in the sample; test with a new row).",
        "Add a column for the approver's decision, and an export of only the flagged lines.",
      ],
    },
  ],
};
