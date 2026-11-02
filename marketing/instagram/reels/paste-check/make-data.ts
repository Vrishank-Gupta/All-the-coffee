// Writes data.js for paste-reel.html: what the paste checker (src/lib/tools/paste.ts) itself says for
// three cases, so the verdicts in the reel are the tool's real output.
import { writeFileSync } from "node:fs";
import { checkPaste, EMPTY_PASTE } from "../../../../src/lib/tools/paste.ts";

const v = (o: Partial<typeof EMPTY_PASTE>) => checkPaste({ ...EMPTY_PASTE, ...o }).headline;
const data = {
  draft: v({ account: "work", policy: "yes" }),
  people: v({ content: ["people"], account: "personal", policy: "yes" }),
  secrets: v({ content: ["secrets"], account: "work", policy: "yes" }),
};
writeFileSync("data.js", `// Written by make-data.ts from src/lib/tools/paste.ts\nwindow.DATA = ${JSON.stringify(data)};\n`);
console.log(data);
