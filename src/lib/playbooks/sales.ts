import type { Playbook, RunResult, Tone } from "./types.ts";
import { records, parseMoney, parseDate, daysBetween, inr, inr2, round2, indianWords, settings, shortDate } from "./common.ts";

// ---------- Build 1: stale-deal finder ----------
const DEALS_CSV = `deal,owner,stage,value,last_activity,expected_close
Acme Foods renewal,Priya,Negotiation,"₹4,50,000",2026-10-28,2026-11-15
BlueStone pilot,Rahul,Proposal,1.2L,2026-10-05,2026-11-30
Coastal Hotels,Priya,Discovery,85K,2026-09-20,2026-12-15
Delta Logistics,Anita,Negotiation,"3,75,000",2026-10-30,2026-10-25
Evergreen Schools,Rahul,Proposal,2.5 L,2026-10-29,2026-12-01
FreshMart chain,Anita,Discovery,60000,2026-10-12,2027-01-10
Greenfield Pharma,Priya,Closed Won,"9,00,000",2026-09-01,2026-09-30
Harbor Exports,Rahul,Negotiation,1.8L,2026-10-31,2026-11-20`;

const DEALS_SETTINGS = `Report date: 2026-11-02
Stale after days: 14`;

export function staleDeals([csv, conf]: string[]): RunResult {
  const s = settings(conf ?? "");
  const today = parseDate(s["report date"]) ?? new Date();
  const staleAfter = Number(s["stale after days"] ?? 14);
  const rows: (string | number)[][] = [], tones: (Tone | undefined)[] = [];
  const byOwner = new Map<string, number>();
  let total = 0, unreadable = 0;
  for (const r of records(csv)) {
    if (/^closed/i.test(r.stage)) continue;
    const value = parseMoney(r.value);
    const last = parseDate(r.last_activity), close = parseDate(r.expected_close);
    if (value === null || !last || !close) { unreadable++; continue; }
    const quiet = daysBetween(last, today), late = daysBetween(close, today);
    const why = [quiet > staleAfter ? `no activity for ${quiet} days` : "", late > 0 ? `close date passed ${late} days ago` : ""].filter(Boolean);
    if (!why.length) continue;
    total += value;
    byOwner.set(r.owner, (byOwner.get(r.owner) ?? 0) + value);
    rows.push([r.deal, r.owner, r.stage, inr(value), why.join("; ")]);
    tones.push(late > 0 ? "bad" : "warn");
  }
  return {
    stats: [
      { label: "Deals needing attention", value: String(rows.length), tone: rows.length ? "warn" : "good" },
      { label: "Value at risk", value: inr(total), tone: "bad" },
      ...[...byOwner].map(([o, v]) => ({ label: o, value: inr(v) })),
    ],
    columns: ["Deal", "Owner", "Stage", "Value", "Why it's flagged"],
    rows, rowTones: tones,
    notes: unreadable ? [`${unreadable} row(s) skipped: value or date couldn't be read.`] : [],
  };
}

// ---------- Build 2: GST quotation ----------
const ITEMS_CSV = `item,hsn,qty,rate,discount_pct,gst_pct
Laptop stand,8473,10,1499,10,18
Wireless mouse,8471,25,699,0,18
Desk organiser,3926,40,350,5,5`;

const QUOTE_SETTINGS = `Supplier: Your Company Pvt Ltd
Supplier state: Maharashtra
Customer: Brightline Facility Services
Customer state: Karnataka
Quote number: Q-2026-118`;

export function gstQuote([csv, conf]: string[]): RunResult {
  const s = settings(conf ?? "");
  const inter = (s["supplier state"] ?? "").toLowerCase() !== (s["customer state"] ?? "").toLowerCase();
  const rows: (string | number)[][] = [];
  let taxable = 0, gst = 0;
  for (const r of records(csv)) {
    const qty = Number(r.qty), rate = Number(r.rate), disc = Number(r.discount_pct || 0), pct = Number(r.gst_pct);
    const value = round2(qty * rate * (1 - disc / 100));
    const tax = round2((value * pct) / 100);
    taxable += value;
    gst += tax;
    rows.push([r.item, r.hsn, qty, inr2(rate), `${disc}%`, inr2(value), `${pct}%`, inr2(tax), inr2(value + tax)]);
  }
  taxable = round2(taxable); gst = round2(gst);
  const exact = round2(taxable + gst), total = Math.round(exact), roundOff = round2(total - exact);
  const half = round2(gst / 2);
  return {
    stats: [
      { label: "Taxable value", value: inr2(taxable) },
      ...(inter ? [{ label: "IGST", value: inr2(gst) }] : [{ label: "CGST", value: inr2(half) }, { label: "SGST", value: inr2(round2(gst - half)) }]),
      { label: "Round off", value: inr2(roundOff) },
      { label: "Total", value: inr(total), tone: "good" as Tone },
    ],
    columns: ["Item", "HSN", "Qty", "Rate", "Discount", "Taxable", "GST", "Tax", "Amount"],
    rows,
    notes: [
      `${inter ? "Inter-state supply (supplier and customer in different states): IGST." : "Intra-state supply: CGST + SGST, half each."}`,
      `Amount in words: Rupees ${indianWords(total)} Only.`,
    ],
  };
}

