import type { Playbook, RunResult, Tone } from "./types.ts";
import { records, parseMoney, parseDate, inr, round2, settings, shortDate, DAY } from "./common.ts";

// ---------- Build 1: vendor quote comparator ----------
const QUOTES_CSV = `vendor,unit_price,qty,gst_pct,freight,freight_gst_pct,payment_days
Alpha Furniture,2450,500,18,15000,18,30
Beta Seating,2380,500,18,60000,18,15
Comfort Works,2520,500,18,0,0,45`;

export function vendorQuotes([csv]: string[]): RunResult {
  const list = records(csv).map((r) => {
    const goods = Number(r.unit_price) * Number(r.qty);
    const goodsTax = round2((goods * Number(r.gst_pct)) / 100);
    const freight = parseMoney(r.freight) ?? 0;
    const freightTax = round2((freight * Number(r.freight_gst_pct || 0)) / 100);
    return { r, unit: Number(r.unit_price), landed: round2(goods + goodsTax + freight + freightTax) };
  }).sort((a, b) => a.landed - b.landed);
  const best = list[0], cheapestUnit = [...list].sort((a, b) => a.unit - b.unit)[0];
  return {
    stats: [
      { label: "Lowest landed cost", value: `${best.r.vendor}, ${inr(best.landed)}`, tone: "good" },
      { label: "Lowest unit price", value: `${cheapestUnit.r.vendor}, ${inr(cheapestUnit.unit)}` },
    ],
    columns: ["Vendor", "Unit price", "Freight", "Landed cost (with GST)", "vs cheapest", "Payment terms"],
    rows: list.map((x) => [x.r.vendor, inr(x.unit), inr(parseMoney(x.r.freight) ?? 0), inr(x.landed), x === best ? "cheapest" : `+${inr(x.landed - best.landed)}`, `${x.r.payment_days} days`]),
    rowTones: list.map((x): Tone | undefined => (x === best ? "good" : undefined)),
    notes: ["Landed cost = goods + GST on goods + freight + GST on freight. Longer payment terms are worth something too: weigh them before deciding."],
  };
}

// ---------- Build 2: reorder alerts (Python) ----------
const STOCK_CSV = `item,unit,on_hand,daily_usage,lead_time_days,safety_stock,pack_size
A4 paper,ream,40,6,5,10,5
Printer toner,piece,3,0.2,10,2,1
Coffee beans,kg,12,1.5,4,5,2
Hand sanitiser,bottle,8,1,7,6,12
Paper cups,piece,900,150,3,300,1000`;

export function reorder([csv]: string[]): RunResult {
  const rows: (string | number)[][] = [];
  for (const r of records(csv)) {
    const usage = Number(r.daily_usage), onHand = Number(r.on_hand), safety = Number(r.safety_stock), pack = Number(r.pack_size) || 1;
    const point = round2(usage * Number(r.lead_time_days) + safety);
    if (onHand > point) continue;
    const need = usage * 30 + safety - onHand;
    const order = Math.ceil(round2(need) / pack) * pack;
    rows.push([r.item, `${onHand} ${r.unit}`, point, `${order} ${r.unit}`, `${order / pack} × ${pack}`]);
  }
  return {
    stats: [{ label: "Items to reorder", value: String(rows.length), tone: rows.length ? "warn" : "good" }],
    columns: ["Item", "On hand", "Reorder point", "Order", "Packs"],
    rows, rowTones: rows.map(() => "warn"),
    notes: ["Reorder point = daily usage × lead time + safety stock. Order enough for 30 days plus safety stock, rounded up to whole packs."],
  };
}

// ---------- Build 3: team workload heatmap ----------
const TASKS_CSV = `owner,task,due,estimate
Priya,Q3 report,2026-11-04,2d
Priya,Client deck,2026-11-06,12h
Priya,Budget review,2026-11-05,1.5d
Rahul,Vendor onboarding,2026-11-03,6h
Rahul,Training prep,2026-11-10,3d
Anita,Audit support,2026-11-02,3d
Anita,Payroll checks,2026-11-06,20h
Anita,Policy update,2026-11-12,4h
Mohammed,Hiring plan,2026-11-11,2d`;

const WORKLOAD_SETTINGS = `First week starts: 2026-11-02
Weeks: 2
Hours per day: 8
Capacity per week: 40`;

