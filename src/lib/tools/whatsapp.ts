// WhatsApp follow-up desk: used by the free tool at /tools/whatsapp-follow-ups and the Chapter 4
// example. Messages open in WhatsApp through a click-to-chat link (https://wa.me/<number>?text=...),
// which needs the number in international form with digits only, and the text URL-encoded.

export interface Lead {
  id: string;
  name: string;
  phone: string; // as typed
  about: string;
  due: string; // YYYY-MM-DD
  done: boolean;
  lastSent?: string; // YYYY-MM-DD
}

export type LeadStatus = "overdue" | "today" | "upcoming" | "done";

// Indian numbers come in many shapes: 98200 12345, 098200-12345, +91 98200 12345, 0091...
// Returns digits with the country code (919820012345), or null if it can't be a valid number.
export function normalizePhone(input: string): string | null {
  const raw = input.trim();
  let digits = raw.replace(/[^0-9]/g, "");
  if (!digits) return null;
  if (raw.startsWith("+") && !digits.startsWith("91")) {
    return digits.length >= 8 && digits.length <= 15 ? digits : null; // another country, already international
  }
  if (digits.startsWith("0091")) digits = digits.slice(4);
  else if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `91${digits}` : null;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function shortDate(iso: string) {
  const [, m, d] = iso.split("-").map(Number);
  return m && d ? `${d} ${MONTHS[m - 1]}` : iso;
}

export function fillTemplate(template: string, lead: Pick<Lead, "name" | "about" | "due">) {
  const first = lead.name.trim().split(/\s+/)[0] ?? "";
  return template
    .replaceAll("{name}", first)
    .replaceAll("{about}", lead.about.trim())
    .replaceAll("{date}", shortDate(lead.due));
}

export function whatsappLink(phone: string, message: string): string | null {
  const n = normalizePhone(phone);
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : null;
}

export function statusOf(lead: Lead, today: string): LeadStatus {
  if (lead.done) return "done";
  if (lead.due < today) return "overdue";
  if (lead.due === today) return "today";
  return "upcoming";
}

const ORDER: Record<LeadStatus, number> = { overdue: 0, today: 1, upcoming: 2, done: 3 };
export function sortLeads(leads: Lead[], today: string) {
  return [...leads].sort((a, b) => ORDER[statusOf(a, today)] - ORDER[statusOf(b, today)] || a.due.localeCompare(b.due));
}

export function todayIso(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const TEMPLATES = {
  english: "Hi {name}, just following up on {about}. Is today a good time for a quick call?",
  hinglish: "Hi {name}, {about} ke baare mein follow-up kar rahe the. Aaj 5 minute baat ho sakti hai?",
};
