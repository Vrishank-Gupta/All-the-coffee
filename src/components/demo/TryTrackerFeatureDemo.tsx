import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { AppFrame } from "./AppFrame";
import { FollowUpTracker, type TrackerFeatures } from "./FollowUpTracker";

const OPTIONS: { key: keyof TrackerFeatures; label: string }[] = [
  { key: "overdue", label: "Show overdue items in red" },
  { key: "personFilter", label: "Add a filter by person" },
];

export function TryTrackerFeatureDemo() {
  const [features, setFeatures] = useState<TrackerFeatures>({});
  const [loading, setLoading] = useState<string | null>(null);

  function askForFeature(key: keyof TrackerFeatures) {
    if (features[key] || loading) return;
    setLoading(key);
    window.setTimeout(() => {
      setFeatures((f) => ({ ...f, [key]: true }));
      setLoading(null);
    }, 900);
  }

  return (
    <div className="not-prose my-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {OPTIONS.map((opt) => {
          const done = !!features[opt.key];
          const isLoading = loading === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => askForFeature(opt.key)}
              disabled={done || !!loading}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                done
                  ? "border-sage-300 bg-sage-100 text-sage-700"
                  : "border-caramel-400/50 bg-cream text-caramel-700 hover:bg-caramel-100 disabled:opacity-50"
              }`}
            >
              {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              {done ? `Added: ${opt.label}` : isLoading ? "Asking AI…" : `Ask AI to add: ${opt.label}`}
            </button>
          );
        })}
      </div>
      <AppFrame label="follow-up-tracker.ai">
        <FollowUpTracker persist features={features} storageKey="atc-ch4-tracker-tryit" />
      </AppFrame>
    </div>
  );
}
