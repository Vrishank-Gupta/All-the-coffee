import { UtensilsCrossed, ChefHat } from "lucide-react";

export function RestaurantCutaway() {
  return (
    <figure className="not-prose my-6">
      <div className="grid overflow-hidden rounded-2xl border border-espresso-900/10 shadow-soft sm:grid-cols-5">
        <div className="col-span-3 bg-cream px-5 py-6">
          <div className="flex items-center gap-2 text-caramel-700">
            <UtensilsCrossed className="h-5 w-5" strokeWidth={1.7} />
            <span className="text-xs font-bold tracking-wide uppercase">Front end</span>
          </div>
          <p className="mt-2 font-display text-lg font-semibold text-espresso-950">What you see</p>
          <p className="mt-1 text-[13.5px] text-espresso-900/80">
            The dining area: the menu, the tables, the waiter. Your Meeting Cost Calculator lives entirely here.
          </p>
        </div>
        <div className="col-span-2 bg-espresso-950 px-5 py-6 text-caramel-100">
          <div className="flex items-center gap-2 text-caramel-300">
            <ChefHat className="h-5 w-5" strokeWidth={1.7} />
            <span className="text-xs font-bold tracking-wide uppercase">Back end</span>
          </div>
          <p className="mt-2 font-display text-lg font-semibold text-caramel-50">Behind the scenes</p>
          <p className="mt-1 text-[13.5px] text-caramel-100/70">
            The kitchen you never see, where data is stored and heavy work happens. You'll meet this later.
          </p>
        </div>
      </div>
    </figure>
  );
}
