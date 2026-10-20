const PARTS = [
  { text: "https://", label: "How to travel there securely", tone: "bg-sage-100 text-sage-700" },
  { text: "bright-meeting-cost", label: "Your stall's name, which you choose", tone: "bg-teal-100 text-teal-700" },
  { text: ".netlify.app", label: "Which market it's in: this ending tells you who's hosting it", tone: "bg-caramel-200 text-caramel-800" },
];

export function UrlAnatomy() {
  return (
    <figure className="not-prose my-6">
      <div className="rounded-2xl border border-espresso-900/10 bg-espresso-950 p-5">
        <p className="mb-4 break-all font-mono text-sm text-caramel-50">
          {PARTS.map((p) => (
            <span key={p.text} className={`rounded px-1 py-0.5 ${p.tone}`}>
              {p.text}
            </span>
          ))}
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {PARTS.map((p) => (
            <div key={p.text} className="rounded-xl bg-white/5 p-3">
              <span className={`inline-block rounded px-2 py-0.5 font-mono text-[11px] ${p.tone}`}>{p.text}</span>
              <p className="mt-1.5 text-[12.5px] text-caramel-50/90">{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
