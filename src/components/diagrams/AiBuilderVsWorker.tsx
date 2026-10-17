import { Hammer, Repeat } from "lucide-react";

export function AiBuilderVsWorker() {
  return (
    <figure className="not-prose my-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-espresso-900/10 bg-cream p-4 text-center">
          <Hammer className="mx-auto h-6 w-6 text-caramel-600" strokeWidth={1.6} />
          <p className="mt-2 font-display text-base font-semibold text-espresso-950">AI as builder</p>
          <p className="mt-1 text-[12.5px] text-espresso-700/75">You → chat → code. It builds the tool, once.</p>
        </div>
        <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 text-center">
          <Repeat className="mx-auto h-6 w-6 text-teal-700" strokeWidth={1.6} />
          <p className="mt-2 font-display text-base font-semibold text-espresso-950">AI as worker</p>
          <p className="mt-1 text-[12.5px] text-espresso-700/75">Tool → API → AI model → result. It does the work, every time you use it.</p>
        </div>
      </div>
    </figure>
  );
}
