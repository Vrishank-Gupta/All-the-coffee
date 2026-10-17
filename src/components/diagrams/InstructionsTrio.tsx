import { ChefHat, FileText, Code2 } from "lucide-react";

const CARDS = [
  {
    icon: ChefHat,
    title: "A recipe",
    sub: "Instructions for a cook",
    line: "Add 2 cups of rice.",
  },
  {
    icon: FileText,
    title: "A process doc",
    sub: "Instructions for a new joiner",
    line: "Send the report to finance every Friday.",
  },
  {
    icon: Code2,
    title: "Code",
    sub: "Instructions for a computer",
    line: "total = price × quantity",
  },
];

export function InstructionsTrio() {
  return (
    <figure className="not-prose my-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {CARDS.map((c) => (
          <div key={c.title} className="rounded-2xl border border-espresso-900/10 bg-cream p-4 text-center shadow-soft">
            <c.icon className="mx-auto h-7 w-7 text-caramel-600" strokeWidth={1.6} />
            <p className="mt-2.5 font-display text-base font-semibold text-espresso-950">{c.title}</p>
            <p className="text-xs text-espresso-700/70">{c.sub}</p>
            <code className="mt-3 block rounded-lg bg-espresso-950 px-2.5 py-2 font-mono text-[11.5px] text-caramel-100">
              {c.line}
            </code>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-sm text-espresso-700/70">
        All three are just instructions.
      </figcaption>
    </figure>
  );
}
