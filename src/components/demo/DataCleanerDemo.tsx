import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Wand2, Download, CheckCircle2, AlertTriangle } from "lucide-react";
import { AppFrame } from "./AppFrame";
import { cleanSalesData, MESSY_SALES_CSV, type DateStyle } from "../../lib/messySales";

export function DataCleanerDemo() {
  const [uploaded, setUploaded] = useState(false);
  const [dateStyle, setDateStyle] = useState<DateStyle>("american");
  const [cleaned, setCleaned] = useState(false);

  const result = cleanSalesData(MESSY_SALES_CSV, dateStyle);
  const isCorrect = dateStyle === "indian";

  return (
    <div className="not-prose my-6 space-y-3">
      <AppFrame label="data-cleaner.ai">
        {!uploaded ? (
          <button
            onClick={() => setUploaded(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-caramel-400/50 bg-caramel-100/30 py-8 font-semibold text-caramel-700 transition hover:bg-caramel-100/60"
          >
            <Upload className="h-5 w-5" /> Upload messy-sales.csv
          </button>
        ) : (
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm text-espresso-700/70">
              <CheckCircle2 className="h-4 w-4 text-sage-600" /> messy-sales.csv uploaded (14 rows)
            </p>
            {!cleaned ? (
              <button
                onClick={() => setCleaned(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-espresso-950 px-4 py-2.5 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800"
              >
                <Wand2 className="h-4 w-4" /> Clean it
              </button>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={dateStyle} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <Stat label="Rows in" value={result.rowsIn} />
                    <Stat label="Blank removed" value={result.blankRemoved} />
                    <Stat label="Duplicates removed" value={result.duplicatesRemoved} tone={isCorrect ? "normal" : "warn"} />
                    <Stat label="Rows out" value={result.rows.length} tone={isCorrect ? "good" : "warn"} />
                  </div>

                  <div className="mt-3 rounded-xl bg-gradient-to-br from-latte/60 to-caramel-100/40 p-3 text-center">
                    <p className="text-xs font-semibold text-espresso-700/70">Total amount</p>
                    <p className="font-display text-2xl font-bold text-espresso-950">
                      ₹{result.totalAmount.toLocaleString("en-IN")}
                    </p>
                    <div className="mt-2 grid grid-cols-4 gap-1 text-[11px] text-espresso-700/70">
                      {Object.entries(result.byRegion).map(([region, amt]) => (
                        <div key={region}>
                          <p className="font-semibold text-espresso-900">{region}</p>
                          <p>₹{amt.toLocaleString("en-IN")}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${isCorrect ? "bg-sage-50 text-sage-700" : "bg-brick-50 text-brick-700"}`}>
                    {isCorrect ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <AlertTriangle className="h-3.5 w-3.5 shrink-0" />}
                    Priya Sharma's date: <strong>{result.priyaDate}</strong>
                    {!isCorrect && "; that's wrong. Keep reading."}
                  </div>

                  <div className="mt-3 max-h-48 overflow-auto rounded-lg border border-espresso-900/10">
                    <table className="w-full text-left text-[12px]">
                      <thead className="sticky top-0 bg-latte/70 text-espresso-700/70">
                        <tr>
                          <th className="px-2 py-1 font-semibold">Name</th>
                          <th className="px-2 py-1 font-semibold">Region</th>
                          <th className="px-2 py-1 font-semibold">Amount</th>
                          <th className="px-2 py-1 font-semibold">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.rows.map((r, i) => (
                          <tr key={i} className={`border-t border-espresso-900/5 ${r.name === "Priya Sharma" ? "bg-caramel-100/40" : ""}`}>
                            <td className="px-2 py-1">{r.name}</td>
                            <td className="px-2 py-1">{r.region}</td>
                            <td className="px-2 py-1">₹{r.amount.toLocaleString("en-IN")}</td>
                            <td className="px-2 py-1">{r.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button className="mt-3 flex items-center gap-1.5 rounded-lg border border-espresso-900/15 px-3 py-1.5 text-xs font-semibold text-espresso-700 hover:bg-latte/50">
                    <Download className="h-3.5 w-3.5" /> Download clean-sales.csv
                  </button>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        )}
      </AppFrame>

      {cleaned && !isCorrect && (
        <button
          onClick={() => setDateStyle("indian")}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-brick-300 bg-brick-50 px-5 py-3 text-sm font-semibold text-brick-700 transition hover:bg-brick-100"
        >
          <AlertTriangle className="h-4 w-4" /> Add to your prompt: "my dates are Indian-style, day before month," and fix it
        </button>
      )}
      {cleaned && isCorrect && (
        <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-sage-700">
          <CheckCircle2 className="h-4 w-4" /> Fixed: this matches the checkpoint exactly.
        </p>
      )}
    </div>
  );
}

function Stat({ label, value, tone = "normal" }: { label: string; value: number; tone?: "normal" | "good" | "warn" }) {
  const toneClass = tone === "good" ? "text-sage-600" : tone === "warn" ? "text-brick-600" : "text-espresso-950";
  return (
    <div className="rounded-lg bg-latte/50 px-2 py-2 text-center">
      <p className={`font-display text-xl font-bold ${toneClass}`}>{value}</p>
      <p className="text-[10px] leading-tight text-espresso-700/60">{label}</p>
    </div>
  );
}
