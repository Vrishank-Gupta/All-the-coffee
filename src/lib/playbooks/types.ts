// Role Playbooks: three builds per job role, taught after the core course and included in the same
// one-time payment. Each build is defined once here: its brief, sample files, known answer, trap and
// fix, plus a reference implementation (run) that produces the known answer. The lesson page shows
// it as "compare with ours", scripts/checkTools.ts checks it against hand-worked numbers, and some
// runs also power a free tool at /tools.

export type Tone = "good" | "warn" | "bad";

export interface RunResult {
  stats: { label: string; value: string; tone?: Tone }[];
  columns: string[];
  rows: (string | number)[][];
  rowTones?: (Tone | undefined)[];
  notes?: string[];
}

export interface BuildFile {
  name: string;
  content: string;
}

export interface Build {
  id: string; // unique across playbooks, e.g. "sales-stale-deals"
  title: string;
  minutes: string;
  where: "browser" | "python" | "ai-inside";
  why: string; // the everyday problem, two or three sentences
  files: BuildFile[]; // sample files, made up, downloadable; also the runner's inputs
  prompt: string; // the brief to paste into the AI chat
  check: string; // the known answer, in words
  trap: { title: string; text: string; fix: string };
  run: (inputs: string[]) => RunResult;
  tryIt: string[];
}

export interface Playbook {
  slug: string;
  role: string; // "Sales"
  title: string; // "Sales Playbook"
  tagline: string;
  forWho: string;
  builds: Build[];
  toolSlug?: string; // the free tool this playbook powers, if any
}
