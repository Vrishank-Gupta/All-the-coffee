import { supabase, isSupabaseConfigured } from "./supabaseClient";

const VISITOR_ID_KEY = "atc_visitor_id";

function getVisitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const fresh = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, fresh);
    return fresh;
  } catch {
    // localStorage unavailable (private browsing, blocked storage); fall back
    // to a one-off id so the view still gets logged, just not deduped.
    return crypto.randomUUID();
  }
}

export function logPageView(path: string) {
  if (!isSupabaseConfigured) return;
  supabase.functions.invoke("log-visit", { body: { path, visitorId: getVisitorId() } }).then(
    () => {},
    () => {} // visit tracking failing silently should never surface to the user
  );
}
