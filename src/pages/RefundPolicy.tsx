import { LegalPageLayout } from "../components/layout/LegalPageLayout";

export default function RefundPolicy() {
  return (
    <LegalPageLayout title="Refund Policy" lastUpdated="17 October 2026">
      <p>
        If it isn't for you, you can get your ₹599 back. That one payment unlocks both Module B and Module C
        together, and this policy covers all of it. This page explains exactly how and what to expect.
      </p>

      <h2>The promise</h2>
      <p>
        You're covered for <strong>30 days from the day you paid, or until you finish Module B, whichever is
        later</strong>. In practice: if you pay and finish all four Module B chapters in a week, you still have the
        remaining time in that 30-day window to ask for a refund if you change your mind. If you're still working
        through Module B after 30 days, you're still covered until you either finish it or decide it's not for you.
        This window applies to your whole ₹599 payment, so Module C is covered by it too, whether or not you've
        started it yet.
      </p>

      <h2>How to request one</h2>
      <p>
        Email <a href="mailto:info@allthecoffee.in">info@allthecoffee.in</a> from the email address on your
        account, with your Razorpay payment ID if you have it handy (it's fine if you don't, we can look it up by
        your account email). Tell us you'd like a refund. No reason required, though we're always glad to hear what
        didn't work for you.
      </p>

      <h2>What happens next</h2>
      <p>
        This is a small, one-person operation, so refunds are reviewed and processed manually rather than
        instantly. Expect a reply within 2 business days, and the actual refund (back to your original payment
        method via Razorpay) within 5–7 business days after that's confirmed.
      </p>

      <h2>What's refunded</h2>
      <p>
        The full ₹599 you paid. We don't do partial refunds. Once refunded, your account reverts to the free tier,
        Module A (Chapters 0–3) stays yours either way, and your seat in the 100-seat Founding Batch becomes
        available again for someone else.
      </p>

      <h2>Contact</h2>
      <p>
        Questions before you decide either way: <a href="mailto:info@allthecoffee.in">info@allthecoffee.in</a>
      </p>
    </LegalPageLayout>
  );
}
