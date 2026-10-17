import { Eraser, Archive } from "lucide-react";

export function MemoryVsStorage() {
  return (
    <figure className="not-prose my-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-brick-200 bg-brick-50 p-5 text-center">
          <Eraser className="mx-auto h-6 w-6 text-brick-600" strokeWidth={1.6} />
          <p className="mt-2 font-display text-base font-semibold text-espresso-950">Memory</p>
          <p className="mt-1 text-[13px] text-espresso-800/80">A whiteboard, wiped clean the moment the tool closes.</p>
        </div>
        <div className="rounded-2xl border border-sage-200 bg-sage-50 p-5 text-center">
          <Archive className="mx-auto h-6 w-6 text-sage-700" strokeWidth={1.6} />
          <p className="mt-2 font-display text-base font-semibold text-espresso-950">Storage</p>
          <p className="mt-1 text-[13px] text-espresso-800/80">A filing cabinet: still there tomorrow, until you delete it.</p>
        </div>
      </div>
    </figure>
  );
}
