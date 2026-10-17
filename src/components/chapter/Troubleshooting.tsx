import { useState, type ReactNode } from "react";
import { ChevronDown, LifeBuoy } from "lucide-react";

export interface TroubleItem {
  problem: string;
  answer: ReactNode;
}

export function Troubleshooting({ items }: { items: TroubleItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="not-prose my-6 rounded-2xl border border-espresso-900/10 bg-cream overflow-hidden">
      <div className="flex items-center gap-2 border-b border-espresso-900/10 bg-latte/50 px-5 py-3">
        <LifeBuoy className="h-4 w-4 text-espresso-700" />
        <span className="font-display text-base font-semibold text-espresso-950">If something went wrong</span>
      </div>
      <div className="divide-y divide-espresso-900/10">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition hover:bg-latte/30"
              >
                <span className="text-[14.5px] font-medium text-espresso-900">{item.problem}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-espresso-700/60 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-[14.5px] leading-relaxed text-espresso-900/80">{item.answer}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
