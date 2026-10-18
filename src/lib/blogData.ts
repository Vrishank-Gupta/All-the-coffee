import {
  Bot, EyeOff, ShieldAlert, Users2, MessageSquareText,
  Wallet, Handshake, Sheet, GraduationCap, Megaphone,
  type LucideIcon,
} from "lucide-react";

export interface BlogMeta {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  topic: string;
  free: boolean;
  publishedDate: string;
  icon: LucideIcon;
}

export const BLOG_POSTS: BlogMeta[] = [
  {
    slug: "ai-agents-explained",
    title: "AI Agents Are Not Chatbots: What They Actually Do",
    excerpt: "Chatbots answer. Agents act. Here's the actual difference, in plain language, and why it matters for the tools you'll be using next year.",
    readTime: "7 min read",
    topic: "AI trends",
    free: true,
    publishedDate: "2026-10-01",
    icon: Bot,
  },
  {
    slug: "shadow-ai-your-team",
    title: "Shadow AI: The Tools Your Team Is Already Using Without Telling You",
    excerpt: "Most employees already use AI at work, often without approval and without their manager knowing. Here's why that's not as scary as it sounds, and what to actually do about it.",
    readTime: "6 min read",
    topic: "Workplace AI",
    free: true,
    publishedDate: "2026-10-04",
    icon: EyeOff,
  },
  {
    slug: "ai-data-privacy-india",
    title: "Before You Paste Company Data Into ChatGPT, Read This",
    excerpt: "A practical, non-alarmist guide to what's actually safe to paste into an AI tool, what isn't, and what India's data protection law means for you personally.",
    readTime: "7 min read",
    topic: "Privacy & compliance",
    free: false,
    publishedDate: "2026-10-07",
    icon: ShieldAlert,
  },
  {
    slug: "ai-hiring-hr-guide",
    title: "AI in Hiring: What Every HR Professional Should Know",
    excerpt: "Resume screening, bias, and the questions you should be asking any vendor pitching you an “AI-powered” hiring tool.",
    readTime: "7 min read",
    topic: "HR & people ops",
    free: false,
    publishedDate: "2026-10-10",
    icon: Users2,
  },
  {
    slug: "prompt-engineering-is-dying",
    title: "Prompt Engineering Is Dying. Here's What's Replacing It.",
    excerpt: "The elaborate prompt formulas from two years ago mostly don't matter anymore. Here's what actually gets you better results from AI today.",
    readTime: "6 min read",
    topic: "AI trends",
    free: false,
    publishedDate: "2026-10-13",
    icon: MessageSquareText,
  },
  {
    slug: "ai-subscription-costs",
    title: "The Real Cost of AI Subscriptions: What's Actually Worth Paying For",
    excerpt: "A clear-eyed look at what you get for free, what's worth ₹1,000+ a month, and how to tell the difference before you commit a budget line to it.",
    readTime: "7 min read",
    topic: "Finance & ops",
    free: false,
    publishedDate: "2026-10-16",
    icon: Wallet,
  },
  {
    slug: "ai-sales-without-sounding-robotic",
    title: "How Sales Teams Use AI to Close Faster Without Sounding Like a Bot",
    excerpt: "Where AI genuinely speeds up a sales cycle, and the exact spots where it'll make you sound like everyone else's AI-written email, if you're not careful.",
    readTime: "6 min read",
    topic: "Sales",
    free: false,
    publishedDate: "2026-10-18",
    icon: Handshake,
  },
  {
    slug: "ai-cant-do-your-job-yet",
    title: "Why AI Still Can't Do Your Excel Job (And Why That's Good News)",
    excerpt: "An honest look at where AI genuinely struggles with spreadsheet work today, and what that actually means for your job security.",
    readTime: "6 min read",
    topic: "AI trends",
    free: false,
    publishedDate: "2026-10-21",
    icon: Sheet,
  },
  {
    slug: "skills-that-matter-ai-world",
    title: "The Skills That Actually Matter in an AI World",
    excerpt: "It's not coding. Here's what hiring managers and workplace researchers actually say is becoming valuable as AI gets more capable.",
    readTime: "7 min read",
    topic: "Career growth",
    free: false,
    publishedDate: "2026-10-24",
    icon: GraduationCap,
  },
  {
    slug: "ai-marketing-practical-guide",
    title: "AI Won't Replace Marketers. Marketers Using AI Will Replace Those Who Don't.",
    excerpt: "A practical rundown of where AI actually helps a marketing workflow today, and where it still needs a human holding the pen.",
    readTime: "7 min read",
    topic: "Marketing",
    free: false,
    publishedDate: "2026-10-27",
    icon: Megaphone,
  },
];

export function blogBySlug(slug: string) {
  return BLOG_POSTS.find((b) => b.slug === slug);
}
