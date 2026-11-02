import { Link } from "react-router-dom";
import { ArrowRight, Briefcase } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { PAGE_META } from "../lib/pageMeta";
import { PLAYBOOKS, BUILD_COUNT } from "../lib/playbooks";

export default function Playbooks() {
  useDocumentMeta(PAGE_META["/playbooks"].title, PAGE_META["/playbooks"].description);
  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <p className="text-sm font-semibold tracking-wide text-caramel-700 uppercase">After the core course</p>
        <h1 className="mt-1 font-display text-4xl font-semibold text-espresso-950">Role Playbooks</h1>
        <p className="mt-2 max-w-2xl text-espresso-700/80">
          {PLAYBOOKS.length} playbooks, {BUILD_COUNT()} builds, each one a real tool for a real part of your job. Every build
          has sample files, a brief to paste, a known answer to check against, and one place where AI tends to go
          wrong, so you learn to catch it. Included with Chapters 4 to 11, no extra payment.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {PLAYBOOKS.map((p) => (
            <Link key={p.slug} to={`/playbooks/${p.slug}`} className="group flex flex-col rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft transition hover:border-caramel-400/60">
              <Briefcase className="h-5 w-5 text-caramel-600" />
              <p className="mt-3 font-display text-xl font-semibold text-espresso-950 group-hover:text-caramel-700">{p.title}</p>
              <p className="mt-1 text-sm text-espresso-700/75">{p.tagline}</p>
              <ul className="mt-3 flex-1 space-y-1 text-sm text-espresso-900">
                {p.builds.map((b) => <li key={b.id}>· {b.title} <span className="text-espresso-700/50">({b.minutes})</span></li>)}
              </ul>
              <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-caramel-700">For: {p.forWho} <ArrowRight className="h-3 w-3" /></p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
