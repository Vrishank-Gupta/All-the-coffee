import { Download } from "lucide-react";

export function DownloadButton({ filename, content, label }: { filename: string; content: string; label?: string }) {
  function handleDownload() {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownload}
      className="not-prose my-4 flex items-center gap-2 rounded-xl border border-caramel-400/50 bg-cream px-4 py-2.5 text-sm font-semibold text-caramel-700 transition hover:bg-caramel-100"
    >
      <Download className="h-4 w-4" />
      {label ?? `Download ${filename}`}
    </button>
  );
}
