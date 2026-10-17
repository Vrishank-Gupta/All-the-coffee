-- Run this once in your Supabase project's SQL Editor (Dashboard -> SQL Editor -> New query).
-- Mirrors the old localStorage ProgressState shape, one row per user.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  completed int[] not null default '{}',
  boring_task text not null default '',
  used_at_work text not null default '',
  nervous_start int,
  nervous_ch3 int,
  nervous_ch7 int,
  tier text not null default 'free' check (tier in ('free', 'paid')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- A user may only ever see or change their own row.
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Note: there is deliberately no insert/delete policy for regular users.
-- Rows are created automatically by the trigger below (running as the
-- table owner, which bypasses RLS) and should never be deleted by a client.

-- Auto-create a profile row the moment someone signs up, so the app never
-- has to handle a signed-in user with no profile row.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- The Founding Batch is capped at 100 real paid seats. This function is the
-- single source of truth for both the public "seats left" display and the
-- server-side enforcement in the create-razorpay-order Edge Function, so the
-- number shown to visitors can never drift from what's actually enforced.
-- security definer lets it count across all profiles despite RLS; it only
-- ever returns a single integer, never row data, so it's safe to expose to
-- anonymous visitors on the public landing page.
create function public.get_founding_seats_remaining()
returns integer
language sql
security definer set search_path = public
as $$
  select greatest(0, 100 - (select count(*)::int from public.profiles where tier = 'paid'));
$$;

grant execute on function public.get_founding_seats_remaining() to anon, authenticated;
