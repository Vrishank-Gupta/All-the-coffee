export interface ChapterMeta {
  id: number;
  title: string;
  short: string;
  minutes: string;
  device: string;
  free: boolean;
  module: "A" | "B" | "C";
  path: string;
  live: boolean;
}

export const MODULES = {
  A: { name: "Module A", tagline: "Breaking the barrier", desc: "No installs, no code reading." },
  B: { name: "Module B", tagline: "Building useful things", desc: "In the browser, with AI inside your tools." },
  C: { name: "Module C", tagline: "Your own computer", desc: "Scripts, automation, and a capstone for your job." },
} as const;

export const CHAPTERS: ChapterMeta[] = [
  { id: 0, title: "You're not behind", short: "The starting line", minutes: "15 min", device: "No laptop needed", free: true, module: "A", path: "/chapter/0", live: true },
  { id: 1, title: "Your first tool in 20 minutes", short: "Build a Meeting Cost Calculator", minutes: "20 min", device: "Laptop recommended", free: true, module: "A", path: "/chapter/1", live: true },
  { id: 2, title: "What just happened?", short: "How software works", minutes: "30 min", device: "Laptop recommended", free: true, module: "A", path: "/chapter/2", live: true },
  { id: 3, title: "When things break", short: "And why that's normal", minutes: "35–40 min", device: "Laptop needed", free: true, module: "A", path: "/chapter/3", live: true },
  { id: 4, title: "A tool that remembers", short: "Build a Follow-up Tracker", minutes: "40 min", device: "Laptop needed", free: false, module: "B", path: "/chapter/4", live: true },
  { id: 5, title: "Taming messy spreadsheets", short: "Build a Data Cleaner", minutes: "45 min", device: "Laptop needed", free: false, module: "B", path: "/chapter/5", live: true },
  { id: 6, title: "Putting AI inside your tool", short: "Build a Meeting Notes Summariser", minutes: "45 min", device: "Laptop needed", free: false, module: "B", path: "/chapter/6", live: true },
  { id: 7, title: "Sharing what you built", short: "Publish a link", minutes: "30 min", device: "Laptop needed, phone helpful", free: false, module: "B", path: "/chapter/7", live: true },
  { id: 8, title: "Setting up your workshop", short: "Install, without fear", minutes: "45 min", device: "Laptop needed", free: false, module: "C", path: "/chapter/8", live: false },
  { id: 9, title: "Your first automation script", short: "Merge 12 sales sheets", minutes: "50 min", device: "Laptop needed", free: false, module: "C", path: "/chapter/9", live: false },
  { id: 10, title: "Reading code like a recipe", short: "Spot the four building blocks", minutes: "40 min", device: "Laptop needed", free: false, module: "C", path: "/chapter/10", live: false },
  { id: 11, title: "Capstone: build it for your job", short: "The sentence from Chapter 0, built", minutes: "90–120 min", device: "Laptop needed", free: false, module: "C", path: "/chapter/11", live: false },
];

export function chapterById(id: number) {
  return CHAPTERS.find((c) => c.id === id);
}

export function nextLiveChapter(completedIds: number[]): ChapterMeta | null {
  return CHAPTERS.find((c) => c.live && !completedIds.includes(c.id)) ?? null;
}
