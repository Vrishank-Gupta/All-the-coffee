// Writes data.js for ctc-reel.html from the site's own calculator (src/lib/tools/ctc.ts):
// the 12 LPA breakdown, and what a calculator still using the old PF ceiling would show.
import { writeFileSync } from "node:fs";
import { ctcToInHand, CTC_DEFAULTS } from "../../../../src/lib/tools/ctc.ts";

const now = ctcToInHand(CTC_DEFAULTS);
// Old ceiling: PF on Rs 15,000 a month instead of Rs 25,000, everything else the same
const oldPf = Math.round(15_000 * 12 * 0.12);
const oldGross = CTC_DEFAULTS.ctc - oldPf - now.gratuity;
const oldInHandMonth = Math.round((oldGross - oldPf - now.professionalTax - now.totalTax) / 12);
writeFileSync("data.js", `// Written by make-data.ts from src/lib/tools/ctc.ts\nwindow.DATA = ${JSON.stringify({ ctc: CTC_DEFAULTS.ctc, now, oldPf, oldInHandMonth })};\n`);
console.log("12 LPA in hand", now.inHandMonth, "| old-ceiling calculator", oldInHandMonth);
