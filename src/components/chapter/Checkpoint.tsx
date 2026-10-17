import type { ReactNode } from "react";
import { FlagTriangleRight } from "lucide-react";

export function Checkpoint({ title = "Checkpoint", children }: { title?: string; children: ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-2xl border-2 border-dashed border-caramel-400/60 bg-caramel-100/40 px-5 py-4">
      <div className="mb-1.5 flex items-center gap-2">
        <FlagTriangleRight className="h-4.5 w-4.5 text-caramel-700" />
        <span className="font-display text-base font-semibold text-espresso-950">{title}</span>
      </div>
      <div className="text-[15px] leading-relaxed text-espresso-900/90">{children}</div>
    </div>
  );
}
