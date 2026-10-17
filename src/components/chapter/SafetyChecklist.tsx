import { useState } from "react";
import { CheckSquare, Square, ShieldCheck } from "lucide-react";

export function SafetyChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const allChecked = checked.size === items.length;

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div className="not-prose my-6 rounded-2xl border border-espresso-900/10 bg-cream p-5">
      <div className="mb-3 flex items-center gap-2">
        <ShieldCheck className="h-4.5 w-4.5 text-caramel-700" />
        <span className="font-display text-base font-semibold text-espresso-950">Before you share: run through this</span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => {
          const on = checked.has(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`flex w-full items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-[14px] transition ${
                on ? "border-sage-300 bg-sage-50 text-sage-800" : "border-espresso-900/10 bg-white text-espresso-800 hover:bg-latte/30"
              }`}
            >
              {on ? <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" /> : <Square className="mt-0.5 h-4 w-4 shrink-0 text-espresso-400" />}
              <span className={on ? "line-through decoration-sage-400/60" : ""}>{item}</span>
            </button>
          );
        })}
      </div>
      {allChecked && (
        <p className="mt-3 text-sm font-semibold text-sage-700">All clear, safe to publish.</p>
      )}
    </div>
  );
}
