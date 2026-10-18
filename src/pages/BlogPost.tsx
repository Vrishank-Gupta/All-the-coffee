import { Suspense } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { BlogPostLayout } from "../components/layout/BlogPostLayout";
import { blogBySlug } from "../lib/blogData";
import { BLOG_CONTENT } from "../lib/blogContent";
import { useAuth } from "../lib/auth";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { user } = useAuth();
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

  const unlocked = meta.free || Boolean(user);

  if (!unlocked) {
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
          <div className="mt-8 rounded-3xl border border-espresso-900/10 bg-cream p-6 text-center sm:p-8">
            <Lock className="mx-auto h-6 w-6 text-espresso-400" />
            <p className="mt-3 font-display text-lg font-semibold text-espresso-950">Free account needed to keep reading</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-espresso-700/75">
              This one's for signed-up readers. No payment, no card, just a free account, same one you'd use for
              the course.
            </p>
            <Link
              to="/signup"
              state={{ from: location }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-espresso-950 px-6 py-3 font-semibold text-caramel-100 shadow-lift transition hover:bg-espresso-800"
            >
              Create a free account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const Content = BLOG_CONTENT[meta.slug];

  return (
    <BlogPostLayout meta={meta}>
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
