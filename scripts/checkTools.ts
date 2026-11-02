// Known-answer checks for the free tools in src/lib/tools. Run: npx tsx scripts/checkTools.ts
// Every expected value here is worked out by hand or taken from a published worked example,
// never copied from the tool's own output.
import { incomeTax, slabTax, ctcToInHand, CTC_DEFAULTS } from "../src/lib/tools/ctc.ts";
import { indianWords, rupeesInWords, inr, longDate, parseCsv, makeLetters, SAMPLE_JOINERS_CSV, DEFAULT_TEMPLATE } from "../src/lib/tools/letters.ts";
import { readInvoiceText, parseAmount, checkText } from "../src/lib/tools/invoices.ts";
import { findFlags, SAMPLE_CONTRACT } from "../src/lib/tools/contract.ts";
import { PLAYBOOKS } from "../src/lib/playbooks/index.ts";
import { parseMoney, parseDate } from "../src/lib/playbooks/common.ts";
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

// --- Role Playbooks: each build's reference answer, on its own sample files ---
const B = Object.fromEntries(PLAYBOOKS.flatMap((p) => p.builds).map((b) => [b.id, b.run(b.files.map((f) => f.content))]));
const stat = (id: string, label: string) => B[id].stats.find((x) => x.label === label)?.value;
for (const [t, want] of [["₹4,50,000", 450000], ["1.2L", 120000], ["2.5 L", 250000], ["85K", 85000], ["1.5 Cr", 15000000], ["3 lakh", 300000], ["", null], ["n/a", null]] as const)
  eq(`money "${t}"`, parseMoney(t), want);
eq("dates: ISO and day-first", [parseDate("2026-11-02")?.toISOString().slice(0, 10), parseDate("02/11/2026")?.toISOString().slice(0, 10), parseDate("31/02/2026")], ["2026-11-02", "2026-11-02", null]);
// Sales 1: worked by hand and in a separate Python check
eq("stale deals", [stat("sales-stale-deals", "Deals needing attention"), stat("sales-stale-deals", "Value at risk"), stat("sales-stale-deals", "Anita"), stat("sales-stale-deals", "Rahul"), stat("sales-stale-deals", "Priya")],
  ["4", "₹6,40,000", "₹4,35,000", "₹1,20,000", "₹85,000"]);
// Sales 2: taxable 13,491 + 17,475 + 13,300; GST 2,428.38 + 3,145.50 + 665.00
eq("gst quote", [stat("sales-gst-quote", "Taxable value"), stat("sales-gst-quote", "IGST"), stat("sales-gst-quote", "Round off"), stat("sales-gst-quote", "Total")],
  ["₹44,266.00", "₹6,238.88", "₹0.12", "₹50,505"]);
eq("gst quote words", B["sales-gst-quote"].notes?.[1], "Amount in words: Rupees Fifty Thousand Five Hundred Five Only.");
// Sales 3: Apex 30+20+25+25+10; Crescent 20+20+15+10+10; Fusion 30+20+10+10+5; Dune 30+20+0+15+0; Echo 10+0+25+15+10; Bright 10+0+10+5+5
eq("lead order", B["sales-lead-score"].rows.map((r) => `${r[1]} ${r[2]}`), ["Apex Manufacturing 110", "Crescent Pharma 75", "Fusion Textiles 75", "Dune Logistics 65", "Echo Studios 60", "Bright Retail 30"]);

// Marketing: 4 campaign spellings to 1; sources 6 to 5
eq("utm", [stat("marketing-utm", "Campaign spellings"), stat("marketing-utm", "Sources"), stat("marketing-utm", "Rows tidied")], ["4 → 1", "6 → 5", "6"]);
eq("utm keeps ?ref with &", B["marketing-utm"].rows[2][0], "https://allthecoffee.in/tools?ref=home&utm_source=newsletter&utm_medium=email&utm_campaign=diwali-sale&utm_content=top-banner");
eq("roas", [stat("marketing-roas", "Total spend"), stat("marketing-roas", "Revenue from ads"), stat("marketing-roas", "Overall ROAS"), stat("marketing-roas", "Below 2x")], ["₹58,250", "₹1,54,730", "2.66x", "3"]);
eq("claims", [stat("marketing-captions", "Ready to use"), B["marketing-captions"].rows.map((r) => r[2])], ["1 of 3", ["ready to use", `"10000" isn't in your draft; banned word "best"`, `"15" isn't in your draft; banned word "guaranteed"`]]);
// Finance
eq("ageing", ["Outstanding", "Overdue", "Not yet due", "1 to 30 days", "31 to 60 days", "61 to 90 days", "Over 90 days"].map((l) => stat("finance-ageing", l)),
  ["₹2,78,100", "₹2,30,900", "₹47,200", "₹74,400", "₹1,18,000", "₹0", "₹38,500"]);
