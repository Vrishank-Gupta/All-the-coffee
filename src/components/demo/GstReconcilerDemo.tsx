import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, GitCompareArrows, CheckCircle2, AlertTriangle } from "lucide-react";
import { AppFrame } from "./AppFrame";
import { reconcile, GROUP_LABELS, type ReconGroup } from "../../lib/gstSample";

const GROUP_STYLE: Record<ReconGroup, string> = {
  matched: "bg-sage-50 text-sage-700",
  mismatch: "bg-caramel-100/70 text-caramel-700",
  missing: "bg-brick-50 text-brick-700",
  only2b: "bg-latte/70 text-espresso-700",
};

const rupees = (n: number | null) => (n === null ? "-" : `₹${n.toLocaleString("en-IN")}`);

export function GstReconcilerDemo() {
  const [uploaded, setUploaded] = useState(false);
  const [strict, setStrict] = useState(true);
  const [done, setDone] = useState(false);
  const [filter, setFilter] = useState<ReconGroup | "all">("all");

  const result = reconcile(strict);
  const rows = filter === "all" ? result.rows : result.rows.filter((r) => r.group === filter);

  return (
    <div className="not-prose my-6 space-y-3">
      <AppFrame label="GSTR-2B Reconciler (example)">
        {!uploaded ? (
          <button
            onClick={() => setUploaded(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-caramel-400/50 bg-caramel-100/30 py-8 font-semibold text-caramel-700 transition hover:bg-caramel-100/60"
          >
            <Upload className="h-5 w-5" /> Upload purchase-register.csv and gstr-2b.csv
          </button>
        ) : (
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm text-espresso-700/70">
              <CheckCircle2 className="h-4 w-4 text-sage-600" /> Books: 14 invoices · GSTR-2B: 13 invoices
            </p>
            {!done ? (
              <button
                onClick={() => setDone(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-espresso-950 px-4 py-2.5 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800"
              >
                <GitCompareArrows className="h-4 w-4" /> Reconcile
              </button>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={String(strict)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {(Object.keys(GROUP_LABELS) as ReconGroup[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => setFilter(filter === g ? "all" : g)}
                        className={`rounded-lg px-2 py-2 text-center transition ${GROUP_STYLE[g]} ${filter === g ? "ring-2 ring-espresso-900/40" : ""}`}
                      >
                        <p className="font-display text-xl font-bold">{result.counts[g]}</p>
                        <p className="text-[10px] font-semibold leading-tight">{GROUP_LABELS[g]}</p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 rounded-xl bg-gradient-to-br from-latte/60 to-caramel-100/40 p-3 text-center">
                    <p className="text-xs font-semibold text-espresso-700/70">Tax credit at risk</p>
                    <p className={`font-display text-2xl font-bold ${strict ? "text-brick-600" : "text-espresso-950"}`}>
                      {rupees(result.atRisk)}
                    </p>
                  </div>

                  <div className="mt-3 max-h-56 overflow-auto rounded-lg border border-espresso-900/10">
                    <table className="w-full text-left text-[12px]">
                      <thead className="sticky top-0 bg-latte/70 text-espresso-700/70">
                        <tr>
                          <th className="px-2 py-1 font-semibold">Group</th>
                          <th className="px-2 py-1 font-semibold">Supplier</th>
                          <th className="px-2 py-1 font-semibold">Invoice</th>
                          <th className="px-2 py-1 text-right font-semibold">Books tax</th>
                          <th className="px-2 py-1 text-right font-semibold">2B tax</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r, i) => (
                          <tr key={i} className="border-t border-espresso-900/5">
                            <td className="px-2 py-1">
                              <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${GROUP_STYLE[r.group]}`}>{GROUP_LABELS[r.group]}</span>
                            </td>
                            <td className="px-2 py-1">{r.supplier}</td>
                            <td className="px-2 py-1 font-mono">{r.invoice}</td>
                            <td className="px-2 py-1 text-right">{rupees(r.booksTax)}</td>
                            <td className="px-2 py-1 text-right">{rupees(r.portalTax)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        )}
      </AppFrame>

      {done && strict && (
        <button
          onClick={() => setStrict(false)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-brick-300 bg-brick-50 px-5 py-3 text-sm font-semibold text-brick-700 transition hover:bg-brick-100"
        >
          <AlertTriangle className="h-4 w-4" /> Add to your prompt: "INV/023 and INV-23 are the same invoice," and fix it
        </button>
      )}
      {done && !strict && (
        <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-sage-700">
          <CheckCircle2 className="h-4 w-4" /> Fixed: this matches the checkpoint exactly.
        </p>
      )}
    </div>
  );
}
