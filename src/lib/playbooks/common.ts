// Parsing helpers shared by the playbooks: real Indian office files write money as "₹4,50,000",
// "1.2L", "85K" or "1.5 Cr", and dates as 2026-11-02, 02/11/2026 or 02-11-2026 (day first).
import { parseCsv, indianWords, inr } from "../tools/letters.ts";

export { parseCsv, indianWords, inr };

// CSV text to objects keyed by lower-case, trimmed header names
export function records(csv: string): Record<string, string>[] {
  const rows = parseCsv(csv.trim());
  if (!rows.length) return [];
  const head = rows[0].map((h) => h.trim().toLowerCase());
  return rows.slice(1).map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] ?? "").trim()])));
}

// "₹4,50,000" -> 450000, "1.2L" / "1.2 lakh" -> 120000, "85K" -> 85000, "1.5 Cr" -> 15000000.
// Blank or unreadable -> null, never 0, so "unknown" can't pass for "nothing".
export function parseMoney(text: string | undefined): number | null {
  if (text === undefined) return null;
  const s = text.replace(/₹|rs\.?|inr|,|\s/gi, "").toLowerCase();
  if (!s) return null;
  const m = /^(-?\d+(?:\.\d+)?)(l|lakh|lakhs|lac|k|cr|crore|crores)?$/.exec(s);
  if (!m) return null;
  const n = Number(m[1]);
  const unit = m[2] ?? "";
  if (unit.startsWith("l")) return Math.round(n * 1_00_000);
  if (unit === "k") return Math.round(n * 1_000);
  if (unit.startsWith("c")) return Math.round(n * 1_00_00_000);
  return n;
}

// 2026-11-02, 02/11/2026 and 02-11-2026 (day first, Indian style) -> a UTC date, or null
export function parseDate(text: string | undefined): Date | null {
  if (!text) return null;
  const s = text.trim();
  let y: number, mo: number, d: number;
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s);
  if (m) [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  else if ((m = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(s))) [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
  else return null;
  const dt = new Date(Date.UTC(y, mo - 1, d));
  return dt.getUTCMonth() === mo - 1 && dt.getUTCDate() === d ? dt : null;
}

export const DAY = 86_400_000;
export const daysBetween = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / DAY);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const shortDate = (d: Date) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

// Money with paise, Indian grouping: 6238.88 -> ₹6,238.88
export const inr2 = (n: number) => `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const round2 = (n: number) => Math.round(n * 100) / 100;

// "Key: value" lines (a small settings file) -> object with lower-case keys
export function settings(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of text.split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) out[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim();
  }
  return out;
}
