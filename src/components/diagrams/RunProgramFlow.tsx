import { Fragment } from "react";
import { FileCode, Terminal, MonitorCheck, ArrowRight } from "lucide-react";

const STEPS = [
  { icon: FileCode, title: "You write hello.py", sub: "Two lines of instructions, saved to a file." },
  { icon: Terminal, title: "You type: python hello.py", sub: "You tell the terminal which file to run." },
  { icon: MonitorCheck, title: "Python reads top to bottom", sub: "And shows you the result." },
];

export function RunProgramFlow() {
  return (
    <figure className="not-prose my-6">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {STEPS.map((s, i) => (
          <Fragment key={s.title}>
            <div className="flex-1 rounded-2xl border border-espresso-900/10 bg-cream p-4 text-center">
              <s.icon className="mx-auto h-6 w-6 text-espresso-700" strokeWidth={1.6} />
              <p className="mt-2 font-display text-sm font-semibold text-espresso-950">{s.title}</p>
              <p className="mt-1 text-[12px] text-espresso-700/75">{s.sub}</p>
            </div>
            {i < STEPS.length - 1 && (
              <ArrowRight className="mx-auto h-5 w-5 shrink-0 rotate-90 text-caramel-500 sm:rotate-0" />
            )}
          </Fragment>
        ))}
      </div>
    </figure>
  );
}
