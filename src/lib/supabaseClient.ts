import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // Deliberately not throwing here: this module is imported (transitively, via
  // useAuth/useProgress) by every page including the public Landing/Overview
  // pages, which don't need a backend at all. Throwing at import time would
  // blank out the entire app, not just the parts that actually need Supabase.
  console.warn(
    "Supabase isn't configured yet. Copy .env.example to .env.local and fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from your Supabase project's Settings -> API page. Auth and saved progress won't work until then."
  );
}

// A well-formed placeholder so createClient() doesn't throw on an invalid URL;
// real network calls against it simply fail, which AuthProvider handles.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
