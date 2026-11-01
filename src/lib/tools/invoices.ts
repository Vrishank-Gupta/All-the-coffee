// Pulls the key details out of an Indian GST invoice's text, for the free tool at
// /tools/invoice-reader and the Chapter 11 starter. It looks for labels, so it reads invoices that
// label their fields (Invoice No, Date, Taxable Value, CGST, Total...) and says "not found"
// instead of guessing when a label is missing. Every row gets a check: taxable value plus GST
// should equal the total.

export interface InvoiceRow {
  file: string;
  vendor: string;
  gstin: string;
  number: string;
  date: string;
  taxable: number | null;
  gst: number | null;
  total: number | null;
  status: "ok" | "mismatch" | "incomplete" | "unreadable";
  difference: number; // total minus (taxable + GST), when all three were found
}

const GSTIN = /\b(\d{2}[A-Z]{5}\d{4}[A-Z][0-9A-Z]Z[0-9A-Z])\b/;
const AMOUNT = /(?:Rs\.?|INR|₹)?\s*(\d{1,3}(?:,\d{2,3})*(?:\.\d{1,2})?|\d+(?:\.\d{1,2})?)\s*$/i;

export const parseAmount = (s: string) => Number(s.replace(/[^0-9.]/g, ""));

function valueAfter(lines: string[], label: RegExp): string {
  for (const line of lines) {
    const m = label.exec(line);
    if (m) return line.slice(m.index + m[0].length).replace(/^[\s:.#-]+/, "").trim().split(/\s{2,}/)[0];
  }
  return "";
}

function amountOn(lines: string[], label: RegExp): number | null {
  for (const line of lines) {
    if (label.test(line)) {
      const m = AMOUNT.exec(line);
      if (m) return parseAmount(m[1]);
    }
  }
  return null;
}

export function readInvoiceText(text: string, file = ""): InvoiceRow {
  const lines = text.split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean);
  const empty: InvoiceRow = { file, vendor: "", gstin: "", number: "", date: "", taxable: null, gst: null, total: null, status: "unreadable", difference: 0 };
  if (!lines.length) return empty;
  const vendor = lines[0];
  const gstin = GSTIN.exec(text)?.[1] ?? "";
  const number = valueAfter(lines, /\b(?:Invoice\s*(?:No\.?|Number|#)|Inv\.?\s*No\.?|Bill\s*(?:No\.?|#|Number))/i).split(" ")[0] ?? "";
  const date = valueAfter(lines, /\b(?:Invoice\s+Date|Dated|Date)\b/i).match(/\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}|\d{1,2}\s+\w+\s+\d{4}/)?.[0] ?? "";
  const taxable = amountOn(lines, /\b(?:Taxable\s+(?:Value|Amount)|Sub\s*-?\s*Total|Amount\s+before\s+tax)\b/i);
  const gstParts = lines.filter((l) => /\b(?:CGST|SGST|UTGST|IGST)\b/i.test(l)).map((l) => AMOUNT.exec(l)).filter(Boolean).map((m) => parseAmount(m![1]));
  const gst = gstParts.length ? Math.round(gstParts.reduce((a, b) => a + b, 0) * 100) / 100 : null;
  // The last line that names a total is the final amount (a "Sub Total" line comes before it)
  let total: number | null = null;
  for (const l of lines) {
    if (/\b(?:Grand\s+Total|Total\s+Amount(?:\s+Payable)?|Invoice\s+Total|Amount\s+Payable|Total)\b/i.test(l) && !/\bSub\s*-?\s*Total\b/i.test(l)) {
      const m = AMOUNT.exec(l);
      if (m) total = parseAmount(m[1]);
    }
  }
  let status: InvoiceRow["status"] = "incomplete";
  let difference = 0;
  if (taxable !== null && gst !== null && total !== null) {
    difference = Math.round((total - (taxable + gst)) * 100) / 100;
    status = Math.abs(difference) < 1 ? "ok" : "mismatch";
  }
  return { file, vendor, gstin, number, date, taxable, gst, total, status, difference };
}

// Tab-separated text pastes straight into Excel; the CSV starts with a byte-order mark so Excel
// reads ₹ and other non-English characters correctly.
const HEAD = ["File", "Vendor", "GSTIN", "Invoice no", "Date", "Taxable value", "GST", "Total", "Check"];
const cells = (r: InvoiceRow) => [r.file, r.vendor, r.gstin, r.number, r.date, r.taxable ?? "", r.gst ?? "", r.total ?? "", checkText(r)];
export function checkText(r: InvoiceRow) {
  if (r.status === "ok") return "OK";
  if (r.status === "mismatch") return `Total is ₹${Math.abs(r.difference).toLocaleString("en-IN")} ${r.difference > 0 ? "more" : "less"} than taxable + GST`;
  if (r.status === "unreadable") return "Couldn't read: scanned or image-only PDF";
  return "Some details not found";
}
export const toTsv = (rows: InvoiceRow[]) => [HEAD, ...rows.map(cells)].map((r) => r.join("\t")).join("\n");
export const toCsv = (rows: InvoiceRow[]) =>
  "﻿" + [HEAD, ...rows.map(cells)].map((r) => r.map((c) => (/[",\n]/.test(String(c)) ? `"${String(c).replace(/"/g, '""')}"` : c)).join(",")).join("\n");
