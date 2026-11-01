import { useState } from "react";
import { FileUp, Copy, Check, Download, Loader2, AlertTriangle } from "lucide-react";
import { readInvoiceText, checkText, toTsv, toCsv, type InvoiceRow } from "../../lib/tools/invoices";
import { loadPdfJs, pdfToText } from "../../lib/tools/pdfText";

const SAMPLES = [
  "20261103_brightpack", "20261104_sharma", "20261105_cloudnine", "20261106_deccan", "20261107_gujarat", "20261107_mumbai",
  "20261110_patel", "20261111_delhi", "20261112_pune", "20261113_bengaluru", "20261114_kerala", "20261115_hyderabad",
].map((n) => `${n}.pdf`);

const money = (n: number | null) => (n === null ? "not found" : `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`);
const ROW_TONE: Record<InvoiceRow["status"], string> = { ok: "", mismatch: "bg-brick-50", incomplete: "bg-caramel-100/50", unreadable: "bg-caramel-100/50" };

export function InvoiceReader() {
  const [rows, setRows] = useState<InvoiceRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  async function read(files: { name: string; data: () => Promise<ArrayBuffer> }[]) {
    setBusy(true);
    setRows([]);
    try {
      const pdfjs = await loadPdfJs();
      for (const f of files) {
        let row: InvoiceRow;
        try {
          row = readInvoiceText(await pdfToText(pdfjs, new Uint8Array(await f.data())), f.name);
        } catch {
          row = readInvoiceText("", f.name); // not a PDF, or a damaged one
        }
        setRows((r) => [...r, row]);
      }
    } finally {
      setBusy(false);
    }
  }

  const loadSamples = () => read(SAMPLES.map((name) => ({ name, data: () => fetch(`/downloads/sample-invoices/${name}`).then((r) => r.arrayBuffer()) })));
  const ok = rows.filter((r) => r.status === "ok").length;
  const flagged = rows.filter((r) => r.status !== "ok");
  const sum = (k: "taxable" | "gst" | "total") => rows.reduce((a, r) => a + (r[k] ?? 0), 0);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toTsv(rows));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard blocked: the CSV download still works
    }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "invoices.csv" });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="not-prose rounded-2xl border border-espresso-900/10 bg-cream p-5 shadow-soft">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-caramel-400/50 bg-caramel-100/30 py-6 font-semibold text-caramel-700 transition hover:bg-caramel-100/60">
          <FileUp className="h-5 w-5" /> Choose invoice PDFs
          <input
            type="file"
            accept="application/pdf,.pdf"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = [...(e.target.files ?? [])];
              if (files.length) read(files.map((f) => ({ name: f.name, data: () => f.arrayBuffer() })));
              e.target.value = "";
            }}
          />
        </label>
        <button onClick={loadSamples} disabled={busy} className="rounded-xl border border-espresso-900/15 px-5 py-3 text-sm font-semibold text-espresso-800 hover:bg-latte/50 disabled:opacity-40">
          Try 12 sample invoices
        </button>
      </div>

      {(rows.length > 0 || busy) && (
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            {busy && <span className="flex items-center gap-1 text-espresso-700"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Reading {rows.length + 1}...</span>}
            <span className="rounded-full bg-sage-50 px-3 py-1 text-sage-700">{ok} OK</span>
            {flagged.length > 0 && <span className="rounded-full bg-brick-50 px-3 py-1 text-brick-700">{flagged.length} need a look</span>}
            {!busy && (
              <span className="ml-auto flex gap-2">
                <button onClick={copy} className="flex items-center gap-1 rounded-lg border border-espresso-900/15 px-3 py-1.5 text-espresso-700 hover:bg-latte/50">
                  {copied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy for Excel</>}
                </button>
                <button onClick={download} className="flex items-center gap-1 rounded-lg bg-espresso-950 px-3 py-1.5 text-caramel-100 hover:bg-espresso-800">
                  <Download className="h-3.5 w-3.5" /> Download CSV
                </button>
              </span>
            )}
          </div>
          <div className="mt-3 overflow-x-auto rounded-xl border border-espresso-900/10 bg-white">
            <table className="w-full min-w-[720px] text-left text-[12px] tabular-nums">
              <thead className="bg-latte/60 text-espresso-700/80">
                <tr>{["Vendor", "GSTIN", "Invoice no", "Date", "Taxable", "GST", "Total", "Check"].map((h) => <th key={h} className="px-2 py-1.5 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={`border-t border-espresso-900/5 ${ROW_TONE[r.status]}`} data-status={r.status}>
                    <td className="px-2 py-1.5 font-semibold">{r.vendor || r.file}</td>
                    <td className="px-2 py-1.5 font-mono">{r.gstin || "-"}</td>
                    <td className="px-2 py-1.5 font-mono">{r.number || "-"}</td>
                    <td className="px-2 py-1.5 whitespace-nowrap">{r.date || "-"}</td>
                    <td className="px-2 py-1.5">{r.status === "unreadable" ? "-" : money(r.taxable)}</td>
                    <td className="px-2 py-1.5">{r.status === "unreadable" ? "-" : money(r.gst)}</td>
                    <td className="px-2 py-1.5 font-semibold">{r.status === "unreadable" ? "-" : money(r.total)}</td>
                    <td className="px-2 py-1.5">
                      {r.status === "ok" ? <span className="font-semibold text-sage-700">OK</span> : <span className="flex items-center gap-1 font-semibold text-brick-700"><AlertTriangle className="h-3 w-3 shrink-0" />{checkText(r)}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
              {!busy && rows.length > 0 && (
                <tfoot className="border-t-2 border-espresso-900/10 font-bold">
                  <tr>
                    <td className="px-2 py-2" colSpan={4}>Total of {rows.filter((r) => r.total !== null).length} invoices read</td>
                    <td className="px-2 py-2">{money(sum("taxable"))}</td>
                    <td className="px-2 py-2">{money(sum("gst"))}</td>
                    <td className="px-2 py-2" data-testid="grand-total">{money(sum("total"))}</td>
                    <td />
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      )}
      <p className="mt-3 text-[11px] leading-snug text-espresso-700/60">
        Your PDFs are read inside your browser and never uploaded. It reads invoices whose fields are labelled (Invoice
        No, Date, Taxable Value, CGST, Total...); anything it can't find says so instead of guessing. Check flagged rows
        against the invoice before you pay or file anything.
      </p>
    </div>
  );
}
