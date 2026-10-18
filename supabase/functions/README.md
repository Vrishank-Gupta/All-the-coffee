# Edge Functions

Four functions. The first three are called from the browser via `supabase.functions.invoke(...)`, which automatically forwards the signed-in user's session token (or just the anon key, for `log-visit`, which runs for signed-out visitors too):

- `create-razorpay-order` — creates a ₹599 Razorpay order for the signed-in user, after checking `get_founding_seats_remaining()` and rejecting the order with a 410 once the real 100-seat Founding Batch cap is hit.
- `verify-razorpay-payment` — verifies the Razorpay payment signature server-side (never trust the client-side success callback alone) and, only if valid, flips that user's `profiles.tier` to `'paid'`.
- `log-visit` — logs an anonymous page view for the `/admin` stats page. Resolves a coarse city/country from the request's IP via ip-api.com, then calls the `log_page_view` RPC with only that resolved location, never the IP itself. This is why visit logging is an Edge Function rather than a plain database RPC: a SQL function has no way to see the caller's IP at all.
- `notify-new-signup` — the odd one out: never called from the browser at all. A database trigger on `auth.users` (see `handle_new_user()` in `schema.sql`) calls it via `pg_net` every time a real account is created, email/password or Google, and it emails the site owner through Resend. Deployed with `--no-verify-jwt` since there's no user session calling it; instead it checks an `x-webhook-secret` header against its own `DB_WEBHOOK_SECRET` so random internet requests can't trigger a fake "new signup" email.

The first three run as the calling user's own identity (or anonymously) against Postgres, relying on the Row Level Security policies and security-definer functions in `supabase/schema.sql` — none of the four need or use the Supabase `service_role` key.

## The Founding Batch seat cap

`supabase/schema.sql` defines `get_founding_seats_remaining()`, a `security definer` SQL function that returns a single integer (100 minus the count of `profiles` with `tier = 'paid'`), never row data. It's granted to `anon` so the public landing page can show "Only N founding seats left" (via `FoundingSeatsBadge`, once remaining seats drop to 30 or below) without needing auth, and `create-razorpay-order` calls the same function to enforce the cap server-side — so the number displayed and the number enforced can never drift apart. There's a small theoretical race if two payments complete in the same instant at seat 100; acceptable at this traffic volume, but worth revisiting with a `select ... for update` lock if the course ever sells fast enough for that to matter.

## One-time setup (needs the Supabase CLI: `npm install -g supabase`)

```bash
supabase login
supabase link --project-ref your-project-ref

# Razorpay test-mode keys (Razorpay dashboard -> Settings -> API Keys) are
# enough for all of this; no business KYC needed until you switch to live mode.
supabase secrets set RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
supabase secrets set RAZORPAY_KEY_SECRET=your_test_key_secret

# For notify-new-signup: RESEND_API_KEY is the same key used for SMTP in
# Supabase's Auth settings. Generate DB_WEBHOOK_SECRET yourself (any long
# random string works, e.g. `openssl rand -hex 32`) and paste that exact
# value into the <DB_WEBHOOK_SECRET> placeholder in schema.sql's
# handle_new_user() function before running it.
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
supabase secrets set DB_WEBHOOK_SECRET=your-own-random-string

supabase functions deploy create-razorpay-order
supabase functions deploy verify-razorpay-payment
supabase functions deploy log-visit
supabase functions deploy notify-new-signup --no-verify-jwt
```

`SUPABASE_URL` and `SUPABASE_ANON_KEY` don't need to be set manually — every Edge Function gets them injected automatically by the platform.

## Testing

Razorpay's test mode has its own test card numbers and a test UPI flow that complete instantly without moving real money — see Razorpay's "Test Mode" docs for the current test card number, since Razorpay could change it over time.
