import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Flame, Clock, Wallet, Sparkles, ArrowRight, CheckCircle2, XCircle,
  Quote, Bot, Terminal, FolderGit2, Workflow, Globe2, HeartHandshake,
  ChevronDown, Lock,
} from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { CHAPTERS, MODULES } from "../lib/courseData";
import { useAuth } from "../lib/auth";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { PAGE_META } from "../lib/pageMeta";

const STATS = [
  { value: "20 min", label: "to your first working tool", icon: Clock },
  { value: "4", label: "real tools built by Chapter 6", icon: Sparkles },
  { value: "30+", label: "tech words you'll finally understand", icon: Flame },
  { value: "₹599", label: "founding price, less than a dinner out", icon: Wallet },
];

const SUCCESS_QUOTES = [
  "I built something that saves me two hours a week.",
  "I understood what the developers were saying in the sprint review.",
  "I'm not scared of this anymore.",
  "I showed my manager and they asked me to build one for the team.",
];

const FEAR_LADDER = [
  { ch: 0, fear: "“Everyone else already knows this.”", reality: "Turns out almost nobody does; they're just not saying it." },
  { ch: 1, fear: "“This is where it gets technical.”", reality: "You build a real working tool in 20 minutes, no code typed." },
  { ch: 2, fear: "“Reading code. I'll get lost.”", reality: "You find your own edits in real code, like a word search." },
  { ch: 3, fear: "“What if I break something?”", reality: "You break it on purpose, twice, and fix it calmly both times." },
];

const TOOL_TIERS = [
  {
    when: "Right away: Module A, live now",
    icon: Bot,
    tools: ["An AI chat tool (Claude, ChatGPT or Gemini)"],
    desc: "Describe a tool in plain English, get a working version back, and know what to do when it breaks.",
    live: true,
  },
  {
    when: "Module C, live now",
    icon: Terminal,
    tools: ["VS Code", "Python", "an AI coding assistant (optional)"],
    desc: "A real code editor stops being scary, and you can automate a genuinely boring spreadsheet task on your own computer.",
    live: true,
  },
  {
    when: "If you continue, Tier 2: Builder",
    icon: FolderGit2,
    tools: ["Git & GitHub Desktop", "A real database", "Hosting (Netlify, Render)"],
    desc: "Save points for your projects, somewhere for data to live, and a link a colleague can actually open.",
    live: false,
  },
  {
    when: "Also by Tier 2",
    icon: Workflow,
    tools: ["No-code tools (Zapier, Make, Power Automate)"],
    desc: "And just as important: knowing when one of these is the smarter choice instead of custom code.",
    live: false,
  },
];

