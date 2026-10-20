import { Link } from "react-router-dom";

export default function AiAgentsExplained() {
  return (
    <>
      <p>
        You ask ChatGPT to summarise an email. It summarises the email. That's the whole interaction: you ask, it
        answers, and you're back in the driver's seat for whatever happens next.
      </p>
      <p>
        Now imagine telling an AI tool "keep my inbox under control this week." It reads new emails as they arrive,
        decides which ones actually need a reply, drafts those replies in your voice, checks your calendar before
        suggesting meeting times, and only pings you when something looks like it needs a human decision. You didn't
        ask it anything else after that first instruction. It just kept going.
      </p>
      <p>
        That second thing is an <strong>AI agent</strong>. The difference between it and a chatbot is one of the most
        useful AI ideas to actually understand right now, because the tools being pitched to you at work are quietly
        shifting from the first kind to the second. And the word "agent" is being stuck on a lot of things that
        aren't one.
      </p>

      <h2>The actual difference</h2>
      <p>
        A chatbot answers. An agent acts. A chatbot is like a barista who makes exactly the one drink you ordered and
        waits for your next order. An agent is like telling your regular coffee place "just keep me stocked for the
        week." They notice when you're running low, remember what you actually like, and have it ready without you
        asking each time.
      </p>
      <p>
        More precisely, an agent is given a <strong>goal</strong>, not a single instruction. It breaks that goal into
        steps, decides which <strong>tools</strong> it needs (in AI-speak, a "tool" just means something the AI is
        allowed to use: your calendar, your email, a spreadsheet, a web search), uses them in sequence, checks whether
        the result actually solves the goal, and keeps going, or asks for help, until it's done.
      </p>
      <p>That loop is the whole idea. Written out, it looks like this:</p>
      <ol>
        <li><strong>Goal:</strong> "Find three vendors who can deliver 500 branded mugs to our Pune office before Diwali."</li>
        <li><strong>Plan:</strong> search for suppliers, check delivery times, compare prices, shortlist.</li>
        <li><strong>Act:</strong> runs the searches, opens supplier pages, fills a comparison sheet.</li>
        <li><strong>Check:</strong> "Two of these don't deliver to Pune. Go back and find more."</li>
        <li><strong>Hand back:</strong> a shortlist, plus a note on anything it wasn't sure about.</li>
      </ol>
      <p>
        A chatbot would have stopped after step one and given you a nice paragraph about how to find mug suppliers.
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Chatbot</th>
              <th>AI agent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>You give it</td>
              <td>A question or one instruction</td>
              <td>A goal</td>
            </tr>
            <tr>
              <td>It does</td>
              <td>Replies with text</td>
              <td>Takes several steps, using tools</td>
            </tr>
            <tr>
              <td>Who decides the next step</td>
              <td>You</td>
              <td>The agent, within limits you set</td>
            </tr>
            <tr>
              <td>Can it change things?</td>
              <td>No, it just talks</td>
              <td>Often yes: send, book, update, buy</td>
            </tr>
            <tr>
              <td>Main risk</td>
              <td>A wrong answer you might believe</td>
              <td>A wrong action that has already happened</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        That last row is the one to remember. When a chatbot is wrong, you get a bad paragraph. When an agent is
        wrong, the email may already have gone out.
      </p>

      <h2>Why this is showing up in your workplace right now</h2>
      <p>
        This isn't a future-tense trend. In{" "}
        <a
          href="https://news.microsoft.com/source/asia/2025/08/20/indias-workforce-goes-ai-first-as-frontier-firms-lead-the-transformation-microsoft-work-trend-index-2025/"
          target="_blank"
          rel="noopener noreferrer"
        >
          the India findings of Microsoft's 2025 Work Trend Index
        </a>
        , 93% of Indian leaders surveyed said they intend to use AI agents to extend their workforce's capabilities in
        the next 12–18 months, and 59% said they were already using agents to automate workstreams or business
        processes across entire teams. Treat that as leaders' own reporting rather than a headcount of working agents,
        but it tells you where budgets are heading.
      </p>
      <p>
        The trend has continued. Microsoft's{" "}
        <a
          href="https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization"
          target="_blank"
          rel="noopener noreferrer"
        >
          2026 Work Trend Index
        </a>{" "}
        (May 2026) reports that the number of active agents in Microsoft 365 grew 15 times year over year. Consumer
        tools have moved the same way: in July 2025 OpenAI launched{" "}
        <a href="https://openai.com/index/introducing-chatgpt-agent/" target="_blank" rel="noopener noreferrer">
          ChatGPT agent
        </a>
        , which can browse websites, fill forms and work through multi-step tasks on its own.
      </p>
      <p>
        So whatever industry you're in, there's a decent chance an "agent" is already sitting in a vendor pitch deck
        somewhere in your organisation.
      </p>

      <h2>What this looks like in ordinary roles</h2>
      <p>These are illustrative examples of the kind of work agents are being built for, not claims about any specific product:</p>
      <ul>
        <li>
          <strong>HR:</strong> an agent that screens incoming CVs against a role's actual requirements and only
          surfaces the ones worth a human look, instead of a keyword filter that throws out anything without the
          "right" buzzword. (This is also where bias can creep in quietly; our{" "}
          <Link to="/blog/ai-hiring-hr-guide">guide to AI in hiring</Link> covers what to ask.)
        </li>
        <li>
          <strong>Finance:</strong> an agent that pulls invoices from three different systems, matches them against
          purchase orders, and flags the mismatches, instead of someone doing that reconciliation by hand every month
          end.
        </li>
        <li>
          <strong>Sales:</strong> an agent that researches a prospect across their company website, recent news, and
          LinkedIn activity, then drafts a first-outreach email that references something specific about them.
        </li>
        <li>
          <strong>Operations:</strong> an agent that watches a shared inbox for delivery complaints, looks up the
          order, and drafts a reply with the actual tracking status, for a human to approve.
        </li>
      </ul>

      <h2>Watch out for "agent washing"</h2>
      <p>
        Because "agent" is the word that sells right now, it's being applied generously. Gartner has a name for this:{" "}
        <a
          href="https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027"
          target="_blank"
          rel="noopener noreferrer"
        >
          "agent washing"
        </a>
        , meaning existing chatbots, AI assistants and old-style automation rebranded as agents without real agent
        abilities. In June 2025 it estimated that only about 130 of the thousands of vendors claiming to sell agentic
        AI were the real thing.
      </p>
      <p>
        The same Gartner release predicted that over 40% of agentic AI projects will be cancelled by the end of 2027,
        because of rising costs, unclear business value or weak risk controls. That's not a reason to ignore agents.
        It's a reason to ask better questions before signing anything.
      </p>

      <h2>What agents still get wrong</h2>
      <p>
        The most honest public example comes from an AI company itself. In 2025, Anthropic and a partner let its Claude
        model run a small snack shop in Anthropic's office for about a month, handling stock, prices and customer
        requests. The{" "}
        <a href="https://www.anthropic.com/research/project-vend-1" target="_blank" rel="noopener noreferrer">
          write-up of "Project Vend"
        </a>{" "}
        is worth a read. The agent was talked into handing out lots of discount codes, sold metal cubes for less than
        it paid for them, for a while told customers to pay into a payment account that didn't exist, and passed up a
        customer offering $100 for drinks that cost about $15. It didn't make money. Anthropic's own conclusion: they
        would not hire it to run the shop.
      </p>
      <p>That experiment shows the usual failure patterns neatly:</p>
      <ul>
        <li><strong>Misreading the goal:</strong> being helpful to the person in front of it instead of profitable for the business.</li>
        <li><strong>Making things up:</strong> confidently inventing a detail (like a payment account) and acting on it.</li>
        <li><strong>Being easy to talk round:</strong> a polite, persistent request often wins.</li>
        <li><strong>Getting stuck:</strong> repeating a step that isn't working instead of stopping to ask.</li>
      </ul>
      <p>
        There's also a newer risk called <strong>prompt injection</strong>: hidden instructions planted in a web page
        or email that the agent reads and then follows, as if you'd given them. When OpenAI launched ChatGPT agent, it
        warned about exactly this and built the agent to ask for permission before consequential actions such as
        purchases. That design choice tells you a lot about where the technology honestly is.
      </p>
      <p>
        The fair summary today: agents are useful for speeding up multi-step work, and not yet trustworthy enough to
        remove a human from reviewing the output before it goes out the door, especially anything customer-facing or
        financial.
      </p>
      <blockquote>
        The skill that matters isn't building agents yourself. It's knowing what one actually is, so you're not
        either dismissing a useful tool as "just a chatbot" or trusting one with something it isn't ready for.
      </blockquote>

      <h2>Five questions to ask before you trust one</h2>
      <p>
        Next time someone on your team or a vendor says "it's got an AI agent," you don't need to be technical. You
        need these questions:
      </p>
      <ol>
        <li>
          <strong>What goal does it pursue on its own?</strong> If the honest answer is "it answers one question at a
          time," it's a chatbot with a newer name.
        </li>
        <li>
          <strong>What can it actually touch?</strong> Read-only access to a spreadsheet is very different from
          permission to send emails or approve payments.
        </li>
        <li>
          <strong>Where does it stop and ask a human?</strong> A good agent has clear checkpoints before anything
          irreversible.
        </li>
        <li>
          <strong>What happens when it gets stuck or is wrong?</strong> Is there a log of what it did, and can you undo
          it?
        </li>
        <li>
          <strong>Where does our data go?</strong> If it reads customer or employee records, that's a data protection
          question, not just an IT one. Our piece on{" "}
          <Link to="/blog/ai-data-privacy-india">AI and data privacy in India</Link> walks through the basics.
        </li>
      </ol>
      <p>
        If it can genuinely chain steps together and check its own work, with sensible limits, you're looking at
        something that can save real hours, provided someone's still reviewing what it produces.
      </p>

      <h2>What to actually do with this</h2>
      <p>
        You don't need to build an agent to understand one, but it helps to see the moving parts once: an instruction
        in plain English, an AI that does something with it, and a result you check. If you'd like to try that safely,
        the free Chapter 1 of our course has you build a small working tool (a meeting cost calculator) in your
        browser in about 20 minutes, just by describing it. You can <Link to="/signup">start it here</Link>, no card
        needed.
      </p>
      <p>
        Either way, the judgment call is the same. You don't need to be technical to make it. You just need to know
        which questions to ask.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://news.microsoft.com/source/asia/2025/08/20/indias-workforce-goes-ai-first-as-frontier-firms-lead-the-transformation-microsoft-work-trend-index-2025/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Source Asia: India's workforce goes AI-first as Frontier Firms lead the transformation (Work
              Trend Index 2025)
            </a>{" "}
            (20 August 2025)
          </li>
          <li>
            <a
              href="https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft WorkLab: 2026 Work Trend Index, Agents, human agency, and the opportunity for every organization
            </a>{" "}
            (5 May 2026)
          </li>
          <li>
            <a href="https://openai.com/index/introducing-chatgpt-agent/" target="_blank" rel="noopener noreferrer">
              OpenAI: Introducing ChatGPT agent
            </a>{" "}
            (July 2025)
          </li>
          <li>
            <a
              href="https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gartner: Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027
            </a>{" "}
            (25 June 2025)
          </li>
          <li>
            <a href="https://www.anthropic.com/research/project-vend-1" target="_blank" rel="noopener noreferrer">
              Anthropic: Project Vend, Can Claude run a small shop?
            </a>{" "}
            (27 June 2025)
          </li>
        </ul>
      </div>
    </>
  );
}
