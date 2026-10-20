import { Link } from "react-router-dom";

export default function ResumeJdMatchChecker() {
  return (
    <>
      <p>
        It is 11:40 pm. You have just hit "Apply" on your fourteenth job this week on Naukri, and the confirmation
        screen gives you exactly nothing: no human, no timeline, just a green tick. Somewhere a friend has
        forwarded you a reel claiming that "75% of resumes are rejected by robots before a human ever sees them,"
        and now you are lying awake wondering if your resume is being quietly binned by software because you
        wrote "Excel" instead of "MS Excel."
      </p>
      <p>
        Take a breath. Recruiters really are using more AI in 2026, and that does change a few things about how
        you should apply. But a lot of the scary advice floating around is wrong, and the parts that are right
        are mostly about being clear and honest, not about gaming a machine. This guide covers both. Then we will
        build a small tool, in plain English, that checks your resume against a job description and tells you
        what you are missing.
      </p>
      <p>
        (If you are on the other side of the table, hiring rather than applying, our{" "}
        <Link to="/blog/ai-hiring-hr-guide">HR guide to AI in hiring</Link> covers that.)
      </p>

      <h2>Where Indian job seekers stand right now</h2>
      <p>
        You are not imagining that it feels harder. In{" "}
        <a
          href="https://www.peoplematters.in/news/recruiting-and-onboarding/applicants-per-job-double-in-india-intensifying-job-search-pressure-linkedin-47949"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn research on Indian professionals reported in January 2026
        </a>
        :
      </p>
      <ul>
        <li>84% said they feel unprepared to find a new job in 2026, while 72% said they were actively looking.</li>
        <li>76% said job hunting has become tougher.</li>
        <li>94% said they plan to use AI in their job search, and 66% said it boosts their interview confidence.</li>
        <li>LinkedIn said the number of applicants per open role in India has more than doubled since early 2022.</li>
      </ul>
      <p>
        So almost everyone is planning to use AI, almost everyone feels unprepared, and there are more people
        applying for each role. The answer is not to panic-apply to 50 jobs a night. It is to understand what
        actually happens to your application, and to send fewer, better ones.
      </p>

      <h2>What an ATS actually does (and doesn't)</h2>
      <p>
        An <strong>ATS</strong>, or applicant tracking system, is the software companies use to collect and
        manage job applications. Think of it less as a bouncer and more as a very large, very organised filing
        cabinet with a search bar. It typically does three things:
      </p>
      <ol>
        <li>
          <strong>Parses your resume.</strong> "Parsing" means the software reads your file and tries to pull
          out structured fields: name, phone, email, job titles, dates, education, skills.
        </li>
        <li>
          <strong>Stores and organises applicants.</strong> Every candidate for a role sits in one place, with
          their stage (applied, screened, interview, offer).
        </li>
        <li>
          <strong>Lets recruiters search, sort and filter.</strong> A recruiter can search for "SAP FICO" or
          filter by "willing to relocate to Pune," and some systems also show a match score.
        </li>
      </ol>
      <p>
        Parsing is the part that can quietly hurt you. Greenhouse, one widely used ATS, notes in its{" "}
        <a
          href="https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse"
          target="_blank"
          rel="noopener noreferrer"
        >
          own help documentation
        </a>{" "}
        that a parse can be partially successful, filling in some information but skipping others, and that it
        cannot parse resumes larger than 2.5MB (heavy images are a common cause). If your job titles land in the
        wrong field, a recruiter searching for "Finance Manager" may simply not find you.
      </p>

      <h3>About that "75% rejected by robots" statistic</h3>
      <p>
        This number has been repeated for over a decade, but nobody has been able to show the research behind
        it.{" "}
        <a
          href="https://blog.hiringthing.com/applicant-tracking-system-myths"
          target="_blank"
          rel="noopener noreferrer"
        >
          HiringThing, an ATS company, traced the claim
        </a>{" "}
        to Preptel, a job-services company that went out of business in 2013; an HR consultant who looked into
        it found no study behind the figure. (HiringThing sells ATS software, so it has a stake in the answer,
        but the bigger point is that the 75% figure has no published source.)
      </p>
      <p>
        A November 2025 study by the resume-tools company Enhancv,{" "}
        <a
          href="https://itbrief.co.uk/story/study-reveals-ats-rarely-auto-rejects-cvs-debunks-75-myth"
          target="_blank"
          rel="noopener noreferrer"
        >
          reported by IT Brief
        </a>
        , interviewed 25 US recruiters: 92% said their ATS does not automatically reject resumes based on
        formatting, missing keywords or low match scores. That is a small, US-only sample from a company with
        its own interests, so do not treat it as gospel either. But it lines up with how these systems are
        designed: software sorts and ranks, humans decide.
      </p>
      <p>
        The real exception is <strong>knockout questions</strong>: the yes/no questions in an application form,
        like "Do you have a valid CA qualification?" or "Can you join within 30 days?" Answer "no" to a must-have
        and you may be filtered out automatically. Those are set by the employer, and the honest fix is simple:
        read them carefully and answer truthfully.
      </p>

      <h2>How Naukri and LinkedIn are using AI in 2026</h2>
      <p>
        Both of India's big job platforms now run AI on both sides of the hiring table. Here is what they have
        officially announced:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>For recruiters</th>
              <th>For job seekers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Naukri</td>
              <td>
                AI-Rex, an "agentic" product (AI that carries out multi-step tasks) covering candidate sourcing,
                outreach and screening, live with 4,000+ enterprise customers and recruitment firms
              </td>
              <td>Neo (a jobseeker agent for career navigation and job matching), AI Resume Maker, AI Mock Interview Prep</td>
            </tr>
            <tr>
              <td>LinkedIn</td>
              <td>Hiring Assistant, an AI agent for recruiters, available globally in English since late 2025</td>
              <td>AI-powered job search where you describe the role you want in plain language</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The Naukri details come from{" "}
        <a
          href="https://nsearchives.nseindia.com/corporate/NAUKRI2_06072026090405_Stock_Exchange_Intimation-_Press_Release.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Info Edge's July 2026 press release filed with the stock exchanges
        </a>
        , which also says premium subscriptions for the job-seeker tools are contributing to revenue. In other
        words, some of these features are paid. Check what is free on your account before you subscribe to
        anything, and see{" "}
        <Link to="/blog/ai-subscription-costs">our guide to which AI subscriptions are worth paying for</Link>.
      </p>
      <p>
        On LinkedIn,{" "}
        <a
          href="https://news.linkedin.com/2025/hiring-assistant-globally-available"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hiring Assistant was announced as globally available in English by the end of September 2025
        </a>
        , and in January 2026{" "}
        <a
          href="https://www.socialsamosa.com/news-2/linkedin-ai-job-search-multiple-languages-10980875"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn said its AI-powered job search was rolling out globally
        </a>{" "}
        to members using English, Spanish, German, French and Portuguese, with over 1.3 million members using it
        daily.
      </p>
      <p>
        What this means for you: recruiters increasingly search for candidates by describing what they need, and
        AI matches on meaning as well as exact words. That actually rewards clear, specific, truthful resumes. It
        does not reward stuffing in every buzzword from the JD.
      </p>

      <h2>Make your resume parse cleanly</h2>
      <p>
        Most parsing problems come from design choices that look great to a human but scramble the text
        underneath. Parsers read the order of the text in the file, not the visual layout. University career
        centres give consistent advice here. Florida Gulf Coast University's career services, for example,{" "}
        <a
          href="https://careerservices.fgcu.edu/working-with-applicant-tracking-systems-ats/"
          target="_blank"
          rel="noopener noreferrer"
        >
          lists things to avoid
        </a>{" "}
        including tables, text boxes, logos, images, graphics, columns, headers and footers, and decorative
        fonts. The University of Georgia's career centre{" "}
        <a href="https://career.uga.edu/news/beating_the_robots" target="_blank" rel="noopener noreferrer">
          warns
        </a>{" "}
        that most systems cannot read headers and footers, and recommends traditional section headings.
      </p>
      <p>In practice, that gives you a checklist:</p>
      <ul>
        <li>
          <strong>One column.</strong> Those two-column Canva templates with a sidebar for skills are the most
          common culprit. Your skills may end up glued to your job titles, or lost.
        </li>
        <li>
          <strong>Contact details in the body, not the header.</strong> Name, email and phone at the top of the
          page as normal text.
        </li>
        <li>
          <strong>Standard headings.</strong> "Work Experience," "Education," "Skills," "Certifications." Not
          "My Journey" or "Where I've Made Magic."
        </li>
        <li>
          <strong>No tables or text boxes for important sections.</strong> Especially not for experience or
          skills.
        </li>
        <li>
          <strong>Simple bullets and a common font.</strong> Normal round bullets are fine; skip icons and
          skill-level star ratings.
        </li>
        <li>
          <strong>Consistent dates.</strong> "Apr 2021 to Mar 2024" in the same format everywhere, so the parser
          can work out how long you were in each role.
        </li>
        <li>
          <strong>Spell out acronyms once.</strong> "Accounts Payable (AP)" covers both ways a recruiter might
          search.
        </li>
      </ul>

      <h3>PDF or Word?</h3>
      <p>
        Advice genuinely differs. FGCU's guidance says PDFs keep your formatting intact, but Word (.docx) files
        are easiest for an ATS to read, and that you should use whatever format the posting asks for. Our
        practical rule: if the posting specifies a format, use it. If it doesn't, a simple, text-based PDF
        (exported from Word or Google Docs, not a scanned image) is usually fine. Test it with the copy-paste
        trick below.
      </p>

      <h3>The two-minute parse test</h3>
      <p>
        Open your resume PDF, select all (Ctrl+A), copy, and paste into a plain Notepad file. Read what comes
        out. If your text appears in a sensible order (name, contact, experience with titles next to their
        dates), a parser will probably cope. If it comes out jumbled, with the sidebar text wedged into the
        middle of your second job, a parser will likely struggle too.
      </p>

      <h2>Tailor to the job description, honestly</h2>
      <p>
        Tailoring means reshaping the same true facts about you so they match what this particular employer is
        asking for. It does not mean inventing new facts.
      </p>
      <p>Here is how to do it well:</p>
      <ol>
        <li>
          <strong>Use their words for things you actually do.</strong> If the JD says "vendor reconciliation"
          and your resume says "matched supplier statements," and that is the same work, use their phrase.
        </li>
        <li>
          <strong>Move the most relevant experience up.</strong> If the role is heavy on MIS reporting, put your
          reporting bullets first under each job.
        </li>
        <li>
          <strong>Add numbers where you have them.</strong> "Reduced month-end close from 7 days to 4" beats
          "improved efficiency." Only use numbers you can explain in an interview.
        </li>
        <li>
          <strong>Leave gaps as gaps.</strong> If the JD wants Power BI and you have never used it, do not add it
          to your skills. Either learn the basics first and say so honestly ("currently learning Power BI"), or
          accept that this one is a stretch.
        </li>
      </ol>
      <p>
        Why be so strict? Because faking it does not survive contact with the process. Recruiters read your
        experience to see whether it backs up the skills you list, interviewers ask "tell me
        about a time you used that," and many employers run background verification after an offer. A keyword
        that gets you shortlisted and then falls apart in a 30-minute interview has wasted everyone's time,
        including yours.
      </p>

      <h2>Use AI as your editor, not your ghostwriter</h2>
      <p>
        AI chatbots are genuinely good at resume work, as long as you keep them in the editor's chair. Good uses:
      </p>
      <ul>
        <li>"Here is a bullet point. Make it shorter and lead with the result. Do not add anything that isn't in my text."</li>
        <li>"Compare this resume to this JD and list the requirements I don't clearly address."</li>
        <li>"Point out any vague phrases where a recruiter would want a number."</li>
        <li>"Ask me five questions about this job that would help me write a stronger bullet point."</li>
      </ul>
      <p>Bad uses:</p>
      <ul>
        <li>"Write me a resume for a Senior Product Manager role." (It will happily invent a career for you.)</li>
        <li>Accepting a rewrite without checking every claim against what you actually did.</li>
        <li>
          Letting every bullet sound the same. Recruiters reading hundreds of applications quickly learn to spot
          "spearheaded cross-functional synergies" from a mile away.
        </li>
      </ul>
      <p>
        A useful habit: after AI edits a bullet, read it aloud and ask, "Could I defend this sentence for five
        minutes in an interview?" If not, change it back.
      </p>

      <h2>Before you paste: strip your personal details</h2>
      <p>
        Your resume is full of personal data: phone number, email, home address, sometimes date of birth,
        father's name, marital status, even a photo (habits from older Indian resume formats that are usually unnecessary). Before pasting it into any AI chatbot or online "resume scanner":
      </p>
      <ul>
        <li>Remove your phone number, email, home address and date of birth.</li>
        <li>Remove any ID numbers (PAN, Aadhaar, passport), which should never be on a resume anyway.</li>
        <li>
          Think twice about current salary and employer-confidential details, such as client names or internal
          revenue numbers.
        </li>
        <li>Check the tool's settings for whether your chats may be used to train its models, and turn that off if you can.</li>
      </ul>
      <p>
        For more on this, including what India's data protection law (the DPDP Act) means for you, see{" "}
        <Link to="/blog/ai-data-privacy-india">what is safe to paste into AI tools</Link>.
      </p>

      <h2>Build your own resume and JD match checker</h2>
      <p>
        Online "ATS score" checkers are everywhere, and many of them want your full resume, your email, and
        eventually your money. You can build a simple version yourself, by describing it in plain English to an
        AI chatbot like ChatGPT, Claude or Gemini. This approach is often called "vibe coding": you describe what
        you want, the AI writes the code, and you test it.
      </p>
      <p>
        The tool we are building is a single web page that runs entirely in your browser. You paste your resume
        text in one box and the job description in another, and it shows you which important words from the JD
        appear in your resume and which are missing. Because it runs on your own computer, the text you paste is
        not sent anywhere.
      </p>

      <h3>The prompt</h3>
      <p>Copy this into your AI chatbot of choice:</p>
      <blockquote>
        <p>
          Build me a single HTML file (with the CSS and JavaScript inside it) that I can open in my web browser.
          It is a resume and job description match checker. It must work completely offline: no external
          libraries, no internet calls, and nothing I paste should be sent or saved anywhere.
        </p>
        <p>
          The page has two large text boxes side by side (stacked on a phone screen): "Paste your resume text"
          and "Paste the job description." Below them is a "Compare" button.
        </p>
        <p>
          When I click Compare: take the job description, convert everything to lowercase, remove punctuation,
          and remove common English filler words (like the, and, with, for, you, our, will, team, role,
          responsibilities, experience, candidate, looking). Also detect useful two-word phrases from the JD,
          such as "financial reporting" or "stakeholder management." Count how often each word or phrase appears
          in the JD and keep the top 30 as "key terms."
        </p>
        <p>
          Then show three things: (1) a match percentage, meaning how many of the key terms appear somewhere in
          my resume; (2) a green list of "Matching terms" found in both; (3) a red list of "Missing terms" in the
          JD but not my resume, sorted by how often they appear in the JD. Show the JD count next to each term.
        </p>
        <p>
          Add a small text box where I can type my own extra words to ignore, separated by commas, and a
          "Clear" button. Treat simple variations as the same word (for example, "report," "reports" and
          "reporting"). Keep the design clean and readable, with large text. Add a one-line note at the bottom:
          "This is a rough keyword check, not how any real employer screens candidates."
        </p>
      </blockquote>
      <p>
        Save the code the AI gives you into a file called <em>match-checker.html</em> (in Notepad, choose "Save
        as type: All files" so it does not become match-checker.html.txt), then double-click it to open it in
        your browser. If something does not work, describe exactly what you see back to the AI: "When I click
        Compare nothing happens" is more useful than "it's broken."
      </p>

      <h3>How to test it</h3>
      <p>Before you trust it, try to catch it out. A tool is only as good as the tests you throw at it:</p>
      <ol>
        <li>
          <strong>The mirror test.</strong> Paste the same JD into both boxes. You should get close to 100%. If
          not, something is wrong with how it counts.
        </li>
        <li>
          <strong>The opposite test.</strong> Paste a chartered accountant's resume against a JD for a graphic
          designer. The score should be low, and the missing list should look like design words.
        </li>
        <li>
          <strong>The junk test.</strong> Look at the missing list. If it contains words like "ensure,"
          "ability," or "Bengaluru," add them to your ignore box. If the AI's filler-word list is too short, ask
          it to extend it.
        </li>
        <li>
          <strong>The synonym test.</strong> Write "MS Excel" in your resume and "Microsoft Excel" in the JD.
          Notice that a simple keyword tool may treat these as different. That is a real limit, not a bug you
          can fully fix.
        </li>
      </ol>

      <h3>How to use the results</h3>
      <p>
        Go through the missing terms one by one and sort them into three piles:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Pile</th>
              <th>Example</th>
              <th>What to do</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>I do this, but described it differently</td>
              <td>JD says "reconciliation," you wrote "matching statements"</td>
              <td>Use the JD's wording in your existing bullet</td>
            </tr>
            <tr>
              <td>I have this skill but left it out</td>
              <td>You use Tally daily but never listed it</td>
              <td>Add it, with a line showing where you used it</td>
            </tr>
            <tr>
              <td>I genuinely don't have this</td>
              <td>JD wants SQL; you've never written a query</td>
              <td>Leave it out. Prepare an honest answer for the interview, or start learning it</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>What this tool can't do</h3>
      <p>Be clear-eyed about its limits:</p>
      <ul>
        <li>
          <strong>It is not an ATS score.</strong> No real employer uses your homemade tool, and different
          systems weigh things differently. A 90% here guarantees nothing.
        </li>
        <li>
          <strong>It only sees words, not meaning.</strong> It cannot tell that "led a team of 8" demonstrates
          "people management." Modern recruiter tools increasingly match on meaning, so do not chase 100%.
        </li>
        <li>
          <strong>It can't judge quality.</strong> A resume that repeats every JD keyword in a block of text can
          score high and still read badly to the human who decides.
        </li>
        <li>
          <strong>Copy-paste quality matters.</strong> If your PDF pastes out jumbled, fix that first, using the
          parse test above.
        </li>
      </ul>
      <p>
        Used properly, it is a checklist that makes you look at the JD carefully, which is most of what good
        tailoring is.
      </p>
      <p>
        If you enjoyed building this and want to go further, it is a natural next project for what our course
        teaches. Chapter 1 of All The Coffee, which is free, has you build a working tool in your browser in
        about 20 minutes using the same describe-it-in-plain-English approach, and later chapters cover tools
        that clean messy data and put AI inside your own tool. You can{" "}
        <Link to="/overview">see the full chapter list here</Link>.
      </p>

      <h2>Your next step, today</h2>
      <ol>
        <li>Do the two-minute parse test on your current resume. Fix anything that comes out jumbled.</li>
        <li>Pick one job you genuinely want, not the fourteenth one you applied to at midnight.</li>
        <li>Make a copy of your resume with personal details removed.</li>
        <li>Build the match checker with the prompt above, run the four tests, then compare your resume to that JD.</li>
        <li>Sort the missing terms into the three piles, update only what is true, and apply.</li>
      </ol>
      <p>
        One carefully tailored application, honest and easy to read, will usually do more for you than a dozen
        rushed ones. The software sorts. A person still decides. Write for that person.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://www.peoplematters.in/news/recruiting-and-onboarding/applicants-per-job-double-in-india-intensifying-job-search-pressure-linkedin-47949"
              target="_blank"
              rel="noopener noreferrer"
            >
              People Matters: Applicants per job double in India, intensifying job search pressure (LinkedIn
              research)
            </a>{" "}
            (8 January 2026)
          </li>
          <li>
            <a
              href="https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse"
              target="_blank"
              rel="noopener noreferrer"
            >
              Greenhouse Support: Unsuccessful resume parse
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://blog.hiringthing.com/applicant-tracking-system-myths"
              target="_blank"
              rel="noopener noreferrer"
            >
              HiringThing: Applicant Tracking Systems Aren't Excluding Job Applicants, People Are
            </a>{" "}
            (10 January 2022)
          </li>
          <li>
            <a
              href="https://itbrief.co.uk/story/study-reveals-ats-rarely-auto-rejects-cvs-debunks-75-myth"
              target="_blank"
              rel="noopener noreferrer"
            >
              IT Brief: Study reveals ATS rarely auto-rejects CVs, debunks 75% myth
            </a>{" "}
            (19 November 2025)
          </li>
          <li>
            <a
              href="https://nsearchives.nseindia.com/corporate/NAUKRI2_06072026090405_Stock_Exchange_Intimation-_Press_Release.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Info Edge (India) Ltd: Naukri Scales AI-Powered Recruitment Solutions Across Enterprises and
              Jobseekers (NSE filing)
            </a>{" "}
            (6 July 2026)
          </li>
          <li>
            <a
              href="https://news.linkedin.com/2025/hiring-assistant-globally-available"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn News: Hiring Assistant, LinkedIn's first AI agent for recruiters, to launch globally in
              English
            </a>{" "}
            (3 September 2025)
          </li>
          <li>
            <a
              href="https://www.socialsamosa.com/news-2/linkedin-ai-job-search-multiple-languages-10980875"
              target="_blank"
              rel="noopener noreferrer"
            >
              Social Samosa: LinkedIn expands AI job search to multiple languages
            </a>{" "}
            (8 January 2026)
          </li>
          <li>
            <a
              href="https://careerservices.fgcu.edu/working-with-applicant-tracking-systems-ats/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Florida Gulf Coast University Career Services: Working with Applicant Tracking Systems (ATS)
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://career.uga.edu/news/beating_the_robots" target="_blank" rel="noopener noreferrer">
              University of Georgia Career Center: Beating the Robots, How to Get Your Resume Past Applicant
              Tracking Systems
            </a>{" "}
            (updated 2 April 2024)
          </li>
        </ul>
      </div>
    </>
  );
}
