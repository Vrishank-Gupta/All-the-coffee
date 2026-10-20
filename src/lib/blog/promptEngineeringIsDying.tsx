import { Link } from "react-router-dom";

export default function PromptEngineeringIsDying() {
  return (
    <>
      <p>
        Somewhere in your phone there's probably a screenshot of a "mega prompt." Maybe it came from a LinkedIn
        carousel, maybe from a colleague's WhatsApp forward: "Act as a world-class strategist with 20 years of
        experience. Take a deep breath. Think step by step. I'll tip you $200 for a perfect answer." You saved it
        because it felt like the secret password.
      </p>
      <p>
        A couple of years ago, that kind of thing was treated almost like a magic spell. There were guides on the exact
        phrasing that got better answers, the right way to tell an AI to "act as an expert," and formatting tricks
        that supposedly made models smarter. Companies even hired for the literal job title. In 2023 Anthropic
        advertised a "Prompt Engineer and Librarian" role with a listed salary range of{" "}
        <a
          href="https://indiaai.gov.in/news/ai-prompt-engineer-job-is-gaining-popularity-with-a-salary-of-over-2-7-crores-per-year"
          target="_blank"
          rel="noopener noreferrer"
        >
          $175,000 to $335,000 a year
        </a>
        , which made headlines in India as a job paying over ₹2.7 crore.
      </p>
      <p>
        Most of that magic-words era is quietly fading. Not because prompting doesn't matter, but because models got
        good enough at understanding plain language that the elaborate incantations stopped adding much. Something
        more useful, and more ordinary, is taking its place.
      </p>

      <h2>What happened to the job</h2>
      <p>
        By 2025 the "hottest job in AI" had cooled noticeably. In a Microsoft survey of 31,000 workers across 31
        countries about new roles companies were considering,{" "}
        <a
          href="https://www.kornferry.com/insights/this-week-in-leadership/the-hottest-job-of-the-year-goes-cold"
          target="_blank"
          rel="noopener noreferrer"
        >
          prompt engineer came second from the bottom
        </a>
        , as Korn Ferry reported in April 2025. Roles like AI trainers, AI data specialists and AI security experts
        ranked far higher.
      </p>
      <p>
        The reason is simple: companies stopped treating prompting as a specialist skill and started expecting
        everyone to have a basic version of it, the same way nobody hires an "email writer" anymore.
      </p>
      <p>
        That's good news if you're not technical. The skill didn't vanish; it got absorbed into ordinary jobs. The
        finance analyst who can brief an AI clearly, the HR partner who knows what context a policy summary needs, the
        sales manager who pastes in the actual client email instead of describing it: none of them would call
        themselves prompt engineers, and none of them need to.
      </p>

      <h2>What changed in the models</h2>
      <p>
        Early AI models were genuinely picky. Phrase a request slightly oddly and you'd get a worse answer. That made
        clever formulas feel valuable, because they nudged a finicky system toward a better result. Newer models are
        much better at working out what you mean, even from a casually worded request.
      </p>
      <p>
        You don't have to take that on faith. Researchers at Wharton's Generative AI Labs have been testing the popular
        tricks one by one:
      </p>
      <ul>
        <li>
          <strong>"Think step by step"</strong> (known as chain-of-thought prompting): their June 2025 report found it{" "}
          <a
            href="https://gail.wharton.upenn.edu/research-and-insights/tech-report-chain-of-thought/"
            target="_blank"
            rel="noopener noreferrer"
          >
            adds little for newer "reasoning" models
          </a>
          , which already do this on their own, while making answers take noticeably longer.
        </li>
        <li>
          <strong>Tipping or threatening the AI:</strong> their August 2025 report found that offering money or making
          threats{" "}
          <a
            href="https://gail.wharton.upenn.edu/research-and-insights/techreport-threaten-or-tip/"
            target="_blank"
            rel="noopener noreferrer"
          >
            did not meaningfully improve results
          </a>{" "}
          on hard benchmark questions.
        </li>
        <li>
          <strong>"You are a world-class expert":</strong> their December 2025 report found that{" "}
          <a
            href="https://gail.wharton.upenn.edu/research-and-insights/playing-pretend-expert-personas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            expert personas generally did not improve factual accuracy
          </a>
          . Telling a model it's a physicist doesn't make it know more physics. (Personas can still change tone and
          style, which is sometimes what you want.)
        </li>
      </ul>
      <p>
        One honest caveat from the same researchers: wording can still swing the answer to an individual question in
        unpredictable ways. That's an argument for checking the output, not for collecting more magic phrases.
      </p>
      <p>
        It's a bit like how you once needed the exact Italian terms to order a good coffee: ristretto, macchiato, the
        precise words mattered. A good barista today just asks "strong or mild? Sweet or not?" and gets you there
        anyway. The skill moved from knowing the magic words to clearly describing what you want.
      </p>

      <h2>What's replacing it: context</h2>
      <p>
        In June 2025, Shopify's CEO Tobi Lütke said he preferred the term{" "}
        <a
          href="https://simonwillison.net/2025/jun/27/context-engineering/"
          target="_blank"
          rel="noopener noreferrer"
        >
          "context engineering"
        </a>{" "}
        over prompt engineering, describing the core skill as "the art of providing all the context for the task to
        be plausibly solvable by the LLM." AI researcher Andrej Karpathy agreed, noting that people associate
        "prompts" with short task descriptions, when the real work is giving the model the right information. A few
        months later Anthropic published a{" "}
        <a
          href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
          target="_blank"
          rel="noopener noreferrer"
        >
          guide on context engineering
        </a>{" "}
        (September 2025) describing it as the natural next step after prompt engineering.
      </p>
      <p>
        "Context engineering" is mostly a term for people building AI products, but the idea translates directly to
        your desk. The question is no longer "what clever words do I use?" It's "what does this AI need to know to do
        this well?" Things like:
      </p>
      <ul>
        <li>who the output is for, and what they already know</li>
        <li>what it will be used for (a WhatsApp update to your boss is not a board note)</li>
        <li>the actual material: the email thread, the numbers, last year's version</li>
        <li>the constraints: length, tone, deadline, what must not be said</li>
      </ul>
      <p>
        There's a twist worth knowing. Newer models follow instructions more literally. OpenAI's own guidance for its
        GPT-5 models warns that they{" "}
        <a
          href="https://cdn.openai.com/API/docs/gpt-5-for-coding-cheatsheet.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          can struggle with vague or conflicting instructions
        </a>
        . So "be detailed but keep it short" is now more likely to give you a muddle than a magic result. Clear beats
        clever.
      </p>

      <h2>Old habits vs what works now</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Old habit</th>
              <th>What works better now</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>"You are a world-class expert..."</td>
              <td>Say who the reader is and what they need</td>
            </tr>
            <tr>
              <td>Copy-pasting a 400-word template</td>
              <td>Pasting the actual material the task is about</td>
            </tr>
            <tr>
              <td>Hunting for the perfect first prompt</td>
              <td>Asking for a draft, then giving feedback</td>
            </tr>
            <tr>
              <td>Tips, threats, "this is very important"</td>
              <td>Clear constraints: length, tone, format</td>
            </tr>
            <tr>
              <td>Describing the style in adjectives</td>
              <td>Showing one real example to match</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What actually still matters</h2>
      <ul>
        <li>
          <strong>Context, not cleverness.</strong> Telling the AI who the output is for, what it's for, and any
          constraints gets you a better result than any phrasing trick.
        </li>
        <li>
          <strong>Being specific about the output</strong>, not the process. "Write a two-paragraph summary a
          non-technical manager could read in 30 seconds" beats a vague "summarise this" every time.
        </li>
        <li>
          <strong>Iterating instead of front-loading.</strong> You don't need the perfect prompt on the first try. Ask
          for a draft, then say what's wrong with it, the same way you'd give feedback to a colleague.
        </li>
        <li>
          <strong>Providing a real example</strong> of the output you want, when you have one. Nothing communicates
          intent faster than something concrete to match.
        </li>
        <li>
          <strong>Checking the result.</strong> Clear instructions make good answers more likely, not guaranteed.
        </li>
      </ul>

      <h2>A quick before and after</h2>
      <p>
        <strong>Old style:</strong> "You are a world-class expert copywriter with 20 years of experience. Using
        advanced persuasion techniques, craft a compelling email..."
      </p>
      <p>
        <strong>What works at least as well now:</strong> "Write a short email to a client whose project is two weeks
        late. Be honest about the delay, don't over-apologise, and give them a specific new date: 14 November."
      </p>
      <p>Here's one closer to a typical Indian office:</p>
      <blockquote>
        "I manage a 6-person accounts payable team. Below are my rough notes on what my team did this year. Turn them
        into a self-appraisal of about 250 words for my reporting manager, who cares most about the month-end closing
        timeline and vendor complaints. Keep the tone confident but not boastful. Don't invent any numbers that aren't
        in my notes."
      </blockquote>
      <p>
        None of that is clever. It's just clear, and it includes the material. That's the whole skill now, and it's one
        you already have, because it's the same skill as briefing a new colleague well.
      </p>

      <h2>What this means for you</h2>
      <p>
        You don't need to study prompt engineering as a discipline. You need to practise describing what you want
        clearly, giving relevant context, and treating the first response as a draft to refine. That's a much lower
        bar than the magic-words era made it seem, and you build it in days of real use, not months of courses.
      </p>
      <p>
        The same skill goes further than writing emails. Describing what you want clearly is also how people now build
        small tools without coding, by explaining the tool to an AI in plain English. The free Chapter 1 of our course
        has you do exactly that, building a working meeting cost calculator in your browser in about 20 minutes.{" "}
        <Link to="/signup">Try it here</Link>. And if you're curious which other skills are rising as the tricks fade,
        read <Link to="/blog/skills-that-matter-ai-world">the skills that actually matter in an AI world</Link>.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://indiaai.gov.in/news/ai-prompt-engineer-job-is-gaining-popularity-with-a-salary-of-over-2-7-crores-per-year"
              target="_blank"
              rel="noopener noreferrer"
            >
              IndiaAI: AI prompt engineer job is gaining popularity with a salary of over 2.7 crores per year
            </a>{" "}
            (2023)
          </li>
          <li>
            <a
              href="https://www.kornferry.com/insights/this-week-in-leadership/the-hottest-job-of-the-year-goes-cold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Korn Ferry: The Hottest Job of the Year Goes Cold
            </a>{" "}
            (29 April 2025)
          </li>
          <li>
            <a
              href="https://gail.wharton.upenn.edu/research-and-insights/tech-report-chain-of-thought/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wharton Generative AI Labs: Prompting Science Report 2, The Decreasing Value of Chain of Thought in
              Prompting
            </a>{" "}
            (June 2025)
          </li>
          <li>
            <a
              href="https://gail.wharton.upenn.edu/research-and-insights/techreport-threaten-or-tip/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wharton Generative AI Labs: Prompting Science Report 3, I'll pay you or I'll kill you, but will you care?
            </a>{" "}
            (August 2025)
          </li>
          <li>
            <a
              href="https://gail.wharton.upenn.edu/research-and-insights/playing-pretend-expert-personas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wharton Generative AI Labs: Prompting Science Report 4, Playing Pretend: Expert Personas Don't Improve
              Factual Accuracy
            </a>{" "}
            (December 2025)
          </li>
          <li>
            <a
              href="https://simonwillison.net/2025/jun/27/context-engineering/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Simon Willison: Context engineering (quoting Tobi Lütke and Andrej Karpathy)
            </a>{" "}
            (27 June 2025)
          </li>
          <li>
            <a
              href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anthropic: Effective context engineering for AI agents
            </a>{" "}
            (29 September 2025)
          </li>
          <li>
            <a
              href="https://cdn.openai.com/API/docs/gpt-5-for-coding-cheatsheet.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI: GPT-5 for Coding cheatsheet
            </a>{" "}
            (2025)
          </li>
        </ul>
      </div>
    </>
  );
}