eq("ageing reminders", B["finance-ageing"].notes?.length, 3);
eq("statement", [stat("finance-statement", "Income"), stat("finance-statement", "Spending"), stat("finance-statement", "Left over"), B["finance-statement"].rows.find((r) => r[0] === "Shopping")?.[1]], ["₹85,000", "₹29,519", "₹55,481", "₹2,200"]);
eq("expenses", [stat("finance-expenses", "Claimed"), stat("finance-expenses", "Over policy"), stat("finance-expenses", "Within policy"), B["finance-expenses"].rows.length], ["₹18,260", "₹1,270", "₹16,990", 3]);
// Product
eq("themes", [stat("product-themes", "Quotes not found"), stat("product-themes", "Comments not covered"), stat("product-themes", "Slow performance"), stat("product-themes", "Price")], ["2", "1", "3 comments", "2 comments"]);
eq("rice order", B["product-rice"].rows.map((r) => `${r[1]} ${r[6]}`), ["Dark mode 675", "Excel export 640", "WhatsApp alerts 437.5", "Bulk upload 180", "SSO login 133.3"]);
eq("release notes", [B["product-release-notes"].rows.map((r) => r[2]), stat("product-release-notes", "Left out")], [["ATC-101", "ATC-108", "ATC-105", "ATC-103", "ATC-107"], "3"]);
// HR
eq("lop", [stat("hr-lop", "Total deduction"), B["hr-lop"].rows.map((r) => r[4])], ["₹11,387.10", ["₹0.00", "₹7,258.06", "₹2,903.23", "₹0.00", "₹1,225.81"]]);
eq("blind notes", [stat("hr-blind-notes", "Names hidden"), stat("hr-blind-notes", "Pronouns made neutral"), stat("hr-blind-notes", "Names still visible")], ["4", "3", "0"]);
eq("blind text", B["hr-blind-notes"].rows[0][0], "Candidate A: Strong on Excel modelling. They explained the variance analysis clearly. Candidate A asked good questions about the team.");
eq("leave", B["hr-leave"].rows.map((r) => `${r[0]} ${r[4]}`), ["Priya Nair 20.5", "Arjun Malhotra 4", "Kavya Reddy 7", "Mohammed Khan 10.5", "Vikram Singh 0"]);
// Legal
eq("compare", ["Unchanged", "Changed", "Added", "Removed"].map((l) => stat("legal-compare", l)), ["3", "2", "1", "1"]);
eq("compare detail", B["legal-compare"].rows.map((r) => `${r[0]}: ${r[1]}${r[1] === "Changed" ? " " + r[2] : ""}`), ["Payment: Changed 30 → 15", "Notice: Changed 60 → 90", "Termination for convenience: Removed", "Renewal: Added"]);
eq("renewals", B["legal-renewals"].rows.map((r) => `${r[0]} ${r[3]} ${r[4]}`), [
  "Housekeeping 1 Sep 2026 Missed by 62 days: renews automatically", "Office lease 2 Oct 2026 Missed by 31 days: decide now",
  "Software licence 15 Dec 2026 Act within 43 days", "Annual maintenance 30 Dec 2026 Act within 58 days", "Courier services 1 May 2027 Later"]);
eq("citations", B["legal-citations"].rows.map((r) => `${r[0]} | ${r[2]}`), [
  "Mehra v. Union Textiles | Verified", "Kapoor v. State Bank Staff Union | Year differs: your list says 2016",
  "Rao v. Deccan Mills | Not found in your verified list", "Iyer vs Coastal Shipping | Verified"]);
// Operations
eq("vendors", B["ops-vendor-quotes"].rows.map((r) => `${r[0]} ${r[3]}`), ["Alpha Furniture ₹14,63,200", "Beta Seating ₹14,75,000", "Comfort Works ₹14,86,800"]);
eq("reorder", B["ops-reorder"].rows.map((r) => `${r[0]} ${r[3]}`), ["A4 paper 150 ream", "Printer toner 5 piece", "Hand sanitiser 36 bottle"]);
eq("workload", B["ops-workload"].rows.map((r) => r.join(" ")), ["Priya 40h 0h (light)", "Rahul 6h (light) 24h", "Anita 44h (over) 4h (light)", "Mohammed 0h (light) 16h (light)"]);

if (failed) {
  console.log(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll checks passed");
