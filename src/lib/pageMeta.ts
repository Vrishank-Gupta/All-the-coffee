// Title and description for each public page that isn't a blog post or a
// chapter. Read by the pages themselves (via useDocumentMeta) and by the
// page-previews build step, which bakes them into a static HTML file per page
// so link previews on WhatsApp, LinkedIn and X show the right page.
export interface PageMeta {
  title: string;
  description: string;
}

export const PAGE_META = {
  "/overview": {
    title: "Course Overview",
    description: "What All The Coffee teaches, who it's for, and what you'll be able to build by the end. No coding background needed.",
  },
  "/signup": {
    title: "Create Your Free Account",
    description: "Chapters 0–3 are free, no card needed. Start building your first AI tool in 20 minutes.",
  },
  "/login": {
    title: "Log In",
    description: "Log in to pick up your All The Coffee course where you left off.",
  },
  "/blog": {
    title: "Blog",
    description: "Weekly, practical AI insights for HR, finance, ops, sales and marketing professionals. No hype, no jargon.",
  },
  "/method": {
    title: "The Builder's Method: How to Build Any Tool with AI",
    description: "Eight steps for turning any repetitive task into a tool you can trust, and the 11 ways AI-built tools go quietly wrong. Free.",
  },
  "/practice": {
    title: "Spot the Trap: Drills for Checking AI-Built Tools",
    description: "Tools built with AI give confident, wrong answers. Find what went wrong and the line that prevents it: 12 drills on the 11 traps, plus 2 for each of 7 job roles. Free.",
  },
  "/fix-it": {
    title: "Fix-it Guide: When Your AI-Built Tool Breaks",
    description: "Blank page, lost data, python not recognized, a link that asks for a password: the common problems, by symptom, with what to do.",
  },
  "/cheat-sheet": {
    title: "Cheat Sheet: Building Tools with AI on One Page",
    description: "The four-part brief, the fix loop, the 8 steps and the 11 traps on one printable A4 page. Free.",
  },
  "/glossary": {
    title: "Glossary: Tech Words in Plain English",
    description: "Every tech word in the All The Coffee course, from API to UTF-8, in plain English with a sentence you could say in a meeting.",
  },
  "/playbooks": {
    title: "Role Playbooks: AI Tools for Your Job",
    description: "Real tools for sales, marketing, finance, HR, product, legal and operations work, each built with AI and checked against a known answer. Included with the course.",
  },
  "/tools": {
    title: "Free Tools for Office Work",
    description: "Free tools for real office work: salary, follow-ups, letters, invoices, contracts. No sign-up. Each one is also a build in the course.",
  },
  "/terms": {
    title: "Terms of Service",
    description: "The terms that apply when you use All The Coffee and its course.",
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "What data All The Coffee collects, why it collects it, and how it is stored and protected.",
  },
  "/refund-policy": {
    title: "Refund Policy",
    description: "How refunds work for the paid part of the All The Coffee course.",
  },
} satisfies Record<string, PageMeta>;
