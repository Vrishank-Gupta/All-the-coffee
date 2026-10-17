import { Bot, Plus, Send, MessageSquare } from "lucide-react";

type Highlight = "signup" | "newchat" | "messagebox" | "code-toggle";

const RECENT = ["Meeting Cost Calculator", "Untitled chat", "Untitled chat"];

export function ChatToolMockup({ highlight }: { highlight: Highlight }) {
  const Ring = ({ children, active }: { children: React.ReactNode; active: boolean }) => (
    <div className={active ? "relative rounded-lg ring-2 ring-brick-500 ring-offset-2 ring-offset-cream" : "relative"}>
      {children}
      {active && (
        <span className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-brick-500 text-[10px] font-bold text-white shadow">
          !
        </span>
      )}
    </div>
  );

  return (
    <figure className="not-prose my-6">
      <div className="overflow-hidden rounded-2xl border border-espresso-900/15 bg-white shadow-lift">
        <div className="flex items-center gap-2 border-b border-espresso-900/10 bg-latte/50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brick-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-caramel-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage-500" />
          <span className="ml-2 rounded-md bg-white px-3 py-1 font-mono text-[11px] text-espresso-700/60">
            your-ai-chat-tool.com
          </span>
          {highlight === "signup" && (
            <Ring active>
              <span className="ml-auto rounded-lg bg-espresso-950 px-3 py-1.5 text-xs font-semibold text-caramel-100">
                Sign up free
              </span>
            </Ring>
          )}
        </div>

        <div className="flex h-56 sm:h-64">
          <div className="hidden w-40 shrink-0 border-r border-espresso-900/10 bg-paper px-3 py-3 sm:block">
            <Ring active={highlight === "newchat"}>
              <div className="mb-3 flex items-center gap-1.5 rounded-lg bg-caramel-500/90 px-2.5 py-1.5 text-xs font-semibold text-espresso-950">
                <Plus className="h-3.5 w-3.5" /> New chat
              </div>
            </Ring>
            <p className="mb-1 px-1 text-[10px] font-bold tracking-wide text-espresso-700/50 uppercase">Recent</p>
            {RECENT.map((r, i) => (
              <div key={i} className="truncate rounded-md px-2 py-1.5 text-[11px] text-espresso-700/70">
                {r}
              </div>
            ))}
          </div>

          <div className="flex flex-1 flex-col justify-between p-4">
            <div className="flex items-start gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-espresso-950">
                <Bot className="h-3.5 w-3.5 text-caramel-200" />
              </div>
              <div className="rounded-xl rounded-tl-sm bg-paper px-3 py-2 text-[12px] text-espresso-800">
                Hi! Describe what you'd like to build and I'll put it together.
              </div>
            </div>

            <Ring active={highlight === "messagebox"}>
              <div className="flex items-center gap-2 rounded-xl border border-espresso-900/15 bg-white px-3 py-2.5">
                <MessageSquare className="h-4 w-4 text-espresso-700/40" />
                <span className="flex-1 text-[12px] text-espresso-700/40">Message the AI tool…</span>
                <Send className="h-4 w-4 text-caramel-600" />
              </div>
            </Ring>
          </div>
        </div>
      </div>
      <figcaption className="mt-2.5 text-center text-xs text-espresso-700/60">
        Illustrative. The exact layout and button names vary by tool, and change over time.
      </figcaption>
    </figure>
  );
}
