import { Table2, FileText } from "lucide-react";

export function FileFormatCompare() {
  return (
    <figure className="not-prose my-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-sage-200 bg-sage-50 p-4">
          <div className="flex items-center gap-2">
            <Table2 className="h-5 w-5 text-sage-700" strokeWidth={1.7} />
            <span className="font-display text-base font-semibold text-espresso-950">.xlsx: Excel</span>
          </div>
          <div className="mt-3 overflow-hidden rounded-lg border border-sage-300/60">
            <div className="grid grid-cols-3 bg-sage-200/60 text-[10px] font-bold text-sage-900">
              <div className="border-r border-sage-300/60 px-2 py-1">Name</div>
              <div className="border-r border-sage-300/60 px-2 py-1">Amt</div>
              <div className="px-2 py-1">Date</div>
            </div>
            <div className="grid grid-cols-3 bg-white text-[10px] text-espresso-800">
              <div className="border-r border-sage-100 px-2 py-1">Priya</div>
              <div className="border-r border-sage-100 px-2 py-1 font-semibold text-sage-700">45,000</div>
              <div className="px-2 py-1">3 Apr</div>
            </div>
          </div>
          <p className="mt-2 text-[12.5px] text-espresso-700/75">Keeps formatting, formulas, colours, multiple sheets.</p>
        </div>
        <div className="rounded-2xl border border-espresso-900/10 bg-espresso-950 p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-caramel-300" strokeWidth={1.7} />
            <span className="font-display text-base font-semibold text-caramel-50">.csv: plain text</span>
          </div>
          <pre className="mt-3 rounded-lg bg-black/30 p-2 font-mono text-[10.5px] text-caramel-100/90">
Name,Amount,Date{"\n"}Priya,45000,03/04/2026
          </pre>
          <p className="mt-2 text-[12.5px] text-caramel-100/70">Keeps only the raw data; commas separate the columns.</p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-espresso-700/70">
        Excel keeps the decoration. CSV keeps only the data, which is exactly why almost every system can read it.
      </figcaption>
    </figure>
  );
}
