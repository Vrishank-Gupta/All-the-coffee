import { NotebookTabs, NotebookPen } from "lucide-react";

export function NotebookCodeData() {
  return (
    <figure className="not-prose my-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-espresso-900/10 bg-cream p-5">
          <NotebookTabs className="h-6 w-6 text-caramel-600" strokeWidth={1.6} />
          <p className="mt-2 font-display text-base font-semibold text-espresso-950">Code: the tool</p>
          <div className="mt-3 space-y-1.5 rounded-lg border border-dashed border-espresso-900/20 bg-white p-3">
            <div className="h-2 w-2/3 rounded bg-espresso-900/10" />
            <div className="h-2 w-full rounded bg-espresso-900/10" />
            <div className="h-2 w-1/2 rounded bg-espresso-900/10" />
          </div>
          <p className="mt-2 text-xs text-espresso-700/60">A blank notebook with printed columns: the boxes, the buttons, the rules.</p>
        </div>
        <div className="rounded-2xl border border-caramel-300/50 bg-caramel-100/30 p-5">
          <NotebookPen className="h-6 w-6 text-caramel-700" strokeWidth={1.6} />
          <p className="mt-2 font-display text-base font-semibold text-espresso-950">Data: what you put in it</p>
          <div className="mt-3 space-y-1.5 rounded-lg border border-caramel-400/40 bg-white p-3 font-mono text-[11px] text-espresso-800">
            <div>Send revised proposal</div>
            <div>Rahul: tomorrow</div>
          </div>
          <p className="mt-2 text-xs text-espresso-700/60">The same notebook, filled in with the information you actually typed.</p>
        </div>
      </div>
    </figure>
  );
}
