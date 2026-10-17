import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { useAuth } from "../lib/auth";

export default function ResetPassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await updatePassword(password);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    navigate("/chapter/0", { replace: true });
  }

  return (
    <AuthLayout title="Set a new password" subtitle="You followed the link from your email, so this is safe to do now.">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-espresso-700/70">New password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-espresso-900/15 bg-white px-3 py-2 text-sm text-espresso-900 focus:border-caramel-500"
          />
        </div>
        {error && <p className="text-xs text-brick-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-espresso-950 px-4 py-2.5 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800 disabled:opacity-60"
        >
          {submitting ? "Saving…" : "Save new password"}
        </button>
      </form>
    </AuthLayout>
  );
}
