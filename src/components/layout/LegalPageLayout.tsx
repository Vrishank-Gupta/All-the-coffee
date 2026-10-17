import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function LegalPageLayout({ title, lastUpdated, children }: { title: string; lastUpdated: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
        <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-espresso-700/70 hover:text-espresso-900">
          <ArrowLeft className="h-4 w-4" /> Back to the course
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-espresso-950 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-espresso-700/60">Last updated {lastUpdated}</p>
        <div className="prose-chapter mt-8 space-y-5 text-[15px] leading-relaxed text-espresso-900/90 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-espresso-950 [&_a]:text-caramel-700 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-espresso-950 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
