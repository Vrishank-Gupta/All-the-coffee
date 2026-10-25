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

// Turned off for the site owner by VisitTracker, so their own clicking around
// doesn't count as visitor behaviour.
let trackingEnabled = true;

export function setTrackingEnabled(enabled: boolean) {
  trackingEnabled = enabled;
}

export function logPageView(path: string) {
  if (!isSupabaseConfigured || !trackingEnabled) return;
  supabase.functions.invoke("log-visit", { body: { path, visitorId: getVisitorId() } }).then(
    () => {},
    () => {} // visit tracking failing silently should never surface to the user
  );
}

// Events ride on the same anonymous visit log as page views, as paths under
// /_event/ (e.g. /_event/cta-hero), so they need no extra table or service.
export function logEvent(name: string) {
  logPageView(`/_event/${name.toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 60)}`);
}

// Where a visitor came from, from a ?src= or ?utm_source= tag on the link
// (e.g. allthecoffee.in/?src=ig in the Instagram bio). Logged once per visit.
export function logTrafficSource(search: string) {
  const params = new URLSearchParams(search);
  const source = params.get("src") ?? params.get("utm_source");
  if (!source) return;
  try {
    if (sessionStorage.getItem("atc_src_logged")) return;
    sessionStorage.setItem("atc_src_logged", "1");
  } catch {
    // sessionStorage blocked: log it anyway, at worst twice in one visit
  }
  logEvent(`src-${source}`);
}

// Logs 25/50/75/100% scroll depth once each for the page it's used on.
export function trackScrollDepth(page: string) {
  const marks = [25, 50, 75, 100];
  const seen = new Set<number>();
  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const pct = (window.scrollY / max) * 100;
    for (const m of marks) {
      if (pct >= m - 2 && !seen.has(m)) {
        seen.add(m);
        logEvent(`scroll-${page}-${m}`);
      }
    }
    if (seen.size === marks.length) window.removeEventListener("scroll", onScroll);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}
