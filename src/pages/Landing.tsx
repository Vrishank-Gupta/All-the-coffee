import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Coffee, ShieldCheck, Target, Briefcase, Globe, MessagesSquare,
  Trophy, Lightbulb, MessageCircleQuestion, Bug, BookOpenText,
  EyeOff, Bot, MousePointerClick, Sparkles, CheckCircle2, Lock,
  Clock, ArrowRight, XCircle, Crown, Flame,
} from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { NotesSummariserDemo } from "../components/demo/NotesSummariserDemo";
import { FoundingSeatsBadge } from "../components/demo/FoundingSeatsBadge";
import { CHAPTERS, MODULES, nextLiveChapter, type ChapterMeta } from "../lib/courseData";
import { useProgress } from "../lib/progress";

const DIFFERENTIATORS = [
  { icon: ShieldCheck, title: "Fear-first design", desc: "Every chapter targets a moment you expect to fail, and shows you that you didn't." },
  { icon: Target, title: "Need-to-know only", desc: "Every concept earns its place by unlocking something you're about to build. The rest, we skip on purpose." },
  { icon: Briefcase, title: "Work-relevant projects", desc: "No to-do apps or calculators as filler. You build things you could show your manager." },
  { icon: Globe, title: "Browser first, installs later", desc: "Your first win happens with zero installation, locked-down work laptops included." },
  { icon: MessagesSquare, title: "Talk to tech people", desc: "Every chapter ends with the words you can now use confidently in a meeting." },
];

const PRINCIPLES = [
  { icon: Trophy, title: "Win before you explain", desc: "You build or see something work first, then learn why." },
  { icon: Lightbulb, title: "One new idea per chapter", desc: "Everything else is “just copy this for now.”" },
  { icon: MessageCircleQuestion, title: "Name the fear out loud", desc: "Each chapter opens with the worry you probably have right now." },
  { icon: Bug, title: "Plan the failure", desc: "A deliberate, safe error you trigger, read, and fix with AI." },
  { icon: BookOpenText, title: "Analogy first, term second", desc: "Everyday language first. The real word, second. Never the reverse." },
  { icon: EyeOff, title: "Say what you're skipping", desc: "Permission to not know is a large part of reducing fear." },
  { icon: Bot, title: "AI is the assistant, not magic", desc: "You're shown where AI gets it wrong, so you trust it the right amount." },
  { icon: MousePointerClick, title: "Show, don't just tell", desc: "Every tool is something you click and try right here, not a screenshot you have to imagine." },
  { icon: ShieldCheck, title: "Their work, their data", desc: "Realistic sample files, never your confidential company data." },
  { icon: Sparkles, title: "End with confidence", desc: "What you built, the words you can now use, and how far ahead you are." },
];

