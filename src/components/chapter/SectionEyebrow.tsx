export function SectionEyebrow({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="font-mono text-xs font-semibold tracking-widest text-caramel-600">{n}</span>
      <span className="h-px flex-1 bg-espresso-900/10" />
      <span className="text-xs font-semibold tracking-wide text-espresso-700/60 uppercase">{label}</span>
    </div>
  );
}
