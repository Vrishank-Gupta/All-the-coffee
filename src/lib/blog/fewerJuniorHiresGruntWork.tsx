import { Link } from "react-router-dom";

export default function FewerJuniorHiresGruntWork() {
  return (
    <>
      <p>
        Monday, 9:15am. The weekly sales MIS is due at 11. Last year, a trainee pulled it together: downloaded
        the CRM export, fixed the city names that were spelled four different ways, chased the two regional
        managers who never update their sheet, and sent you a draft. This year, the trainee position wasn't
        backfilled. So it's you, a cold cup of chai and a spreadsheet with 2,000 rows.
      </p>
      <p>
        If that sounds familiar, you're not imagining a trend. Hiring at the entry level has become patchier in
        a lot of places, and AI is often named as the reason. The real picture is more mixed than the
        headlines. But whatever the cause, one practical question lands on your desk: if there are fewer
        juniors, who does the grunt work now?
      </p>

      <h2>What the data actually says</h2>
      <p>
        Let's start with what's measured, not what's predicted.
      </p>

      <h3>Indian IT: fewer freshers than before, but still hiring</h3>
      <p>
        India's large IT services firms have historically been the biggest single employer of freshers, so
        their numbers matter. In FY26 (April 2025 to March 2026), the five largest firms (TCS, Infosys,
        HCLTech, Wipro and Tech Mahindra){" "}
        <a
          href="https://ianslive.in/top-it-firms-hiring-turns-negative-as-headcount-falls-over-7000-in-fy26--20260425104000"
          target="_blank"
          rel="noopener noreferrer"
        >
          saw combined headcount fall by 7,389, compared with a net addition of 12,718 in FY25
        </a>
        , according to IANS. The biggest single factor was a workforce reduction of around 12,000 at TCS. The
        same report says TCS plans to hire around 25,000 freshers in FY27, down from the 40,000–42,000 range of
        earlier years, while Infosys is expected to hire around 20,000.
      </p>
      <p>
        Things have steadied since. TCS{" "}
        <a
          href="https://www.businesstoday.in/markets/stocks/story/tcs-adds-4258-employees-in-q2-marks-third-quarter-of-headcount-addition-560460-2026-10-08"
          target="_blank"
          rel="noopener noreferrer"
        >
          added 4,258 people in the July–September 2026 quarter
        </a>
        , its third straight quarter of net additions, taking headcount to 598,056. So: fewer fresher seats
        than the boom years, but not a shutdown.
      </p>

      <h3>The wider Indian job market: not uniformly down</h3>
      <p>
        Outside IT, the picture is different. Naukri's JobSpeak index for January 2026{" "}
        <a
          href="https://www.naukri.com/blog/naukri-jobspeak-white-collar-hiring-opens-2026-with-3-yoy-growth-driven-by-non-it-sectors-and-fresher-hiring/"
          target="_blank"
          rel="noopener noreferrer"
        >
          showed white-collar hiring up 3% year on year and overall fresher hiring up 8%
        </a>
        , with BPO/ITES fresher hiring up 39% while IT was flat. That's one month and one job portal, so don't
        read too much into it. But it's a useful corrective to the idea that freshers everywhere are being
        replaced.
      </p>
      <p>
        The government's own view is cautious. The{" "}
        <a
          href="https://www.storyboard18.com/how-it-works/ai-has-yet-to-trigger-mass-job-losses-says-economic-survey-2025-26-88478.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Economic Survey 2025-26, tabled in January 2026
        </a>
        , said AI has not yet triggered mass job losses and is more likely to complement workers in the near
        term, while warning that "the absence of immediate disruption should not be mistaken for long-term
        safety."
      </p>

      <h3>Globally: a real signal for young workers in exposed jobs</h3>
      <p>
        The most cited study here is "Canaries in the Coal Mine" by Erik Brynjolfsson, Bharat Chandar and Ruyu
        Chen at Stanford's Digital Economy Lab, using US payroll data from ADP (a large payroll company). In its{" "}
        <a
          href="https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/"
          target="_blank"
          rel="noopener noreferrer"
        >
          August 2026 revision
        </a>
        , it finds that employment for 22–25 year olds in the most AI-exposed occupations is 19% below where it
        would be if it had kept pace with less exposed peers. Experienced workers show no comparable gap. The
        gap comes mostly from fewer young people being hired, not more being let go, and it's concentrated in
        jobs where AI substitutes for tasks rather than helping people do them.
      </p>
      <p>
        The authors are careful: they describe these as early, descriptive signals rather than proof that AI
        caused the change, note that some of the diverging trends started before ChatGPT, and say the gap
        shrinks when you control for education.
      </p>
      <p>
        In the US more broadly, the New York Fed reports that unemployment for recent college graduates (aged
        22–27){" "}
        <a
          href="https://www.newyorkfed.org/research/college-labor-market"
          target="_blank"
          rel="noopener noreferrer"
        >
          stayed elevated at about 5.6% in the second quarter of 2026
        </a>
        .
      </p>

      <h2>So is AI the cause? Honestly, it's disputed</h2>
      <p>
        Here are the two sides, laid out fairly.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>The case that AI is a real factor</th>
              <th>The case that other things matter more</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Stanford study finds a widening gap for young workers specifically in AI-exposed jobs, and it holds up after excluding tech firms.</td>
              <td>The Yale Budget Lab found the broader US labour market showed "stability, not major disruption" since ChatGPT launched.</td>
            </tr>
            <tr>
              <td>Indian IT firms themselves cite "evolving AI-led business models" alongside demand uncertainty when explaining caution.</td>
              <td>The same IT firms also point to an uncertain demand environment, and in the US, economists point to pandemic-era over-hiring and higher interest rates.</td>
            </tr>
            <tr>
              <td>The tasks most easily handed to AI (first drafts, summaries, basic data work) overlap heavily with traditional junior work.</td>
              <td>Fresher hiring in several non-IT Indian sectors was growing in early 2026.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        On the right-hand column, Yale Budget Lab's Martha Gimbel{" "}
        <a
          href="https://fortune.com/2026/02/02/ai-labor-market-yale-budget-lab-ai-washing/"
          target="_blank"
          rel="noopener noreferrer"
        >
          told Fortune in February 2026
        </a>{" "}
        that AI can be a "convenient scapegoat" for companies cutting for other reasons, such as past
        over-hiring, interest rates or policy uncertainty.
      </p>
      <p>
        The fair summary: there's a real, measurable softening for young workers in some AI-exposed roles,
        especially in the US data, and in Indian IT fresher intake. How much of that is AI versus the economy
        is genuinely unsettled. Anyone who tells you it's definitely one or the other is guessing.
      </p>

      <h2>The work didn't go anywhere</h2>
      <p>
        Here's the part that matters for your Monday. Whatever the reason for fewer junior hires, the work they
        did still exists:
      </p>
      <ul>
        <li>The weekly report that needs data pulled from four sheets.</li>
        <li>The vendor list with duplicate entries and half-filled GST numbers.</li>
        <li>Follow-ups: the reminder to the client, the nudge to the colleague, the "any update?" message.</li>
        <li>First drafts: the meeting summary, the policy note, the response to a standard customer query.</li>
        <li>Formatting, checking, filing, tagging: the small stuff that makes the big stuff usable.</li>
      </ul>
      <p>
        In most teams, when a junior seat isn't filled, that work gets handled in one of three ways.
      </p>
      <ol>
        <li>
          <strong>It quietly moves up.</strong> Senior people absorb it, usually after hours. This is the
          most common outcome and the worst one, because now your most experienced (and expensive) people are
          fixing city names in Excel.
        </li>
        <li>
          <strong>It quietly stops.</strong> The report goes fortnightly. The follow-ups slip. Nobody decided
          this; it just happened.
        </li>
        <li>
          <strong>It gets deliberately redesigned.</strong> Someone looks at the task, decides which parts a
          small tool or AI can do reliably, which parts need a human check, and sets it up properly.
        </li>
      </ol>
      <p>
        Only the third one is a plan. The first two are what happens when nobody makes a plan.
      </p>

      <h2>Why cutting juniors can hollow out the pipeline</h2>
      <p>
        There's a longer-term cost that's easy to miss. Junior work was never only about getting the work done.
        It was also how people learned.
      </p>
      <p>
        The trainee who spent a year cleaning sales data learned which regions always report late, which
        product codes are messy, and what a "normal" month looks like. That's how they eventually became the
        person who could look at a dashboard and say, "That number's wrong." Judgement grows out of thousands
        of small, boring repetitions.
      </p>
      <p>
        If a team stops hiring juniors entirely, in five years there's nobody ready to become the next team
        lead. You end up hiring mid-level people from outside, at higher cost, who don't know your business.
        Notice that the Stanford study found the gap for experienced workers is not there: AI seems to help
        people who already have judgement. The question is where the next batch of experienced people comes
        from.
      </p>
      <p>
        None of this means every team must hire more freshers. It means that if you do have juniors, the job
        should be redesigned around learning judgement faster, not just doing chores.
      </p>

      <h2>What you can do: if you manage a team</h2>
      <ul>
        <li>
          <strong>List the recurring grunt work.</strong> Sit down for 30 minutes and write every repetitive
          task the team does weekly or monthly. You'll probably find 10 to 15.
        </li>
        <li>
          <strong>Sort each one.</strong> Which can be automated reliably (merging sheets, cleaning formats)?
          Which can be drafted by AI but need a human check (summaries, first replies)? Which need a person
          start to finish (anything involving a sensitive conversation or a judgement call)?
        </li>
        <li>
          <strong>Automate on purpose, not by accident.</strong> Pick the most painful item and fix it
          properly, with a clear owner and a check step. One well-built process beats ten half-trusted ones.
        </li>
        <li>
          <strong>Put the saved time into teaching.</strong> If you have a junior, the hours freed from
          copy-paste should go into reviewing their work with them, explaining why a number looks off, and
          letting them sit in on client calls. That's how you compress years of learning.
        </li>
        <li>
          <strong>Make the check step their job.</strong> Instead of "do the report," try "review what the
          tool produced and tell me what's wrong." Spotting errors is the skill you actually want them to
          build.
        </li>
        <li>
          <strong>Set ground rules on data.</strong> Make sure people know what can and can't go into an AI
          tool. Our posts on <Link to="/blog/ai-data-privacy-india">AI and data privacy in India</Link> and{" "}
          <Link to="/blog/shadow-ai-your-team">shadow AI on your team</Link> cover this.
        </li>
      </ul>

      <h2>What you can do: if you're an individual contributor</h2>
      <ul>
        <li>
          <strong>Don't silently absorb the extra work.</strong> If the junior role went and the work landed on
          you, say so, with specifics: "The weekly MIS now takes me 3 hours. I'd like to spend a week
          automating most of it."
        </li>
        <li>
          <strong>Fix one boring task yourself.</strong> Merging a dozen regional sheets into one, cleaning a
          messy export, or a tracker that reminds you who's due a follow-up are all things a non-technical
          person can now build by describing them to an AI in plain English.
        </li>
        <li>
          <strong>Keep the judgement part.</strong> The parts of your job that need context ("this client always
          pays late in March," "that number can't be right") are what make you valuable. Automate around them,
          not through them. We wrote more about this in{" "}
          <Link to="/blog/skills-that-matter-ai-world">the skills that matter in an AI world</Link>.
        </li>
        <li>
          <strong>If you're early in your career,</strong> treat AI as a way to get through the chores faster
          so you can ask more "why" questions. The person who understands why the report looks the way it does
          will be fine. The person who only knows which buttons to press is the one at risk.
        </li>
      </ul>

      <h2>A calmer way to think about it</h2>
      <p>
        Fewer junior hires in some places is real. The cause is debated. What isn't debated is that the weekly
        report still needs to go out on Monday, and someone has to make sure the numbers in it are right.
      </p>
      <p>
        Teams that do well here won't be the ones that pretend AI changes nothing, or the ones that cut every
        junior role and hope for the best. They'll be the ones that look at the boring work honestly, automate
        the parts that can be automated, and use the time they get back to teach people judgement.
      </p>
      <p>
        <strong>Your next step today:</strong> write down the three most repetitive tasks you or your team did
        last week, and roughly how long each took. Pick one to fix this month. If you'd like to try building
        the fix yourself, our course starts with a free Chapter 1 where you build a small working tool in the
        browser in about 20 minutes, no coding background needed. Later chapters cover a data cleaner for messy
        spreadsheets and a script that merges 12 sales sheets into one. You can{" "}
        <Link to="/overview">see the full chapter list</Link> or{" "}
        <Link to="/signup">start the free module</Link>.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://ianslive.in/top-it-firms-hiring-turns-negative-as-headcount-falls-over-7000-in-fy26--20260425104000"
              target="_blank"
              rel="noopener noreferrer"
            >
              IANS: Top IT firms' hiring turns negative as headcount falls over 7,000 in FY26
            </a>{" "}
            (25 April 2026)
          </li>
          <li>
            <a
              href="https://www.businesstoday.in/markets/stocks/story/tcs-adds-4258-employees-in-q2-marks-third-quarter-of-headcount-addition-560460-2026-10-08"
              target="_blank"
              rel="noopener noreferrer"
            >
              Business Today: TCS adds 4,258 employees in Q2, marks third quarter of headcount addition
            </a>{" "}
            (8 October 2026)
          </li>
          <li>
            <a
              href="https://www.naukri.com/blog/naukri-jobspeak-white-collar-hiring-opens-2026-with-3-yoy-growth-driven-by-non-it-sectors-and-fresher-hiring/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Naukri: JobSpeak, white-collar hiring opens 2026 with 3% YoY growth, driven by non-IT sectors and fresher hiring
            </a>{" "}
            (January 2026 data)
          </li>
          <li>
            <a
              href="https://www.storyboard18.com/how-it-works/ai-has-yet-to-trigger-mass-job-losses-says-economic-survey-2025-26-88478.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Storyboard18: AI has yet to trigger mass job losses, says Economic Survey 2025-26
            </a>{" "}
            (29 January 2026)
          </li>
          <li>
            <a
              href="https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stanford Digital Economy Lab: Canaries in the Coal Mine? Six facts about the recent employment effects of AI
            </a>{" "}
            (revised 12 August 2026)
          </li>
          <li>
            <a
              href="https://www.newyorkfed.org/research/college-labor-market"
              target="_blank"
              rel="noopener noreferrer"
            >
              Federal Reserve Bank of New York: The Labor Market for Recent College Graduates
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://fortune.com/2026/02/02/ai-labor-market-yale-budget-lab-ai-washing/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fortune: Yale Budget Lab finds no major AI labour disruption, flags "AI washing"
            </a>{" "}
            (2 February 2026)
          </li>
        </ul>
      </div>
    </>
  );
}
