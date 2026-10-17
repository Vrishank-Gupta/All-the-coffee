# Edge Functions

Two functions, both called from the browser via `supabase.functions.invoke(...)`, which automatically forwards the signed-in user's session token:

- `create-razorpay-order` — creates a ₹599 Razorpay order for the signed-in user, after checking `get_founding_seats_remaining()` and rejecting the order with a 410 once the real 100-seat Founding Batch cap is hit.
- `verify-razorpay-payment` — verifies the Razorpay payment signature server-side (never trust the client-side success callback alone) and, only if valid, flips that user's `profiles.tier` to `'paid'`.

Both run as the calling user's own identity against Postgres, relying on the Row Level Security policies in `supabase/schema.sql` ("a user may only update their own row") — so neither function needs or uses the Supabase `service_role` key.

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

supabase functions deploy create-razorpay-order
supabase functions deploy verify-razorpay-payment
```

`SUPABASE_URL` and `SUPABASE_ANON_KEY` don't need to be set manually — every Edge Function gets them injected automatically by the platform.

## Testing

Razorpay's test mode has its own test card numbers and a test UPI flow that complete instantly without moving real money — see Razorpay's "Test Mode" docs for the current test card number, since Razorpay could change it over time.
