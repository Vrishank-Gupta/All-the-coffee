import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="border-t border-espresso-900/10 px-5 py-8 text-center text-xs text-espresso-700/60">
      <p>All The Coffee: From AI-Anxious to Builder.</p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        <Link to="/terms" className="hover:text-espresso-900 hover:underline">Terms of Service</Link>
        <Link to="/privacy" className="hover:text-espresso-900 hover:underline">Privacy Policy</Link>
        <Link to="/refund-policy" className="hover:text-espresso-900 hover:underline">Refund Policy</Link>
        <a href="mailto:info@allthecoffee.in" className="hover:text-espresso-900 hover:underline">info@allthecoffee.in</a>
      </div>
    </footer>
  );
}
