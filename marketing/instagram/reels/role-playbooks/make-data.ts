// Writes data.js for playbooks-reel.html: every playbook's role and build titles, from
// src/lib/playbooks, so the reel's counts and names match the site.
import { writeFileSync } from "node:fs";
import { PLAYBOOKS } from "../../../../src/lib/playbooks/index.ts";

const data = { roles: PLAYBOOKS.map((p) => ({ role: p.role, builds: p.builds.map((b) => b.title) })) };
writeFileSync("data.js", `// Written by make-data.ts from src/lib/playbooks\nwindow.DATA = ${JSON.stringify(data)};\n`);
console.log(data.roles.length, data.roles.reduce((n, r) => n + r.builds.length, 0));
