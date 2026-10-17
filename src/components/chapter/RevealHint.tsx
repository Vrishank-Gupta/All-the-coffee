import { useState } from "react";
import { Sparkles } from "lucide-react";

export function RevealHint({ label = "Show hint", children }: { label?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  if (open) {
    return (
      <div className="not-prose mt-3 rounded-xl border border-caramel-300/60 bg-caramel-100/50 px-4 py-3 text-[14.5px] leading-relaxed text-espresso-900/90">
        <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-caramel-700 uppercase">
          <Sparkles className="h-3.5 w-3.5" /> Hint
        </div>
        {children}
      </div>
    );
  }
  return (
    <button
      onClick={() => setOpen(true)}
      className="not-prose mt-3 inline-flex items-center gap-1.5 rounded-full border border-caramel-400/50 bg-cream px-3.5 py-1.5 text-xs font-semibold text-caramel-700 transition hover:bg-caramel-100"
    >
      <Sparkles className="h-3.5 w-3.5" /> {label}
    </button>
  );
}
