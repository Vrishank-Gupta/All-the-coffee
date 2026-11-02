import type { Playbook, RunResult, Tone } from "./types.ts";
import { records, parseMoney, inr, round2, settings } from "./common.ts";

// ---------- Build 1: UTM link builder and naming checker ----------
const LINKS_CSV = `base_url,source,medium,campaign,content
https://allthecoffee.in/,Instagram,social,Diwali Sale,reel-1
https://allthecoffee.in/,ig,Social,diwali-sale,story
https://allthecoffee.in/tools?ref=home,newsletter,email,Diwali Sale,top-banner
https://allthecoffee.in/,google,cpc,diwali_sale,search-ad
https://allthecoffee.in/,facebook,paid social,Diwali Sale,carousel
https://allthecoffee.in/,linkedin,social,diwali sale,post`;

const ALIASES: Record<string, string> = { ig: "instagram", insta: "instagram", fb: "facebook", li: "linkedin", yt: "youtube", wa: "whatsapp" };
export const utmClean = (s: string) => s.trim().toLowerCase().replace(/[\s_]+/g, "-").replace(/-+/g, "-");

export function utmLinks([csv]: string[]): RunResult {
  const rows = records(csv);
  const before = { campaign: new Set<string>(), source: new Set<string>() };
  const after = { campaign: new Set<string>(), source: new Set<string>() };
  let fixed = 0;
  const out = rows.map((r) => {
    before.campaign.add(r.campaign); before.source.add(r.source);
    const src = ALIASES[utmClean(r.source)] ?? utmClean(r.source);
    const med = utmClean(r.medium), camp = utmClean(r.campaign), cont = utmClean(r.content);
    after.campaign.add(camp); after.source.add(src);
    const changed = src !== r.source || med !== r.medium || camp !== r.campaign || cont !== r.content;
    if (changed) fixed++;
    const q = `utm_source=${encodeURIComponent(src)}&utm_medium=${encodeURIComponent(med)}&utm_campaign=${encodeURIComponent(camp)}&utm_content=${encodeURIComponent(cont)}`;
    return [r.base_url.includes("?") ? `${r.base_url}&${q}` : `${r.base_url}?${q}`, changed ? "names tidied" : "ok"];
  });
  return {
    stats: [
      { label: "Links", value: String(rows.length) },
      { label: "Campaign spellings", value: `${before.campaign.size} → ${after.campaign.size}`, tone: "good" },
      { label: "Sources", value: `${before.source.size} → ${after.source.size}`, tone: "good" },
      { label: "Rows tidied", value: String(fixed), tone: fixed ? "warn" : "good" },
    ],
    columns: ["Tracking link", "Names"],
    rows: out,
    notes: ["Everything is lower case with hyphens, and ig, fb and similar become one source name, so your analytics shows one campaign, not four."],
  };
}

// ---------- Build 2: ROAS report from two ad platforms ----------
const META_CSV = `Campaign name,Amount spent (INR),Purchases,Purchase conversion value
Diwali Prospecting,"18,450.00",12,"41,880.00"
Diwali Retargeting,"9,200.00",15,"52,350.00"
Brand Awareness,"6,000.00",0,0
Total,"33,650.00",27,"94,230.00"`;

const GOOGLE_CSV = `Campaign,Cost,Conversions,Conv. value
Search - Brand,"4,300.00",9,"31,500.00"
Search - Generic,"12,800.00",6,"17,400.00"
Performance Max,"7,500.00",4,"11,600.00"`;

const ROAS_SETTINGS = "Target ROAS: 2";

export function roasReport([meta, google, conf]: string[]): RunResult {
  const target = Number(settings(conf ?? "")["target roas"] ?? 2);
  const all: { name: string; platform: string; spend: number; conv: number; value: number }[] = [];
  const isTotal = (n: string) => /^(total|grand total)$/i.test(n.trim()) || !n.trim();
  for (const r of records(meta)) {
    if (isTotal(r["campaign name"])) continue;
    all.push({ name: r["campaign name"], platform: "Meta", spend: parseMoney(r["amount spent (inr)"]) ?? 0, conv: Number(r.purchases), value: parseMoney(r["purchase conversion value"]) ?? 0 });
  }
  for (const r of records(google)) {
    if (isTotal(r.campaign)) continue;
    all.push({ name: r.campaign, platform: "Google", spend: parseMoney(r.cost) ?? 0, conv: Number(r.conversions), value: parseMoney(r["conv. value"]) ?? 0 });
  }
  const spend = all.reduce((a, c) => a + c.spend, 0), value = all.reduce((a, c) => a + c.value, 0);
  const sorted = [...all].sort((a, b) => b.value / b.spend - a.value / a.spend);
  return {
    stats: [
      { label: "Total spend", value: inr(spend) },
      { label: "Revenue from ads", value: inr(value) },
      { label: "Overall ROAS", value: `${round2(value / spend).toFixed(2)}x`, tone: value / spend >= target ? "good" : "warn" },
      { label: `Below ${target}x`, value: String(all.filter((c) => c.value / c.spend < target).length), tone: "warn" },
    ],
    columns: ["Campaign", "Platform", "Spend", "Conversions", "Revenue", "ROAS", "Cost per conversion"],
    rows: sorted.map((c) => [c.name, c.platform, inr(c.spend), c.conv, inr(c.value), `${(c.value / c.spend).toFixed(2)}x`, c.conv ? inr(round2(c.spend / c.conv)) : "no conversions"]),
    rowTones: sorted.map((c): Tone | undefined => (c.value / c.spend < 1 ? "bad" : c.value / c.spend < target ? "warn" : "good")),
    notes: ["Brand awareness campaigns aren't meant to sell directly: judge them on reach, not ROAS."],
  };
}

