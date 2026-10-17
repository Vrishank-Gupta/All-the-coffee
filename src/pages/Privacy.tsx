import { LegalPageLayout } from "../components/layout/LegalPageLayout";

export default function Privacy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="17 October 2026">
      <p>
        All The Coffee is run by Vrishank Gupta, an individual based in India. This page explains what information
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
        <li>Whether you've paid for Module B, and the Razorpay order/payment ID associated with that payment</li>
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
      </ul>
      <p>
        We don't sell your data, and we don't use any third-party advertising trackers or analytics scripts on this
        site, at the time of writing.
      </p>

      <h2>Who else sees it</h2>
      <p>A few outside services help run this course, each under their own privacy practices:</p>
      <ul>
        <li><strong>Supabase</strong> — hosts the database and handles authentication</li>
        <li><strong>Razorpay</strong> — processes payments</li>
        <li><strong>Resend</strong> — sends account emails (confirmation, password reset)</li>
        <li><strong>Google</strong> — only if you choose "Sign in with Google"</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        Your data is kept as long as your account exists. If you'd like your account and data deleted, email us (see
        below) and we'll do it, generally within a few days.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see what data we have on you, correct it, or have it deleted at any time by emailing{" "}
        <a href="mailto:hello@allthecoffee.in">hello@allthecoffee.in</a>.
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
        Questions about your data: <a href="mailto:hello@allthecoffee.in">hello@allthecoffee.in</a>
      </p>
    </LegalPageLayout>
  );
}
