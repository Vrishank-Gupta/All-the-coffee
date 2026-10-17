import { useState } from "react";
import { Link } from "react-router-dom";
import { Coffee, Download, NotebookPen, MessageSquareHeart, RotateCcw, ArrowLeft } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { EditableAnswerCard } from "../components/profile/EditableAnswerCard";
import { NervousTrend } from "../components/profile/NervousTrend";
import { TakeawayCard } from "../components/profile/TakeawayCard";
import { useProgress, TOTAL_CHAPTERS } from "../lib/progress";
import { useAuth } from "../lib/auth";
import { CHAPTERS } from "../lib/courseData";
import { TAKEAWAYS, formatAllTakeawaysText } from "../lib/takeaways";

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Profile() {
  const { user } = useAuth();
  const {
    completed,
    isComplete,
    isUnlocked,
    boringTask,
    setBoringTask,
    usedAtWork,
    setUsedAtWork,
    nervousStart,
    nervousCh3,
    nervousCh7,
    resetProgress,
  } = useProgress();

  const [confirmingReset, setConfirmingReset] = useState(false);

  const liveChapters = CHAPTERS.filter((c) => c.live);
  const unlockedTakeaways = TAKEAWAYS.filter((t) => liveChapters.some((c) => c.id === t.chapterId) && isUnlocked(t.chapterId));

  function handleDownloadAll() {
    downloadText("all-the-coffee-takeaways.txt", formatAllTakeawaysText(unlockedTakeaways));
  }

  function handleReset() {
    resetProgress();
    setConfirmingReset(false);
  }

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-espresso-700/70 hover:text-espresso-900">
          <ArrowLeft className="h-4 w-4" /> Back to the course
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-espresso-950">
            <Coffee className="h-6 w-6 text-caramel-300" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold text-espresso-950">Your profile</h1>
            <p className="text-sm text-espresso-700/70">
              {completed.length} of {TOTAL_CHAPTERS} chapters complete. Signed in as {user?.email}, synced to your
              account.
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-espresso-950">Your answers</h2>
          <p className="mt-1 text-sm text-espresso-700/70">What you've written down so far. Click any card to change it.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <EditableAnswerCard
              icon={<NotebookPen className="h-4 w-4" />}
              label="My boring task (from Chapter 0)"
              helper="This is the sentence your Chapter 11 capstone will be built around."
              value={boringTask}
              onSave={setBoringTask}
              placeholder="Write one boring, repetitive task you do on a computer…"
            />
            <EditableAnswerCard
              icon={<MessageSquareHeart className="h-4 w-4" />}
              label="Something I've used at work (from Chapter 7)"
              value={usedAtWork}
              onSave={setUsedAtWork}
              placeholder="A tracker, a cleaner, a summary you actually sent someone…"
            />
          </div>
          <div className="mt-3">
            <NervousTrend start={nervousStart} endA={nervousCh3} endB={nervousCh7} />
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-xl font-semibold text-espresso-950">Chapter takeaways</h2>
              <p className="mt-1 text-sm text-espresso-700/70">
                Short, bite-sized notes, not the full chapter. Good for a quick refresher before a meeting.
              </p>
            </div>
            {unlockedTakeaways.length > 0 && (
              <button
                onClick={handleDownloadAll}
                className="flex items-center gap-1.5 rounded-xl bg-espresso-950 px-3.5 py-2 text-xs font-semibold text-caramel-100 hover:bg-espresso-800"
              >
                <Download className="h-3.5 w-3.5" /> Download all as one file
              </button>
            )}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {liveChapters.map((c) => {
              const t = TAKEAWAYS.find((x) => x.chapterId === c.id);
              if (!t) return null;
              return <TakeawayCard key={c.id} takeaway={t} done={isComplete(c.id)} unlocked={isUnlocked(c.id)} />;
            })}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-brick-200 bg-brick-50 p-4">
          <p className="text-sm font-semibold text-brick-700">Start over</p>
          <p className="mt-1 text-xs text-brick-700/70">
            This clears your progress, answers and check-ins everywhere you're signed in. It can't be undone.
          </p>
          {confirmingReset ? (
            <div className="mt-2.5 flex items-center gap-2">
              <button onClick={handleReset} className="rounded-lg bg-brick-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brick-700">
                Yes, reset everything
              </button>
              <button onClick={() => setConfirmingReset(false)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-espresso-700/70 hover:bg-white/50">
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmingReset(true)}
              className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-brick-300 px-3 py-1.5 text-xs font-semibold text-brick-700 hover:bg-brick-100"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset my progress
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
