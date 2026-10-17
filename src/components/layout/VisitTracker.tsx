import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "../../lib/analytics";

export function VisitTracker() {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location.pathname]);

  return null;
}
