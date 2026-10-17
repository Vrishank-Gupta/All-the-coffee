import { motion } from "framer-motion";
import { NotebookPen, Sparkles, Link2, Wand2 } from "lucide-react";
import { DataCleanerDemo } from "./DataCleanerDemo";

const OTHER_TOOLS = [
  { icon: NotebookPen, title: "A tool that remembers", desc: "Add data today, find it still there tomorrow. Chapter 4." },
  { icon: Sparkles, title: "AI inside your own tool", desc: "Paste messy notes, get a clean action-item table. Chapter 6." },
  { icon: Link2, title: "A real, shareable link", desc: "Publish it, test it like a stranger, send it to someone. Chapter 7." },
];

export function ModuleBSneakPeek() {
  return (
    <div className="not-prose my-10 overflow-hidden rounded-3xl border border-caramel-400/50 bg-gradient-to-b from-espresso-950 via-espresso-950 to-espresso-900 p-6 sm:p-9">
      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="flex items-center justify-center gap-2 text-caramel-300">
          <Wand2 className="h-4 w-4" />
          <span className="text-xs font-bold tracking-wide uppercase">Try this before you decide anything</span>
        </div>
        <h2 className="mt-3 text-center font-display text-3xl font-semibold text-caramel-50 sm:text-4xl">
          You just stopped guessing. Now make it actually useful.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed text-caramel-100/75">
          Everything you've built so far ran once and forgot everything the moment you closed the tab. This is a real
          tool from Chapter 5: a genuinely messy spreadsheet, cleaned and deduplicated in one click, catching a
          bug most people would never even notice. No payment needed to try it right here.
        </p>
      </motion.div>

      <div className="mt-6 rounded-2xl bg-paper p-1">
        <DataCleanerDemo />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {OTHER_TOOLS.map((t) => (
          <div key={t.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <t.icon className="h-5 w-5 text-caramel-300" strokeWidth={1.7} />
            <p className="mt-2 font-display text-sm font-semibold text-caramel-50">{t.title}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-caramel-100/70">{t.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm font-medium text-caramel-100/80">
        You just built this skill for free. Module B is where you point it at your actual job.
      </p>
    </div>
  );
}
