// The Builder's Method: the way of working the whole course teaches, so learners can build tools we
// never covered. Eight steps (the same ones Chapter 11 walks through for the capstone) and the trap
// catalogue: the ways an AI-built tool goes quietly wrong. Every trap in a chapter or playbook is
// one of these patterns. Read by /method, the Brief Builder tool, chapter habit notes and playbooks.

export interface MethodStep {
  id: string;
  n: number;
  name: string;
  question: string;
  how: string[];
  practised: { label: string; href: string }[];
}

export const STEPS: MethodStep[] = [
  {
    id: "spot", n: 1, name: "Spot it", question: "Is this task worth a tool?",
    how: [
      "Look for work you repeat every week or month, that takes 15 minutes or more, and follows rules you could explain to a new colleague.",
      "Good candidates hide in sentences like \"every Monday I...\", \"at month end I copy...\", \"I always have to check...\".",
      "If you can't tell whether the result is right, it's not a good first tool, yet.",
    ],
    practised: [{ label: "Chapter 0: your boring task", href: "/chapter/0" }, { label: "Chapter 11, step 1", href: "/chapter/11" }],
  },
  {
    id: "size", n: 2, name: "Size it", question: "What's the smallest version that's genuinely useful?",
    how: [
      "Cut anything that needs company systems, several people logging in, or data you can't take outside work systems. Build the slice you control.",
      "\"Pull sales from the CRM and email the team\" becomes \"turn the CSV I export on Monday into a summary I can paste\".",
    ],
    practised: [{ label: "Chapter 4: memory as a second step", href: "/chapter/4" }, { label: "Chapter 11, step 1", href: "/chapter/11" }],
  },
  {
    id: "choose", n: 3, name: "Choose where", question: "Browser tool, Python script, AI inside, or not a tool at all?",
    how: [
      "Browser tool: you type or upload, and see results instantly; others can use it through a link.",
      "Python script: many files, the same job again and again, or you need new files (Excel, Word) out.",
      "AI inside: the tool has to read or write text, like summarising notes or drafting replies.",
      "Not a tool: if a spreadsheet formula or an existing app already does it, use that.",
    ],
    practised: [{ label: "Chapter 2: where a tool lives", href: "/chapter/2" }, { label: "Chapter 8: your own computer", href: "/chapter/8" }, { label: "Chapter 11, step 2", href: "/chapter/11" }],
  },
  {
    id: "brief", n: 4, name: "Brief it", question: "Could a smart new intern build this from what you wrote?",
    how: [
      "Four parts: who it's for, what it does (with every rule spelled out), what good looks like, and what to avoid.",
      "Every rule you leave out, the AI guesses. Write down the rules you'd explain to a new colleague, especially the obvious ones.",
    ],
    practised: [{ label: "Chapter 3: brief it like a new intern", href: "/chapter/3" }, { label: "Chapter 11, step 3", href: "/chapter/11" }],
  },
  {
    id: "answer", n: 5, name: "Know the answer first", question: "What should the result be, worked out by hand?",
    how: [
      "Make a small sample, 5 to 10 rows, with the awkward cases in it: a blank, an odd date, a different spelling. Work out the right result yourself before the tool exists.",
      "A tool you can't check is a tool you can't trust. The known answer is how you'll know.",
    ],
    practised: [{ label: "Chapter 1: ₹4,800", href: "/chapter/1" }, { label: "Chapter 5: 10 rows out", href: "/chapter/5" }, { label: "Chapter 9: 96 rows", href: "/chapter/9" }],
  },
  {
    id: "slices", n: 6, name: "Build in slices", question: "What's the next smallest piece that works on its own?",
    how: [
      "Get the core working and checked first. Then add one thing at a time, testing after each: a filter, an export, a second file.",
      "If a change breaks something, you know exactly which change it was.",
    ],
    practised: [{ label: "Chapter 4: add memory after it works", href: "/chapter/4" }, { label: "Chapter 11, step 5", href: "/chapter/11" }],
  },
  {
    id: "sceptic", n: 7, name: "Test like a sceptic", question: "How could this be wrong without telling you?",
    how: [
      "Compare with your known answer. Then try to break it: an empty input, a strange format, a duplicate, the trap patterns below.",
      "The dangerous bug isn't the error message. It's the confident wrong answer.",
    ],
    practised: [{ label: "Chapter 3: three ways things go wrong", href: "/chapter/3" }, { label: "Chapter 6: the honesty test", href: "/chapter/6" }, { label: "Chapter 10: predict, then run", href: "/chapter/10" }],
  },
  {
    id: "real", n: 8, name: "Before real use", question: "Is it safe to use on real work, and to share?",
    how: [
      "Check your company's policy before real data goes near an AI tool. Keep confidential data out unless it's allowed.",
      "Check a few real results by hand before you rely on it, and tell people it's a first version.",
    ],
    practised: [{ label: "Chapter 7: the safety checklist", href: "/chapter/7" }, { label: "Chapter 11, step 7", href: "/chapter/11" }],
  },
];

export interface TrapPattern {
  id: string;
  n: number;
  name: string;
  what: string;
  test: string;
  seen: { label: string; href: string }[];
}

