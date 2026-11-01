import { Link } from "react-router-dom";
import { ArrowRight, Wrench } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { PAGE_META } from "../lib/pageMeta";
import { TOOLS } from "../lib/tools/registry";
import { chapterById } from "../lib/courseData";

export default function Tools() {
  useDocumentMeta(PAGE_META["/tools"].title, PAGE_META["/tools"].description);
  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <h1 className="font-display text-4xl font-semibold text-espresso-950">Free tools</h1>
        <p className="mt-2 max-w-xl text-espresso-700/75">
          Small tools for real office work. Use them free, no sign-up. Each one is also a build in the course: you
          describe it to AI in plain English, then check it against a known answer.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <Link
              key={t.slug}
              to={`/tools/${t.slug}`}
              className="group flex flex-col rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft transition hover:border-caramel-400/60"
            >
              <Wrench className="h-5 w-5 text-caramel-600" />
              <p className="mt-3 font-display text-lg font-semibold text-espresso-950 group-hover:text-caramel-700">{t.name}</p>
              <p className="mt-1.5 flex-1 text-sm leading-snug text-espresso-700/75">{t.description}</p>
              <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-caramel-700">
                For: {t.forWho} · Built in Chapter {t.chapter}, {chapterById(t.chapter)!.title} <ArrowRight className="h-3 w-3" />
              </p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
