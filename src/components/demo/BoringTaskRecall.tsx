import { Link } from "react-router-dom";
import { NotebookPen } from "lucide-react";
import { useProgress } from "../../lib/progress";

export function BoringTaskRecall() {
  const { boringTask } = useProgress();

  if (!boringTask) {
    return (
      <div className="not-prose my-6 rounded-2xl border-2 border-dashed border-espresso-900/15 bg-cream/60 p-5 text-center">
        <NotebookPen className="mx-auto h-5 w-5 text-espresso-500" />
        <p className="mt-2 text-sm text-espresso-700/70">
          You didn't save a boring task back in Chapter 0, or it's on a different account. No problem: pick one now
          before Step 1 below, the same way you would have then.
        </p>
        <Link to="/chapter/0" className="mt-2 inline-block text-sm font-semibold text-caramel-700 underline underline-offset-2">
          See Chapter 0
        </Link>
      </div>
    );
  }

  return (
    <div className="not-prose my-6 rounded-2xl border border-caramel-400/40 bg-cream p-5">
      <div className="mb-2 flex items-center gap-2">
        <NotebookPen className="h-4.5 w-4.5 text-caramel-700" />
        <span className="font-display text-base font-semibold text-espresso-950">On day one, you wrote:</span>
      </div>
      <p className="text-[15px] text-espresso-900 italic">"{boringTask}"</p>
    </div>
  );
}
