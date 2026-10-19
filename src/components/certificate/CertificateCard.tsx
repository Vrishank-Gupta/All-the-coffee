import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Coffee } from "lucide-react";
import { certificateUrl } from "../../lib/certificate";

const SKILLS = [
  "Built a cost calculator",
  "Built a follow-up tracker",
  "Cleaned real messy data",
  "Wired real AI into a tool",
  "Published one live",
  "Automated a repetitive task",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function useQrSvg(url: string) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toString(url, { type: "svg", margin: 0, color: { dark: "#241711", light: "#0000" } })
      .then((s) => {
        if (!cancelled) setSvg(s);
      })
      .catch(() => {
        if (!cancelled) setSvg(null);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return svg;
}

export function CertificateCard({ name, completedAt, certId, userId }: { name: string; completedAt: string; certId: string; userId: string }) {
  const verifyUrl = certificateUrl(userId);
  const qrSvg = useQrSvg(verifyUrl);

  return (
    <div id="certificate-card" className="relative mx-auto w-full max-w-3xl rounded-[20px] bg-white shadow-lift">
      {/* double border frame */}
      <div className="pointer-events-none absolute inset-[10px] rounded-2xl border-[1.5px] border-caramel-400" />
      <div className="pointer-events-none absolute inset-4 rounded-xl border border-caramel-200" />

      {/* corner flourishes */}
      <svg className="absolute top-3.5 left-3.5 h-11 w-11" viewBox="0 0 46 46" fill="none">
        <path d="M2 46V12C2 6.5 6.5 2 12 2H46" stroke="#D9872F" strokeWidth="2" />
      </svg>
      <svg className="absolute top-3.5 right-3.5 h-11 w-11 -scale-x-100" viewBox="0 0 46 46" fill="none">
        <path d="M2 46V12C2 6.5 6.5 2 12 2H46" stroke="#D9872F" strokeWidth="2" />
      </svg>
      <svg className="absolute bottom-3.5 left-3.5 h-11 w-11 -scale-y-100" viewBox="0 0 46 46" fill="none">
        <path d="M2 46V12C2 6.5 6.5 2 12 2H46" stroke="#D9872F" strokeWidth="2" />
      </svg>
      <svg className="absolute bottom-3.5 right-3.5 h-11 w-11 -scale-x-100 -scale-y-100" viewBox="0 0 46 46" fill="none">
        <path d="M2 46V12C2 6.5 6.5 2 12 2H46" stroke="#D9872F" strokeWidth="2" />
      </svg>

      <div className="px-8 pt-16 pb-11 text-center sm:px-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-espresso-950">
          <Coffee className="h-7 w-7 text-caramel-300" strokeWidth={2} />
        </div>

        <p className="mt-4.5 text-xs font-bold tracking-[0.28em] text-caramel-700 uppercase">Certificate of Completion</p>
        <p className="mt-2.5 font-display text-xl font-bold text-espresso-950 sm:text-2xl">Practical AI &amp; Automation</p>
        <div className="mx-auto mt-2.5 h-0.5 w-14 bg-caramel-400" />

        <p className="mt-6 text-sm text-espresso-700/70">This certifies that</p>
        <p className="mt-2 font-display text-4xl font-semibold break-words text-espresso-950 sm:text-5xl">{name}</p>

        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-espresso-800/85">
          has demonstrated the ability to <strong>build real, working software tools using AI</strong> — completing
          12 chapters across three modules, from a first AI-built tool to independently automating a repetitive
          task with code.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {SKILLS.map((s) => (
            <span key={s} className="rounded-full border border-caramel-200 bg-caramel-50 px-3.5 py-1.5 text-xs font-semibold text-espresso-800">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-caramel-100 pt-5 text-left">
          <div>
            <p className="text-[10.5px] font-bold tracking-wide text-espresso-700/50 uppercase">Issued</p>
            <p className="mt-0.5 text-sm font-semibold text-espresso-950">{formatDate(completedAt)}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-bold tracking-wide text-espresso-700/50 uppercase">Certificate ID</p>
            <p className="mt-0.5 font-mono text-sm font-semibold tracking-wide text-espresso-950">{certId}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-bold tracking-wide text-espresso-700/50 uppercase">Issued by</p>
            <p className="mt-0.5 font-display text-sm font-semibold text-espresso-950">All The Coffee</p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-[54px] w-[54px] shrink-0 rounded-md border border-caramel-100 bg-white p-1"
              dangerouslySetInnerHTML={qrSvg ? { __html: qrSvg } : undefined}
            />
            <p className="max-w-[86px] text-[10px] leading-tight text-espresso-700/50">Scan or visit the link to verify</p>
          </div>
        </div>
      </div>

      {/* seal */}
      <div className="absolute -bottom-6 right-10">
        <svg width="76" height="96" viewBox="0 0 76 96">
          <path d="M18 54 L8 92 L38 78 L68 92 L58 54 Z" fill="#C1721F" />
          <circle cx="38" cy="38" r="36" fill="#E9A24F" stroke="#C1721F" strokeWidth="3" />
          <circle cx="38" cy="38" r="28" fill="none" stroke="#C1721F" strokeWidth="1.5" strokeDasharray="2.5 3" />
          <g transform="translate(38,38)">
            <path d="M0,-12 L3,-3 L12,0 L3,3 L0,12 L-3,3 L-12,0 L-3,-3 Z" fill="#823F1A" />
            <path d="M11,-13 L12.3,-10 L15.5,-8.7 L12.3,-7.4 L11,-4.3 L9.7,-7.4 L6.5,-8.7 L9.7,-10 Z" fill="#823F1A" />
          </g>
        </svg>
      </div>
    </div>
  );
}