export function hours(estimate: string, perDay: number) {
  const m = /^\s*(\d+(?:\.\d+)?)\s*(h|hr|hrs|hours?|d|days?)?\s*$/i.exec(estimate);
  if (!m) return null;
  return /^d/i.test(m[2] ?? "h") ? Number(m[1]) * perDay : Number(m[1]);
}

export function workload([csv, conf]: string[]): RunResult {
  const s = settings(conf ?? "");
  const start = parseDate(s["first week starts"])!, weeks = Number(s.weeks ?? 2), perDay = Number(s["hours per day"] ?? 8), cap = Number(s["capacity per week"] ?? 40);
  const grid = new Map<string, number[]>();
  for (const r of records(csv)) {
    const w = Math.floor((parseDate(r.due)!.getTime() - start.getTime()) / (7 * DAY));
    const h = hours(r.estimate, perDay);
    if (!grid.has(r.owner)) grid.set(r.owner, Array(weeks).fill(0));
    if (w >= 0 && w < weeks && h !== null) grid.get(r.owner)![w] += h;
  }
  const label = (w: number) => `Week of ${shortDate(new Date(start.getTime() + w * 7 * DAY))}`;
  const over = [...grid].flatMap(([o, hs]) => hs.map((h, w) => (h > cap ? `${o}, ${label(w)} (${h}h)` : ""))).filter(Boolean);
  return {
    stats: [{ label: `Over ${cap}h`, value: over.length ? over.join("; ") : "nobody", tone: over.length ? "bad" : "good" }],
    columns: ["Person", ...Array.from({ length: weeks }, (_, w) => label(w))],
    rows: [...grid].map(([o, hs]) => [o, ...hs.map((h) => `${h}h${h > cap ? " (over)" : h < cap / 2 ? " (light)" : ""}`)]),
    rowTones: [...grid].map(([, hs]): Tone | undefined => (hs.some((h) => h > cap) ? "bad" : undefined)),
    notes: [`Estimates in days count ${perDay} hours a day. Each task counts in the week it's due.`],
  };
}

