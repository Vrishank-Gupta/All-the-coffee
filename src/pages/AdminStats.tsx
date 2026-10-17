import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Users, Eye, Crown, Lock } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabaseClient";
import { CHAPTERS } from "../lib/courseData";

const ADMIN_EMAIL = "vrishank98@gmail.com";

interface AdminStatsData {
  total_signups: number;
  paid_members: number;
  seats_remaining: number;
  signups_last_24h: number;
  signups_last_7d: number;
  total_page_views: number;
  unique_visitors: number;
  views_last_24h: number;
  unique_visitors_last_24h: number;
  chapter_completions: Record<string, number>;
  top_pages: { path: string; views: number }[];
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft">
      <div className="flex items-center gap-2 text-caramel-600">{icon}</div>
      <p className="mt-2 font-display text-3xl font-semibold text-espresso-950">{value}</p>
      <p className="mt-1 text-sm text-espresso-700/70">{label}</p>
    </div>
  );
}

export default function AdminStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStatsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === ADMIN_EMAIL;

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.rpc("get_admin_stats");
    if (error) {
      setError(error.message);
    } else {
      setStats(data as AdminStatsData);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) fetchStats();
  }, [isAdmin, fetchStats]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-paper bg-grain">
        <SiteHeader />
        <main className="mx-auto max-w-xl px-5 py-20 text-center">
          <Lock className="mx-auto h-8 w-8 text-espresso-400" />
          <p className="mt-4 text-sm text-espresso-700/70">This page isn't available on your account.</p>
          <Link to="/" className="mt-4 inline-block text-sm font-semibold text-caramel-700 underline underline-offset-2">
            Back to the course
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-espresso-700/70 hover:text-espresso-900">
          <ArrowLeft className="h-4 w-4" /> Back to the course
        </Link>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl font-semibold text-espresso-950">Live stats</h1>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-xl bg-espresso-950 px-3.5 py-2 text-xs font-semibold text-caramel-100 hover:bg-espresso-800 disabled:opacity-60"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        {error && (
          <p className="mt-6 rounded-xl border border-brick-200 bg-brick-50 p-4 text-sm text-brick-700">{error}</p>
        )}

        {loading && !stats && <p className="mt-6 text-sm text-espresso-700/60">Loading…</p>}

        {stats && (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={<Users className="h-5 w-5" />} label="Total signups" value={stats.total_signups} />
              <StatCard icon={<Crown className="h-5 w-5" />} label="Paid founding members" value={stats.paid_members} />
              <StatCard icon={<Crown className="h-5 w-5" />} label="Founding seats left" value={stats.seats_remaining} />
              <StatCard icon={<Eye className="h-5 w-5" />} label="Total page views" value={stats.total_page_views} />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={<Users className="h-5 w-5" />} label="Unique visitors (all-time)" value={stats.unique_visitors} />
              <StatCard icon={<Users className="h-5 w-5" />} label="Signups, last 24h" value={stats.signups_last_24h} />
              <StatCard icon={<Users className="h-5 w-5" />} label="Signups, last 7 days" value={stats.signups_last_7d} />
              <StatCard icon={<Eye className="h-5 w-5" />} label="Visitors, last 24h" value={stats.unique_visitors_last_24h} />
            </div>

            <section className="mt-10">
              <h2 className="font-display text-xl font-semibold text-espresso-950">Chapter completion funnel</h2>
              <p className="mt-1 text-sm text-espresso-700/70">How many signed-up users have finished each chapter.</p>
              <div className="mt-4 space-y-2">
                {CHAPTERS.filter((c) => c.live).map((c) => {
                  const count = stats.chapter_completions[String(c.id)] ?? 0;
                  const pct = stats.total_signups > 0 ? Math.round((count / stats.total_signups) * 100) : 0;
                  return (
                    <div key={c.id} className="flex items-center gap-3">
                      <span className="w-40 shrink-0 truncate text-sm text-espresso-800">{c.title}</span>
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-espresso-900/10">
                        <div className="h-full rounded-full bg-caramel-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-16 shrink-0 text-right text-sm font-semibold text-espresso-900">{count}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-display text-xl font-semibold text-espresso-950">Most-viewed pages</h2>
              <div className="mt-4 space-y-2">
                {stats.top_pages.length === 0 && <p className="text-sm text-espresso-700/60">No page views logged yet.</p>}
                {stats.top_pages.map((p) => (
                  <div key={p.path} className="flex items-center justify-between rounded-xl bg-cream px-4 py-2.5 text-sm">
                    <span className="font-mono text-espresso-800">{p.path}</span>
                    <span className="font-semibold text-espresso-950">{p.views}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
