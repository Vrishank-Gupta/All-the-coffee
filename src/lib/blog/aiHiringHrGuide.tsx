import { Link } from "react-router-dom";

export default function AiHiringHrGuide() {
  return (
    <>
      <p>
        In October 2018,{" "}
        <a href="https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G" target="_blank" rel="noopener noreferrer">
          Reuters reported
        </a>{" "}
        that Amazon had spent years building an experimental tool to rate job applicants' resumes from one to
        five stars, and had scrapped it. The system had taught itself that male candidates were preferable,
        because it learned from ten years of resumes submitted to the company, most of which came from men. It
        reportedly downgraded resumes that included the word "women's", as in "women's chess club captain".
      </p>
      <p>
        The AI wasn't malicious. It was just very good at finding the pattern that was actually there, which
        happened to be a pattern nobody wanted it to find. According to Reuters, recruiters looked at the tool's
        recommendations but never relied on them alone, and the team behind it was disbanded.
      </p>
      <p>
        That case became famous because it's such a clean example of the real risk with AI in hiring: these tools
        don't invent bias, they inherit it, usually from exactly the historical data you'd assume is safest to
        learn from. Eight years on, the tools are far more capable and far more common. The risk hasn't gone
        away. It has just moved into the products HR teams buy.
      </p>

      <h2>Where AI genuinely helps in hiring today</h2>
      <ul>
        <li>Summarising a long resume against a specific role's actual requirements, faster than a manual first pass</li>
        <li>Turning a hiring manager's rambling voice note into a clean, consistent job description</li>
        <li>Drafting well-written outreach and rejection messages to candidates at scale</li>
        <li>Scheduling logistics: finding interview slots across five panel members' calendars</li>
        <li>Building structured interview questions and scorecards, so every candidate is judged on the same things</li>
        <li>Flagging clear mismatches early, like a role requiring a specific certification the candidate doesn't list</li>
      </ul>
      <p>
        Notice the pattern. These are tasks where AI makes you faster and more consistent, and where a mistake is
        easy to spot and cheap to fix. A clumsy outreach draft gets edited. A wrongly rejected candidate never
        hears from you again.
      </p>

      <h2>Where it needs a human in the loop, every time</h2>
      <p>
        Any decision that filters a real person out of consideration should have a human actually look at the
        reasoning, not just a pass/fail score from a model. Resume-screening tools in particular can pick up on
        proxies for protected characteristics without anyone intending it, and often without it being obvious from
        the outside. A proxy is a detail that stands in for something else:
      </p>
      <ul>
        <li>A graduation year that implies age</li>
        <li>A name that implies gender, religion or community</li>
        <li>A career gap that often reflects maternity leave or caregiving</li>
        <li>A pin code, college or school that implies socioeconomic background</li>
        <li>A "preferred" list of past employers that quietly mirrors who you hired before</li>
      </ul>
      <p>
        A hypothetical example: your team trains a scoring tool on the profiles of your "top performers" from the
        last five years. If most of them came from three colleges in two cities, the tool will learn to love those
        three colleges in those two cities. It will look objective. It will be your old shortlist with a
        confidence score attached.
      </p>
      <p>
        This isn't only a theoretical worry for vendors, either. In the US, a federal court in{" "}
        <a href="https://www.mondaq.com/unitedstates/new-technology/1630454/federal-court-allows-collective-action-lawsuit-over-alleged-ai-hiring-bias" target="_blank" rel="noopener noreferrer">
          <em>Mobley v. Workday</em>
        </a>{" "}
        allowed an age discrimination case over AI-driven applicant screening to proceed as a nationwide collective
        action in May 2025. The claims are allegations and, as far as we could find, there's no final ruling yet.
        But the court accepted that the software vendor could potentially be treated as an agent of the employers
        using it,{" "}
        <a href="https://www.shrm.org/in/topics-tools/news/technology/workday-ai-lawsuit-wake-up-call-hr" target="_blank" rel="noopener noreferrer">
          which SHRM called a wake-up call for HR
        </a>
        . "The vendor's algorithm did it" is not a defence anyone should plan on.
      </p>

      <h2>How the rules are catching up</h2>
      <p>
        Several jurisdictions now treat AI in hiring as something that needs specific rules. Even if you only hire
        in India, these are worth knowing, because many of the tools you'll be pitched are built to comply with them,
        and global companies often apply the strictest standard everywhere.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Where</th>
              <th>What it requires</th>
              <th>Status (October 2026)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>New York City (Local Law 144)</td>
              <td>
                Employers using automated hiring tools need an independent bias audit within the past year, must
                publish a summary of it, and must notify candidates in advance
              </td>
              <td>Enforced since 5 July 2023</td>
            </tr>
            <tr>
              <td>European Union (AI Act)</td>
              <td>
                AI used to recruit, filter applications, evaluate candidates or make promotion and termination
                decisions is classed as "high-risk", with duties around data quality, human oversight and
                transparency
              </td>
              <td>High-risk duties for these systems now apply from 2 December 2027</td>
            </tr>
            <tr>
              <td>European Union (AI Act)</td>
              <td>Emotion recognition systems in the workplace are banned, apart from medical or safety uses</td>
              <td>Banned since 2 February 2025</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        A few notes on that table. New York City's rules come from the city's{" "}
        <a href="https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page" target="_blank" rel="noopener noreferrer">
          Department of Consumer and Worker Protection
        </a>
        , and a{" "}
        <a href="https://www.osc.ny.gov/state-agencies/audits/2025/12/02/enforcement-local-law-144-automated-employment-decision-tools" target="_blank" rel="noopener noreferrer">
          December 2025 audit by the New York State Comptroller
        </a>{" "}
        found its enforcement "ineffective", which tells you a law on paper isn't the same as a law in practice.
        The EU's employment category is listed in{" "}
        <a href="https://artificialintelligenceact.eu/annex/3/" target="_blank" rel="noopener noreferrer">
          Annex III of the AI Act
        </a>
        . Those high-risk duties were originally due in August 2026, but the EU's{" "}
        <a href="https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/" target="_blank" rel="noopener noreferrer">
          Digital Omnibus amendment
        </a>
        , in force since 27 July 2026, pushed them to December 2027. The workplace emotion recognition ban sits in{" "}
        <a href="https://artificialintelligenceact.eu/article/5/" target="_blank" rel="noopener noreferrer">
          Article 5
        </a>
        , so if a vendor offers to "read candidate confidence from facial expressions" in video interviews, that
        alone should end the conversation.
      </p>

      <h2>What about India?</h2>
      <p>
        India doesn't currently have a law specifically about AI in hiring, and we're not going to pretend
        otherwise. What it does have is the Digital Personal Data Protection Act, 2023, and candidate data is
        personal data. Resumes, phone numbers, salary expectations, interview notes, assessment scores: all of it.
      </p>
      <p>
        The Act's core obligations, such as giving clear notice, keeping data secure and erasing it once the purpose
        is served, are scheduled to apply from about May 2027 under the DPDP Rules, 2025. Lawyers are still
        debating exactly which legal basis covers recruitment. The Act has a "legitimate use" for employment
        purposes, but commentators like{" "}
        <a href="https://ksandk.com/data-protection-and-data-privacy/employee-background-verification-dpdp-act/" target="_blank" rel="noopener noreferrer">
          King Stubb &amp; Kasiva
        </a>{" "}
        note that applying it to candidates who haven't been hired yet is less straightforward. That's a question
        for your legal team, not your ATS vendor's sales deck.
      </p>
      <p>
        For the full timeline and what it means when you paste data into an AI tool, see{" "}
        <Link to="/blog/ai-data-privacy-india">Before You Paste Company Data Into ChatGPT, Read This</Link>.
        Practically, it means three things for HR today:
      </p>
      <ul>
        <li>Know which AI tools touch candidate data, including the "free trial" someone in the team signed up for</li>
        <li>Know where that data goes, and whether the vendor uses it to train its models</li>
        <li>Have a plan for deleting it once a hiring round closes, instead of keeping every resume forever "just in case"</li>
      </ul>
      <p>
        And please don't paste a candidate's resume into your personal ChatGPT account to "quickly summarise it".
        That's exactly the kind of habit that becomes a problem.
      </p>

      <h2>Questions worth asking any vendor pitching you an "AI-powered" hiring tool</h2>
      <ul>
        <li>What data was this model trained or fine-tuned on, and whose hiring decisions does that reflect?</li>
        <li>Has it been independently audited for bias across gender, age, and other protected characteristics, and can you see that audit?</li>
        <li>Does a human review every rejection, or only ones the system flags as borderline?</li>
        <li>Can a candidate ask for their application to be reviewed by a person, and is that process actually real?</li>
        <li>What happens to candidate data after the hiring process ends, and is any of it used to train your models?</li>
        <li>Where is candidate data stored and processed, and who are your subprocessors?</li>
        <li>Can the tool explain, in plain language, why it ranked one candidate above another?</li>
      </ul>
      <p>
        If a vendor can't answer these clearly, that's itself useful information. A tool that can't explain its own
        reasoning isn't one you can defend later if a hiring decision is ever questioned, and in HR, that day
        eventually comes for every process you run.
      </p>

      <h2>The practical middle ground</h2>
      <p>
        You don't need to avoid AI in hiring to avoid this risk. You need to use it for the parts that are
        genuinely mechanical, scheduling, summarising, drafting, and keep a real person making the actual
        judgment calls about who moves forward. That's not a compromise position. It's the approach that gets you
        the speed benefit without inheriting a decade-old bias problem you didn't know you were buying.
      </p>
      <p>A simple way to run it:</p>
      <ol>
        <li>Write down, before you open any tool, the three to five things that actually matter for the role.</li>
        <li>Let AI summarise each resume against those criteria, and only those.</li>
        <li>Have a person read the summary and the resume before anyone is rejected.</li>
        <li>Every quarter, check who got through at each stage. If one group keeps dropping out early, find out why.</li>
      </ol>
      <blockquote>
        The goal isn't a hiring process with no AI in it. It's a hiring process where you can explain, in plain
        language, exactly why any given candidate moved forward or didn't.
      </blockquote>

      <h2>Your next step</h2>
      <p>
        Pick one hiring task you do every week that's purely mechanical, like turning interview notes into a
        consistent feedback summary, and try AI on that first, using your company's approved tool with names
        removed. Then list every AI feature already switched on in your ATS or job portal and put the vendor
        questions above to whoever owns it.
      </p>
      <p>
        If you'd like to go a step further and build your own small helpers, like a candidate follow-up tracker, by
        describing them in plain English, that's what our course does. The <Link to="/signup">first module is free</Link>.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a href="https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G" target="_blank" rel="noopener noreferrer">
              Reuters: Amazon scraps secret AI recruiting tool that showed bias against women
            </a>{" "}
            (10 October 2018)
          </li>
          <li>
            <a href="https://www.mondaq.com/unitedstates/new-technology/1630454/federal-court-allows-collective-action-lawsuit-over-alleged-ai-hiring-bias" target="_blank" rel="noopener noreferrer">
              Holland &amp; Knight via Mondaq: Federal court allows collective action lawsuit over alleged AI hiring bias
            </a>{" "}
            (May 2025)
          </li>
          <li>
            <a href="https://www.shrm.org/in/topics-tools/news/technology/workday-ai-lawsuit-wake-up-call-hr" target="_blank" rel="noopener noreferrer">
              SHRM India: Workday AI lawsuit is a wake-up call for HR
            </a>{" "}
            (2025)
          </li>
          <li>
            <a href="https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page" target="_blank" rel="noopener noreferrer">
              NYC Department of Consumer and Worker Protection: Automated Employment Decision Tools
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://www.osc.ny.gov/state-agencies/audits/2025/12/02/enforcement-local-law-144-automated-employment-decision-tools" target="_blank" rel="noopener noreferrer">
              Office of the New York State Comptroller: Enforcement of Local Law 144
            </a>{" "}
            (2 December 2025)
          </li>
          <li>
            <a href="https://artificialintelligenceact.eu/annex/3/" target="_blank" rel="noopener noreferrer">
              EU AI Act: Annex III, high-risk AI systems
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://artificialintelligenceact.eu/article/5/" target="_blank" rel="noopener noreferrer">
              EU AI Act: Article 5, prohibited AI practices
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/" target="_blank" rel="noopener noreferrer">
              EU AI Act: Digital Omnibus on AI, Regulation (EU) 2026/1744
            </a>{" "}
            (in force 27 July 2026)
          </li>
          <li>
            <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014" target="_blank" rel="noopener noreferrer">
              PIB: Government notifies the DPDP Rules, 2025
            </a>{" "}
            (14 November 2025)
          </li>
          <li>
            <a href="https://ksandk.com/data-protection-and-data-privacy/employee-background-verification-dpdp-act/" target="_blank" rel="noopener noreferrer">
              King Stubb &amp; Kasiva: Employee background verification under the DPDP Act
            </a>{" "}
            (2026)
          </li>
        </ul>
      </div>
    </>
  );
}
