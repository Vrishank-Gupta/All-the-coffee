import { useEffect, useRef, useState } from "react";
import { Play, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ORIGINAL_SOURCE } from "../../lib/calculatorSource";
import { tokenizeLine } from "../../lib/highlight";
import { AppFrame } from "./AppFrame";
import { MeetingCostCalculator } from "./MeetingCostCalculator";

type Phase = "idle" | "thinking" | "writing" | "done";

const LINES = ORIGINAL_SOURCE.split("\n");

export function BuildWatchDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleLines, setVisibleLines] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  function start() {
    if (phase !== "idle" && phase !== "done") return;
    setPhase("thinking");
    setVisibleLines(0);
    window.setTimeout(() => setPhase("writing"), 1100);
  }

  useEffect(() => {
    if (phase !== "writing") return;
    const id = window.setInterval(() => {
      setVisibleLines((v) => {
        const next = v + 2;
        if (next >= LINES.length) {
          window.clearInterval(id);
          window.setTimeout(() => setPhase("done"), 400);
          return LINES.length;
        }
        return next;
      });
    }, 18);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [visibleLines]);

  return (
    <div className="not-prose my-6">
      {phase === "idle" && (
        <button
          onClick={start}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-caramel-400/50 bg-caramel-100/30 py-10 font-display text-base font-semibold text-caramel-700 transition hover:bg-caramel-100/60"
        >
          <Play className="h-5 w-5" /> Watch it build
        </button>
      )}

      <AnimatePresence mode="wait">
        {phase === "thinking" && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-2xl border border-espresso-900/10 bg-cream px-5 py-10 justify-center"
          >
            <Sparkles className="h-5 w-5 animate-pulse text-caramel-600" />
            <span className="font-display text-base font-medium text-espresso-800">Writing the code…</span>
          </motion.div>
        )}

        {phase === "writing" && (
          <motion.div
            key="writing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden rounded-2xl border border-espresso-900/15 bg-espresso-950 shadow-lift"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-sage-400 animate-pulse" />
              <span className="font-mono text-[11px] text-caramel-200/70">generating index.html…</span>
            </div>
            <div ref={scrollRef} className="h-56 overflow-x-auto overflow-y-hidden px-4 py-3">
              <pre className="font-mono text-[12px] leading-relaxed">
                {LINES.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="whitespace-pre text-caramel-50/90">
                    {tokenizeLine(line).map((t, j) => (
                      <span key={j} className={t.cls}>
                        {t.text}
                      </span>
                    ))}
                    {line === "" ? " " : null}
                  </div>
                ))}
                <span className="inline-block h-3.5 w-1.5 animate-caret bg-caramel-300 align-middle" />
              </pre>
            </div>
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <AppFrame label="Meeting Cost Calculator">
              <MeetingCostCalculator />
            </AppFrame>
            <button
              onClick={start}
              className="mx-auto mt-1 flex items-center gap-1.5 text-xs font-semibold text-caramel-700 hover:underline"
            >
              <Play className="h-3 w-3" /> Watch it build again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
