const PARTS = [
  { n: 1, title: "Ingredients", desc: "The libraries we need" },
  { n: 2, title: "Settings", desc: "Values you might change next year" },
  { n: 3, title: "A mini-recipe", desc: "Instructions for one small job, reused" },
  { n: 4, title: "Main steps", desc: "Go through every file" },
  { n: 5, title: "Combine and total", desc: "Put it all together" },
  { n: 6, title: "Save the results", desc: "Write the new Excel file" },
  { n: 7, title: "Report back", desc: "Print what happened in the terminal" },
];

export function RecipeCardScript() {
  return (
    <figure className="not-prose my-6">
      <div className="rounded-2xl border border-espresso-900/10 bg-cream p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-2">
          {PARTS.map((p) => (
            <div key={p.n} className="flex min-w-0 items-start gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-soft">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-espresso-950 font-mono text-xs font-semibold text-caramel-100">
                {p.n}
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-espresso-950">{p.title}</p>
                <p className="text-[12px] leading-snug text-espresso-700/70">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-espresso-700/70">
        Find the parts before reading the lines. A script is a recipe card, not a wall of text.
      </figcaption>
    </figure>
  );
}
