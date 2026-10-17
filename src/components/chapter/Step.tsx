import type { ReactNode } from "react";

export function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="not-prose my-4 flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-espresso-900 font-display text-sm font-semibold text-caramel-100">
        {n}
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="mb-1.5 font-semibold text-espresso-950">{title}</p>
        <div className="text-[15px] leading-relaxed text-espresso-900/85">{children}</div>
      </div>
    </div>
  );
}
