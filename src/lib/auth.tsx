import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

const NOT_CONFIGURED_ERROR =
  "The course backend isn't set up yet (missing Supabase configuration). Accounts can't be created until it is.";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  configured: boolean;
  signUpWithPassword: (email: string, password: string) => Promise<{ error: string | null; needsEmailConfirmation: boolean }>;
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  sendPasswordReset: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user: session?.user ?? null,
    session,
    loading,
    configured: isSupabaseConfigured,
    async signUpWithPassword(email, password) {
      if (!isSupabaseConfigured) return { error: NOT_CONFIGURED_ERROR, needsEmailConfirmation: false };
      const { data, error } = await supabase.auth.signUp({ email, password });
      // If email confirmation is required in the Supabase project settings,
      // signUp succeeds but returns no active session until they click the link.
      const needsEmailConfirmation = !error && !data.session;
      return { error: error?.message ?? null, needsEmailConfirmation };
    },
    async signInWithPassword(email, password) {
      if (!isSupabaseConfigured) return { error: NOT_CONFIGURED_ERROR };
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error?.message ?? null };
    },
    async signInWithGoogle() {
      if (!isSupabaseConfigured) return { error: NOT_CONFIGURED_ERROR };
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      return { error: error?.message ?? null };
    },
    async sendPasswordReset(email) {
      if (!isSupabaseConfigured) return { error: NOT_CONFIGURED_ERROR };
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error: error?.message ?? null };
    },
    async updatePassword(password) {
      if (!isSupabaseConfigured) return { error: NOT_CONFIGURED_ERROR };
      const { error } = await supabase.auth.updateUser({ password });
      return { error: error?.message ?? null };
    },
    async signOut() {
      if (!isSupabaseConfigured) return;
      await supabase.auth.signOut();
    },
  }), [session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
