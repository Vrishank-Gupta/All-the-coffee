import { Flame } from "lucide-react";
import { useFoundingSeatsRemaining } from "../../lib/foundingSeats";

const SHOW_BELOW = 30;

export function FoundingSeatsBadge({ className = "" }: { className?: string }) {
  const seatsLeft = useFoundingSeatsRemaining();

  if (seatsLeft === null || seatsLeft > SHOW_BELOW) return null;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-brick-600 px-3.5 py-1.5 text-xs font-bold tracking-wide text-white uppercase ${className}`}>
      <Flame className="h-3.5 w-3.5" />
      {seatsLeft > 0 ? `Only ${seatsLeft} founding seats left` : "Founding Batch sold out"}
    </span>
  );
}
