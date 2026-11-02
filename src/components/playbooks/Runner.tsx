import { useState } from "react";
import { Play, Upload, RotateCcw, FileText } from "lucide-react";
import type { BuildFile, RunResult, Tone } from "../../lib/playbooks/types";

const TONE_TEXT: Record<Tone, string> = { good: "text-sage-700", warn: "text-caramel-700", bad: "text-brick-700" };
const TONE_ROW: Record<Tone, string> = { good: "bg-sage-50", warn: "bg-caramel-100/50", bad: "bg-brick-50" };

// Runs a playbook build's reference implementation on its sample files, or on files the visitor
// pastes or uploads. Everything happens in the browser.
export function Runner({ files, run, label = "Run it", autoRun = false }: { files: BuildFile[]; run: (inputs: string[]) => RunResult; label?: string; autoRun?: boolean }) {
  const [texts, setTexts] = useState(files.map((f) => f.content));
  const [active, setActive] = useState(0);
  const [result, setResult] = useState<RunResult | null>(() => (autoRun ? safeRun(run, files.map((f) => f.content)) : null));
  const [error, setError] = useState("");

  function go() {
    try {
      setResult(run(texts));
      setError("");
    } catch {
      setResult(null);
      setError("Couldn't read that file. Check it has the same columns as the sample.");
    }
  }

  return (
    <div className="not-prose my-6 rounded-2xl border border-espresso-900/10 bg-cream p-4 shadow-soft sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        {files.map((f, i) => (
          <button
            key={f.name}
            onClick={() => setActive(i)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition ${active === i ? "bg-espresso-950 text-caramel-100" : "border border-espresso-900/15 text-espresso-700 hover:bg-latte/50"}`}
          >
            <FileText className="h-3.5 w-3.5" /> {f.name}
          </button>
        ))}
        <label className="ml-auto flex cursor-pointer items-center gap-1 text-xs font-semibold text-caramel-700 hover:underline">
          <Upload className="h-3.5 w-3.5" /> Use my file
          <input
            type="file"
            accept=".csv,.txt,text/csv,text/plain"
            className="hidden"
            onChange={(e) => e.target.files?.[0]?.text().then((t) => setTexts((all) => all.map((x, i) => (i === active ? t : x))))}
          />
        </label>
        <button onClick={() => setTexts(files.map((f) => f.content))} className="flex items-center gap-1 text-xs font-semibold text-espresso-700/70 hover:underline">
          <RotateCcw className="h-3.5 w-3.5" /> Sample
        </button>
      </div>
      <textarea
        className="mt-2 h-32 w-full resize-y rounded-lg border border-espresso-900/15 bg-white p-3 font-mono text-[11.5px] leading-snug text-espresso-950 focus:border-caramel-500 focus:outline-none"
        value={texts[active]}
        onChange={(e) => setTexts((all) => all.map((x, i) => (i === active ? e.target.value : x)))}
        spellCheck={false}
        aria-label={files[active].name}
      />
      <button onClick={go} className="mt-2 flex items-center gap-1.5 rounded-xl bg-espresso-950 px-5 py-2.5 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800">
        <Play className="h-4 w-4" /> {label}
      </button>
      {error && <p className="mt-3 rounded-lg bg-brick-50 p-3 text-sm text-brick-700">{error}</p>}
      {result && (
        <div className="mt-4" data-testid="run-result">
          <div className="flex flex-wrap gap-2">
            {result.stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white px-3.5 py-2 shadow-soft">
                <p className="text-[11px] font-semibold text-espresso-700/60">{s.label}</p>
                <p className={`font-display text-lg font-bold ${s.tone ? TONE_TEXT[s.tone] : "text-espresso-950"}`}>{s.value}</p>
              </div>
            ))}
          </div>
          {result.rows.length > 0 && (
            <div className="mt-3 overflow-x-auto rounded-xl border border-espresso-900/10 bg-white">
              <table className="w-full min-w-[560px] text-left text-[12.5px] tabular-nums">
                <thead className="bg-latte/60 text-espresso-700/80">
                  <tr>{result.columns.map((c) => <th key={c} className="px-2.5 py-1.5 font-semibold">{c}</th>)}</tr>
                </thead>
                <tbody>
                  {result.rows.map((r, i) => {
                    const tone = result.rowTones?.[i];
                    return (
                      <tr key={i} className={`border-t border-espresso-900/5 ${tone ? TONE_ROW[tone] : ""}`}>
                        {r.map((c, j) => <td key={j} className="px-2.5 py-1.5 align-top">{c}</td>)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {result.notes?.map((n) => <p key={n} className="mt-2 text-sm text-espresso-800">{n}</p>)}
        </div>
      )}
    </div>
  );
}

function safeRun(run: (inputs: string[]) => RunResult, inputs: string[]) {
  try {
    return run(inputs);
  } catch {
    return null;
  }
}
