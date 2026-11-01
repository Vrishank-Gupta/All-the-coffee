// Writes data.js for inv-reel.html by reading the 12 sample invoice PDFs with the site's own
// code (src/lib/tools/pdfText.ts and invoices.ts), exactly as the free tool does.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import * as pdfjs from "../../../../node_modules/pdfjs-dist/legacy/build/pdf.mjs";
import { pdfToText } from "../../../../src/lib/tools/pdfText.ts";
import { readInvoiceText, checkText } from "../../../../src/lib/tools/invoices.ts";

const dir = "../../../../public/downloads/sample-invoices/";
const rows = [];
for (const f of readdirSync(dir).filter((n) => n.endsWith(".pdf")).sort()) {
  const r = readInvoiceText(await pdfToText(pdfjs as never, new Uint8Array(readFileSync(dir + f))), f);
  rows.push({ ...r, check: checkText(r) });
}
const total = rows.reduce((a, r) => a + (r.total ?? 0), 0);
writeFileSync("data.js", `// Written by make-data.ts from the sample PDFs and src/lib/tools\nwindow.DATA = ${JSON.stringify({ rows, total })};\n`);
console.log(rows.length, "invoices |", rows.filter((r) => r.status !== "ok").map((r) => `${r.file}: ${r.check}`), "| total", total);