export default function Landing() {
  const { isComplete, isUnlocked, hasPaid, completed } = useProgress();
  const next = nextLiveChapter(completed);
  const continuePath = next ? next.path : "/profile";

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-caramel-100 px-3.5 py-1.5 text-xs font-semibold text-caramel-700">
              <Coffee className="h-3.5 w-3.5" /> 20–45 minutes a day, in your browser
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] font-semibold text-espresso-950 sm:text-6xl">
              From AI-anxious to builder, one coffee break at a time.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-espresso-800/85">
              Build your first useful tool in 20 minutes. No coding background. No jargon you don't need. Nobody
              judging you.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/chapter/0"
                className="flex items-center gap-2 rounded-xl bg-espresso-950 px-6 py-3.5 font-semibold text-caramel-100 shadow-lift transition hover:bg-espresso-800"
              >
                Start Chapter 0 (free) <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#course-map"
                className="rounded-xl border border-espresso-900/15 px-6 py-3.5 font-semibold text-espresso-800 transition hover:bg-latte/50"
              >
                See the course map
              </a>
            </div>
            <p className="mt-4 text-sm text-espresso-700/60">
              Chapters 0–3 are free. No card required. New here?{" "}
              <Link to="/overview" className="font-semibold text-caramel-700 underline underline-offset-2 hover:text-caramel-600">
                Read the full course overview
              </Link>
              .
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-500" />
              </span>
              <p className="text-center text-xs font-semibold tracking-wide text-espresso-700/60 uppercase">
                Real AI, running right now, not a recording
              </p>
            </div>
            <NotesSummariserDemo autoPlay />
            <p className="mt-2.5 text-center text-sm text-espresso-700/65">
              You'll build this exact tool in Chapter 6. Paste your own notes above and watch it work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-display text-3xl font-semibold text-espresso-950">How this is different</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {DIFFERENTIATORS.map((d) => (
            <div key={d.title} className="rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft">
              <d.icon className="h-6 w-6 text-caramel-600" strokeWidth={1.7} />
              <p className="mt-3 font-display text-base font-semibold text-espresso-950">{d.title}</p>
              <p className="mt-1.5 text-[13.5px] leading-snug text-espresso-700/75">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-sage-200 bg-sage-50 p-7">
            <div className="flex items-center gap-2 text-sage-700">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-xs font-bold tracking-wide uppercase">This is for you if</span>
            </div>
            <ul className="mt-4 space-y-2.5 text-[15px] text-espresso-900/85">
              <li>You're in HR, finance, ops, sales, marketing, or you manage a tech team you don't quite understand.</li>
              <li>You feel AI is passing you by, and you're a little embarrassed to admit how little you understand.</li>
              <li>You have 20–45 minutes a day, often on evenings, weekends, or your commute.</li>
              <li>You want to build something that saves you real time at your actual job.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-espresso-900/10 bg-cream p-7">
            <div className="flex items-center gap-2 text-espresso-700">
              <XCircle className="h-5 w-5" />
              <span className="text-xs font-bold tracking-wide uppercase">This isn't for you if</span>
            </div>
            <ul className="mt-4 space-y-2.5 text-[15px] text-espresso-900/75">
              <li>You want a developer job or are prepping for placements; this isn't a bootcamp.</li>
              <li>You're already comfortable reading and writing code.</li>
              <li>You're looking for deep computer-science theory rather than tools you can use Monday morning.</li>
            </ul>
            <p className="mt-5 text-sm text-espresso-700/60">
              Saying this out loud builds trust with the people this course is actually for.
            </p>
          </div>
        </div>
      </section>

      {/* Course map */}
      <section id="course-map" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14">
        <h2 className="font-display text-3xl font-semibold text-espresso-950">The course map</h2>
        <p className="mt-2 max-w-2xl text-espresso-700/75">
          22 chapters across two tiers. Tier 1 breaks the fear and makes you a confident builder of your own tools.
          Tier 2 (built once Tier 1 proves itself) goes into how real apps work underneath.
        </p>

        <div className="mt-8 space-y-5">
          <ModuleBlock moduleKey="A" live chapters={CHAPTERS.filter((c) => c.module === "A")} isComplete={isComplete} isUnlocked={isUnlocked} />
          <ModuleBlock moduleKey="B" live chapters={CHAPTERS.filter((c) => c.module === "B")} isComplete={isComplete} isUnlocked={isUnlocked} />
          <ModuleBlock moduleKey="C" chapters={CHAPTERS.filter((c) => c.module === "C")} isComplete={isComplete} isUnlocked={isUnlocked} />
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-espresso-900/15 bg-cream/60 p-6 text-center">
          <p className="font-display text-lg font-semibold text-espresso-900">Tier 2: Builder</p>
          <p className="mt-1 text-sm text-espresso-700/70">
            10 chapters, one growing project: servers, databases, integrations and deployment. Unlocks once Tier 1
            shows learners are finishing it.
          </p>
        </div>
      </section>

      {/* Pricing / offer */}
      <section className="mx-auto max-w-5xl px-5 py-14">
        <div className="overflow-hidden rounded-3xl border border-caramel-400/40 bg-gradient-to-br from-espresso-950 to-espresso-800 p-8 text-center text-caramel-50 sm:p-12">
          {hasPaid ? (
            <>
              <div className="flex items-center justify-center gap-2 rounded-full bg-sage-500/20 px-4 py-1.5 text-sage-200">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-bold tracking-wide uppercase">You're a founding member</span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold text-caramel-50 sm:text-4xl">
                Module B is already yours. Let's keep going.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-caramel-100/75">
                You locked in the founding price, full access to all eight live chapters. No more payment screens
                between you and the rest of the course.
              </p>
              <Link
                to={continuePath}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-caramel-500 px-7 py-3.5 font-semibold text-espresso-950 shadow-lift transition hover:bg-caramel-400"
              >
                Continue the course <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-caramel-500 px-3.5 py-1.5 text-xs font-bold text-espresso-950 uppercase">
                  <Crown className="h-3.5 w-3.5" /> The Founding Batch
                </span>
                <span className="flex items-center gap-1 rounded-full bg-brick-600/80 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white uppercase">
                  <Flame className="h-3 w-3" /> Limited time
                </span>
                <FoundingSeatsBadge />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold text-caramel-50 sm:text-4xl">
                Module A is free, always. Module B is ₹599, for now.
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="font-display text-2xl font-medium text-caramel-100/50 line-through">₹999</span>
                <span className="font-display text-5xl font-bold text-caramel-50">₹599*</span>
              </div>
              <p className="mt-2 text-sm text-caramel-100/70">*inclusive of GST. One-time payment, no subscription.</p>
              <p className="mt-3 text-sm font-medium text-brick-200">
                Capped at 100 founding seats, ever, and reverts to ₹999 the moment Module C launches.
              </p>
              <p className="mx-auto mt-5 max-w-lg text-sm text-caramel-100/75">
                Start free: Chapters 0–3 are yours with no card and no catch. Pay only when you're ready to unlock
                Module B's four more real tools.
              </p>
              <Link
                to="/chapter/0"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-caramel-500 px-7 py-3.5 font-semibold text-espresso-950 shadow-lift transition hover:bg-caramel-400"
              >
                Start free, no card needed <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-sm text-caramel-100/55">
                Already sure?{" "}
                <Link to="/chapter/4" className="font-semibold text-caramel-200 underline underline-offset-2 hover:text-caramel-100">
                  Skip ahead and go straight to Module B
                </Link>
              </p>
            </>
          )}
        </div>
      </section>

      {/* Teaching principles */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-display text-3xl font-semibold text-espresso-950">Ten rules every chapter follows</h2>
        <p className="mt-2 max-w-2xl text-espresso-700/75">
          "Beginner-friendly" is a slogan until you check it against something. Every chapter is checked against
          these before it ships.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-2xl bg-cream p-4 shadow-soft">
              <p.icon className="h-5 w-5 text-caramel-600" strokeWidth={1.7} />
              <p className="mt-2.5 text-sm font-semibold text-espresso-950">{p.title}</p>
              <p className="mt-1 text-xs leading-snug text-espresso-700/70">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center">
        <h2 className="font-display text-3xl font-semibold text-espresso-950 sm:text-4xl">
          Your first tool is twenty minutes away.
        </h2>
        <Link
          to="/chapter/0"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-espresso-950 px-7 py-4 font-semibold text-caramel-100 shadow-lift transition hover:bg-espresso-800"
        >
          Start Chapter 0 (free) <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <footer className="border-t border-espresso-900/10 px-5 py-8 text-center text-xs text-espresso-700/60">
        All The Coffee: From AI-Anxious to Builder. A proof of concept for Modules A and B.
      </footer>
    </div>
  );
}

