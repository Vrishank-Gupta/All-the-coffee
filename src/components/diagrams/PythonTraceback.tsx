export function PythonTraceback() {
  return (
    <figure className="not-prose my-6">
      <div className="rounded-2xl border border-espresso-900/10 bg-espresso-950 p-5 shadow-soft">
        <pre className="overflow-x-auto font-mono text-[12.5px] leading-relaxed text-caramel-100/70">
          <span className="text-caramel-100/50">Traceback (most recent call last):</span>{"\n"}
          <span className="text-caramel-100/50">{"  "}File "merge_sales.py", line 14, in &lt;module&gt;</span>{"\n"}
          <span className="rounded bg-teal-500/20 px-1 text-teal-300">{"    "}total = table["Amount"].sum()</span>{"\n"}
          <span className="text-caramel-100/50">{"            "}~~~~~^^^^^^^^^^</span>{"\n"}
          <span className="rounded bg-brick-500/25 px-1 font-semibold text-brick-200">KeyError: 'Amount'</span>
        </pre>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-[11px] font-bold tracking-wide text-brick-300/90 uppercase">1. Read this line first</p>
            <p className="mt-0.5 text-[13px] text-caramel-50/90">
              <code className="rounded bg-brick-500/25 px-1 text-brick-200">KeyError: 'Amount'</code> means "I looked
              for a column called Amount and couldn't find it."
            </p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-[11px] font-bold tracking-wide text-teal-300/90 uppercase">2. Then find where</p>
            <p className="mt-0.5 text-[13px] text-caramel-50/90">
              Line 14 of your script, shown right above the error. The rest is usually safe to ignore.
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-espresso-700/70">
        Read the last line first, then look at the line number it points to. That's almost always enough.
      </figcaption>
    </figure>
  );
}
