# Going live: accounts, database, and payments

Everything in this file is a one-time setup step done in dashboards, not code — the app is already built to use all of it the moment it's configured. Do these roughly in order.

## 1. Supabase (accounts + database)

1. Create a free project at supabase.com.
2. Settings -> API: copy the **Project URL** and the **anon public key** (never the `service_role` key).
3. SQL Editor -> New query: paste and run `supabase/schema.sql`. This creates the `profiles` table, its security policies, and the trigger that gives every new signup a row automatically.
4. Put the URL and anon key into `.env.local` (copy `.env.example` first) as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## 2. Google login (optional, but free and already wired up in the app)

1. In Google Cloud Console, create an OAuth 2.0 Client ID (Web application). No billing account needed for this.
2. Authorized redirect URI: use the callback URL Supabase shows you at Authentication -> Providers -> Google (it's a `https://<project-ref>.supabase.co/auth/v1/callback` URL).
3. Paste the Google Client ID and Client Secret into that same Supabase provider page and enable it.

Nothing to do on the app side — `signInWithGoogle()` and the "Continue with Google" button already call this provider.

## 3. Email delivery (Resend, since Supabase's own sender is rate-limited to ~2/hour)

1. Create a free Resend account, verify a sending domain (or use their shared test domain to start).
2. Supabase Dashboard -> Project Settings -> Auth -> SMTP Settings: turn on custom SMTP and fill in Resend's SMTP host/port/credentials (Resend's dashboard shows the exact values).
3. Authentication -> Email Templates: paste `supabase/email-templates/confirm-signup.html` into "Confirm signup" and `supabase/email-templates/reset-password.html` into "Reset password".
4. Authentication -> Providers -> Email: decide whether to require email confirmation before sign-in. The app handles both cases, but turning it **off** is recommended at launch so nothing blocks someone starting Chapter 0 right after signing up.

## 4. Razorpay (payment for Module B)

Full detail in `supabase/functions/README.md`; short version:

1. Create a Razorpay account. Test-mode API keys (Settings -> API Keys) need no KYC and are enough for everything below; live-mode payouts need business KYC whenever you're ready to actually launch.
2. Install the Supabase CLI, `supabase login`, `supabase link --project-ref <your-ref>`.
3. `supabase secrets set RAZORPAY_KEY_ID=... RAZORPAY_KEY_SECRET=...`
4. `supabase functions deploy create-razorpay-order` and `supabase functions deploy verify-razorpay-payment`.

Nothing else to configure — the "Become a founding member" button already calls these functions and only unlocks Module B after the server verifies the payment signature.

**The Founding Batch is capped at 100 real seats**, enforced server-side in `create-razorpay-order` (not just a number in the UI). The landing page and the in-chapter offer box both show a live "Only N seats left" badge once the count drops to 30 or below, backed by the same count the payment function checks — see `supabase/functions/README.md` for how. If you ever want to raise or retire the cap, it's the single `100` literal inside `get_founding_seats_remaining()` in `supabase/schema.sql`.

## 5. Deploying the frontend

Covered in `README.md`. The one addition: set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables on whichever host you pick (Netlify/Vercel/Cloudflare Pages project settings), not just in your local `.env.local`.

## Verifying it all actually works

1. Sign up with a real email, confirm it if you left confirmation on, log in.
2. Complete Chapter 0 in one browser, log in as the same user in a different browser (or an incognito window) and confirm the progress is there.
3. Navigate straight to `/chapter/4`'s URL without paying — confirm you see the founding-member offer, not the lesson.
4. Pay with a Razorpay test card (their docs list the current test card number) and confirm Chapter 4 unlocks immediately without a manual database edit.
5. In the Supabase SQL Editor, run `select get_founding_seats_remaining();` and confirm it returns `100` minus however many test accounts you've flipped to `'paid'` so far.
