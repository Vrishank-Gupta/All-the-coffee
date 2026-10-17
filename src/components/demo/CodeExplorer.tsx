import { useMemo, useRef, useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { tokenizeLine } from "../../lib/highlight";

export function CodeExplorer({
  code,
  searchable = false,
  label = "index.html",
  heightClass = "max-h-80",
  onSearch,
}: {
  code: string;
  searchable?: boolean;
  label?: string;
  heightClass?: string;
  onSearch?: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  const lines = useMemo(() => code.split("\n"), [code]);
  const firstMatchRef = useRef<HTMLDivElement | null>(null);

  const matchIndices = useMemo(() => {
    if (!query.trim()) return new Set<number>();
    const q = query.toLowerCase();
    const set = new Set<number>();
    lines.forEach((l, i) => {
      if (l.toLowerCase().includes(q)) set.add(i);
    });
    return set;
  }, [lines, query]);

  useEffect(() => {
    if (matchIndices.size > 0 && firstMatchRef.current) {
      firstMatchRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [matchIndices]);

  let seenFirst = false;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-espresso-900/15 bg-espresso-950 shadow-lift">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="font-mono text-[11px] text-caramel-200/70">{label}</span>
        {searchable && (
          <div className="relative w-48">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-caramel-300/50" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder="Ctrl+F / Cmd+F"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-1.5 pr-7 pl-8 font-mono text-xs text-caramel-100 placeholder:text-caramel-300/40 focus:border-caramel-400/50"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute top-1/2 right-2 -translate-y-1/2 text-caramel-300/60">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
      {searchable && query.trim() && (
        <div className="border-b border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] text-caramel-200/70">
          {matchIndices.size > 0 ? `${matchIndices.size} matching line${matchIndices.size > 1 ? "s" : ""}` : "No matches"}
        </div>
      )}
      <div className={`overflow-auto ${heightClass} px-4 py-3`}>
        <pre className="font-mono text-[12.5px] leading-relaxed">
          {lines.map((line, i) => {
            const isMatch = matchIndices.has(i);
            const isFirst = isMatch && !seenFirst;
            if (isFirst) seenFirst = true;
            return (
              <div
                key={i}
                ref={isFirst ? firstMatchRef : undefined}
                className={`flex gap-4 rounded px-1.5 -mx-1.5 ${isMatch ? "bg-caramel-400/20 ring-1 ring-caramel-400/40" : ""}`}
              >
                <span className="w-6 shrink-0 select-none text-right text-caramel-100/25">{i + 1}</span>
                <span className="whitespace-pre text-caramel-50/90">
                  {tokenizeLine(line).map((t, j) => (
                    <span key={j} className={t.cls}>
                      {t.text}
                    </span>
                  ))}
                  {line === "" ? " " : null}
                </span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
