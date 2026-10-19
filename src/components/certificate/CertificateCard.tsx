import { Coffee } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function CertificateCard({ name, completedAt, certId }: { name: string; completedAt: string; certId: string }) {
  return (
    <div
      id="certificate-card"
      className="mx-auto w-full max-w-3xl rounded-2xl border-[6px] border-double border-caramel-500/70 bg-cream p-8 text-center shadow-lift sm:p-12"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-espresso-950">
        <Coffee className="h-7 w-7 text-caramel-300" strokeWidth={2} />
      </div>
      <p className="mt-4 text-xs font-bold tracking-[0.2em] text-caramel-700 uppercase">Certificate of Completion</p>

      <p className="mt-7 text-sm text-espresso-700/70">This certifies that</p>
      <p className="mt-2 font-display text-4xl font-semibold text-espresso-950 break-words sm:text-5xl">{name}</p>
      <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-espresso-800/85">
        has completed the <strong>All The Coffee Core Course</strong>: 12 chapters across three modules, building
        real tools with AI, publishing one live, and automating a genuine repetitive task on their own computer.
      </p>

      <div className="mx-auto mt-8 flex max-w-sm items-center justify-between border-t border-espresso-900/15 pt-4 text-xs text-espresso-700/60">
        <span>Issued {formatDate(completedAt)}</span>
        <span>All The Coffee</span>
        <span>ID: {certId}</span>
      </div>
    </div>
  );
}
