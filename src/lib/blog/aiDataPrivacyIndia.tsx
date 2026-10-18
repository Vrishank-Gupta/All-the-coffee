export default function AiDataPrivacyIndia() {
  return (
    <>
      <p>
        You're stuck on an email. You paste the whole thread into ChatGPT and ask it to draft a reply. Thirty
        seconds later you have a decent draft. Nobody got hurt, nothing went wrong, and you just saved ten
        minutes. Most days, that's exactly how this should work.
      </p>
      <p>
        But that thread had a customer's phone number in it. And last month's thread had a number nobody's
        supposed to see yet. This article isn't about scaring you away from AI tools, it's about knowing the
        actual line, so you don't have to guess every single time.
      </p>

      <h2>What's generally fine to paste</h2>
      <ul>
        <li>Your own drafts: emails, reports, presentations you wrote</li>
        <li>Publicly available information: anything already on your company's website or a public filing</li>
        <li>Hypothetical or anonymized examples: "a customer in retail asked about X" instead of their real name</li>
        <li>General questions about how to do something, with no real data attached at all</li>
      </ul>

      <h2>What generally isn't</h2>
      <ul>
        <li>Anything with a real customer's name, phone number, email, or address attached to specifics about them</li>
        <li>Unreleased financial numbers, before they're public</li>
        <li>Anything your company has explicitly classified as confidential or restricted</li>
        <li>Source code containing API keys, passwords, or other credentials</li>
        <li>Health, biometric, or other sensitive personal data, which gets extra legal protection almost everywhere, India included</li>
      </ul>

      <h2>Why this matters more in India specifically</h2>
      <p>
        India's Digital Personal Data Protection Act treats personal data, information that can identify a
        specific person, as something your company has real obligations around: how it's collected, why it's
        being processed, and who it's shared with. Pasting a customer's details into a public AI tool is, in
        effect, sharing their personal data with a third party they never agreed to. That's the exact category
        of thing the law cares about, regardless of how helpful the AI's answer turns out to be.
      </p>
      <p>
        You don't need to become a privacy lawyer to get this right day to day. You need one habit: before you
        paste something, ask "would I be comfortable if the person this is about saw exactly what I just typed?"
        If the answer's no, strip the identifying details first, or don't paste it at all.
      </p>

      <h2>The thing most people don't know: not all AI tiers are the same</h2>
      <p>
        Most major AI providers offer a free or personal tier and a separate business or enterprise tier, and
        the data handling is often genuinely different between them. Business tiers typically come with a
        guarantee that your conversations aren't used to train future models and are deleted on a defined
        schedule. Free, personal tiers often don't make that same promise by default. If your company has a
        paid business AI subscription, that's usually the one you should actually be using for anything work
        related, not your personal free account.
      </p>
      <blockquote>
        If you don't know which tier your company uses, that's worth a two-minute message to IT, not a guess.
      </blockquote>

      <h2>A simple rule that covers most situations</h2>
      <p>
        Before you paste something into any AI tool: strip names, strip numbers that aren't public yet, and if
        you genuinely need the AI to understand real specifics, describe the situation generically instead of
        pasting the literal data. "A client wants to renegotiate a two-year contract at a lower rate" gets you
        just as good a drafting assist as pasting the client's actual name and the actual number, with none of
        the risk.
      </p>
      <p>
        That one habit covers the overwhelming majority of real situations you'll run into. The rest is just
        asking IT or legal when something feels genuinely unusual, which is exactly what they're there for.
      </p>
    </>
  );
}
