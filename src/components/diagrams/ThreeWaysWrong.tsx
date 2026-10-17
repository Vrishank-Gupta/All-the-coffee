import { OctagonAlert, MousePointerClick, CircleHelp } from "lucide-react";

const WAYS = [
  {
    icon: OctagonAlert,
    title: "An error message",
    desc: "Red text or a warning box. Annoying, but it tells you where to look.",
    tone: "border-brick-200 bg-brick-50 text-brick-600",
  },
  {
    icon: MousePointerClick,
    title: "Nothing happens",
    desc: "You click a button and… nothing. There's usually an error, just hidden.",
    tone: "border-caramel-300 bg-caramel-100/50 text-caramel-700",
  },
  {
    icon: CircleHelp,
    title: "The wrong answer",
    desc: "Looks fine. Isn't. The sneakiest kind, because nothing looks broken.",
    tone: "border-teal-200 bg-teal-50 text-teal-700",
  },
];

export function ThreeWaysWrong() {
  return (
    <figure className="not-prose my-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {WAYS.map((w) => (
          <div key={w.title} className={`rounded-2xl border p-4 shadow-soft ${w.tone}`}>
            <w.icon className="h-6 w-6" strokeWidth={1.7} />
            <p className="mt-2 font-display text-base font-semibold text-espresso-950">{w.title}</p>
            <p className="mt-1 text-[13.5px] leading-snug text-espresso-900/80">{w.desc}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}
