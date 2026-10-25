import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { AppFrame } from "./AppFrame";
import { MeetingCostCalculator, type CalcFeatures } from "./MeetingCostCalculator";

const OPTIONS: { key: keyof CalcFeatures; label: string; prompt: string }[] = [
  { key: "taxiMeter", label: "A taxi-meter countdown", prompt: "Add a Start button that counts up the cost every second, like a taxi meter." },
  { key: "currency", label: "A currency dropdown", prompt: "Add a dropdown so I can choose between Rupees, Dollars and Euros." },
  { key: "perMinute", label: "Cost per minute", prompt: "Show the cost per minute as well as the total." },
];

export function TryFeatureDemo() {
  const [features, setFeatures] = useState<CalcFeatures>({});
  const [loading, setLoading] = useState<string | null>(null);

  function askForFeature(key: keyof CalcFeatures) {
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
              title={opt.prompt}
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
      <AppFrame label="Meeting Cost Calculator">
        <MeetingCostCalculator features={features} />
      </AppFrame>
    </div>
  );
}
