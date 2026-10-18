import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "../../lib/analytics";
import { useAuth } from "../../lib/auth";

const ADMIN_EMAIL = "vrishank98@gmail.com";

export function VisitTracker() {
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Wait for auth to settle before deciding whether to log. Without this,
    // user?.email flips from undefined to its resolved value shortly after
    // mount, re-firing this effect for the *same* pathname and inflating
    // view counts with duplicate entries a few milliseconds apart.
    if (loading) return;
    if (user?.email === ADMIN_EMAIL) return;
    logPageView(location.pathname);
  }, [location.pathname, loading, user?.email]);

  return null;
}
