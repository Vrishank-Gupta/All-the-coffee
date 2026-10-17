import { useState } from "react";
import { Link, useLocation, useNavigate, type Location } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { GoogleButton } from "../components/auth/GoogleButton";
import { useAuth } from "../lib/auth";

export default function Login() {
  const { signInWithPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as { from?: Location })?.from?.pathname ?? "/chapter/0";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signInWithPassword(email, password);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to pick up where you left off.">
      <GoogleButton />
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-espresso-900/10" />
        <span className="text-xs font-semibold text-espresso-700/50 uppercase">or</span>
        <span className="h-px flex-1 bg-espresso-900/10" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-espresso-700/70">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-espresso-900/15 bg-white px-3 py-2 text-sm text-espresso-900 focus:border-caramel-500"
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-semibold text-espresso-700/70">Password</label>
            <Link to="/forgot-password" className="text-xs font-semibold text-caramel-700 underline underline-offset-2">
              Forgot it?
            </Link>
          </div>
          <input
            type="password"
            required
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
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-espresso-700/70">
        New here?{" "}
        <Link to="/signup" className="font-semibold text-caramel-700 underline underline-offset-2">
          Create a free account
        </Link>
      </p>
    </AuthLayout>
  );
}
