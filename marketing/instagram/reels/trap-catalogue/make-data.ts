// Writes data.js for trap-reel.html: the eleven trap patterns from src/lib/method.ts, and the
// Sales playbook's stale-deal build run on its own sample file (the known answer, ₹6,40,000).
import { writeFileSync } from "node:fs";
import { TRAPS } from "../../../../src/lib/method.ts";
import { SALES } from "../../../../src/lib/playbooks/sales.ts";

const build = SALES.builds.find((b) => b.id === "sales-stale-deals")!;
const result = build.run(build.files.map((f) => f.content));
const data = {
  traps: TRAPS.map((t) => ({ n: t.n, name: t.name })),
  right: result.stats.map((s) => `${s.label}: ${s.value}`),
};
writeFileSync("data.js", `// Written by make-data.ts from src/lib/method.ts and src/lib/playbooks/sales.ts\nwindow.DATA = ${JSON.stringify(data)};\n`);
console.log(data.right);