// ---------- Build 3: lead scorer that shows its working ----------
const LEADS_CSV = `company,employees,industry,source,budget,last_contact_days
Apex Manufacturing,450,Manufacturing,Referral,8L,3
Bright Retail,35,Retail,Website,50K,12
Crescent Pharma,120,Pharma,Webinar,,5
Dune Logistics,800,Logistics,Cold list,3L,40
Echo Studios,15,Media,Referral,2L,2
Fusion Textiles,260,Manufacturing,Website,,20`;

const TARGET = ["manufacturing", "pharma", "logistics"];
const SOURCE: Record<string, number> = { referral: 25, webinar: 15, website: 10, "cold list": 0 };

export function scoreLead(r: Record<string, string>) {
  const parts: string[] = [];
  const emp = Number(r.employees);
  const e = emp >= 200 ? 30 : emp >= 50 ? 20 : 10; parts.push(`size +${e}`);
  const ind = TARGET.includes(r.industry.toLowerCase()) ? 20 : 0; parts.push(`industry +${ind}`);
  const src = SOURCE[r.source.toLowerCase()] ?? 0; parts.push(`source +${src}`);
  const b = parseMoney(r.budget);
  const bud = b === null ? 10 : b >= 5_00_000 ? 25 : b >= 1_00_000 ? 15 : 5; parts.push(`budget +${bud}${b === null ? " (unknown)" : ""}`);
  const days = Number(r.last_contact_days);
  const rec = days <= 7 ? 10 : days <= 30 ? 5 : 0; parts.push(`recency +${rec}`);
  return { score: e + ind + src + bud + rec, why: parts.join(", ") };
}

export function leadScores([csv]: string[]): RunResult {
  const scored = records(csv).map((r) => ({ r, ...scoreLead(r) }))
    .sort((a, b) => b.score - a.score || a.r.company.localeCompare(b.r.company));
  return {
    stats: [{ label: "Top lead", value: `${scored[0]?.r.company} (${scored[0]?.score})`, tone: "good" }],
    columns: ["Rank", "Company", "Score", "How it was scored"],
    rows: scored.map((x, i) => [i + 1, x.r.company, x.score, x.why]),
    rowTones: scored.map((x) => (x.score >= 75 ? "good" : x.score < 40 ? "warn" : undefined)),
  };
}

