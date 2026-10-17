export interface ReferenceGroup {
  title: string;
  items: { code: string; desc: string }[];
}

export function ReferenceGrid({ groups }: { groups: ReferenceGroup[] }) {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-3">
      {groups.map((g) => (
        <div key={g.title} className="rounded-2xl border border-espresso-900/10 bg-cream p-4">
          <p className="mb-2.5 text-xs font-bold tracking-wide text-caramel-700 uppercase">{g.title}</p>
          <div className="space-y-2.5">
            {g.items.map((it) => (
              <div key={it.code} className="flex items-start gap-2">
                <code className="mt-0.5 shrink-0 rounded bg-espresso-950 px-1.5 py-0.5 font-mono text-[11px] text-caramel-100">
                  {it.code}
                </code>
                <span className="text-[12.5px] leading-snug text-espresso-800/85">{it.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
