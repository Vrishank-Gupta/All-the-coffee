import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Terminal, CircleCheck } from "lucide-react";
import { AppFrame } from "./AppFrame";
import { FixLoopComposer } from "./FixLoopComposer";

type Stage = "idle" | "clicked" | "error" | "fixed";

export function BrokenCalcDemo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [shake, setShake] = useState(false);

  function handleCalculate() {
    if (stage !== "idle") return;
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
    window.setTimeout(() => setStage("clicked"), 150);
  }

  return (
    <div className="not-prose my-6 space-y-3">
      <AppFrame label="broken-calculator.html">
        <div className="space-y-2 text-sm text-espresso-700/80">
          <p>
            People: <strong className="text-espresso-900">8</strong> &middot; Salary:{" "}
            <strong className="text-espresso-900">₹12,00,000</strong> &middot; Minutes:{" "}
            <strong className="text-espresso-900">60</strong>
          </p>
        </div>
        <motion.button
          onClick={handleCalculate}
          animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="mt-3 w-full rounded-lg bg-espresso-950 px-4 py-2.5 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800 disabled:opacity-60"
          disabled={stage !== "idle"}
        >
          Calculate
        </motion.button>
        <div className="mt-4 min-h-10 text-center">
          <AnimatePresence mode="wait">
            {stage === "fixed" ? (
              <motion.p
                key="fixed"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl font-bold text-sage-600"
              >
                This meeting cost ₹4,800
              </motion.p>
            ) : (
              <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-espresso-700/40 italic">
                {stage === "idle" ? "(nothing here yet)" : "…nothing happened."}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </AppFrame>

      {stage === "clicked" && (
        <button
          onClick={() => setStage("error")}
          className="w-full rounded-xl border border-brick-300 bg-brick-50 px-5 py-3 text-sm font-semibold text-brick-700 transition hover:bg-brick-100"
        >
          Show me the hidden error
        </button>
      )}

      {(stage === "error" || stage === "fixed") && (
        <div className="overflow-hidden rounded-2xl border border-espresso-900/15 bg-espresso-950 shadow-soft">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2">
            <Terminal className="h-3.5 w-3.5 text-caramel-300" />
            <span className="font-mono text-[11px] text-caramel-200/70">console</span>
          </div>
          <p className="px-4 py-3 font-mono text-[12.5px] text-brick-300">
            Uncaught ReferenceError:{" "}
            <span className="rounded bg-caramel-200 px-1 text-caramel-900">totl</span> is not defined
            <span className="text-caramel-100/40"> (at line 17)</span>
          </p>
        </div>
      )}

      {stage === "error" && (
        <FixLoopComposer
          expectedDefault="clicking Calculate shows the meeting cost."
          happenedDefault="nothing happens when I click it."
          errorDefault="Uncaught ReferenceError: totl is not defined (line 17)"
          onSend={() => setStage("fixed")}
        />
      )}

      {stage === "fixed" && (
        <div className="flex items-start gap-2 rounded-2xl border border-sage-200 bg-sage-50 p-4">
          <Bot className="mt-0.5 h-5 w-5 shrink-0 text-sage-700" />
          <p className="text-[14px] leading-relaxed text-espresso-900/85">
            Found it: line 17 said <code className="rounded bg-white px-1 font-mono text-[12.5px]">totl</code>{" "}
            but the result was stored as <code className="rounded bg-white px-1 font-mono text-[12.5px]">total</code>.
            One-letter typo. Fixed and tested. <CircleCheck className="inline h-4 w-4 text-sage-600" />
          </p>
        </div>
      )}
    </div>
  );
}
