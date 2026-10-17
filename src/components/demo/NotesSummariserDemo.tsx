import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, FileText } from "lucide-react";
import { AppFrame } from "./AppFrame";
import { summarise, VENDOR_NOTES, SEATING_NOTES, type SummaryResult } from "../../lib/vendorNotes";

type Status = "idle" | "empty" | "loading" | "done";

export function NotesSummariserDemo({ autoPlay = false }: { autoPlay?: boolean }) {
  const [notes, setNotes] = useState(VENDOR_NOTES);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<SummaryResult | null>(null);

  function handleSummarise(text: string = notes) {
    if (!text.trim()) {
      setStatus("empty");
      setResult(null);
      return;
    }
    setStatus("loading");
    window.setTimeout(() => {
      setResult(summarise(text));
      setStatus("done");
    }, 900);
  }

  useEffect(() => {
    if (!autoPlay) return;
    const t = window.setTimeout(() => handleSummarise(VENDOR_NOTES), 700);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  return (
    <div className="not-prose my-6">
      <div className="mb-2 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setNotes(VENDOR_NOTES);
            setStatus("idle");
          }}
          className="rounded-full border border-caramel-400/50 bg-cream px-3 py-1.5 text-xs font-semibold text-caramel-700 hover:bg-caramel-100"
        >
          Load the vendor meeting notes
        </button>
        <button
          onClick={() => {
            setNotes(SEATING_NOTES);
            setStatus("idle");
          }}
          className="rounded-full border border-caramel-400/50 bg-cream px-3 py-1.5 text-xs font-semibold text-caramel-700 hover:bg-caramel-100"
        >
          Load the honesty-test notes
        </button>
        <button
          onClick={() => {
            setNotes("");
            setStatus("idle");
          }}
          className="rounded-full border border-espresso-900/15 bg-cream px-3 py-1.5 text-xs font-semibold text-espresso-700 hover:bg-latte/50"
        >
          Clear the box
        </button>
      </div>

      <AppFrame label="meeting-notes-summariser.ai">
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-espresso-700/70">
          <FileText className="h-3.5 w-3.5" /> Paste your rough notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-espresso-900/15 bg-white px-3 py-2 font-mono text-[12.5px] text-espresso-900 focus:border-caramel-500"
        />
        <button
          onClick={() => handleSummarise()}
          disabled={status === "loading"}
          className="mt-3 flex items-center gap-2 rounded-xl bg-espresso-950 px-4 py-2.5 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800 disabled:opacity-70"
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {status === "loading" ? "Working on it…" : "Summarise"}
        </button>

        <AnimatePresence mode="wait">
          {status === "empty" && (
            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 rounded-lg bg-brick-50 px-3 py-2 text-sm text-brick-700">
              Paste your notes first.
            </motion.p>
          )}
          {status === "done" && result && (
            <motion.div key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3 border-t border-espresso-900/10 pt-4">
              <div>
                <p className="text-xs font-bold tracking-wide text-caramel-700 uppercase">Summary</p>
                <p className="mt-1 text-[13.5px] text-espresso-900">{result.summary}</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wide text-caramel-700 uppercase">Decisions</p>
                <ul className="mt-1 list-disc pl-4 text-[13.5px] text-espresso-900">
                  {result.decisions.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wide text-caramel-700 uppercase">Action items</p>
                <div className="mt-1 overflow-hidden rounded-lg border border-espresso-900/10">
                  <table className="w-full text-left text-[12.5px]">
                    <thead className="bg-latte/60 text-espresso-700/70">
                      <tr>
                        <th className="px-2 py-1 font-semibold">Owner</th>
                        <th className="px-2 py-1 font-semibold">Task</th>
                        <th className="px-2 py-1 font-semibold">Due date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.actionItems.map((a, i) => (
                        <tr key={i} className="border-t border-espresso-900/5 bg-white">
                          <td className="px-2 py-1">{a.owner}</td>
                          <td className="px-2 py-1">{a.task}</td>
                          <td className="px-2 py-1">{a.due}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AppFrame>
    </div>
  );
}
