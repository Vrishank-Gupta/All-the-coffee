import { useEffect, useState } from "react";
import { MessageCircle, Check, Trash2, Plus, Undo2 } from "lucide-react";
import { normalizePhone, fillTemplate, whatsappLink, statusOf, sortLeads, todayIso, shortDate, TEMPLATES, type Lead, type LeadStatus } from "../../lib/tools/whatsapp";

const STORE = "atc-whatsapp-desk-v1";

function load(): { leads: Lead[]; template: string } {
  try {
    const raw = localStorage.getItem(STORE);
    if (raw) return JSON.parse(raw);
  } catch {
    // private window or blocked storage: start empty
  }
  return { leads: [], template: TEMPLATES.english };
}

const BADGE: Record<LeadStatus, string> = {
  overdue: "bg-brick-50 text-brick-700",
  today: "bg-caramel-100 text-caramel-700",
  upcoming: "bg-latte/70 text-espresso-700",
  done: "bg-sage-50 text-sage-700",
};
const LABEL: Record<LeadStatus, string> = { overdue: "Overdue", today: "Due today", upcoming: "Upcoming", done: "Done" };

function pretty(n: string) {
  return n.startsWith("91") && n.length === 12 ? `+91 ${n.slice(2, 7)} ${n.slice(7)}` : `+${n}`;
}

export function WhatsAppDesk() {
  const [{ leads, template }, setState] = useState(load);
  const [form, setForm] = useState({ name: "", phone: "", about: "", due: todayIso() });
  const today = todayIso();
  const phoneOk = normalizePhone(form.phone);

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify({ leads, template }));
    } catch {
      // storage unavailable: the desk still works for this visit
    }
  }, [leads, template]);

  const setLeads = (f: (l: Lead[]) => Lead[]) => setState((s) => ({ ...s, leads: f(s.leads) }));
  const canAdd = form.name.trim() && phoneOk && form.about.trim() && form.due;
  const add = () => {
    if (!canAdd) return;
    setLeads((l) => [...l, { ...form, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, done: false }]);
    setForm({ name: "", phone: "", about: "", due: today });
  };
  const field = "w-full rounded-lg border border-espresso-900/15 bg-white px-3 py-2 text-sm text-espresso-950 focus:border-caramel-500 focus:outline-none";
  const sorted = sortLeads(leads, today);
  const counts = { overdue: 0, today: 0 };
  for (const l of leads) {
    const s = statusOf(l, today);
    if (s === "overdue" || s === "today") counts[s]++;
  }

  return (
    <div className="not-prose grid gap-5 rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft md:grid-cols-[1fr_1.3fr]">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-espresso-900">Add a follow-up</p>
          <input className={field} placeholder="Name, e.g. Rahul Verma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className={field} inputMode="tel" placeholder="WhatsApp number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          {form.phone && (
            <p className={`text-xs ${phoneOk ? "text-sage-700" : "text-brick-700"}`}>
              {phoneOk ? `Will open WhatsApp for ${pretty(phoneOk)}` : "That doesn't look like a valid number yet"}
            </p>
          )}
          <input className={field} placeholder="About, e.g. the revised quotation" value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
          <label className="flex items-center gap-2 text-sm text-espresso-800">
            Follow up on
            <input type="date" className={`${field} w-auto`} value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
          </label>
          <button
            onClick={add}
            disabled={!canAdd}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-espresso-950 px-4 py-2.5 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" /> Add follow-up
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-espresso-900">Your message</p>
            <div className="flex gap-1">
              {(["english", "hinglish"] as const).map((k) => (
                <button key={k} onClick={() => setState((s) => ({ ...s, template: TEMPLATES[k] }))} className="rounded-full border border-espresso-900/15 px-2.5 py-0.5 text-xs font-semibold text-espresso-700 hover:bg-latte/50">
                  {k === "english" ? "English" : "Hinglish"}
                </button>
              ))}
            </div>
          </div>
          <textarea className={`${field} h-24 resize-none`} value={template} onChange={(e) => setState((s) => ({ ...s, template: e.target.value }))} />
          <p className="text-xs text-espresso-700/60">{"{name}"} becomes their first name, {"{about}"} the topic, {"{date}"} the follow-up date.</p>
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
          <span className={`rounded-full px-3 py-1 ${BADGE.overdue}`}>{counts.overdue} overdue</span>
          <span className={`rounded-full px-3 py-1 ${BADGE.today}`}>{counts.today} due today</span>
          <span className="rounded-full bg-latte/70 px-3 py-1 text-espresso-700">{leads.length} in total</span>
        </div>
        {sorted.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-espresso-900/10 p-6 text-center text-sm text-espresso-700/70">
            No follow-ups yet. To try it, add one with <strong>your own number</strong>: WhatsApp will open a chat with
            yourself, with the message ready.
          </div>
        ) : (
          <ul className="space-y-2">
            {sorted.map((l) => {
              const st = statusOf(l, today);
              const msg = fillTemplate(template, l);
              const link = whatsappLink(l.phone, msg);
              return (
                <li key={l.id} className={`rounded-xl border border-espresso-900/10 bg-white p-3 ${l.done ? "opacity-55" : ""}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-espresso-950">{l.name}</p>
                      <p className="text-xs text-espresso-700/70">{l.about} · {shortDate(l.due)}{l.lastSent ? ` · messaged ${shortDate(l.lastSent)}` : ""}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${BADGE[st]}`}>{LABEL[st]}</span>
                  </div>
                  <p className="mt-2 rounded-lg bg-[#E7F8E2] px-3 py-2 text-sm text-espresso-900">{msg}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {link && !l.done && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setLeads((all) => all.map((x) => (x.id === l.id ? { ...x, lastSent: today } : x)))}
                        className="flex items-center gap-1.5 rounded-lg bg-[#1F8A4C] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#18703D]"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> Send on WhatsApp
                      </a>
                    )}
                    <button onClick={() => setLeads((all) => all.map((x) => (x.id === l.id ? { ...x, done: !x.done } : x)))} className="flex items-center gap-1 rounded-lg border border-espresso-900/15 px-3 py-1.5 text-xs font-semibold text-espresso-700 hover:bg-latte/50">
                      {l.done ? <><Undo2 className="h-3.5 w-3.5" /> Not done</> : <><Check className="h-3.5 w-3.5" /> Done</>}
                    </button>
                    <button onClick={() => setLeads((all) => all.filter((x) => x.id !== l.id))} aria-label={`Delete ${l.name}`} className="rounded-lg border border-espresso-900/15 px-2 py-1.5 text-espresso-700/70 hover:bg-latte/50">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <p className="mt-3 text-[11px] leading-snug text-espresso-700/60">
          Everything stays in this browser on this device; nothing is sent to us. WhatsApp only sends a message when
          you press send inside WhatsApp.
        </p>
      </div>
    </div>
  );
}
