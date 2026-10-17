import type { ReactNode } from "react";
import { PenLine } from "lucide-react";

export function TryItYourself({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-2xl border border-caramel-400/40 bg-gradient-to-br from-caramel-100/50 to-cream p-5">
      <div className="mb-2 flex items-center gap-2">
        <PenLine className="h-4.5 w-4.5 text-caramel-700" />
        <span className="font-display text-base font-semibold text-espresso-950">Try it yourself</span>
      </div>
      <div className="text-[15px] leading-relaxed text-espresso-900/90">{children}</div>
    </div>
  );
}
