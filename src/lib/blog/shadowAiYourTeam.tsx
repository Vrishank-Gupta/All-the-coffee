import { Link } from "react-router-dom";

export default function ShadowAiYourTeam() {
  return (
    <>
      <p>
        Here's a meeting playing out in offices everywhere. A manager announces the company is "evaluating an AI tool"
        for the team. Half the room nods along politely. What the manager doesn't know is that most of that room has
        been using AI quietly for months, often for exactly the work the new tool is supposed to help with. One person
        drafted last quarter's appraisal self-review with it. Another uses it to turn a messy vendor call into minutes
        before anyone else has opened their laptop.
      </p>
      <p>
        This is <strong>Shadow AI</strong>: AI tools people use for work without them being officially approved,
        tracked, or sometimes even known about. It's the AI version of the department WhatsApp group that somehow
        became the real place decisions get made.
      </p>

      <h2>How common is it, really?</h2>
      <p>
        Very. According to{" "}
        <a
          href="https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft and LinkedIn's 2024 Work Trend Index
        </a>
        , a survey of 31,000 knowledge workers in 31 countries, 75% of knowledge workers already use AI at work, and
        78% of those users bring their own AI tools rather than waiting for an approved one. In India the usage figure
        was even higher:{" "}
        <a
          href="https://news.microsoft.com/en-in/92-of-indian-knowledge-workers-use-ai-in-the-workplace-finds-microsoft-and-linkedin-2024-work-trend-index/"
          target="_blank"
          rel="noopener noreferrer"
        >
          92% of Indian knowledge workers
        </a>{" "}
        said they use AI at work.
      </p>
      <p>Two more numbers from the same global report explain why so much of it stays in the shadows:</p>
      <ul>
        <li>52% of people who use AI at work are reluctant to admit using it for their most important tasks.</li>
        <li>Only 39% of people who use AI at work had received any AI training from their company.</li>
      </ul>
      <p>
        Put those together and you get the picture: lots of use, very little guidance, and a fair amount of keeping
        quiet about it.
      </p>

      <h2>Why people go around the official process</h2>
      <p>It's rarely rebellion. It's usually one of three things:</p>
      <ol>
        <li><strong>The official tool doesn't exist yet</strong>, and the deadline does.</li>
        <li><strong>The official tool exists but is clunky</strong> compared to what they can get free on their phone.</li>
        <li>
          <strong>The quieter reason:</strong> asking for AI training feels like admitting you can't do your job the
          old way, or worrying that if the boss knows AI wrote the first draft, your work will be valued less. That 52%
          figure above is this feeling, measured.
        </li>
      </ol>
      <p>So people figure it out themselves, on their own laptop, on their own time, and never mention it.</p>

      <h2>The part leadership usually gets backwards</h2>
      <p>
        McKinsey's January 2025 report{" "}
        <a
          href="https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work"
          target="_blank"
          rel="noopener noreferrer"
        >
          "Superagency in the Workplace"
        </a>{" "}
        found a gap leaders consistently underestimate. C-suite leaders guessed that only 4% of their employees use
        generative AI for at least 30% of their daily work. When{" "}
        <a
          href="https://www.mckinsey.com/featured-insights/week-in-charts/leaders-underestimate-employees-ai-use"
          target="_blank"
          rel="noopener noreferrer"
        >
          employees were asked
        </a>
        , 13% said they did, roughly three times the leaders' estimate. Looking a year ahead, only 20% of leaders
        expected employees to reach that level, while 47% of employees said they would, or already had.
      </p>
      <p>
        Leadership tends to picture AI adoption as something to push down from the top. In most organisations it's
        already happening from the bottom up, and leadership is the one that's behind.
      </p>
      <p>
        That reframes the problem. It was never "how do we get our people to start using AI." It's "our people are
        already using AI, unsupervised, and we don't know which tools, with what data, or how well." That's a very
        different, and much more solvable, problem.
      </p>

      <h2>The real risk, stated plainly</h2>
      <p>
        The risk isn't that your team is using AI. It's what they might be pasting into it: customer data, salary
        sheets, unreleased financial numbers, a client's contract. Most people doing this aren't being careless on
        purpose. Nobody has told them clearly what's off-limits.
      </p>
      <p>This has real costs, and there's now data on them:</p>
      <ul>
        <li>
          The best-known early case: in 2023, Samsung engineers{" "}
          <a
            href="https://www.csoonline.com/article/575215/samsung-bans-staff-ai-use-over-data-leak-concerns.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            accidentally leaked internal source code by uploading it to ChatGPT
          </a>
          , and the company responded by banning generative AI tools on company devices.
        </li>
        <li>
          IBM's{" "}
          <a
            href="https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls"
            target="_blank"
            rel="noopener noreferrer"
          >
            2025 Cost of a Data Breach report
          </a>{" "}
          found that organisations with high levels of shadow AI paid on average $670,000 more per breach than those
          with little or none, and 63% of breached organisations either had no AI governance policy or were still
          writing one.
        </li>
        <li>
          In{" "}
          <a
            href="https://in.newsroom.ibm.com/2025-08-07-India-Records-Highest-Average-Cost-of-a-Data-Breach-IBM"
            target="_blank"
            rel="noopener noreferrer"
          >
            IBM's India findings
          </a>
          , the average breach cost hit a record ₹22 crore (INR 220 million), shadow AI added about ₹1.79 crore to
          that on average, and only 42% of organisations had policies to manage AI or detect shadow AI.
        </li>
      </ul>
      <p>
        There's also the law. India's Digital Personal Data Protection Act, 2023 now has its{" "}
        <a
          href="https://www.scconline.com/blog/post/2025/11/14/meity-notified-digital-personal-data-protection-rules-2025/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rules notified (November 2025)
        </a>
        , with most obligations on businesses taking effect 18 months later, in May 2027. Pasting a customer list into
        a random free tool is exactly the kind of habit that will be harder to defend. Our{" "}
        <Link to="/blog/ai-data-privacy-india">plain-language guide to AI and data privacy in India</Link> covers what
        this means for you personally.
      </p>

      <h2>A simple traffic-light rule for what to paste</h2>
      <p>
        This is a starting point, not legal advice. Your company's own policy, if it has one, wins.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Usually fine</th>
              <th>Check first</th>
              <th>Keep out of public AI tools</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Public information, your own rough notes, generic emails</td>
              <td>Internal process documents, anonymised data</td>
              <td>Customer names, phone numbers, PAN or Aadhaar details</td>
            </tr>
            <tr>
              <td>Rewriting your own text for tone or clarity</td>
              <td>Draft presentations with internal plans</td>
              <td>Salary sheets, appraisal ratings, health information</td>
            </tr>
            <tr>
              <td>Formula help with made-up sample data</td>
              <td>Vendor quotes, if the vendor isn't named</td>
              <td>Unreleased results, contracts, passwords, source code</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        One extra habit helps a lot: check your tool's data settings. Many AI tools let you control whether your chats
        are used to train future models, and business versions often have different defaults from free personal
        accounts. Five minutes in the settings page is worth it.
      </p>

      <h2>Why banning it usually backfires</h2>
      <p>
        Banning AI outright tends to fail the same way banning the office coffee machine would. People don't stop
        wanting coffee. They start bringing their own, unsupervised, and you lose any visibility into what's going on.
        With AI that's worse, because a personal phone and a free account are all anyone needs.
      </p>
      <p>The goal isn't to stop the behaviour. It's to make the safe version of it easier than the risky version.</p>

      <h2>If you're a manager: what to actually do</h2>
      <ul>
        <li>
          <strong>Ask before you mandate.</strong> Before rolling out a tool nobody requested, ask your team what
          they're already using and for what. Make it explicitly no-blame, or you'll hear nothing. You'll often find
          the "new" tool you're about to buy solves a problem someone already solved.
        </li>
        <li>
          <strong>Write one short, human rule about data</strong>, not a 40-page policy nobody reads. Something like:
          "Nothing with a customer's name, an employee's personal details, or an unreleased number goes into a public
          AI tool." That covers most of the real risk.
        </li>
        <li>
          <strong>Give people an approved option that's actually decent.</strong> If the sanctioned tool is worse than
          the free one, the free one wins.
        </li>
        <li>
          <strong>Share what works.</strong> A 15-minute slot in the weekly team meeting where someone shows a prompt
          or shortcut that saved them time does more than any memo.
        </li>
        <li>
          <strong>Don't punish the behaviour you want more of.</strong> If someone used AI to finish a task faster and
          did it responsibly, that's a good outcome to repeat, not a violation to crack down on.
        </li>
      </ul>

      <h2>If you're the one quietly using AI</h2>
      <p>
        You're in good company, and you're probably not doing anything wrong. Three habits keep you on the right side:
        keep sensitive data out (use the table above), always check the output before it goes anywhere with your name
        on it, and when you find something that genuinely helps, tell your manager. You'll likely be the person who
        helps the team write its first sensible rule, which is a much better position than being the person found out
        later.
      </p>
      <p>
        If you'd like a safe way to go beyond chat, try building something small for yourself with dummy data. The free
        Chapter 1 of our course walks you through a working meeting cost calculator in your browser in about 20
        minutes, no coding background needed. <Link to="/signup">Start it here</Link>.
      </p>
      <p>
        The honest takeaway: your team is probably more AI-literate than you're assuming. The opportunity isn't to
        introduce AI to them. It's to catch up to where they already are, and make sure the data side is handled
        properly.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft and LinkedIn: 2024 Work Trend Index, AI at Work Is Here. Now Comes the Hard Part
            </a>{" "}
            (8 May 2024)
          </li>
          <li>
            <a
              href="https://news.microsoft.com/en-in/92-of-indian-knowledge-workers-use-ai-in-the-workplace-finds-microsoft-and-linkedin-2024-work-trend-index/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft News Centre India: 92% of Indian knowledge workers use AI in the workplace
            </a>{" "}
            (May 2024)
          </li>
          <li>
            <a
              href="https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work"
              target="_blank"
              rel="noopener noreferrer"
            >
              McKinsey: Superagency in the workplace
            </a>{" "}
            (January 2025)
          </li>
          <li>
            <a
              href="https://www.mckinsey.com/featured-insights/week-in-charts/leaders-underestimate-employees-ai-use"
              target="_blank"
              rel="noopener noreferrer"
            >
              McKinsey: Leaders underestimate employees' AI use
            </a>{" "}
            (2025)
          </li>
          <li>
            <a
              href="https://www.csoonline.com/article/575215/samsung-bans-staff-ai-use-over-data-leak-concerns.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              CSO Online: Samsung bans staff AI use over data leak concerns
            </a>{" "}
            (May 2023)
          </li>
          <li>
            <a
              href="https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls"
              target="_blank"
              rel="noopener noreferrer"
            >
              IBM Newsroom: 13% of organizations reported breaches of AI models or applications (Cost of a Data Breach
              Report 2025)
            </a>{" "}
            (30 July 2025)
          </li>
          <li>
            <a
              href="https://in.newsroom.ibm.com/2025-08-07-India-Records-Highest-Average-Cost-of-a-Data-Breach-IBM"
              target="_blank"
              rel="noopener noreferrer"
            >
              IBM India Newsroom: India records highest average cost of a data breach
            </a>{" "}
            (7 August 2025)
          </li>
          <li>
            <a
              href="https://www.scconline.com/blog/post/2025/11/14/meity-notified-digital-personal-data-protection-rules-2025/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SCC Online: MeitY notified Digital Personal Data Protection Rules, 2025
            </a>{" "}
            (14 November 2025)
          </li>
        </ul>
      </div>
    </>
  );
}
