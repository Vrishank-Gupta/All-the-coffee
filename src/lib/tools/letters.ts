// Bulk offer letters: one template plus a CSV of joiners gives one letter per person. Used by the
// free tool at /tools/offer-letters and the Chapter 9 example (which builds the same thing in Python).
// Amounts are written the Indian way: ₹12,50,000 and "Rupees Twelve Lakh Fifty Thousand Only".

export const SAMPLE_JOINERS_CSV = `name,designation,department,location,manager,joining_date,ctc
Priya Nair,Senior Analyst,Finance,Mumbai,Rahul Mehta,2026-12-01,1200000
Arjun Malhotra,Sales Manager,Sales,Delhi,Neha Kapoor,2026-12-01,"12,50,000"
Kavya Reddy,HR Executive,People,Hyderabad,Sunita Rao,2026-12-07,650000
Mohammed Khan,Data Analyst,Operations,Pune,Vikram Joshi,2026-12-07,950000
Sneha Iyer,Legal Associate,Legal,Bengaluru,Anand Pillai,2026-12-14,1475000
Rohan Das,,Marketing,Kolkata,Ishita Sen,2026-12-14,800000
Ananya Gupta,Product Designer,Product,Bengaluru,Karan Shah,2027-01-04,1825000
Vikram Singh,Accounts Executive,Finance,Mumbai,Rahul Mehta,2027-01-04,560000`;

export const DEFAULT_TEMPLATE = `{letter_date}

Dear {first_name},

Offer of employment: {designation}

We are pleased to offer you the position of {designation} in our {department} team at our {location} office, reporting to {manager}. Your date of joining will be {joining_date}.

Your annual cost to company (CTC) will be {ctc} ({ctc_words}). The detailed salary structure is attached.

Please confirm your acceptance by replying to this email within seven days.

We look forward to having you with us.

Warm regards,
{signatory}
{company}`;

// Splits CSV text into rows, honouring quotes ("12,50,000" stays one value).
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((v) => v.trim()));
}

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
  "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function belowHundred(n: number) {
  return n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? " " + ONES[n % 10] : ""}`;
}

// 12,50,000 -> "Twelve Lakh Fifty Thousand": crore, lakh, thousand, hundred, as on Indian cheques.
export function indianWords(amount: number): string {
  let n = Math.floor(Math.abs(amount));
  if (n === 0) return "Zero";
  const parts: string[] = [];
  const crore = Math.floor(n / 1_00_00_000); n %= 1_00_00_000;
  const lakh = Math.floor(n / 1_00_000); n %= 1_00_000;
  const thousand = Math.floor(n / 1000); n %= 1000;
  const hundred = Math.floor(n / 100); n %= 100;
  if (crore) parts.push(`${indianWords(crore)} Crore`);
  if (lakh) parts.push(`${belowHundred(lakh)} Lakh`);
  if (thousand) parts.push(`${belowHundred(thousand)} Thousand`);
  if (hundred) parts.push(`${ONES[hundred]} Hundred`);
  if (n) parts.push(belowHundred(n));
  return parts.join(" ");
}

export const rupeesInWords = (amount: number) => `Rupees ${indianWords(amount)} Only`;
export const inr = (amount: number) => `₹${Math.round(amount).toLocaleString("en-IN")}`;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// 2026-12-01 -> 1 December 2026
export function longDate(iso: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
  return `${d} ${MONTHS[mo - 1]} ${y}`;
}

export interface Letter {
  row: number; // line number in the CSV, counting the header as line 1
  name: string;
  text: string;
  problems: string[]; // empty when the letter is ready
}

export const REQUIRED = ["name", "designation", "department", "location", "manager", "joining_date", "ctc"];

export function makeLetters(csv: string, template: string, extra: { company: string; signatory: string; letterDate: string }): { letters: Letter[]; missingColumns: string[] } {
  const rows = parseCsv(csv);
  if (!rows.length) return { letters: [], missingColumns: REQUIRED };
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const missingColumns = REQUIRED.filter((c) => !header.includes(c));
  if (missingColumns.length) return { letters: [], missingColumns };
  const letters = rows.slice(1).map((cells, i) => {
    const v: Record<string, string> = {};
    header.forEach((h, j) => (v[h] = (cells[j] ?? "").trim()));
    const problems: string[] = [];
    for (const c of REQUIRED) if (!v[c]) problems.push(`${c.replace("_", " ")} is empty`);
    const ctc = Number(v.ctc.replace(/[₹,\s]/g, ""));
    if (v.ctc && !(ctc > 0)) problems.push(`CTC "${v.ctc}" isn't a number`);
    const joining = v.joining_date ? longDate(v.joining_date) : null;
    if (v.joining_date && !joining) problems.push(`joining date "${v.joining_date}" isn't a date like 2026-12-01`);
    const fields: Record<string, string> = {
      ...v,
      first_name: v.name.split(/\s+/)[0] ?? "",
      joining_date: joining ?? v.joining_date,
      ctc: ctc > 0 ? inr(ctc) : v.ctc,
      ctc_words: ctc > 0 ? rupeesInWords(ctc) : "",
      company: extra.company,
      signatory: extra.signatory,
      letter_date: longDate(extra.letterDate) ?? extra.letterDate,
    };
    const text = template.replace(/\{(\w+)\}/g, (whole, key: string) => (key in fields ? fields[key] : whole));
    const unknown = [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
    if (unknown.length) problems.push(`the template uses {${unknown.join("}, {")}}, which isn't a column`);
    return { row: i + 2, name: v.name || `Row ${i + 2}`, text, problems };
  });
  return { letters, missingColumns };
}
