import { Link } from "react-router-dom";

export default function DpdpEmployeeDataHr() {
  return (
    <>
      <p>
        It's appraisal season. Someone in the team needs last year's ratings, so a file called
        "Final_Increments_v7_USE THIS ONE.xlsx" gets forwarded on email, then dropped into a WhatsApp group
        "for quick reference", then uploaded to a shared drive folder that half the floor can open. Nobody
        meant any harm. Everyone was just trying to get the work done.
      </p>
      <p>
        That's how employee data actually lives in most Indian offices: in Excel sheets, Google Forms
        responses, joining kits scanned to email, and, more and more, pasted into AI tools to "just clean
        this up quickly". India's Digital Personal Data Protection Act, 2023 (the DPDP Act) is now being
        switched on in phases, and HR teams hold more personal data than almost anyone else in a company.
        Here's what the dates are, what the employment provision does and doesn't cover, and a calm clean-up
        list you can start this month.
      </p>
      <p>
        <em>
          This is general information, not legal advice. Your company's legal or compliance team has the final
          word on how the law applies to you.
        </em>
      </p>

      <h2>The dates, in one table</h2>
      <p>
        The government notified the DPDP Rules, 2025 in November 2025 (the gazette notification is dated 13
        November; the government's press release came on 14 November). A separate notification set out which
        parts of the Act start when. The short version: the law exists, the enforcement body exists, but most
        of the day-to-day duties for companies start in May 2027.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>When</th>
              <th>What starts</th>
              <th>What it means for HR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>13 November 2025 (already in force)</td>
              <td>Definitions, the Data Protection Board of India (the body that will hear complaints and impose penalties), its procedures and appeals</td>
              <td>The referee is on the field. Your day-to-day duties haven't started yet.</td>
            </tr>
            <tr>
              <td>13 November 2026 (about three weeks away)</td>
              <td>Registration and obligations of consent managers (companies that will offer a platform for people to give and withdraw consent)</td>
              <td>Very little directly. This is mostly about a new kind of service provider.</td>
            </tr>
            <tr>
              <td>13 May 2027</td>
              <td>The core duties: notice and consent, legitimate uses (including employment), security safeguards, breach notification, retention and erasure, people's rights</td>
              <td>This is the date your spreadsheets, shared folders and processes need to be ready for.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Two things worth knowing. First, until the core duties start, the older rules under the IT Act on
        "sensitive personal data" (things like passwords, bank details and medical records) still apply, so
        this isn't a free-for-all period. Second, in January 2026 Business Standard and several law firms
        reported that MeitY was considering cutting the 18-month window to 12 months, at least for some
        obligations of large "significant" data fiduciaries. As of writing, we couldn't find any official
        notification changing the dates, so treat it as a report, not a rule, and ask your compliance team
        to watch for updates.
      </p>

      <h2>The employment provision: what it does</h2>
      <p>
        Under the Act, your company is a <strong>data fiduciary</strong>: the organisation that decides why and
        how personal data is used. Your employees are <strong>data principals</strong>: the people the data is
        about. Normally, a fiduciary needs consent to use someone's personal data. Section 7 lists a few
        "legitimate uses" where consent isn't needed, and Section 7(i) covers employment. It allows processing:
      </p>
      <blockquote>
        "for the purposes of employment or those related to safeguarding the employer from loss or liability,
        such as prevention of corporate espionage, maintenance of confidentiality of trade secrets,
        intellectual property, classified information or provision of any service or benefit sought by a Data
        Principal who is an employee."
      </blockquote>
      <p>
        In plain terms: you don't need to collect a separate "I agree" from every employee to run payroll,
        manage attendance, process reimbursements, run appraisals or enrol them in the health insurance they
        asked for. That's a real relief for HR.
      </p>

      <h2>What it doesn't do</h2>
      <p>
        Section 7(i) is a reason you're allowed to use the data. It is not an exemption from the rest of the
        law. Lawyers who have written about it flag a few clear limits:
      </p>
      <ul>
        <li>
          <strong>It's tied to employment purposes.</strong> Using employee phone numbers for a marketing
          campaign, or sharing the staff list with a vendor who wants to sell them loans, is not "purposes of
          employment".
        </li>
        <li>
          <strong>Ex-employees are a grey area.</strong> Commentators point out that once someone has left,
          it's harder to argue you're still processing their data "for the purposes of employment". Keeping
          what another law requires (tax, PF, statutory registers) is one thing. Keeping everything forever is
          another.
        </li>
        <li>
          <strong>Candidates are unclear.</strong> The Act doesn't say whether shortlisting, interviews and
          background checks count as "purposes of employment". Many companies are planning to take consent
          from candidates to be safe. Check what your legal team decides. (We covered AI in hiring separately
          in <Link to="/blog/ai-hiring-hr-guide">this HR guide</Link>.)
        </li>
        <li>
          <strong>Contractors and interns may not fit neatly.</strong> The clause says "employee". Whether it
          stretches to consultants, agency staff or secondees is not settled.
        </li>
      </ul>

      <h2>The duties that still apply to HR</h2>
      <p>
        Section 8 sets out duties for every data fiduciary, whatever the reason for processing. From May 2027,
        these are the ones that land on HR desks:
      </p>
      <ul>
        <li>
          <strong>Security safeguards.</strong> You must take "reasonable security safeguards" to prevent a
          personal data breach, including when a vendor (a <strong>data processor</strong>, like a payroll
          provider) handles the data for you. The Rules spell this out: access controls, encryption or masking
          where suitable, logs of who accessed what, backups, and contracts that bind vendors to the same
          standards. Logs and related records must generally be kept for at least one year.
        </li>
        <li>
          <strong>Breach notification.</strong> If personal data is exposed, the company must inform the Data
          Protection Board and each affected person without delay, and send the Board a detailed report within
          72 hours of becoming aware of it (the Board can extend this on request).
        </li>
        <li>
          <strong>Purpose limitation.</strong> Data collected for payroll is for payroll. Using it for
          something unrelated needs its own lawful basis.
        </li>
        <li>
          <strong>Retention and erasure.</strong> Once the purpose is no longer being served, data should be
          erased, unless another law requires you to keep it.
        </li>
        <li>
          <strong>A contact for questions.</strong> The company must publish contact details of someone who can
          answer people's questions about their data, and run a way to handle grievances.
        </li>
      </ul>
      <p>
        For scale, not for panic: the Act's schedule allows penalties of up to ₹250 crore for failing to take
        reasonable security safeguards, and up to ₹200 crore for failing to notify a breach. These are maximums,
        decided case by case. The practical point: the two duties with the biggest penalties are exactly the
        ones messy spreadsheets put at risk.
      </p>

      <h2>A clean-up checklist for your HR team</h2>
      <p>
        You don't need a big project. You need a few honest afternoons, in this order.
      </p>

      <h3>1. Make a list of where employee data actually sits</h3>
      <p>
        Not where the policy says it sits. Where it actually is. Open a simple sheet with four columns: what
        data, where it lives, who can open it, who owns it. Go through:
      </p>
      <ul>
        <li>Shared drives and Google Drive or OneDrive folders</li>
        <li>Google Forms and their linked response sheets (onboarding forms, event sign-ups, surveys)</li>
        <li>Email attachments: salary files, offer letters, Form 16s, background check reports</li>
        <li>WhatsApp groups where ID proofs, medical certificates or leave reasons get shared</li>
        <li>Personal laptops and desktops ("Downloads" folders are where old salary sheets go to live forever)</li>
        <li>Vendors: payroll, insurance, background verification, the attendance app</li>
      </ul>

      <h3>2. Tighten access on shared sheets</h3>
      <ul>
        <li>Find any file shared as "Anyone with the link" and switch it to named people only.</li>
        <li>Remove people who have moved teams or left the company.</li>
        <li>Split one giant master sheet into what each person needs. A manager needs their team's leave balance, not everyone's bank account number.</li>
        <li>Stop emailing salary files. Share a restricted link instead, so access can be removed later.</li>
      </ul>

      <h3>3. Decide how long you keep things, then actually delete</h3>
      <p>
        Agree with legal on a retention period for each type of record. Then act on it:
      </p>
      <ul>
        <li><strong>Ex-employees:</strong> keep what tax, PF, gratuity and labour laws require; delete the rest (old ID scans, personal emergency contacts, informal notes).</li>
        <li><strong>Candidates who weren't hired:</strong> decide a period, say a few months, and clear old resumes and interview notes after that.</li>
        <li><strong>Form responses:</strong> old event or survey sheets with names and phone numbers can usually go.</li>
      </ul>

      <h3>4. Don't paste identifiable employee data into unapproved AI tools</h3>
      <p>
        Pasting a sheet of names, salaries and ratings into a personal ChatGPT account means sending employee
        data to an outside company your employer has no contract with. That's a security safeguards problem,
        and a processor problem, no matter how good the summary is. Use only the AI tools your company has
        approved for this kind of data. If your team is already doing this quietly, our piece on{" "}
        <Link to="/blog/shadow-ai-your-team">shadow AI</Link> covers how to talk about it without a witch hunt.
        For the general "what's safe to paste" rules, see{" "}
        <Link to="/blog/ai-data-privacy-india">this guide</Link>.
      </p>

      <h3>5. Anonymise before you ask AI for help</h3>
      <p>
        Most of the time, the AI doesn't need to know who anyone is. Before you paste:
      </p>
      <ul>
        <li>Replace names with codes (E001, E002) and keep the key in a separate, restricted file.</li>
        <li>Delete columns you don't need: phone, email, PAN, Aadhaar, bank details, address.</li>
        <li>Round or band numbers where exact figures don't matter (salary bands instead of exact CTC).</li>
        <li>Better still, ask AI to help you build the formula or the template, then run it on the real data yourself.</li>
      </ul>

      <h3>6. Know what you'll do if something leaks</h3>
      <p>
        A breach doesn't have to be a hack. It can be the salary sheet sent to the wrong "Rahul". Agree on the
        basics now:
      </p>
      <ol>
        <li>Who in HR reports it, and to whom (usually IT security and legal), within the hour.</li>
        <li>How you contain it: pull back access, recall the email, ask the recipient to delete it and confirm.</li>
        <li>Who writes down what happened, what data, how many people, and when you found out. The 72-hour clock for the Board's report runs from when the company becomes aware.</li>
        <li>Who decides on informing affected employees, and in what words.</li>
      </ol>

      <h2>Your next step</h2>
      <p>
        Block 45 minutes this week and do step 1 for just one process, say onboarding. Follow the data from the
        Google Form to wherever it ends up, and write down every place you find it. You'll likely find two or
        three things to fix the same day, and you'll have a head start long before May 2027.
      </p>
      <p>
        And if you'd like to build a small tool for HR work, like a data cleaner that strips names before
        anything goes near an AI, that's exactly what Chapter 5 of All The Coffee walks you through. Module A
        is free to try.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a href="https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf" target="_blank" rel="noopener noreferrer">
              PIB: DPDP Rules, 2025 Notified, A Citizen-Centric Framework for Privacy Protection and Responsible Data Use
            </a>{" "}
            (17 November 2025)
          </li>
          <li>
            <a href="https://www.hlc.com/en/publications/indias-digital-personal-data-protection-act-2023-brought-into-force-" target="_blank" rel="noopener noreferrer">
              Hogan Lovells: India's Digital Personal Data Protection Act, 2023 brought into force
            </a>{" "}
            (17 November 2025)
          </li>
          <li>
            <a href="https://www.teamleaseregtech.com/updates/article/49364/meity-issued-a-notification-regarding-the-commencement-of-the-dpdp-act/" target="_blank" rel="noopener noreferrer">
              TeamLease RegTech: MeitY issued a notification regarding the commencement of the DPDP Act, 2023
            </a>{" "}
            (November 2025)
          </li>
          <li>
            <a href="https://www.barandbench.com/view-point/navigating-legitimate-use-exemption-employee-data-digital-personal-data-protection-act-2023" target="_blank" rel="noopener noreferrer">
              Bar &amp; Bench (NovoJuris Legal): Navigating Legitimate Use Exemption for Employee Data under the DPDP Act 2023
            </a>{" "}
            (10 December 2024)
          </li>
          <li>
            <a href="https://www.business-standard.com/technology/tech-news/meity-may-cut-compliance-timeline-for-key-dpdp-rules-to-12-months-126012201293_1.html" target="_blank" rel="noopener noreferrer">
              Business Standard: MeitY may cut compliance timeline for key DPDP rules to 12 months
            </a>{" "}
            (January 2026)
          </li>
          <li>
            <a href="https://ssrana.in/articles/meity-plans-to-cut-short-dpdp-compliance-timeline-and-notify-cross-border-restrictions-for-sdfs/" target="_blank" rel="noopener noreferrer">
              S.S. Rana &amp; Co.: MeitY plans to cut short DPDP compliance timeline and notify cross-border restrictions for SDFs
            </a>{" "}
            (2026)
          </li>
        </ul>
      </div>
    </>
  );
}
