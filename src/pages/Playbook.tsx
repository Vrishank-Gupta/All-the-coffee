import { Link, useParams, Navigate } from "react-router-dom";
import { Lock, Briefcase } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { BuildLesson } from "../components/playbooks/BuildLesson";
import { FoundingOfferBox } from "../components/demo/FoundingOfferBox";
import { Callout } from "../components/chapter/Callout";
import { SectionEyebrow } from "../components/chapter/SectionEyebrow";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { useProgress } from "../lib/progress";
import { playbookBySlug } from "../lib/playbooks";
import { toolBySlug } from "../lib/tools/registry";

export default function Playbook() {
  const { slug = "" } = useParams();
  const p = playbookBySlug(slug);
  const { hasPaid } = useProgress();
  useDocumentMeta(p ? `${p.title}: ${p.builds.length} AI tools for ${p.role.toLowerCase()} work` : "Playbook", p?.tagline);
  if (!p) return <Navigate to="/playbooks" replace />;
  const tool = p.toolSlug ? toolBySlug(p.toolSlug) : undefined;

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <Link to="/playbooks" className="text-sm font-semibold text-caramel-700 hover:underline">Role Playbooks</Link>
        <h1 className="mt-2 font-display text-4xl font-semibold text-espresso-950 sm:text-5xl">{p.title}</h1>
        <p className="mt-2 text-lg text-espresso-700/80">{p.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1.5 rounded-full bg-latte/60 px-3 py-1 text-espresso-800"><Briefcase className="h-3.5 w-3.5" /> {p.forWho}</span>
          {!hasPaid && <span className="flex items-center gap-1.5 rounded-full bg-caramel-100 px-3 py-1 text-caramel-700"><Lock className="h-3.5 w-3.5" /> Included with Chapters 4 to 11</span>}
        </div>
        <ol className="not-prose mt-6 space-y-1.5 rounded-2xl border border-espresso-900/10 bg-cream p-5 text-sm">
          {p.builds.map((b, i) => (
            <li key={b.id}>
              <a href={`#${b.id}`} className="font-semibold text-espresso-950 hover:text-caramel-700">{i + 1}. {b.title}</a>
              <span className="text-espresso-700/60"> · {b.minutes}</span>
            </li>
          ))}
        </ol>
        {hasPaid ? (
          <div className="prose-chapter mt-10">
            <Callout variant="tip" title="Before you start">
              These builds use what you learned in the core course: the intern brief (Chapter 3), saving a tool as a
              file (Chapter 4), cleaning data (Chapter 5) and, for Python builds, Chapters 8 and 9. Each one has a known
              answer: check yours against it before you trust it with real work, and keep real company data out of AI
              tools unless your company allows it.
            </Callout>
            {p.builds.map((b, i) => <BuildLesson key={b.id} build={b} n={i + 1} />)}
            <SectionEyebrow n={String(p.builds.length + 1).padStart(2, "0")} label="Your turn: a tool for your own job" />
            <p>
              The three builds above are practice. The real goal is the tool nobody wrote a brief for: one for your own
              work. Some ideas for {p.role.toLowerCase()} work:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-caramel-500">
              {p.yourTurn.map((idea) => <li key={idea}>{idea}</li>)}
            </ul>
            <p className="mt-3">
              Pick one, or your own, and take it through{" "}
              <Link to="/method" className="font-semibold text-caramel-700 underline">the Builder's Method</Link>: is it worth a
              tool, what's the smallest useful version, where should it live, what's the brief, and what's the right answer
              for a small sample. The{" "}
              <Link to="/tools/brief-builder" className="font-semibold text-caramel-700 underline">Brief Builder</Link> walks you
              through it and lists the traps to test for. Then build it the way you just built three.
            </p>
            {tool && (
              <p className="mt-8">
                Want a ready-made version for a colleague? <a href={`/tools/${tool.slug}`} className="font-semibold text-caramel-700 underline">{tool.name}</a> is free
                for anyone at allthecoffee.in.
              </p>
            )}
          </div>
        ) : (
          <div className="prose-chapter mt-10">
            <div className="not-prose rounded-2xl border-2 border-dashed border-caramel-400/50 bg-caramel-100/30 p-6 text-center">
              <Lock className="mx-auto h-6 w-6 text-caramel-700" />
              <p className="mt-2 font-display text-xl font-semibold text-espresso-950">Included with Chapters 4 to 11</p>
              <p className="mt-1 text-sm text-espresso-700/75">Start with Module A for free. The Role Playbooks come with the same one-time payment as the rest of the course.</p>
            </div>
            <FoundingOfferBox />
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
