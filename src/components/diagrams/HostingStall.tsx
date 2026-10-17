import { Home, Store, ArrowRight } from "lucide-react";

export function HostingStall() {
  return (
    <figure className="not-prose my-6">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-2xl border border-espresso-900/10 bg-cream p-4 text-center">
          <Home className="mx-auto h-6 w-6 text-espresso-700" strokeWidth={1.6} />
          <p className="mt-2 font-display text-base font-semibold text-espresso-950">Your chat</p>
          <p className="mt-1 text-[12.5px] text-espresso-700/75">Only you can use it, like cooking in your home kitchen.</p>
        </div>
        <div className="flex flex-col items-center gap-1 px-2 text-center">
          <ArrowRight className="h-5 w-5 rotate-90 text-caramel-500 sm:rotate-0" />
          <span className="text-[10.5px] font-bold tracking-wide text-caramel-700 uppercase">Deploy</span>
        </div>
        <div className="flex-1 rounded-2xl border border-sage-200 bg-sage-50 p-4 text-center">
          <Store className="mx-auto h-6 w-6 text-sage-700" strokeWidth={1.6} />
          <p className="mt-2 font-display text-base font-semibold text-espresso-950">Hosted</p>
          <p className="mt-1 text-[12.5px] text-espresso-700/75">Anyone with the link can use it: a stall in a market that's always open.</p>
        </div>
      </div>
    </figure>
  );
}
