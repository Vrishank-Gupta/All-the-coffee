import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { GUEST_CHAPTER_IDS } from "../../lib/courseData";
import { logEvent } from "../../lib/analytics";
import { CheckCircle2, ArrowRight, PartyPopper } from "lucide-react";
import { useProgress } from "../../lib/progress";
import { Celebration } from "../demo/Celebration";

export interface QuickCheck {
  question: string;
  options: string[];
  correctIndex: number;
}

export function ChapterComplete({
  chapterId,
  nextPath,
  nextTitle,
  quickCheck,
}: {
  chapterId: number;
  nextPath?: string;
  nextTitle?: string;
  quickCheck?: QuickCheck;
}) {
  const { isComplete, completeChapter } = useProgress();
  const { user } = useAuth();
  // A guest who finishes their last open chapter is asked to make an account
  // before the next one, which keeps the progress they just made.
  const needsAccount = !user && !GUEST_CHAPTER_IDS.includes(chapterId + 1);
  const [ticked, setTicked] = useState(isComplete(chapterId));
  const [answer, setAnswer] = useState<number | null>(null);
  const [burst, setBurst] = useState(0);
  const done = isComplete(chapterId);

  const quizOk = !quickCheck || answer === quickCheck.correctIndex;
  const canComplete = ticked && quizOk && answer !== null ? true : ticked && !quickCheck;

  function handleAnswer(i: number) {
    setAnswer(i);
    if (quickCheck && i === quickCheck.correctIndex) setBurst((b) => b + 1);
  }

  function handleComplete() {
    if (!canComplete) return;
    completeChapter(chapterId);
    logEvent(`complete-ch${chapterId}${user ? "" : "-guest"}`);
    setBurst((b) => b + 1);
  }

  return (
    <div className="not-prose relative my-10 overflow-hidden rounded-3xl border border-espresso-900/10 bg-espresso-950 p-6 text-caramel-50 sm:p-8">
      <Celebration trigger={burst} />
      <div className="flex items-center gap-2 text-sage-300">
        <PartyPopper className="h-5 w-5" />
        <span className="font-display text-lg font-semibold text-caramel-50">Finish this chapter</span>
      </div>

      {quickCheck && !done && (
        <div className="mt-5">
          <p className="mb-3 text-[15px] font-medium text-caramel-100">{quickCheck.question}</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {quickCheck.options.map((opt, i) => (
              <button
                key={opt}
                onClick={() => handleAnswer(i)}
                className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${
                  answer === i
                    ? i === quickCheck.correctIndex
                      ? "border-sage-400 bg-sage-600/20 text-sage-200"
                      : "border-brick-400 bg-brick-600/20 text-brick-200"
                    : "border-white/15 bg-white/5 text-caramel-100 hover:bg-white/10"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {answer !== null && answer !== quickCheck.correctIndex && (
            <p className="mt-2 text-sm text-brick-200">Not quite. Have another look above, then try again.</p>
          )}
        </div>
      )}

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 transition hover:bg-white/10">
        <input
          type="checkbox"
          checked={ticked || done}
          onChange={(e) => setTicked(e.target.checked)}
          disabled={done}
          className="mt-0.5 h-4 w-4 accent-caramel-400"
        />
        <span className="text-sm text-caramel-100">
          I finished the build for this chapter{done ? ", nice work." : "."}
        </span>
      </label>

      {!done ? (
        <button
          onClick={handleComplete}
          disabled={!canComplete}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-caramel-500 px-5 py-3 font-semibold text-espresso-950 transition enabled:hover:bg-caramel-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCircle2 className="h-4.5 w-4.5" />
          Mark chapter complete
        </button>
      ) : nextPath && nextTitle && needsAccount ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-display text-base font-semibold text-caramel-50">Save what you've built and keep going</p>
          <p className="mt-1.5 text-sm text-caramel-100/80">
            Create a free account to keep your progress and carry on with the next chapter. Chapters 0–3 are free, no card needed.
          </p>
          <Link
            to="/signup"
            state={{ from: { pathname: nextPath } }}
            onClick={() => logEvent(`cta-save-progress-ch${chapterId}`)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-caramel-500 px-5 py-3 font-semibold text-espresso-950 transition hover:bg-caramel-400"
          >
            Create free account and continue
            <ArrowRight className="h-4.5 w-4.5" />
          </Link>
        </div>
      ) : nextPath && nextTitle ? (
        <Link
          to={nextPath}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-caramel-500 px-5 py-3 font-semibold text-espresso-950 transition hover:bg-caramel-400"
        >
          Continue to {nextTitle}
          <ArrowRight className="h-4.5 w-4.5" />
        </Link>
      ) : null}
    </div>
  );
}
