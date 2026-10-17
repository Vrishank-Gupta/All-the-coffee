import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

export function useFoundingSeatsRemaining(): number | null {
  const [seatsLeft, setSeatsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    supabase.rpc("get_founding_seats_remaining").then(({ data, error }) => {
      if (!cancelled && !error && typeof data === "number") setSeatsLeft(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return seatsLeft;
}
