import { useEffect, useMemo, useState } from "react";
import { Copy, Check, AlertTriangle, Lightbulb, MapPin, ListChecks, ShieldAlert } from "lucide-react";
import { buildBrief, EMPTY_BRIEF, DATA_FLAGS, SIZE_FLAGS, lowerFirst, type BriefInput, type DataFlag, type SizeFlag, type Frequency } from "../../lib/tools/brief";

const STORE = "atc-brief-builder-v1";
const EXAMPLE: BriefInput = {
  task: "Combine the weekly sales files from five regions into one summary",
  role: "Sales operations",
  frequency: "weekly",
  minutes: 45,
  inputs: "Five CSV files, one per region, each with the columns date, salesperson, client, amount.",
  rules: "- amounts may be written as 1.2L or 85K: read them as rupees\n- skip any row named Total\n- show the total per region and per salesperson",
  outputs: "One Excel file with a summary sheet, and the totals printed on screen.",
  good: "With my sample files: North ₹1,40,000, South ₹95,000, total ₹4,20,000.",
  avoid: "changing any amount",
  newFiles: true,
  shareLink: false,
  data: ["money", "totals", "manyFiles"],
  size: [],
};

function load(): BriefInput {
  try {
    const raw = localStorage.getItem(STORE);
    if (raw) return { ...EMPTY_BRIEF, ...JSON.parse(raw) };
  } catch {
    // storage blocked: start empty
  }
  return EMPTY_BRIEF;
}

