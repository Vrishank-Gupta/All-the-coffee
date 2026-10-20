import { Link } from "react-router-dom";

export default function FreeAiOffersIndiaWork() {
  return (
    <>
      <p>
        Over the last year, your family WhatsApp group has probably forwarded more AI offers than wedding
        invitations. "Jio users get Gemini Pro free for 18 months!" "Airtel is giving Perplexity Pro worth
        ₹17,000!" "ChatGPT Go free for a whole year, claim before it ends!" Your cousin claimed all three. Your
        manager claimed none. You claimed one, used it twice, and are not entirely sure it's still active.
      </p>
      <p>
        So here is the calm, verified version. As of October 2026: which of these offers still exist, what each
        actually gives you, what it costs once the free part ends, what the catches are, and, most usefully,
        which one is worth opening for which kind of work task. No favourites, just what each is good at.
      </p>

      <h2>The status check, in one table</h2>
      <p>
        Two of the three famous offers are already closed to new users. People who claimed them in time keep
        their benefit for the full term, but you can't sign up now.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Offer</th>
              <th>What you get</th>
              <th>Open to new users?</th>
              <th>Length</th>
              <th>After it ends</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jio x Google</td>
              <td>Google AI Pro (Gemini)</td>
              <td>Yes, but the published claim window runs only to 29 October 2026</td>
              <td>18 months from activation</td>
              <td>AI Pro lists at ₹1,950/month if you choose to pay</td>
            </tr>
            <tr>
              <td>Airtel x Perplexity</td>
              <td>Perplexity Pro</td>
              <td>No, ended 16 January 2026</td>
              <td>12 months from activation</td>
              <td>Perplexity values a year of Pro at ₹17,000</td>
            </tr>
            <tr>
              <td>OpenAI India promo</td>
              <td>ChatGPT Go</td>
              <td>No, ended 21 January 2026</td>
              <td>12 months from redemption</td>
              <td>Auto-renews at ₹399/month unless cancelled</td>
            </tr>
            <tr>
              <td>Plain free tiers</td>
              <td>ChatGPT, Gemini, Claude, Copilot, Perplexity</td>
              <td>Yes</td>
              <td>Ongoing</td>
              <td>Free, with usage limits</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Prices are at the time of writing (October 2026) and do change, so always check the amount on your own
        account or app before you pay.
      </p>

      <h2>Jio x Google: Gemini AI Pro for 18 months</h2>
      <h3>What you get</h3>
      <p>
        According to{" "}
        <a href="https://www.jio.com/google-gemini-offer/" target="_blank" rel="noopener noreferrer">
          Jio's offer page
        </a>
        , eligible users get Google AI Pro free for 18 months, which Jio values at ₹35,100. That includes the
        Gemini app with Google's higher-end models and Deep Research (a mode that reads many web pages and writes
        a longer report), higher image generation limits, limited video generation, NotebookLM with higher
        limits, Gemini built into Gmail and Docs, and{" "}
        <strong>5 TB of shared storage</strong> across Photos, Drive and Gmail. For a lot of people, the storage
        alone is the practical win: no more "your Google storage is full" nag every month.
      </p>

      <h3>Who's eligible</h3>
      <ul>
        <li>Jio SIM users aged 18 and above.</li>
        <li>
          On an active <strong>unlimited 5G plan of ₹349 or more</strong>, prepaid or postpaid.
        </li>
        <li>Once per mobile number. You claim it in the MyJio app and register with your Gmail ID.</li>
      </ul>
      <p>
        Some older pages on Jio's own site still mention an 18 to 25 age range from the offer's early days. The
        main offer page now says 18 and above. If MyJio doesn't show you the banner, that's the final answer for
        your number.
      </p>

      <h3>The catches</h3>
      <ul>
        <li>
          <strong>You have to keep recharging.</strong> Jio's terms require you to{" "}
          <a href="https://www.jio.com/google-gemini-offer/" target="_blank" rel="noopener noreferrer">
            stay on an eligible 5G plan for the whole 18 months
          </a>
          . TelecomTalk pointed out that this effectively{" "}
          <a
            href="https://telecomtalk.info/jio-bundling-rs349-users-may-spend-keep/1006878/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ties you to ₹349-and-up plans
          </a>{" "}
          if you want to keep the benefit. If you were going to stay on such a plan anyway, it costs you nothing
          extra. If you'd otherwise be on a cheaper plan, the "free" AI is part-paid by your recharge.
        </li>
        <li>
          <strong>The claim window is closing.</strong> Jio's offer terms, as{" "}
          <a
            href="https://www.desidime.com/news/jio-gemini-pro-offer-last-date-gemini-jio-offer-ends-soon"
            target="_blank"
            rel="noopener noreferrer"
          >
            quoted by DesiDime
          </a>
          , say the offer is valid from 30 October 2025 until 29 October 2026, "or such other date as may be
          decided" by Jio. We could not find an announced extension. This is not a reason to panic-claim: if you
          don't need 5 TB of storage or Gemini's extras, missing it costs you nothing.
        </li>
        <li>
          <strong>After 18 months.</strong> Jio's page for its business version of the offer says{" "}
          <a href="https://www.jio.com/business/offer/google-gemini/" target="_blank" rel="noopener noreferrer">
            "there is no payment or auto-renewal after 18 months"
          </a>
          . We could not read the consumer terms directly, so check the confirmation in MyJio. If you want to
          keep AI Pro after that, Google's own price in India is{" "}
          <a
            href="https://one.google.com/about/plans?hl=en-IN"
            target="_blank"
            rel="noopener noreferrer"
          >
            ₹1,950 a month
          </a>
          . One thing to plan for: if you've filled that 5 TB, you'll need to clear space or pay when it ends.
        </li>
      </ul>

      <h2>Airtel x Perplexity: Perplexity Pro for 12 months</h2>
      <p>
        Perplexity is an AI search engine: you ask a question, it searches the web and answers with numbered
        links to its sources. In July 2025, Airtel{" "}
        <a
          href="https://www.airtel.in/press-release/07-2025/airtel-partners-with-perplexity-powers-every-single-of-its-360mn-customers-with-perplexity-pro/"
          target="_blank"
          rel="noopener noreferrer"
        >
          announced Perplexity Pro free for 12 months
        </a>{" "}
        for its customers.
      </p>
      <p>
        That offer is over.{" "}
        <a
          href="https://www.perplexity.ai/help-center/en/articles/11842322-perplexity-pro-airtel-promo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Perplexity's help center
        </a>{" "}
        says the promotion ended on 16 January 2026. If you activated it in time, you keep Pro for{" "}
        <a
          href="https://telecomtalk.info/airtels-perplexity-pro-ends-existing-12month-access/1004521/"
          target="_blank"
          rel="noopener noreferrer"
        >
          12 months from your activation date
        </a>
        , so the earliest claimers have already lapsed and the latest run out around January 2027.
      </p>
      <h3>The catches</h3>
      <ul>
        <li>
          A credit card was required to redeem it. Perplexity's help page does not spell out what happens to
          billing after the 12 months, so if you claimed it, open Perplexity's account settings now and check
          whether a renewal is scheduled.
        </li>
        <li>
          Perplexity puts the value of a year of Pro at ₹17,000 (US$200). Paying that out of your own pocket is a
          very different decision from getting it free.
        </li>
        <li>
          Airtel's current freebie is a different kind of tool: Adobe says Airtel customers can{" "}
          <a
            href="https://helpx.adobe.com/be_en/express/web/adobe-express-subscription/adobe-express-premium-with-airtel.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            activate 12 months of Adobe Express Premium
          </a>{" "}
          until 28 January 2027 through the Airtel Thanks app. That is a design tool with AI features, not a
          chat assistant.
        </li>
      </ul>

      <h2>OpenAI: ChatGPT Go free for a year</h2>
      <p>
        ChatGPT Go is OpenAI's lower-priced paid plan,{" "}
        <a
          href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
          target="_blank"
          rel="noopener noreferrer"
        >
          ₹399 a month including GST
        </a>{" "}
        in India. Users who signed up from 4 November 2025 got it free for 12 months, and OpenAI's release notes
        confirm that{" "}
        <a
          href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
          target="_blank"
          rel="noopener noreferrer"
        >
          the promo ended on 21 January 2026
        </a>
        .
      </p>
      <p>
        The big catch is that this one <strong>does</strong> renew automatically. Your free year runs from your
        own redemption date, and after that the card or UPI AutoPay you added gets charged monthly. The first
        renewals start in early November 2026. We've written a separate step-by-step on{" "}
        <Link to="/blog/chatgpt-go-free-year-ending">checking your date and cancelling or keeping Go</Link>.
      </p>
      <p>
        Also worth knowing: Go is not ad-free. Since late August 2026, OpenAI has been{" "}
        <a
          href="https://www.businesstoday.in/technology/artificial-intelligence/story/chatgpt-ads-arrive-in-india-as-openai-targets-free-go-users-in-major-revenue-push-ahead-of-ipo-551655-2026-08-27"
          target="_blank"
          rel="noopener noreferrer"
        >
          showing labelled ads to Free and Go users in India
        </a>
        . OpenAI says advertisers don't get access to your chats.
      </p>

      <h2>The plain free tiers (which most people should start with)</h2>
      <p>
        Here's the quiet truth behind all the bundle excitement: the regular free versions are good enough for a
        large share of everyday office work. The paid plans mostly raise limits. A quick, fair summary:
      </p>
      <ul>
        <li>
          <strong>ChatGPT Free:</strong> OpenAI's help page says{" "}
          <a
            href="https://help.openai.com/en/articles/12739021-chatgpt-go-promotion-india"
            target="_blank"
            rel="noopener noreferrer"
          >
            both Free and Go include unlimited everyday text chats
          </a>
          ; Go adds higher limits for file uploads, images and data analysis, and a larger memory. Free has ads in
          India.
        </li>
        <li>
          <strong>Gemini (free):</strong> available with any Google account. The free version doesn't include the
          AI Pro extras like 5 TB storage or Gemini inside Gmail and Docs.
        </li>
        <li>
          <strong>Claude Free:</strong> Anthropic's{" "}
          <a href="https://claude.com/pricing" target="_blank" rel="noopener noreferrer">
            free plan
          </a>{" "}
          includes web search, file creation, code execution, memory across conversations and Artifacts (small
          documents, pages or tools it builds and shows you right next to the chat).
        </li>
        <li>
          <strong>Microsoft Copilot (free):</strong> Microsoft's consumer Copilot app and website, separate from
          the Copilot your company may have inside Microsoft 365.
        </li>
        <li>
          <strong>Perplexity Free:</strong>{" "}
          <a
            href="https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you"
            target="_blank"
            rel="noopener noreferrer"
          >
            nearly unlimited basic searches
          </a>{" "}
          and a small number of the deeper "Pro Searches", with limited file uploads.
        </li>
      </ul>

      <h2>The catch nobody forwards: what happens to your work data</h2>
      <p>
        Every one of these personal accounts, free or bundled, is a <em>consumer</em> product. That matters
        because, by default or by your earlier click, several of them can use your chats to train future models
        (meaning your text can become part of what the AI learns from). Here's where the switch lives in each:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Can personal chats be used for training?</th>
              <th>Where to switch it off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ChatGPT (Free, Go, Plus)</td>
              <td>Yes, unless you turn it off</td>
              <td>
                <a
                  href="https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Settings, Data controls, "Improve the model for everyone"
                </a>
              </td>
            </tr>
            <tr>
              <td>Gemini (free and AI Pro, including Jio)</td>
              <td>Yes while Keep Activity is on; some chats are read by human reviewers</td>
              <td>
                <a
                  href="https://support.google.com/gemini/answer/13594961?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gemini Apps Activity, turn off Keep Activity, or use Temporary Chat
                </a>
              </td>
            </tr>
            <tr>
              <td>Claude (Free, Pro)</td>
              <td>Only if you allowed it when asked</td>
              <td>
                <a
                  href="https://www.anthropic.com/news/updates-to-our-consumer-terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy settings, model improvement toggle
                </a>
              </td>
            </tr>
            <tr>
              <td>Microsoft Copilot (personal)</td>
              <td>Yes for signed-in users, unless you turn it off</td>
              <td>
                <a
                  href="https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Profile, Privacy, "Training on conversation activity"
                </a>
              </td>
            </tr>
            <tr>
              <td>Perplexity (Free, Pro)</td>
              <td>Yes by default</td>
              <td>
                <a
                  href="https://www.perplexity.ai/help-center/en/articles/11564572-data-collection-at-perplexity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Account settings, Preferences, AI data retention
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Two things to keep in mind:</p>
      <ul>
        <li>
          <strong>Switching off training is not the same as "safe for confidential data".</strong> Google's
          privacy hub, for example, says chats picked for human review are{" "}
          <a
            href="https://support.google.com/gemini/answer/13594961?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            kept for up to three years
          </a>{" "}
          and aren't deleted when you delete your activity. OpenAI notes that pressing thumbs up or down can send
          the whole conversation for model improvement even if you've opted out.
        </li>
        <li>
          <strong>Your company's AI account works differently.</strong> Business and enterprise versions of
          ChatGPT, Gemini in Google Workspace, and Copilot with a work login are not used for training by default
          under these companies' published policies. If your employer gives you one of those, use it for work
          material, not the Jio freebie on your personal Gmail.
        </li>
      </ul>
      <p>
        Practical rule: salary sheets, customer phone numbers, Aadhaar or PAN details, unannounced numbers and
        anything under NDA don't go into a personal AI account, free or paid. We've covered{" "}
        <Link to="/blog/ai-data-privacy-india">what's safe to paste and how India's DPDP Act fits in</Link>, and
        why using personal AI tools for work without telling anyone{" "}
        <Link to="/blog/shadow-ai-your-team">creates problems for your team</Link>.
      </p>

      <h2>Which one for which work task</h2>
      <p>
        Here's the useful part. These are hypothetical but very ordinary office tasks, with an honest take on
        which tool fits. Any of the big chat assistants can do all of these to some extent; this is about which
        one makes it easiest.
      </p>

      <h3>1. Summarising a 60-email thread before a meeting</h3>
      <p>
        Say you're a procurement manager walking into a vendor review in ten minutes, and the thread has been
        going since Diwali.
      </p>
      <ul>
        <li>
          <strong>If the thread is in Gmail and you have AI Pro (Jio or paid):</strong> Gemini inside Gmail is the
          shortest path, because it can read the thread where it already lives. No copy-pasting.
        </li>
        <li>
          <strong>Otherwise:</strong> any free assistant works. Paste the thread (after removing names and
          numbers you shouldn't share) and ask for: decisions made, open questions, who owes what, by when.
        </li>
        <li>
          <strong>Watch out:</strong> if it's a work Gmail on Google Workspace, your company's settings decide
          what's allowed. The personal Jio offer doesn't apply to your work account.
        </li>
      </ul>

      <h3>2. Cleaning a messy Excel export</h3>
      <p>
        Say you're in HR ops and the attendance export from your HRMS has merged cells, dates in three formats,
        and "Mumbai", "mumbai " and "Bombay" as separate locations.
      </p>
      <ul>
        <li>
          <strong>Good fit:</strong> ChatGPT (Go gives you higher data analysis and upload limits) and Claude
          (code execution is on the free plan). Both can actually run code against your file rather than just
          guessing.
        </li>
        <li>
          <strong>Weaker fit:</strong> Perplexity. It's built for search, not spreadsheet surgery.
        </li>
        <li>
          <strong>Watch out:</strong> an attendance file is personal data about employees. Strip names and
          employee IDs, or use dummy rows to work out the cleaning steps, then apply those steps to the real file
          yourself.
        </li>
      </ul>

      <h3>3. Drafting a work-from-home or travel policy</h3>
      <p>
        Say your manager wants a first draft of a hybrid work policy by Friday.
      </p>
      <ul>
        <li>
          <strong>For the research:</strong> Perplexity (or Gemini's Deep Research on AI Pro) is good for "what do
          Indian companies typically include in a hybrid policy", because you get the source links and can check
          them.
        </li>
        <li>
          <strong>For the writing:</strong> ChatGPT, Claude and Gemini are all capable drafters. Give it your
          company's tone, the non-negotiables from your manager, and an example policy you like. Ask for a draft,
          then ask it to list the questions a sceptical employee would raise.
        </li>
        <li>
          <strong>Watch out:</strong> anything involving labour law, leave entitlements or state-specific rules
          needs checking against the actual source and your legal or HR head. AI drafts confidently, including
          when it is wrong.
        </li>
      </ul>

      <h3>4. Building a small tool for your own work</h3>
      <p>
        Say you're a sales coordinator who keeps calculating discount approvals by hand, and you want a simple
        page where you type the deal size and it tells you who needs to sign off.
      </p>
      <ul>
        <li>
          <strong>Good fit:</strong> Claude's free plan includes Artifacts, so you can describe the tool in plain
          English and see it working next to the chat. ChatGPT and Gemini can also write the code for a small
          page; with those you may need to copy it into a file and open it in your browser.
        </li>
        <li>
          <strong>Watch out:</strong> start with made-up numbers, not your real price list, and test it with a few
          cases you already know the answer to before you trust it.
        </li>
      </ul>

      <h3>5. Quick fact-checks and "what's the latest on X"</h3>
      <ul>
        <li>
          <strong>Good fit:</strong> Perplexity, because answers come with sources you can click. Most chat
          assistants now search the web too, so this is less of a gap than it was.
        </li>
        <li>
          <strong>Watch out:</strong> open the source link before quoting a number to your boss. A citation is
          only useful if you read it.
        </li>
      </ul>

      <h2>So, which one should you actually use?</h2>
      <p>A simple way to decide, without claiming every offer that comes your way:</p>
      <ol>
        <li>
          <strong>If your company provides an AI tool, use that for work.</strong> It's the one with the
          protections your data needs.
        </li>
        <li>
          <strong>If you're on Jio, already on a ₹349+ 5G plan, and live in Gmail, Drive and Docs:</strong> the
          Gemini offer is genuinely good value, mostly for the storage and Gmail integration. Check MyJio before
          29 October 2026.
        </li>
        <li>
          <strong>If you claimed ChatGPT Go:</strong> look up your renewal date this week and decide keep or
          cancel on purpose, not by default.
        </li>
        <li>
          <strong>If you claimed Perplexity via Airtel:</strong> note your 12-month end date and check for any
          scheduled renewal.
        </li>
        <li>
          <strong>Everyone else:</strong> pick one free assistant and get properly good at it before paying for
          anything. Switching between five tools makes you average at all five. Our guide on{" "}
          <Link to="/blog/ai-subscription-costs">which AI subscriptions are worth paying for</Link> covers the
          next step.
        </li>
      </ol>
      <p>
        Honestly, the difference between these tools matters much less than whether you've used any of them for
        a real task. Typing better instructions helps a bit; knowing{" "}
        <Link to="/blog/prompt-engineering-is-dying">what you want the tool to do</Link> helps more.
      </p>

      <h2>Your next step today</h2>
      <p>
        Pick one task from the list above that you'll actually face this week, and do it with whichever free
        tool you already have. Before you start, take 30 seconds to find that tool's training setting from the
        table and decide whether you want it on.
      </p>
      <p>
        If the "build a small tool" example made you curious, that's exactly what the free first module of our
        course is about: in Chapter 1 you build a working Meeting Cost Calculator in your browser in about 20
        minutes, with no coding background and no card. <Link to="/overview">See what's in the course</Link>.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a href="https://www.jio.com/google-gemini-offer/" target="_blank" rel="noopener noreferrer">
              Jio: Google Gemini Offer, free 18-month Pro plan for Jio users
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://www.jio.com/business/offer/google-gemini/" target="_blank" rel="noopener noreferrer">
              Jio Business: Google Gemini offer for COCP users
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.desidime.com/news/jio-gemini-pro-offer-last-date-gemini-jio-offer-ends-soon"
              target="_blank"
              rel="noopener noreferrer"
            >
              DesiDime: Jio Gemini Pro offer last date (quoting Jio's terms)
            </a>{" "}
            (2026)
          </li>
          <li>
            <a
              href="https://telecomtalk.info/jio-bundling-rs349-users-may-spend-keep/1006878/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TelecomTalk: Jio is bundling more with Rs 349, but users may have to spend more to keep the benefits
            </a>{" "}
            (28 April 2026)
          </li>
          <li>
            <a href="https://one.google.com/about/plans?hl=en-IN" target="_blank" rel="noopener noreferrer">
              Google One: Plans and pricing (India)
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.airtel.in/press-release/07-2025/airtel-partners-with-perplexity-powers-every-single-of-its-360mn-customers-with-perplexity-pro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Airtel: Airtel partners with Perplexity (press release)
            </a>{" "}
            (July 2025)
          </li>
          <li>
            <a
              href="https://www.perplexity.ai/help-center/en/articles/11842322-perplexity-pro-airtel-promo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Perplexity Help Center: Perplexity Pro Airtel promo
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://telecomtalk.info/airtels-perplexity-pro-ends-existing-12month-access/1004521/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TelecomTalk: Airtel Perplexity Pro offer ends, existing users continue
            </a>{" "}
            (18 February 2026)
          </li>
          <li>
            <a
              href="https://helpx.adobe.com/be_en/express/web/adobe-express-subscription/adobe-express-premium-with-airtel.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Adobe Help: Adobe Express Premium free offer with Airtel FAQ
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you"
              target="_blank"
              rel="noopener noreferrer"
            >
              Perplexity Help Center: Which Perplexity subscription plan is right for you?
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.perplexity.ai/help-center/en/articles/11564572-data-collection-at-perplexity"
              target="_blank"
              rel="noopener noreferrer"
            >
              Perplexity Help Center: Data collection at Perplexity
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI Help Center: ChatGPT release notes
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://help.openai.com/en/articles/12739021-chatgpt-go-promotion-india"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI Help Center: What is ChatGPT Go?
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI Help Center: Data controls in ChatGPT
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.businesstoday.in/technology/artificial-intelligence/story/chatgpt-ads-arrive-in-india-as-openai-targets-free-go-users-in-major-revenue-push-ahead-of-ipo-551655-2026-08-27"
              target="_blank"
              rel="noopener noreferrer"
            >
              Business Today: ChatGPT ads arrive in India for Free and Go users
            </a>{" "}
            (27 August 2026)
          </li>
          <li>
            <a
              href="https://support.google.com/gemini/answer/13594961?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google: Gemini Apps Privacy Hub
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.anthropic.com/news/updates-to-our-consumer-terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anthropic: Updates to Consumer Terms and Privacy Policy
            </a>{" "}
            (2025)
          </li>
          <li>
            <a href="https://claude.com/pricing" target="_blank" rel="noopener noreferrer">
              Anthropic: Claude plans and pricing
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Support: Microsoft Copilot privacy controls
            </a>{" "}
            (accessed October 2026)
          </li>
        </ul>
      </div>
    </>
  );
}
