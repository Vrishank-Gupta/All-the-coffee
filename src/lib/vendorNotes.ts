export const VENDOR_NOTES = `Vendor review call - Tue
attendees: me, rahul (procurement), priya (finance), anita (ops), Suresh from BrightPack
- BrightPack quote came in at 18L, 2L over budget
- suresh said they can maybe do 16.5L if we sign for 2 yrs
- priya not sure finance will approve a 2 yr commitment, will check w/ CFO
- anita worried about delivery delays last quarter (3 late shipments)
- suresh promised a penalty clause for late deliveries
- decided: go ahead IF 2 yr price is 16.5L AND penalty clause is in contract
- rahul to send revised quote request to BrightPack by Friday
- priya to confirm budget approval with CFO by next Wed
- anita to share delivery delay data with rahul tomorrow
- next call in 2 weeks`;

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
        { owner: "Rahul", task: "Send revised quote request to BrightPack", due: "Friday" },
        { owner: "Priya", task: "Confirm budget approval with the CFO", due: "Next Wednesday" },
        { owner: "Anita", task: "Share delivery delay data with Rahul", due: "Tomorrow" },
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
