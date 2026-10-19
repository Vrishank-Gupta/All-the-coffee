// Deploy with: supabase functions deploy create-razorpay-order
// Secrets needed (supabase secrets set NAME=value):
//   RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
// SUPABASE_URL and SUPABASE_ANON_KEY are provided automatically by the platform.

import { createClient } from "jsr:@supabase/supabase-js@2";
import { CORS_HEADERS, json } from "../_shared/cors.ts";

const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;
const FOUNDING_PRICE_PAISE = 59900; // ₹599, in paise, matching the founding-member price

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Not authenticated" }, 401);

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) return json({ error: "Not authenticated" }, 401);

    // The Founding Batch is capped at 100 real seats; this is the same count
    // shown publicly on the landing page, enforced here so it can never be oversold.
    const { data: seatsLeft, error: seatsError } = await supabase.rpc("get_founding_seats_remaining");
    if (seatsError) return json({ error: "Could not check seat availability" }, 500);
    if ((seatsLeft ?? 0) <= 0) {
      return json({ error: "The Founding Batch is sold out. We'll open the next cohort once Module C ships." }, 410);
    }

    const basicAuth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: `Basic ${basicAuth}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: FOUNDING_PRICE_PAISE,
        currency: "INR",
        // Razorpay caps receipt at 56 chars; a full UUID plus prefix/timestamp
        // overflows that, so only a short slice of the user id goes in here.
        // Full traceability still lives in `notes` below.
        receipt: `fb_${Date.now()}_${user.id.slice(0, 8)}`,
        notes: { user_id: user.id, email: user.email ?? "" },
      }),
    });
    const order = await res.json();
    if (!res.ok) {
      return json({ error: order?.error?.description ?? "Could not create the order" }, 400);
    }

    // Record which user this order belongs to, so verify-razorpay-payment can
    // confirm the caller submitting a (orderId, paymentId, signature) triple
    // is the same user who created this order, and that it's only ever
    // consumed once. Without this, a valid triple (visible client-side in
    // Razorpay's own success callback) could be replayed from any account.
    const { error: recordError } = await supabase.rpc("record_payment_order", { p_order_id: order.id });
    if (recordError) return json({ error: "Could not start checkout. Please try again." }, 500);

    return json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: RAZORPAY_KEY_ID });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
