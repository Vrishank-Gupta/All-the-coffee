import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Laptop, Gift, Lock, ArrowLeft, UserCircle2, LogOut, Save } from "lucide-react";
import { ProgressDots } from "./ProgressDots";
import { MODULES, chapterPageMeta, type ChapterMeta } from "../../lib/courseData";
import { useDocumentMeta } from "../../lib/useDocumentMeta";
import { useAuth } from "../../lib/auth";
import { useProgress } from "../../lib/progress";
import { FoundingOfferBox } from "../demo/FoundingOfferBox";
import { ThemeToggle } from "../layout/ThemeToggle";

export function ChapterShell({ meta, children }: { meta: ChapterMeta; children: ReactNode }) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { hasPaid } = useProgress();
  const navigate = useNavigate();
  const pageMeta = chapterPageMeta(meta);
  useDocumentMeta(pageMeta.title, pageMeta.description);
  const locked = !meta.free && !hasPaid;

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <header className="border-b border-espresso-900/10 bg-cream/70 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-5 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm font-medium text-espresso-700/70 transition hover:text-espresso-900"
            >
              <ArrowLeft className="h-4 w-4" /> Course map
            </Link>
            <ProgressDots current={meta.id} />
            <div className="flex items-center gap-4">
              <ThemeToggle className="-mx-2" />
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-1.5 text-sm font-medium text-espresso-700/70 transition hover:text-espresso-900"
                  >
                    <UserCircle2 className="h-4 w-4" /> <span className="hidden sm:inline">Profile</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    title="Log out"
                    className="text-espresso-700/50 transition hover:text-espresso-900"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <Link
                  to="/signup"
                  state={{ from: location }}
                  aria-label="Save progress: create a free account"
                  className="flex items-center gap-1.5 text-sm font-semibold text-caramel-700 transition hover:text-caramel-600"
                >
                  <Save className="h-4 w-4" /> <span className="hidden sm:inline">Save progress</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto max-w-3xl px-5 py-10 sm:py-14"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-caramel-700 uppercase">
          <span>{MODULES[meta.module].name}</span>
          <span className="text-espresso-900/20">/</span>
          <span>Chapter {meta.id}</span>
        </div>

        <h1 className="font-display text-4xl font-semibold text-espresso-950 sm:text-5xl">{meta.title}</h1>
        <p className="mt-2 text-lg text-espresso-700/80">{meta.short}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge icon={<Clock className="h-3.5 w-3.5" />} text={meta.minutes} />
          <Badge icon={<Laptop className="h-3.5 w-3.5" />} text={meta.device} />
          {meta.free ? (
            <Badge icon={<Gift className="h-3.5 w-3.5" />} text="Free" tone="sage" />
          ) : (
            <Badge icon={<Lock className="h-3.5 w-3.5" />} text="Founding member" tone="caramel" />
          )}
        </div>

        {locked ? (
          <div className="prose-chapter mt-10">
            <div className="not-prose rounded-2xl border-2 border-dashed border-caramel-400/50 bg-caramel-100/30 p-6 text-center">
              <Lock className="mx-auto h-6 w-6 text-caramel-700" />
              <p className="mt-2 font-display text-xl font-semibold text-espresso-950">
                This chapter is part of {MODULES[meta.module].name}
              </p>
              <p className="mt-1 text-sm text-espresso-700/75">
                Finish Module A for free, then join as a founding member to get this and the rest of the course.
              </p>
            </div>
            <FoundingOfferBox />
          </div>
        ) : (
          <div className="prose-chapter mt-10">{children}</div>
        )}
      </motion.main>
    </div>
  );
}

function Badge({ icon, text, tone = "neutral" }: { icon: ReactNode; text: string; tone?: "neutral" | "sage" | "caramel" }) {
  const tones = {
    neutral: "bg-latte/60 text-espresso-800",
    sage: "bg-sage-100 text-sage-700",
    caramel: "bg-caramel-100 text-caramel-700",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>
      {icon}
      {text}
    </span>
  );
}
