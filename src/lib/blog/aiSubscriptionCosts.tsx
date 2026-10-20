import { Link } from "react-router-dom";

export default function AiSubscriptionCosts() {
  return (
    <>
      <p>
        At some point, every AI tool you try asks you to upgrade. A free tier that's suddenly "limited", a feature
        locked behind a paywall, a little banner reminding you what you're missing. Then your colleague mentions,
        in the team WhatsApp group, that they pay for two of these. The honest question underneath all of it: is it
        actually worth paying for, or is the free version genuinely enough?
      </p>
      <p>
        There's no single right answer, but there is a clear way to think it through. And it starts with knowing
        what these things actually cost in rupees, because the answer changed a lot in the last year.
      </p>

      <h2>What the main plans cost in India right now</h2>
      <p>
        Here are the individual plans from the big providers, at the time of writing (October 2026). Prices are
        per month unless noted, and are the tax-inclusive figures the providers show Indian buyers. App store
        prices sometimes differ slightly from website prices, so check at checkout.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Entry plan</th>
              <th>Main paid plan</th>
              <th>Heavy-use plans</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ChatGPT (OpenAI)</td>
              <td>Go: ₹399</td>
              <td>Plus: ₹1,999</td>
              <td>Pro: about ₹10,699 to ₹19,900, depending on tier</td>
            </tr>
            <tr>
              <td>Gemini (Google)</td>
              <td>Google AI Plus: ₹399</td>
              <td>Google AI Pro: ₹1,950</td>
              <td>Google AI Ultra: ₹6,500 to ₹19,500</td>
            </tr>
            <tr>
              <td>Claude (Anthropic)</td>
              <td>None</td>
              <td>Pro: ₹2,399 monthly, or ₹2,000 a month billed yearly</td>
              <td>Max: ₹11,999 (5x) or ₹23,999 (20x)</td>
            </tr>
            <tr>
              <td>Microsoft 365 with Copilot</td>
              <td>Personal: ₹689, or ₹6,899 a year</td>
              <td>Family: ₹819, or ₹8,199 a year</td>
              <td>Premium: ₹1,999, or ₹19,999 a year</td>
            </tr>
            <tr>
              <td>Perplexity</td>
              <td>None</td>
              <td>Pro: US$20 a month or US$200 a year</td>
              <td>Max: US$200 a month</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Where these numbers come from:{" "}
        <a href="https://kingy.ai/blog/chatgpt-claude-gemini-prices-india/" target="_blank" rel="noopener noreferrer">
          ChatGPT's Indian App Store prices, checked on 19 October 2026
        </a>{" "}
        and OpenAI's page on its{" "}
        <a href="https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers" target="_blank" rel="noopener noreferrer">
          two Pro tiers
        </a>
        ; Google's{" "}
        <a href="https://gemini.google/in/subscriptions/?hl=en-IN" target="_blank" rel="noopener noreferrer">
          India subscriptions page
        </a>
        ; Anthropic's rupee pricing, introduced in July 2026 and{" "}
        <a href="https://www.freepressjournal.in/tech/anthropic-introduces-indian-prices-for-claude-ai-subscriptions-heres-how-much-it-costs" target="_blank" rel="noopener noreferrer">
          reported by the Free Press Journal
        </a>{" "}
        and{" "}
        <a href="https://www.businesstoday.in/technology/news/story/anthropic-introduces-india-pricing-for-claude-ai-plans-pricing-starts-at-542742-2026-07-14" target="_blank" rel="noopener noreferrer">
          Business Today
        </a>
        ; and{" "}
        <a href="https://www.microsoft.com/en-in/microsoft-365/buy/compare-all-microsoft-365-products" target="_blank" rel="noopener noreferrer">
          Microsoft's India store
        </a>
        . We couldn't find a fixed rupee price published by Perplexity, so that row shows its{" "}
        <a href="https://www.finout.io/blog/perplexity-pricing-in-2026" target="_blank" rel="noopener noreferrer">
          US dollar pricing
        </a>
        ; your card or app store will convert it.
      </p>
      <p>Some fine print that matters more than it looks:</p>
      <ul>
        <li>
          <strong>Microsoft's Copilot is for the account owner.</strong> On the Family plan, the other members get
          the Office apps, but Copilot is included for the person who owns the subscription. And there are usage
          limits on all three plans.
        </li>
        <li>
          <strong>ChatGPT's cheap tiers now carry ads.</strong> OpenAI{" "}
          <a href="https://techcrunch.com/2026/08/27/openai-to-start-showing-ads-on-chatgpts-free-and-go-tiers-in-india/" target="_blank" rel="noopener noreferrer">
            announced in August 2026
          </a>{" "}
          that it will start showing ads on the Free and Go tiers in India.
        </li>
        <li>
          <strong>"5x" and "20x" mean usage, not intelligence.</strong> Most heavy-use plans give you more of the
          same thing (more messages, longer tasks) rather than a smarter assistant.
        </li>
      </ul>

      <h2>The free offers you may already have</h2>
      <p>
        India has had an unusual run of AI freebies, and it's worth checking before you pay for anything:
      </p>
      <ul>
        <li>
          <strong>ChatGPT Go free for a year.</strong> OpenAI offered 12 months of Go at no cost to Indian users who
          signed up from 4 November 2025. According to OpenAI's{" "}
          <a href="https://help.openai.com/en/articles/12739021-chatgpt-go-promotion-india" target="_blank" rel="noopener noreferrer">
            help page
          </a>{" "}
          and release notes, the promotion closed to new sign-ups on 21 January 2026, but people who claimed it keep
          their full year, counted from their own sign-up date. So if you claimed it early, check when yours
          ends. We cover what to do next in a separate article.
        </li>
        <li>
          <strong>Google AI Pro through Jio.</strong> Reliance Jio and Google launched 18 months of free Google AI
          Pro for Jio users on eligible unlimited 5G plans in October 2025, and{" "}
          <a href="https://www.cxodigitalpulse.com/reliance-jio-expands-partnership-with-google-offers-18-months-of-free-google-ai-pro-access-to-all-5g-users/" target="_blank" rel="noopener noreferrer">
            later dropped the original 18 to 25 age limit
          </a>
          . We couldn't confirm whether new activations are still open, so check the MyJio app.
        </li>
        <li>
          <strong>Perplexity Pro through Airtel.</strong> Airtel gave its customers a free year of Perplexity Pro,
          but{" "}
          <a href="https://www.voicendata.com/software-apps/airtel-wraps-up-perplexity-pro-deal-rolls-out-new-benefit-11066197" target="_blank" rel="noopener noreferrer">
            stopped new redemptions on 16 January 2026
          </a>
          . Anyone who activated before then keeps it for a year from activation, so a lot of those free years are
          ending around now.
        </li>
      </ul>
      <p>
        One habit worth building: when a free year starts, put a reminder in your calendar for a week before it
        ends. Deciding calmly beats discovering a charge on your statement.
      </p>

      <h2>When the free tier is genuinely enough</h2>
      <ul>
        <li>You use AI occasionally, a few times a week, for things like drafting an email or summarising a document</li>
        <li>You're not hitting usage limits or getting told to wait before your next question</li>
        <li>Speed isn't critical; a slightly slower response doesn't cost you anything real</li>
        <li>You mostly need one tool, not a separate assistant for writing, research and images</li>
      </ul>
      <p>
        If that's you, a paid subscription is mostly buying you convenience you're not actually short on. ₹1,999 a
        month works out to about ₹65 a day, which is less than a cappuccino at most cafe chains. Small enough
        that it's easy to upgrade without really deciding to. That's not a reason to upgrade, it's a reason to be
        deliberate about it.
      </p>

      <h2>When paying is genuinely worth it</h2>
      <ul>
        <li>
          You use it daily for real work, and the paid tier noticeably speeds up or improves tasks you'd otherwise
          spend real time on
        </li>
        <li>You've hit the free tier's limits often enough that waiting is costing you more time than the subscription costs money</li>
        <li>You need a specific paid feature for your work, such as working with long documents or larger files</li>
        <li>
          You need the business or enterprise tier specifically for the data-handling guarantees, not just the extra
          features. Our article on <Link to="/blog/ai-data-privacy-india">AI and data privacy in India</Link> explains
          why that distinction matters.
        </li>
      </ul>
      <p>
        Also note the new middle ground. A year ago, the choice was mostly "free" or "about ₹2,000". Now the ₹399
        tiers from OpenAI and Google sit in between, and for plenty of people who only bump into the free limits
        now and then, that's the sensible step up.
      </p>

      <h2>The question that actually decides it</h2>
      <p>
        Don't ask "is this subscription expensive." Ask "how many minutes does this save me in a typical week, and
        what's that time worth."
      </p>
      <p>
        Here's a rough, hypothetical calculation. Say you earn ₹12 lakh a year. That's ₹1 lakh a month, and if you
        work about 176 hours a month, your time is worth roughly ₹570 an hour. If a ₹1,999 plan saves you one hour
        a week, that's a little over four hours a month, or about ₹2,400 of your time. The subscription pays for
        itself, but not by a mile. At half an hour a week, it doesn't. At ₹399, almost any regular use clears the
        bar.
      </p>
      <p>
        So the math is closer than people assume, which is exactly why it's worth actually doing it instead of
        going by gut feeling. And it only counts if the saved time is real: an hour you'd have spent fixing a
        formula, not an hour of fun experimenting.
      </p>

      <h2>Before you pay for anything, try this</h2>
      <p>
        Use the free tier for a real work task, not a toy example, for one full week. Keep a rough count of how many
        times you hit a limit, got a worse answer than you needed, or had to wait. That one week tells you more about
        whether to upgrade than any comparison chart a company's marketing page shows you.
      </p>
      <blockquote>
        The honest test isn't what the subscription includes. It's whether you can point to a specific task this
        week that the free version made noticeably harder.
      </blockquote>
      <p>Three more ways to avoid wasting money:</p>
      <ol>
        <li>
          <strong>Pay for one, not three.</strong> The main paid plans overlap heavily. Pick the one that fits the
          tools you already live in: Google if your work runs on Gmail and Sheets, Microsoft if it runs on Outlook
          and Excel.
        </li>
        <li>
          <strong>Go monthly first.</strong> Yearly billing is cheaper per month, but only if you're still using it
          in month eleven.
        </li>
        <li>
          <strong>Check what you already pay for.</strong> If you have a Microsoft 365 Personal or Family plan for
          Word and Excel, Copilot may already be included.
        </li>
      </ol>
      <p>
        And if your employer already pays for a business-tier AI tool, use that one instead of your own personal
        subscription for work tasks. It's usually better for your data, and it's not coming out of your own pocket
        either way.
      </p>

      <h2>Your next step</h2>
      <p>
        This week, pick one task you do every week, like summarising a long email thread or cleaning up a messy
        spreadsheet, and do it on the free tier of the tool you use most. Note every time it slows you down. On
        Friday, do the ₹570-an-hour math with your own numbers. You'll have a real answer instead of a vague
        feeling.
      </p>
      <p>
        And if you'd like to get more out of whichever plan you choose, our free <Link to="/signup">first module</Link>{" "}
        walks you through building your first small working tool with AI in about 20 minutes, no coding
        background needed.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a href="https://kingy.ai/blog/chatgpt-claude-gemini-prices-india/" target="_blank" rel="noopener noreferrer">
              Kingy AI: ChatGPT, Claude and Gemini prices in India (INR, incl. GST)
            </a>{" "}
            (checked 19 October 2026)
          </li>
          <li>
            <a href="https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers" target="_blank" rel="noopener noreferrer">
              OpenAI Help Center: About ChatGPT Pro tiers
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://help.openai.com/en/articles/12739021-chatgpt-go-promotion-india" target="_blank" rel="noopener noreferrer">
              OpenAI Help Center: ChatGPT Go Promotion (India)
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://techcrunch.com/2025/10/27/openai-offers-free-chatgpt-go-for-one-year-to-all-users-in-india/" target="_blank" rel="noopener noreferrer">
              TechCrunch: OpenAI offers free ChatGPT Go for one year to all users in India
            </a>{" "}
            (27 October 2025)
          </li>
          <li>
            <a href="https://techcrunch.com/2026/08/27/openai-to-start-showing-ads-on-chatgpts-free-and-go-tiers-in-india/" target="_blank" rel="noopener noreferrer">
              TechCrunch: OpenAI to start showing ads on ChatGPT's Free and Go tiers in India
            </a>{" "}
            (27 August 2026)
          </li>
          <li>
            <a href="https://gemini.google/in/subscriptions/?hl=en-IN" target="_blank" rel="noopener noreferrer">
              Google: Google AI plans, India
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://www.cxodigitalpulse.com/reliance-jio-expands-partnership-with-google-offers-18-months-of-free-google-ai-pro-access-to-all-5g-users/" target="_blank" rel="noopener noreferrer">
              CXO Digital Pulse: Reliance Jio offers 18 months of free Google AI Pro to all 5G users
            </a>{" "}
            (10 November 2025)
          </li>
          <li>
            <a href="https://www.freepressjournal.in/tech/anthropic-introduces-indian-prices-for-claude-ai-subscriptions-heres-how-much-it-costs" target="_blank" rel="noopener noreferrer">
              Free Press Journal: Anthropic introduces Indian prices for Claude AI subscriptions
            </a>{" "}
            (14 July 2026)
          </li>
          <li>
            <a href="https://www.businesstoday.in/technology/news/story/anthropic-introduces-india-pricing-for-claude-ai-plans-pricing-starts-at-542742-2026-07-14" target="_blank" rel="noopener noreferrer">
              Business Today: Anthropic introduces India pricing for Claude AI plans
            </a>{" "}
            (14 July 2026)
          </li>
          <li>
            <a href="https://www.microsoft.com/en-in/microsoft-365/buy/compare-all-microsoft-365-products" target="_blank" rel="noopener noreferrer">
              Microsoft India: Compare all Microsoft 365 plans
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://www.finout.io/blog/perplexity-pricing-in-2026" target="_blank" rel="noopener noreferrer">
              Finout: Perplexity pricing in 2026
            </a>{" "}
            (2026)
          </li>
          <li>
            <a href="https://www.voicendata.com/software-apps/airtel-wraps-up-perplexity-pro-deal-rolls-out-new-benefit-11066197" target="_blank" rel="noopener noreferrer">
              Voice&amp;Data: Airtel wraps up Perplexity Pro deal, rolls out new benefit
            </a>{" "}
            (2 February 2026)
          </li>
        </ul>
      </div>
    </>
  );
}
