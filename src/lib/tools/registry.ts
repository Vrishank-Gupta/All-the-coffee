// The free tools at /tools. Each one works on its own, with no account, and is also taught as a
// build in the chapter named here. Read by the /tools pages, the page-previews build step and
// the sitemap check.
export interface ToolInfo {
  slug: string;
  title: string; // page title, also used for link previews
  name: string; // short name for cards
  description: string; // one or two sentences, also the link-preview description
  forWho: string;
  chapter: number;
}

export const TOOLS: ToolInfo[] = [
  {
    slug: "ctc-calculator",
    title: "CTC to In-Hand Salary Calculator (FY 2026-27)",
    name: "CTC to in-hand calculator",
    description:
      "See what a CTC really pays you each month under the new tax regime: PF, gratuity, professional tax and income tax, every step shown. Free, no sign-up.",
    forWho: "Anyone with a salary or an offer letter",
    chapter: 3,
  },
  {
    slug: "whatsapp-follow-ups",
    title: "WhatsApp Follow-up Desk",
    name: "WhatsApp follow-up desk",
    description:
      "Keep your follow-ups in one list, see who's overdue, and open each WhatsApp chat with a personal message already typed. Free, no sign-up, stays in your browser.",
    forWho: "Sales, business owners, anyone who chases replies",
    chapter: 4,
  },
  {
    slug: "offer-letters",
    title: "Bulk Offer Letter Generator",
    name: "Bulk offer letters",
    description:
      "One template and a list of joiners gives you every offer letter, with CTC in Indian format and in words, and rows with missing details caught. Free, no sign-up.",
    forWho: "HR teams and founders who hire",
    chapter: 9,
  },
  {
    slug: "invoice-reader",
    title: "Invoice PDFs to Excel: GST Invoice Reader",
    name: "Invoice PDFs to Excel",
    description:
      "Drop vendor invoice PDFs and get one table: vendor, GSTIN, invoice number, date, taxable value, GST and total, with every total checked. Read in your browser, never uploaded.",
    forWho: "Accounts, finance and operations teams",
    chapter: 11,
  },
  {
    slug: "contract-check",
    title: "Contract Red-Flag Checker",
    name: "Contract red-flag checker",
    description:
      "Paste a vendor contract and see the clauses worth a second look: auto-renewals, notice periods, exit penalties, one-sided liability and jurisdiction, each quoted exactly. Free, stays in your browser.",
    forWho: "Managers, founders, legal and procurement",
    chapter: 6,
  },
];

export const toolBySlug = (slug: string) => TOOLS.find((t) => t.slug === slug);
