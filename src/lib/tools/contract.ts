// Contract red-flag finder for the free tool at /tools/contract-check and the Chapter 6 example.
// It doesn't use AI: it looks for the wording common risky clauses use (renews automatically,
// days' notice, without limit...) and quotes each sentence it finds, with a plain-English note.
// It can miss a clause written in unusual words, and it's not legal advice; the tool says so.

export const SAMPLE_CONTRACT = `SERVICE AGREEMENT

This Service Agreement is made on 1 November 2026 between Your Company Pvt Ltd (the "Client") and Brightline Facility Services Pvt Ltd (the "Vendor").

1. Services. The Vendor will provide housekeeping and pantry services at the Client's Mumbai office, as described in Annexure A.

2. Term. This Agreement starts on 1 December 2026 and continues for 12 months. It will renew automatically for further periods of 12 months unless either party gives written notice of non-renewal at least 90 days before the end of the current term.

3. Fees. The Client will pay Rs 1,80,000 per month plus GST. The fees will increase by 10% on each renewal.

4. Payment. Invoices are payable within 15 days. Late payments will attract interest at 24% per annum.

5. Termination. The Client may terminate this Agreement only for material breach, by giving 60 days' written notice. If the Client ends this Agreement for any other reason, it must pay the fees for the remainder of the term.

6. Liability. The Vendor's total liability under this Agreement shall not exceed the fees paid in the preceding one month. The Client shall indemnify the Vendor against all claims, losses and expenses arising in connection with this Agreement, without limit.

7. Confidentiality. Each party will keep the other's confidential information secret during this Agreement and for two years after it ends.

8. Non-solicitation. During this Agreement and for 24 months after it ends, the Client will not hire any person employed by the Vendor.

9. Jurisdiction. This Agreement is governed by the laws of India, and the courts at Kolkata alone shall have jurisdiction.

10. Notices. Notices must be sent by registered post to the addresses above.`;

export interface Flag {
  key: string;
  title: string;
  why: string;
  sentence: string;
  clause: string; // "2" for a sentence inside clause 2, "" if unnumbered
  detail: string; // the number that matters, e.g. "90 days"
}

interface Rule { key: string; title: string; why: string; test: RegExp; detail?: (s: string) => string }

// The notice period is the number of days next to the word notice, not the first number in the sentence
const noticeDays = (s: string) => {
  const m = /(\d+)\s*days?'?\s*(?:prior\s+)?(?:written\s+)?notice/i.exec(s) ?? /notice[^.]{0,60}?(\d+)\s*days/i.exec(s);
  return m ? `${m[1]} days` : "";
};
const days = (s: string) => /(\d+)\s*(days?|months?)/i.exec(s)?.slice(1, 3).join(" ") ?? "";
const pct = (s: string) => (/(\d+(?:\.\d+)?)\s*%/.exec(s)?.[1] ?? "") + (/%/.test(s) ? "%" : "");

export const RULES: Rule[] = [
  { key: "auto-renewal", title: "Renews automatically", test: /renew\w*\s+automatically|automatic(?:ally)?\s+renew|auto-?renew/i,
    why: "The contract carries on, and you keep paying, unless you cancel in time. Put the last date to cancel in your calendar today." },
  { key: "notice", title: "Notice period", test: /\d+\s*days?'?\s*(?:prior\s+)?(?:written\s+)?notice|notice[^.]{0,60}?\d+\s*days/i, detail: noticeDays,
    why: "How early you must tell them before you can stop or change something. Long notice periods are easy to miss." },
  { key: "price-increase", title: "Built-in price increase", test: /(?:increase|escalat)\w*\s+(?:by\s+)?\d+(?:\.\d+)?\s*%/i, detail: pct,
    why: "The price goes up automatically. Check it's in your budget, and whether you can negotiate a cap." },
  { key: "late-payment", title: "Late payment charges", test: /(?:interest|late\s+fee|penalt\w*)[^.]{0,60}?\d+(?:\.\d+)?\s*%/i, detail: pct,
    why: "Paying late costs extra, sometimes a lot. Make sure your payment cycle can meet their deadline." },
  { key: "lock-in", title: "Lock-in or exit penalty", test: /remainder of the term|lock-?in|early termination (?:fee|charge)|minimum (?:term|commitment)/i,
    why: "Leaving early costs money, sometimes everything you'd have paid anyway. Know the exit cost before you sign." },
  { key: "liability-cap", title: "Their liability is capped", test: /liability[^.]{0,80}?(?:shall not exceed|not exceed|limited to|capped)/i,
    why: "If something goes wrong on their side, this is the most you can recover. Compare it with what's actually at risk." },
  { key: "indemnity", title: "You indemnify them", test: /indemnif\w+/i,
    why: "You agree to cover their losses. Watch for one-sided wording, or 'without limit', which means no ceiling at all." },
  { key: "non-solicit", title: "No hiring their people", test: /non-?solicit|non-?compet|not\s+(?:hire|solicit|employ)/i, detail: days,
    why: "Limits who you can hire, or what you can do, even after the contract ends. Check how long it lasts." },
  { key: "jurisdiction", title: "Where disputes go", test: /jurisdiction|arbitration/i, detail: (s) => /courts?\s+(?:at|of|in)\s+([A-Z][a-z]+)/.exec(s)?.[1] ?? "",
    why: "Any dispute is fought in this place. If it's another city, every hearing means travel and local lawyers." },
];

// Splits a contract into sentences, remembering which numbered clause each one is in.
export function sentences(text: string): { sentence: string; clause: string }[] {
  const out: { sentence: string; clause: string }[] = [];
  let clause = "";
  for (const raw of text.split(/\n+/)) {
    const line = raw.trim();
    if (!line) continue;
    const num = /^(\d+(?:\.\d+)*)[.)]\s/.exec(line);
    if (num) clause = num[1];
    // A short heading like "8. Non-solicitation." is a label, not a sentence: leave it out
    const body = num ? line.replace(/^\d+(?:\.\d+)*[.)]\s+(?:[A-Z][\w -]{0,40}\.\s+)?/, "") : line;
    for (const s of body.split(/(?<=[.;])\s+(?=[A-Z("])/)) if (s.trim()) out.push({ sentence: s.trim(), clause });
  }
  return out;
}

export function findFlags(text: string): Flag[] {
  const flags: Flag[] = [];
  for (const { sentence, clause } of sentences(text)) {
    for (const r of RULES) {
      if (r.test.test(sentence)) {
        let detail = r.detail?.(sentence) ?? "";
        if (r.key === "indemnity" && /without\s+limit|unlimited/i.test(sentence)) detail = "without limit";
        flags.push({ key: r.key, title: r.title, why: r.why, sentence, clause, detail });
      }
    }
  }
  return flags;
}
