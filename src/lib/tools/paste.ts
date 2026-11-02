// "Can I paste this into AI?" (/tools/paste-check): a few questions about what you want to paste and
// where, and a verdict with a safer way to do it. It follows Chapter 7's safety checklist and the
// blog post on AI and data privacy in India (/blog/ai-data-privacy-india). General guidance, not legal
// advice: the user's company policy has the final word. Pure functions, checked in scripts/checkTools.ts.

export type Account = "work" | "personal" | "unsure";
export type Policy = "yes" | "no" | "unknown";

export const CONTENT_FLAGS = {
  people: "Names, phone numbers, emails or addresses of real people (customers, employees, candidates)",
  sensitive: "Salary, bank, health, Aadhaar or PAN details",
  unreleased: "Numbers or plans that aren't public yet (results, prices, deals)",
  confidential: "Anything marked confidential, or a client's information under an NDA",
  secrets: "Passwords, API keys or login details",
} as const;
export type ContentFlag = keyof typeof CONTENT_FLAGS;

export interface PasteInput {
  account: Account; // which AI account: your company's approved tool on your work login, or a personal one
  policy: Policy; // does your company's AI policy allow this tool for this kind of work?
  content: ContentFlag[];
  sharing: boolean; // will it go inside a tool or page you share with others?
}

export type Level = "go" | "care" | "strip" | "stop";

export interface PasteResult {
  level: Level;
  headline: string;
  reasons: string[];
  saferWay: string[];
}

export const EMPTY_PASTE: PasteInput = { account: "unsure", policy: "unknown", content: [], sharing: false };

export function checkPaste(i: PasteInput): PasteResult {
  const has = (f: ContentFlag) => i.content.includes(f);
  const private_ = has("sensitive") || has("unreleased") || has("confidential");
  const reasons: string[] = [];
  const saferWay: string[] = [];
  let level: Level;

  if (has("secrets")) reasons.push("Passwords and API keys never go into an AI chat, or into a tool you share. Anyone who sees them can use them.");
  if (i.policy === "no") reasons.push("Your company's policy doesn't allow this tool for this work. That settles it, whatever the data.");
  if (i.account !== "work" && private_) reasons.push("Confidential, unreleased or sensitive details shouldn't go into a personal AI account. Paying for it doesn't make it a business account: the protections come from your company's contract.");
  if (i.sharing && (has("people") || private_)) reasons.push("Anything inside a page you share can be seen by anyone with the link, even text that doesn't show on screen.");

  if (reasons.length) level = "stop";
  else if (has("people") && i.account !== "work") {
    level = "strip";
    reasons.push("It's about real people, and it would go into an account your company doesn't control. They never agreed to that.");
  } else if (i.content.length && (i.account === "unsure" || i.policy === "unknown")) {
    level = "strip";
    reasons.push("You're not sure which account or policy applies. That's a two-minute message to IT, not a guess.");
  } else if (i.content.length) {
    level = "care";
    reasons.push("Your company's approved tool, on your work login, is the right place. Still share only what the task needs.");
  } else {
    level = "go";
    reasons.push("Nothing here identifies a person, and nothing is secret or unreleased.");
  }

  if (has("people") || has("sensitive")) saferWay.push("Replace names, phone numbers, emails and IDs with \"Customer A\" or \"Employee 3\" before you paste.");
  if (has("unreleased")) saferWay.push("Round or remove numbers that aren't public yet. The AI rarely needs the real figure to help.");
  if (has("confidential")) saferWay.push("Describe instead of pasting: \"a client wants to renegotiate a two-year contract at a lower rate\" gets the same help.");
  if (has("secrets")) saferWay.push("Take the password or key out completely. If one was already pasted somewhere, change it.");
  if (i.content.length) saferWay.push("Building a tool? Use the column headings and a few rows of made-up sample data. The tool will work the same on the real file later.");
  if (i.account === "personal") saferWay.push("If you use a personal account at all, check its settings for whether your chats are used for training. Opting out doesn't delete what's stored.");
  if (i.policy === "unknown" || i.account === "unsure") saferWay.push("Ask IT or your manager which AI tool is approved for work, and on which login.");
  if (!saferWay.length) saferWay.push("Go ahead. It's still a good habit to ask: would I be comfortable if the person this is about saw exactly what I typed?");

  const headline = {
    go: "Fine to paste.",
    care: "Fine in your approved work tool, with care.",
    strip: "Not as it is. Strip the details first, or check before you paste.",
    stop: "Don't paste this.",
  }[level];
  return { level, headline, reasons, saferWay };
}
