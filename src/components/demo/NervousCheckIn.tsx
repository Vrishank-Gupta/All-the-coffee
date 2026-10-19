import { useState } from "react";
import { Gauge, TrendingDown } from "lucide-react";
import { useProgress } from "../../lib/progress";

type Point = "start" | "end" | "moduleB";

export function NervousCheckIn({ point }: { point: Point }) {
  const { nervousStart, nervousCh3, nervousCh7, setNervousStart, setNervousCh3, setNervousCh7 } = useProgress();
  const existing = point === "start" ? nervousStart : point === "end" ? nervousCh3 : nervousCh7;
  const baseline = point === "moduleB" ? nervousCh3 : nervousStart;
  const [value, setValue] = useState(existing ?? 6);
  const [submitted, setSubmitted] = useState(existing !== null);

  function submit() {
    if (point === "start") setNervousStart(value);
    else if (point === "end") setNervousCh3(value);
    else setNervousCh7(value);
    setSubmitted(true);
  }

  const showComparison = point !== "start" && submitted && baseline !== null;

  return (
    <div className="not-prose my-6 rounded-2xl border border-espresso-900/10 bg-cream p-5">
      <div className="mb-3 flex items-center gap-2">
        <Gauge className="h-4.5 w-4.5 text-caramel-700" />
        <span className="font-display text-base font-semibold text-espresso-950">
          How nervous of tech do you feel right now?
        </span>
      </div>

      {!submitted ? (
        <>
          <input
            type="range"
            min={1}
            max={10}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full accent-caramel-600"
          />
          <div className="mt-1 flex justify-between text-xs text-espresso-700/60">
            <span>1: totally fine</span>
            <span className="font-display text-lg font-semibold text-espresso-950">{value}</span>
            <span>10: very nervous</span>
          </div>
          <button
            onClick={submit}
            className="mt-3 rounded-xl bg-espresso-950 px-4 py-2 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800"
          >
            Submit
          </button>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <span className="font-display text-3xl font-bold text-espresso-950">{value}</span>
          <div className="text-sm text-espresso-700/80">
            {showComparison ? (
              value < baseline! ? (
                <span className="flex items-center gap-1.5 font-medium text-sage-700">
                  <TrendingDown className="h-4 w-4" /> Down from {baseline} {point === "end" ? "on day one" : "at the end of Module A"}. That drop is real progress.
                </span>
              ) : (
                <span>Was {baseline} {point === "end" ? "on day one" : "at the end of Module A"}. However you feel, you've built and fixed real things.</span>
              )
            ) : (
              <span>Saved. We'll check back in {point === "start" ? "at the end of Module A" : "again later"}.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