export const OPS: Playbook = {
  slug: "operations",
  role: "Operations & managers",
  title: "Operations & Managers Playbook",
  tagline: "Pick the vendor that's actually cheapest, reorder before you run out, and see who on the team is overloaded this week.",
  forWho: "Operations, admin, procurement, team leads and managers",
  toolSlug: "vendor-quotes",
  yourTurn: [
    "A service schedule for vehicles, ACs or other equipment",
    "A daily attendance summary from the biometric export",
    "A courier cost comparison per shipment",
    "A meeting room booking clash checker",
  ],
  builds: [
    {
      id: "ops-vendor-quotes", title: "Vendor quote comparator", minutes: "25 min", where: "browser",
      why: "Three quotes for 500 office chairs. The lowest unit price jumps out, but freight, GST on freight and payment terms change the answer. A comparison of landed cost settles it in one table.",
      files: [{ name: "quotes.csv", content: QUOTES_CSV }],
      prompt: `Who it's for: I compare supplier quotes before we buy.

What it does: I upload quotes.csv (columns: vendor, unit_price, qty,
gst_pct, freight, freight_gst_pct, payment_days). For each vendor:
landed cost = unit price x qty, plus GST on that, plus freight, plus GST
on freight. Rank vendors by landed cost, cheapest first, and show how
much more each one costs than the cheapest. Show payment terms too.

What good looks like: the cheapest vendor on paper and the cheapest in
reality are both visible.

What to avoid: don't leave out freight or the GST on it.`,
      check: "Alpha Furniture is cheapest at ₹14,63,200 landed. Beta Seating has the lowest unit price (₹2,380) but its ₹60,000 freight makes it ₹14,75,000, ₹11,800 more. Comfort Works is ₹14,86,800 (free delivery, but a higher price), with the longest payment terms (45 days).",
      trap: {
        pattern: "unstated",
        title: "The cheapest price isn't the cheapest buy",
        text: "If Beta Seating comes out on top, the tool compared unit prices only, or left freight out. ₹70 less per chair looks like a win until ₹60,000 of freight (₹70,800 with GST) arrives on the invoice.",
        fix: `I expected: Alpha Furniture cheapest, at ₹14,63,200.
What happened instead: [your ranking].

Rank by landed cost: goods + GST on goods + freight + GST on freight.
Explain what went wrong, then fix it.`,
      },
      run: vendorQuotes,
      tryIt: [
        "Add a fourth quote with a 2% early-payment discount, and show it in the comparison.",
        "Add a column for delivery days, and highlight any vendor slower than 2 weeks.",
      ],
    },
    {
      id: "ops-reorder", title: "Reorder alerts", minutes: "35 min", where: "python",
      why: "Running out of printer toner the day before a board meeting is avoidable. A small script that checks stock against usage and supplier lead times tells you what to order, and how much, every morning.",
      files: [{ name: "stock.csv", content: STOCK_CSV }],
      prompt: `Who it's for: I manage office supplies and stock.

What it does: write a Python script called reorder.py. It reads
stock.csv (columns: item, unit, on_hand, daily_usage, lead_time_days,
safety_stock, pack_size). For each item:
- reorder point = daily usage x lead time + safety stock
- if on hand is at or below the reorder point, order enough for 30 days
  of usage plus safety stock, minus what's on hand, rounded UP to whole
  packs (pack_size)
Print the items to reorder, with how many to order and how many packs.

What good looks like: I can paste the list straight into a purchase order.

What to avoid: never order a part of a pack.`,
      check: "3 items to reorder: A4 paper 150 reams (30 packs of 5), printer toner 5, and hand sanitiser 36 bottles (3 cartons of 12). Coffee beans (12 kg, reorder point 11) and paper cups (900, reorder point 750) are fine.",
      trap: {
        pattern: "units",
        title: "Ordering 28 bottles from a supplier who sells 12 at a time",
        text: "If hand sanitiser says 28, the maths is right and the order is wrong: the supplier sells cartons of 12, so you'll either get 24 and run short, or a phone call asking what you meant. Rounding up to whole packs is the rule a first build usually forgets.",
        fix: `I expected: hand sanitiser 36 bottles (3 packs of 12).
What happened instead: 28.

Round every order up to a whole number of packs using pack_size. Explain
what went wrong, then give me the whole script again.`,
      },
      run: reorder,
      tryIt: [
        "Change printer toner's lead time to 20 days. How much should you order now?",
        "Make the script write the order list to an Excel file for purchasing.",
      ],
    },
    {
      id: "ops-workload", title: "Team workload heatmap", minutes: "30 min", where: "browser",
      why: "\"Can you take this on?\" is easier to answer with a picture of the week. A task export with estimates becomes hours per person per week, with the overloaded and the under-used both visible.",
      files: [{ name: "tasks.csv", content: TASKS_CSV }, { name: "settings.txt", content: WORKLOAD_SETTINGS }],
      prompt: `Who it's for: I lead a small team and plan the week.

What it does: I upload tasks.csv (columns: owner, task, due, estimate).
Estimates are written like 6h, 12h, 2d or 1.5d; a day is 8 hours. Count
each task in the week it's due, starting with the week of 2 November
2026, for two weeks. Show a grid of hours per person per week, red when
someone's over 40 hours, and say who's light (under 20).

What good looks like: I can see at a glance who to give the next task to.

What to avoid: never read 2d as 2 hours.`,
      check: "Week of 2 Nov: Anita 44h (over 40), Priya 40h, Rahul 6h (light), Mohammed 0h. Week of 9 Nov: Rahul 24h, Mohammed 16h, Anita 4h, Priya 0h.",
      trap: {
        pattern: "units",
        title: "2 days read as 2 hours",
        text: "If nobody looks busy, the tool read 2d as 2 hours: Anita drops from 44 hours to 23, and the one person who needs help looks free. Task estimates mix hours and days everywhere, so the tool has to read both.",
        fix: `I expected: Anita at 44 hours in the week of 2 November.
What happened instead: [her hours].

Estimates ending in d are days: multiply by 8. Estimates ending in h are
hours. Explain what went wrong, then fix it.`,
      },
      run: workload,
      tryIt: [
        "Give Rahul's Vendor onboarding to Mohammed and check both weeks.",
        "Add each person's leave days, and lower their capacity for that week.",
      ],
    },
  ],
};