export function BriefBuilder() {
  const [b, setB] = useState<BriefInput>(load);
  const [copied, setCopied] = useState(false);
  const r = useMemo(() => buildBrief(b), [b]);
  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(b));
    } catch {
      // nothing to do
    }
  }, [b]);
  const set = (patch: Partial<BriefInput>) => setB((x) => ({ ...x, ...patch }));
  const toggle = <K extends "data" | "size">(key: K, v: K extends "data" ? DataFlag : SizeFlag) =>
    setB((x) => ({ ...x, [key]: (x[key] as string[]).includes(v) ? (x[key] as string[]).filter((y) => y !== v) : [...(x[key] as string[]), v] }));
  const field = "w-full rounded-lg border border-espresso-900/15 bg-white px-3 py-2 text-sm text-espresso-950 focus:border-caramel-500 focus:outline-none";
  const area = `${field} resize-y leading-snug`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(r.brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard blocked: the brief is on screen to select
    }
  };
  const tone = r.verdict.level === "build" ? "bg-sage-50 text-sage-700" : r.verdict.level === "maybe" ? "bg-caramel-100/60 text-caramel-700" : "bg-latte/70 text-espresso-700";

  return (
    <div className="not-prose grid gap-5 rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft lg:grid-cols-2">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-display text-lg font-semibold text-espresso-950">Your task</p>
          <div className="flex gap-2 text-xs font-semibold">
            <button onClick={() => setB(EXAMPLE)} className="text-caramel-700 hover:underline">Fill an example</button>
            <button onClick={() => setB(EMPTY_BRIEF)} className="text-espresso-700/60 hover:underline">Clear</button>
          </div>
        </div>
        <label className="block text-sm font-semibold text-espresso-900">The task, in one line
          <input className={`${field} mt-1`} placeholder="e.g. Chase customers whose invoices are overdue" value={b.task} onChange={(e) => set({ task: e.target.value })} />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-sm font-semibold text-espresso-900">Your role
            <input className={`${field} mt-1`} placeholder="e.g. Accounts" value={b.role} onChange={(e) => set({ role: e.target.value })} />
          </label>
          <label className="block text-sm font-semibold text-espresso-900">How often
            <select className={`${field} mt-1`} value={b.frequency} onChange={(e) => set({ frequency: e.target.value as Frequency })}>
              <option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="quarterly">Quarterly</option>
            </select>
          </label>
        </div>
        <label className="block text-sm font-semibold text-espresso-900">Minutes it takes by hand, each time
          <input type="number" min={0} className={`${field} mt-1`} value={b.minutes} onChange={(e) => set({ minutes: Number(e.target.value) || 0 })} />
        </label>
        <label className="block text-sm font-semibold text-espresso-900">What goes in (files, columns, text)
          <textarea className={`${area} mt-1 h-16`} value={b.inputs} onChange={(e) => set({ inputs: e.target.value })} />
        </label>
        <label className="block text-sm font-semibold text-espresso-900">The rules, one per line
          <textarea className={`${area} mt-1 h-24`} placeholder="Every rule you'd explain to a new colleague, especially the obvious ones" value={b.rules} onChange={(e) => set({ rules: e.target.value })} />
        </label>
        <label className="block text-sm font-semibold text-espresso-900">What comes out
          <textarea className={`${area} mt-1 h-14`} value={b.outputs} onChange={(e) => set({ outputs: e.target.value })} />
        </label>
        <label className="block text-sm font-semibold text-espresso-900">What good looks like (the right answer for a small sample)
          <textarea className={`${area} mt-1 h-14`} value={b.good} onChange={(e) => set({ good: e.target.value })} />
        </label>
        <label className="block text-sm font-semibold text-espresso-900">What to avoid
          <input className={`${field} mt-1`} value={b.avoid} onChange={(e) => set({ avoid: e.target.value })} />
        </label>
        <fieldset>
          <legend className="text-sm font-semibold text-espresso-900">Your data has...</legend>
          <div className="mt-1 grid gap-1 sm:grid-cols-2">
            {(Object.keys(DATA_FLAGS) as DataFlag[]).map((k) => (
              <label key={k} className="flex items-center gap-2 text-sm text-espresso-800">
                <input type="checkbox" checked={b.data.includes(k)} onChange={() => toggle("data", k)} className="h-4 w-4 accent-caramel-600" /> {DATA_FLAGS[k]}
              </label>
            ))}
            <label className="flex items-center gap-2 text-sm text-espresso-800">
              <input type="checkbox" checked={b.newFiles} onChange={(e) => set({ newFiles: e.target.checked })} className="h-4 w-4 accent-caramel-600" /> It should create files (Excel, Word)
            </label>
            <label className="flex items-center gap-2 text-sm text-espresso-800">
              <input type="checkbox" checked={b.shareLink} onChange={(e) => set({ shareLink: e.target.checked })} className="h-4 w-4 accent-caramel-600" /> Others should use it through a link
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold text-espresso-900">Is it too big for a first version?</legend>
          <div className="mt-1 space-y-1">
            {(Object.keys(SIZE_FLAGS) as SizeFlag[]).map((k) => (
              <label key={k} className="flex items-start gap-2 text-sm text-espresso-800">
                <input type="checkbox" checked={b.size.includes(k)} onChange={() => toggle("size", k)} className="mt-0.5 h-4 w-4 accent-caramel-600" /> {SIZE_FLAGS[k]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="space-y-3">
        <div className={`rounded-xl p-3 text-sm font-semibold ${tone}`} data-testid="verdict"><Lightbulb className="mr-1 inline h-4 w-4" /> {r.verdict.text}</div>
        {r.tooBig.length > 0 && (
          <div className="rounded-xl bg-brick-50 p-3 text-sm text-brick-700">
            <p className="font-semibold"><AlertTriangle className="mr-1 inline h-4 w-4" /> Shrink it to a slice first</p>
            <p className="mt-1">You ticked: {r.tooBig.map(lowerFirst).join("; ")}. Build the part you control: work from an export or a copy-paste instead of a live connection, for just you, with sample data.</p>
          </div>
        )}
        <div className="rounded-xl bg-white p-3 text-sm text-espresso-800 shadow-soft">
          <p className="font-semibold text-espresso-950"><MapPin className="mr-1 inline h-4 w-4 text-caramel-600" /> Where to build it</p>
          <p className="mt-1" data-testid="where">{r.where.text} <span className="text-espresso-700/60">({r.where.chapter})</span></p>
        </div>
        <div className="rounded-xl bg-espresso-950 p-4 text-caramel-50">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-wide text-caramel-300 uppercase">Your brief, ready to paste</p>
            <button onClick={copy} className="flex items-center gap-1 text-xs font-semibold text-caramel-200 hover:text-caramel-50">
              {copied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
            </button>
          </div>
          <pre className="mt-2 font-mono text-[12px] leading-relaxed whitespace-pre-wrap" data-testid="brief">{r.brief}</pre>
        </div>
        <div className="rounded-xl bg-white p-3 text-sm text-espresso-800 shadow-soft">
          <p className="font-semibold text-espresso-950"><ListChecks className="mr-1 inline h-4 w-4 text-caramel-600" /> Know the answer first</p>
          <ol className="mt-1 list-decimal space-y-1 pl-5">{r.answerPlan.map((a) => <li key={a}>{a}</li>)}</ol>
        </div>
        <div className="rounded-xl bg-white p-3 text-sm text-espresso-800 shadow-soft">
          <p className="font-semibold text-espresso-950"><ShieldAlert className="mr-1 inline h-4 w-4 text-brick-600" /> Traps to test for</p>
          <ul className="mt-1 space-y-2" data-testid="traps">
            {r.traps.map(({ trap, test }) => (
              <li key={trap.id}>
                <a href={`/method#trap-${trap.id}`} className="font-semibold text-espresso-950 hover:text-caramel-700">{trap.n}. {trap.name}</a>
                <span className="block text-espresso-700/80">{test}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[11px] leading-snug text-espresso-700/60">Your answers stay in this browser. Don't type confidential details: describe the task, not the data.</p>
      </div>
    </div>
  );
}
