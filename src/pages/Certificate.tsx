import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, ExternalLink, Printer, Lock } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { CertificateCard } from "../components/certificate/CertificateCard";
import { useAuth } from "../lib/auth";
import { useProgress, TOTAL_CHAPTERS } from "../lib/progress";
import { certificateId, certificateUrl, linkedInAddToProfileUrl } from "../lib/certificate";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export default function Certificate() {
  useDocumentMeta("Your Certificate");
  const { user } = useAuth();
  const { completed, fullName, courseCompletedAt, setFullName } = useProgress();
  const [draftName, setDraftName] = useState("");
  const [copied, setCopied] = useState(false);

  const done = completed.includes(TOTAL_CHAPTERS - 1) && !!courseCompletedAt;

  async function handleCopyLink() {
    if (!user) return;
    try {
      await navigator.clipboard.writeText(certificateUrl(user.id));
    } catch {
      // clipboard API unavailable; link is still visible to select manually
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function handleSaveName() {
    if (!draftName.trim()) return;
    setFullName(draftName.trim());
  }

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <div className="print:hidden">
          <Link to="/profile" className="flex items-center gap-1.5 text-sm font-medium text-espresso-700/70 hover:text-espresso-900">
            <ArrowLeft className="h-4 w-4" /> Back to your profile
          </Link>
          <h1 className="mt-4 font-display text-3xl font-semibold text-espresso-950">Your certificate</h1>
        </div>

        {!done ? (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-espresso-900/15 bg-cream/60 p-8 text-center">
            <Lock className="mx-auto h-6 w-6 text-espresso-500" />
            <p className="mt-3 font-display text-xl font-semibold text-espresso-950">
              {completed.length} of {TOTAL_CHAPTERS} chapters done
            </p>
            <p className="mt-1 text-sm text-espresso-700/70">
              Finish the whole Core course, all three modules, and your certificate unlocks here automatically.
            </p>
            <Link
              to="/profile"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-espresso-950 px-5 py-3 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800"
            >
              Keep going
            </Link>
          </div>
        ) : !fullName ? (
          <div className="mt-8 rounded-2xl border border-espresso-900/10 bg-cream p-6 sm:p-8">
            <p className="font-display text-xl font-semibold text-espresso-950">One last thing: your name</p>
            <p className="mt-1 text-sm text-espresso-700/70">
              Whatever you type below appears exactly as-is on your certificate. You can change it later from your
              profile.
            </p>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <input
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="Your full name"
                className="flex-1 rounded-lg border border-espresso-900/15 bg-white px-3.5 py-3 text-sm text-espresso-900 focus:border-caramel-500"
              />
              <button
                onClick={handleSaveName}
                disabled={!draftName.trim()}
                className="rounded-xl bg-espresso-950 px-5 py-3 text-sm font-semibold text-caramel-100 transition hover:bg-espresso-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Generate certificate
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-2 mb-6 text-sm text-espresso-700/70 print:hidden">
              You finished all 12 chapters. Here's your proof of it.
            </p>
            <CertificateCard name={fullName} completedAt={courseCompletedAt!} certId={certificateId(user!.id)} />

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 print:hidden">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 rounded-xl border border-espresso-900/15 bg-cream px-4 py-2.5 text-sm font-semibold text-espresso-800 transition hover:bg-latte/50"
              >
                {copied ? <Check className="h-4 w-4 text-sage-600" /> : <Copy className="h-4 w-4" />}
                {copied ? "Link copied" : "Copy shareable link"}
              </button>
              <a
                href={linkedInAddToProfileUrl({ userId: user!.id, completedAt: courseCompletedAt! })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a59a8]"
              >
                <ExternalLink className="h-4 w-4" /> Add to LinkedIn
              </a>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-xl border border-espresso-900/15 bg-cream px-4 py-2.5 text-sm font-semibold text-espresso-800 transition hover:bg-latte/50"
              >
                <Printer className="h-4 w-4" /> Print / save as PDF
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
