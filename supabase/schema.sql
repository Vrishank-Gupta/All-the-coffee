-- Run this once in your Supabase project's SQL Editor (Dashboard -> SQL Editor -> New query).
-- Mirrors the old localStorage ProgressState shape, one row per user.

-- Needed for the new-signup notification trigger further down, which calls
-- an Edge Function via an async HTTP request rather than blocking signup.
create extension if not exists pg_net with schema extensions;

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
-- has to handle a signed-in user with no profile row. Also fires a
-- fire-and-forget notification to notify-new-signup via pg_net, for both
-- email/password and Google sign-ups (both insert into auth.users the same
-- way), so the site owner gets an email the moment someone real signs up.
--
-- SECURITY NOTE: replace <DB_WEBHOOK_SECRET> below with the exact same
-- value set via `supabase secrets set DB_WEBHOOK_SECRET=...` for the
-- notify-new-signup function (see supabase/functions/README.md). This
-- value lives in the function body here because Postgres has no way to
-- read an Edge Function's own secret store directly; never commit the
-- real value to this file, keep the placeholder in version control and
-- substitute the real one only when running this against your project.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public, extensions
as $$
begin
  insert into public.profiles (id)
  values (new.id);

  perform net.http_post(
    url := 'https://inomysctlfdtheglsdso.supabase.co/functions/v1/notify-new-signup',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', '<DB_WEBHOOK_SECRET>'
    ),
    body := jsonb_build_object(
      'email', new.email,
      'provider', new.raw_app_meta_data->>'provider'
    )
  );

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

-- First-party visit tracking. No third-party analytics script runs on this
-- site; this is the entire mechanism. visitor_id is a random UUID generated
-- client-side and kept in localStorage, never tied to an email or account,
-- so it only approximates "unique visitors," not identity.
create table public.page_views (
  id bigint generated always as identity primary key,
  path text not null,
  visitor_id uuid not null,
  -- Coarse city/country only, resolved from IP by the log-visit Edge
  -- Function at write time. The IP itself is never stored here or anywhere.
  country text,
  city text,
  created_at timestamptz not null default now()
);

create index page_views_created_at_idx on public.page_views (created_at);
create index page_views_visitor_id_idx on public.page_views (visitor_id);

alter table public.page_views enable row level security;
-- Deliberately no select/insert policies for anon/authenticated: all access
-- goes through the two security-definer functions below, so a visitor can
-- log a view but never read anyone else's, and only the site owner can see
-- the aggregate numbers.

create function public.log_page_view(p_path text, p_visitor_id uuid, p_country text default null, p_city text default null)
returns void
language sql
security definer set search_path = public
as $$
  insert into public.page_views (path, visitor_id, country, city) values (p_path, p_visitor_id, p_country, p_city);
$$;

grant execute on function public.log_page_view(text, uuid, text, text) to anon, authenticated;

-- Single source of truth for the /admin stats page. Hard-checks the caller's
-- own email server-side (not just a client-side route guard) before
-- returning anything, since this aggregates data across every user.
create function public.get_admin_stats()
returns json
language plpgsql
security definer set search_path = public
as $$
declare
  caller_email text;
  result json;
begin
  select email into caller_email from auth.users where id = auth.uid();
  if caller_email is distinct from 'vrishank98@gmail.com' then
    raise exception 'not authorized';
  end if;

  select json_build_object(
    'total_signups', (select count(*) from public.profiles),
    'paid_members', (select count(*) from public.profiles where tier = 'paid'),
    'seats_remaining', public.get_founding_seats_remaining(),
    'signups_last_24h', (select count(*) from public.profiles where created_at > now() - interval '24 hours'),
    'signups_last_7d', (select count(*) from public.profiles where created_at > now() - interval '7 days'),
    'total_page_views', (select count(*) from public.page_views),
    'unique_visitors', (select count(distinct visitor_id) from public.page_views),
    'views_last_24h', (select count(*) from public.page_views where created_at > now() - interval '24 hours'),
    'unique_visitors_last_24h', (select count(distinct visitor_id) from public.page_views where created_at > now() - interval '24 hours'),
    'chapter_completions', (
      select coalesce(json_object_agg(chapter_id, cnt order by chapter_id), '{}'::json) from (
        select unnest(completed) as chapter_id, count(*) as cnt from public.profiles group by chapter_id
      ) t
    ),
    'top_pages', (
      select coalesce(json_agg(row_to_json(t)), '[]'::json) from (
        select path, count(*) as views from public.page_views group by path order by views desc limit 10
      ) t
    ),
    'top_locations', (
      select coalesce(json_agg(row_to_json(t)), '[]'::json) from (
        select coalesce(city, 'Unknown') as city, coalesce(country, 'Unknown') as country, count(*) as views
        from public.page_views
        group by city, country
        order by views desc
        limit 10
      ) t
    ),
    'users', (
      select coalesce(json_agg(row_to_json(u)), '[]'::json) from (
        select
          au.email,
          p.created_at,
          p.tier,
          coalesce(array_length(p.completed, 1), 0) as chapters_completed
        from public.profiles p
        join auth.users au on au.id = p.id
        order by p.created_at desc
      ) u
    )
  ) into result;

  return result;
end;
$$;

grant execute on function public.get_admin_stats() to authenticated;