export const SALES: Playbook = {
  slug: "sales",
  role: "Sales",
  title: "Sales Playbook",
  tagline: "Find the deals going cold, send GST-correct quotes in minutes, and know which leads to call first.",
  forWho: "Sales reps, account managers, inside sales, founders who sell",
  toolSlug: "gst-quotation",
  builds: [
    {
      id: "sales-stale-deals", title: "Stale-deal finder", minutes: "30 min", where: "browser",
      why: "Every Monday the pipeline review asks the same question: which deals have gone quiet? The CRM export has the answer, buried in dates and in values typed every possible way: ₹4,50,000, 1.2L, 85K.",
      files: [{ name: "deals.csv", content: DEALS_CSV }, { name: "settings.txt", content: DEALS_SETTINGS }],
      prompt: `Who it's for: I'm in sales. Every Monday I check my pipeline for deals
that have gone quiet.

What it does: I upload deals.csv (columns: deal, owner, stage, value,
last_activity, expected_close). Ignore deals whose stage starts with
"Closed". Flag an open deal if either:
- there's been no activity for more than 14 days, or
- its expected close date has already passed.
Use 2 November 2026 as today's date for now, in a box I can change.

Show the flagged deals in a table with the reason, the total value at
risk, and the total for each owner.

What good looks like: values written like ₹4,50,000, 3,75,000, 1.2L,
2.5 L and 85K are all read correctly (L means lakh, K means thousand).

What to avoid: never guess a value you can't read; list that row as
"couldn't read" instead.`,
      check: "4 deals need attention, worth ₹6,40,000 in total: BlueStone pilot (no activity for 28 days), Coastal Hotels (43 days), FreshMart chain (21 days) and Delta Logistics (its close date passed 8 days ago). By owner: Anita ₹4,35,000, Rahul ₹1,20,000, Priya ₹85,000.",
      trap: {
        title: "1.2L is not ₹1.20",
        text: "If your total looks like ₹4,35,086, the tool read 1.2L as 1.2 and 85K as 85. Indian sales files are full of lakh and thousand shorthand, and a tool built on Western examples treats them as plain numbers. No error, just a pipeline that's quietly under by lakhs.",
        fix: `I expected: total value at risk of ₹6,40,000.
What happened instead: [your total].

Values like 1.2L, 2.5 L and 85K mean 1,20,000, 2,50,000 and 85,000:
L or lakh is 1,00,000, K is 1,000, Cr is 1,00,00,000. Please read them
that way, ignore ₹ signs and commas, and explain what went wrong.`,
      },
      run: staleDeals,
      tryIt: [
        "Change the stale limit to 7 days. Which extra deal shows up? (Acme Foods renewal stays clear; it had activity 5 days ago.)",
        "Add a column showing how many days each flagged deal has been quiet, sorted with the quietest first.",
      ],
    },
    {
      id: "sales-gst-quote", title: "GST quotation generator", minutes: "35 min", where: "browser",
      why: "A customer wants a quote by end of day. Discounts, GST per item, the right tax heads for an out-of-state customer, the total in words: it's where small mistakes cost trust.",
      files: [{ name: "items.csv", content: ITEMS_CSV }, { name: "quote.txt", content: QUOTE_SETTINGS }],
      prompt: `Who it's for: I send quotations to business customers in India.

What it does: I upload items.csv (columns: item, hsn, qty, rate,
discount_pct, gst_pct) and fill in my state and the customer's state.
For each item: taxable value = qty x rate, less the discount. GST is
charged on the taxable value at that item's rate.

Show a quotation with each item, the taxable total, the tax, a round
off to the nearest rupee, the total, and the total in words the Indian
way ("Rupees Fifty Thousand Five Hundred Five Only"). Add a Print button.

What good looks like: every number can be checked with a calculator.

What to avoid: don't invent GST rates; use the rate in the file.`,
      check: "Taxable value ₹44,266.00; GST ₹6,238.88; round off +₹0.12; total ₹50,505, in words \"Rupees Fifty Thousand Five Hundred Five Only\". Because the supplier is in Maharashtra and the customer in Karnataka, the tax is IGST, not CGST + SGST.",
      trap: {
        title: "The right tax, under the wrong name",
        text: "Most first builds split the tax into CGST and SGST every time. The total is the same, so it looks fine. But between two states, GST is charged as IGST, and a quote or invoice with the wrong tax heads causes trouble for the customer's input tax credit. The brief never mentioned states, so the AI guessed.",
        fix: `I expected: IGST of ₹6,238.88, because the customer is in Karnataka
and we're in Maharashtra.
What happened instead: CGST and SGST.

When the supplier's state and the customer's state are different,
charge IGST. When they're the same, split it equally into CGST and
SGST. Add a field for each state and explain the change.`,
      },
      run: gstQuote,
      tryIt: [
        "Change the customer's state to Maharashtra: the total stays ₹50,505, and the tax splits into CGST ₹3,119.44 and SGST ₹3,119.44.",
        "Add a validity line (\"This quote is valid for 15 days\") and your bank details under the total.",
      ],
    },
    {
      id: "sales-lead-score", title: "Lead scorer that shows its working", minutes: "30 min", where: "browser",
      why: "Forty new leads and time to call ten. A score helps, but only if you can see why a lead scored high, so you can disagree with it.",
      files: [{ name: "leads.csv", content: LEADS_CSV }],
      prompt: `Who it's for: I'm in sales and get more leads than I can call.

What it does: I upload leads.csv (columns: company, employees, industry,
source, budget, last_contact_days). Score each lead out of 110 with
these rules, and show the points for each rule next to the score:
- size: 200+ employees 30, 50 to 199 20, under 50 10
- industry: Manufacturing, Pharma or Logistics 20, others 0
- source: Referral 25, Webinar 15, Website 10, Cold list 0
- budget: 5 lakh or more 25, 1 to 5 lakh 15, under 1 lakh 5,
  blank budget 10 (unknown, not zero)
- recency: contacted in the last 7 days 10, last 30 days 5, older 0
Sort by score, highest first.

What good looks like: I can see exactly why each lead got its score.

What to avoid: don't add rules I didn't ask for.`,
      check: "Apex Manufacturing first with 110. Then Crescent Pharma and Fusion Textiles, both 75 (each has a blank budget, scored 10 as unknown). Then Dune Logistics 65, Echo Studios 60 and Bright Retail 30.",
      trap: {
        title: "Unknown is not zero",
        text: "If Crescent Pharma and Fusion Textiles show 70 instead of 75, the tool treated a blank budget as zero budget. Blank means nobody asked yet, which is a reason to call, not a reason to rank lower. AI fills gaps with whatever seems tidy unless you say what a gap means.",
        fix: `I expected: Crescent Pharma and Fusion Textiles at 75.
What happened instead: [their scores].

A blank budget means unknown, not zero. Score it 10, as the rules say,
and show "budget +10 (unknown)" so I can see it. Explain what went wrong.`,
      },
      run: leadScores,
      tryIt: [
        "Add a rule of your own (for example, +10 for a city you serve) and check one lead by hand.",
        "Add a filter that shows only leads scoring 70 or more.",
      ],
    },
  ],
};

export const SALES_SAMPLE = { DEALS_CSV, DEALS_SETTINGS, ITEMS_CSV, QUOTE_SETTINGS, LEADS_CSV, shortDate };
