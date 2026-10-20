import { Link } from "react-router-dom";

export default function AiSalesWithoutSoundingRobotic() {
  return (
    <>
      <p>
        You can usually tell within a sentence. An outreach email that's a little too polished, a little too
        generic, hits every "best practice" bullet point and somehow says nothing specific about you at all.
        That's the smell of unedited AI output, and salespeople are producing a lot of it right now, because the
        tools make it so easy to generate a plausible-sounding email in ten seconds.
      </p>
      <p>
        The irony is that AI genuinely does speed up real parts of a sales process. The problem isn't the tool,
        it's stopping at the first draft instead of treating it as a draft. This piece covers where AI actually
        saves you time, where it quietly costs you deals, and how to use it on the channel most Indian sales
        conversations really happen on: WhatsApp.
      </p>

      <h2>What the numbers say (and what they don't)</h2>
      <p>
        AI in sales is no longer an experiment. Salesforce's{" "}
        <a
          href="https://www.salesforce.com/news/stories/state-of-sales-report-announcement-2026/"
          target="_blank"
          rel="noopener noreferrer"
        >
          2026 State of Sales report
        </a>
        , based on a survey of 4,050 sales professionals in 22 countries (India included) run in August and
        September 2025, found that:
      </p>
      <ul>
        <li>87% of sales organisations use some form of AI.</li>
        <li>54% of sellers say they have used AI agents (tools that carry out multi-step tasks for you, not just answer questions), and nearly 9 in 10 plan to by 2027.</li>
        <li>Sellers expect agents to cut prospect research time by 34% and email drafting time by 36%.</li>
        <li>The average seller spends only 40% of their time actually selling. The rest goes to admin, data entry and internal chasing.</li>
      </ul>
      <p>
        That last number is the real case for AI in sales. Not "write my emails for me", but "give me back some
        of the 60% of my week that isn't selling".
      </p>
      <p>
        Now look at the other side of the table. Gartner surveyed 645 B2B buyers in the same period and, in a{" "}
        <a
          href="https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-survey-finds-sixty-nine-percent-of-b-two-b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights"
          target="_blank"
          rel="noopener noreferrer"
        >
          May 2026 release
        </a>
        , reported that 45% had used generative AI during a recent purchase, mainly to research vendors and
        products. 67% said they prefer a rep-free buying experience. And yet 69% said they prefer to validate
        AI-generated insights with a sales rep.
      </p>
      <p>
        Read those together and the job becomes clear. Your buyer has already asked ChatGPT about you. They don't
        need another AI-sounding summary from you. They need a person who can tell them which parts of that
        summary are true for their situation. If your email reads exactly like what their own chatbot would have
        produced, you've given them no reason to talk to you.
      </p>

      <h2>Where AI genuinely helps a sales cycle</h2>
      <p>
        These are the four places where AI earns its keep, with prompts you can adapt. Swap in your own details;
        the more specific the input, the less generic the output.
      </p>

      <h3>1. Research before a call</h3>
      <p>
        Pulling together a prospect's recent company news, their role, and relevant industry context, in two
        minutes instead of twenty.
      </p>
      <blockquote>
        I have a first call with the procurement head of a mid-sized auto components manufacturer in Pune. Using
        only information you can find publicly, summarise: what the company makes, any news from the last six
        months, and three questions I could ask that show I've done my homework. Mark anything you're not sure
        about as "unverified".
      </blockquote>
      <p>
        That last line matters. AI tools can still state wrong facts with full confidence, like a funding round
        that never happened or a person who left the company last year. Check anything you plan to mention out
        loud. Getting a prospect's own company news wrong is worse than not mentioning it at all.
      </p>

      <h3>2. First-draft outreach</h3>
      <p>
        A starting point for a cold email or follow-up, built from the research above, that you then edit to add
        one genuinely specific detail.
      </p>
      <blockquote>
        Draft a 90-word follow-up email to the person above. Tone: friendly, direct, no flattery, no "I hope this
        finds you well". One clear ask: a 20-minute call next week. Don't use bullet points.
      </blockquote>
      <p>
        Telling the AI what <em>not</em> to do is half the trick. Left alone, it reaches for the same openers
        everyone else's AI reaches for.
      </p>

      <h3>3. Call notes into CRM entries</h3>
      <p>
        Turning a messy voice memo or rough notes into a clean summary with next steps, instead of typing it all
        out by hand after every call. This is the least glamorous use and probably the most valuable, because it
        attacks that 60% of non-selling time directly.
      </p>
      <blockquote>
        Here are my rough notes from a call. Turn them into: (a) a three-line summary, (b) the client's main
        concern in their words, (c) next steps with owner and date, (d) anything I promised to send. Don't add
        anything that isn't in my notes.
      </blockquote>

      <h3>4. Objection prep</h3>
      <p>
        Running through likely pushback before a tough call, so you've already thought through your response
        instead of improvising under pressure. The same Salesforce report found that 47% of Gen Z reps say they
        don't get enough role-play practice before customer calls. AI is a patient sparring partner at 10pm.
      </p>
      <blockquote>
        Play a sceptical CFO at a 200-person logistics company. I'm selling route-planning software. Push back on
        price, on switching costs, and on "we already have something that works". Stay in character, and after
        five exchanges tell me which of my answers were weakest.
      </blockquote>

      <h2>Where it goes wrong</h2>
      <p>
        The moment a prospect can tell they received the same email structure as everyone else, you've lost
        whatever trust that first message was supposed to build. AI-written outreach that skips the editing step
        tends to have a specific texture: generic compliments, vague value propositions, and a complete absence
        of anything that proves you actually looked at their business.
      </p>
      <p>The other common mistakes:</p>
      <ul>
        <li>
          <strong>Sending unchecked "facts".</strong> As above. The AI's research is a lead, not a source.
        </li>
        <li>
          <strong>Pasting client data into personal AI accounts.</strong> Price lists, contract terms and customer
          phone numbers don't belong in a free chatbot your company hasn't approved. Our guide to{" "}
          <Link to="/blog/ai-data-privacy-india">AI and data privacy in India</Link> covers what's safe.
        </li>
        <li>
          <strong>Letting AI make promises.</strong> Discounts, delivery dates and commitments must come from you,
          because you're the one who has to keep them.
        </li>
      </ul>

      <h2>The one-line rule that fixes most of it</h2>
      <p>
        Before you send anything AI helped draft, add one sentence that could only be true about this specific
        person or company: something from their recent announcement, a detail from their LinkedIn activity, a
        point they made on your last call. That single human detail is usually the difference between an email
        that gets deleted and one that gets a reply.
      </p>
      <blockquote>
        Use AI for the research and the first draft. Use yourself for the one sentence that proves you actually
        read what it found.
      </blockquote>

      <h2>The WhatsApp question</h2>
      <p>
        In much of Indian sales, the real follow-up doesn't happen on email. It happens on WhatsApp: the "Sir,
        sharing the quotation as discussed" message, the voice note from the client at 9:40pm, the dealer who
        only replies with a thumbs up.
      </p>
      <p>
        WhatsApp is also where AI-written text looks most out of place. A five-paragraph, perfectly punctuated
        message in a chat full of one-liners reads like a circular from head office. If you use AI here, ask for
        short:
      </p>
      <blockquote>
        Rewrite this as a WhatsApp follow-up to a client I've met twice. Maximum three short lines. Warm but not
        over-familiar. End with a simple yes/no question.
      </blockquote>
      <p>Two practical things worth knowing:</p>
      <ul>
        <li>
          <strong>If your company uses the WhatsApp Business Platform</strong> (the API version, usually run
          through a CRM or vendor), Meta's rules{" "}
          <a
            href="https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages"
            target="_blank"
            rel="noopener noreferrer"
          >
            open a 24-hour "customer service window"
          </a>{" "}
          each time the customer messages you. Inside it, you can send normal messages. Once it closes, you can
          only send pre-approved template messages. So an AI tool can't just fire off free-form follow-ups
          whenever it likes.
        </li>
        <li>
          <strong>WhatsApp now has its own AI agent for businesses.</strong> Meta launched the Meta Business Agent
          for India at its{" "}
          <a
            href="https://www.indiatvnews.com/technology/news/whatsapp-launches-meta-business-agent-in-india-ai-assistant-to-help-businesses-automate-customer-support-2026-07-08-1047580"
            target="_blank"
            rel="noopener noreferrer"
          >
            Business Summit in Mumbai in July 2026
          </a>
          . It can answer product questions, recommend catalogue items, book appointments, qualify leads,
          summarise missed conversations, and hand tricky chats to a human. Sensible use: let it answer "what's
          the price of the 5kg pack?" at 11pm. Don't let it negotiate.
        </li>
      </ul>

      <h2>Who does what: a quick split</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Let AI do</th>
              <th>Keep for yourself</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Prospect research</td>
              <td>Gather and summarise public information</td>
              <td>Check anything you'll repeat to the client</td>
            </tr>
            <tr>
              <td>Outreach email</td>
              <td>First draft, subject line options</td>
              <td>The one specific line, the final send</td>
            </tr>
            <tr>
              <td>Call notes</td>
              <td>Structure, summary, next-step list</td>
              <td>Confirm nothing was invented or missed</td>
            </tr>
            <tr>
              <td>Objection handling</td>
              <td>Role-play the sceptical buyer</td>
              <td>Decide what you'll actually concede</td>
            </tr>
            <tr>
              <td>WhatsApp follow-ups</td>
              <td>Shorten and tidy your message</td>
              <td>Tone, timing, anything involving price</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>A practical workflow worth trying</h2>
      <ol>
        <li>Ask AI to pull together what's publicly known about the prospect and their company, flagging anything unverified.</li>
        <li>Check the two or three facts you intend to use.</li>
        <li>Ask it to draft an outreach email or WhatsApp message using that research, with clear rules on length and tone.</li>
        <li>Read the draft, and add or swap in one specific, human detail it couldn't have known mattered.</li>
        <li>Send it only after that edit, never the raw first draft.</li>
        <li>After the call, paste your rough notes in and get a clean CRM entry with next steps.</li>
      </ol>
      <p>
        That extra thirty seconds of editing is the entire difference between "AI helped me work faster" and "I
        got replaced by a worse version of myself." The reps who use AI well aren't necessarily using fancier
        tools than everyone else. They're just not skipping that last step.
      </p>

      <h2>Your next step</h2>
      <p>
        Pick one real prospect from this week's list and run the workflow above once, start to finish. Notice
        which step saved you the most time. For most people it's the call notes, not the email.
      </p>
      <p>
        If you want to go one step further and build your own small tool for this, say a follow-up tracker that
        tells you who you haven't chased in a week, that's exactly what Chapter 4 of our course walks you through,
        no coding background needed. <Link to="/signup">Module A is free to start</Link>. And if you're curious
        what "AI agents" actually means beyond the sales pitch, read{" "}
        <Link to="/blog/ai-agents-explained">our plain-English explainer</Link>.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://www.salesforce.com/news/stories/state-of-sales-report-announcement-2026/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Salesforce: State of Sales report announcement, 2026
            </a>{" "}
            (3 February 2026)
          </li>
          <li>
            <a
              href="https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-survey-finds-sixty-nine-percent-of-b-two-b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gartner: Survey Finds 69% of B2B Buyers Turn to Sales Reps to Validate AI-Generated Insights
            </a>{" "}
            (20 May 2026)
          </li>
          <li>
            <a
              href="https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meta for Developers: WhatsApp Business Platform, sending messages and the customer service window
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.indiatvnews.com/technology/news/whatsapp-launches-meta-business-agent-in-india-ai-assistant-to-help-businesses-automate-customer-support-2026-07-08-1047580"
              target="_blank"
              rel="noopener noreferrer"
            >
              India TV News: WhatsApp launches Meta Business Agent in India
            </a>{" "}
            (8 July 2026)
          </li>
        </ul>
      </div>
    </>
  );
}
