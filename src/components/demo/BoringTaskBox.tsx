import { useState } from "react";
import { Check, NotebookPen } from "lucide-react";
import { useProgress } from "../../lib/progress";

const EXAMPLES = [
  "Every Monday I copy numbers from five Excel files into one summary.",
  "I rewrite my meeting notes into a neat email after every client call.",
  "I keep track of who's on leave in a messy spreadsheet.",
  "I reformat the same report for three different managers.",
];

export function BoringTaskBox() {
  const { boringTask, setBoringTask } = useProgress();
  const [draft, setDraft] = useState(boringTask);
  const [saved, setSaved] = useState(false);

  function save() {
    if (!draft.trim()) return;
    setBoringTask(draft.trim());
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="not-prose my-6 rounded-2xl border border-caramel-400/40 bg-cream p-5">
      <div className="mb-2 flex items-center gap-2">
        <NotebookPen className="h-4.5 w-4.5 text-caramel-700" />
        <span className="font-display text-base font-semibold text-espresso-950">My boring task is…</span>
      </div>
      <p className="mb-3 text-[13.5px] text-espresso-700/70">
        A few examples from people like you: <em>"{EXAMPLES[0]}"</em> or <em>"{EXAMPLES[2]}"</em>
      </p>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={2}
        placeholder="Write one boring, repetitive task you do on a computer…"
        className="w-full resize-none rounded-xl border border-espresso-900/15 bg-white px-4 py-3 text-[14.5px] text-espresso-900 focus:border-caramel-500"
      />
      <button
        onClick={save}
        className="mt-3 flex items-center gap-1.5 rounded-xl bg-caramel-500 px-4 py-2 text-sm font-semibold text-espresso-950 transition hover:bg-caramel-400"
      >
        {saved ? <Check className="h-4 w-4" /> : null}
        {saved ? "Saved, see you in Chapter 11" : "Save it for Chapter 11"}
      </button>
      {boringTask && !saved && (
        <p className="mt-2 text-xs text-espresso-700/60">
          Currently saved: <span className="font-medium text-espresso-800">"{boringTask}"</span>
        </p>
      )}
    </div>
  );
}
