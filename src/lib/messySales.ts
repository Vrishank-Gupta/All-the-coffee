export const MESSY_SALES_CSV = `Name,Region,Amount,Date
priya sharma,North,45000,03/04/2026
RAHUL VERMA,South,32000,2026-04-05
Anita Desai ,West,28000,6 Apr 2026
priya sharma,North,45000,03/04/2026
Mohammed Khan,East,51000,07/04/2026
,,,
Sneha Iyer,south,39000,08-04-2026
rahul verma,South,32000,05/04/2026
Vikram Singh,North,"62,000",09/04/2026
Kavya Reddy,West,27500,10 April 2026
Arjun Mehta,EAST,48000,2026/04/11
Neha Gupta,North,33000,12/04/2026
Anita Desai,West,28000,06/04/2026
Rohan Das,East,41000,13/04/2026`;

export type DateStyle = "indian" | "american";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_LOOKUP: Record<string, number> = {};
MONTHS.forEach((m, i) => {
  MONTH_LOOKUP[m.toLowerCase()] = i + 1;
});
["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"].forEach(
  (m, i) => {
    MONTH_LOOKUP[m] = i + 1;
  }
);

function splitCsvLine(line: string): string[] {
  const fields: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      fields.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  fields.push(cur);
  return fields;
}

function titleCase(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

interface ParsedDate {
  day: number;
  month: number;
  year: number;
}

function parseDate(raw: string, style: DateStyle): ParsedDate | null {
  const s = raw.trim();

  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };

  m = s.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
  if (m) return { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };

  m = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (m) {
    const month = MONTH_LOOKUP[m[2].toLowerCase()];
    if (month) return { day: Number(m[1]), month, year: Number(m[3]) };
  }

  m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (m) {
    const g1 = Number(m[1]);
    const g2 = Number(m[2]);
    const year = Number(m[3]);
    let day: number;
    let month: number;
    if (style === "american") {
      month = g1;
      day = g2;
      if (month > 12) [day, month] = [g1, g2];
    } else {
      day = g1;
      month = g2;
      if (month > 12) [day, month] = [g2, g1];
    }
    return { day, month, year };
  }

  return null;
}

function formatDate(d: ParsedDate): string {
  return `${String(d.day).padStart(2, "0")} ${MONTHS[d.month - 1]} ${d.year}`;
}

export interface CleanedRow {
  name: string;
  region: string;
  amount: number;
  date: string;
}

export interface CleanResult {
  rowsIn: number;
  blankRemoved: number;
  duplicatesRemoved: number;
  rows: CleanedRow[];
  totalAmount: number;
  byRegion: Record<string, number>;
  priyaDate: string | null;
}

export function cleanSalesData(csv: string, dateStyle: DateStyle): CleanResult {
  const lines = csv.trim().split("\n");
  const dataLines = lines.slice(1).filter((l) => l.trim().length > 0 || l.includes(","));
  const rowsIn = dataLines.length;

  let blankRemoved = 0;
  const seen = new Set<string>();
  let duplicatesRemoved = 0;
  const rows: CleanedRow[] = [];

  for (const line of dataLines) {
    const [rawName, rawRegion, rawAmount, rawDate] = splitCsvLine(line);
    const isBlank = ![rawName, rawRegion, rawAmount, rawDate].some((f) => f && f.trim().length > 0);
    if (isBlank) {
      blankRemoved++;
      continue;
    }

    const name = titleCase(rawName);
    const region = titleCase(rawRegion);
    const amount = Number(String(rawAmount).replace(/[^0-9.-]/g, ""));
    const parsedDate = parseDate(rawDate, dateStyle);
    const date = parsedDate ? formatDate(parsedDate) : rawDate.trim();

    const key = `${name.toLowerCase()}|${region.toLowerCase()}|${amount}|${date}`;
    if (seen.has(key)) {
      duplicatesRemoved++;
      continue;
    }
    seen.add(key);
    rows.push({ name, region, amount, date });
  }

  const totalAmount = rows.reduce((sum, r) => sum + r.amount, 0);
  const byRegion: Record<string, number> = {};
  for (const r of rows) {
    byRegion[r.region] = (byRegion[r.region] ?? 0) + r.amount;
  }
  const priyaDate = rows.find((r) => r.name === "Priya Sharma")?.date ?? null;

  return { rowsIn, blankRemoved, duplicatesRemoved, rows, totalAmount, byRegion, priyaDate };
}
