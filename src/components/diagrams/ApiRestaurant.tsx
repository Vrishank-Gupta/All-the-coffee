import { User, Bell, ChefHat, ArrowRight, ArrowLeft } from "lucide-react";

export function ApiRestaurant() {
  return (
    <figure className="not-prose my-6">
      <div className="grid grid-cols-3 items-center gap-2 rounded-2xl border border-espresso-900/10 bg-cream p-4 sm:p-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-espresso-950">
            <User className="h-6 w-6 text-caramel-200" />
          </div>
          <p className="text-xs font-bold text-espresso-900">Your tool</p>
          <p className="text-[10.5px] text-espresso-700/60">the customer</p>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex items-center gap-1 text-[10px] font-semibold text-caramel-700">
            <ArrowRight className="h-3 w-3" /> "Summarise these"
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-caramel-500">
            <Bell className="h-6 w-6 text-espresso-950" />
          </div>
          <p className="text-xs font-bold text-espresso-900">API</p>
          <p className="text-[10.5px] text-espresso-700/60">the waiter</p>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-sage-700">
            <ArrowLeft className="h-3 w-3" /> the summary
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-espresso-800">
            <ChefHat className="h-6 w-6 text-caramel-200" />
          </div>
          <p className="text-xs font-bold text-espresso-900">AI model</p>
          <p className="text-[10.5px] text-espresso-700/60">the kitchen</p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-espresso-700/70">
        The order is a <strong>request</strong>. What comes back is a <strong>response</strong>.
      </figcaption>
    </figure>
  );
}
