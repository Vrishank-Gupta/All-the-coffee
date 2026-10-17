import { Check, Crown, Flame } from "lucide-react";
import { RazorpayCheckoutButton } from "./RazorpayCheckoutButton";
import { FoundingSeatsBadge } from "./FoundingSeatsBadge";

const LIVE_FREE = [
  "Chapter 0: You're not behind",
  "Chapter 1: Your first tool in 20 minutes",
  "Chapter 2: What just happened?",
  "Chapter 3: When things break",
];
const UNLOCKS_NOW = [
  "Chapter 4: A tool that remembers",
  "Chapter 5: Taming messy spreadsheets",
  "Chapter 6: Putting AI inside your tool",
  "Chapter 7: Sharing what you built",
];

export function FoundingOfferBox() {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-3xl border border-caramel-400/40 bg-gradient-to-br from-espresso-950 to-espresso-800 p-6 text-caramel-50 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-caramel-500 px-3 py-1 text-xs font-bold text-espresso-950 uppercase">
          <Crown className="h-3.5 w-3.5" /> The Founding Batch
        </span>
        <span className="flex items-center gap-1 rounded-full bg-brick-600/80 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
          <Flame className="h-3 w-3" /> Limited time
        </span>
        <FoundingSeatsBadge />
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-3">
        <span className="font-display text-xl font-medium text-caramel-100/50 line-through">₹999</span>
        <span className="font-display text-4xl font-bold text-caramel-50">₹599*</span>
      </div>
      <p className="mt-1 text-sm text-caramel-100/70">*inclusive of GST. Unlocks Module B: four more real tools.</p>
      <p className="mt-2 text-sm font-medium text-brick-200">
        Capped at 100 founding seats, ever, and reverts to ₹999 the moment Module C launches.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold tracking-wide text-sage-300 uppercase">Already yours, free</p>
          <ul className="space-y-1.5 text-[13.5px]">
            {LIVE_FREE.map((c) => (
              <li key={c} className="flex items-start gap-1.5 text-caramel-100/90">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-400" /> {c}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold tracking-wide text-caramel-300 uppercase">Unlocks the moment you join</p>
          <ul className="space-y-1.5 text-[13.5px]">
            {UNLOCKS_NOW.map((c) => (
              <li key={c} className="flex items-start gap-1.5 text-caramel-100/90">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-caramel-300" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 border-t border-white/10 pt-4 text-xs text-caramel-100/60">
        Refund promise: 30 days, or until you finish Module B, whichever is later.
      </p>
      <div className="mt-4">
        <RazorpayCheckoutButton />
      </div>
    </div>
  );
}
