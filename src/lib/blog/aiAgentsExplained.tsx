export default function AiAgentsExplained() {
  return (
    <>
      <p>
        You ask ChatGPT to summarize an email. It summarizes the email. That's the whole interaction: you ask,
        it answers, you're back in the driver's seat for whatever happens next.
      </p>
      <p>
        Now imagine telling an AI tool "keep my inbox under control this week." It reads new emails as they
        arrive, decides which ones actually need a reply, drafts those replies in your voice, checks your
        calendar before suggesting meeting times, and only pings you when something looks like it needs a human
        decision. You didn't ask it anything else after that first instruction. It just kept going.
      </p>
      <p>
        That second thing is an <strong>AI agent</strong>, and the difference between it and a chatbot is the
        single most important AI concept to actually understand right now, because the tools being pitched to
        you at work are quietly shifting from the first kind to the second.
      </p>

      <h2>The actual difference</h2>
      <p>
        A chatbot answers. An agent acts. A chatbot is like a barista who makes exactly the one drink you
        ordered and waits for your next order. An agent is like telling your regular coffee place "just keep me
        stocked for the week" — they notice when you're running low, remember what you actually like, and have
        it ready without you asking each time.
      </p>
      <p>
        More precisely, an agent is given a <strong>goal</strong>, not a single instruction. It breaks that goal
        into steps, decides which tools it needs (your calendar, your email, a spreadsheet, a web search), uses
        them in sequence, checks whether the result actually solves the goal, and keeps going, or asks for help,
        until it's done.
      </p>

      <h2>Why this is showing up in your workplace right now</h2>
      <p>
        This isn't a future-tense trend. According to Microsoft's 2025 Work Trend Index for India, 93% of
        business leaders say they're planning to deploy AI agents to enhance workforce capabilities within the
        next 12 to 18 months, and 59% say they're already using agents to automate workflows and business
        processes at scale. Whatever industry you're in, there's a decent chance an "agent" is already in a
        vendor pitch deck somewhere in your organization.
      </p>
      <p>Some genuinely useful examples of what this looks like in ordinary corporate roles:</p>
      <ul>
        <li>
          <strong>HR:</strong> an agent that screens incoming resumes against a role's actual requirements, and
          only surfaces the ones worth a human look, instead of a keyword filter that just throws out anything
          without the "right" buzzword.
        </li>
        <li>
          <strong>Finance:</strong> an agent that pulls invoices from three different systems, matches them
          against purchase orders, and flags the mismatches, instead of someone doing that reconciliation by
          hand every month.
        </li>
        <li>
          <strong>Sales:</strong> an agent that researches a prospect across their company website, recent news,
          and LinkedIn activity, then drafts a first-outreach email that actually references something specific
          about them.
        </li>
      </ul>

      <h2>What agents still get wrong</h2>
      <p>
        None of this means you should let an agent run unsupervised on anything that matters. Agents can
        misread an ambiguous goal, get stuck repeating a step that isn't working, or confidently do the wrong
        thing and not realize it. The honest, current state of the technology is: useful for speeding up a
        multi-step task, not yet trustworthy enough to remove a human from reviewing the output before it goes
        out the door, especially for anything customer-facing or financial.
      </p>
      <blockquote>
        The skill that matters isn't building agents yourself. It's knowing what one actually is, so you're not
        either dismissing a genuinely useful tool as "just a chatbot" or trusting one with something it isn't
        ready for.
      </blockquote>

      <h2>What to actually do with this</h2>
      <p>
        Next time someone on your team or a vendor says "it's got an AI agent," ask one simple question: what
        goal does it pursue on its own, and what does it do when it gets stuck? If the honest answer is "it
        still just answers one question at a time," you're looking at a chatbot with a newer name on it. If it
        can genuinely chain steps together and check its own work, you're looking at something that can save
        real hours, provided someone's still reviewing what it produces.
      </p>
      <p>
        That's the entire judgment call. You don't need to be technical to make it, you just need to know what
        question to ask.
      </p>
    </>
  );
}
