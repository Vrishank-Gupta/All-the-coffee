import { useState } from "react";
import { Link, useLocation, useNavigate, type Location } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { GoogleButton } from "../components/auth/GoogleButton";
import { useAuth } from "../lib/auth";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export default function Signup() {
  useDocumentMeta("Create Your Free Account", "Chapters 0–3 are free, no card needed. Start building your first AI tool in 20 minutes.");
  const { signUpWithPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const from = (location.state as { from?: Location })?.from?.pathname ?? "/chapter/0";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error, needsEmailConfirmation } = await signUpWithPassword(email, password, from);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    if (needsEmailConfirmation) {
      setNeedsConfirmation(true);
      return;
    }
    navigate(from, { replace: true });
  }

  if (needsConfirmation) {
    return (
      <AuthLayout title="Check your email" subtitle="One more step before you start.">
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <MailCheck className="h-10 w-10 text-sage-600" />
          <p className="text-sm text-espresso-800">
            We sent a confirmation link to <strong>{email}</strong>. Click it, then come back here and log in.
          </p>
          <Link to="/login" state={location.state} className="mt-2 text-sm font-semibold text-caramel-700 underline underline-offset-2">
            Go to login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Create your free account" subtitle="Chapters 0–3 are free. No card needed.">
      <GoogleButton label="Sign up with Google" redirectPath={from} />
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
          <label className="mb-1 block text-xs font-semibold text-espresso-700/70">Password</label>
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
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-espresso-700/70">
        Already have an account?{" "}
        <Link to="/login" state={location.state} className="font-semibold text-caramel-700 underline underline-offset-2">
          Log in
        </Link>
      </p>
      <p className="mt-3 text-center text-xs text-espresso-700/50">
        By creating an account, you agree to our{" "}
        <Link to="/terms" className="underline underline-offset-2 hover:text-espresso-700">Terms</Link> and{" "}
        <Link to="/privacy" className="underline underline-offset-2 hover:text-espresso-700">Privacy Policy</Link>.
      </p>
    </AuthLayout>
  );
}
