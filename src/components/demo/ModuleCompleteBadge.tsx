import { Award, Lock } from "lucide-react";

export function ModuleCompleteBadge({
  title = "Module A: Breaking the barrier, complete",
  desc = "You've built a tool, changed it, read its code, and fixed two bugs on purpose. None of that was luck: it's a repeatable method now.",
  next = "Module B: Building useful things, unlocking soon",
}: {
  title?: string;
  desc?: string;
  next?: string;
}) {
  return (
    <div className="not-prose my-6 flex flex-col items-center gap-3 rounded-3xl border border-caramel-300/50 bg-gradient-to-br from-caramel-100/60 to-cream px-6 py-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-espresso-950 shadow-lift">
        <Award className="h-8 w-8 text-caramel-300" />
      </div>
      <p className="font-display text-2xl font-semibold text-espresso-950">{title}</p>
      <p className="max-w-md text-[14.5px] text-espresso-700/80">{desc}</p>
      <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-espresso-900/5 px-4 py-2 text-xs font-semibold text-espresso-700">
        <Lock className="h-3.5 w-3.5" /> {next}
      </div>
    </div>
  );
}
