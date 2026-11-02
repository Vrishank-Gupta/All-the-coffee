// Writes data.js for brief-reel.html: what the Brief Builder itself returns for its own example
// task (src/lib/tools/brief.ts), so every number and line in the reel is the tool's real output.
import { writeFileSync } from "node:fs";
import { buildBrief, BRIEF_EXAMPLE } from "../../../../src/lib/tools/brief.ts";

const r = buildBrief(BRIEF_EXAMPLE);
const data = {
  task: BRIEF_EXAMPLE.task,
  minutes: BRIEF_EXAMPLE.minutes,
  hours: r.hoursPerYear,
  verdict: r.verdict.text,
  rules: BRIEF_EXAMPLE.rules.split("\n").map((x) => x.replace(/^- /, "")),
  brief: r.brief.split("\n"),
  traps: r.traps.map(({ trap }) => ({ n: trap.n, name: trap.name })),
};
writeFileSync("data.js", `// Written by make-data.ts from src/lib/tools/brief.ts\nwindow.DATA = ${JSON.stringify(data)};\n`);
console.log(data.hours, data.verdict, data.traps.map((t) => t.n).join(","));