export default function Overview() {
  useDocumentMeta(PAGE_META["/overview"].title, PAGE_META["/overview"].description);
  const { user } = useAuth();
  // /chapter/0 is a protected route: a logged-out visitor clicking it gets
  // bounced to /login instead of /signup. Route logged-out visitors straight
  // to signup instead.
  const startCtaPath = user ? "/chapter/0" : "/signup";

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />

      {/* Hype hero */}
      <section className="mx-auto max-w-4xl px-5 pt-16 pb-10 text-center sm:pt-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-espresso-950 px-3.5 py-1.5 text-xs font-semibold text-caramel-200">
            <Flame className="h-3.5 w-3.5 text-caramel-400" /> Read this before you start
          </span>
          <h1 className="mt-5 font-display text-4xl leading-[1.08] font-semibold text-espresso-950 sm:text-5xl">
            This is the course that turns
            <br className="hidden sm:block" /> "I'm not technical" into <span className="text-caramel-600">"I built that."</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-espresso-800/85">
            No fluff, no filler, no pretending you already know what an API is. Just you, a browser, and about twenty
            minutes to a win that's actually yours.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={startCtaPath}
              className="flex items-center gap-2 rounded-xl bg-espresso-950 px-6 py-3.5 font-semibold text-caramel-100 shadow-lift transition hover:bg-espresso-800"
            >
              Start Chapter 0 (free) <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#details" className="flex items-center gap-1.5 text-sm font-semibold text-espresso-700 hover:text-espresso-900">
              Keep reading <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="rounded-2xl border border-espresso-900/10 bg-cream p-4 shadow-soft"
            >
              <s.icon className="mx-auto h-5 w-5 text-caramel-600" />
              <p className="mt-2 font-display text-2xl font-bold text-espresso-950">{s.value}</p>
              <p className="mt-0.5 text-[11.5px] leading-snug text-espresso-700/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div id="details" className="mx-auto max-w-6xl px-5">
        {/* What you'll walk away with */}
        <section className="py-14">
          <h2 className="font-display text-3xl font-semibold text-espresso-950">What this will actually teach you</h2>
          <p className="mt-2 max-w-2xl text-espresso-700/75">
            Two tiers. The first breaks the fear and makes you a builder of your own tools; that's the part you can
            judge the whole course by. The second, built only once the first proves itself, goes into how real
            software is put together.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-caramel-300/50 bg-cream p-6">
              <div className="flex items-center justify-between">
                <p className="font-display text-xl font-semibold text-espresso-950">Tier 1: Core</p>
                <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-bold text-sage-700">12 chapters · ~8–10 hrs</span>
              </div>
              <p className="mt-2 text-sm text-espresso-700/75">
                By the end, you'll have built real tools for your actual job, tested against numbers you already
                know are right, not a generic tutorial exercise.
              </p>
              <div className="mt-4 space-y-3">
                {(["A", "B", "C"] as const).map((key) => (
                  <div key={key} className="rounded-xl border border-espresso-900/10 bg-white p-3.5">
                    <p className="text-sm font-semibold text-espresso-900">
                      {MODULES[key].name}: {MODULES[key].tagline}
                    </p>
                    <p className="mt-0.5 text-xs text-espresso-700/65">
                      {CHAPTERS.filter((c) => c.module === key).map((c) => c.title).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-espresso-900/10 bg-cream/60 p-6">
              <div className="flex items-center justify-between">
                <p className="font-display text-xl font-semibold text-espresso-950">Tier 2: Builder</p>
                <span className="flex items-center gap-1 rounded-full bg-espresso-900/5 px-3 py-1 text-xs font-bold text-espresso-600">
                  <Lock className="h-3 w-3" /> 10 chapters · ~20–25 hrs
                </span>
              </div>
              <p className="mt-2 text-sm text-espresso-700/75">
                One growing project (a Team Request Tracker) that teaches how real apps are assembled: front end,
                back end, a database, logins, integrations, and deploying it so a colleague can actually use it.
              </p>
              <p className="mt-4 rounded-xl border border-dashed border-espresso-900/15 bg-white/60 p-3.5 text-xs text-espresso-700/70">
                Unlocks once Tier 1 shows learners are actually finishing it, not before. That's a promise, not a
                sales tactic.
              </p>
            </div>
          </div>
        </section>

        {/* Why spend time on this */}
        <section className="py-14">
          <h2 className="font-display text-3xl font-semibold text-espresso-950">Why spend your evenings on this</h2>
          <p className="mt-2 max-w-2xl text-espresso-700/75">
            Honestly: in every sprint review or planning meeting, someone on your team is already quietly using AI to
            draft reports, clean data, or summarise notes faster than everyone else, and it's rarely the most senior
            person in the room. That gap compounds fast once it starts. This course exists so you're the one building
            the shortcut, not the one asking a colleague to explain it afterward.
          </p>
          <p className="mt-4 text-xs font-semibold tracking-wide text-espresso-700/60 uppercase">
            What finishing Module A should feel like
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {SUCCESS_QUOTES.map((q) => (
              <div key={q} className="flex items-start gap-3 rounded-2xl border border-espresso-900/10 bg-cream p-5">
                <Quote className="mt-0.5 h-5 w-5 shrink-0 text-caramel-600" />
                <p className="font-display text-base text-espresso-900">{q}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-espresso-700/70">
            Twenty to forty-five minutes a day, most days, for four to six weeks. Less time than the meetings you'll
            soon be calculating the cost of.
          </p>
        </section>

        {/* Tools unlocked */}
        <section className="py-14">
          <h2 className="font-display text-3xl font-semibold text-espresso-950">What you'll actually be able to use after this</h2>
          <p className="mt-2 max-w-2xl text-espresso-700/75">Laid out honestly by when each one unlocks, not all promised at once.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {TOOL_TIERS.map((t) => (
              <div key={t.when} className={`rounded-2xl border p-5 ${t.live ? "border-sage-300 bg-sage-50" : "border-espresso-900/10 bg-cream"}`}>
                <div className="flex items-center gap-2">
                  <t.icon className={`h-5 w-5 ${t.live ? "text-sage-700" : "text-caramel-600"}`} />
                  <span className={`text-xs font-bold tracking-wide uppercase ${t.live ? "text-sage-700" : "text-espresso-600"}`}>
                    {t.when}
                  </span>
                </div>
                <p className="mt-2.5 text-sm font-semibold text-espresso-900">{t.tools.join(" + ")}</p>
                <p className="mt-1.5 text-[13.5px] leading-snug text-espresso-700/75">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fear ladder */}
        <section className="py-14">
          <h2 className="font-display text-3xl font-semibold text-espresso-950">How this actually makes you comfortable</h2>
          <p className="mt-2 max-w-2xl text-espresso-700/75">
            Not with a pep talk, but with four chapters that each defuse one specific fear by making you do the thing
            you were afraid of, safely.
          </p>
          <div className="mt-8 space-y-3">
            {FEAR_LADDER.map((f, i) => (
              <div key={f.ch} className="flex flex-col gap-3 rounded-2xl border border-espresso-900/10 bg-cream p-4 sm:flex-row sm:items-center">
                <div className="flex shrink-0 items-center gap-2 sm:w-32">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-espresso-950 text-xs font-bold text-caramel-100">
                    {f.ch}
                  </span>
                  <span className="text-xs font-semibold text-espresso-700/70">Chapter {f.ch}</span>
                </div>
                <p className="flex-1 text-sm text-brick-600/90 italic">{f.fear}</p>
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-espresso-400 sm:block" />
                <p className="flex-1 text-sm font-medium text-sage-700">{f.reality}</p>
                {i === FEAR_LADDER.length - 1 && null}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-espresso-700/60">
            …and it keeps going in Modules B and C, right through automating a real task and building your own
            capstone tool.
          </p>
        </section>

        {/* Who it's for / not for */}
        <section className="py-14">
          <h2 className="font-display text-3xl font-semibold text-espresso-950">Is this actually for you?</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-sage-200 bg-sage-50 p-7">
              <div className="flex items-center gap-2 text-sage-700">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-xs font-bold tracking-wide uppercase">You're in the right place if</span>
              </div>
              <ul className="mt-4 space-y-2.5 text-[15px] text-espresso-900/85">
                <li>You're in HR, finance, operations, sales, marketing, project management, or you manage a tech team you don't quite follow.</li>
                <li>You've nodded along in a meeting when someone said "API" or "deploy" and hoped nobody asked a follow-up.</li>
                <li>You've started a course before, hit a wall, and quietly closed the tab. You want this one to be different.</li>
                <li>You have 20–45 minutes a day and want to spend it building something real, not just watching videos.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-espresso-900/10 bg-cream p-7">
              <div className="flex items-center gap-2 text-espresso-700">
                <XCircle className="h-5 w-5" />
                <span className="text-xs font-bold tracking-wide uppercase">Look elsewhere if</span>
              </div>
              <ul className="mt-4 space-y-2.5 text-[15px] text-espresso-900/75">
                <li>You want a developer job or are prepping for placements; this teaches confidence, not a job-ready portfolio.</li>
                <li>You're already comfortable reading and writing code.</li>
                <li>You want deep computer-science theory rather than tools you can use Monday morning.</li>
              </ul>
              <p className="mt-5 flex items-start gap-2 text-sm text-espresso-700/60">
                <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0" />
                Saying this out loud up front builds more trust than pretending this course is for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Closing hype */}
        <section className="py-16 text-center">
          <Globe2 className="mx-auto h-8 w-8 text-caramel-600" />
          <h2 className="mt-4 font-display text-3xl font-semibold text-espresso-950 sm:text-4xl">
            Twenty minutes from now, you could have built something real.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-espresso-700/75">
            Chapters 0–3 are completely free. No card, no catch, just open the first one and see for yourself.
          </p>
          <Link
            to={startCtaPath}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-espresso-950 px-7 py-4 font-semibold text-caramel-100 shadow-lift transition hover:bg-espresso-800"
          >
            Start Chapter 0 (free) <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
