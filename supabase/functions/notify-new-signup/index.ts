// Deploy with: supabase functions deploy notify-new-signup --no-verify-jwt
// Secret needed: supabase secrets set RESEND_API_KEY=...
//
// Called by a database trigger (on_auth_user_created, via pg_net) every time
// a new row lands in auth.users, for both email/password and Google
// sign-ups. Not called directly from the client, so JWT verification is
// disabled; the trigger authenticates with this function's own secret
// instead (checked below) rather than a user session.

import { CORS_HEADERS, json } from "../_shared/cors.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const TRIGGER_SECRET = Deno.env.get("DB_WEBHOOK_SECRET")!;
const ADMIN_EMAIL = "vrishank98@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS });

  try {
    if (req.headers.get("x-webhook-secret") !== TRIGGER_SECRET) {
      return json({ error: "Not authorized" }, 401);
    }

    const { email, provider } = await req.json();
    if (!email) return json({ error: "Missing email" }, 400);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "All The Coffee <noreply@mail.allthecoffee.in>",
        to: ADMIN_EMAIL,
        subject: `New signup: ${email}`,
        text: `${email} just signed up${provider ? ` via ${provider}` : ""}.\n\nTime: ${new Date().toISOString()}`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return json({ error: `Resend error: ${body}` }, 500);
    }

    return json({ ok: true });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
