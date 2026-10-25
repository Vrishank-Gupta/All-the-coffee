import { LegalPageLayout } from "../components/layout/LegalPageLayout";

export default function Privacy() {
  return (
    <LegalPageLayout page="/privacy" lastUpdated="25 October 2026">
      <p>
        All The Coffee is run by an individual based in India, not a registered company. This page explains what information
        is collected when you use the site, and what happens to it.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Your email address, and a hashed password if you sign up with email/password</li>
        <li>Your name and profile photo, only if you sign up with Google</li>
        <li>
          Your course progress: which chapters you've completed, and anything you type into the course's own
          prompts (e.g. the "boring task" from Chapter 0, nervousness check-ins)
        </li>
        <li>Whether you've paid for Modules B and C, and the Razorpay order/payment ID associated with that payment</li>
        <li>
          Anonymous visit counts: which pages get viewed and roughly how many distinct visitors the site gets,
          tracked by a random ID stored in your browser, never linked to your email or identity. This is ours alone,
          built specifically for this site; no third-party analytics script runs here. The same anonymous ID also
          records a few on-page actions: which "Start" buttons get clicked, roughly how far down the home page people
          scroll, when a chapter is marked complete, and the source tag on a link you followed (like ?src=ig).
        </li>
        <li>
          If you start Chapters 0 and 1 without an account, your progress and answers are saved only in your own
          browser. When you create an account or log in, they're copied into your account once and removed from the
          browser.
        </li>
        <li>
          A coarse location (city/country) for each visit, worked out from your IP address at that moment. The IP
          address itself is never stored anywhere, not even briefly in a log; only the resulting city/country is
          kept.
        </li>
      </ul>
      <p>
        We never see or store your card number, UPI ID, or other payment instrument details. Razorpay handles that
        directly under their own security and privacy practices.
      </p>

      <h2>What we use it for</h2>
      <ul>
        <li>To create your account and let you log back in</li>
        <li>To save your progress and answers so they're there when you come back</li>
        <li>To unlock Module B once your payment is verified</li>
        <li>To send you account emails: signup confirmation, password reset</li>
        <li>To understand which pages get visited and roughly how much traffic the site gets</li>
      </ul>
      <p>
        We don't sell your data, and we don't use any third-party advertising trackers or analytics scripts (Google
        Analytics, Meta Pixel, or similar) on this site.
      </p>

      <h2>Who else sees it</h2>
      <p>A few outside services help run this course, each under their own privacy practices:</p>
      <ul>
        <li><strong>Supabase</strong>: hosts the database and handles authentication</li>
        <li><strong>Razorpay</strong>: processes payments</li>
        <li><strong>Resend</strong>: sends account emails (confirmation, password reset)</li>
        <li><strong>Google</strong>: only if you choose "Sign in with Google"</li>
        <li><strong>ip-api.com</strong>: resolves your visit's coarse city/country from your IP address; we only keep their answer, never the IP we sent them</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        Your data is kept as long as your account exists. If you'd like your account and data deleted, email us (see
        below) and we'll do it, generally within a few days.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see what data we have on you, correct it, or have it deleted at any time by emailing{" "}
        <a href="mailto:info@allthecoffee.in">info@allthecoffee.in</a>.
      </p>

      <h2>Security</h2>
      <p>
        We use industry-standard practices (Supabase's authentication and database security, HTTPS everywhere) to
        protect your data, but no online service can guarantee absolute security.
      </p>

      <h2>Not for children</h2>
      <p>This course is built for working professionals and isn't intended for use by children under 18.</p>

      <h2>Changes to this policy</h2>
      <p>If this policy changes meaningfully, we'll update the date at the top of this page.</p>

      <h2>Contact</h2>
      <p>
        Questions about your data: <a href="mailto:info@allthecoffee.in">info@allthecoffee.in</a>
      </p>
    </LegalPageLayout>
  );
}
