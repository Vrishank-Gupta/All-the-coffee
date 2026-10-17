import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Coffee } from "lucide-react";
import { useAuth } from "../../lib/auth";

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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
