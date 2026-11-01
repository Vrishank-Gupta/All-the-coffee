// Writes data.js for letters-reel.html from the site's own letter maker (src/lib/tools/letters.ts),
// run on the same made-up joiners the tool and Chapter 9 use.
import { writeFileSync } from "node:fs";
import { makeLetters, SAMPLE_JOINERS_CSV, DEFAULT_TEMPLATE, parseCsv } from "../../../../src/lib/tools/letters.ts";

const { letters } = makeLetters(SAMPLE_JOINERS_CSV, DEFAULT_TEMPLATE, { company: "Your Company Pvt Ltd", signatory: "HR Team", letterDate: "2026-11-15" });
const ready = letters.filter((l) => !l.problems.length);
const arjun = ready.find((l) => l.name === "Arjun Malhotra")!;
const data = {
  rows: parseCsv(SAMPLE_JOINERS_CSV),
  names: ready.map((l) => l.name),
  arjunCtc: arjun.text.split("\n").find((l) => l.includes("CTC"))!,
  arjunText: arjun.text,
  problems: letters.filter((l) => l.problems.length).map((l) => `${l.name} (line ${l.row}): ${l.problems.join("; ")}. No letter made.`),
};
writeFileSync("data.js", `// Written by make-data.ts from src/lib/tools/letters.ts\nwindow.DATA = ${JSON.stringify(data)};\n`);
console.log(data.names.length, "ready |", data.arjunCtc, "|", data.problems);
