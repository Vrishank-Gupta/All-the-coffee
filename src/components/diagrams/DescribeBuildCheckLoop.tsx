import { Fragment } from "react";
import { MessagesSquare, Cpu, CircleCheckBig, ArrowRight } from "lucide-react";

export function DescribeBuildCheckLoop({
  filled,
}: {
  filled?: { prompt: string; code: string; result: string };
}) {
  const steps = [
    { icon: MessagesSquare, title: "You describe it", sub: filled?.prompt ?? "Your prompt" },
    { icon: Cpu, title: "AI writes the code", sub: filled?.code ?? "The code" },
    { icon: CircleCheckBig, title: "You check the result", sub: filled?.result ?? "Does it match?" },
  ];

  return (
    <figure className="not-prose my-6">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {steps.map((s, i) => (
          <Fragment key={s.title}>
            <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-espresso-900/10 bg-cream px-4 py-5 text-center shadow-soft">
              <s.icon className="h-6 w-6 text-caramel-600" strokeWidth={1.6} />
              <p className="font-display text-sm font-semibold text-espresso-950">{s.title}</p>
              <p className="text-xs text-espresso-700/70">{s.sub}</p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="mx-auto h-5 w-5 shrink-0 rotate-90 text-caramel-500/60 sm:rotate-0" />
            )}
          </Fragment>
        ))}
      </div>
      <figcaption className="mt-3 flex items-center justify-center gap-2 text-sm text-espresso-700/70">
        …and back to the start, every time you want to change something.
      </figcaption>
    </figure>
  );
}
