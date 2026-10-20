import { Link } from "react-router-dom";

export default function AutomatedMyJobTellManager() {
  return (
    <>
      <p>
        It's 4:40 on a Tuesday. The report that used to eat your entire Monday is done, checked and sitting in
        the shared drive. A little AI-written macro did most of it while you were having chai. You feel two
        things at once: quietly proud, and slightly nervous. Because the obvious next question is, do you tell
        anyone?
      </p>
      <p>
        If you've been here, you're in good company. In April 2026, a post on Reddit's r/IndianWorkplace went
        viral for exactly this reason. According to{" "}
        <a
          href="https://www.hrkatha.com/automation/ai-sparks-workplace-debate/"
          target="_blank"
          rel="noopener noreferrer"
        >
          HR Katha's coverage
        </a>
        , an anonymous employee said they had used AI and VBA (the macro language built into Excel) to automate
        about 60% of their team's workload, a process that touched around 100 colleagues. They weren't sure
        whether to tell management, because they feared it would just mean more work with no recognition or
        promotion.
      </p>
      <p>
        The comments were, let's say, not optimistic about Indian managers.{" "}
        <a
          href="https://www.sify.com/ai-analytics/indians-using-ai-for-faster-better-work-but-psst-dont-tell-the-boss/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sify's write-up
        </a>{" "}
        quotes one reply as simply: "Do not reveal it. Keep it to yourself." Others said managers would take
        the credit and pile on more work, and some shared stories of efficiency being rewarded with a layoff.
      </p>
      <p>
        That advice is understandable. It's also, in most cases, the wrong call. Here's an honest look at both
        sides, and a way to tell your manager that protects you instead of exposing you.
      </p>

      <h2>You're not the only one keeping quiet</h2>
      <p>
        Hiding AI use at work is common enough that the big surveys track it. Microsoft and LinkedIn's{" "}
        <a
          href="https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part"
          target="_blank"
          rel="noopener noreferrer"
        >
          2024 Work Trend Index
        </a>
        , which surveyed 31,000 knowledge workers across 31 markets, found that:
      </p>
      <ul>
        <li>
          <strong>78% of AI users</strong> were bringing their own AI tools to work, rather than ones their
          company provided (Microsoft calls this "BYOAI").
        </li>
        <li>
          <strong>52% of people who use AI at work</strong> were reluctant to admit using it for their most
          important tasks.
        </li>
        <li>
          <strong>53%</strong> worried that using AI on important tasks made them look replaceable.
        </li>
      </ul>
      <p>
        Closer to home, Slack's Workforce Index survey of 1,029 Indian desk workers,{" "}
        <a
          href="https://www.tribuneindia.com/news/business/94-percent-of-indian-desk-workers-feel-urgency-to-master-ai-report"
          target="_blank"
          rel="noopener noreferrer"
        >
          reported by IANS in December 2024
        </a>
        , found about 21% felt uncomfortable admitting AI use to their managers, worried they'd be seen as
        inadequate, idle or dishonest.
      </p>
      <p>
        So the instinct to stay quiet isn't paranoia. It's a fairly normal reaction to a workplace that hasn't
        worked out its rules yet.
      </p>

      <h2>Why hiding feels sensible</h2>
      <p>The case for keeping it to yourself usually rests on three worries:</p>
      <ol>
        <li>
          <strong>"Faster just means more work."</strong> You saved eight hours a week. Your reward is eight
          more hours of someone else's backlog, at the same salary.
        </li>
        <li>
          <strong>"If a macro can do it, why do they need me?"</strong> In a year of restructuring headlines,
          showing that your job can be partly automated feels like volunteering for the next round.
        </li>
        <li>
          <strong>"I'm paid for output, not hours."</strong> If the report arrives on time and correct, how you
          made it is your business. Nobody asks how you use Excel shortcuts.
        </li>
      </ol>
      <p>
        The third one has a point. But it skips over a few things that can go badly wrong.
      </p>

      <h2>The real risks of staying quiet</h2>
      <p>
        Hiding isn't the safe option it looks like. It just moves the risk somewhere you can't see it.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Risk</th>
              <th>What it looks like in practice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Policy violation</td>
              <td>
                Your company bans unapproved AI tools, and you've been pasting client data into a personal
                ChatGPT account. That's a disciplinary issue, regardless of how good the output was.
              </td>
            </tr>
            <tr>
              <td>Data handling</td>
              <td>
                Salary sheets, customer phone numbers or vendor bank details went somewhere they shouldn't.
                Under India's data protection law the company answers for that, and it will want to know who
                did it.
              </td>
            </tr>
            <tr>
              <td>It breaks while you're on leave</td>
              <td>
                You're at a cousin's wedding in Jaipur. The source file's column order changes. The macro
                quietly produces wrong numbers, and nobody knows it exists, let alone how to fix it.
              </td>
            </tr>
            <tr>
              <td>Nobody else can run it</td>
              <td>
                You've made yourself a single point of failure. That isn't job security; it's the kind of
                thing auditors and new managers flag.
              </td>
            </tr>
            <tr>
              <td>You miss the credit</td>
              <td>
                Someone else eventually builds the same thing, presents it in a town hall, and gets the
                appreciation you could have had.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        If you haven't checked what's safe to paste into an AI tool, read{" "}
        <Link to="/blog/ai-data-privacy-india">our guide to AI and data privacy in India</Link> before anything
        else. And if your worry is more about using tools IT hasn't approved, we've covered that in{" "}
        <Link to="/blog/shadow-ai-your-team">shadow AI and your team</Link>. This post is about the other half:
        credit and career.
      </p>

      <h2>The career case for telling</h2>
      <p>
        Think about how appraisals actually work. Your manager has to write two lines about you in a form
        that goes to their boss. "Did their work well" is forgettable. "Automated the monthly reconciliation,
        saving the team roughly a day a week" is the kind of line that survives a calibration meeting.
      </p>
      <p>
        Automating part of your job is not proof that you're replaceable. It's proof that you can spot
        repetitive work and fix it, which is a rarer and more useful skill than doing the repetitive work
        itself. We go into this more in{" "}
        <Link to="/blog/skills-that-matter-ai-world">the skills that matter in an AI world</Link>.
      </p>
      <p>
        That said, telling your manager badly can backfire. "I made AI do my job" is a terrible opening.
        Here's a better one.
      </p>

      <h2>How to tell your manager, step by step</h2>

      <h3>1. Check the policy first</h3>
      <p>
        Before you say a word, find out what your company allows. Look for an AI or acceptable-use policy on
        the intranet, or ask IT a neutral question like "Which AI tools are we allowed to use with internal
        data?" If what you built breaks a rule, fix that first: move it to an approved tool, or remove the
        sensitive data. Walking in with a policy breach attached turns a win into a problem.
      </p>

      <h3>2. Lead with the business result, not the tool</h3>
      <p>
        Your manager cares about time, errors and risk. Translate your work into those. Not "I wrote a VBA
        macro with ChatGPT", but "the vendor reconciliation now takes two hours instead of a day, and the
        manual copy-paste errors are gone."
      </p>

      <h3>3. Offer to document and share it</h3>
      <p>
        Write a one-page note: what it does, where the files live, how to run it, what to check if the output
        looks off. Offer to show one teammate. This removes the "single point of failure" risk and makes you
        the person who improved the team, not just your own week.
      </p>

      <h3>4. Propose what you'll do with the freed time</h3>
      <p>
        This is the step most people skip, and it's the one that decides whether "you're faster" turns into
        "here's twice the work". If you don't suggest a use for the time, your manager will, and it'll be
        whatever is on fire that week. Pick something that's genuinely useful and visible: the analysis nobody
        has time for, automating a second process, or a project you've wanted to own.
      </p>

      <h3>5. Negotiate the terms, gently</h3>
      <p>A few fair asks you can put on the table:</p>
      <ul>
        <li>That the saving is recorded in your goals or appraisal notes, with numbers.</li>
        <li>
          That some of the freed time goes to higher-value work you choose, rather than simply absorbing more
          of the same.
        </li>
        <li>
          If it's rolled out to the wider team, that you lead or co-lead it, with your name on it.
        </li>
      </ul>
      <p>
        You can't guarantee any of these. But asking clearly, in writing, is far better than hoping someone
        remembers in March.
      </p>

      <h2>A short script you can adapt</h2>
      <p>Say it in a one-on-one, then follow up on email so there's a record.</p>
      <blockquote>
        <p>
          "I wanted to share something I've been working on. The monthly vendor reconciliation used to take me
          most of a day. I've built a small automation, using [approved tool], that brings it down to about two
          hours, and it catches the copy-paste errors we used to find later.
        </p>
        <p>
          I've written up how it works so it doesn't depend only on me, and I'm happy to walk [teammate]
          through it.
        </p>
        <p>
          With the time it frees up, I'd like to [take on the quarterly cost analysis / automate the
          collections follow-up next]. Could we add this to my goals for this cycle, so it's reflected in my
          review?"
        </p>
      </blockquote>
      <p>
        Notice what this does: it states a result, removes the risk, proposes a next step, and asks for
        credit. It doesn't apologise for using AI, and it doesn't oversell.
      </p>

      <h2>When keeping quiet for a bit is reasonable</h2>
      <p>
        To be fair to the Reddit commenters, not every workplace is safe for this. If your manager has a track
        record of taking credit, or the team is mid-layoffs, it can make sense to wait, or to share it first
        with a skip-level manager or a mentor who will champion it. What isn't reasonable is running something
        that breaks company policy or mishandles data and hoping nobody notices. Waiting for the right moment
        is fine. Hiding a risk is not.
      </p>

      <h2>Your next step today</h2>
      <p>
        Open a blank document and write three lines: what the task used to take, what it takes now, and what
        you'd do with the time saved. That's the core of your conversation, and it takes ten minutes.
      </p>
      <p>
        And if you haven't built your first tool yet but the Reddit story made you curious, Chapter 1 of our
        course has you build a working Meeting Cost Calculator in your browser in about 20 minutes, free, no
        coding background needed. You can <Link to="/signup">start here</Link>.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://www.hrkatha.com/automation/ai-sparks-workplace-debate/"
              target="_blank"
              rel="noopener noreferrer"
            >
              HR Katha: AI sparks workplace debate
            </a>{" "}
            (20 April 2026)
          </li>
          <li>
            <a
              href="https://www.sify.com/ai-analytics/indians-using-ai-for-faster-better-work-but-psst-dont-tell-the-boss/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sify: Indians Using AI For Faster, Better Work: But Psst.. Don't Tell The Boss
            </a>{" "}
            (May 2026)
          </li>
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
              href="https://www.tribuneindia.com/news/business/94-percent-of-indian-desk-workers-feel-urgency-to-master-ai-report"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Tribune (IANS): 94 pc of Indian desk workers feel urgency to master AI
            </a>{" "}
            (17 December 2024)
          </li>
        </ul>
      </div>
    </>
  );
}
