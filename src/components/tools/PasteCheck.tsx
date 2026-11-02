import { useMemo, useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldX, Shield } from "lucide-react";
import { checkPaste, CONTENT_FLAGS, EMPTY_PASTE, type Account, type ContentFlag, type PasteInput, type Policy } from "../../lib/tools/paste";

const TONE = {
  go: { cls: "bg-sage-50 text-sage-700 border-sage-300", Icon: ShieldCheck },
  care: { cls: "bg-caramel-100/60 text-caramel-800 border-caramel-300", Icon: Shield },
  strip: { cls: "bg-caramel-100/60 text-caramel-800 border-caramel-400", Icon: ShieldAlert },
  stop: { cls: "bg-brick-50 text-brick-700 border-brick-300", Icon: ShieldX },
} as const;

function Choice<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-espresso-900">{label}</legend>
      <div className="mt-1.5 grid gap-1.5">
        {options.map(([v, text]) => (
          <label key={v} className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-sm ${value === v ? "border-caramel-500 bg-white" : "border-espresso-900/10 bg-white/60"}`}>
            <input type="radio" checked={value === v} onChange={() => onChange(v)} className="mt-0.5 h-4 w-4 accent-caramel-600" /> {text}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// No answers are stored: the questions are about what someone is about to paste, which may be sensitive.
export function PasteCheck() {
  const [p, setP] = useState<PasteInput>(EMPTY_PASTE);
  const r = useMemo(() => checkPaste(p), [p]);
  const toggle = (f: ContentFlag) => setP((x) => ({ ...x, content: x.content.includes(f) ? x.content.filter((y) => y !== f) : [...x.content, f] }));
  const { cls, Icon } = TONE[r.level];

  return (
    <div className="not-prose grid gap-5 rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft lg:grid-cols-2">
      <div className="space-y-4">
        <fieldset>
          <legend className="text-sm font-semibold text-espresso-900">What's in it? Tick everything that applies</legend>
          <div className="mt-1.5 grid gap-1.5">
            {(Object.keys(CONTENT_FLAGS) as ContentFlag[]).map((f) => (
              <label key={f} className="flex items-start gap-2 text-sm text-espresso-800">
                <input type="checkbox" checked={p.content.includes(f)} onChange={() => toggle(f)} className="mt-0.5 h-4 w-4 accent-caramel-600" data-testid={`flag-${f}`} /> {CONTENT_FLAGS[f]}
              </label>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-espresso-700/60">None of these? Leave them all empty: your own drafts, public information and general questions.</p>
        </fieldset>
        <Choice<Account> label="Which AI account?" value={p.account} onChange={(account) => setP((x) => ({ ...x, account }))}
          options={[["work", "My company's approved AI tool, on my work login"], ["personal", "A personal account (free or paid)"], ["unsure", "I'm not sure"]]} />
        <Choice<Policy> label="Does your company's AI policy allow this tool for this work?" value={p.policy} onChange={(policy) => setP((x) => ({ ...x, policy }))}
          options={[["yes", "Yes"], ["no", "No"], ["unknown", "I don't know"]]} />
        <label className="flex items-start gap-2 text-sm text-espresso-800">
          <input type="checkbox" checked={p.sharing} onChange={(e) => setP((x) => ({ ...x, sharing: e.target.checked }))} className="mt-0.5 h-4 w-4 accent-caramel-600" />
          It will go inside a tool or page I share with others
        </label>
      </div>
      <div className="space-y-3">
        <div className={`rounded-xl border p-4 ${cls}`} data-testid="verdict">
          <p className="flex items-center gap-2 font-display text-xl font-semibold"><Icon className="h-5 w-5" /> {r.headline}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{r.reasons.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="rounded-xl bg-white p-4 text-sm text-espresso-800 shadow-soft">
          <p className="font-semibold text-espresso-950">A safer way</p>
          <ul className="mt-1.5 list-disc space-y-1.5 pl-5" data-testid="safer">{r.saferWay.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <p className="text-[11px] leading-snug text-espresso-700/60">
          General guidance, not legal advice. Your company's policy, and your legal or IT team, have the final word.
          Nothing you tick here is saved or sent anywhere.
        </p>
      </div>
    </div>
  );
}
