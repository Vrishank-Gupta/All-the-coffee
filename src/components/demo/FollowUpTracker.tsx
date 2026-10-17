import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, RefreshCw, Trash2 } from "lucide-react";

interface Entry {
  id: string;
  task: string;
  person: string;
  due: string;
  done: boolean;
}

export interface TrackerFeatures {
  overdue?: boolean;
  personFilter?: boolean;
}

const DEFAULT_STORAGE_KEY = "atc-ch4-tracker-demo";

function daysFromNow(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function sampleEntries(): Entry[] {
  return [
    { id: "a", task: "Send revised proposal", person: "Rahul", due: daysFromNow(1), done: false },
    { id: "b", task: "Share Q3 numbers", person: "Priya", due: daysFromNow(3), done: false },
    { id: "c", task: "Book team lunch", person: "Anita", due: daysFromNow(7), done: false },
  ];
}

function readStorage(key: string): Entry[] {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function formatDue(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function isOverdue(iso: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(iso + "T00:00:00") < today;
}

export function FollowUpTracker({
  persist = false,
  features = {},
  storageKey = DEFAULT_STORAGE_KEY,
}: {
  persist?: boolean;
  features?: TrackerFeatures;
  storageKey?: string;
}) {
  const [entries, setEntries] = useState<Entry[]>(() => (persist ? readStorage(storageKey) : []));
  const [task, setTask] = useState("");
  const [person, setPerson] = useState("");
  const [filterPerson, setFilterPerson] = useState<string | null>(null);

  useEffect(() => {
    if (persist) {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(entries));
      } catch {
        // storage unavailable
      }
    }
  }, [entries, persist, storageKey]);

  function addSample() {
    setEntries((e) => [...e, ...sampleEntries()]);
  }

  function addEntry() {
    if (!task.trim()) return;
    setEntries((e) => [...e, { id: crypto.randomUUID(), task: task.trim(), person: person.trim() || "Me", due: daysFromNow(2), done: false }]);
    setTask("");
    setPerson("");
  }

  function toggleDone(id: string) {
    setEntries((e) => e.map((en) => (en.id === id ? { ...en, done: !en.done } : en)));
  }

  function removeEntry(id: string) {
    setEntries((e) => e.filter((en) => en.id !== id));
  }

  function simulateReopen() {
    if (persist) {
      setEntries(readStorage(storageKey));
    } else {
      setEntries([]);
    }
  }

  const people = Array.from(new Set(entries.map((e) => e.person)));
  const visible = entries.filter((e) => !filterPerson || e.person === filterPerson);
  const sorted = [...visible].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return a.due.localeCompare(b.due);
  });

  return (
    <div>
      <div className="flex flex-wrap items-end gap-2 border-b border-espresso-900/10 pb-3">
        <div className="min-w-[140px] flex-1">
          <label className="mb-1 block text-xs font-semibold text-espresso-700/70">Follow-up</label>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What do you need to do?"
            className="w-full rounded-lg border border-espresso-900/15 bg-white px-2.5 py-1.5 text-sm"
          />
        </div>
        <div className="w-28">
          <label className="mb-1 block text-xs font-semibold text-espresso-700/70">With</label>
          <input
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            placeholder="Who"
            className="w-full rounded-lg border border-espresso-900/15 bg-white px-2.5 py-1.5 text-sm"
          />
        </div>
        <button onClick={addEntry} className="flex items-center gap-1 rounded-lg bg-espresso-950 px-3 py-1.5 text-sm font-semibold text-caramel-100 hover:bg-espresso-800">
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
        {entries.length === 0 && (
          <button onClick={addSample} className="rounded-lg border border-caramel-400/50 px-3 py-1.5 text-sm font-semibold text-caramel-700 hover:bg-caramel-100">
            Add the 3 sample follow-ups
          </button>
        )}
      </div>

      {features.personFilter && people.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-espresso-700/60">Show:</span>
          <button
            onClick={() => setFilterPerson(null)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${!filterPerson ? "bg-espresso-950 text-caramel-100" : "bg-latte/60 text-espresso-700"}`}
          >
            Everyone
          </button>
          {people.map((p) => (
            <button
              key={p}
              onClick={() => setFilterPerson(p)}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${filterPerson === p ? "bg-espresso-950 text-caramel-100" : "bg-latte/60 text-espresso-700"}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 min-h-[60px] space-y-1.5">
        <AnimatePresence initial={false}>
          {sorted.length === 0 && (
            <p className="py-6 text-center text-sm text-espresso-700/40 italic">Nothing here yet.</p>
          )}
          {sorted.map((e) => {
            const overdue = features.overdue && !e.done && isOverdue(e.due);
            return (
              <motion.div
                key={e.id}
                layout
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: e.done ? 0.5 : 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 ${
                  e.done ? "border-espresso-900/5 bg-white/60" : overdue ? "border-brick-300 bg-brick-50" : "border-espresso-900/10 bg-white"
                }`}
              >
                <input type="checkbox" checked={e.done} onChange={() => toggleDone(e.id)} className="h-4 w-4 accent-sage-600" />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium text-espresso-900 ${e.done ? "line-through" : ""}`}>{e.task}</p>
                  <p className="text-xs text-espresso-700/60">with {e.person}</p>
                </div>
                <span className={`shrink-0 text-xs font-semibold ${overdue ? "text-brick-600" : "text-espresso-700/60"}`}>
                  {overdue ? "Overdue" : formatDue(e.due)}
                </span>
                <button onClick={() => removeEntry(e.id)} className="shrink-0 text-espresso-400 hover:text-brick-500">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button
        onClick={simulateReopen}
        className="mt-3 flex items-center gap-1.5 rounded-lg border border-espresso-900/15 px-3 py-1.5 text-xs font-semibold text-espresso-700 transition hover:bg-latte/50"
      >
        <RefreshCw className="h-3.5 w-3.5" /> Simulate closing and reopening the tool
      </button>
    </div>
  );
}
