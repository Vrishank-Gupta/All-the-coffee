import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Copy, Check, Smartphone, ShieldCheck, Link2 } from "lucide-react";
import { AppFrame } from "./AppFrame";
import { MeetingCostCalculator } from "./MeetingCostCalculator";

type Stage = "idle" | "confirm" | "published";

const FAKE_URL = "https://claude.ai/public/artifacts/meeting-cost-7f3a9c";

export function PublishFlowDemo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [copied, setCopied] = useState(false);
  const [checks, setChecks] = useState<Set<string>>(new Set());

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(FAKE_URL);
    } catch {
      // clipboard unavailable
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function toggleCheck(key: string) {
    setChecks((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="not-prose my-6">
      <AppFrame label="meeting-cost-calculator.ai">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-espresso-900">Your Meeting Cost Calculator</p>
          {stage === "idle" && (
            <button
              onClick={() => setStage("confirm")}
              className="flex items-center gap-1.5 rounded-lg bg-espresso-950 px-3 py-1.5 text-xs font-semibold text-caramel-100 hover:bg-espresso-800"
            >
              <Rocket className="h-3.5 w-3.5" /> Publish
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {stage === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-xl border border-caramel-300/50 bg-caramel-100/40 p-3.5"
            >
              <p className="text-[13px] text-espresso-800">
                Anyone with the link will be able to open and use this tool. Your Claude account name won't be
                shown.
              </p>
              <button
                onClick={() => setStage("published")}
                className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-espresso-950 px-3 py-1.5 text-xs font-semibold text-caramel-100 hover:bg-espresso-800"
              >
                <Rocket className="h-3.5 w-3.5" /> Publish anyway
              </button>
            </motion.div>
          )}

          {stage === "published" && (
            <motion.div key="published" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 space-y-3">
              <div className="flex items-center gap-2 rounded-xl border border-sage-200 bg-sage-50 px-3 py-2.5">
                <Link2 className="h-4 w-4 shrink-0 text-sage-700" />
                <code className="flex-1 truncate text-[12px] text-espresso-900">{FAKE_URL}</code>
                <button onClick={copyUrl} className="shrink-0 rounded-md bg-sage-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-sage-700">
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>

              <div className="rounded-xl border border-espresso-900/10 bg-white p-3">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-espresso-700/70">
                  <ShieldCheck className="h-3.5 w-3.5" /> Test it like a stranger would
                </p>
                <div className="rounded-lg border border-dashed border-espresso-900/15 p-2.5">
                  <MeetingCostCalculator />
                </div>
                <div className="mt-3 space-y-1.5">
                  {[
                    { key: "opens", label: "It opens, with no login needed" },
                    { key: "works", label: "8 people, 1200000, 60 minutes still gives ₹4,800" },
                    { key: "phone", label: "It looks right on a phone-sized screen too" },
                  ].map((c) => (
                    <button
                      key={c.key}
                      onClick={() => toggleCheck(c.key)}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12.5px] text-espresso-800 hover:bg-latte/40"
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          checks.has(c.key) ? "border-sage-500 bg-sage-500 text-white" : "border-espresso-900/25"
                        }`}
                      >
                        {checks.has(c.key) && <Check className="h-3 w-3" />}
                      </span>
                      {c.label}
                    </button>
                  ))}
                </div>
                {checks.size === 3 && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-sage-700">
                    <Smartphone className="h-3.5 w-3.5" /> All checked, safe to send.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AppFrame>
    </div>
  );
}
