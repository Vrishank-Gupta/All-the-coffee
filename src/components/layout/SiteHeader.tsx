import { Link, useNavigate } from "react-router-dom";
import { Coffee, UserCircle2, LogOut } from "lucide-react";
import { useProgress, TOTAL_CHAPTERS } from "../../lib/progress";
import { useAuth } from "../../lib/auth";
import { nextLiveChapter } from "../../lib/courseData";

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const { completed } = useProgress();
  const navigate = useNavigate();
  const next = nextLiveChapter(completed);

  const ctaPath = !user ? "/signup" : completed.length === 0 ? "/chapter/0" : next ? next.path : "/profile";
  const ctaLabel = !user ? "Start free" : completed.length === 0 ? "Start Chapter 0" : next ? `Continue: Ch. ${next.id}` : "You're all caught up";

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-espresso-900/10 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
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
          {user && (
            <Link
              to="/profile"
              className="hidden items-center gap-1.5 rounded-full bg-caramel-100 px-3 py-1 text-xs font-semibold text-caramel-700 hover:bg-caramel-200 sm:flex"
            >
              <UserCircle2 className="h-3.5 w-3.5" /> {completed.length} of {TOTAL_CHAPTERS} chapters done
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
            className="rounded-full bg-espresso-950 px-4 py-2 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
