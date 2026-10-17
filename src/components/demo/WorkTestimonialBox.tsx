import { useState } from "react";
import { Check, MessageSquareHeart } from "lucide-react";
import { useProgress } from "../../lib/progress";

export function WorkTestimonialBox() {
  const { usedAtWork, setUsedAtWork } = useProgress();
  const [draft, setDraft] = useState(usedAtWork);
  const [saved, setSaved] = useState(false);

  function save() {
    if (!draft.trim()) return;
    setUsedAtWork(draft.trim());
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="not-prose my-6 rounded-2xl border border-caramel-400/40 bg-cream p-5">
      <div className="mb-2 flex items-center gap-2">
        <MessageSquareHeart className="h-4.5 w-4.5 text-caramel-700" />
        <span className="font-display text-base font-semibold text-espresso-950">
          Optional: what's one thing you've already used at work?
        </span>
      </div>
      <p className="mb-3 text-[13.5px] text-espresso-700/70">
        A tracker, a cleaner, a summary you actually sent someone: anything counts. This is just for you to see how
        far "20 minutes a day" has taken you.
      </p>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={2}
        placeholder="I used the data cleaner on an actual messy export from…"
        className="w-full resize-none rounded-xl border border-espresso-900/15 bg-white px-4 py-3 text-[14.5px] text-espresso-900 focus:border-caramel-500"
      />
      <button
        onClick={save}
        className="mt-3 flex items-center gap-1.5 rounded-xl bg-caramel-500 px-4 py-2 text-sm font-semibold text-espresso-950 transition hover:bg-caramel-400"
      >
        {saved ? <Check className="h-4 w-4" /> : null}
        {saved ? "Saved, nice work" : "Save it"}
      </button>
    </div>
  );
}
