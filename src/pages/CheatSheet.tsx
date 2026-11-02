import { Printer } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { PAGE_META } from "../lib/pageMeta";
import { STEPS, TRAPS } from "../lib/method";
import { FIX_LOOP } from "../lib/fixit";

// One printable A4 page: the habits from the whole course. Everything comes from src/lib/method.ts
// and src/lib/fixit.ts, so it stays in step with /method and /fix-it.
const BRIEF = [
  ["Who it's for", "your role, and the task as you do it today"],
  ["What it does", "what goes in, every rule, what comes out"],
  ["What good looks like", "the right answer for a small sample"],
  ["What to avoid", "e.g. never change an amount; never guess a value"],
];

function Box({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-espresso-900/15 bg-cream p-3 print:break-inside-avoid print:bg-white ${className}`}>
      <h2 className="font-display text-[15px] font-semibold text-espresso-950">{title}</h2>
      <div className="mt-1.5 text-[12px] leading-snug text-espresso-900">{children}</div>
    </section>
  );
}

export default function CheatSheet() {
  useDocumentMeta(PAGE_META["/cheat-sheet"].title, PAGE_META["/cheat-sheet"].description);
  return (
    <div className="min-h-screen bg-paper bg-grain print:bg-white">
      <style>{"@page { size: A4; margin: 12mm; }"}</style>
      <div className="print:hidden"><SiteHeader /></div>
      <main className="mx-auto max-w-4xl px-5 py-8 print:max-w-none print:p-0">
        <div className="flex flex-wrap items-end justify-between gap-3 print:hidden">
          <div>
            <p className="text-sm font-semibold tracking-wide text-caramel-700 uppercase">Print it, pin it</p>
            <h1 className="mt-1 font-display text-4xl font-semibold text-espresso-950">Cheat sheet</h1>
            <p className="mt-2 max-w-xl text-espresso-700/80">The whole course's habits on one A4 page: how to brief AI, how to fix things, and how to check a tool before you trust it.</p>
          </div>
          <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-xl bg-espresso-950 px-5 py-2.5 text-sm font-semibold text-caramel-100 hover:bg-espresso-800">
            <Printer className="h-4 w-4" /> Print or save as PDF
          </button>
        </div>

        <article id="sheet" className="mt-6 rounded-2xl bg-white p-5 shadow-soft print:mt-0 print:rounded-none print:p-0 print:shadow-none">
          <header className="flex items-baseline justify-between border-b border-espresso-900/15 pb-2">
            <p className="font-display text-xl font-semibold text-espresso-950">Building tools with AI: the cheat sheet</p>
            <p className="text-[11px] text-espresso-700">allthecoffee.in</p>
          </header>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            <Box title="Brief it like a new intern">
              <ol className="list-decimal space-y-0.5 pl-4">{BRIEF.map(([a, b]) => <li key={a}><b>{a}:</b> {b}</li>)}</ol>
              <p className="mt-1 italic">Every rule you leave out, the AI guesses. Write the obvious ones too.</p>
            </Box>
            <Box title="When it's wrong: the fix loop">
              <pre className="font-sans whitespace-pre-wrap">{FIX_LOOP}</pre>
              <p className="mt-1"><b>Three tries:</b> fix loop twice, then describe it differently. Still stuck? Go back to the last version that worked.</p>
            </Box>
            <Box title="The Builder's Method" className="sm:col-span-2 print:col-span-2">
              <ol className="grid gap-x-4 gap-y-0.5 sm:grid-cols-2 print:grid-cols-2">
                {STEPS.map((s) => <li key={s.id}><b>{s.n}. {s.name}:</b> {s.question}</li>)}
              </ol>
            </Box>
            <Box title="The 11 traps, and how to test for each" className="sm:col-span-2 print:col-span-2">
              <ol className="grid gap-x-4 gap-y-1 sm:grid-cols-2 print:grid-cols-2">
                {TRAPS.map((t) => <li key={t.id}><b>{t.n}. {t.name}.</b> {t.test}</li>)}
              </ol>
            </Box>
            <Box title="Before you paste">
              No passwords or keys, ever. Real people's details only in your company's approved tool, on your work
              login. Unsure? Replace names with "Customer A", or describe instead of pasting.
            </Box>
            <Box title="Before you trust it">
              Check its answer against one you worked out by hand. Keep doing it the old way, at least partly, for
              the first few real uses. Save the last working version before every change.
            </Box>
          </div>
        </article>
      </main>
      <div className="print:hidden"><SiteFooter /></div>
    </div>
  );
}
