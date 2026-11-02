import { Link } from "react-router-dom";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { PAGE_META } from "../lib/pageMeta";
import { STEPS, TRAPS, AFTERCARE, TOOL_CARD } from "../lib/method";
import { CopyBlock } from "../components/chapter/CopyBlock";

export default function Method() {
  useDocumentMeta(PAGE_META["/method"].title, PAGE_META["/method"].description);
  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <p className="text-sm font-semibold tracking-wide text-caramel-700 uppercase">The thinking behind every tool</p>
        <h1 className="mt-1 font-display text-4xl font-semibold text-espresso-950 sm:text-5xl">The Builder's Method</h1>
        <p className="mt-3 max-w-2xl text-lg text-espresso-700/80">
          The course teaches particular tools, but this is the part that lasts: eight steps for turning any repetitive
          task into a tool you can trust, and the eleven ways AI-built tools go quietly wrong. Use it on a task we never
          covered.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/tools/brief-builder" className="inline-flex items-center gap-1.5 rounded-xl bg-espresso-950 px-5 py-2.5 text-sm font-semibold text-caramel-100 hover:bg-espresso-800">
            Try it on your own task <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a href="#traps" className="inline-flex items-center gap-1.5 rounded-xl border border-espresso-900/15 px-5 py-2.5 text-sm font-semibold text-espresso-800 hover:bg-latte/50">
            The 11 traps
          </a>
          <Link to="/practice" className="inline-flex items-center gap-1.5 rounded-xl border border-espresso-900/15 px-5 py-2.5 text-sm font-semibold text-espresso-800 hover:bg-latte/50">
            Practise: spot the trap
          </Link>
          <Link to="/cheat-sheet" className="inline-flex items-center gap-1.5 rounded-xl border border-espresso-900/15 px-5 py-2.5 text-sm font-semibold text-espresso-800 hover:bg-latte/50">
            One-page cheat sheet
          </Link>
        </div>

        <ol className="mt-10 space-y-4">
          {STEPS.map((s) => (
            <li key={s.id} id={`step-${s.id}`} className="scroll-mt-20 rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-caramel-600">{s.n}</span>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-espresso-950">{s.name}</h2>
                  <p className="font-semibold text-espresso-800">{s.question}</p>
                </div>
              </div>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-espresso-800 marker:text-caramel-500">
                {s.how.map((h) => <li key={h}>{h}</li>)}
              </ul>
              <p className="mt-3 text-xs font-semibold text-espresso-700/60">
                Practised in:{" "}
                {s.practised.map((p, i) => (
                  <span key={p.href + p.label}>{i > 0 && " · "}<Link to={p.href} className="text-caramel-700 hover:underline">{p.label}</Link></span>
                ))}
              </p>
            </li>
          ))}
        </ol>

        <h2 id="traps" className="mt-14 scroll-mt-20 font-display text-3xl font-semibold text-espresso-950">The 11 traps</h2>
        <p className="mt-2 max-w-2xl text-espresso-700/80">
          Every trap in the course is one of these. None of them shows an error message: the tool just gives a confident,
          wrong answer. Learn the patterns and you'll spot them in tools nobody taught you.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {TRAPS.map((t) => (
            <div key={t.id} id={`trap-${t.id}`} className="scroll-mt-20 rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft">
              <p className="flex items-center gap-2 font-display text-lg font-semibold text-espresso-950">
                <ShieldAlert className="h-4.5 w-4.5 shrink-0 text-brick-600" /> {t.n}. {t.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-espresso-800">{t.what}</p>
              <p className="mt-2 text-sm leading-relaxed text-espresso-800"><strong>Test for it:</strong> {t.test}</p>
              <p className="mt-2 text-xs font-semibold text-espresso-700/60">
                Seen in:{" "}
                {t.seen.map((p, i) => (
                  <span key={p.href + p.label}>{i > 0 && " · "}<Link to={p.href} className="text-caramel-700 hover:underline">{p.label}</Link></span>
                ))}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-espresso-800">
          Try them on real examples: <Link to="/practice" className="font-semibold text-caramel-700 underline">Spot the trap</Link> has
          short drills on all eleven patterns, plus drills set in your own job, free.
        </p>

        <h2 id="after" className="mt-14 scroll-mt-20 font-display text-3xl font-semibold text-espresso-950">After it works: looking after your tool</h2>
        <p className="mt-2 max-w-2xl text-espresso-700/80">
          Once people rely on a tool, it needs a little care. Rules change, files move, and someone else may need to
          run it. Seven habits keep it trustworthy.
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {AFTERCARE.map((a, i) => (
            <li key={a.title} className="rounded-2xl border border-espresso-900/10 bg-cream p-4">
              <p className="font-semibold text-espresso-950"><span className="mr-1.5 font-display text-caramel-600">{i + 1}.</span>{a.title}</p>
              <p className="mt-1 text-[14.5px] leading-relaxed text-espresso-800">{a.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-5"><CopyBlock label="Tool card template" mono>{TOOL_CARD}</CopyBlock></div>

        <div className="mt-12 rounded-2xl border border-caramel-300/60 bg-caramel-100/40 p-6">
          <p className="font-display text-xl font-semibold text-espresso-950">Learn it by doing it</p>
          <p className="mt-1 text-espresso-800">
            Every chapter practises one or two of these steps on a real tool, starting with a meeting cost calculator in
            Chapter 1. Chapters 0 to 3 are free.
          </p>
          <Link to="/chapter/0" className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-espresso-950 px-5 py-2.5 text-sm font-semibold text-caramel-100 hover:bg-espresso-800">
            Start free <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