// ---------- Build 3: caption rewriter with a claims check (AI inside) ----------
const DRAFT = "Our Diwali offer: 20% off all coffee subscriptions till 12 November. Free delivery above ₹999.";
const BRAND = `Banned words: best, #1, guaranteed, revolutionary, cheapest
Tone: warm, short, no exclamation marks in a row`;
const AI_REPLY = `1. Diwali just got cosier: 20% off every coffee subscription till 12 November, with free delivery above ₹999.
2. Loved by 10,000+ coffee lovers! Get the best brew in India at 20% off till 12 November.
3. Guaranteed freshness, 20% off and free delivery above ₹999. Offer ends 15 November.`;

const numbersIn = (s: string) => new Set((s.match(/\d[\d,]*(?:\.\d+)?/g) ?? []).map((n) => n.replace(/,/g, "")));

export function claimCheck([draft, brand, reply]: string[]): RunResult {
  const known = numbersIn(draft);
  const banned = (settings(brand)["banned words"] ?? "").split(",").map((w) => w.trim().toLowerCase()).filter(Boolean);
  const variants = reply.split("\n").map((l) => l.replace(/^\s*\d+[.)]\s*/, "").trim()).filter(Boolean);
  let clean = 0;
  const rows = variants.map((v, i) => {
    const issues: string[] = [];
    for (const n of numbersIn(v)) if (!known.has(n)) issues.push(`"${n}" isn't in your draft`);
    for (const w of banned) {
      const re = new RegExp(`(^|[^a-z0-9#])${w.replace(/[#]/g, "\\#")}([^a-z0-9]|$)`, "i");
      if (re.test(v)) issues.push(`banned word "${w}"`);
    }
    if (!issues.length) clean++;
    return [`Option ${i + 1}`, v, issues.length ? issues.join("; ") : "ready to use"];
  });
  return {
    stats: [{ label: "Ready to use", value: `${clean} of ${variants.length}`, tone: clean ? "good" : "bad" }],
    columns: ["", "Caption", "Check"],
    rows,
    rowTones: rows.map((r) => (r[2] === "ready to use" ? "good" : "bad")),
    notes: ["Every number in a caption must come from your draft: AI likes to add social proof and change dates."],
  };
}

