// Deploy with: supabase functions deploy log-visit
// No secrets needed beyond the platform-provided SUPABASE_URL / SUPABASE_ANON_KEY.
//
// Resolves a coarse country/city from the request's IP so /admin can show
// rough visitor geography, then discards the IP immediately — it is never
// stored, logged, or returned. This is why visit logging lives in an Edge
// Function rather than a plain database RPC: a SQL function has no way to
// see the caller's IP at all, but it also can't be trusted to discard it
// correctly on every path the way this function is written to.
//
// IP extraction: Supabase Edge Functions sit behind Cloudflare, which sets
// `cf-connecting-ip` to the true client IP on every request. That header is
// used first; `x-forwarded-for` is an unreliable fallback only, since it can
// contain intermediate infrastructure hops (confirmed by debugging real
// requests — one observed chain was "<real client ip>,<real client ip>,
// 13.248.x.x", an AWS-owned range, not the visitor) in an order that isn't
// guaranteed to put the real client IP first.

import { createClient } from "jsr:@supabase/supabase-js@2";
import { CORS_HEADERS, json } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS });

  try {
    const { path, visitorId } = await req.json();
    if (!path || !visitorId) return json({ error: "Missing path or visitorId" }, 400);

    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      null;

    let country: string | null = null;
    let city: string | null = null;

    if (ip) {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`);
        const geo = await geoRes.json();
        if (geo.status === "success") {
          country = geo.country ?? null;
          city = geo.city ?? null;
        }
      } catch {
        // A failed geolocation lookup should never block logging the visit.
      }
    }
    // `ip` goes out of scope here. Nothing below this line has access to it.

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { error } = await supabase.rpc("log_page_view", {
      p_path: path,
      p_visitor_id: visitorId,
      p_country: country,
      p_city: city,
    });
    if (error) return json({ error: error.message }, 500);

    return json({ ok: true });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
