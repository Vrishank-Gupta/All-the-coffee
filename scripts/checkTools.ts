// Known-answer checks for the free tools in src/lib/tools. Run: npx tsx scripts/checkTools.ts
// Every expected value here is worked out by hand or taken from a published worked example,
// never copied from the tool's own output.
import { incomeTax, slabTax, ctcToInHand, CTC_DEFAULTS } from "../src/lib/tools/ctc.ts";
import { indianWords, rupeesInWords, inr, longDate, parseCsv, makeLetters, SAMPLE_JOINERS_CSV, DEFAULT_TEMPLATE } from "../src/lib/tools/letters.ts";
import { readInvoiceText, parseAmount, checkText } from "../src/lib/tools/invoices.ts";
import { findFlags, SAMPLE_CONTRACT } from "../src/lib/tools/contract.ts";
import { normalizePhone, whatsappLink, fillTemplate, statusOf, sortLeads, type Lead } from "../src/lib/tools/whatsapp.ts";

let failed = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}: ${JSON.stringify(got)}${ok ? "" : ` (want ${JSON.stringify(want)})`}`);
}

// --- CTC / income tax, new regime FY 2026-27 ---
eq("slab tax at 4L", slabTax(4_00_000), 0);
eq("slab tax at 12L", slabTax(12_00_000), 60_000); // 20,000 + 40,000
eq("slab tax at 24L", slabTax(24_00_000), 3_00_000); // 20k + 40k + 60k + 80k + 100k
eq("slab tax at 30L", slabTax(30_00_000), 4_80_000); // + 30% of 6L
eq("12L taxable: rebate makes it nil", incomeTax(12_00_000).total, 0);
// CAclubindia worked example: 12.5L total income -> 67,500 slab tax, capped at 50,000, + 2,000 cess
eq("12.5L taxable: marginal relief", incomeTax(12_50_000), { slab: 67_500, rebate: 17_500, tax: 50_000, cess: 2_000, total: 52_000 });
eq("13L taxable: relief no longer binds", incomeTax(13_00_000).tax, 75_000); // 60k + 15% of 1L = 75k < 1L cap
eq("20L taxable", incomeTax(20_00_000).total, Math.round(2_00_000 * 1.04));

// 12 LPA, 50% basic, PF capped at Rs 25,000/month, gratuity in CTC, PT 2,500:
// basic 6,00,000; employer PF 12% of 3,00,000 = 36,000; gratuity 4.81% of 6L = 28,860;
// gross 11,35,140; taxable 10,60,140 -> nil tax; in hand 11,35,140 - 36,000 - 2,500 = 10,96,640
const twelve = ctcToInHand(CTC_DEFAULTS);
eq("12 LPA gross", twelve.gross, 11_35_140);
eq("12 LPA tax", twelve.totalTax, 0);
eq("12 LPA in hand / year", twelve.inHandYear, 10_96_640);
eq("12 LPA in hand / month", twelve.inHandMonth, 91_387);

// 13.9 LPA, same settings: basic 6,95,000; PF 36,000; gratuity 33,430 (33,429.5 rounded);
// gross 13,20,570; taxable 12,45,570; slab tax 60,000 + 15% of 45,570 = 66,836;
// marginal relief caps it at 45,570; cess 1,823; total 47,393
const trap = ctcToInHand({ ...CTC_DEFAULTS, ctc: 13_90_000 });
eq("13.9 LPA taxable", trap.taxable, 12_45_570);
eq("13.9 LPA tax with relief", { slab: trap.slabTax, tax: trap.tax, cess: trap.cess, total: trap.totalTax }, { slab: 66_836, tax: 45_570, cess: 1_823, total: 47_393 });

// PF on full basic: 12 LPA -> 12% of 6L = 72,000 each side
eq("full-basic PF", ctcToInHand({ ...CTC_DEFAULTS, pf: "full" }).employerPf, 72_000);
eq("no PF, no gratuity: gross = CTC", ctcToInHand({ ...CTC_DEFAULTS, pf: "none", gratuityInCtc: false }).gross, 12_00_000);
eq("60L flagged as out of range", ctcToInHand({ ...CTC_DEFAULTS, ctc: 60_00_000 }).tooHigh, true);

// --- WhatsApp follow-ups ---
for (const [typed, want] of [
  ["98200 12345", "919820012345"], ["098200-12345", "919820012345"], ["+91 98200 12345", "919820012345"],
  ["+91-98200-12345", "919820012345"], ["0091 9820012345", "919820012345"], ["919820012345", "919820012345"],
  ["(982) 001-2345", "919820012345"], ["12345", null], ["5820012345", null], ["+44 20 7946 0958", "442079460958"],
] as const) eq(`phone "${typed}"`, normalizePhone(typed), want);
// '#' and '&' must be encoded or WhatsApp cuts the message off there; spaces become %20
eq("link encodes # and &", whatsappLink("098200 12345", "Hi Rahul, quote #A-104 & samples"),
  "https://wa.me/919820012345?text=Hi%20Rahul%2C%20quote%20%23A-104%20%26%20samples");
eq("bad number gives no link", whatsappLink("12345", "hi"), null);
eq("template", fillTemplate("Hi {name}, about {about}, due {date}", { name: "Rahul Verma", about: "the revised quote", due: "2026-11-05" }),
  "Hi Rahul, about the revised quote, due 5 Nov");
const L = (id: string, due: string, done = false): Lead => ({ id, name: id, phone: "", about: "", due, done });
const leads = [L("later", "2026-11-09"), L("done", "2026-10-01", true), L("today", "2026-11-01"), L("late", "2026-10-28"), L("soon", "2026-11-02")];
eq("status overdue", statusOf(leads[3], "2026-11-01"), "overdue");
eq("sort: overdue, today, upcoming by date, done", sortLeads(leads, "2026-11-01").map((l) => l.id), ["late", "today", "soon", "later", "done"]);

// --- Offer letters ---
for (const [n, w] of [
  [12_00_000, "Twelve Lakh"], [12_50_000, "Twelve Lakh Fifty Thousand"], [9_50_000, "Nine Lakh Fifty Thousand"],
  [18_25_000, "Eighteen Lakh Twenty Five Thousand"], [1_00_000, "One Lakh"], [1_05_000, "One Lakh Five Thousand"],
  [99_999, "Ninety Nine Thousand Nine Hundred Ninety Nine"], [2_50_00_000, "Two Crore Fifty Lakh"],
  [1_01_01_101, "One Crore One Lakh One Thousand One Hundred One"], [7, "Seven"], [0, "Zero"],
] as const) eq(`words ${n}`, indianWords(n), w);
eq("rupees in words", rupeesInWords(14_75_000), "Rupees Fourteen Lakh Seventy Five Thousand Only");
eq("inr", inr(12_50_000), "₹12,50,000");
eq("long date", longDate("2026-12-01"), "1 December 2026");
eq("bad date", longDate("2026-02-30"), null);
eq("csv keeps quoted commas", parseCsv('a,b\n1,"12,50,000"\n')[1], ["1", "12,50,000"]);
const L9 = makeLetters(SAMPLE_JOINERS_CSV, DEFAULT_TEMPLATE, { company: "Example Pvt Ltd", signatory: "HR Team", letterDate: "2026-11-15" });
eq("8 joiners -> 7 ready, 1 with a problem", [L9.letters.length, L9.letters.filter((l) => !l.problems.length).length], [8, 7]);
eq("Rohan's row is flagged", L9.letters.filter((l) => l.problems.length).map((l) => [l.row, l.name, l.problems]), [[7, "Rohan Das", ["designation is empty"]]]);
const arjun = L9.letters.find((l) => l.name === "Arjun Malhotra")!.text;
eq("Arjun: quoted CTC read right", arjun.includes("₹12,50,000 (Rupees Twelve Lakh Fifty Thousand Only)"), true);
eq("Priya: first name and date", L9.letters[0].text.startsWith("15 November 2026\n\nDear Priya,"), true);
eq("no placeholder left in a ready letter", L9.letters.filter((l) => !l.problems.length).some((l) => /\{\w+\}/.test(l.text)), false);
eq("missing column reported", makeLetters("name,ctc\nA,1", DEFAULT_TEMPLATE, { company: "", signatory: "", letterDate: "" }).missingColumns, ["designation", "department", "location", "manager", "joining_date"]);

// --- Invoice reader (the sample PDFs are checked end to end in the browser test) ---
eq("amount with Indian commas", parseAmount("1,18,000.00"), 118000);
const inv1 = readInvoiceText("Acme Traders\nGSTIN: 27TESTA2001A1Z1\nBill No. AC/77  Dated 5 Nov 2026\nSub Total  1,00,000\nIGST @ 18%  18,000\nAmount Payable  Rs 1,18,000", "a.pdf");
eq("other labels", [inv1.number, inv1.date, inv1.taxable, inv1.gst, inv1.total, inv1.status], ["AC/77", "5 Nov 2026", 100000, 18000, 118000, "ok"]);
const inv2 = readInvoiceText("Beta Co\nInvoice No: B-1\nTaxable Value: 1,000.00\nCGST @ 9%: 90.00\nSGST @ 9%: 90.00\nTotal: 1,200.00");
eq("mismatch found", [inv2.status, inv2.difference], ["mismatch", 20]);
eq("missing GST line -> incomplete, not guessed", readInvoiceText("Gamma\nInvoice No: G-1\nTotal: 500").status, "incomplete");
eq("mismatch wording", checkText(inv2), "Total is ₹20 more than taxable + GST");
eq("empty text -> unreadable", readInvoiceText("  \n ").status, "unreadable");

// --- Contract red flags: what each planted clause should produce, and nothing else ---
const flags = findFlags(SAMPLE_CONTRACT).map((f) => [f.clause, f.key, f.detail]);
eq("sample contract flags", flags, [
  ["2", "auto-renewal", ""], ["2", "notice", "90 days"],
  ["3", "price-increase", "10%"],
  ["4", "late-payment", "24%"],
  ["5", "notice", "60 days"], ["5", "lock-in", ""],
  ["6", "liability-cap", ""], ["6", "indemnity", "without limit"],
  ["8", "non-solicit", "24 months"],
  ["9", "jurisdiction", "Kolkata"],
]);
eq("confidentiality and notices are not flagged", findFlags(SAMPLE_CONTRACT).some((f) => ["7", "10", "1"].includes(f.clause)), false);
eq("other wording", findFlags("This agreement shall auto-renew yearly. Disputes go to arbitration in Delhi.").map((f) => f.key), ["auto-renewal", "jurisdiction"]);

if (failed) {
  console.log(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll checks passed");
