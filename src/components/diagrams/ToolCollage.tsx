import { Calculator, ListChecks, FileSpreadsheet, NotebookText } from "lucide-react";

const TOOLS = [
  { icon: Calculator, name: "Meeting Cost Calculator", chapter: "Chapter 1" },
  { icon: ListChecks, name: "Follow-up Tracker", chapter: "Chapter 4" },
  { icon: FileSpreadsheet, name: "Data cleaner", chapter: "Chapter 5" },
  { icon: NotebookText, name: "Notes summariser", chapter: "Chapter 6" },
];

export function ToolCollage() {
  return (
    <figure className="not-prose my-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TOOLS.map((t) => (
          <div
            key={t.name}
            className="flex flex-col items-center gap-2 rounded-2xl border border-espresso-900/10 bg-gradient-to-b from-cream to-latte/40 px-3 py-5 text-center shadow-soft"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-espresso-950">
              <t.icon className="h-5 w-5 text-caramel-300" strokeWidth={1.7} />
            </div>
            <p className="text-xs font-semibold text-espresso-900">{t.name}</p>
            <span className="rounded-full bg-caramel-100 px-2 py-0.5 text-[10px] font-semibold text-caramel-700">
              {t.chapter}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-sm text-espresso-700/70">
        Four tools you'll have built with your own hands by the end of Module B, with more to come after that.
      </figcaption>
    </figure>
  );
}
