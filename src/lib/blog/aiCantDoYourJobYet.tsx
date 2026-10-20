import { Link } from "react-router-dom";

export default function AiCantDoYourJobYet() {
  return (
    <>
      <p>
        Ask an AI tool to clean a messy spreadsheet, and it'll often do a genuinely impressive job, fixing date
        formats, catching obvious duplicates, standardising inconsistent text. Ask it to clean a messy spreadsheet
        for your actual team's actual monthly report, the one with the one column that means something different
        depending on which region filled it in, and it'll confidently get something subtly wrong.
      </p>
      <p>
        That gap is worth understanding honestly, both because it tells you where AI genuinely helps today, and
        because it's good news about your own job security, not bad news.
      </p>

      <h2>First, an honest update: AI got a lot better at Excel</h2>
      <p>
        If you tried asking an AI for help with a spreadsheet in 2023 and gave up, the 2026 version is a
        different animal. A quick tour of what changed this year:
      </p>
      <ul>
        <li>
          <strong>Copilot in Excel can now edit your workbook directly.</strong> In April 2026 Microsoft announced
          that{" "}
          <a
            href="https://www.microsoft.com/en-us/microsoft-365/blog/2026/04/22/copilots-agentic-capabilities-in-word-excel-and-powerpoint-are-generally-available/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copilot's agentic capabilities in Word, Excel and PowerPoint were generally available
          </a>
          , meaning it doesn't just suggest a formula, it carries out multi-step changes in the file. Microsoft's{" "}
          <a
            href="https://support.microsoft.com/en-us/office/frequently-asked-questions-about-agent-mode-in-excel-1cfd906d-40b4-46be-8e2d-65b893e28a02"
            target="_blank"
            rel="noopener noreferrer"
          >
            Excel FAQ
          </a>{" "}
          describes three modes: edit (changes the workbook), plan (proposes steps first) and chat (just
          answers).
        </li>
        <li>
          <strong>Gemini in Google Sheets can build whole spreadsheets from a prompt.</strong> Google's{" "}
          <a
            href="https://workspaceupdates.googleblog.com/2026/04/build-and-edit-complex-spreadsheets-with-Gemini-in-Google-Sheets.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            April 2026 update
          </a>{" "}
          says it can create and refine models and budgets, including pivot tables and complex formulas (launched
          in the US in English first). In June it added{" "}
          <a
            href="https://workspaceupdates.googleblog.com/2026/06/troubleshoot-formula-errors-in-sheets.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            help with troubleshooting formula errors
          </a>
          , with a plain-language explanation and a corrected formula.
        </li>
        <li>
          <strong>Claude works inside Excel too.</strong> Anthropic's{" "}
          <a
            href="https://www.claude.com/docs/office-agents/excel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claude for Excel
          </a>{" "}
          add-in is generally available on its paid plans. It answers questions with clickable cell-level
          citations, traces errors to their root cause and builds pivot tables and conditional formatting.
        </li>
        <li>
          <strong>Or just upload the file.</strong> ChatGPT's{" "}
          <a
            href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt"
            target="_blank"
            rel="noopener noreferrer"
          >
            data analysis
          </a>{" "}
          feature reads .xlsx and .csv files and runs real calculations on them, as does Claude.
        </li>
      </ul>
      <p>
        So let's be fair to the headline. If "your Excel job" means typing VLOOKUPs, building a pivot table or
        fixing a #REF! error, AI can do a lot of that now, and often faster than you. (If you're weighing up
        whether a paid plan is worth it, our piece on{" "}
        <Link to="/blog/ai-subscription-costs">AI subscription costs</Link> helps.)
      </p>
      <p>
        But that was never really the job. The job is knowing whether the numbers are <em>right</em>, and what
        they mean for your business. That part is still yours, and the clearest evidence comes from the AI
        companies themselves.
      </p>

      <h2>Read the fine print the vendors wrote</h2>
      <p>
        The companies selling these tools are unusually direct about their limits. Microsoft's Copilot in Excel
        FAQ says the content "can be inaccurate or inappropriate" and tells you to "review, edit, and verify
        anything Copilot creates before you rely on it." It goes further: "Avoid using Copilot for decisions in
        sensitive areas such as finance, legal, or medical topics."
      </p>
      <p>
        Anthropic's documentation for Claude for Excel lists what it is <em>not</em> recommended for, including
        "final client deliverables without human review" and "audit-critical calculations without verification."
        It also warns about something most people haven't thought about: a spreadsheet from an outside source
        can contain hidden instructions aimed at the AI, so it advises using the tool only with trusted files.
      </p>
      <p>
        Google's own number is telling too. It reported that Gemini in Sheets achieved a 70.48% success rate on
        SpreadsheetBench, a research benchmark built from real-world spreadsheet questions. That's a strong result
        for a benchmark. It also means roughly three tasks in ten weren't completed correctly. And a benchmark,
        however realistic, isn't your month-end MIS sheet with eleven years of history in it.
      </p>
      <blockquote>
        When the people who built the tool tell you to check its work, that isn't modesty. That's the job
        description for the human in the loop.
      </blockquote>

      <h2>Where AI is genuinely strong now</h2>
      <ul>
        <li>Spotting obvious formatting inconsistencies: dates in three different formats, inconsistent capitalisation, extra spaces</li>
        <li>Finding exact or near-exact duplicate rows</li>
        <li>Writing a formula, explaining someone else's nested IF, or fixing a broken one</li>
        <li>Building a first version of a pivot table, chart or summary tab from a plain-English request</li>
        <li>Summarising what's in a dataset at a glance, especially when the data is reasonably clean</li>
        <li>Writing a script to do something repetitive and well-defined, once you describe it clearly</li>
      </ul>

      <h2>Where it still struggles</h2>
      <ul>
        <li>
          <strong>Messy, real-world data.</strong> One sheet says "Mumbai", another says "Bombay", a third says
          "MUM-West". Amounts are typed as 1,00,000 in one tab and 100000 in another. A date like 03/04/2026 can
          mean 3 April or 4 March depending on who typed it, and a tool may quietly assume the US style unless you tell
          it otherwise. AI can fix these, but only if it guesses the right rule, and it won't always ask.
        </li>
        <li>
          <strong>Undocumented context.</strong> Why does row 47 look like an outlier but isn't actually wrong?
          Usually because of some exception someone explained verbally three years ago and never wrote down
          anywhere. AI has no way to know that.
        </li>
        <li>
          <strong>Verifying long chains of numbers.</strong> Multi-step calculations across a large, real dataset,
          done reliably, without a silent error somewhere in the chain. Small mistakes compound, and nothing flags
          them for you unless you check.
        </li>
        <li>
          <strong>Knowing what "normal" looks like for your specific business</strong>, as opposed to what looks
          statistically unusual in general. A spike in March might be alarming for most companies and entirely
          expected for yours, because that's when the financial year closes and every distributor clears stock.
        </li>
        <li>
          <strong>Accountability.</strong> If a report goes out with a wrong number in it, "the AI did it" isn't
          an answer your manager, your auditor or your appraisal will accept. Someone has to have actually
          checked.
        </li>
      </ul>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>AI in 2026</th>
              <th>Who should own it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Write or fix a formula</td>
              <td>Very good</td>
              <td>AI, with a quick test on a few rows</td>
            </tr>
            <tr>
              <td>Clean formatting and duplicates</td>
              <td>Good</td>
              <td>AI, you spot-check</td>
            </tr>
            <tr>
              <td>Build a pivot or chart</td>
              <td>Good</td>
              <td>AI drafts, you confirm it answers the right question</td>
            </tr>
            <tr>
              <td>Decide which "duplicate" is real</td>
              <td>Unreliable</td>
              <td>You</td>
            </tr>
            <tr>
              <td>Explain why a number moved</td>
              <td>Plausible guesses</td>
              <td>You</td>
            </tr>
            <tr>
              <td>Sign off the final report</td>
              <td>Not its job</td>
              <td>You, always</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>How to check AI's spreadsheet work (without redoing it)</h2>
      <p>
        You don't need to recalculate everything by hand. You need a few habits that catch the expensive
        mistakes.
      </p>
      <ol>
        <li>
          <strong>Work on a copy.</strong> Anthropic suggests this explicitly before broad edits, and it's good
          advice for any tool.
        </li>
        <li>
          <strong>Make it state its assumptions before it touches anything.</strong> Use plan mode if your tool
          has one, or ask:
          <blockquote>
            Before changing anything, list each column, what you think it contains, and any assumptions you're
            making about formats, units or duplicates. Treat dates as DD/MM/YYYY. Don't edit the file yet.
          </blockquote>
        </li>
        <li>
          <strong>Ask for a change log.</strong>
          <blockquote>
            After cleaning, add a new tab listing every row you changed or removed, what it was before, and why.
          </blockquote>
        </li>
        <li>
          <strong>Reconcile one total you already trust.</strong> If last month's sales figure was ₹4.2 crore in
          the finance system, the cleaned sheet should say the same. If it doesn't, find out why before anything
          else.
        </li>
        <li>
          <strong>Spot-check five random rows.</strong> Not the first five. Random ones, including at least one
          from the region or team that always does things differently.
        </li>
      </ol>

      <h2>Why this is good news, not bad news</h2>
      <p>
        If AI could fully replace the judgement part of spreadsheet work, the part where you catch the thing that
        looks technically fine but is actually wrong given context only you have, that would genuinely threaten a
        lot of jobs built around exactly that judgement. It can't, not yet. What it can do is take the repetitive,
        mechanical parts off your plate, the parts that were never actually why you were valuable in the first
        place.
      </p>
      <blockquote>
        AI is very good at the parts of spreadsheet work that were always the boring parts. It's still bad at the
        parts that required actually understanding the business. That second part was always the real job.
      </blockquote>
      <p>
        The honest caveat: "not yet" is doing real work in that sentence, and the mechanical part of your job is
        shrinking. The people who'll be fine are the ones who move their time up, from typing formulas to
        checking, explaining and deciding. We wrote more about that shift in{" "}
        <Link to="/blog/skills-that-matter-ai-world">the skills that matter in an AI world</Link>. And before you
        upload a company file anywhere, read our piece on{" "}
        <Link to="/blog/shadow-ai-your-team">shadow AI</Link>, because a personal chatbot account is not where
        the payroll sheet should go.
      </p>

      <h2>A practical way to use this</h2>
      <p>
        This week, take one recurring spreadsheet task you do by hand, the monthly cleanup, the regional merge,
        the report you rebuild every Monday. Let AI handle the cleanup, the formatting, the obvious
        duplicate-finding and the first-pass summary. Keep the final sanity check for yourself, using the five
        habits above, and look specifically for anything that's technically consistent but contextually wrong.
      </p>
      <p>
        That division of labour is exactly what you build hands-on in Chapter 5 of our course: you make your own
        data cleaner for a genuinely messy spreadsheet, and learn to catch the kind of bug most people would miss
        entirely. <Link to="/signup">Start with the free Module A</Link> if you'd like to try it.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://www.microsoft.com/en-us/microsoft-365/blog/2026/04/22/copilots-agentic-capabilities-in-word-excel-and-powerpoint-are-generally-available/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft 365 Blog: Copilot's agentic capabilities in Word, Excel, and PowerPoint are generally
              available
            </a>{" "}
            (22 April 2026)
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/office/frequently-asked-questions-about-agent-mode-in-excel-1cfd906d-40b4-46be-8e2d-65b893e28a02"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Support: Frequently asked questions about Copilot in Excel
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://workspaceupdates.googleblog.com/2026/04/build-and-edit-complex-spreadsheets-with-Gemini-in-Google-Sheets.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Workspace Updates: Build and edit complex spreadsheets with Gemini in Google Sheets
            </a>{" "}
            (22 April 2026)
          </li>
          <li>
            <a
              href="https://workspaceupdates.googleblog.com/2026/06/troubleshoot-formula-errors-in-sheets.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Workspace Updates: Troubleshoot formula errors in Sheets
            </a>{" "}
            (June 2026)
          </li>
          <li>
            <a
              href="https://www.claude.com/docs/office-agents/excel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anthropic: Claude for Excel documentation
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI Help Center: Data analysis with ChatGPT
            </a>{" "}
            (accessed October 2026)
          </li>
        </ul>
      </div>
    </>
  );
}
