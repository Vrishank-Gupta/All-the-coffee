import { Quote } from "lucide-react";

export interface WordEntry {
  word: string;
  meaning: string;
  sample: string;
}

export function WordsTable({ words }: { words: WordEntry[] }) {
  return (
    <div className="not-prose my-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {words.map((w) => (
          <div
            key={w.word}
            className="group rounded-2xl border border-espresso-900/10 bg-cream p-4 transition hover:border-caramel-400/50 hover:shadow-soft"
          >
            <span className="inline-block rounded-full bg-espresso-950 px-3 py-1 font-display text-sm font-semibold text-caramel-100">
              {w.word}
            </span>
            <p className="mt-2.5 text-[14.5px] leading-snug text-espresso-900/85">{w.meaning}</p>
            <div className="mt-2.5 flex items-start gap-1.5 border-t border-espresso-900/10 pt-2.5 text-[13.5px] text-espresso-700/80 italic">
              <Quote className="mt-0.5 h-3 w-3 shrink-0 text-caramel-600" />
              <span>{w.sample}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
