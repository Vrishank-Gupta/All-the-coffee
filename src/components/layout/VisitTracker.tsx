import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView, logTrafficSource, setTrackingEnabled } from "../../lib/analytics";
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
    const isAdmin = user?.email === ADMIN_EMAIL;
    setTrackingEnabled(!isAdmin);
    if (isAdmin) return;
    logPageView(location.pathname);
    logTrafficSource(location.search);
    // location.search is read only alongside a page change, on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, loading, user?.email]);

  return null;
}
