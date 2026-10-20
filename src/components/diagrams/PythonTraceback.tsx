export function PythonTraceback() {
  return (
    <figure className="not-prose my-6">
      <div className="rounded-2xl border border-espresso-900/10 bg-espresso-950 p-5 shadow-soft">
        <pre className="overflow-x-auto font-mono text-[12.5px] leading-relaxed text-caramel-100/70">
          <span className="text-caramel-100/50">{"Traceback (most recent call last):"}</span>{"\n"}
          <span className="text-caramel-100/50">{'  File ".../pandas/core/indexes/base.py", line 3812, in get_loc'}</span>{"\n"}
          <span className="text-caramel-100/50">{"    return self._engine.get_loc(casted_key)"}</span>{"\n"}
          <span className="italic text-caramel-100/40">{"  ... (lines from inside pandas) ..."}</span>{"\n"}
          <span className="text-caramel-100/50">{"KeyError: 'Amount'"}</span>{"\n"}
          {"\n"}
          <span className="text-caramel-100/50">{"The above exception was the direct cause of the following exception:"}</span>{"\n"}
          {"\n"}
          <span className="text-caramel-100/50">{"Traceback (most recent call last):"}</span>{"\n"}
          <span className="rounded bg-teal-500/20 px-1 text-teal-300">{'  File ".../sales-merge/merge_sales.py", line 14, in <module>'}</span>{"\n"}
          <span className="rounded bg-teal-500/20 px-1 text-teal-300">{'    total = table["Amount"].sum()'}</span>{"\n"}
          <span className="text-caramel-100/50">{"            ~~~~~^^^^^^^^^^"}</span>{"\n"}
          <span className="text-caramel-100/50">{'  File ".../pandas/core/frame.py", line 4113, in __getitem__'}</span>{"\n"}
          <span className="text-caramel-100/50">{"    indexer = self.columns.get_loc(key)"}</span>{"\n"}
          <span className="italic text-caramel-100/40">{"  ... (lines from inside pandas) ..."}</span>{"\n"}
          <span className="rounded bg-brick-500/25 px-1 font-semibold text-brick-200">{"KeyError: 'Amount'"}</span>
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
            <p className="text-[11px] font-bold tracking-wide text-teal-300/90 uppercase">2. Then find your line</p>
            <p className="mt-0.5 text-[13px] text-caramel-50/90">
              Then find the line that names your own file (merge_sales.py). Lines from pandas files you didn't write
              are safe to ignore.
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-espresso-700/70">
        Read the last line first, then find the line that names your own file. That's almost always enough.
      </figcaption>
    </figure>
  );
}
