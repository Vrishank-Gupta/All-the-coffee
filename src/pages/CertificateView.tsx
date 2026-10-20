import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { CertificateCard } from "../components/certificate/CertificateCard";
import { certificateId } from "../lib/certificate";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { useDocumentMeta } from "../lib/useDocumentMeta";

interface CertificateData {
  full_name: string | null;
  capstone_title: string | null;
  completed_at: string | null;
}

export default function CertificateView() {
  const { userId } = useParams<{ userId: string }>();
  const [data, setData] = useState<CertificateData | null | undefined>(undefined);

  useDocumentMeta(
    data?.full_name ? `${data.full_name}'s Certificate` : "Certificate",
    "A certificate of completion from All The Coffee's Core Course."
  );

  useEffect(() => {
    if (!userId || !isSupabaseConfigured) {
      setData(null);
      return;
    }
    let cancelled = false;
    supabase.rpc("get_certificate", { p_user_id: userId }).then(({ data: result, error }) => {
      if (cancelled) return;
      setData(!error && result ? (result as CertificateData) : null);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <div className="min-h-screen bg-paper bg-grain">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <div className="print:hidden">
          <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-espresso-700/70 hover:text-espresso-900">
            <ArrowLeft className="h-4 w-4" /> All The Coffee
          </Link>
        </div>

        {data === undefined ? (
          <p className="mt-10 text-center text-sm text-espresso-700/60">Loading…</p>
        ) : data === null || !data.full_name || !data.completed_at ? (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-espresso-900/15 bg-cream/60 p-8 text-center">
            <HelpCircle className="mx-auto h-6 w-6 text-espresso-500" />
            <p className="mt-3 font-display text-xl font-semibold text-espresso-950">Certificate not found</p>
            <p className="mt-1 text-sm text-espresso-700/70">
              Either this link is wrong, or this course hasn't been completed yet.
            </p>
          </div>
        ) : (
          <>
            <p className="mt-2 mb-6 text-center text-sm text-espresso-700/70 print:hidden">
              Verified certificate from All The Coffee.
            </p>
            <CertificateCard name={data.full_name} capstoneTitle={data.capstone_title} completedAt={data.completed_at} certId={certificateId(userId!)} userId={userId!} />
          </>
        )}
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}
