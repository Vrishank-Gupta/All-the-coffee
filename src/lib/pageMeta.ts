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
