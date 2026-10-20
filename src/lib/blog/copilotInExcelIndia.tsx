import { Link } from "react-router-dom";

export default function CopilotInExcelIndia() {
  return (
    <>
      <p>
        It's 7:40 pm. Your manager wants the quarterly vendor summary "by tomorrow morning, nothing fancy." You
        have three exports, two of them with dates stored as text, and a VLOOKUP that keeps returning #N/A for
        reasons known only to Excel. Somewhere on the ribbon there's a little Copilot icon, and a question forms:
        would paying for that thing have saved you this evening?
      </p>
      <p>
        Maybe. This post covers what Copilot in Excel actually does, what it costs in India at the time of writing
        (October 2026), which plans include it, and when a free alternative is the smarter move. No sales pitch in
        either direction.
      </p>

      <h2>First, which "Copilot" are we talking about?</h2>
      <p>
        Microsoft uses the word Copilot for several different things, which is half the confusion. For Excel
        specifically, there are three ways people end up with it:
      </p>
      <ul>
        <li>
          <strong>Through your employer.</strong> Your company buys Microsoft 365 business licences and may add a
          paid Copilot licence on top.
        </li>
        <li>
          <strong>Through a personal subscription.</strong> Microsoft 365 Personal, Family or Premium, which you
          pay for yourself.
        </li>
        <li>
          <strong>Copilot Pro, the old way.</strong> This standalone add-on is gone.{" "}
          <a
            href="https://support.microsoft.com/en-us/microsoft-365-copilot/about-microsoft-copilot-pro"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft's support page says Copilot Pro is "no longer available for purchase"
          </a>
          , and existing subscribers could use it until support ended on August 1, 2026. Microsoft folded it into
          a new plan called{" "}
          <a
            href="https://www.microsoft.com/en-us/copilot/blog/2025/10/01/meet-microsoft-365-premium-your-ai-and-productivity-powerhouse/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft 365 Premium, announced in October 2025
          </a>
          . If a blog post or a colleague tells you to "just get Copilot Pro," that advice is out of date.
        </li>
      </ul>

      <h2>What it costs in India (October 2026)</h2>
      <p>
        These are the prices on Microsoft's own India pages at the time of writing. Prices change, and the
        business ones are listed "GST extra as applicable," so check before you budget.
      </p>

      <h3>Personal plans (you pay)</h3>
      <p>
        From{" "}
        <a
          href="https://www.microsoft.com/en-in/microsoft-365/buy/compare-all-microsoft-365-products"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft's India plan comparison page
        </a>
        :
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Monthly</th>
              <th>Yearly</th>
              <th>Copilot in Excel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Microsoft 365 Personal</td>
              <td>₹689</td>
              <td>₹6,899</td>
              <td>Yes, usage "higher than free"</td>
            </tr>
            <tr>
              <td>Microsoft 365 Family</td>
              <td>₹819</td>
              <td>₹8,199</td>
              <td>Yes, usage "higher than free," and only for the account holder</td>
            </tr>
            <tr>
              <td>Microsoft 365 Premium</td>
              <td>₹1,999</td>
              <td>₹19,999</td>
              <td>Yes, "extensive" usage</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Two things worth knowing. On Family, Copilot is for the account holder only, not everyone you share the
        plan with. And AI use on these plans is metered:{" "}
        <a
          href="https://support.microsoft.com/en-us/office/understanding-ai-credits-68530f1a-4459-4d02-9818-8233c1f673b8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft says limits and AI credit allotments depend on your plan
        </a>
        , so Personal and Family are not "unlimited Copilot." Premium gets the most room.
      </p>

      <h3>Business plans (usually your company pays)</h3>
      <p>
        From{" "}
        <a
          href="https://www.microsoft.com/en-in/microsoft-365-copilot/pricing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft's India Copilot business pricing page
        </a>
        , per user per month, GST extra:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Paid yearly</th>
              <th>Paid monthly</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Microsoft 365 Copilot Business (add-on to an existing business plan)</td>
              <td>₹1,745 list, promotional ₹1,495.73</td>
              <td>₹2,094</td>
            </tr>
            <tr>
              <td>Microsoft 365 Business Standard with Copilot</td>
              <td>₹1,955</td>
              <td>₹2,346</td>
            </tr>
            <tr>
              <td>Microsoft 365 Business Premium with Copilot</td>
              <td>₹2,660</td>
              <td>₹3,192</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        About that promotional add-on price: the page says it runs between July 1, 2026 and December 31, 2026, is
        only for existing Microsoft 365 customers with an eligible business plan, needs an annual commitment,
        applies to the first year only, and can be changed or cancelled by Microsoft. So it is a real discount,
        but not a reason to rush. For a 20-person team on the add-on, the gap between list and promo is about
        ₹60,000 over the year (20 × ₹249.27 × 12), which matters, but the bigger question is whether 20 people
        will actually use it.
      </p>

      <h3>What if your company has Microsoft 365 but no Copilot licence?</h3>
      <p>
        Then it depends.{" "}
        <a
          href="https://support.microsoft.com/en-us/microsoft-365-copilot/how-copilot-chat-works-with-and-without-a-microsoft-365-copilot-license"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft's own comparison
        </a>{" "}
        says access to Copilot inside the Office apps for unlicensed work users "depends on your label." Open the
        Microsoft Copilot app and look under your name: it will show something like "Copilot Chat (Basic)," "M365
        Copilot (Basic)" or "M365 Copilot (Premium)." Your IT team also controls what's switched on. If you're
        not sure, ask them before you buy anything yourself.
      </p>

      <h2>Agent Mode: the part that's actually new</h2>
      <p>
        Older Copilot in Excel mostly answered questions in a side panel. The newer version can make changes in
        your workbook for you: build the formulas, add the summary table, create the chart, then show you what
        it did. Microsoft calls this agentic Copilot (you'll also see "Agent Mode"). Plainly, "agentic" means it
        does a series of steps on its own instead of one reply at a time. Our{" "}
        <Link to="/blog/ai-agents-explained">explainer on AI agents</Link> covers the idea in more detail.
      </p>
      <p>
        On{" "}
        <a
          href="https://www.microsoft.com/en-us/copilot/blog/2026/04/22/copilots-agentic-capabilities-in-word-excel-and-powerpoint-are-generally-available/"
          target="_blank"
          rel="noopener noreferrer"
        >
          April 22, 2026, Microsoft announced
        </a>{" "}
        that these agentic features in Word, Excel and PowerPoint were generally available, as the default
        experience for Microsoft 365 Copilot and Microsoft 365 Premium subscribers, and "also available" to
        Personal and Family users.
      </p>
      <p>
        A small honesty note: Microsoft's own pages don't describe eligibility in exactly the same words. The{" "}
        <a
          href="https://support.microsoft.com/en-gb/office/frequently-asked-questions-about-agent-mode-in-excel-1cfd906d-40b4-46be-8e2d-65b893e28a02"
          target="_blank"
          rel="noopener noreferrer"
        >
          Agent Mode FAQ
        </a>{" "}
        lists Personal or Family "with an AI credits plan," Premium, a commercial Copilot subscription, or a
        "Copilot Chat-eligible" business subscription, while the India comparison page doesn't mention Agent Mode
        by name at all. The practical takeaway: Premium and a paid business Copilot licence are the clearest
        routes. On Personal or Family, try it on your own file before assuming you'll get heavy use out of it.
      </p>

      <h2>What Copilot in Excel is genuinely good at</h2>
      <p>
        Based on what{" "}
        <a
          href="https://support.microsoft.com/en-us/excel/copilot/frequently-asked-questions-about-copilot-in-excel"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft documents
        </a>{" "}
        and what these tools are broadly good at, here's where it earns its keep:
      </p>
      <ul>
        <li>
          <strong>Writing formulas you'd otherwise Google.</strong> "Add a column showing days overdue, but only
          for invoices with status Unpaid." You describe it, it writes the XLOOKUP or IF, and it works inside
          your actual sheet, with your actual column names.
        </li>
        <li>
          <strong>Explaining a formula someone else wrote.</strong> That 200-character nested IF your predecessor
          left behind? Ask what it does, in plain English. This alone is worth a lot during handovers.
        </li>
        <li>
          <strong>Summaries, PivotTables and charts.</strong> "Show total sales by region and month, and make a
          chart" is the kind of request it handles well, because the data and the ask are both clear.
        </li>
        <li>
          <strong>Basic cleanup.</strong> Microsoft's{" "}
          <a
            href="https://support.microsoft.com/en-US/Excel/copilot/clean-up-your-data-with-copilot-in-excel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Clean Data feature
          </a>{" "}
          flags inconsistent text ("Mumbai" vs "mumbai "), numbers stored as text, and extra spaces.
        </li>
        <li>
          <strong>Heavier analysis with Python.</strong>{" "}
          <a
            href="https://support.microsoft.com/en-au/office/copilot-in-excel-with-python-364e4ae9-9343-4d56-952a-5f62b0f70db6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copilot in Excel with Python
          </a>{" "}
          can run more advanced analysis (forecasts, correlations) on a separate sheet, leaving your source data
          untouched. You don't need to know Python, though it helps to have someone who can sanity-check it.
        </li>
      </ul>

      <h2>Where it struggles</h2>
      <p>
        Microsoft is unusually direct about this. Its FAQ says Copilot "can sometimes make mistakes,
        misinterpret information, or produce inaccurate results," and its Agent Mode FAQ goes further: "Avoid
        using Copilot for decisions in sensitive areas such as finance, legal, or medical topics." Even the April
        2026 launch post says Microsoft is still working on "quality and correctness," especially for "complex,
        high-stakes work like finance spreadsheets."
      </p>
      <p>That lines up with where people actually get stuck:</p>
      <ul>
        <li>
          <strong>Messy, inconsistent data.</strong> Merged header cells, three "Total" rows in the middle, a
          column that's half dates and half text. Clean Data, for instance, "works best with tabular data of up to
          100 columns and 50,000 rows" and with data formatted as an Excel table (Home, then Format as Table). Tidy
          first, then ask.
        </li>
        <li>
          <strong>Very large or very complex workbooks.</strong> Twenty linked sheets with external references is
          not where you want an AI making edits unsupervised.
        </li>
        <li>
          <strong>Confident wrong answers.</strong> A formula can run without errors and still be wrong, for
          example summing the wrong range. Always spot-check a few rows by hand.
        </li>
        <li>
          <strong>Your business logic.</strong> It doesn't know that your company counts a deal as "closed" only
          after the PO arrives. You have to tell it, every time.
        </li>
      </ul>
      <p>
        None of this makes it useless. It makes it an assistant, not an accountant. Our piece on{" "}
        <Link to="/blog/ai-cant-do-your-job-yet">why AI can't do your job yet</Link> goes into why the checking
        part stays with you.
      </p>

      <h2>The honest alternatives</h2>

      <h3>1. Free chat assistants for formula help</h3>
      <p>
        For "write me a formula that does X" or "why is this formula returning #N/A," the free tiers of general
        AI chat tools do a solid job. Describe your columns (or paste a few rows of dummy data), say what you want,
        copy the formula back into Excel. The trade-off is that they can't see or edit your workbook directly, so
        you do the copying and checking yourself. For a lot of people, that's fine. Our{" "}
        <Link to="/blog/ai-subscription-costs">guide to which AI subscriptions are worth paying for</Link> covers
        when the free tier stops being enough.
      </p>

      <h3>2. Build your own small tool for the task you repeat</h3>
      <p>
        If the pain is one specific, repeated job, like cleaning the same messy vendor export every Monday, a
        general assistant inside Excel may be overkill. A tiny tool that does exactly that one job, the same way
        every time, can be better. These days you can build that by describing it in plain English to an AI,
        without a coding background. That's what Chapter 5 of our course (part of the paid modules) does: you build a
        data cleaner for messy spreadsheets.
      </p>

      <h3>3. Learn just enough to stop being stuck</h3>
      <p>
        A lot of Excel pain is not about missing features. It's about not knowing what to ask for. Once you know
        that "I need to match these two lists on invoice number" is a lookup problem, every tool, paid or free,
        becomes more useful.
      </p>

      <h2>So, should you pay?</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Your situation</th>
              <th>Our suggestion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Your company already gives you a Copilot licence</td>
              <td>Use it for work files. Don't pay for a personal one too.</td>
            </tr>
            <tr>
              <td>Company has Microsoft 365 but no Copilot</td>
              <td>
                Check your label in the Copilot app and ask IT. If there's a real team need, make the case for a
                pilot with a few seats, not the whole floor.
              </td>
            </tr>
            <tr>
              <td>You spend hours a day in Excel on your own files (freelancer, consultant, small business owner)</td>
              <td>Premium is the clearest personal route. Try one month before committing to a year.</td>
            </tr>
            <tr>
              <td>You already pay for Personal or Family for Word and OneDrive</td>
              <td>Use the Copilot that's included and see if its limits bother you before upgrading.</td>
            </tr>
            <tr>
              <td>You mainly need formula help a few times a week</td>
              <td>Free chat tools are probably enough.</td>
            </tr>
            <tr>
              <td>Your pain is one repeated cleanup task</td>
              <td>Consider a small custom tool instead of a general assistant.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Company Copilot vs your personal account: mind the data</h2>
      <p>
        This is the part people skip. A personal Microsoft 365 subscription is a consumer product. Your company's
        salary sheet, client list or vendor GSTINs should not be going into a consumer AI tool just because you
        happen to pay for one. Work data belongs in work tools your employer has approved, which are set up with
        business-grade protections and admin controls. If your company hasn't approved anything, ask, and in the
        meantime use dummy or anonymised data for practice. Our{" "}
        <Link to="/blog/ai-data-privacy-india">guide to what's safe to paste into AI under India's DPDP law</Link>{" "}
        explains where the lines are, and{" "}
        <Link to="/blog/shadow-ai-your-team">this piece on shadow AI</Link> covers why quietly using personal AI
        tools for work causes problems later.
      </p>

      <h2>Your next step today</h2>
      <p>
        Pick one Excel task you did this week that took longer than it should have. Write it down in one plain
        sentence: "I needed to find which invoices in sheet A are missing from sheet B." Then try that sentence on
        whatever you already have, whether that's Copilot through work, an included personal plan, or a free chat
        tool, using a copy of the file with any sensitive details replaced. If it nails it, you've learned what
        to ask for. If it fumbles, you've learned what not to pay for.
      </p>
      <p>
        And if you want to see how far a plain-English description can take you, Chapter 1 of{" "}
        <Link to="/overview">our course</Link> has you build a working Meeting Cost Calculator in your browser in
        about 20 minutes. It's free, and no card is needed to <Link to="/signup">start</Link>.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://www.microsoft.com/en-in/microsoft-365/buy/compare-all-microsoft-365-products"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft India: Compare all Microsoft 365 plans
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.microsoft.com/en-in/microsoft-365-copilot/pricing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft India: Microsoft Copilot plans and pricing for business
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-365-copilot/about-microsoft-copilot-pro"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Support: About Microsoft Copilot Pro
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.microsoft.com/en-us/copilot/blog/2025/10/01/meet-microsoft-365-premium-your-ai-and-productivity-powerhouse/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Copilot Blog: Meet Microsoft 365 Premium
            </a>{" "}
            (October 1, 2025)
          </li>
          <li>
            <a
              href="https://www.microsoft.com/en-us/copilot/blog/2026/04/22/copilots-agentic-capabilities-in-word-excel-and-powerpoint-are-generally-available/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Copilot Blog: Copilot's agentic capabilities in Word, Excel, and PowerPoint are generally
              available
            </a>{" "}
            (April 22, 2026)
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-gb/office/frequently-asked-questions-about-agent-mode-in-excel-1cfd906d-40b4-46be-8e2d-65b893e28a02"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Support: Frequently asked questions about Agent Mode in Excel
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/excel/copilot/frequently-asked-questions-about-copilot-in-excel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Support: Frequently asked questions about Copilot in Excel
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/office/understanding-ai-credits-68530f1a-4459-4d02-9818-8233c1f673b8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Support: Understanding AI credits
            </a>{" "}
            (updated October 2026)
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-365-copilot/how-copilot-chat-works-with-and-without-a-microsoft-365-copilot-license"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Support: How Copilot Chat works with and without a Microsoft 365 Copilot license
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-US/Excel/copilot/clean-up-your-data-with-copilot-in-excel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Support: Clean up your data with Copilot in Excel
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-au/office/copilot-in-excel-with-python-364e4ae9-9343-4d56-952a-5f62b0f70db6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Support: Copilot in Excel with Python
            </a>{" "}
            (accessed October 2026)
          </li>
        </ul>
      </div>
    </>
  );
}
