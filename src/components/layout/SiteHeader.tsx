import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coffee, UserCircle2, LogOut, BarChart3, Menu, X } from "lucide-react";
import { useProgress, TOTAL_CHAPTERS } from "../../lib/progress";
import { useAuth } from "../../lib/auth";
import { nextLiveChapter } from "../../lib/courseData";

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const { completed } = useProgress();
  const navigate = useNavigate();
  const next = nextLiveChapter(completed);
  const [menuOpen, setMenuOpen] = useState(false);

  const ctaPath = !user ? "/signup" : completed.length === 0 ? "/chapter/0" : next ? next.path : "/profile";
  const ctaLabel = !user ? "Start free" : completed.length === 0 ? "Start Chapter 0" : next ? `Continue: Ch. ${next.id}` : "You're all caught up";

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-espresso-900/10 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso-950">
            <Coffee className="h-4 w-4 text-caramel-300" strokeWidth={2} />
          </div>
          <span className="font-display text-lg font-semibold text-espresso-950">All The Coffee</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/overview" className="hidden text-sm font-medium text-espresso-700/70 hover:text-espresso-900 sm:block">
            Overview
          </Link>
          <a href="/#course-map" className="hidden text-sm font-medium text-espresso-700/70 hover:text-espresso-900 sm:block">
            Course map
          </a>
          <Link to="/blog" className="hidden text-sm font-medium text-espresso-700/70 hover:text-espresso-900 sm:block">
            Blog
          </Link>
          {user && (
            <Link
              to="/profile"
              className="hidden items-center gap-1.5 rounded-full bg-caramel-100 px-3 py-1 text-xs font-semibold text-caramel-700 hover:bg-caramel-200 sm:flex"
            >
              <UserCircle2 className="h-3.5 w-3.5" /> {completed.length} of {TOTAL_CHAPTERS} chapters done
            </Link>
          )}
          {user?.email === "vrishank98@gmail.com" && (
            <Link
              to="/admin"
              className="hidden items-center gap-1.5 text-sm font-medium text-espresso-700/60 hover:text-espresso-900 sm:flex"
              title="Live stats"
            >
              <BarChart3 className="h-4 w-4" />
            </Link>
          )}
          {user ? (
            <button
              onClick={handleSignOut}
              className="hidden items-center gap-1.5 text-sm font-medium text-espresso-700/60 hover:text-espresso-900 sm:flex"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          ) : (
            <Link to="/login" className="hidden text-sm font-medium text-espresso-700/70 hover:text-espresso-900 sm:block">
              Log in
            </Link>
          )}
          <Link
            to={ctaPath}
            className="flex min-h-11 items-center rounded-full bg-espresso-950 px-4 py-2 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800"
          >
            {ctaLabel}
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-espresso-800 hover:bg-espresso-900/5 sm:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-espresso-900/10 bg-paper px-5 py-3 sm:hidden">
          <nav className="flex flex-col gap-1">
            <Link to="/overview" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 text-sm font-medium text-espresso-800 hover:bg-espresso-900/5">
              Overview
            </Link>
            <a href="/#course-map" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 text-sm font-medium text-espresso-800 hover:bg-espresso-900/5">
              Course map
            </a>
            <Link to="/blog" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 text-sm font-medium text-espresso-800 hover:bg-espresso-900/5">
              Blog
            </Link>
            {user && (
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-1.5 rounded-lg px-2 py-2.5 text-sm font-medium text-espresso-800 hover:bg-espresso-900/5">
                <UserCircle2 className="h-4 w-4" /> Profile &middot; {completed.length} of {TOTAL_CHAPTERS} chapters done
              </Link>
            )}
            {user?.email === "vrishank98@gmail.com" && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-1.5 rounded-lg px-2 py-2.5 text-sm font-medium text-espresso-800 hover:bg-espresso-900/5">
                <BarChart3 className="h-4 w-4" /> Live stats
              </Link>
            )}
            {user ? (
              <button onClick={handleSignOut} className="flex items-center gap-1.5 rounded-lg px-2 py-2.5 text-left text-sm font-medium text-espresso-800 hover:bg-espresso-900/5">
                <LogOut className="h-4 w-4" /> Log out
              </button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-2.5 text-sm font-medium text-espresso-800 hover:bg-espresso-900/5">
                Log in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
