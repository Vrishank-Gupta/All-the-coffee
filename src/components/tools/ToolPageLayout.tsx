import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Hammer } from "lucide-react";
import { SiteHeader } from "../layout/SiteHeader";
import { SiteFooter } from "../layout/SiteFooter";
import { useDocumentMeta } from "../../lib/useDocumentMeta";
import { chapterById } from "../../lib/courseData";
import { playbookBySlug } from "../../lib/playbooks";
import type { ToolInfo } from "../../lib/tools/registry";

// A free tool page: the working tool first, then how it works, then the chapter where you
// build it yourself.
export function ToolPageLayout({ tool, intro, children, howItWorks }: { tool: ToolInfo; intro: ReactNode; children: ReactNode; howItWorks: ReactNode }) {
  useDocumentMeta(tool.title, tool.description);
  const chapter = tool.chapter !== undefined ? chapterById(tool.chapter) : undefined;
  const playbook = tool.playbook ? playbookBySlug(tool.playbook) : undefined;
  const where = chapter ? <>Chapter {chapter.id}: {chapter.title}</> : <>the {playbook?.title}</>;

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <Link to="/tools" className="text-sm font-semibold text-caramel-700 hover:underline">Free tools</Link>
        <h1 className="mt-2 font-display text-3xl font-semibold text-espresso-950 sm:text-4xl">{tool.name}</h1>
        <div className="mt-2 max-w-2xl text-espresso-700/80">{intro}</div>

        <div className="mt-6">{children}</div>

        <section className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-semibold text-espresso-950">How it works</h2>
            <div className="mt-2 space-y-2 text-[15px] leading-relaxed text-espresso-800">{howItWorks}</div>
          </div>
          <div className="rounded-2xl border border-caramel-300/60 bg-caramel-100/40 p-5">
            <p className="flex items-center gap-2 font-display text-lg font-semibold text-espresso-950">
              <Hammer className="h-5 w-5 text-caramel-700" /> Build this yourself
            </p>
            <p className="mt-2 text-sm leading-relaxed text-espresso-800">
              No coding background? That's who this is for. In <strong>{where}</strong>,{" "}
              {tool.learn ?? "you describe this tool to AI in plain English, then test it against a known answer, so you can trust what it tells you"}.
            </p>
            <Link
              to="/chapter/0"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-espresso-950 px-5 py-2.5 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800"
            >
              Start free <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <p className="mt-2 text-xs text-espresso-700/60">Chapters 0 and 1 need no account.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
