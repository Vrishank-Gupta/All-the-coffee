import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./auth";
import { CHAPTERS } from "./courseData";

// Derived from the actual chapter list rather than hand-maintained, so it
// can't silently drift out of sync with reality (e.g. with the server-side
// chapter range mark_course_completed() checks (see supabase/schema.sql).
export const TOTAL_CHAPTERS = CHAPTERS.length;

interface ProfileRow {
  completed: number[];
  boring_task: string;
  used_at_work: string;
  nervous_start: number | null;
  nervous_ch3: number | null;
  nervous_ch7: number | null;
  tier: "free" | "paid";
  full_name: string | null;
  course_completed_at: string | null;
}

const DEFAULT_ROW: ProfileRow = {
  completed: [],
  boring_task: "",
  used_at_work: "",
  nervous_start: null,
  nervous_ch3: null,
  nervous_ch7: null,
  tier: "free",
  full_name: null,
  course_completed_at: null,
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
  fullName: string | null;
  courseCompletedAt: string | null;
  isComplete: (chapter: number) => boolean;
  isUnlocked: (chapter: number) => boolean;
  completeChapter: (chapter: number) => Promise<void>;
  setBoringTask: (task: string) => void;
  setNervousStart: (n: number) => void;
  setNervousCh3: (n: number) => void;
  setNervousCh7: (n: number) => void;
  setUsedAtWork: (task: string) => void;
  setFullName: (name: string) => void;
  resetProgress: () => void;
  refreshProfile: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const PROFILE_COLUMNS =
  "completed, boring_task, used_at_work, nervous_start, nervous_ch3, nervous_ch7, tier, full_name, course_completed_at";

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
    const { error } = await supabase.from("profiles").update(fields).eq("id", user.id);
    if (error) {
      // A rejected write (e.g. a column the client no longer has UPDATE
      // privilege on) would otherwise fail completely silently, leaving the
      // optimistic local state above out of sync with what's actually saved.
      console.error("Failed to save profile update:", fields, error);
    }
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
    fullName: row.full_name,
    courseCompletedAt: row.course_completed_at,
    isComplete: (chapter: number) => row.completed.includes(chapter),
    isUnlocked: (chapter: number) => chapter === 0 || row.completed.includes(chapter - 1),
    completeChapter: async (chapter: number) => {
      if (row.completed.includes(chapter)) return;
      const nextCompleted = [...row.completed, chapter].sort((a, b) => a - b);
      await patch({ completed: nextCompleted });

      // course_completed_at isn't client-writable (see supabase/schema.sql):
      // this RPC re-derives completion server-side from the caller's own
      // completed[] before it will stamp anything, so a client can't shortcut
      // the certificate by jumping straight to the last chapter.
      const allChaptersDone = Array.from({ length: TOTAL_CHAPTERS }, (_, i) => i).every((id) => nextCompleted.includes(id));
      if (allChaptersDone && !row.course_completed_at && user) {
        const { data: justCompleted } = await supabase.rpc("mark_course_completed");
        if (justCompleted) await fetchProfile(user.id);
      }
    },
    setBoringTask: (task: string) => patch({ boring_task: task }),
    setNervousStart: (n: number) => patch({ nervous_start: n }),
    setNervousCh3: (n: number) => patch({ nervous_ch3: n }),
    setNervousCh7: (n: number) => patch({ nervous_ch7: n }),
    setUsedAtWork: (task: string) => patch({ used_at_work: task }),
    setFullName: (name: string) => patch({ full_name: name }),
    resetProgress: () => {
      // tier and course_completed_at are no longer client-writable columns
      // (see supabase/schema.sql): including them here would make Postgres
      // reject the WHOLE update statement, silently resetting nothing at
      // all. Reset everything else; a reset naturally hides the certificate
      // again too, since get_certificate re-checks the full chapter set
      // against the now-empty `completed`, not just the stamped date.
      const { tier: _tier, course_completed_at: _courseCompletedAt, ...resettable } = DEFAULT_ROW;
      return patch(resettable);
    },
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
