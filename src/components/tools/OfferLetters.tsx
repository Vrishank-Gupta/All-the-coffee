import { useMemo, useState } from "react";
import { FileText, Printer, Copy, Check, AlertTriangle, Upload, ChevronDown } from "lucide-react";
import { makeLetters, SAMPLE_JOINERS_CSV, DEFAULT_TEMPLATE, REQUIRED } from "../../lib/tools/letters";
import { todayIso } from "../../lib/tools/whatsapp";

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Opens the ready letters in a new tab, one per page, and starts the browser's print dialog,
// where "Save as PDF" gives one PDF with every letter.
function printLetters(texts: string[]) {
  const body = texts.map((t) => `<section>${escapeHtml(t).replace(/\n/g, "<br>")}</section>`).join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Offer letters</title><style>
    body { font: 12pt/1.6 Georgia, serif; color: #111; margin: 0; }
    section { padding: 25mm 22mm; page-break-after: always; }
    section:last-child { page-break-after: auto; }
  </style></head><body>${body}<script>window.onload = () => window.print();</script></body></html>`;
  const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export function OfferLetters() {
  const [csv, setCsv] = useState(SAMPLE_JOINERS_CSV);
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [extra, setExtra] = useState({ company: "Your Company Pvt Ltd", signatory: "HR Team", letterDate: todayIso() });
  const [open, setOpen] = useState<number | null>(2); // the first data line starts open
  const [copied, setCopied] = useState<number | null>(null);
  const [showTemplate, setShowTemplate] = useState(false);
  const { letters, missingColumns } = useMemo(() => makeLetters(csv, template, extra), [csv, template, extra]);
  const ready = letters.filter((l) => !l.problems.length);
  const broken = letters.filter((l) => l.problems.length);
  const field = "w-full rounded-lg border border-espresso-900/15 bg-white px-3 py-2 text-sm text-espresso-950 focus:border-caramel-500 focus:outline-none";

  const copy = async (row: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(row);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // clipboard blocked: nothing to do, the letter is still on screen to select
    }
  };

  return (
    <div className="not-prose grid gap-5 rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft md:grid-cols-[1fr_1.2fr]">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <label className="col-span-2 text-sm font-semibold text-espresso-900">
            Company name
            <input className={`${field} mt-1`} value={extra.company} onChange={(e) => setExtra({ ...extra, company: e.target.value })} />
          </label>
          <label className="text-sm font-semibold text-espresso-900">
            Signed by
            <input className={`${field} mt-1`} value={extra.signatory} onChange={(e) => setExtra({ ...extra, signatory: e.target.value })} />
          </label>
          <label className="text-sm font-semibold text-espresso-900">
            Letter date
            <input type="date" className={`${field} mt-1`} value={extra.letterDate} onChange={(e) => setExtra({ ...extra, letterDate: e.target.value })} />
          </label>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-espresso-900">Joiners (CSV)</p>
            <label className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-caramel-700 hover:underline">
              <Upload className="h-3.5 w-3.5" /> Upload CSV
              <input type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => e.target.files?.[0]?.text().then(setCsv)} />
            </label>
          </div>
          <textarea className={`${field} mt-1 h-40 resize-y font-mono text-[11px] leading-snug`} value={csv} onChange={(e) => setCsv(e.target.value)} spellCheck={false} />
          <p className="text-xs text-espresso-700/60">Columns needed: {REQUIRED.join(", ")}. The sample joiners are made up.</p>
        </div>
        <div>
          <button onClick={() => setShowTemplate(!showTemplate)} className="flex items-center gap-1 text-sm font-semibold text-espresso-900">
            Letter template <ChevronDown className={`h-4 w-4 transition ${showTemplate ? "rotate-180" : ""}`} />
          </button>
          {showTemplate && (
            <>
              <textarea className={`${field} mt-1 h-64 resize-y text-xs leading-relaxed`} value={template} onChange={(e) => setTemplate(e.target.value)} />
              <p className="text-xs text-espresso-700/60">
                Use any column in curly brackets, plus {"{first_name}"}, {"{ctc_words}"}, {"{company}"}, {"{signatory}"} and {"{letter_date}"}.
              </p>
            </>
          )}
        </div>
      </div>

      <div>
        {missingColumns.length > 0 ? (
          <div className="rounded-xl bg-brick-50 p-4 text-sm text-brick-700">The CSV is missing these columns: {missingColumns.join(", ")}.</div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sage-50 px-3 py-1 text-xs font-bold text-sage-700">{ready.length} letters ready</span>
              {broken.length > 0 && <span className="rounded-full bg-brick-50 px-3 py-1 text-xs font-bold text-brick-700">{broken.length} need a fix</span>}
              <button
                onClick={() => printLetters(ready.map((l) => l.text))}
                disabled={!ready.length}
                className="ml-auto flex items-center gap-1.5 rounded-xl bg-espresso-950 px-4 py-2 text-xs font-semibold text-caramel-100 transition hover:bg-espresso-800 disabled:opacity-40"
              >
                <Printer className="h-3.5 w-3.5" /> Save all {ready.length} as PDF
              </button>
            </div>
            {broken.length > 0 && (
              <ul className="mt-3 space-y-1 rounded-xl bg-brick-50 p-3 text-xs text-brick-700">
                {broken.map((l) => (
                  <li key={l.row} className="flex gap-1.5">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span><strong>{l.name}</strong> (line {l.row}): {l.problems.join("; ")}. No letter made.</span>
                  </li>
                ))}
              </ul>
            )}
            <ul className="mt-3 max-h-[28rem] space-y-2 overflow-auto pr-1">
              {ready.map((l) => (
                <li key={l.row} className="rounded-xl border border-espresso-900/10 bg-white">
                  <button onClick={() => setOpen(open === l.row ? null : l.row)} className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-semibold text-espresso-950">
                    <FileText className="h-4 w-4 text-caramel-600" /> {l.name}
                    <ChevronDown className={`ml-auto h-4 w-4 text-espresso-700/50 transition ${open === l.row ? "rotate-180" : ""}`} />
                  </button>
                  {open === l.row && (
                    <div className="border-t border-espresso-900/5 px-4 pt-3 pb-4">
                      <p className="font-serif text-[13px] leading-relaxed whitespace-pre-wrap text-espresso-900" data-testid="letter-text">{l.text}</p>
                      <button onClick={() => copy(l.row, l.text)} className="mt-3 flex items-center gap-1 rounded-lg border border-espresso-900/15 px-3 py-1.5 text-xs font-semibold text-espresso-700 hover:bg-latte/50">
                        {copied === l.row ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy letter</>}
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="mt-3 text-[11px] leading-snug text-espresso-700/60">
          Everything happens in your browser; the CSV isn't uploaded anywhere. Have HR or legal approve your template
          before sending real letters.
        </p>
      </div>
    </div>
  );
}
