// Deploy with: supabase functions deploy verify-razorpay-payment
// Secret needed (supabase secrets set NAME=value): RAZORPAY_KEY_SECRET
// SUPABASE_URL and SUPABASE_ANON_KEY are provided automatically by the platform.
//
// The payment is only ever trusted after this server-side HMAC check passes.
// The client-side callback from Razorpay Checkout is never trusted alone.

import { createClient } from "jsr:@supabase/supabase-js@2";
import { CORS_HEADERS, json } from "../_shared/cors.ts";

const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const signatureBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signatureBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

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

    const { orderId, paymentId, signature } = await req.json();
    if (!orderId || !paymentId || !signature) {
      return json({ error: "Missing payment details" }, 400);
    }

    const expectedSignature = await hmacSha256Hex(RAZORPAY_KEY_SECRET, `${orderId}|${paymentId}`);
    if (expectedSignature !== signature) {
      return json({ error: "Payment could not be verified" }, 400);
    }

    // A valid HMAC only proves this triple came from a real Razorpay payment.
    // It doesn't prove THIS order belongs to the calling user, or that it
    // hasn't already been used. Without this check, a triple visible
    // client-side in Razorpay's own success callback could be replayed from
    // any number of different accounts off a single real payment.
    // consume_payment_order() atomically claims the order for auth.uid() and
    // only succeeds once, for the user who originally created it.
    const { data: consumed, error: consumeError } = await supabase.rpc("consume_payment_order", { p_order_id: orderId });
    if (consumeError) return json({ error: consumeError.message }, 500);
    if (!consumed) return json({ error: "This order has already been used or doesn't belong to this account." }, 400);

    // `tier` is no longer directly client-updatable (see supabase/schema.sql):
    // a user's own RLS policy covers every other column, but updating `tier`
    // specifically now requires this security-definer RPC, so that paying
    // is the only path to it. mark_tier_paid() takes no argument by design
    // and only ever updates auth.uid()'s own row server-side. An earlier
    // version took a caller-supplied target id with no check that it matched
    // the caller, which would have let any authenticated user mark ANY row
    // paid via a direct RPC call, bypassing this HMAC check entirely. Safe to
    // call with the caller's own JWT, no service_role key, since this point
    // is only reached after that HMAC check above passes.
    const { error: updateError } = await supabase.rpc("mark_tier_paid");
    if (updateError) return json({ error: updateError.message }, 500);

    return json({ success: true });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
