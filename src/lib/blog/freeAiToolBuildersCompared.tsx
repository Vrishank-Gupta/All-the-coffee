import { Link } from "react-router-dom";

export default function FreeAiToolBuildersCompared() {
  return (
    <>
      <p>
        It's the second week of the appraisal cycle. Someone on your team has messaged the HR WhatsApp group for
        the fourth time asking how many leaves they'll have left if they take the Diwali week off. You open the
        leave policy PDF, then the attendance export, then a calculator, and you do the same sum you did for
        three other people yesterday.
      </p>
      <p>
        At some point you think: surely I could just make a little page where people type in their numbers and
        get the answer. You've heard that AI can build these things now if you describe them in plain English.
        What nobody tells you is <em>where</em> to actually do it, which of the free options are worth your
        time, and which ones quietly need a credit card or a developer.
      </p>
      <p>
        This guide compares the main free places to build your first small work tool, as of October 2026. Then
        it walks you through building one, testing it, and fixing it when it breaks (it will, and that's fine).
      </p>
      <p>
        One honest warning before we start: these products change every few weeks. Features get renamed,
        moved behind a paywall, or switched off entirely. One of the four tools in the title is being shut
        down next month. Everything below was checked against the companies' own help pages at the time of
        writing, with links, so you can recheck before you rely on it.
      </p>

      <h2>First, what "building a tool with AI" actually means</h2>
      <p>
        When you ask a chatbot to "make me a leave calculator," it writes a small web page: some HTML (the
        structure, like the boxes and buttons), some CSS (the look) and some JavaScript (the logic that does the
        sums). The good tools then <strong>run that page right next to the chat</strong>, so you can click
        buttons and type numbers immediately, without installing anything.
      </p>
      <p>
        You don't need to read the code. You need to describe what you want clearly, test the result like a
        sceptical auditor, and describe what went wrong when it misbehaves. People call this "vibe coding,"
        which just means building software by describing it instead of typing the code yourself.
      </p>
      <p>
        So the questions that matter when you choose where to build are simple:
      </p>
      <ul>
        <li>Can I see and use the tool right there in the browser, on a free account?</li>
        <li>Can I send a link to a colleague so they can use it too?</li>
        <li>What happens to whatever I type in, from a work data point of view?</li>
        <li>Is it built for people like me, or for developers?</li>
      </ul>

      <h2>Claude (Artifacts)</h2>
      <p>
        In Claude, the thing it builds for you is called an <strong>artifact</strong>. It opens in a panel
        beside your chat, and for small interactive tools it's one of the most comfortable places to start.
      </p>
      <p>
        <strong>Free?</strong> Yes. Anthropic's help centre says{" "}
        <a
          href="https://support.claude.com/en/articles/17153992-what-are-artifacts"
          target="_blank"
          rel="noopener noreferrer"
        >
          artifacts are available on Free, Pro, Max, Team and Enterprise plans
        </a>
        . One setup step catches people out: artifacts need the "code execution and file creation" option
        turned on under Settings, then Capabilities. If you ask for a tool and only get a wall of code, check
        that setting first.
      </p>
      <p>
        <strong>What's paid-only?</strong> According to the same page, connecting an artifact to other apps and
        storing data inside it are for Pro and above, and some templates (like Dashboards) are paid-plan betas.
        For a first calculator or checklist, none of that matters.
      </p>
      <p>
        <strong>Can you share it?</strong> Yes, with a catch. Claude reworked artifacts in September 2026.
        Under the{" "}
        <a
          href="https://support.claude.com/en/articles/9547008-publishing-remixing-and-sharing-artifacts"
          target="_blank"
          rel="noopener noreferrer"
        >
          current sharing rules
        </a>
        , you can share with anyone who has the link, but they need a Claude account to open it (a free
        account is fine). Older artifacts published from a chat could be opened by anyone without an account;
        new ones can't. So if your colleague in accounts doesn't want to sign up for anything, this is a
        real limitation.
      </p>
      <p>
        <strong>Good at:</strong> clean, working first drafts of small tools, and explaining what it changed
        when you ask for fixes.
      </p>

      <h2>Google Gemini (Canvas)</h2>
      <p>
        Gemini's equivalent is <strong>Canvas</strong>. You pick Canvas from the tools in the Gemini web app,
        describe what you want, and it builds the app in a side panel with a preview and a code view.
      </p>
      <p>
        <strong>Free?</strong> Google's{" "}
        <a
          href="https://support.google.com/gemini/answer/16047321"
          target="_blank"
          rel="noopener noreferrer"
        >
          Canvas help page
        </a>{" "}
        says you need to be signed in, and that some features are limited to users 18 and over. It doesn't
        describe Canvas as a paid-only feature. One recent change to know about: from 9 October 2026, Business
        Today reported that{" "}
        <a
          href="https://www.businesstoday.in/technology/news/story/google-gemini-plans-are-changing-from-october-9-free-ai-plus-users-face-new-limits-on-ai-model-access-559434-2026-10-05"
          target="_blank"
          rel="noopener noreferrer"
        >
          free Gemini users are limited to the Flash-Lite model
        </a>
        , Google's smallest one, with Flash and Pro moving to paid plans. For a simple calculator that's
        usually enough, but don't be surprised if more complex requests take a few more rounds of fixing.
      </p>
      <p>
        <strong>Can you share it?</strong> Yes. Share and export gives you a public g.co/gemini/share link.
        Two things from Google's own page are worth reading twice: shared links open only in the Gemini web
        app (not the mobile app), and{" "}
        <em>"anyone with that public link can view and edit data associated with the app."</em> Anyone who
        opens it can also make their own editable copy. Fine for a calculator; not fine for anything holding
        real employee data.
      </p>
      <p>
        <strong>Good at:</strong> quick builds, and handy if your company already lives in Google Workspace,
        since you can export to Docs or Slides.
      </p>

      <h2>ChatGPT (Canvas, mostly gone)</h2>
      <p>
        ChatGPT used to have its own Canvas, a side panel for writing and code that could render a small web
        page. If you follow an older YouTube tutorial, that's what it'll show you.
      </p>
      <p>
        That has changed. OpenAI's{" "}
        <a
          href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
          target="_blank"
          rel="noopener noreferrer"
        >
          release notes
        </a>{" "}
        say canvas is no longer available in the GPT-5.5 models (the entry is dated 28 May 2026), and writing and
        coding now happen inside the chat in "writing blocks" and "code blocks." Code blocks have a Code/Preview
        toggle where a preview is supported, so you can still see and click a simple HTML tool in many cases.
      </p>
      <p>
        <strong>Can you share it?</strong> You can share the conversation, but I couldn't confirm from OpenAI's
        documentation that the person you send it to gets a working tool rather than just the code. Treat
        ChatGPT as a good place to draft and test, and one of the other options as the place to share from.
      </p>
      <p>
        <strong>Good at:</strong> if you already use ChatGPT daily, it's the lowest-friction place to try your
        first idea.
      </p>

      <h2>Google Opal (being switched off: skip it)</h2>
      <p>
        Opal is a Google Labs experiment for building "AI mini-apps" without code. Instead of a web page with
        sums, you chained together steps: take this input, ask Gemini to do something with it, generate an
        image, save to Sheets. It reached India in{" "}
        <a
          href="https://blog.google/innovation-and-ai/models-and-research/google-labs/opal-expansion/"
          target="_blank"
          rel="noopener noreferrer"
        >
          October 2025
        </a>
        , expanded to{" "}
        <a
          href="https://blog.google/innovation-and-ai/models-and-research/google-labs/opal-expansion-160/"
          target="_blank"
          rel="noopener noreferrer"
        >
          more than 160 countries
        </a>{" "}
        a month later, and was{" "}
        <a
          href="https://techcrunch.com/2025/12/17/googles-vibe-coding-tool-opal-comes-to-gemini"
          target="_blank"
          rel="noopener noreferrer"
        >
          added to the Gemini web app
        </a>{" "}
        in December 2025.
      </p>
      <p>
        The important part for you: Google's{" "}
        <a href="https://developers.google.com/opal/faq" target="_blank" rel="noopener noreferrer">
          Opal FAQ
        </a>{" "}
        now says the service will turn off on <strong>17 November 2026</strong>, and Google's{" "}
        <a
          href="https://blog.google/products-and-platforms/products/gemini/automate-tasks-with-skills/"
          target="_blank"
          rel="noopener noreferrer"
        >
          30 September post on Gemini skills
        </a>{" "}
        confirms Opal is being turned down. Workflows won't move across automatically; Google points people to
        Skills in Gemini or Google AI Studio instead. If you've already built something in Opal, copy your
        prompts out now. If you haven't, don't start a new project there.
      </p>

      <h2>The developer-flavoured options (worth knowing, not where to start)</h2>
      <p>
        You'll see these in every "best AI app builder" list. They're capable, but they're designed around
        developer ideas like projects, credits, deployments and code repositories.
      </p>
      <ul>
        <li>
          <strong>Google AI Studio (Build mode):</strong> Google's{" "}
          <a
            href="https://ai.google.dev/gemini-api/docs/aistudio-build-mode"
            target="_blank"
            rel="noopener noreferrer"
          >
            documentation
          </a>{" "}
          describes it as a way to build and deploy full-stack web apps and even Android apps from prompts.
          Apps are private by default and can be shared. The page doesn't call it free, and notes that costs
          can apply if you use paid models or deploy to Google Cloud. Powerful, but more than you need for a
          leave calculator.
        </li>
        <li>
          <strong>Lovable:</strong> its{" "}
          <a href="https://lovable.dev/pricing" target="_blank" rel="noopener noreferrer">
            pricing page
          </a>{" "}
          says the free plan includes 5 build credits a day, up to 30 a month. Each change you ask for uses
          credits, so a first project can eat a day's allowance quickly.
        </li>
        <li>
          <strong>Bolt:</strong> its{" "}
          <a href="https://bolt.new/pricing" target="_blank" rel="noopener noreferrer">
            pricing page
          </a>{" "}
          lists 1 million tokens a month on the free plan, with a 300,000 daily limit, and hosting with Bolt
          branding. A "token" is roughly a chunk of a word; every request and every reply uses some.
        </li>
      </ul>
      <p>
        These are good next steps once you've built two or three small tools and want a proper website. For
        your first one, the chat-based options above are gentler.
      </p>

      <h2>Side by side</h2>
      <p>All of this is as of October 2026, from each company's own pages. Check before you rely on it.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Build a working tool on a free account?</th>
              <th>Share a link with a colleague?</th>
              <th>Best for</th>
              <th>Watch out for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Claude Artifacts</td>
              <td>Yes (turn on code execution in settings)</td>
              <td>Yes, but viewers need a Claude account</td>
              <td>Small interactive tools, clear fixes</td>
              <td>Storage and app connections are paid</td>
            </tr>
            <tr>
              <td>Gemini Canvas</td>
              <td>Yes, sign-in required</td>
              <td>Yes, public link, opens in Gemini web app</td>
              <td>Quick builds, Google Workspace users</td>
              <td>Free tier now on smallest model; link holders can see and edit app data</td>
            </tr>
            <tr>
              <td>ChatGPT</td>
              <td>Preview in code blocks, where supported</td>
              <td>Chat link; working tool for viewer not confirmed</td>
              <td>Drafting and testing if you already use it</td>
              <td>Canvas removed from current models</td>
            </tr>
            <tr>
              <td>Google Opal</td>
              <td>Until 17 Nov 2026</td>
              <td>Was possible</td>
              <td>Nothing new</td>
              <td>Shutting down</td>
            </tr>
            <tr>
              <td>AI Studio, Lovable, Bolt</td>
              <td>Yes, within credit or usage limits</td>
              <td>Yes, various ways</td>
              <td>Fuller apps and websites</td>
              <td>Developer-style concepts, limits run out fast</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Before you type anything: the work data question</h2>
      <p>
        On a free, personal account, assume what you type may be stored and may be used to improve the
        company's models unless you change a setting. Roughly:
      </p>
      <ul>
        <li>
          <strong>Gemini:</strong> Google's{" "}
          <a
            href="https://support.google.com/gemini/answer/13594961"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy notice
          </a>{" "}
          says a subset of chats are reviewed by humans and asks you not to enter confidential information
          you wouldn't want a reviewer to see. Turning off "Keep Activity" stops future chats being used for
          training.
        </li>
        <li>
          <strong>ChatGPT:</strong> OpenAI's{" "}
          <a
            href="https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt"
            target="_blank"
            rel="noopener noreferrer"
          >
            data controls
          </a>{" "}
          let Free and Plus users switch off "Improve the model for everyone."
        </li>
        <li>
          <strong>Claude:</strong> Anthropic's{" "}
          <a
            href="https://www.anthropic.com/news/updates-to-our-consumer-terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            consumer terms
          </a>{" "}
          let Free, Pro and Max users choose whether their chats are used for training, in privacy settings.
          Team and Enterprise plans are covered by different terms.
        </li>
      </ul>
      <p>
        The good news is that a first tool rarely needs real data. A leave calculator needs the{" "}
        <em>rules</em> of your leave policy, not anyone's actual attendance. Build with made-up numbers, test
        with made-up numbers, and let people type their own figures into the finished tool. If your company
        pays for a business AI plan, use that one for work. For the fuller picture, including India's data
        protection law, read{" "}
        <Link to="/blog/ai-data-privacy-india">what's safe to paste into AI at work</Link>.
      </p>

      <h2>Let's build one: a leave balance calculator</h2>
      <p>
        Pick any of Claude, Gemini or ChatGPT. The steps are the same. Our example is entirely hypothetical:
        say your company gives 1.5 days of earned leave for every completed month, the leave year runs April
        to March, and you can carry forward a maximum of 30 days from last year. Use your real policy's rules
        instead if you know them.
      </p>

      <h3>Step 1: describe it like you'd brief a new junior</h3>
      <p>
        The secret to a good first prompt isn't clever wording. It's being specific about inputs, the rule,
        and what the answer should look like. Here's one you can copy:
      </p>
      <blockquote>
        Build me a simple leave balance calculator as a single web page. Inputs: (1) leave carried forward from
        last year, (2) number of completed months in this leave year (April to March, so 0 to 12), (3) leave
        days already taken this year, (4) leave days the person is planning to take. Rules: they earn 1.5 days
        for each completed month. Carry forward is capped at 30 days, so if someone enters more than 30, use 30
        and show a small note saying it was capped. Show: total available now, balance after the planned
        leave, and a clear warning in red if the planned leave would take the balance below zero. Use plain
        labels a non-technical employee would understand. Make it look clean and work on a phone.
      </blockquote>
      <p>
        Notice what's in there: what goes in, the exact rule, the edge case (the cap), what comes out, and who
        will use it. That's most of the skill.
      </p>

      <h3>Step 2: test it with numbers you already know the answer to</h3>
      <p>
        This is the step people skip, and it's the one that matters. The AI will produce something that{" "}
        <em>looks</em> right. Your job is to prove it <em>is</em> right. Work out a few cases on paper first:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Carried forward</th>
              <th>Months completed</th>
              <th>Taken</th>
              <th>Planned</th>
              <th>Expected result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12</td>
              <td>6</td>
              <td>5</td>
              <td>4</td>
              <td>Available 16, after leave 12</td>
            </tr>
            <tr>
              <td>35</td>
              <td>6</td>
              <td>0</td>
              <td>0</td>
              <td>Capped to 30, available 39, with a "capped" note</td>
            </tr>
            <tr>
              <td>0</td>
              <td>2</td>
              <td>1</td>
              <td>5</td>
              <td>Available 2, after leave minus 3, red warning</td>
            </tr>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>Everything zero, no error</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The first row is the boring normal case. The second checks the cap. The third checks the warning. The
        fourth checks that blank or zero inputs don't break anything. Also try typing nonsense, like letters in
        a number box, or 15 months. A good tool should refuse politely, not show "NaN" (which is the
        computer's way of saying "not a number").
      </p>
      <p>
        If you're in finance, you already do this instinctively when you check a colleague's Excel formula
        against a hand calculation. Same habit, new place.
      </p>

      <h3>Step 3: when it breaks, describe what you saw</h3>
      <p>
        Something will be off. Maybe the cap doesn't apply, or the red warning never shows. Don't start again,
        and don't try to edit the code yourself. Tell the AI exactly what you did, what you expected and what
        happened instead:
      </p>
      <blockquote>
        When I enter 35 carried forward, 6 months, 0 taken, 0 planned, it shows 44 available. It should cap the
        carry forward at 30 and show 39, with a note saying it was capped. Please fix only this and tell me
        what you changed.
      </blockquote>
      <p>
        Three habits make this work:
      </p>
      <ul>
        <li>
          <strong>Give the exact inputs.</strong> "It's wrong" gives the AI nothing to work with. "With these
          numbers I got this" gives it everything.
        </li>
        <li>
          <strong>Fix one thing at a time.</strong> Ask for five changes at once and you'll get three fixes and
          two new problems.
        </li>
        <li>
          <strong>Retest everything after each fix.</strong> Run all four rows of your table again. Fixes
          sometimes break something that used to work.
        </li>
      </ul>
      <p>
        If the page goes completely blank, say so: "The page is now blank after your last change." If you see a
        red error message anywhere, copy it and paste it in. You don't need to understand the error; the AI
        does.
      </p>

      <h3>Step 4: share it carefully</h3>
      <p>
        Once all your test cases pass, share it with one friendly colleague first, not the whole department
        WhatsApp group. Ask them to try their own numbers and tell you if anything looks odd. Add a line at the
        bottom of the tool saying it's an unofficial helper and HR's records are final. That one sentence will
        save you a lot of awkward conversations.
      </p>

      <h2>Which one should you pick?</h2>
      <p>Honestly, the differences matter less than starting. A rough guide:</p>
      <ul>
        <li>
          <strong>Your team is on Google Workspace and colleagues won't sign up for anything new:</strong>{" "}
          Gemini Canvas, keeping in mind that the link is public.
        </li>
        <li>
          <strong>You want the smoothest build-and-fix loop and your colleagues don't mind a free sign-up:</strong>{" "}
          Claude.
        </li>
        <li>
          <strong>You already pay for or live in ChatGPT:</strong> draft and test there, then decide where to
          share from.
        </li>
        <li>
          <strong>You've seen Opal recommended:</strong> that advice has expired.
        </li>
      </ul>
      <p>
        Try the same prompt in two of them. It takes ten minutes and you'll learn more from comparing the
        results than from any comparison article, including this one. If you're wondering whether any of this
        is worth paying for, see{" "}
        <Link to="/blog/ai-subscription-costs">which AI subscriptions are actually worth it</Link>.
      </p>

      <h2>Your next step, today</h2>
      <p>
        Pick one repetitive sum you do at work: leave balances, a reimbursement limit check, the cost of a
        meeting, an incentive slab. Write down the rule in three lines, work out two answers by hand, and paste
        a prompt like the one above into Claude, Gemini or ChatGPT. Test it against your hand answers. That's
        it. That's your first tool.
      </p>
      <p>
        If you'd like someone to walk you through it step by step, All The Coffee's free Chapter 1 has you build
        a working Meeting Cost Calculator in the browser in about 20 minutes, with no card and no coding
        background. You can <Link to="/signup">start it here</Link>.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://support.claude.com/en/articles/17153992-what-are-artifacts"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claude Help Center: What are artifacts?
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://support.claude.com/en/articles/9547008-publishing-remixing-and-sharing-artifacts"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claude Help Center: Publishing, remixing and sharing artifacts
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.anthropic.com/news/updates-to-our-consumer-terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anthropic: Updates to our consumer terms
            </a>{" "}
            (2025)
          </li>
          <li>
            <a
              href="https://support.google.com/gemini/answer/16047321"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gemini Apps Help: Create docs, apps and more with Canvas
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://support.google.com/gemini/answer/13594961"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gemini Apps Privacy Hub
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.businesstoday.in/technology/news/story/google-gemini-plans-are-changing-from-october-9-free-ai-plus-users-face-new-limits-on-ai-model-access-559434-2026-10-05"
              target="_blank"
              rel="noopener noreferrer"
            >
              Business Today: Google Gemini plans are changing from October 9
            </a>{" "}
            (5 October 2026)
          </li>
          <li>
            <a
              href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI Help Center: ChatGPT release notes
            </a>{" "}
            (entry dated 28 May 2026)
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
              href="https://blog.google/innovation-and-ai/models-and-research/google-labs/opal-expansion/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google: Expanding access to Opal, our no-code AI mini-app builder
            </a>{" "}
            (October 2025)
          </li>
          <li>
            <a
              href="https://blog.google/innovation-and-ai/models-and-research/google-labs/opal-expansion-160/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google: Opal is now available in more than 160 countries
            </a>{" "}
            (6 November 2025)
          </li>
          <li>
            <a
              href="https://techcrunch.com/2025/12/17/googles-vibe-coding-tool-opal-comes-to-gemini"
              target="_blank"
              rel="noopener noreferrer"
            >
              TechCrunch: Google's vibe-coding tool Opal comes to Gemini
            </a>{" "}
            (17 December 2025)
          </li>
          <li>
            <a href="https://developers.google.com/opal/faq" target="_blank" rel="noopener noreferrer">
              Google: Opal FAQ
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://blog.google/products-and-platforms/products/gemini/automate-tasks-with-skills/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google: Let skills in Gemini tackle your most repetitive tasks
            </a>{" "}
            (30 September 2026)
          </li>
          <li>
            <a
              href="https://ai.google.dev/gemini-api/docs/aistudio-build-mode"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google AI for Developers: Build apps in Google AI Studio
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://lovable.dev/pricing" target="_blank" rel="noopener noreferrer">
              Lovable: Pricing
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://bolt.new/pricing" target="_blank" rel="noopener noreferrer">
              Bolt: Pricing
            </a>{" "}
            (accessed October 2026)
          </li>
        </ul>
      </div>
    </>
  );
}
