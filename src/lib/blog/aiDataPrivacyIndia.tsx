import { Link } from "react-router-dom";

export default function AiDataPrivacyIndia() {
  return (
    <>
      <p>
        You're stuck on an email. You paste the whole thread into ChatGPT and ask it to draft a reply. Thirty
        seconds later you have a decent draft. Nobody got hurt, nothing went wrong, and you just saved ten
        minutes. Most days, that's exactly how this should work.
      </p>
      <p>
        But that thread had a customer's phone number in it. And last month's thread had a revenue number nobody's
        supposed to see until the board meeting. This article isn't about scaring you away from AI tools. It's
        about knowing where the actual line is, so you don't have to guess every single time.
      </p>
      <p>
        <em>
          A quick note before we start: this is general information to help you build good habits, not legal
          advice. Your company's own policy, and your legal or compliance team, have the final word on what you
          can share.
        </em>
      </p>

      <h2>What's generally fine to paste</h2>
      <ul>
        <li>Your own drafts: emails, reports, presentations you wrote</li>
        <li>Publicly available information: anything already on your company's website or in a public filing</li>
        <li>Hypothetical or anonymised examples: "a customer in retail asked about X" instead of their real name</li>
        <li>General questions about how to do something, with no real data attached at all</li>
        <li>Spreadsheet structure without the contents: column headings and three rows of made-up sample data</li>
      </ul>

      <h2>What generally isn't</h2>
      <ul>
        <li>Anything with a real customer's or employee's name, phone number, email, or address attached to specifics about them</li>
        <li>Unreleased financial numbers, before they're public</li>
        <li>Anything your company has explicitly classified as confidential or restricted</li>
        <li>Source code containing API keys, passwords, or other credentials</li>
        <li>Health, salary, bank, Aadhaar or PAN details, or anything else you'd hate to see in a forwarded WhatsApp message</li>
      </ul>

      <h2>What India's data protection law actually says</h2>
      <p>
        India's{" "}
        <a href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf" target="_blank" rel="noopener noreferrer">
          Digital Personal Data Protection Act, 2023
        </a>{" "}
        (the DPDP Act) covers digital personal data, which in plain terms means any information that can identify
        a specific person. It calls the person the data is about the <strong>Data Principal</strong>, and the
        organisation that decides why and how that data is used the <strong>Data Fiduciary</strong>. If you're
        handling customer or employee data at work, your company is the Data Fiduciary, and you're acting on its
        behalf.
      </p>
      <p>
        The Act requires organisations to process personal data only for a lawful purpose, give people a clear
        notice, and take "reasonable security safeguards" to prevent breaches. Failing at that last one is the most
        expensive line in the Act's{" "}
        <a href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf" target="_blank" rel="noopener noreferrer">
          schedule of penalties
        </a>
        : up to ₹250 crore per instance. Those penalties are aimed at organisations, not at individual employees.
        That doesn't let you off the hook, though. Your company's policies and your employment terms are where
        the consequences for you would sit.
      </p>
      <p>
        One honest nuance: the DPDP Act doesn't have a separate "sensitive data" category the way some foreign
        laws do. It treats all personal data under the same core rules, with extra protection for children's data.
        The older{" "}
        <a href="https://ksandk.com/data-protection-and-data-privacy/what-happens-spdi-rules-after-dpdp-enforcement/" target="_blank" rel="noopener noreferrer">
          2011 rules under the IT Act
        </a>
        , which do single out things like health, biometric and financial information, continue to apply until the
        DPDP Act's main provisions take over. Either way, health and bank details are the last things you want
        floating around in a chatbot.
      </p>

      <h2>When does all of this kick in?</h2>
      <p>
        The Act was passed in August 2023, but most of it only switches on through the DPDP Rules, 2025, which
        the government{" "}
        <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014" target="_blank" rel="noopener noreferrer">
          notified in November 2025
        </a>{" "}
        (published in the Gazette on 13 November 2025) with an 18-month phased timeline. At the time of writing
        (October 2026), the timeline looks like this:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>When</th>
              <th>What starts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>13 November 2025</td>
              <td>Definitions and the setting up of the Data Protection Board of India, the body that will enforce the Act</td>
            </tr>
            <tr>
              <td>About 13 November 2026</td>
              <td>Registration of Consent Managers: registered platforms that let people give, review and withdraw consent in one place</td>
            </tr>
            <tr>
              <td>About 13 May 2027</td>
              <td>The core duties: notices, consent, security safeguards, breach reporting, children's data and people's rights over their data</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Two caveats. In early 2026, the IT ministry{" "}
        <a href="https://chambers.com/articles/meity-plans-to-cut-short-dpdp-compliance-timeline-and-notify-cross-border-restrictions-for-sdfs" target="_blank" rel="noopener noreferrer">
          consulted on shortening the 18 months to 12
        </a>
        , and a{" "}
        <a href="https://www.mirvolegal.com/insights/dpdp-rules-2025-compliance-timeline/" target="_blank" rel="noopener noreferrer">
          September 2026 legal review
        </a>{" "}
        found no amendment had been notified, so May 2027 still stands as far as we can tell. And some sources
        count these dates a day later. If you're planning compliance work, check the latest Gazette notifications.
      </p>
      <p>
        For you personally, though, the dates matter less than you'd think. Pasting a customer's details into a
        personal AI account is sharing their data with a third party they never agreed to, for a purpose they were
        never told about. That's a bad habit today and it will be a clear compliance problem once the core duties
        apply.
      </p>

      <h2>You're a Data Principal too</h2>
      <p>
        The Act isn't only about what your company owes customers. It's also about what companies owe you. Once
        the core provisions apply, the{" "}
        <a href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf" target="_blank" rel="noopener noreferrer">
          Act gives you, as an individual
        </a>
        , the right to:
      </p>
      <ul>
        <li>Get a summary of what personal data an organisation holds about you and who it has shared it with</li>
        <li>Ask for your data to be corrected, completed, updated or erased</li>
        <li>Use the organisation's grievance process, and then complain to the Data Protection Board</li>
        <li>Nominate someone to exercise these rights on your behalf if you die or become incapacitated</li>
      </ul>
      <p>
        It also gives you a few duties, such as not impersonating someone else and not filing false or frivolous
        complaints. Breaching those duties carries a penalty of up to ₹10,000.
      </p>

      <h2>The thing most people don't know: not all AI tiers are the same</h2>
      <p>
        Most major AI providers offer a free or personal tier and a separate business or enterprise tier, and the
        data handling really is different between them. Here's what each provider's own help pages say at the time
        of writing:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Personal accounts</th>
              <th>Work accounts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ChatGPT</td>
              <td>
                Chats can be used for training unless you turn off "Improve the model for everyone" in Data
                Controls. Temporary Chats aren't used for training.
              </td>
              <td>No training on Business, Enterprise or API data by default</td>
            </tr>
            <tr>
              <td>Gemini</td>
              <td>
                With "Keep Activity" on, chats can be used to improve Google's models and a subset is read by human
                reviewers. Temporary chats aren't used for training.
              </td>
              <td>Workspace data isn't used for training or human-reviewed without your organisation's permission</td>
            </tr>
            <tr>
              <td>Claude</td>
              <td>
                Free, Pro and Max users choose whether chats are used for training. Incognito chats aren't used,
                even if training is on.
              </td>
              <td>Team, Enterprise and API are under commercial terms and aren't covered by the consumer training setting</td>
            </tr>
            <tr>
              <td>Microsoft Copilot</td>
              <td>
                Signed-in consumer conversations can be used for training unless you opt out. Copilot inside Microsoft
                365 Personal or Family apps is excluded.
              </td>
              <td>Under enterprise data protection, prompts and responses aren't used to train foundation models</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Sources for each row:{" "}
        <a href="https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance" target="_blank" rel="noopener noreferrer">
          OpenAI
        </a>
        ,{" "}
        <a href="https://help.openai.com/en/articles/7730893-temporary-chat" target="_blank" rel="noopener noreferrer">
          OpenAI on Temporary Chat
        </a>
        ,{" "}
        <a href="https://support.google.com/gemini/answer/13594961" target="_blank" rel="noopener noreferrer">
          Google Gemini
        </a>
        ,{" "}
        <a href="https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub" target="_blank" rel="noopener noreferrer">
          Google Workspace
        </a>
        ,{" "}
        <a href="https://www.anthropic.com/news/updates-to-our-consumer-terms" target="_blank" rel="noopener noreferrer">
          Anthropic
        </a>
        ,{" "}
        <a href="https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training" target="_blank" rel="noopener noreferrer">
          Anthropic on training
        </a>
        ,{" "}
        <a href="https://support.microsoft.com/en-us/topic/privacy-faq-for-microsoft-copilot-27b3a435-8dc9-4b55-9a4b-58eeb9647a7f" target="_blank" rel="noopener noreferrer">
          Microsoft consumer Copilot
        </a>{" "}
        and{" "}
        <a href="https://learn.microsoft.com/en-us/copilot/microsoft-365/enterprise-data-protection" target="_blank" rel="noopener noreferrer">
          Microsoft enterprise data protection
        </a>
        . These policies change, so treat the table as a starting point, not a guarantee.
      </p>
      <p>Three things in that table are worth slowing down on:</p>
      <ul>
        <li>
          <strong>"Not used for training" is not the same as "not stored".</strong> OpenAI keeps Temporary Chats for
          up to 30 days for abuse monitoring, and Google keeps temporary Gemini chats for 72 hours. Opting out of
          training is good. It doesn't make a chat disappear.
        </li>
        <li>
          <strong>Defaults matter.</strong> On most personal accounts, training is on until you switch it off. If you
          use a personal account at all, spend two minutes in its settings today.
        </li>
        <li>
          <strong>Paying doesn't automatically mean "business".</strong> A ₹1,999 ChatGPT Plus subscription on
          your own card is still a personal account. The business protections come from your company's contract
          with the provider, not from the price.
        </li>
      </ul>
      <blockquote>
        If you don't know which tier your company uses, that's worth a two-minute message to IT, not a guess.
      </blockquote>
      <p>
        If you suspect half your team is quietly using personal accounts for work anyway, you're probably right.
        We wrote about that in <Link to="/blog/shadow-ai-your-team">our piece on shadow AI</Link>.
      </p>

      <h2>A simple rule that covers most situations</h2>
      <p>
        You don't need to become a privacy lawyer to get this right day to day. You need one habit: before you
        paste something, ask "would I be comfortable if the person this is about saw exactly what I just typed?"
        If the answer's no, strip the identifying details first, or don't paste it at all.
      </p>
      <p>In practice, that looks like this:</p>
      <ol>
        <li>Strip names, phone numbers, emails and IDs. Replace them with "Customer A" or "Employee 3".</li>
        <li>Strip numbers that aren't public yet, or round them into something generic.</li>
        <li>
          Describe instead of pasting. "A client wants to renegotiate a two-year contract at a lower rate" gets you
          just as good a drafting assist as pasting the client's actual name and the actual number, with none of
          the risk.
        </li>
        <li>Use your company's approved tool, on your work login, for anything work-related.</li>
        <li>When something feels unusual, ask IT or legal. That's exactly what they're there for.</li>
      </ol>
      <p>
        A hypothetical example: your manager asks you to analyse why 40 people left the Pune office last year,
        using the exit interview sheet. Instead of uploading the sheet as it is, delete the name, employee ID and
        manager columns, keep department, tenure and the "reason for leaving" text, and then ask the AI for
        themes. You get the same insight. Nobody's resignation story ends up somewhere it shouldn't.
      </p>

      <h2>Already pasted something you shouldn't have?</h2>
      <p>
        It happens. Don't panic, and don't hide it either. A calm, quick response is far better than a quiet one:
      </p>
      <ol>
        <li>Delete the conversation from your chat history. It won't undo everything, but it's the right first step.</li>
        <li>
          If you were on a personal account with training switched on, switch it off now so future chats aren't
          included.
        </li>
        <li>
          Tell your manager or your IT or security team what was shared, roughly how much, and in which tool. Under
          the DPDP Rules, organisations will have to report personal data breaches, so your company needs to hear
          about it from you early, not discover it later.
        </li>
      </ol>

      <h2>Your next step</h2>
      <p>
        Today, open the AI tool you use most, find its data or privacy settings, and check two things: whether
        your chats are being used for training, and whether you're on a personal or work account. Then save one
        "safe" version of a task you do every week, with the real names swapped out, so the clean habit is the
        easy habit.
      </p>
      <p>
        And if you'd like to go further and build small tools that process your own spreadsheets in your browser
        instead of pasting them into a chatbot, that's part of what our <Link to="/signup">free first module</Link>{" "}
        starts you on.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf" target="_blank" rel="noopener noreferrer">
              MeitY: The Digital Personal Data Protection Act, 2023
            </a>{" "}
            (August 2023)
          </li>
          <li>
            <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014" target="_blank" rel="noopener noreferrer">
              PIB: Government notifies the DPDP Rules, 2025
            </a>{" "}
            (14 November 2025)
          </li>
          <li>
            <a href="https://www.mirvolegal.com/insights/dpdp-rules-2025-compliance-timeline/" target="_blank" rel="noopener noreferrer">
              MirvoLegal: DPDP Rules, 2025 compliance timeline for Data Fiduciaries
            </a>{" "}
            (reviewed 20 September 2026)
          </li>
          <li>
            <a href="https://chambers.com/articles/meity-plans-to-cut-short-dpdp-compliance-timeline-and-notify-cross-border-restrictions-for-sdfs" target="_blank" rel="noopener noreferrer">
              Chambers and Partners: MeitY plans to cut short DPDP compliance timeline
            </a>{" "}
            (23 February 2026)
          </li>
          <li>
            <a href="https://ksandk.com/data-protection-and-data-privacy/what-happens-spdi-rules-after-dpdp-enforcement/" target="_blank" rel="noopener noreferrer">
              King Stubb &amp; Kasiva: What happens to the SPDI Rules after DPDP enforcement
            </a>{" "}
            (2026)
          </li>
          <li>
            <a href="https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance" target="_blank" rel="noopener noreferrer">
              OpenAI Help Center: How your data is used to improve model performance
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://help.openai.com/en/articles/7730893-temporary-chat" target="_blank" rel="noopener noreferrer">
              OpenAI Help Center: Temporary Chat
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://support.google.com/gemini/answer/13594961" target="_blank" rel="noopener noreferrer">
              Google: Gemini Apps Privacy Hub
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub" target="_blank" rel="noopener noreferrer">
              Google Workspace: Generative AI in Google Workspace Privacy Hub
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://www.anthropic.com/news/updates-to-our-consumer-terms" target="_blank" rel="noopener noreferrer">
              Anthropic: Updates to our consumer terms and privacy policy
            </a>{" "}
            (August 2025)
          </li>
          <li>
            <a href="https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training" target="_blank" rel="noopener noreferrer">
              Anthropic Privacy Center: Is my data used for model training?
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://support.microsoft.com/en-us/topic/privacy-faq-for-microsoft-copilot-27b3a435-8dc9-4b55-9a4b-58eeb9647a7f" target="_blank" rel="noopener noreferrer">
              Microsoft Support: Privacy FAQ for Microsoft Copilot
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a href="https://learn.microsoft.com/en-us/copilot/microsoft-365/enterprise-data-protection" target="_blank" rel="noopener noreferrer">
              Microsoft Learn: Enterprise data protection in Microsoft Copilot and Copilot Chat
            </a>{" "}
            (updated August 2026)
          </li>
        </ul>
      </div>
    </>
  );
}
