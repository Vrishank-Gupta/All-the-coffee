import { useState } from "react";
import { Check, Copy, MessageSquareText } from "lucide-react";

export function CopyBlock({
  children,
  label = "Prompt to copy",
  mono = false,
}: {
  children: string;
  label?: string;
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(children);
    } catch {
      // clipboard API unavailable, but the text is still selectable
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="not-prose my-5 overflow-hidden rounded-2xl border border-espresso-900/10 bg-espresso-950 shadow-soft">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex items-center gap-2 text-xs font-medium text-caramel-200/80">
          <MessageSquareText className="h-3.5 w-3.5" />
          {label}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold text-caramel-100 transition hover:bg-white/10 active:scale-95"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-sage-300" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className={`overflow-x-auto px-4 py-4 text-[13.5px] leading-relaxed whitespace-pre-wrap text-caramel-50/95 ${
          mono ? "font-mono" : "font-sans"
        }`}
      >
        {children}
      </pre>
    </div>
  );
}
