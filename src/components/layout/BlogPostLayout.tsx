import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useDocumentMeta } from "../../lib/useDocumentMeta";
import type { BlogMeta } from "../../lib/blogData";

export function BlogPostLayout({ meta, children }: { meta: BlogMeta; children: ReactNode }) {
  useDocumentMeta(meta.title, meta.excerpt);

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
        <Link to="/blog" className="flex items-center gap-1.5 text-sm font-medium text-espresso-700/70 hover:text-espresso-900">
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>
        <div className="mt-4 flex items-center gap-2 text-xs font-bold tracking-wide text-caramel-700 uppercase">
          <span className="rounded-full bg-caramel-100 px-2.5 py-1">{meta.topic}</span>
          <span className="flex items-center gap-1 text-espresso-600/60 normal-case">
            <Clock className="h-3 w-3" /> {meta.readTime}
          </span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold text-espresso-950 sm:text-4xl">{meta.title}</h1>
        <div className="prose-chapter mt-8 space-y-5 text-[15.5px] leading-relaxed text-espresso-900/90 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-espresso-950 [&_a]:text-caramel-700 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-espresso-950 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-caramel-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-espresso-700/80 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-espresso-950 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_li::marker]:text-caramel-600 [&_table]:w-full [&_table]:text-left [&_table]:text-sm [&_th]:border-b [&_th]:border-espresso-900/15 [&_th]:py-2 [&_th]:pr-4 [&_th]:font-semibold [&_th]:text-espresso-950 [&_td]:border-b [&_td]:border-espresso-900/10 [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top [&_.table-wrap]:overflow-x-auto [&_.sources]:border-t [&_.sources]:border-espresso-900/10 [&_.sources]:pt-5 [&_.sources]:text-sm [&_.sources]:text-espresso-700/75">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
