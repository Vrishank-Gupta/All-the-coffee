import { Bone, Shirt, Zap } from "lucide-react";

const LAYERS = [
  {
    icon: Bone,
    name: "HTML",
    role: "The skeleton",
    desc: "What's there: a heading, three boxes, a place for the answer.",
    tone: "border-espresso-900/15 bg-cream",
    iconTone: "text-espresso-700",
  },
  {
    icon: Shirt,
    name: "CSS",
    role: "The clothes",
    desc: "How it looks: colours, fonts, spacing, rounded corners.",
    tone: "border-caramel-300/60 bg-caramel-100/50",
    iconTone: "text-caramel-700",
  },
  {
    icon: Zap,
    name: "JavaScript",
    role: "The muscles",
    desc: "What it does: type a number, it calculates, the answer updates.",
    tone: "border-teal-200 bg-teal-50",
    iconTone: "text-teal-700",
  },
];

export function SkeletonClothesMuscles() {
  return (
    <figure className="not-prose my-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {LAYERS.map((l) => (
          <div key={l.name} className={`rounded-2xl border p-4 shadow-soft ${l.tone}`}>
            <div className="flex items-center gap-2">
              <l.icon className={`h-5 w-5 ${l.iconTone}`} strokeWidth={1.7} />
              <span className="font-display text-base font-semibold text-espresso-950">{l.name}</span>
            </div>
            <p className={`mt-1 text-xs font-bold tracking-wide uppercase ${l.iconTone}`}>{l.role}</p>
            <p className="mt-2 text-[13.5px] leading-snug text-espresso-900/80">{l.desc}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-sm text-espresso-700/70">
        One figure, three jobs, just like your calculator.
      </figcaption>
    </figure>
  );
}
