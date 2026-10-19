import { Hammer, Zap, MessageSquare } from "lucide-react";

const CARDS = [
  { icon: Hammer, title: "VS Code", sub: "Your workbench", line: "Where you write and organise your files." },
  { icon: Zap, title: "Python", sub: "The engine", line: "What actually understands and runs your instructions." },
  { icon: MessageSquare, title: "Terminal", sub: "How you tell it to run", line: "Type an instruction, press Enter." },
];

export function WorkshopTrio() {
  return (
    <figure className="not-prose my-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {CARDS.map((c) => (
          <div key={c.title} className="rounded-2xl border border-espresso-900/10 bg-cream p-4 text-center shadow-soft">
            <c.icon className="mx-auto h-7 w-7 text-caramel-600" strokeWidth={1.6} />
            <p className="mt-2.5 font-display text-base font-semibold text-espresso-950">{c.title}</p>
            <p className="text-xs font-semibold text-caramel-700">{c.sub}</p>
            <p className="mt-2 text-[12.5px] leading-snug text-espresso-700/75">{c.line}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}
