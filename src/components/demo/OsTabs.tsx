import { useState, type ReactNode } from "react";
import { Monitor, Laptop } from "lucide-react";

type Os = "windows" | "mac";

// Side-by-side instructions for Windows and Mac, one visible at a time.
export function OsTabs({ windows, mac }: { windows: ReactNode; mac: ReactNode }) {
  const [os, setOs] = useState<Os>("windows");

  const tabs: { key: Os; label: string; icon: ReactNode }[] = [
    { key: "windows", label: "Windows", icon: <Monitor className="h-3.5 w-3.5" /> },
    { key: "mac", label: "Mac", icon: <Laptop className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="not-prose my-5 overflow-hidden rounded-2xl border border-espresso-900/10 bg-cream">
      <div className="flex gap-1.5 border-b border-espresso-900/10 bg-latte/50 px-4 py-2.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setOs(t.key)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              os === t.key ? "bg-espresso-950 text-caramel-100" : "bg-white/70 text-espresso-700 hover:bg-white"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div className="px-5 py-4 text-[15px] leading-relaxed text-espresso-900/90">{os === "windows" ? windows : mac}</div>
    </div>
  );
}
