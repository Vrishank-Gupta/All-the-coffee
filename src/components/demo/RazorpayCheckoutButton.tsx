import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { loadRazorpayScript } from "../../lib/razorpay";
import { useAuth } from "../../lib/auth";
import { useProgress } from "../../lib/progress";
import { useFoundingSeatsRemaining } from "../../lib/foundingSeats";

type Status = "idle" | "loading" | "error" | "success";

// When a Supabase Edge Function returns a non-2xx status, supabase-js hands back
// a generic "Edge Function returned a non-2xx status code" message and puts the
// actual response (with our real { error: "..." } body) on `error.context`
// instead. Without this, every server-side error message we carefully write
// gets replaced by that one generic string before it ever reaches the user.
async function extractFunctionError(err: unknown, fallback: string): Promise<string> {
  const context = (err as { context?: Response })?.context;
  if (context && typeof context.json === "function") {
    try {
      const body = await context.clone().json();
      if (body?.error) return body.error;
    } catch {
      // response body wasn't JSON; fall through to the generic message below
    }
  }
  return err instanceof Error ? err.message : fallback;
}

export function RazorpayCheckoutButton() {
  const { user, configured } = useAuth();
  const { hasPaid, refreshProfile } = useProgress();
  const seatsLeft = useFoundingSeatsRemaining();
  const soldOut = seatsLeft === 0;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setStatus("loading");
    try {
      await loadRazorpayScript();

      const { data: order, error: orderError } = await supabase.functions.invoke("create-razorpay-order");
      if (orderError || order?.error) {
        throw new Error(order?.error ?? (await extractFunctionError(orderError, "Could not start checkout.")));
      }

      const razorpay = new window.Razorpay!({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "All The Coffee",
        description: "Founding member: Module B",
        prefill: { email: user?.email ?? "" },
        theme: { color: "#241711" },
        handler: async (response) => {
          const { data: verify, error: verifyError } = await supabase.functions.invoke("verify-razorpay-payment", {
            body: {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
          });
          if (verifyError || verify?.error) {
            const fallback = "Payment went through, but we couldn't confirm it. Email info@allthecoffee.in with your payment ID: " + response.razorpay_payment_id;
            setError(verify?.error ?? (await extractFunctionError(verifyError, fallback)));
            setStatus("error");
            return;
          }
          await refreshProfile();
          setStatus("success");
        },
        modal: {
          ondismiss: () => setStatus("idle"),
        },
      });
      razorpay.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong starting checkout.");
      setStatus("error");
    }
  }

  if (hasPaid || status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl bg-sage-600 px-5 py-3 font-semibold text-white">
        <CheckCircle2 className="h-4.5 w-4.5" /> You're a founding member
      </div>
    );
  }

  if (soldOut) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center font-semibold text-caramel-100">
        The Founding Batch is sold out. We'll open the next cohort once Module C ships.
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={status === "loading" || !configured}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-caramel-500 px-5 py-3 font-semibold text-espresso-950 transition hover:bg-caramel-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "loading" ? "Opening checkout…" : "Become a founding member: ₹599*"}
      </button>
      {!configured && (
        <p className="mt-2 text-center text-xs text-caramel-100/60">Payments aren't set up on this environment yet.</p>
      )}
      {error && <p className="mt-2 text-center text-xs text-brick-300">{error}</p>}
    </div>
  );
}
