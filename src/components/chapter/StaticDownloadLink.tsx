import { Download } from "lucide-react";

export function StaticDownloadLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      download
      className="not-prose my-4 flex w-fit items-center gap-2 rounded-xl border border-caramel-400/50 bg-cream px-4 py-2.5 text-sm font-semibold text-caramel-700 transition hover:bg-caramel-100"
    >
      <Download className="h-4 w-4" />
      {label}
    </a>
  );
}
