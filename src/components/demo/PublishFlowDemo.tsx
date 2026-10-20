import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Smartphone, ShieldCheck, Link2, FolderUp, Loader2, Lock, Globe } from "lucide-react";
import { AppFrame } from "./AppFrame";
import { MeetingCostCalculator } from "./MeetingCostCalculator";

type Stage = "idle" | "deploying" | "private" | "confirm" | "public";

// Made-up address for the demo; a real one ends in .netlify.app too.
const FAKE_URL = "https://bright-meeting-cost.netlify.app";

export function PublishFlowDemo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [copied, setCopied] = useState(false);
  const [checks, setChecks] = useState<Set<string>>(new Set());

  function dropFolder() {
    setStage("deploying");
    window.setTimeout(() => setStage("private"), 1100);
  }

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
      <AppFrame label="app.netlify.com/drop">
        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.button
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={dropFolder}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-caramel-400/50 bg-caramel-100/30 py-8 text-center font-semibold text-caramel-700 transition hover:bg-caramel-100/60"
            >
              <FolderUp className="h-6 w-6" />
              Drag and drop your project folder here
              <span className="text-xs font-medium text-espresso-700/60">
                Click to drop <code className="rounded bg-white px-1">meeting-cost-calculator</code> (it holds index.html)
              </span>
            </motion.button>
          )}

          {stage === "deploying" && (
            <motion.p
              key="deploying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 py-8 text-sm font-semibold text-espresso-700"
            >
              <Loader2 className="h-4 w-4 animate-spin" /> Uploading and deploying your folder…
            </motion.p>
          )}

          {(stage === "private" || stage === "confirm") && (
            <motion.div key="private" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="flex items-center gap-2 rounded-xl border border-espresso-900/10 bg-white px-3 py-2.5">
                <Link2 className="h-4 w-4 shrink-0 text-espresso-700/60" />
                <code className="flex-1 truncate text-[12px] text-espresso-900">{FAKE_URL}</code>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-latte px-2 py-0.5 text-[11px] font-semibold text-espresso-700">
                  <Lock className="h-3 w-3" /> Private
                </span>
              </div>
              <p className="text-[13px] text-espresso-800">
                Deployed. Right now only you can open it, after logging in to Netlify. A stranger would see a "you
                don't have access" page.
              </p>
              {stage === "private" && (
                <button
                  onClick={() => setStage("confirm")}
                  className="flex items-center gap-1.5 rounded-lg bg-espresso-950 px-3 py-1.5 text-xs font-semibold text-caramel-100 hover:bg-espresso-800"
                >
                  <Globe className="h-3.5 w-3.5" /> Make public
                </button>
              )}
              {stage === "confirm" && (
                <div className="rounded-xl border border-caramel-300/50 bg-caramel-100/40 p-3.5">
                  <p className="text-[13px] text-espresso-800">
                    Anyone with the link will be able to open this site, with no login. Nobody will find it unless you
                    share the address. Everything inside the page can be seen by anyone who opens it.
                  </p>
                  <button
                    onClick={() => setStage("public")}
                    className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-espresso-950 px-3 py-1.5 text-xs font-semibold text-caramel-100 hover:bg-espresso-800"
                  >
                    <Globe className="h-3.5 w-3.5" /> Yes, make it public
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {stage === "public" && (
            <motion.div key="public" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="flex items-center gap-2 rounded-xl border border-sage-200 bg-sage-50 px-3 py-2.5">
                <Link2 className="h-4 w-4 shrink-0 text-sage-700" />
                <code className="flex-1 truncate text-[12px] text-espresso-900">{FAKE_URL}</code>
                <button onClick={copyUrl} className="shrink-0 rounded-md bg-sage-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-sage-700">
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>

              <div className="rounded-xl border border-espresso-900/10 bg-white p-3">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-espresso-700/70">
                  <ShieldCheck className="h-3.5 w-3.5" /> Test it like a stranger would, in a private window
                </p>
                <div className="rounded-lg border border-dashed border-espresso-900/15 p-2.5">
                  <MeetingCostCalculator />
                </div>
                <div className="mt-3 space-y-1.5">
                  {[
                    { key: "opens", label: "It opens in a private window, with no login and no \"you don't have access\" page" },
                    { key: "works", label: "8 people, 1200000, 60 minutes still gives ₹4,800" },
                    { key: "phone", label: "It looks right on a phone too" },
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
