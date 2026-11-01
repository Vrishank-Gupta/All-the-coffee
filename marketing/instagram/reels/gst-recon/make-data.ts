// Writes data.js for gst-reel.html: the Chapter 5 sample files and what the chapter's own
// reconciler (src/lib/gstSample.ts) makes of them, both the correct build and the strict first
// build that falls into the invoice-number trap. Run: npx tsx make-data.ts
import { writeFileSync } from "node:fs";
import { PURCHASE_REGISTER_CSV, GSTR_2B_CSV, reconcile } from "../../../../src/lib/gstSample.ts";

const rows = (csv: string) => csv.trim().split("\n").map((l) => l.split(","));
const data = {
  books: rows(PURCHASE_REGISTER_CSV),
  portal: rows(GSTR_2B_CSV),
  fixed: reconcile(false),
  strict: reconcile(true),
};
writeFileSync("data.js", `// Written by make-data.ts from src/lib/gstSample.ts\nwindow.DATA = ${JSON.stringify(data)};\n`);
console.log("Wrote data.js", data.fixed.counts, data.fixed.atRisk, data.strict.counts, data.strict.atRisk);
