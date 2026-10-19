import { createContext, useContext, useState, type ReactNode } from "react";
import { Laptop } from "lucide-react";

type Os = "windows" | "mac";

interface OsCtx {
  os: Os;
  setOs: (os: Os) => void;
}

const OsContext = createContext<OsCtx | null>(null);

function detectOs(): Os {
  if (typeof navigator === "undefined") return "windows";
  return /Mac|iPhone|iPad/i.test(navigator.platform ?? navigator.userAgent) ? "mac" : "windows";
}

export function OsProvider({ children }: { children: ReactNode }) {
  const [os, setOs] = useState<Os>(detectOs);
  return <OsContext.Provider value={{ os, setOs }}>{children}</OsContext.Provider>;
}

function useOs() {
  const ctx = useContext(OsContext);
  if (!ctx) throw new Error("useOs must be used within OsProvider");
  return ctx;
}

export function OsToggle() {
  const { os, setOs } = useOs();
  return (
    <div className="not-prose my-5 flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-espresso-700/60 uppercase">
        <Laptop className="h-3.5 w-3.5" /> I'm on
      </div>
      <div className="inline-flex rounded-full border border-espresso-900/15 bg-cream p-1">
        {(["windows", "mac"] as const).map((opt) => (
          <button
            key={opt}
            onClick={() => setOs(opt)}
            className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${
              os === opt ? "bg-espresso-950 text-caramel-100" : "text-espresso-700/70 hover:text-espresso-900"
            }`}
          >
            {opt === "windows" ? "Windows" : "Mac"}
          </button>
        ))}
      </div>
    </div>
  );
}

export function OsStep({ windows, mac }: { windows: ReactNode; mac: ReactNode }) {
  const { os } = useOs();
  return <>{os === "windows" ? windows : mac}</>;
}

export function OsCommand({ windows, mac }: { windows: string; mac: string }) {
  const { os } = useOs();
  return <code className="rounded bg-latte px-1.5 py-0.5 font-mono text-[0.9em] text-espresso-900">{os === "windows" ? windows : mac}</code>;
}
