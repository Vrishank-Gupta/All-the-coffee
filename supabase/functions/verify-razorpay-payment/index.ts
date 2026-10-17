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

    // RLS lets a user update only their own row (see supabase/schema.sql),
    // so this is safe to run with the caller's own JWT, no service_role key.
    const { error: updateError } = await supabase.from("profiles").update({ tier: "paid" }).eq("id", user.id);
    if (updateError) return json({ error: updateError.message }, 500);

    return json({ success: true });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
