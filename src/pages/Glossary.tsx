import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Quote } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { PAGE_META } from "../lib/pageMeta";
import { CHAPTER_WORDS, MORE_WORDS } from "../lib/glossary";
import { CHAPTERS } from "../lib/courseData";

const ALL = [
  ...Object.entries(CHAPTER_WORDS).flatMap(([ch, ws]) => ws.map((w) => ({ ...w, chapter: Number(ch) }))),
  ...MORE_WORDS,
].sort((a, b) => a.word.localeCompare(b.word, "en", { sensitivity: "base" }));

export default function Glossary() {
  useDocumentMeta(PAGE_META["/glossary"].title, PAGE_META["/glossary"].description);
  const [q, setQ] = useState("");
  const words = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? ALL.filter((w) => `${w.word} ${w.meaning}`.toLowerCase().includes(t)) : ALL;
  }, [q]);
  const letters = [...new Set(words.map((w) => w.word[0].toUpperCase()))];

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <p className="text-sm font-semibold tracking-wide text-caramel-700 uppercase">Plain English</p>
        <h1 className="mt-1 font-display text-4xl font-semibold text-espresso-950 sm:text-5xl">Glossary</h1>
        <p className="mt-3 max-w-2xl text-lg text-espresso-700/80">
          Every tech word the course uses, in plain English, with a sentence you could say in a meeting. {ALL.length} words,
          each linked to the chapter where you meet it.
        </p>
        <label className="relative mt-6 block max-w-md">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-espresso-700/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a word"
            className="w-full rounded-xl border border-espresso-900/15 bg-white py-3 pr-4 pl-10 text-[15px] text-espresso-950 focus:border-caramel-500 focus:outline-none" />
        </label>
        <nav className="mt-4 flex flex-wrap gap-1.5">
          {letters.map((l) => <a key={l} href={`#letter-${l}`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-latte/60 text-sm font-semibold text-espresso-800 hover:bg-latte">{l}</a>)}
        </nav>
        {letters.map((l) => (
          <section key={l} id={`letter-${l}`} className="mt-8 scroll-mt-20">
            <h2 className="font-display text-2xl font-semibold text-caramel-700">{l}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {words.filter((w) => w.word[0].toUpperCase() === l).map((w) => {
                const ch = CHAPTERS.find((c) => c.id === w.chapter);
                return (
                  <div key={w.word} id={w.word.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="scroll-mt-20 rounded-2xl border border-espresso-900/10 bg-cream p-4" data-testid="word">
                    <span className="inline-block rounded-full bg-espresso-950 px-3 py-1 font-display text-sm font-semibold text-caramel-100">{w.word}</span>
                    <p className="mt-2.5 text-[14.5px] leading-snug text-espresso-900/85">{w.meaning}</p>
                    <p className="mt-2.5 flex items-start gap-1.5 border-t border-espresso-900/10 pt-2.5 text-[13.5px] text-espresso-700/80 italic">
                      <Quote className="mt-0.5 h-3 w-3 shrink-0 text-caramel-600" /> {w.sample}
                    </p>
                    {ch && <Link to={ch.path} className="mt-2 inline-block text-xs font-semibold text-caramel-700 hover:underline">Chapter {ch.id}: {ch.title}</Link>}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        {words.length === 0 && <p className="mt-8 text-espresso-800">No word matches that yet.</p>}
      </main>
      <SiteFooter />
    </div>
  );
}
