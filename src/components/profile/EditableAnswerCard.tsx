import { useState } from "react";
import { Check, Pencil } from "lucide-react";

export function EditableAnswerCard({
  icon,
  label,
  helper,
  value,
  onSave,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  helper?: string;
  value: string;
  onSave: (next: string) => void;
  placeholder: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saved, setSaved] = useState(false);

  function startEdit() {
    setDraft(value);
    setEditing(true);
  }

  function save() {
    onSave(draft.trim());
    setEditing(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="rounded-2xl border border-espresso-900/10 bg-cream p-4">
      <div className="flex items-center gap-2">
        <span className="text-caramel-600">{icon}</span>
        <p className="font-display text-sm font-semibold text-espresso-950">{label}</p>
      </div>
      {helper && <p className="mt-1 text-xs text-espresso-700/60">{helper}</p>}

      {editing ? (
        <div className="mt-2.5">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            placeholder={placeholder}
            autoFocus
            className="w-full resize-none rounded-lg border border-espresso-900/15 bg-white px-3 py-2 text-[13.5px] text-espresso-900 focus:border-caramel-500"
          />
          <div className="mt-2 flex gap-2">
            <button onClick={save} className="rounded-lg bg-caramel-500 px-3 py-1.5 text-xs font-semibold text-espresso-950 hover:bg-caramel-400">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-espresso-700/70 hover:bg-latte/50">
              Cancel
            </button>
          </div>
        </div>
      ) : value ? (
        <div className="mt-2.5 flex items-start justify-between gap-3">
          <p className="text-[13.5px] text-espresso-900">{value}</p>
          <button onClick={startEdit} className="shrink-0 text-espresso-400 hover:text-caramel-700">
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={startEdit}
          className="mt-2.5 rounded-lg border border-dashed border-espresso-900/20 px-3 py-1.5 text-xs font-semibold text-espresso-700/70 hover:bg-latte/40"
        >
          Not saved yet, click to add
        </button>
      )}

      {saved && <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-sage-700"><Check className="h-3 w-3" /> Saved</p>}
    </div>
  );
}
