import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Coffee } from "lucide-react";
import { useAuth } from "../../lib/auth";
import { hasGuestProgress } from "../../lib/guestProgress";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-espresso-950">
            <Coffee className="h-6 w-6 text-caramel-300" />
          </div>
          <p className="text-sm text-espresso-700/70">One moment…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Someone who already started as a guest is new here: send them to sign
    // up, not to a login form they have no account for.
    return <Navigate to={hasGuestProgress() ? "/signup" : "/login"} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
