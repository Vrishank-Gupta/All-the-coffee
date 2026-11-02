import type { ReactNode } from "react";
import { Compass } from "lucide-react";
import { stepById } from "../../lib/method";

// "Builder's habit": names the step of the Builder's Method a chapter just practised, so the
// method builds up chapter by chapter instead of arriving all at once in Chapter 11.
export function BuilderHabit({ steps, children }: { steps: string[]; children: ReactNode }) {
  const named = steps.map((s) => stepById(s)!).filter(Boolean);
  return (
    <div className="not-prose my-6 rounded-2xl border border-espresso-900/10 bg-latte/40 px-5 py-4">
      <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-caramel-700 uppercase">
        <Compass className="h-4 w-4" /> Builder's habit: {named.map((s) => `step ${s.n}, ${s.name.toLowerCase()}`).join(" + ")}
      </p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-espresso-900/90">
        {children}{" "}
        <a href={`/method#step-${named[0]?.id}`} className="font-semibold text-caramel-700 underline underline-offset-2">The Builder's Method</a>
      </p>
    </div>
  );
}
