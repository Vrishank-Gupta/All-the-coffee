import { Gauge } from "lucide-react";

export function NervousTrend({
  start,
  endA,
  endB,
}: {
  start: number | null;
  endA: number | null;
  endB: number | null;
}) {
  const points = [
    { label: "Day one", value: start },
    { label: "End of Module A", value: endA },
    { label: "End of Module B", value: endB },
  ].filter((p) => p.value !== null) as { label: string; value: number }[];

  return (
    <div className="rounded-2xl border border-espresso-900/10 bg-cream p-4">
      <div className="flex items-center gap-2">
        <Gauge className="h-4 w-4 text-caramel-600" />
        <p className="font-display text-sm font-semibold text-espresso-950">How nervous you've felt, over time</p>
      </div>
      {points.length === 0 ? (
        <p className="mt-2.5 text-xs text-espresso-700/60">No check-ins yet. They show up here as you work through the chapters.</p>
      ) : (
        <div className="mt-3 flex items-end gap-4">
          {points.map((p) => (
            <div key={p.label} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-20 w-full items-end justify-center rounded-lg bg-latte/50">
                <div
                  className="w-7 rounded-t-md bg-caramel-500"
                  style={{ height: `${(p.value / 10) * 100}%`, minHeight: "10%" }}
                />
              </div>
              <p className="font-display text-sm font-bold text-espresso-950">{p.value}</p>
              <p className="text-center text-[10.5px] leading-tight text-espresso-700/60">{p.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
