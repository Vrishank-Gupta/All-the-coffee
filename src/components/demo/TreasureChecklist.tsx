import { motion } from "framer-motion";
import { CheckCircle2, Circle, PartyPopper } from "lucide-react";
import { Celebration } from "./Celebration";

export interface TreasureItem {
  key: string;
  label: string;
  tag: string;
}

export function TreasureChecklist({
  items,
  found,
  celebrateTrigger,
}: {
  items: TreasureItem[];
  found: Set<string>;
  celebrateTrigger: number;
}) {
  const allFound = items.every((i) => found.has(i.key));

  return (
    <div className="not-prose relative my-4 overflow-hidden rounded-2xl border border-caramel-300/50 bg-caramel-100/30 p-4">
      <Celebration trigger={celebrateTrigger} />
      <p className="mb-2.5 text-xs font-semibold tracking-wide text-caramel-700 uppercase">
        Find all three to finish the treasure hunt
      </p>
      <div className="grid gap-2 sm:grid-cols-3">
        {items.map((item) => {
          const isFound = found.has(item.key);
          return (
            <motion.div
              key={item.key}
              animate={isFound ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                isFound
                  ? "border-sage-300 bg-sage-100 text-sage-700"
                  : "border-espresso-900/10 bg-white text-espresso-700/60"
              }`}
            >
              {isFound ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <Circle className="h-4 w-4 shrink-0" />}
              <span>{item.label}</span>
              <span className="ml-auto rounded-full bg-black/5 px-1.5 py-0.5 text-[10px] font-bold">{item.tag}</span>
            </motion.div>
          );
        })}
      </div>
      {allFound && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-sage-700"
        >
          <PartyPopper className="h-4 w-4" /> All three found: you've read real code.
        </motion.p>
      )}
    </div>
  );
}
