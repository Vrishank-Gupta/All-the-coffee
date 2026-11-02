// Spot the Trap (/practice): short drills where a tool built with AI gives a confident, wrong answer
// and the learner works out why. One drill per trap pattern in src/lib/method.ts, plus a second on
// Indian formats because it's the most common. Every number is worked out in scripts/checkTools.ts.

export interface Drill {
  id: string;
  trap: string; // a trap id from src/lib/method.ts
  title: string;
  brief: string; // what the tool was asked to do
  input: { columns: string[]; rows: string[][] };
  output: string; // what the tool said
  options: string[];
  answer: number; // index into options
  why: string; // the explanation, with the right result
  brief_fix: string; // the line that belongs in the brief
}

export const DRILLS: Drill[] = [
  {
    id: "dates", trap: "formats", title: "The overdue invoice",
    brief: "Today is 15 March 2026. List invoices that are overdue, and by how many days.",
    input: { columns: ["Invoice", "Customer", "Due date"], rows: [["INV-31", "Sharma Traders", "03/04/2026"], ["INV-32", "Kaveri Foods", "28/02/2026"]] },
    output: "Overdue: INV-31 (11 days), INV-32 (15 days).",
    options: ["INV-32 is wrong: February has 29 days in 2026", "INV-31 is wrong: the tool read 03/04/2026 as 4 March", "Both are right"],
    answer: 1,
    why: "In India 03/04/2026 means 3 April, so INV-31 isn't due for another 19 days. The tool read it the American way, month first, as 4 March: 11 days before 15 March. INV-32 is right: 28 February to 15 March is 15 days.",
    brief_fix: "Dates are day first, like 03/04/2026 for 3 April.",
  },
  {
    id: "lakh", trap: "formats", title: "The pipeline total",
    brief: "Add up the value of all open deals.",
    input: { columns: ["Deal", "Value"], rows: [["Coastal Hotels", "2.5L"], ["FreshMart", "₹80,000"], ["BlueStone", "1.2L"]] },
    output: "Total pipeline: ₹80,003.70",
    options: ["It read 2.5L and 1.2L as 2.5 and 1.2 rupees", "It skipped the ₹ sign", "It's right: L stands for a currency code"],
    answer: 0,
    why: "L means lakh: 2.5L is ₹2,50,000 and 1.2L is ₹1,20,000, so the total is ₹4,50,000. The tool treated them as plain numbers: 80,000 + 2.5 + 1.2 = 80,003.70. No error, just a pipeline under by lakhs.",
    brief_fix: "Values may be written as 2.5L (lakh) or 85K (thousand). Read them as rupees.",
  },
  {
    id: "blank", trap: "blank", title: "The lead with no budget",
    brief: "Score each lead out of 100. Budget over ₹5 lakh scores 40 points.",
    input: { columns: ["Lead", "Budget", "Replied"], rows: [["Crescent Pharma", "", "Yes"], ["Nova Retail", "₹2,00,000", "Yes"]] },
    output: "Crescent Pharma: budget ₹0, scored lowest. Nova Retail ranked higher.",
    options: ["Nova Retail should score 40 for budget", "The blank budget was read as ₹0, when it means nobody has asked yet", "Leads who replied should be ranked first"],
    answer: 1,
    why: "A blank cell means unknown, not zero. Crescent Pharma might have the biggest budget on the list; nobody has asked. The tool filled the gap with the tidiest guess, 0, and quietly pushed the lead down.",
    brief_fix: "A blank budget means unknown: show it as \"ask\", don't score it as zero.",
  },
  {
    id: "totals", trap: "totals", title: "The expense summary",
    brief: "How much did the team spend this month?",
    input: { columns: ["Category", "Amount"], rows: [["Travel", "12,000"], ["Meals", "3,000"], ["Software", "5,000"], ["Total", "20,000"]] },
    output: "Total spend: ₹40,000",
    options: ["Software is counted twice", "The Total row was added as if it were spending", "The amounts have commas, so they were doubled"],
    answer: 1,
    why: "Exported reports often end with a Total row. Added in with the rest, it doubles the answer: 12,000 + 3,000 + 5,000 + 20,000 = 40,000. The real spend is ₹20,000. A quick check by hand catches it straight away.",
    brief_fix: "Skip any row named Total or Subtotal.",
  },
  {
    id: "units", trap: "units", title: "The workload estimate",
    brief: "Add up the time left on each task. A working day is 8 hours.",
    input: { columns: ["Task", "Estimate"], rows: [["Vendor onboarding", "3d"], ["Price list update", "4h"], ["Audit prep", "2d"]] },
    output: "Total time left: 9 hours.",
    options: ["It read 3d and 2d as hours", "It forgot the 4h task", "9 hours is right"],
    answer: 0,
    why: "3d and 2d are days: 24 hours and 16 hours. With the 4-hour task, that's 44 hours, more than a working week. The tool read every number as hours: 3 + 4 + 2 = 9. The team looks free when it's full.",
    brief_fix: "Estimates are in days (d) or hours (h). A day is 8 hours. Convert everything to hours first.",
  },
  {
    id: "scope", trap: "scope", title: "The meal allowance",
    brief: "Policy: meals up to ₹1,000 per day. Flag claims over the limit.",
    input: { columns: ["Date", "Claim", "Amount"], rows: [["12 Oct", "Lunch", "₹600"], ["12 Oct", "Dinner", "₹700"], ["13 Oct", "Dinner", "₹900"]] },
    output: "All claims are within policy.",
    options: ["13 Oct is over the limit", "It checked each meal against ₹1,000 instead of each day: 12 Oct is ₹1,300", "Lunch isn't covered by the policy"],
    answer: 1,
    why: "Each meal is under ₹1,000, so a meal-by-meal check passes everything. But the limit is per day, and 12 October adds up to ₹600 + ₹700 = ₹1,300, over by ₹300. The rule was right; it was applied at the wrong level.",
    brief_fix: "The limit is per person, per day: add up all meals on the same date before comparing.",
  },
  {
    id: "stale", trap: "stale", title: "The PF calculation",
    brief: "Work out the employer's PF contribution each month. Basic salary is ₹40,000.",
    input: { columns: ["Employee", "Basic (monthly)"], rows: [["Asha", "₹40,000"]] },
    output: "Employer PF: ₹1,800 a month (12% of the ₹15,000 wage ceiling).",
    options: ["It should be 12% of ₹40,000", "The ceiling is out of date: it's been ₹25,000 since 17 September 2026, so it's ₹3,000", "₹1,800 is right"],
    answer: 1,
    why: "The AI learned the old ₹15,000 ceiling. Since 17 September 2026 it's ₹25,000, so 12% gives ₹3,000 a month. Rules that change (tax, PF, prices) must be written into the brief, never left to the AI's memory.",
    brief_fix: "The PF wage ceiling is ₹25,000 a month (from 17 September 2026). Use exactly this.",
  },
  {
    id: "offbyone", trap: "offbyone", title: "The contract end date",
    brief: "Show when each contract ends. Terms run from the start date.",
    input: { columns: ["Contract", "Starts", "Term"], rows: [["Office cleaning", "1 Nov 2026", "12 months"]] },
    output: "Ends: 1 Nov 2027",
    options: ["It should be 30 Nov 2027", "It's off by one day: a 12-month term from 1 Nov 2026 ends on 31 Oct 2027", "1 Nov 2027 is right"],
    answer: 1,
    why: "Twelve months starting 1 November 2026 cover November to October, ending 31 October 2027. 1 November 2027 is the first day of the next term. One day sounds small until it's a notice deadline you miss.",
    brief_fix: "A term ends the day before the anniversary: 12 months from 1 Nov 2026 ends 31 Oct 2027.",
  },
  {
    id: "matching", trap: "matching", title: "The GST reconciliation",
    brief: "Match my purchase register against GSTR-2B. List anything missing from either side.",
    input: { columns: ["Source", "Invoice", "Amount"], rows: [["Purchase register", "INV/023", "₹11,800"], ["GSTR-2B", "INV-23", "₹11,800"]] },
    output: "Missing from 2B: INV/023. Extra in 2B: INV-23.",
    options: ["The amounts don't match", "They're the same invoice written two ways; the tool matched too strictly", "GSTR-2B is always right"],
    answer: 1,
    why: "INV/023 and INV-23 are the same invoice: same supplier, same amount, written with a slash and a leading zero in one place and a dash in the other. The tool compared the text exactly and reported two problems where there are none.",
    brief_fix: "Match invoice numbers ignoring slashes, dashes, spaces and leading zeros. Amounts must match exactly.",
  },
  {
    id: "invented", trap: "invented", title: "The launch caption",
    brief: "Rewrite these product notes as an Instagram caption. Don't add claims.",
    input: { columns: ["Product notes"], rows: [["Launch on 14 Nov. 20% off the first 100 orders."]] },
    output: "🚀 Launching 14 Nov! Grab 30% off, this week only!",
    options: ["The emoji breaks the brief", "It invented 30% and \"this week only\": neither is in the notes", "Captions should never mention dates"],
    answer: 1,
    why: "The notes say 20% off the first 100 orders. The caption says 30%, this week only. Both are made up and both sound believable. The fix isn't a better prompt alone: make the tool check that every number in the caption appears in the notes.",
    brief_fix: "After writing, check every number and date in the caption appears in my notes. Flag any that don't.",
  },
  {
    id: "unstated", trap: "unstated", title: "The GST quotation",
    brief: "Make a quotation with 18% GST. We're in Maharashtra.",
    input: { columns: ["Item", "Amount", "Customer state"], rows: [["Annual maintenance", "₹50,000", "Karnataka"]] },
    output: "CGST 9%: ₹4,500 · SGST 9%: ₹4,500 · Total: ₹59,000",
    options: ["The total is wrong", "For a customer in another state it should be IGST 18%, ₹9,000", "GST should be 12%"],
    answer: 1,
    why: "The total, ₹59,000, is right, which is why this slips through. Between two states the tax is IGST, and a quote with CGST and SGST causes trouble with the customer's input tax credit. The brief never mentioned states, so the AI guessed.",
    brief_fix: "If the customer is in another state, charge IGST; in the same state, CGST and SGST, half each.",
  },
  {
    id: "oddfile", trap: "oddfile", title: "The twelve monthly files",
    brief: "Combine the 12 monthly sales files and give the year's total.",
    input: { columns: ["File", "Column names"], rows: [["jan.csv to jun.csv", "date, client, Amount"], ["jul.csv", "date, client, Amt"], ["aug.csv to dec.csv", "date, client, Amount"]] },
    output: "Combined 12 files. Total for the year: ₹38,40,000. July: ₹0.",
    options: ["July had no sales", "July's file calls the column Amt, so its sales were never counted", "The total is right because all 12 files were read"],
    answer: 1,
    why: "\"Combined 12 files\" sounds reassuring, but July's amounts sit in a column called Amt, so the tool found nothing to add. A month at ₹0 is the clue. A good tool says which file or row it couldn't read instead of carrying on.",
    brief_fix: "If a file is missing a column or a value can't be read, stop and tell me which file and row.",
  },
];
