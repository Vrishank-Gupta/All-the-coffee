import { Box, Signpost, RefreshCw, NotebookText } from "lucide-react";

const BLOCKS = [
  { icon: Box, title: "Variable", desc: "A labelled box that remembers something" },
  { icon: Signpost, title: "Condition", desc: "A decision: if this, do that, otherwise do something else" },
  { icon: RefreshCw, title: "Loop", desc: "Repeat the same steps for each item in a list" },
  { icon: NotebookText, title: "Function", desc: "A named mini-recipe you can reuse" },
];

export function FourBuildingBlocks() {
  return (
    <figure className="not-prose my-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {BLOCKS.map((b) => (
          <div
            key={b.title}
            className="flex flex-col items-center gap-2 rounded-2xl border border-espresso-900/10 bg-gradient-to-b from-cream to-latte/40 px-3 py-5 text-center shadow-soft"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-espresso-950">
              <b.icon className="h-5 w-5 text-caramel-300" strokeWidth={1.7} />
            </div>
            <p className="text-xs font-semibold text-espresso-900">{b.title}</p>
            <p className="text-[11px] leading-snug text-espresso-700/70">{b.desc}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-sm text-espresso-700/70">
        Almost every program ever written, including this script, is built from just these four.
      </figcaption>
    </figure>
  );
}
