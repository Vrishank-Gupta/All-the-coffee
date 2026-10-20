import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";
import { ThemeToggle } from "../layout/ThemeToggle";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-paper bg-grain px-5 py-12">
      <ThemeToggle className="absolute top-4 right-4" />
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso-950">
            <Coffee className="h-4.5 w-4.5 text-caramel-300" />
          </div>
          <span className="font-display text-lg font-semibold text-espresso-950">All The Coffee</span>
        </Link>
        <div className="rounded-3xl border border-espresso-900/10 bg-cream p-7 shadow-soft">
          <h1 className="font-display text-2xl font-semibold text-espresso-950">{title}</h1>
          <p className="mt-1.5 text-sm text-espresso-700/70">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
