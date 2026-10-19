import { LegalPageLayout } from "../components/layout/LegalPageLayout";

export default function Terms() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="17 October 2026">
      <p>
        All The Coffee is run by an individual based in India, not a registered company. These
        terms apply whenever you create an account or make a payment on this site. By using All The Coffee, you're
        agreeing to them.
      </p>

      <h2>What you're getting</h2>
      <p>
        All The Coffee is an online course. Chapters 0–3 (Module A) are free for anyone with an account, no payment
        required. Chapters 4–11 (Modules B and C) unlock with the same one-time payment, currently ₹599 as part of
        a capped, 100-seat Founding Batch; see the Course Map for current status. A further Tier 2 is planned but
        not yet built. Nothing on this site promises Tier 2 access to past buyers at any particular price — if that
        changes, it will be announced here first.
      </p>

      <h2>Accounts</h2>
      <p>
        You need an account (email/password or Google sign-in) to access any chapter, including the free ones.
        You're responsible for keeping your login credentials secure. One account is for one person's personal
        learning; please don't share logins.
      </p>

      <h2>Payment</h2>
      <p>
        Modules B and C's ₹599 is a one-time payment, not a subscription. Payments are processed by Razorpay; we never see
        or store your card or UPI details ourselves. See the <a href="/refund-policy">Refund Policy</a> for what
        happens if you want your money back.
      </p>

      <h2>Course content and your use of it</h2>
      <p>
        Chapter content, sample data, and the tools you're shown how to build using it are for your own personal
        learning. Please don't redistribute, resell, or republish the course material itself. Anything you build
        while following along, your own code and tools, is yours to keep and use however you like.
      </p>

      <h2>No guaranteed outcomes</h2>
      <p>
        This course teaches real skills through real, hands-on practice, but how much you get out of it depends on
        the time and effort you put in. We don't promise a specific job outcome, promotion, or skill level by the
        end.
      </p>

      <h2>Service changes and availability</h2>
      <p>
        This is a small, early-stage product built and run by one person. Features, pricing for new buyers, and the
        course roadmap may change over time. We'll do our best to communicate meaningful changes clearly, but we
        can't guarantee the service will be available without interruption.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        All The Coffee is provided as-is. To the extent permitted by law, we aren't liable for indirect or
        consequential losses arising from your use of the course. Nothing here limits liability where it can't
        legally be limited.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India.</p>

      <h2>Changes to these terms</h2>
      <p>
        If these terms change in a way that affects you meaningfully, we'll update the date at the top of this page.
        Continuing to use the course after a change means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href="mailto:info@allthecoffee.in">info@allthecoffee.in</a>
      </p>
    </LegalPageLayout>
  );
}
