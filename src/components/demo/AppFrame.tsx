import type { ReactNode } from "react";

export function AppFrame({ label = "Your tool", children }: { label?: string; children: ReactNode }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-espresso-900/15 bg-white shadow-lift">
      <div className="flex items-center gap-2 border-b border-espresso-900/10 bg-latte/50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-brick-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-caramel-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-sage-500" />
        <span className="ml-2 truncate rounded-md bg-white px-3 py-1 font-mono text-[11px] text-espresso-700/60">
          {label}
        </span>
      </div>
      <div className="bg-paper p-5 sm:p-6">{children}</div>
    </div>
  );
}
