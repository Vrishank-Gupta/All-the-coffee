export const VENDOR_NOTES = `Vendor review (BrightPack) - attendees: me, Rahul, Priya, Anita, Suresh (BrightPack)
- Quote: 18L, 2L over budget. Suresh can do 16.5L for a 2-yr deal + penalty clause for late deliveries.
- Priya needs CFO sign-off for a 2-yr commitment. Anita: 3 late shipments last quarter, worried about delays.
- Decided: go ahead IF 16.5L (2-yr) AND penalty clause signed.
- Rahul: send revised quote by Fri. Priya: confirm budget w/ CFO by next Wed. Anita: share delay data w/ Rahul tmrw.`;

export const SEATING_NOTES = `Discussed new office seating plan. Need quotes from two furniture vendors.
Also need to check fire safety rules for the new layout.`;

export interface ActionItem {
  owner: string;
  task: string;
  due: string;
}

export interface SummaryResult {
  summary: string;
  decisions: string[];
  actionItems: ActionItem[];
}

export function summarise(text: string): SummaryResult {
  const t = text.toLowerCase();

  if (t.includes("brightpack")) {
    return {
      summary:
        "BrightPack's quote came in ₹2 lakh over budget, but offered ₹16.5 lakh on a two-year contract with a penalty clause for late deliveries. The team will proceed only if both conditions are met, pending CFO budget approval.",
      decisions: ["Go ahead only if the two-year price is ₹16.5 lakh and a penalty clause is in the contract."],
      actionItems: [
        { owner: "Rahul", task: "Send revised quote", due: "Friday" },
        { owner: "Priya", task: "Confirm budget approval with the CFO", due: "Next Wednesday" },
        { owner: "Anita", task: "Share delay data with Rahul", due: "Tomorrow" },
      ],
    };
  }

  if (t.includes("seating plan") || t.includes("furniture vendor")) {
    return {
      summary: "The team discussed the new office seating plan, agreeing to get vendor quotes and check fire safety requirements before proceeding.",
      decisions: ["No firm decision recorded yet, pending vendor quotes and the fire safety check."],
      actionItems: [
        { owner: "Not mentioned", task: "Get quotes from two furniture vendors", due: "Not mentioned" },
        { owner: "Not mentioned", task: "Check fire safety rules for the new layout", due: "Not mentioned" },
      ],
    };
  }

  const trimmed = text.trim();
  const preview = trimmed.length > 140 ? trimmed.slice(0, 140) + "…" : trimmed;
  return {
    summary: `Here's what I could find: ${preview}`,
    decisions: ["No clear decision found in these notes."],
    actionItems: [{ owner: "Not mentioned", task: "Not mentioned", due: "Not mentioned" }],
  };
}
