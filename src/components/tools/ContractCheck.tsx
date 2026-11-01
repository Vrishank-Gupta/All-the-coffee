import { useMemo, useState } from "react";
import { AlertTriangle, FileSearch } from "lucide-react";
import { findFlags, SAMPLE_CONTRACT } from "../../lib/tools/contract";

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function ContractCheck() {
  const [text, setText] = useState(SAMPLE_CONTRACT);
  const [view, setView] = useState<"edit" | "highlight">("highlight");
  const flags = useMemo(() => findFlags(text), [text]);
  const flagged = useMemo(() => [...new Set(flags.map((f) => f.sentence))], [flags]);

  // The contract with every flagged sentence marked
  const parts = useMemo(() => {
    if (!flagged.length) return [text];
    const re = new RegExp(`(${flagged.map(escapeRe).join("|")})`, "g");
    return text.split(re);
  }, [text, flagged]);

  return (
    <div className="not-prose grid gap-5 rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft md:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-espresso-900">The contract</p>
          <div className="flex gap-1 text-xs font-semibold">
            <button onClick={() => setView("highlight")} className={`rounded-full px-3 py-1 ${view === "highlight" ? "bg-espresso-950 text-caramel-100" : "border border-espresso-900/15 text-espresso-700"}`}>Highlighted</button>
            <button onClick={() => setView("edit")} className={`rounded-full px-3 py-1 ${view === "edit" ? "bg-espresso-950 text-caramel-100" : "border border-espresso-900/15 text-espresso-700"}`}>Paste yours</button>
          </div>
        </div>
        {view === "edit" ? (
          <>
            <textarea
              className="mt-2 h-[30rem] w-full resize-y rounded-lg border border-espresso-900/15 bg-white p-3 font-serif text-[13px] leading-relaxed text-espresso-950 focus:border-caramel-500 focus:outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the contract text here"
            />
            <div className="mt-1 flex justify-between text-xs">
              <button onClick={() => setText("")} className="font-semibold text-caramel-700 hover:underline">Clear</button>
              <button onClick={() => setText(SAMPLE_CONTRACT)} className="font-semibold text-caramel-700 hover:underline">Use the sample contract</button>
            </div>
          </>
        ) : (
          <div className="mt-2 h-[30rem] overflow-auto rounded-lg border border-espresso-900/10 bg-white p-4 font-serif text-[13px] leading-relaxed whitespace-pre-wrap text-espresso-900" data-testid="highlighted">
            {parts.map((p, i) => (flagged.includes(p) ? <mark key={i} className="rounded bg-brick-50 px-0.5 text-brick-800 ring-1 ring-brick-200">{p}</mark> : <span key={i}>{p}</span>))}
          </div>
        )}
      </div>

      <div>
        <p className="flex items-center gap-2 text-sm font-semibold text-espresso-900">
          <FileSearch className="h-4 w-4 text-caramel-600" />
          <span data-testid="flag-count">{flags.length} {flags.length === 1 ? "thing" : "things"} to check</span>
        </p>
        {flags.length === 0 ? (
          <p className="mt-3 rounded-xl bg-latte/50 p-4 text-sm text-espresso-800">
            None of the common risky clauses were found. That doesn't mean there aren't any: read it properly, and ask
            a lawyer before signing anything important.
          </p>
        ) : (
          <ul className="mt-3 max-h-[31rem] space-y-2 overflow-auto pr-1">
            {flags.map((f, i) => (
              <li key={i} className="rounded-xl border border-espresso-900/10 bg-white p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-brick-600" />
                  <p className="font-semibold text-espresso-950">{f.title}</p>
                  {f.detail && <span className="rounded-full bg-brick-50 px-2 py-0.5 text-[11px] font-bold text-brick-700">{f.detail}</span>}
                  {f.clause && <span className="ml-auto text-[11px] font-semibold text-espresso-700/60">Clause {f.clause}</span>}
                </div>
                <p className="mt-2 border-l-2 border-brick-200 pl-2 font-serif text-[12.5px] leading-snug text-espresso-800 italic">"{f.sentence}"</p>
                <p className="mt-2 text-xs leading-snug text-espresso-700/80">{f.why}</p>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[11px] leading-snug text-espresso-700/60">
          This finds common risky clauses by their usual wording. It can miss a clause written differently, and it isn't
          legal advice. Your text stays in your browser. The sample contract is made up.
        </p>
      </div>
    </div>
  );
}
