// The free tools at /tools. Each one works on its own, with no account, and is also taught as a
// build in the chapter named here. Read by the /tools pages, the page-previews build step and
// the sitemap check.
export interface ToolInfo {
  slug: string;
  title: string; // page title, also used for link previews
  name: string; // short name for cards
  description: string; // one or two sentences, also the link-preview description
  forWho: string;
  chapter?: number; // taught in this core chapter...
  playbook?: string; // ...or in this Role Playbook (slug)
  build?: string; // for playbook tools: the build whose reference implementation runs the tool
  intro?: string; // for playbook tools: the page's opening line
  how?: string[]; // for playbook tools: "How it works" paragraphs
  learn?: string; // for tools that aren't a build: what the chapter teaches instead (replaces "you describe this tool to AI")
}

export const TOOLS: ToolInfo[] = [
  {
    slug: "brief-builder",
    title: "Brief Builder: Turn Any Work Task into an AI Tool Brief",
    name: "Brief Builder",
    description:
      "Describe a task you repeat at work and get: is it worth a tool, where to build it, a ready-to-paste brief for any AI chat, a way to check its answer, and the traps to test for. Free.",
    forWho: "Anyone with a repetitive task, in any role",
    chapter: 3,
    learn: "you learn to brief AI like a new intern and to test a tool against a known answer, the thinking this tool walks you through",
  },
  {
    slug: "paste-check",
    title: "Can I Paste This into AI? A Data Safety Check for Work",
    name: "Can I paste this into AI?",
    description:
      "Four questions before you paste work data into ChatGPT, Claude or Gemini: is it fine, what to strip out first, and a safer way to get the same help. Free, nothing saved.",
    forWho: "Anyone using AI at work",
    chapter: 7,
    learn: "you learn the safety checklist behind this tool: what never goes into a page you share, and how to take something down",
  },
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
  {
    slug: "gst-quotation",
    title: "GST Quotation Generator with Amount in Words",
    name: "GST quotation generator",
    description:
      "Items, discounts and GST rates in; a quotation out, with IGST or CGST + SGST chosen from the two states, round off, and the total in words. Free, no sign-up.",
    forWho: "Sales teams, small businesses, freelancers who bill companies",
    playbook: "sales",
    build: "sales-gst-quote",
    intro: "Put in your items and the two states, and get a quotation where every number can be checked with a calculator, with the total in words the Indian way.",
    how: [
      "For each item, the taxable value is quantity times rate, less the discount. GST is charged on the taxable value at that item's rate, from your file.",
      "If your state and the customer's state are different, the tax is IGST. If they're the same, it's split equally into CGST and SGST.",
      "The total is rounded to the nearest rupee, with the round off shown, and written out in words. GST rates in the sample file are for practice: use the right rate for your goods.",
    ],
  },
  {
    slug: "utm-builder",
    title: "UTM Link Builder with Naming Checker",
    name: "UTM link builder",
    description: "Build campaign tracking links where every name is tidy and consistent, so your analytics shows one campaign, not four spellings of it. Free, no sign-up.",
    forWho: "Marketers and anyone who shares campaign links",
    playbook: "marketing",
    build: "marketing-utm",
    intro: "List your links once, and get tracking links where Diwali Sale, diwali_sale and diwali-sale all become the same campaign.",
    how: [
      "Every value is made lower case, and spaces and underscores become hyphens. Short source names like ig and fb become instagram and facebook.",
      "If your page link already has a question mark in it, the tracking is added with & so the link doesn't break.",
    ],
  },
  {
    slug: "payment-ageing",
    title: "Accounts Receivable Ageing Report with Reminders",
    name: "Payment ageing report",
    description: "Upload your open invoices and see what's overdue in 0-30, 31-60, 61-90 and 90+ day buckets, net of part payments, with a polite reminder for each customer. Free, no sign-up.",
    forWho: "Accounts teams, founders, freelancers",
    playbook: "finance",
    build: "finance-ageing",
    intro: "Who owes you, how late is it, and who to chase first: from your invoice list, in one table.",
    how: [
      "Outstanding is the invoice amount minus what's been paid. Fully paid invoices are left out.",
      "Each invoice goes in a bucket by days past its due date, as of the report date you set, and each customer with something overdue gets a short reminder you can copy.",
    ],
  },
  {
    slug: "rice-prioritiser",
    title: "RICE Prioritisation Calculator",
    name: "RICE prioritiser",
    description: "Rank features by reach, impact, confidence and effort. Reads confidence written as 80%, 80 or 0.8. Free, no sign-up.",
    forWho: "Product managers and founders",
    playbook: "product",
    build: "product-rice",
    intro: "Put in your candidate features and get a ranking everyone can argue about with the same numbers.",
    how: [
      "RICE score = reach × impact × confidence ÷ effort.",
      "Confidence is a percentage, however it's written: 80%, 80 and 0.8 all mean 80 percent.",
    ],
  },
  {
    slug: "lop-calculator",
    title: "Loss of Pay (LOP) Calculator for Payroll",
    name: "Loss-of-pay calculator",
    description: "From absences, half days and leave balances to each person's loss-of-pay days and deduction, using the calendar days in the month. Free, no sign-up.",
    forWho: "HR, payroll and small business owners",
    playbook: "hr",
    build: "hr-lop",
    intro: "Days away, minus leave balance, times a day's pay: for the whole team, to the paisa.",
    how: [
      "Days away = absent days + half of the half days. Loss-of-pay days are what's left after the leave balance is used.",
      "Deduction = monthly gross ÷ days in the month × loss-of-pay days. Policies differ (some use 30, some use working days): check yours before running payroll.",
    ],
  },
  {
    slug: "contract-compare",
    title: "Compare Two Contract Versions",
    name: "Contract version compare",
    description: "Paste two drafts and see which clauses changed, were added or were removed, with changed numbers shown, even when clauses were renumbered. Free, stays in your browser.",
    forWho: "Legal, procurement, founders and anyone negotiating a contract",
    playbook: "legal",
    build: "legal-compare",
    intro: "\"Nothing material changed\" is easy to check: paste both versions and see every clause that moved.",
    how: [
      "Clauses are matched by their heading, not their number, so removing one clause doesn't make every clause after it look changed.",
      "Spaces and line breaks are ignored. Changed numbers (days, rupees, percentages) are shown before and after. It's a reading aid, not legal advice.",
    ],
  },
  {
    slug: "vendor-quotes",
    title: "Vendor Quote Comparison: Landed Cost with GST",
    name: "Vendor quote comparator",
    description: "Compare supplier quotes on landed cost: price, GST, freight and GST on freight, with payment terms alongside. Free, no sign-up.",
    forWho: "Operations, procurement and admin teams",
    playbook: "operations",
    build: "ops-vendor-quotes",
    intro: "The lowest price per unit isn't always the cheapest buy. See what each quote really costs once freight and GST are in.",
    how: [
      "Landed cost = goods + GST on goods + freight + GST on freight.",
      "Vendors are ranked by landed cost, with each one's difference from the cheapest and its payment terms.",
    ],
  },
];

export const toolBySlug = (slug: string) => TOOLS.find((t) => t.slug === slug);
