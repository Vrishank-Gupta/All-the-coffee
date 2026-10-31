import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, animate, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Wand2, RotateCcw, FileSpreadsheet, CheckCircle2, Loader2 } from "lucide-react";
import { AppFrame } from "./AppFrame";
import { cleanSalesData, MESSY_SALES_CSV } from "../../lib/messySales";

// The landing page's live demo: the same messy sales file Chapter 5 uses.
// It plays itself once it is on screen (mess, then a step-by-step clean, then
// the result), so visitors see what the tool does without clicking anything.
// Unlike the chapter's version there is no date trap; it always cleans right.

const REGIONS = ["North", "South", "East", "West"];
const STANDARD_DATE = /^\d{2}\/\d{2}\/\d{4}$/;
const HEADERS = ["Name", "Region", "Amount", "Date"];

interface RawRow {
  cells: string[];
  clean: string[] | null;
  blank: boolean;
  duplicate: boolean;
  issues: boolean[];
}

function splitRow(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let quoted = false;
  for (const ch of line) {
    if (ch === '"') quoted = !quoted;
    else if (ch === "," && !quoted) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out;
}

function titleCase(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const RESULT = cleanSalesData(MESSY_SALES_CSV, "indian");

function readMessyRows(): RawRow[] {
  const seen = new Set<string>();
  let kept = 0;
  return MESSY_SALES_CSV.split("\n")
    .slice(1)
    .map((line) => {
      const cells = splitRow(line);
      const [name = "", region = "", amount = "", date = ""] = cells;
      const blank = cells.every((c) => !c.trim());
      const key = `${name.trim().toLowerCase()}|${region.trim().toLowerCase()}|${amount.replace(/\D/g, "")}`;
      const duplicate = !blank && seen.has(key);
      if (!blank) seen.add(key);
      const cleanRow = !blank && !duplicate ? RESULT.rows[kept++] : undefined;
      return {
        cells: [name, region, amount, date],
        clean: cleanRow ? [cleanRow.name, cleanRow.region, `₹${cleanRow.amount.toLocaleString("en-IN")}`, cleanRow.date] : null,
        blank,
        duplicate,
        issues: [name !== titleCase(name), !REGIONS.includes(region), !/^\d+$/.test(amount), !STANDARD_DATE.test(date)],
      };
    });
}

const RAW_ROWS = readMessyRows();

// 0 = the mess, 1 = blank and duplicate rows gone, 2 = names and regions
// fixed, 3 = amounts and dates fixed, 4 = the finished file.
type Step = 0 | 1 | 2 | 3 | 4;
const STEP_LABELS: Record<1 | 2 | 3, string> = {
  1: "Removing the blank row and 3 duplicates…",
  2: "Fixing names and regions…",
  3: "Putting every amount and date in one format…",
};
// The step at which each column (name, region, amount, date) gets fixed.
const FIXED_AT_STEP = [2, 2, 3, 3];

export function SpreadsheetCleanerHero({ onFirstUse, onAutoplay }: { onFirstUse?: () => void; onAutoplay?: () => void }) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<Step>(0);
  const [run, setRun] = useState(0);
  const timers = useRef<number[]>([]);
  const frameRef = useRef<HTMLDivElement>(null);
  const autoplayed = useRef(false);
  const used = useRef(false);

  function clearTimers() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }

  // Walks through the steps; with reduced motion it goes straight to the result.
  function play(delay: number) {
    clearTimers();
    setStep(0);
    setRun((r) => r + 1);
    const plan: [Step, number][] = reduceMotion
      ? [[4, delay]]
      : [[1, delay], [2, delay + 1000], [3, delay + 2000], [4, delay + 3100]];
    for (const [s, at] of plan) timers.current.push(window.setTimeout(() => setStep(s), at));
  }

  useEffect(() => {
    const el = frameRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || autoplayed.current) return;
        autoplayed.current = true;
        onAutoplay?.();
        play(2000);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimers();
    };
    // Runs once on mount; play and the callbacks only need their latest
    // values at the moment the demo scrolls into view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function userPlay() {
    if (!used.current) {
      used.current = true;
      onFirstUse?.();
    }
    autoplayed.current = true;
    play(step === 0 ? 0 : 1200);
  }

  const visibleRows = RAW_ROWS.filter((r) => step === 0 || (!r.blank && !r.duplicate));

  return (
    <div ref={frameRef}>
      <AppFrame label="Spreadsheet Cleaner (live demo)">
        <div className="flex items-center justify-between gap-3">
          <p className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-espresso-800">
            <FileSpreadsheet className="h-4 w-4 shrink-0 text-sage-600" />
            <span className="truncate">{step === 4 ? "sales_april_clean.csv" : "sales_april_FINAL_v2.csv"}</span>
          </p>
          <span className="shrink-0 text-xs text-espresso-700/60">{step === 4 ? RESULT.rows.length : visibleRows.length} rows</span>
        </div>

        <AnimatePresence mode="wait">
          {step < 4 ? (
            <motion.div key={`messy-${run}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mt-2.5 flex min-h-[46px] flex-wrap content-start gap-1.5 text-[11px] font-semibold">
                {step === 0 ? (
                  ["3 duplicates", "1 blank row", "6 date formats", "mixed capitals", "a number saved as text"].map((issue) => (
                    <span key={issue} className="rounded-full bg-brick-100 px-2 py-0.5 text-brick-700">
                      {issue}
                    </span>
                  ))
                ) : (
                  <span className="flex items-center gap-1.5 rounded-full bg-sage-100 px-2.5 py-1 text-sage-700">
                    <Loader2 className="h-3 w-3 animate-spin" /> {STEP_LABELS[step as 1 | 2 | 3]}
                  </span>
                )}
              </div>
              <div className="mt-1 max-h-56 overflow-auto rounded-lg border border-espresso-900/10">
                <table className="w-full text-left font-mono text-[10.5px] sm:text-[11.5px]">
                  <thead className="sticky top-0 z-10 bg-latte text-espresso-700/70">
                    <tr>
                      {HEADERS.map((h) => (
                        <th key={h} className="px-1.5 py-1 font-semibold sm:px-2">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {visibleRows.map((row) => {
                        const index = RAW_ROWS.indexOf(row);
                        return (
                          <motion.tr
                            key={index}
                            layout={!reduceMotion}
                            exit={{ opacity: 0, transition: { duration: 0.35 } }}
                            className={`border-t border-espresso-900/5 ${row.duplicate ? "bg-brick-50 text-espresso-700/50 line-through" : ""} ${row.blank ? "bg-brick-50" : ""}`}
                          >
                            {row.blank ? (
                              <td colSpan={4} className="px-1.5 py-1 text-brick-600 italic sm:px-2">
                                (blank row)
                              </td>
                            ) : (
                              row.cells.map((cell, j) => {
                                const fixed = row.clean !== null && step >= FIXED_AT_STEP[j];
                                const tone = row.duplicate
                                  ? ""
                                  : fixed && row.issues[j]
                                    ? "bg-sage-100 text-sage-800"
                                    : row.issues[j]
                                      ? "bg-caramel-100 text-caramel-800"
                                      : "";
                                return (
                                  <td key={j} className={`px-1.5 py-1 whitespace-nowrap transition-colors duration-500 sm:px-2 ${tone}`}>
                                    {fixed && row.clean ? row.clean[j] : cell || " "}
                                  </td>
                                );
                              })
                            )}
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
              <button
                onClick={userPlay}
                disabled={step > 0}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-espresso-950 px-4 py-3 text-sm font-semibold text-caramel-100 shadow-lift transition hover:bg-espresso-800 disabled:cursor-default disabled:opacity-70"
              >
                <Wand2 className="h-4 w-4" /> {step === 0 ? "Clean it" : "Cleaning…"}
              </button>
            </motion.div>
          ) : (
            <motion.div key={`clean-${run}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mt-2.5 grid grid-cols-3 gap-2 text-center">
                {[
                  ["Duplicates removed", RESULT.duplicatesRemoved],
                  ["Blank rows removed", RESULT.blankRemoved],
                  ["Dates in one format", RESULT.rows.length],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-sage-50 px-2 py-2">
                    <p className="font-display text-lg font-bold text-sage-700">{value}</p>
                    <p className="text-[10.5px] leading-tight text-espresso-700/70">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 max-h-44 overflow-auto rounded-lg border border-espresso-900/10">
                <table className="w-full text-left text-[12px]">
                  <thead className="sticky top-0 bg-latte text-espresso-700/70">
                    <tr>
                      {HEADERS.map((h) => (
                        <th key={h} className={`px-2 py-1 font-semibold ${h === "Region" ? "hidden sm:table-cell" : ""}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RESULT.rows.map((r, i) => (
                      <tr key={i} className="border-t border-espresso-900/5">
                        <td className="px-2 py-1 whitespace-nowrap">{r.name}</td>
                        <td className="hidden px-2 py-1 sm:table-cell">{r.region}</td>
                        <td className="px-2 py-1 whitespace-nowrap">₹{r.amount.toLocaleString("en-IN")}</td>
                        <td className="px-2 py-1 whitespace-nowrap">{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2.5 rounded-xl bg-latte/60 p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-espresso-700/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-sage-600" /> April total
                  </p>
                  <CountUp to={RESULT.totalAmount} instant={!!reduceMotion} />
                </div>
                <div className="mt-1.5 grid grid-cols-4 gap-1 text-[11px] text-espresso-700/75">
                  {Object.entries(RESULT.byRegion).map(([region, amount]) => (
                    <p key={region}>
                      <span className="font-semibold text-espresso-900">{region}</span>
                      <br />₹{amount.toLocaleString("en-IN")}
                    </p>
                  ))}
                </div>
              </div>
              <button
                onClick={userPlay}
                className="mt-3 flex min-h-10 items-center gap-1.5 rounded-lg border border-espresso-900/15 px-3 text-xs font-semibold text-espresso-700 transition hover:bg-latte/50"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Replay
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </AppFrame>
    </div>
  );
}

function CountUp({ to, instant }: { to: number; instant: boolean }) {
  const value = useMotionValue(instant ? to : 0);
  const text = useTransform(value, (v) => `₹${Math.round(v).toLocaleString("en-IN")}`);

  useEffect(() => {
    if (instant) return;
    const controls = animate(value, to, { duration: 1.1, ease: "easeOut" });
    return () => controls.stop();
  }, [instant, to, value]);

  return <motion.p className="font-display text-xl font-bold text-espresso-950">{text}</motion.p>;
}
