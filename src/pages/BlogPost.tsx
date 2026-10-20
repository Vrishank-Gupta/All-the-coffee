import { Suspense } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { BlogPostLayout } from "../components/layout/BlogPostLayout";
import { FoundingOfferBox } from "../components/demo/FoundingOfferBox";
import { blogBySlug } from "../lib/blogData";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { BLOG_CONTENT } from "../lib/blogContent";
import { useAuth } from "../lib/auth";
import { useProgress } from "../lib/progress";

function LockedShell({ meta, children }: { meta: NonNullable<ReturnType<typeof blogBySlug>>; children: React.ReactNode }) {
  useDocumentMeta(meta.title, meta.excerpt);
  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-5 py-14">
        <Link to="/blog" className="flex items-center gap-1.5 text-sm font-medium text-espresso-700/70 hover:text-espresso-900">
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>
        <span className="mt-4 inline-block rounded-full bg-caramel-100 px-2.5 py-1 text-xs font-bold tracking-wide text-caramel-700 uppercase">
          {meta.topic}
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-espresso-950 sm:text-4xl">{meta.title}</h1>
        <p className="mt-4 text-espresso-700/80">{meta.excerpt}</p>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { user } = useAuth();
  const { hasPaid } = useProgress();
  const meta = slug ? blogBySlug(slug) : undefined;

  if (!meta) {
    return (
      <div className="min-h-screen bg-paper bg-grain">
        <SiteHeader />
        <main className="mx-auto max-w-xl px-5 py-20 text-center">
          <p className="text-espresso-700/70">That article doesn't exist.</p>
          <Link to="/blog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-caramel-700 underline underline-offset-2">
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // Free articles are open to everyone, search engines included, with a
  // signup prompt at the end. Paid ones need an account (checkout requires
  // one) and then the Founding Batch.
  if (!meta.free && !user) {
    return (
      <LockedShell meta={meta}>
        <div className="mt-8 rounded-3xl border border-espresso-900/10 bg-cream p-6 text-center sm:p-8">
          <Lock className="mx-auto h-6 w-6 text-espresso-400" />
          <p className="mt-3 font-display text-lg font-semibold text-espresso-950">Part of the Founding Batch</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-espresso-700/75">
            This article comes with Modules B and C. Start with a free account: Chapters 0–3 are free, no card needed.
          </p>
          <Link
            to="/signup"
            state={{ from: location }}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-espresso-950 px-6 py-3 font-semibold text-caramel-100 shadow-lift transition hover:bg-espresso-800"
          >
            Create a free account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </LockedShell>
    );
  }

  if (!meta.free && !hasPaid) {
    return (
      <LockedShell meta={meta}>
        <div className="mt-8">
          <p className="mb-3 text-center text-sm font-semibold text-espresso-700">
            This one's part of the Founding Batch. Unlock it, and all of Modules B and C, together.
          </p>
          <FoundingOfferBox />
        </div>
      </LockedShell>
    );
  }

  const Content = BLOG_CONTENT[meta.slug];

  return (
    <BlogPostLayout
      meta={meta}
      footer={
        !user && (
          <div className="mt-12 rounded-3xl border border-espresso-900/10 bg-cream p-6 text-center sm:p-8">
            <p className="font-display text-lg font-semibold text-espresso-950">Want to build something like this yourself?</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-espresso-700/75">
              Chapter 1 has you build a working tool in about 20 minutes, in your browser, no coding background
              needed. Chapters 0–3 are free, no card.
            </p>
            <Link
              to="/signup"
              state={{ from: location }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-espresso-950 px-6 py-3 font-semibold text-caramel-100 shadow-lift transition hover:bg-espresso-800"
            >
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      }
    >
      {Content ? (
        <Suspense fallback={<p className="text-espresso-700/60">Loading…</p>}>
          <Content />
        </Suspense>
      ) : (
        <p className="text-espresso-700/60">This article is still being written. Check back soon.</p>
      )}
    </BlogPostLayout>
  );
}