export const MARKETING: Playbook = {
  slug: "marketing",
  role: "Marketing",
  title: "Marketing Playbook",
  tagline: "Tracking links your analytics can actually group, one honest ROAS number across Meta and Google, and captions that never invent a claim.",
  forWho: "Marketers, social media managers, growth and performance teams",
  toolSlug: "utm-builder",
  builds: [
    {
      id: "marketing-utm", title: "UTM link builder and naming checker", minutes: "25 min", where: "browser",
      why: "Three people tag the same campaign three ways (Diwali Sale, diwali_sale, diwali-sale) and your analytics shows three campaigns. A small tool that builds every link the same way fixes it for good.",
      files: [{ name: "links.csv", content: LINKS_CSV }],
      prompt: `Who it's for: I run marketing campaigns and need consistent tracking links.

What it does: I upload links.csv (columns: base_url, source, medium,
campaign, content). For each row, build a link with utm_source,
utm_medium, utm_campaign and utm_content added. Before building:
- make every value lower case, and turn spaces and underscores into hyphens
- turn short source names into full ones: ig to instagram, fb to facebook
Show each finished link with a Copy button, and tell me how many
different campaign spellings there were before and after.

What good looks like: "Diwali Sale", "diwali_sale" and "diwali sale"
all become diwali-sale.

What to avoid: don't change the base URL itself.`,
      check: "6 links. Campaign spellings go from 4 to 1 (diwali-sale), sources from 6 to 5 (ig and Instagram become instagram), and all 6 rows needed tidying. The newsletter link keeps its ?ref=home and adds the tracking with &: https://allthecoffee.in/tools?ref=home&utm_source=newsletter&utm_medium=email&utm_campaign=diwali-sale&utm_content=top-banner",
      trap: {
        title: "Two question marks",
        text: "Look at the newsletter link. If it reads ...tools?ref=home?utm_source=..., it's broken: a link can only have one question mark, and everything after the second is lost or mangled. Your newsletter clicks then show up as untracked, and nobody notices for a month.",
        fix: `I expected: the newsletter link to keep ?ref=home and add the UTM
values with &.
What happened instead: [the link you got].

If the base URL already has a ?, join the UTM values with & instead of
?. Explain what went wrong, then fix it.`,
      },
      run: utmLinks,
      tryIt: [
        "Add a row with source \"YT\" and make the tool turn it into youtube.",
        "Add a warning when a medium isn't one of: social, paid-social, email, cpc, referral.",
      ],
    },
    {
      id: "marketing-roas", title: "One ROAS report from Meta and Google", minutes: "35 min", where: "browser",
      why: "Meta and Google export their numbers with different column names, and the monthly question is simple: what did we spend, what came back, and which campaigns are pulling their weight?",
      files: [{ name: "meta.csv", content: META_CSV }, { name: "google.csv", content: GOOGLE_CSV }, { name: "settings.txt", content: ROAS_SETTINGS }],
      prompt: `Who it's for: I run paid campaigns on Meta and Google.

What it does: I upload two exports. meta.csv has Campaign name, Amount
spent (INR), Purchases and Purchase conversion value. google.csv has
Campaign, Cost, Conversions and Conv. value. Combine them into one
table: campaign, platform, spend, conversions, revenue, ROAS (revenue
divided by spend) and cost per conversion. Sort by ROAS, best first,
and show total spend, total revenue and the overall ROAS. Highlight
campaigns below a target ROAS of 2, in a box I can change.

What good looks like: one table, numbers I can check with a calculator.

What to avoid: don't guess numbers; if a value can't be read, say so.`,
      check: "Total spend ₹58,250, revenue ₹1,54,730, overall ROAS 2.66x. Best: Search - Brand at 7.33x, then Diwali Retargeting 5.69x. Below the 2x target: Diwali Prospecting is fine at 2.27x, but Performance Max (1.55x), Search - Generic (1.36x) and Brand Awareness (0, an awareness campaign) are below it.",
      trap: {
        title: "The Total row counted as a campaign",
        text: "Meta's export ends with a Total row. If your spend shows ₹91,900, the tool added Total as if it were a campaign, so every Meta rupee was counted twice. The overall ROAS barely moves (2.71x instead of 2.66x), which is exactly why it slips through: your spend report is ₹33,650 too high, and Meta looks like 73% of the budget instead of 58%.",
        fix: `I expected: total spend of ₹58,250.
What happened instead: [your total].

The last row of meta.csv is a Total row, not a campaign. Skip any row
named Total. Explain what went wrong, then fix it.`,
      },
      run: roasReport,
      tryIt: [
        "Change the target to 3x. Which campaigns turn amber?",
        "Add a column for each campaign's share of total spend.",
      ],
    },
    {
      id: "marketing-captions", title: "Caption rewriter that can't invent claims", minutes: "35 min", where: "ai-inside",
      why: "AI writes captions fast, and it also adds things you never said: \"loved by 10,000+ customers\", \"the best in India\", a different end date. In marketing, an invented claim can be misleading advertising. Build the rewriter with its own fact check.",
      files: [{ name: "draft.txt", content: DRAFT }, { name: "brand.txt", content: BRAND }, { name: "ai-reply.txt", content: AI_REPLY }],
      prompt: `Who it's for: I write social media captions for my brand.

What it does: a box for my draft caption and a box for my brand rules
(banned words, tone). A Rewrite button asks AI for 3 shorter, warmer
versions. Then the tool itself checks each version:
- every number in the version must appear in my draft (prices, dates,
  percentages); flag any that don't
- flag any banned word
Show each version with "ready to use" or what's wrong.

What good looks like: I only copy captions that passed both checks.

What to avoid: never let AI's text go out unchecked.`,
      check: "Using the sample AI reply (ai-reply.txt): option 1 is ready to use. Option 2 fails twice: \"10000\" isn't in your draft, and it uses the banned word \"best\". Option 3 fails twice: the banned word \"guaranteed\", and \"15\" isn't in your draft (the offer ends on 12 November, not 15).",
      trap: {
        title: "A believable wrong date",
        text: "Option 3 sounds fine until you notice the offer now ends on 15 November. Invented numbers are easy to spot when they're big (10,000+ customers) and easy to miss when they're small. That's why the check looks at every number, not just the impressive ones.",
        fix: `I expected: option 3 flagged, because "15 November" isn't in my draft.
What happened instead: it passed.

Check every number in each version, including dates and small numbers,
against the numbers in my draft. Explain what went wrong, then fix it.`,
      },
      run: claimCheck,
      tryIt: [
        "Add \"limited stock\" to the banned list: urgency you can't prove is a claim too.",
        "Ask for a Hinglish version as a fourth option, and check it the same way.",
      ],
    },
  ],
};