function ModuleBlock({
  moduleKey,
  chapters,
  live,
  isComplete,
  isUnlocked,
}: {
  moduleKey: "A" | "B" | "C";
  chapters: ChapterMeta[];
  live?: boolean;
  isComplete: (n: number) => boolean;
  isUnlocked: (n: number) => boolean;
}) {
  const m = MODULES[moduleKey];
  return (
    <div className={`rounded-3xl border p-5 sm:p-6 ${live ? "border-caramel-300/60 bg-cream" : "border-espresso-900/10 bg-cream/50"}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-display text-xl font-semibold text-espresso-950">
            {m.name}: {m.tagline}
          </p>
          <p className="text-sm text-espresso-700/70">{m.desc}</p>
        </div>
        {live ? (
          <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-bold text-sage-700">Live now</span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-espresso-900/5 px-3 py-1 text-xs font-bold text-espresso-600">
            <Lock className="h-3 w-3" /> Coming soon
          </span>
        )}
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {chapters.map((c) => {
          const done = isComplete(c.id);
          const unlocked = c.live && isUnlocked(c.id);
          const content = (
            <div
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                unlocked
                  ? "border-caramel-300/50 bg-white hover:border-caramel-500 hover:shadow-soft"
                  : "border-espresso-900/10 bg-white/50 opacity-60"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  done ? "bg-sage-500 text-white" : unlocked ? "bg-espresso-950 text-caramel-100" : "bg-espresso-900/10 text-espresso-500"
                }`}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : c.id}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-espresso-900">{c.title}</p>
                <p className="flex items-center gap-1 text-xs text-espresso-700/60">
                  <Clock className="h-3 w-3" /> {c.minutes} {!c.live && <span className="ml-1">&middot; not yet written</span>}
                </p>
              </div>
              {!unlocked && <Lock className="h-3.5 w-3.5 shrink-0 text-espresso-400" />}
            </div>
          );
          return unlocked ? (
            <Link key={c.id} to={c.path}>
              {content}
            </Link>
          ) : (
            <div key={c.id}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
