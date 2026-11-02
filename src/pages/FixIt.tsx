import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, LifeBuoy } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { CopyBlock } from "../components/chapter/CopyBlock";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { PAGE_META } from "../lib/pageMeta";
import { FIX_GROUPS, FIX_LOOP } from "../lib/fixit";
import { CHAPTERS } from "../lib/courseData";

export default function FixIt() {
  useDocumentMeta(PAGE_META["/fix-it"].title, PAGE_META["/fix-it"].description);
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return FIX_GROUPS;
    return FIX_GROUPS.map((g) => ({
      ...g,
      fixes: g.fixes.filter((f) => { const t = `${f.symptom} ${f.answer}`.toLowerCase(); return words.every((w) => t.includes(w)); }),
    })).filter((g) => g.fixes.length);
  }, [q]);

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <p className="text-sm font-semibold tracking-wide text-caramel-700 uppercase">Stuck? Start here</p>
        <h1 className="mt-1 font-display text-4xl font-semibold text-espresso-950 sm:text-5xl">Fix-it guide</h1>
        <p className="mt-3 text-lg text-espresso-700/80">
          The problems learners hit most, by what you see on screen. Each answer links to the chapter that explains it
          properly. Getting stuck is normal; it's how everyone who builds things works.
        </p>

        <div className="mt-6 rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft">
          <p className="flex items-center gap-2 font-display text-lg font-semibold text-espresso-950"><LifeBuoy className="h-5 w-5 text-caramel-600" /> Not listed? The fix loop works for almost everything</p>
          <p className="mt-1 text-[15px] text-espresso-800">
            Tell the AI what you expected and what happened, with the exact numbers or the exact error message. It's
            taught in <Link to="/chapter/3" className="font-semibold text-caramel-700 underline">Chapter 3</Link>.
          </p>
          <div className="mt-3"><CopyBlock label="The fix loop">{FIX_LOOP}</CopyBlock></div>
        </div>

        <label className="relative mt-8 block">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-espresso-700/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: blank page, python, password, ₹..."
            className="w-full rounded-xl border border-espresso-900/15 bg-white py-3 pr-4 pl-10 text-[15px] text-espresso-950 focus:border-caramel-500 focus:outline-none" />
        </label>
        <nav className="mt-3 flex flex-wrap gap-2 text-sm">
          {FIX_GROUPS.map((g) => <a key={g.id} href={`#${g.id}`} className="rounded-full bg-latte/60 px-3 py-1 font-semibold text-espresso-800 hover:bg-latte">{g.title}</a>)}
        </nav>

        {groups.length === 0 && (
          <p className="mt-8 text-espresso-800" data-testid="no-results">Nothing matches that. Try one word, or use the fix loop above.</p>
        )}
        {groups.map((g) => (
          <section key={g.id} id={g.id} className="mt-10 scroll-mt-20">
            <h2 className="font-display text-2xl font-semibold text-espresso-950">{g.title}</h2>
            <div className="mt-3 space-y-3">
              {g.fixes.map((f) => {
                const ch = CHAPTERS.find((c) => c.id === f.chapter);
                return (
                  <div key={f.id} id={f.id} className="scroll-mt-20 rounded-2xl border border-espresso-900/10 bg-cream p-5" data-testid="fix">
                    <p className="font-semibold text-espresso-950">{f.symptom}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-espresso-800">{f.answer}</p>
                    {f.ask && <div className="mt-3"><CopyBlock label="Paste this into the AI chat">{f.ask}</CopyBlock></div>}
                    {ch && <Link to={ch.path} className="mt-2 inline-block text-xs font-semibold text-caramel-700 hover:underline">Explained in Chapter {ch.id}: {ch.title}</Link>}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        <p className="mt-10 text-sm text-espresso-700/70">
          Words you don't know? See the <Link to="/glossary" className="font-semibold text-caramel-700 underline">glossary</Link>.
          Still stuck after three tries? Write to <a href="mailto:info@allthecoffee.in" className="font-semibold text-caramel-700 underline">info@allthecoffee.in</a> with
          what you expected, what happened, and a screenshot.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
