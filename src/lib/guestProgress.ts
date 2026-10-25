// Guests (not logged in) can do the first GUEST_CHAPTER_IDS chapters with
// their progress kept in this browser only. On signup or login it is merged
// into their profile once and then cleared, so nothing is lost by starting
// before making an account.
const GUEST_KEY = "atc_guest_progress";
export interface GuestFields {
  completed: number[];
  boring_task: string;
  used_at_work: string;
  nervous_start: number | null;
  nervous_ch3: number | null;
  nervous_ch7: number | null;
}

export function readGuest(): Partial<GuestFields> | null {
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    return raw ? (JSON.parse(raw) as Partial<GuestFields>) : null;
  } catch {
    return null;
  }
}

export function writeGuest(row: GuestFields) {
  const { completed, boring_task, used_at_work, nervous_start, nervous_ch3, nervous_ch7 } = row;
  try {
    localStorage.setItem(GUEST_KEY, JSON.stringify({ completed, boring_task, used_at_work, nervous_start, nervous_ch3, nervous_ch7 }));
  } catch {
    // Storage blocked (private browsing): progress lasts for this visit only.
  }
}

export function clearGuest() {
  try {
    localStorage.removeItem(GUEST_KEY);
  } catch {
    // nothing stored, nothing to clear
  }
}

export function hasGuestProgress() {
  return (readGuest()?.completed?.length ?? 0) > 0;
}

// Fields a guest filled in fill the profile's blanks; completed chapters are
// unioned. Never overwrites anything the account already has.
export function mergeGuest(profile: GuestFields, guest: Partial<GuestFields>): Partial<GuestFields> {
  const merged: Partial<GuestFields> = {};
  const completed = Array.from(new Set([...profile.completed, ...(guest.completed ?? [])])).sort((a, b) => a - b);
  if (completed.length !== profile.completed.length) merged.completed = completed;
  if (!profile.boring_task && guest.boring_task) merged.boring_task = guest.boring_task;
  if (!profile.used_at_work && guest.used_at_work) merged.used_at_work = guest.used_at_work;
  if (profile.nervous_start == null && guest.nervous_start != null) merged.nervous_start = guest.nervous_start;
  if (profile.nervous_ch3 == null && guest.nervous_ch3 != null) merged.nervous_ch3 = guest.nervous_ch3;
  if (profile.nervous_ch7 == null && guest.nervous_ch7 != null) merged.nervous_ch7 = guest.nervous_ch7;
  return merged;
}
