import { TOTAL_CHAPTERS } from "../../lib/progress";

export function ProgressDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Chapter ${current + 1} of ${TOTAL_CHAPTERS}`}>
      {Array.from({ length: TOTAL_CHAPTERS }).map((_, i) => {
        const isCurrent = i === current;
        const isDone = i < current;
        return (
          <span
            key={i}
            className={[
              "rounded-full transition-all duration-300",
              isCurrent ? "h-2.5 w-6 bg-caramel-500" : "h-2.5 w-2.5",
              !isCurrent && isDone ? "bg-caramel-300" : "",
              !isCurrent && !isDone ? "bg-espresso-900/10" : "",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
