// The Brief Builder (/tools/brief-builder): turns a description of any repetitive task into the
// Builder's Method in practice: is it worth a tool, where to build it, a ready-to-paste brief, a
// known-answer plan, and the trap patterns to test for. Pure functions, checked in scripts/checkTools.ts.
import { TRAPS, type TrapPattern } from "../method.ts";

export type Frequency = "daily" | "weekly" | "monthly" | "quarterly";
export const RUNS_PER_YEAR: Record<Frequency, number> = { daily: 250, weekly: 50, monthly: 12, quarterly: 4 };

export const DATA_FLAGS = {
  dates: "Dates or deadlines",
  money: "Money amounts (₹, lakh, GST)",
  units: "Units (days, hours, %, packs, kg)",
  blanks: "Cells that are sometimes empty",
  totals: "Totals, subtotals or summary rows",
  matching: "Matching things across two lists (IDs, names)",
  rulesChange: "Rules that change (tax, policy, prices)",
  aiText: "AI reading or writing text",
  manyFiles: "Several files of the same kind",
} as const;
export type DataFlag = keyof typeof DATA_FLAGS;

export const SIZE_FLAGS = {
  companySystems: "It needs to connect to a company system (CRM, ERP, HR system, email server)",
  multiUser: "Several people need to log in and share the same data",
  confidential: "It only works with confidential data you can't take outside work systems",
} as const;
export type SizeFlag = keyof typeof SIZE_FLAGS;

export interface BriefInput {
  task: string;
  role: string;
  frequency: Frequency;
  minutes: number;
  inputs: string;
  rules: string;
  outputs: string;
  good: string;
  avoid: string;
  newFiles: boolean;
  shareLink: boolean;
  data: DataFlag[];
  size: SizeFlag[];
}

export const EMPTY_BRIEF: BriefInput = {
  task: "", role: "", frequency: "weekly", minutes: 30, inputs: "", rules: "", outputs: "", good: "", avoid: "",
  newFiles: false, shareLink: false, data: [], size: [],
};

// The "Fill an example" task, also used by the Brief Builder reel
export const BRIEF_EXAMPLE: BriefInput = {
  task: "Combine the weekly sales files from five regions into one summary",
  role: "Sales operations",
  frequency: "weekly",
  minutes: 45,
  inputs: "Five CSV files, one per region, each with the columns date, salesperson, client, amount.",
  rules: "- amounts may be written as 1.2L or 85K: read them as rupees\n- skip any row named Total\n- show the total per region and per salesperson",
  outputs: "One Excel file with a summary sheet, and the totals printed on screen.",
  good: "With my sample files: North ₹1,40,000, South ₹95,000, total ₹4,20,000.",
  avoid: "changing any amount",
  newFiles: true,
  shareLink: false,
  data: ["money", "totals", "manyFiles"],
  size: [],
};

export interface BriefResult {
  hoursPerYear: number;
  verdict: { level: "build" | "maybe" | "skip"; text: string };
  tooBig: string[];
  where: { kind: "browser" | "python" | "ai"; text: string; chapter: string };
  brief: string;
  answerPlan: string[];
  traps: { trap: TrapPattern; test: string }[];
}

const TRAP_FOR: Record<DataFlag, string[]> = {
  dates: ["formats", "offbyone"], money: ["formats"], units: ["units"], blanks: ["blank"], totals: ["totals"],
  matching: ["matching"], rulesChange: ["stale"], aiText: ["invented"], manyFiles: ["oddfile"],
};

// Lowercase only the first letter, so acronyms like GST and CRM keep their capitals.
export const lowerFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

export function buildBrief(i: BriefInput): BriefResult {
  const hoursPerYear = Math.round((Math.max(0, i.minutes) * RUNS_PER_YEAR[i.frequency]) / 60);
  const verdict: BriefResult["verdict"] = hoursPerYear >= 10
    ? { level: "build", text: `Worth building: about ${hoursPerYear} hours a year by hand.` }
    : hoursPerYear >= 3
      ? { level: "maybe", text: `Worth it if it's error-prone or annoying: about ${hoursPerYear} hours a year by hand.` }
      : { level: "skip", text: `Probably not worth a tool yet: about ${hoursPerYear} hour${hoursPerYear === 1 ? "" : "s"} a year. A checklist or a template may be enough.` };
  const tooBig = i.size.map((s) => SIZE_FLAGS[s]);

  const ai = i.data.includes("aiText");
  const files = i.data.includes("manyFiles") || i.newFiles;
  const where: BriefResult["where"] = ai
    ? { kind: "ai", text: "A tool with AI inside: it needs to read or write text. Build it in Claude, and make the tool check AI's output against your input.", chapter: "Chapter 6" }
    : files && !i.shareLink
      ? { kind: "python", text: "A Python script: it works through files on your computer and can write new ones (Excel, Word).", chapter: "Chapter 9" }
      : { kind: "browser", text: "A browser tool: type or upload, see results instantly, save it as a file or share a link.", chapter: "Chapters 4 and 5" };

  const rules = i.rules.split("\n").map((r) => r.trim().replace(/^[-*•]\s*/, "")).filter(Boolean);
  const how = where.kind === "python"
    ? "Write it as a Python script. Tell me which libraries I need and the exact command to install them, and put a short plain-English comment above each part."
    : where.kind === "ai"
      ? "The tool calls AI itself. After AI replies, the tool must check that every number and every quote in the reply appears in my input, and flag anything that doesn't."
      : "Make it a single web page I can save as an .html file and open in my browser.";
  const brief = [
    `Who it's for: ${i.role.trim() || "[your role]"}. ${i.task.trim() || "[the task]"}, ${i.frequency}, by hand today.`,
    "",
    `What it does: ${i.inputs.trim() || "[what goes in: files, columns, text]"}`,
    ...(rules.length ? ["The rules:", ...rules.map((r) => `- ${r}`)] : ["The rules: [every rule you'd explain to a new colleague]"]),
    `What comes out: ${i.outputs.trim() || "[what you want to see or get]"}`,
    "",
    `What good looks like: ${i.good.trim() || "[the known answer for your sample]"}`,
    "",
    `What to avoid: ${i.avoid.trim() ? i.avoid.trim().replace(/\.?$/, ".") + " " : ""}Never guess a value you can't read: tell me which row or file it was.`,
    "",
    how,
  ].join("\n");

  const answerPlan = [
    "Make a sample of 5 to 10 rows (or a few files) that looks like your real data, with nothing confidential in it.",
    ...(i.data.length ? [`Put the awkward cases in on purpose: ${i.data.map((d) => lowerFirst(DATA_FLAGS[d])).join("; ")}.`] : []),
    "Work out the right result by hand, before the tool exists, and write it into the brief under \"What good looks like\".",
    "When the tool runs, compare its result with yours, number by number. If they differ, use the fix loop: I expected, what happened, error message.",
  ];

  const ids = new Set<string>(i.data.flatMap((d) => TRAP_FOR[d]));
  if (rules.some((r) => /\bper\b|each (day|person|month|week)|both|and also|only if/i.test(r))) ids.add("scope");
  ids.add("unstated");
  const traps = TRAPS.filter((t) => ids.has(t.id)).map((trap) => ({ trap, test: trap.test }));
  return { hoursPerYear, verdict, tooBig, where, brief, answerPlan, traps };
}
