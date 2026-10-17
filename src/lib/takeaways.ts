export interface ChapterTakeaway {
  chapterId: number;
  title: string;
  points: string[];
  words: string[];
}

export const TAKEAWAYS: ChapterTakeaway[] = [
  {
    chapterId: 0,
    title: "You're not behind",
    points: [
      "Coding is just writing precise instructions for a computer, nothing more mysterious than that.",
      "Vibe coding means describing what you want in plain English, then checking the AI's result.",
      "This course needs no maths, no memorised code, and no installs until Chapter 8.",
    ],
    words: ["Code", "Vibe coding"],
  },
  {
    chapterId: 1,
    title: "Your first tool in 20 minutes",
    points: [
      "Built a working Meeting Cost Calculator by describing it, not by writing code.",
      "The core loop: describe it, let the AI build it, then check it against a number you already know.",
      "A prompt is your request. A preview is the working result you get to try.",
    ],
    words: ["Prompt", "Preview", "Iterate"],
  },
  {
    chapterId: 2,
    title: "What just happened?",
    points: [
      "Every tool follows the same pattern: input, processing, output.",
      "HTML is the skeleton, CSS is the clothes, JavaScript is the muscles of a web tool.",
      "Front end is what you see and click. Back end is the part you don't.",
    ],
    words: ["Front end", "Back end", "HTML", "CSS", "JavaScript"],
  },
  {
    chapterId: 3,
    title: "When things break",
    points: [
      "Bugs show up in three ways: an error message, nothing happening, or a wrong answer that looks fine.",
      "The fix loop: tell the AI what you expected, what happened, and ask it to explain and fix it.",
      "Brief a prompt like a new intern: who it's for, what it does, what good looks like, what to avoid.",
    ],
    words: ["Bug", "Debugging", "Error message", "Test case"],
  },
  {
    chapterId: 4,
    title: "A tool that remembers",
    points: [
      "A tool (the code) and the information inside it (the data) are two separate things.",
      "Memory disappears the moment a tool closes. Storage survives it.",
      "A missing requirement, not a bug, is usually why a tool doesn't do what you expected.",
    ],
    words: ["Data", "Storage", "Requirement", "Feature"],
  },
  {
    chapterId: 5,
    title: "Taming messy spreadsheets",
    points: [
      "A CSV is plain text with commas separating the columns, which is why almost any system can read it.",
      "Ambiguous dates like 03/04 are a classic silent bug: always say which format you mean.",
      "Test any data tool against a file where you already know the correct answer.",
    ],
    words: ["CSV", "Data format", "Data cleaning", "Test data", "Duplicate"],
  },
  {
    chapterId: 6,
    title: "Putting AI inside your tool",
    points: [
      "An API is the waiter between your tool and an AI model: it carries a request out and a response back.",
      "API keys often cost money per use and should be treated like a bank PIN.",
      "A well-built tool handles edge cases (like an empty input) and never invents facts it wasn't given.",
    ],
    words: ["API", "Request / response", "API key", "Edge case", "Hallucination"],
  },
  {
    chapterId: 7,
    title: "Sharing what you built",
    points: [
      "Hosting keeps a tool on an always-on server. Deploying moves the latest version onto it.",
      "Always test a published link in a private browser window and on a phone before sharing it.",
      "Run a short safety check (no real data, no secrets, no company tools without sign-off) before publishing.",
    ],
    words: ["URL", "Hosting", "Server", "Deploy", "Live", "Version"],
  },
];

export function takeawayById(id: number) {
  return TAKEAWAYS.find((t) => t.chapterId === id);
}

export function formatTakeawayText(t: ChapterTakeaway): string {
  const lines = [
    `All The Coffee, Chapter ${t.chapterId}: ${t.title}`,
    "",
    "Key takeaways:",
    ...t.points.map((p) => `- ${p}`),
    "",
    `Words you can now use: ${t.words.join(", ")}`,
  ];
  return lines.join("\n");
}

export function formatAllTakeawaysText(chapters: ChapterTakeaway[]): string {
  return chapters.map(formatTakeawayText).join("\n\n----------------------------------------\n\n");
}
