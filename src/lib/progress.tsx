import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./auth";

export const TOTAL_CHAPTERS = 12;

interface ProfileRow {
  completed: number[];
  boring_task: string;
  used_at_work: string;
  nervous_start: number | null;
  nervous_ch3: number | null;
  nervous_ch7: number | null;
  tier: "free" | "paid";
}

const DEFAULT_ROW: ProfileRow = {
  completed: [],
  boring_task: "",
  used_at_work: "",
  nervous_start: null,
  nervous_ch3: null,
  nervous_ch7: null,
  tier: "free",
};

interface ProgressContextValue {
  loading: boolean;
  completed: number[];
  boringTask: string;
  usedAtWork: string;
  nervousStart: number | null;
  nervousCh3: number | null;
  nervousCh7: number | null;
  hasPaid: boolean;
  isComplete: (chapter: number) => boolean;
  isUnlocked: (chapter: number) => boolean;
  completeChapter: (chapter: number) => void;
  setBoringTask: (task: string) => void;
  setNervousStart: (n: number) => void;
  setNervousCh3: (n: number) => void;
  setNervousCh7: (n: number) => void;
  setUsedAtWork: (task: string) => void;
  resetProgress: () => void;
  refreshProfile: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const PROFILE_COLUMNS = "completed, boring_task, used_at_work, nervous_start, nervous_ch3, nervous_ch7, tier";

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [row, setRow] = useState<ProfileRow>(DEFAULT_ROW);
  const [loading, setLoading] = useState(true);

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase.from("profiles").select(PROFILE_COLUMNS).eq("id", userId).single();
    if (!error && data) setRow(data as ProfileRow);
  }

  useEffect(() => {
    if (!user) {
      setRow(DEFAULT_ROW);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchProfile(user.id).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function patch(fields: Partial<ProfileRow>) {
    if (!user) return;
    setRow((r) => ({ ...r, ...fields }));
    await supabase.from("profiles").update(fields).eq("id", user.id);
  }

  const value = useMemo<ProgressContextValue>(() => ({
    loading,
    completed: row.completed,
    boringTask: row.boring_task,
    usedAtWork: row.used_at_work,
    nervousStart: row.nervous_start,
    nervousCh3: row.nervous_ch3,
    nervousCh7: row.nervous_ch7,
    hasPaid: row.tier === "paid",
    isComplete: (chapter: number) => row.completed.includes(chapter),
    isUnlocked: (chapter: number) => chapter === 0 || row.completed.includes(chapter - 1),
    completeChapter: (chapter: number) => {
      if (row.completed.includes(chapter)) return;
      patch({ completed: [...row.completed, chapter].sort((a, b) => a - b) });
    },
    setBoringTask: (task: string) => patch({ boring_task: task }),
    setNervousStart: (n: number) => patch({ nervous_start: n }),
    setNervousCh3: (n: number) => patch({ nervous_ch3: n }),
    setNervousCh7: (n: number) => patch({ nervous_ch7: n }),
    setUsedAtWork: (task: string) => patch({ used_at_work: task }),
    resetProgress: () => patch({ ...DEFAULT_ROW }),
    refreshProfile: async () => {
      if (user) await fetchProfile(user.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [row, loading, user]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
