// Writes data.js for wa-reel.html: the messages the tool's own templates produce
// (src/lib/tools/whatsapp.ts) for the people shown in the reel. The people are made up.
import { writeFileSync } from "node:fs";
import { fillTemplate, TEMPLATES } from "../../../../src/lib/tools/whatsapp.ts";

const rahul = { name: "Rahul Verma", about: "quotation #A-104", due: "2026-11-01" };
const data = { english: fillTemplate(TEMPLATES.english, rahul), hinglish: fillTemplate(TEMPLATES.hinglish, rahul) };
writeFileSync("data.js", `// Written by make-data.ts from src/lib/tools/whatsapp.ts\nwindow.DATA = ${JSON.stringify(data)};\n`);
console.log(data);
