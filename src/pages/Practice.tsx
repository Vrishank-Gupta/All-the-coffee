import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Check, X, RotateCcw, ShieldAlert } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { CopyBlock } from "../components/chapter/CopyBlock";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { PAGE_META } from "../lib/pageMeta";
import { DRILLS, ROLE_DRILLS, type Drill } from "../lib/practice";
import { PLAYBOOKS } from "../lib/playbooks";
import { trapById } from "../lib/method";

const STORE = "atc-practice-v1";
const SETS = [
  { id: "traps", label: "The 11 traps", drills: DRILLS },
  ...PLAYBOOKS.map((p) => ({ id: p.slug, label: p.role, drills: ROLE_DRILLS.filter((d) => d.role === p.slug) })),
];

function load(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(STORE) || "{}");
  } catch {
    return {};
  }
}

function DrillCard({ d, n, total, picked, pick }: { d: Drill; n: number; total: number; picked?: number; pick: (i: number) => void }) {
  const done = picked !== undefined;
  const trap = trapById(d.trap);
  return (
    <section id={d.id} className="scroll-mt-20 rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft sm:p-6">
      <p className="text-xs font-bold tracking-wide text-caramel-700 uppercase">Drill {n} of {total}</p>
      <h2 className="mt-1 font-display text-2xl font-semibold text-espresso-950">{d.title}</h2>
      <p className="mt-3 text-[15px] text-espresso-800"><strong>The tool was asked:</strong> {d.brief}</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-espresso-900/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-latte/50 text-espresso-800">
            <tr>{d.input.columns.map((c) => <th key={c} className="px-3 py-2 font-semibold">{c}</th>)}</tr>
          </thead>
          <tbody>
            {d.input.rows.map((r, i) => (
              <tr key={i} className="border-t border-espresso-900/10">{r.map((c, j) => <td key={j} className="px-3 py-2 text-espresso-900">{c || <span className="text-espresso-700/40">(blank)</span>}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 rounded-xl bg-espresso-950 px-4 py-3 font-mono text-[13.5px] text-caramel-50">
        <span className="text-caramel-300">The tool said:</span> {d.output}
      </div>
      <p className="mt-4 font-semibold text-espresso-950">What went wrong?</p>
      <div className="mt-2 grid gap-2">
        {d.options.map((o, i) => {
          const right = i === d.answer, chosen = picked === i;
          const tone = !done ? "border-espresso-900/15 bg-white hover:border-caramel-500"
            : right ? "border-sage-500 bg-sage-50 text-sage-700"
            : chosen ? "border-brick-300 bg-brick-50 text-brick-700" : "border-espresso-900/10 bg-white opacity-60";
          return (
            <button key={o} disabled={done} onClick={() => pick(i)} data-testid={`${d.id}-opt-${i}`}
              className={`flex min-h-11 items-start gap-2 rounded-xl border px-4 py-2.5 text-left text-[15px] transition ${tone}`}>
              {done && right && <Check className="mt-0.5 h-4 w-4 shrink-0" />}
              {done && chosen && !right && <X className="mt-0.5 h-4 w-4 shrink-0" />}
              <span>{o}</span>
            </button>
          );
        })}
      </div>
      {done && (
        <div className="mt-4" data-testid={`${d.id}-why`}>
          <p className="font-semibold text-espresso-950">{picked === d.answer ? "Spotted." : "Not quite."}</p>
          <p className="mt-1 text-[15px] leading-relaxed text-espresso-800">{d.why}</p>
          {trap && (
            <Link to={`/method#trap-${trap.id}`} className="mt-2 inline-flex items-center gap-1 text-xs font-bold tracking-wide text-brick-700 uppercase hover:underline">
              <ShieldAlert className="h-3.5 w-3.5" /> Trap {trap.n}: {trap.name}
            </Link>
          )}
          <div className="mt-3">
            <CopyBlock label="Put this in the brief">{d.brief_fix}</CopyBlock>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Practice() {
  useDocumentMeta(PAGE_META["/practice"].title, PAGE_META["/practice"].description);
  const [picks, setPicks] = useState<Record<string, number>>(load);
  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(picks));
    } catch {
      // storage blocked: the drills still work for this visit
    }
  }, [picks]);
  const [params, setParams] = useSearchParams();
  const set = SETS.find((x) => x.id === params.get("role")) ?? SETS[0];
  const answered = set.drills.filter((d) => picks[d.id] !== undefined);
  const spotted = answered.filter((d) => picks[d.id] === d.answer).length;

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <p className="text-sm font-semibold tracking-wide text-caramel-700 uppercase">Practice · Free</p>
        <h1 className="mt-1 font-display text-4xl font-semibold text-espresso-950 sm:text-5xl">Spot the trap</h1>
        <p className="mt-3 text-lg text-espresso-700/80">
          Tools built with AI, giving confident answers that are wrong. No error messages. Find what went wrong, then
          see the line that would have prevented it. This is the skill that makes AI-built tools trustworthy: not
          coding, checking.
        </p>
        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Drill sets">
          {SETS.map((x) => (
            <button key={x.id} onClick={() => setParams(x.id === "traps" ? {} : { role: x.id })} data-testid={`set-${x.id}`}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${x.id === set.id ? "bg-espresso-950 text-caramel-100" : "bg-latte/60 text-espresso-800 hover:bg-latte"}`}>
              {x.label} <span className="opacity-60">{x.drills.length}</span>
            </button>
          ))}
        </nav>
        <div className="sticky top-20 z-10 mt-6 flex items-center justify-between gap-3 rounded-xl bg-espresso-950 px-4 py-3 text-sm text-caramel-50 shadow-soft">
          <span data-testid="score">{answered.length === 0 ? "Pick an answer in each drill." : `${spotted} of ${answered.length} spotted · ${set.drills.length - answered.length} to go`}</span>
          {answered.length > 0 && (
            <button onClick={() => setPicks((x) => Object.fromEntries(Object.entries(x).filter(([k]) => !set.drills.some((d) => d.id === k))))} className="inline-flex items-center gap-1 text-xs font-semibold text-caramel-200 hover:text-caramel-50">
              <RotateCcw className="h-3.5 w-3.5" /> Start again
            </button>
          )}
        </div>
        <div className="mt-6 space-y-6">
          {set.drills.map((d, i) => (
            <DrillCard key={d.id} d={d} n={i + 1} total={set.drills.length} picked={picks[d.id]} pick={(p) => setPicks((x) => ({ ...x, [d.id]: p }))} />
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-caramel-300/60 bg-caramel-100/40 p-6">
          <p className="font-display text-xl font-semibold text-espresso-950">Every drill is one of 11 trap patterns</p>
          <p className="mt-2 text-espresso-800">
            Learn the patterns once and you'll spot them in tools nobody taught you. Then put them to work on your own task.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/method#traps" className="inline-flex items-center gap-1.5 rounded-xl bg-espresso-950 px-5 py-2.5 text-sm font-semibold text-caramel-100 hover:bg-espresso-800">
              The 11 traps <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/tools/brief-builder" className="inline-flex items-center gap-1.5 rounded-xl border border-espresso-900/15 px-5 py-2.5 text-sm font-semibold text-espresso-800 hover:bg-latte/50">
              Brief Builder
            </Link>
            <Link to="/chapter/0" className="inline-flex items-center gap-1.5 rounded-xl border border-espresso-900/15 px-5 py-2.5 text-sm font-semibold text-espresso-800 hover:bg-latte/50">
              Start the course free
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
