import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

export function FixLoopComposer({
  expectedDefault,
  happenedDefault,
  errorDefault,
  onSend,
}: {
  expectedDefault: string;
  happenedDefault: string;
  errorDefault: string;
  onSend: () => void;
}) {
  const [expected, setExpected] = useState(expectedDefault);
  const [happened, setHappened] = useState(happenedDefault);
  const [error, setError] = useState(errorDefault);
  const [sending, setSending] = useState(false);

  function handleSend() {
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      onSend();
    }, 850);
  }

  return (
    <div className="not-prose my-4 rounded-2xl border border-espresso-900/15 bg-cream p-4">
      <p className="mb-3 text-xs font-semibold tracking-wide text-espresso-700/60 uppercase">
        Fill in the fix loop; edit it if you like, then send it
      </p>
      <div className="space-y-2.5">
        <Field label="I expected" value={expected} onChange={setExpected} />
        <Field label="What happened instead" value={happened} onChange={setHappened} />
        <Field label="Error message (if any)" value={error} onChange={setError} />
      </div>
      <button
        onClick={handleSend}
        disabled={sending}
        className="mt-3.5 flex items-center gap-2 rounded-xl bg-espresso-950 px-4 py-2.5 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800 disabled:opacity-70"
      >
        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {sending ? "Sending…" : "Send to AI"}
      </button>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-espresso-700/70">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-espresso-900/15 bg-white px-3 py-2 text-[13.5px] text-espresso-900 focus:border-caramel-500"
      />
    </label>
  );
}
