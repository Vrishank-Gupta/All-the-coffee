import { Link } from "react-router-dom";
import { Lock, Clock, Mail, ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { PAGE_META } from "../lib/pageMeta";
import { BLOG_POSTS } from "../lib/blogData";
import { useAuth } from "../lib/auth";
import { useProgress } from "../lib/progress";

export default function BlogList() {
  useDocumentMeta(PAGE_META["/blog"].title, PAGE_META["/blog"].description);
  const { user } = useAuth();
  const { hasPaid } = useProgress();

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <h1 className="font-display text-4xl font-semibold text-espresso-950">The All The Coffee blog</h1>
        <p className="mt-2 max-w-xl text-espresso-700/75">
          One useful, honest AI article a week. No hype, no jargon you didn't ask for, nothing that takes more
          than a coffee break to read.
        </p>

        {!user && (
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-caramel-300/50 bg-cream p-5">
            <Mail className="h-6 w-6 shrink-0 text-caramel-600" />
            <div className="flex-1">
              <p className="font-display text-base font-semibold text-espresso-950">Get new articles in your inbox</p>
              <p className="mt-0.5 text-sm text-espresso-700/70">Free account, one email a week, unsubscribe anytime.</p>
            </div>
            <Link
              to="/signup"
              className="flex items-center gap-1.5 rounded-xl bg-espresso-950 px-5 py-2.5 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800"
            >
              Sign up free <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {BLOG_POSTS.map((post) => {
            const locked = !post.free && !hasPaid;
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft transition hover:border-caramel-400/60"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-caramel-100 px-2.5 py-1 text-xs font-bold tracking-wide text-caramel-700 uppercase">
                    {post.topic}
                  </span>
                  {locked ? (
                    <Lock className="h-4 w-4 text-espresso-400" />
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-espresso-600/60">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  )}
                </div>
                <p className="mt-3 font-display text-lg font-semibold text-espresso-950 group-hover:text-caramel-700">
                  {post.title}
                </p>
                <p className="mt-1.5 flex-1 text-sm leading-snug text-espresso-700/75">{post.excerpt}</p>
                {locked && <p className="mt-3 text-xs font-semibold text-caramel-700">Included with Modules B and C &rarr;</p>}
              </Link>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
