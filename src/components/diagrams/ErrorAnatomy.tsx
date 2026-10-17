const PARTS = [
  { text: "Uncaught ReferenceError", label: "The type of problem", meaning: "“You referred to something I don't know about.”", tone: "bg-brick-100 text-brick-700" },
  { text: "totl is not defined", label: "The detail", meaning: "“I've never heard of anything called totl.”", tone: "bg-caramel-200 text-caramel-800" },
  { text: "line 17", label: "Where it happened", meaning: "“Look here.”", tone: "bg-teal-100 text-teal-700" },
];

export function ErrorAnatomy() {
  return (
    <figure className="not-prose my-6">
      <div className="rounded-2xl border border-espresso-900/10 bg-espresso-950 p-5 shadow-soft">
        <p className="mb-4 font-mono text-sm text-brick-300">
          <span className={`rounded px-1.5 py-0.5 ${PARTS[0].tone}`}>Uncaught ReferenceError</span>:{" "}
          <span className={`rounded px-1.5 py-0.5 ${PARTS[1].tone}`}>totl is not defined</span>{" "}
          <span className={`rounded px-1.5 py-0.5 ${PARTS[2].tone}`}>(line 17)</span>
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {PARTS.map((p) => (
            <div key={p.label} className="rounded-xl bg-white/5 p-3">
              <span className={`inline-block rounded px-2 py-0.5 font-mono text-[11px] ${p.tone}`}>{p.text}</span>
              <p className="mt-2 text-[11px] font-bold tracking-wide text-caramel-300/80 uppercase">{p.label}</p>
              <p className="mt-0.5 text-[13px] text-caramel-50/90">{p.meaning}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-espresso-700/70">
        Translated: "You asked me to show something called totl, but I don't know what that is."
      </figcaption>
    </figure>
  );
}
