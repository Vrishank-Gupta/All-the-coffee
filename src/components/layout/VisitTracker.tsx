import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "../../lib/analytics";
import { useAuth } from "../../lib/auth";

const ADMIN_EMAIL = "vrishank98@gmail.com";

export function VisitTracker() {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) return;
    logPageView(location.pathname);
  }, [location.pathname, user?.email]);

  return null;
}
