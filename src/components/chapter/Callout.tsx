import type { ReactNode } from "react";
import { HeartHandshake, Lightbulb, AlertTriangle, MessageCircleQuestion, Sparkles, PartyPopper } from "lucide-react";

type Variant = "worry" | "tip" | "warning" | "reassurance" | "hint" | "celebration";

const STYLES: Record<Variant, { wrap: string; icon: ReactNode; label: string }> = {
  worry: {
    wrap: "bg-latte/70 border-caramel-300 text-espresso-900",
    icon: <MessageCircleQuestion className="h-5 w-5 text-caramel-700" />,
    label: "The worry you might have",
  },
  tip: {
    wrap: "bg-teal-50 border-teal-100 text-espresso-900",
    icon: <Lightbulb className="h-5 w-5 text-teal-700" />,
    label: "Tip",
  },
  warning: {
    wrap: "bg-brick-50 border-brick-100 text-espresso-900",
    icon: <AlertTriangle className="h-5 w-5 text-brick-600" />,
    label: "Careful",
  },
  reassurance: {
    wrap: "bg-sage-50 border-sage-100 text-espresso-900",
    icon: <HeartHandshake className="h-5 w-5 text-sage-700" />,
    label: "Reassurance",
  },
  hint: {
    wrap: "bg-caramel-100/60 border-caramel-200 text-espresso-900",
    icon: <Sparkles className="h-5 w-5 text-caramel-700" />,
    label: "Hint",
  },
  celebration: {
    wrap: "bg-gradient-to-br from-caramel-100/70 to-cream border-caramel-300 text-espresso-900",
    icon: <PartyPopper className="h-5 w-5 text-caramel-700" />,
    label: "Take a moment",
  },
};

export function Callout({
  variant = "tip",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const s = STYLES[variant];
  return (
    <div className={`not-prose my-5 rounded-2xl border px-5 py-4 ${s.wrap}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{s.icon}</div>
        <div className="min-w-0">
          <p className="mb-1 text-xs font-semibold tracking-wide uppercase text-espresso-700/70">
            {title ?? s.label}
          </p>
          <div className="text-[15px] leading-relaxed text-espresso-900/90">{children}</div>
        </div>
      </div>
    </div>
  );
}
