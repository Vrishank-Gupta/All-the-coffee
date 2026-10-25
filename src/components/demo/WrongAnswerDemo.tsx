import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, CircleCheck } from "lucide-react";
import { AppFrame } from "./AppFrame";
import { FixLoopComposer } from "./FixLoopComposer";

type Stage = "broken" | "fixed";

const PEOPLE = 8;
const SALARY = 1200000;
const MINUTES = 60;
const BUGGY_HOURS = 2200;
const CORRECT_HOURS = 2000;

function cost(hours: number) {
  return Math.round(PEOPLE * (SALARY / hours) * (MINUTES / 60));
}

export function WrongAnswerDemo() {
  const [stage, setStage] = useState<Stage>("broken");
  const wrong = cost(BUGGY_HOURS);
  const correct = cost(CORRECT_HOURS);

  return (
    <div className="not-prose my-6">
      <AppFrame label="Meeting Cost Calculator (buggy version)">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 text-sm text-espresso-700/80">
            <p>
              <span className="font-semibold text-espresso-900">8</span> people &middot;{" "}
              <span className="font-semibold text-espresso-900">₹12,00,000</span> salary &middot;{" "}
              <span className="font-semibold text-espresso-900">60</span> minutes
            </p>
            <p className="text-xs text-espresso-700/60">Expected result: ₹4,800</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-latte/60 to-caramel-100/40 p-4 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={stage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`font-display text-3xl font-bold tabular-nums ${
                  stage === "broken" ? "text-brick-600" : "text-sage-600"
                }`}
              >
                ₹{(stage === "broken" ? wrong : correct).toLocaleString("en-IN")}
              </motion.p>
            </AnimatePresence>
            <p className="mt-1 text-xs text-espresso-700/60">
              {stage === "broken" ? "looks fine… but it's wrong" : "fixed and verified"}
            </p>
          </div>
        </div>
      </AppFrame>

      {stage === "broken" ? (
        <FixLoopComposer
          expectedDefault="8 people, salary 1200000, 60 minutes should cost ₹4,800"
          happenedDefault={`it shows ₹${wrong.toLocaleString("en-IN")}`}
          errorDefault="none"
          onSend={() => setStage("fixed")}
        />
      ) : (
        <div className="flex items-start gap-2 rounded-2xl border border-sage-200 bg-sage-50 p-4">
          <Bot className="mt-0.5 h-5 w-5 shrink-0 text-sage-700" />
          <p className="text-[14px] leading-relaxed text-espresso-900/85">
            Found it: the calculation divided your salary by <strong>2,200</strong> hours instead of{" "}
            <strong>2,000</strong>. I've fixed it. <CircleCheck className="inline h-4 w-4 text-sage-600" /> Tested:
            8 people, ₹12,00,000 and 60 minutes now gives ₹4,800.
          </p>
        </div>
      )}
    </div>
  );
}
