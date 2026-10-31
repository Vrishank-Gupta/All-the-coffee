import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, FileSpreadsheet } from "lucide-react";

// A one-glance preview of the spreadsheet cleaner for the phone's first
// screen: three typical messy cells get fixed one after another, on a loop.
// Taps jump to the full demo further down.

const SAMPLES = [
  { messy: "RAHUL VERMA", clean: "Rahul Verma" },
  { messy: "2026-04-05", clean: "05 Apr 2026" },
  { messy: '"62,000"', clean: "₹62,000" },
];

export function CleanerPeek({ onTap }: { onTap?: () => void }) {
  const reduceMotion = useReducedMotion();
  const [fixed, setFixed] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    // 0..3 cells fixed, then a pause on the finished state before restarting.
    const id = window.setInterval(() => setFixed((n) => (n >= SAMPLES.length + 2 ? 0 : n + 1)), 800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const shown = reduceMotion ? SAMPLES.length : Math.min(fixed, SAMPLES.length);

  return (
    <a
      href="#demo"
      onClick={onTap}
      className="mt-5 block rounded-2xl border border-espresso-900/10 bg-cream p-3.5 shadow-soft transition hover:border-caramel-400/60 lg:hidden"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-espresso-800">
          <FileSpreadsheet className="h-4 w-4 text-sage-600" /> A tool you'll build: messy sheet, one click
        </span>
        <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-caramel-700">
          Watch <ArrowDown className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="mt-2.5 space-y-1.5 font-mono text-[12px]">
        {SAMPLES.map((s, i) => {
          const done = i < shown;
          return (
            <div key={s.messy} className="flex items-center gap-2">
              <span className="w-[42%] truncate rounded bg-caramel-100 px-2 py-1 text-caramel-800">{s.messy}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-espresso-400" />
              <span
                className={`flex-1 truncate rounded px-2 py-1 transition-colors duration-500 ${
                  done ? "bg-sage-100 text-sage-800" : "bg-espresso-900/5 text-espresso-700/30"
                }`}
              >
                {done ? s.clean : "…"}
              </span>
            </div>
          );
        })}
      </div>
    </a>
  );
}