export const TRAPS: TrapPattern[] = [
  { id: "formats", n: 1, name: "Indian formats read the Western way", what: "03/04/2026 read as 4 March, 1.2L read as 1.2, 12,50,000 written as 1,250,000.",
    test: "Put a day-first date, a lakh amount and Indian commas in your sample, and check each one.",
    seen: [{ label: "Chapter 5: the date trap", href: "/chapter/5" }, { label: "Sales: 1.2L is not ₹1.20", href: "/playbooks/sales" }, { label: "Chapter 9: offer letters", href: "/chapter/9" }] },
  { id: "blank", n: 2, name: "Blank treated as zero", what: "An empty cell means \"unknown\" or \"not mentioned\", and the tool reads it as 0 or invents a value.",
    test: "Leave one cell empty in your sample and decide what it should mean before you run it.",
    seen: [{ label: "Sales: unknown is not zero", href: "/playbooks/sales" }, { label: "Chapter 6: the honesty test", href: "/chapter/6" }] },
  { id: "totals", n: 3, name: "Counted twice", what: "A Total row added as if it were data, a refund added as spending, a paid invoice chased again.",
    test: "Check the grand total by hand. If it's too big, look for summary rows and money flowing the other way.",
    seen: [{ label: "Marketing: the Total row", href: "/playbooks/marketing" }, { label: "Finance: refunds and paid invoices", href: "/playbooks/finance" }] },
  { id: "units", n: 4, name: "Mixed units", what: "2d read as 2 hours, 80% read as 80, 28 bottles ordered from a supplier who sells cartons of 12.",
    test: "List every unit in your data (days, hours, %, packs, lakh) and include one of each in your sample.",
    seen: [{ label: "Operations: 2 days, not 2 hours", href: "/playbooks/operations" }, { label: "Product: 80 percent isn't 80", href: "/playbooks/product" }] },
  { id: "scope", n: 5, name: "A rule applied at the wrong level", what: "A per-day limit checked per line, a per-person total checked per invoice, two conditions where only one was applied.",
    test: "For each rule, ask: per what? Per row, per day, per person, per file? Put a case in your sample where it matters.",
    seen: [{ label: "Finance: a daily limit, one meal at a time", href: "/playbooks/finance" }, { label: "Product: unfinished work announced", href: "/playbooks/product" }] },
  { id: "stale", n: 6, name: "Out-of-date knowledge", what: "The AI learned the rules before they changed: tax slabs, PF ceilings, prices, policies.",
    test: "Write the current rule into the brief yourself. Never leave a rule that changes to the AI's memory.",
    seen: [{ label: "Chapter 3: the PF ceiling", href: "/chapter/3" }] },
  { id: "offbyone", n: 7, name: "Off by one", what: "A 12-month term ending on the anniversary instead of the day before; 30 days used for a 31-day month.",
    test: "Put an end-of-month date and a deadline in your sample, and check them on a calendar.",
    seen: [{ label: "Legal: the notice deadline", href: "/playbooks/legal" }, { label: "HR: 30 in a 31-day month", href: "/playbooks/hr" }] },
  { id: "matching", n: 8, name: "Matching too strictly, or too loosely", what: "INV/023 and INV-23 treated as different invoices; \"vs\" and \"v.\" as different cases. But a quote must match exactly.",
    test: "Decide which things should match fuzzily (IDs, names) and which must match exactly (quotes, amounts), and test both.",
    seen: [{ label: "Chapter 5: the GSTR-2B reconciler", href: "/chapter/5" }, { label: "Legal: citations", href: "/playbooks/legal" }] },
  { id: "invented", n: 9, name: "Invented content", what: "AI adds a claim, a statistic, a quote or a citation that was never in your input.",
    test: "Make the tool check AI's output against the input: every number and every quote must be found in the source.",
    seen: [{ label: "Chapter 6: the contract checker", href: "/chapter/6" }, { label: "Marketing: captions", href: "/playbooks/marketing" }, { label: "Product: feedback quotes", href: "/playbooks/product" }] },
  { id: "unstated", n: 10, name: "The rule nobody wrote down", what: "Something obvious to you was never in the brief, so the AI guessed: IGST between states, skipping internal tickets, subtracting part payments.",
    test: "Read your brief as if you knew nothing about your job. Every \"of course\" you'd explain to a new colleague belongs in it.",
    seen: [{ label: "Sales: the right tax under the wrong name", href: "/playbooks/sales" }, { label: "HR: the first name slips through", href: "/playbooks/hr" }] },
  { id: "oddfile", n: 11, name: "One file is different", what: "Eleven files have an Amount column and July's says Amt. One row has an extra comma. One PDF is a scan.",
    test: "Run the tool on all your real files, not just one, and make it say which file or row it couldn't read.",
    seen: [{ label: "Chapter 9: the July file", href: "/chapter/9" }, { label: "Chapter 11: the scanned invoice", href: "/chapter/11" }] },
];

export const trapById = (id: string) => TRAPS.find((t) => t.id === id);
export const stepById = (id: string) => STEPS.find((s) => s.id === id);
