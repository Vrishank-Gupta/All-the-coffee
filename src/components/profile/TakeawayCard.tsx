import { Download, Lock, CheckCircle2, Circle } from "lucide-react";
import { formatTakeawayText, type ChapterTakeaway } from "../../lib/takeaways";

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

export function TakeawayCard({
  takeaway,
  done,
  unlocked,
}: {
  takeaway: ChapterTakeaway;
  done: boolean;
  unlocked: boolean;
}) {
  if (!unlocked) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-espresso-900/10 bg-cream/50 p-4 opacity-60">
        <Lock className="h-4 w-4 shrink-0 text-espresso-400" />
        <div>
          <p className="text-sm font-semibold text-espresso-700">Chapter {takeaway.chapterId}</p>
          <p className="text-xs text-espresso-700/60">Unlocks once you finish the chapter before it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-espresso-900/10 bg-cream p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {done ? <CheckCircle2 className="h-4 w-4 text-sage-600" /> : <Circle className="h-4 w-4 text-espresso-400" />}
          <p className="font-display text-sm font-semibold text-espresso-950">
            Chapter {takeaway.chapterId}: {takeaway.title}
          </p>
        </div>
        <button
          onClick={() => downloadText(`chapter-${takeaway.chapterId}-takeaways.txt`, formatTakeawayText(takeaway))}
          className="flex shrink-0 items-center gap-1 rounded-lg border border-caramel-400/50 px-2.5 py-1 text-[11px] font-semibold text-caramel-700 hover:bg-caramel-100"
        >
          <Download className="h-3 w-3" /> Download
        </button>
      </div>
      <ul className="mt-2.5 list-disc space-y-1 pl-5 text-[13px] text-espresso-800/85 marker:text-caramel-500">
        {takeaway.points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {takeaway.words.map((w) => (
          <span key={w} className="rounded-full bg-latte/70 px-2 py-0.5 text-[10.5px] font-semibold text-espresso-700">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
