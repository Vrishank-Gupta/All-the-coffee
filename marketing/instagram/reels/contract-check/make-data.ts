// Writes data.js for contract-reel.html by running the site's own checker
// (src/lib/tools/contract.ts) on the made-up sample contract the tool and Chapter 6 use.
import { writeFileSync } from "node:fs";
import { findFlags, SAMPLE_CONTRACT } from "../../../../src/lib/tools/contract.ts";

const flags = findFlags(SAMPLE_CONTRACT);
writeFileSync("data.js", `// Written by make-data.ts from src/lib/tools/contract.ts\nwindow.DATA = ${JSON.stringify({ text: SAMPLE_CONTRACT, flags })};\n`);
console.log(flags.length, "flags:", flags.map((f) => `${f.clause}:${f.key}${f.detail ? "=" + f.detail : ""}`).join(" "));
