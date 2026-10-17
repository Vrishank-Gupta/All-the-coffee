import { ArrowRight, LogIn, Settings2, LogOut } from "lucide-react";

export function InputProcessOutput({
  input,
  process,
  output,
}: {
  input: string;
  process: string;
  output: string;
}) {
  const stages = [
    { icon: LogIn, label: "Input", text: input, tone: "teal" as const },
    { icon: Settings2, label: "Processing", text: process, tone: "caramel" as const },
    { icon: LogOut, label: "Output", text: output, tone: "sage" as const },
  ];
  const tones = {
    teal: "bg-teal-50 border-teal-100 text-teal-700",
    caramel: "bg-caramel-100/60 border-caramel-200 text-caramel-700",
    sage: "bg-sage-50 border-sage-100 text-sage-700",
  };

  return (
    <figure className="not-prose my-6">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {stages.map((s, i) => (
          <div key={s.label} className="flex flex-1 items-center gap-2">
            <div className={`flex-1 rounded-2xl border px-4 py-4 text-center shadow-soft ${tones[s.tone]}`}>
              <s.icon className="mx-auto h-5 w-5" strokeWidth={1.7} />
              <p className="mt-1.5 text-xs font-bold tracking-wide uppercase opacity-80">{s.label}</p>
              <p className="mt-1 text-sm font-medium text-espresso-900">{s.text}</p>
            </div>
            {i < stages.length - 1 && (
              <ArrowRight className="hidden h-5 w-5 shrink-0 text-espresso-900/30 sm:block" />
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}
