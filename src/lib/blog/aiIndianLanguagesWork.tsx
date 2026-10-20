import { Link } from "react-router-dom";

export default function AiIndianLanguagesWork() {
  return (
    <>
      <p>
        A distributor in Nashik sends you a two-minute WhatsApp voice note in Marathi about a delayed
        consignment. You understand about half of it. Your colleague who speaks Marathi is on leave till
        Monday. The distributor wants an answer today.
      </p>
      <p>
        Or HR has just finalised the new attendance policy, and the plant manager wants it in Hindi and Tamil
        for the shop floor notice board by Friday. The agency quote for translation is sitting in your inbox,
        and so is the deadline.
      </p>
      <p>
        AI tools have become genuinely useful for this kind of work in Indian languages. They're also still
        capable of making mistakes that would be embarrassing in front of a customer. This piece covers which
        tools are worth trying, what they're good at, and where you still need a human who actually speaks the
        language.
      </p>

      <h2>The tools, briefly</h2>

      <h3>Indus by Sarvam</h3>
      <p>
        Sarvam is a Bengaluru AI company that builds models focused on Indian languages. In February 2026 it{" "}
        <a
          href="https://techcrunch.com/2026/02/20/indias-sarvam-launches-indus-ai-chat-app-as-competition-heats-up"
          target="_blank"
          rel="noopener noreferrer"
        >
          launched Indus
        </a>
        , a chat app for web, Android and iPhone that runs on its Sarvam 105B model (105 billion parameters,
        which is a rough measure of a model's size). You can type or speak, and get replies as text or audio.
        Business Today's{" "}
        <a
          href="https://www.businesstoday.in/amp/technology/news/story/indus-by-sarvam-a-first-look-at-indias-homegrown-ai-chat-app-built-for-local-languages-517385-2026-02-21"
          target="_blank"
          rel="noopener noreferrer"
        >
          first look
        </a>{" "}
        described it as trained in 22 Indian languages and found it replied in Hindi, Malayalam and Gujarati
        when spoken to in them.
      </p>
      <p>
        At the time of writing (October 2026), the{" "}
        <a
          href="https://apps.apple.com/in/app/indus-by-sarvam/id6758622680"
          target="_blank"
          rel="noopener noreferrer"
        >
          App Store listing
        </a>{" "}
        shows it as free. It launched as a beta with a possible waitlist, and at launch TechCrunch noted you
        couldn't delete chat history without deleting your whole account. Check whether that has changed before
        you put anything sensitive into it.
      </p>

      <h3>Google Gemini</h3>
      <p>
        Google's{" "}
        <a
          href="https://support.google.com/gemini/answer/13575153"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gemini help page
        </a>{" "}
        lists Assamese, Bengali, Gujarati, Hindi, Kannada, Malayalam, Marathi, Odia, Punjabi, Tamil, Telugu and
        Urdu among supported languages, with a note that the mobile app may differ. For voice, Google announced
        Gemini Live (the talk-to-it mode){" "}
        <a
          href="https://www.digit.in/news/general/gemini-live-is-now-available-in-9-indian-languages-including-hindi-everything-announced-at-google-for-india.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          in Hindi and eight more Indian languages
        </a>{" "}
        back in October 2024.
      </p>

      <h3>ChatGPT</h3>
      <p>
        ChatGPT can already converse in major Indian languages. In October 2026 OpenAI{" "}
        <a
          href="https://x.com/OpenAI/status/2110797830361436604"
          target="_blank"
          rel="noopener noreferrer"
        >
          rolled out an update to voice mode
        </a>{" "}
        that adds new voices in several languages including Hindi, and Storyboard18 reported the{" "}
        <a
          href="https://www.storyboard18.com/amp/brand-marketing/openai-launches-festive-chatgpt-campaign-with-new-hindi-voices-112781.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          two new Hindi voices are called Neer and Leher
        </a>
        . OpenAI also built{" "}
        <a href="https://openai.com/index/introducing-indqa/" target="_blank" rel="noopener noreferrer">
          IndQA
        </a>
        , a test set of 2,278 questions across 12 languages, to measure how well AI handles Indian languages
        and culture. That a benchmark was needed tells you something: this is still being worked on.
      </p>

      <h3>Bhashini</h3>
      <p>
        Bhashini is the Government of India's language technology platform, run by MeitY (the IT ministry).
        Most of it powers government websites and services behind the scenes. A February 2026{" "}
        <a
          href="https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/feb/doc202629784101.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          PIB backgrounder
        </a>{" "}
        says it supports voice in 22 languages and text in 36. For ordinary users, there's a{" "}
        <a
          href="https://play.google.com/store/apps/details?id=com.dibd.bhashini"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bhashini app
        </a>{" "}
        with text translation, voice translation and a "Converse" mode for two-way conversations. It's a
        translator, not a chatbot: useful for "what does this say," less so for "help me write a polite reply."
      </p>

      <h3>What about Krutrim?</h3>
      <p>
        Ola's Krutrim launched a consumer assistant called Kruti in 2025, but MediaNama{" "}
        <a
          href="https://www.medianama.com/2026/04/223-olas-krutrim-shuts-down-agentic-ai-assistant-kruti/"
          target="_blank"
          rel="noopener noreferrer"
        >
          reported in April 2026
        </a>{" "}
        that it had gone offline from the web and app stores, with no official explanation. I couldn't find
        confirmation that it has come back, so it's not one to build your workflow around right now.
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Best for</th>
              <th>Voice</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Indus (Sarvam)</td>
              <td>Chatting and drafting in Indian languages</td>
              <td>Yes</td>
              <td>Free on App Store at time of writing; check its data settings</td>
            </tr>
            <tr>
              <td>Gemini</td>
              <td>Drafting, translating, Google Workspace users</td>
              <td>Yes (Gemini Live)</td>
              <td>12 Indian languages listed on its help page</td>
            </tr>
            <tr>
              <td>ChatGPT</td>
              <td>Drafting, rewriting tone, voice conversations</td>
              <td>Yes, new Hindi voices</td>
              <td>Free and paid plans</td>
            </tr>
            <tr>
              <td>Bhashini app</td>
              <td>Quick translation, text or speech</td>
              <td>Yes</td>
              <td>Government app; translator, not a writing assistant</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Where this actually helps at work</h2>

      <h3>Replying to customers and distributors on WhatsApp</h3>
      <p>
        This is the most common use and the most useful. You paste the message (or a transcript of the voice
        note), understand it, and draft a reply in the same language. The trick is to tell the AI who you're
        talking to and how formal to be:
      </p>
      <blockquote>
        A distributor in Nashik sent me this message in Marathi. First, tell me in English what he is asking
        for. Then draft a short, polite reply in Marathi saying the consignment will reach by Thursday and
        apologising for the delay. He is an older business owner we've worked with for years, so be respectful
        but not stiff. Keep the reply under 60 words.
      </blockquote>
      <p>
        Always ask for the English meaning first. It's your check that the AI understood the original before
        you trust its reply.
      </p>

      <h3>Translating an HR policy or circular</h3>
      <p>
        AI gives you a fast first draft that a native speaker can then fix, which is much quicker than starting
        from blank. Ask it to keep things simple:
      </p>
      <blockquote>
        Translate this attendance policy into simple Hindi that factory workers will understand. Use everyday
        Hindi, not formal Sanskritised words. Keep all dates, times and numbers as numerals. Keep the terms
        "PF" and "ESI" in English. At the end, list any sentences where you weren't sure of the meaning.
      </blockquote>
      <p>
        That last line matters. It turns the AI from a confident guesser into something that flags its own
        weak spots for the human reviewer.
      </p>

      <h3>Voice notes</h3>
      <p>
        Both Gemini and ChatGPT can take spoken input, and Indus is built around voice. If someone sends you a
        long voice note in Tamil, you can play it to a voice mode and ask for a summary in English. Or speak
        your reply in English and ask for it in Tamil. Read the output before sending, every time.
      </p>

      <h2>Where it still goes wrong</h2>
      <p>These are the mistakes to look for, in roughly the order you'll meet them:</p>
      <ul>
        <li>
          <strong>Formality and honorifics.</strong> In Hindi, picking between "tu," "tum" and "aap" matters: using the wrong level of respect with
          a senior customer reads as rude, even if every word is correct. Tamil, Telugu, Marathi and others
          have their own versions of this. Always tell the AI who the reader is.
        </li>
        <li>
          <strong>Hinglish and code-mixing.</strong> Real workplace Hindi is full of English: "meeting," "target,"
          "invoice," "follow-up." AI sometimes "purifies" these into formal Hindi words nobody actually uses at
          work, making the message sound like a government notice. Ask for "the way people actually speak in an
          office."
        </li>
        <li>
          <strong>Numbers, dates and money.</strong> Business Today's review noticed Indus reading numbers out in
          English in the middle of other languages. Worse, a translation can quietly change 1.5 lakh to 15
          lakh, or swap a date format. Check every figure against the original.
        </li>
        <li>
          <strong>Names and places.</strong> Personal names, company names and small town names sometimes get
          translated or spelled oddly. Tell it to leave names untouched.
        </li>
        <li>
          <strong>Legal and policy text.</strong> A policy, contract or compliance notice has words that carry
          specific legal meaning. A fluent-sounding translation can change that meaning. For anything legal,
          AI is a draft for a qualified translator or your legal team, never the final version.
        </li>
      </ul>
      <blockquote>
        The rule of thumb: if a customer, an employee or a regulator will read it, a native speaker reads it
        first.
      </blockquote>
      <p>
        One more thing. The usual data rules apply in every language: don't paste customer phone numbers,
        Aadhaar details or salary data into a personal AI account. Our guide on{" "}
        <Link to="/blog/ai-data-privacy-india">what's safe to paste into AI</Link> covers this.
      </p>

      <h2>A small tool idea: the bilingual reply helper</h2>
      <p>
        If you reply to customers in two languages every day, you'll find yourself typing the same
        instructions again and again ("respectful, under 60 words, keep numbers as numerals"). That's a sign
        you could build a small tool for it: a page where you paste the incoming message, pick the language
        and tone, and get the English meaning plus a draft reply side by side, with a reminder to have it
        checked.
      </p>
      <p>
        You can build something like this yourself by describing it in plain English to an AI, no coding
        needed. All The Coffee's free Chapter 1 has you build your first working tool in the browser in about
        20 minutes, and later chapters cover putting AI inside your own tools.
      </p>

      <h2>Try this today</h2>
      <p>
        Take one message you received this week in an Indian language: a customer query, a distributor
        complaint, a circular. Paste it into Gemini, ChatGPT or Indus with the WhatsApp prompt above. Then show
        the AI's reply to a colleague who speaks the language and ask: "Would you send this?" Their answer will
        tell you exactly how far you can trust it, and for what.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://techcrunch.com/2026/02/20/indias-sarvam-launches-indus-ai-chat-app-as-competition-heats-up"
              target="_blank"
              rel="noopener noreferrer"
            >
              TechCrunch: India's Sarvam launches Indus AI chat app as competition heats up
            </a>{" "}
            (20 February 2026)
          </li>
          <li>
            <a
              href="https://www.businesstoday.in/amp/technology/news/story/indus-by-sarvam-a-first-look-at-indias-homegrown-ai-chat-app-built-for-local-languages-517385-2026-02-21"
              target="_blank"
              rel="noopener noreferrer"
            >
              Business Today: Indus by Sarvam, a first look at India's homegrown AI chat app
            </a>{" "}
            (21 February 2026)
          </li>
          <li>
            <a
              href="https://apps.apple.com/in/app/indus-by-sarvam/id6758622680"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apple App Store: Indus by Sarvam
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://support.google.com/gemini/answer/13575153"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gemini Apps Help: Where you can use Gemini Apps
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.digit.in/news/general/gemini-live-is-now-available-in-9-indian-languages-including-hindi-everything-announced-at-google-for-india.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digit: Gemini Live is now available in 9 Indian languages including Hindi
            </a>{" "}
            (October 2024)
          </li>
          <li>
            <a
              href="https://x.com/OpenAI/status/2110797830361436604"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI on X: GPT-Live-1.1 announcement
            </a>{" "}
            (October 2026)
          </li>
          <li>
            <a
              href="https://www.storyboard18.com/amp/brand-marketing/openai-launches-festive-chatgpt-campaign-with-new-hindi-voices-112781.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Storyboard18: OpenAI launches festive ChatGPT campaign with new Hindi voices
            </a>{" "}
            (17 October 2026)
          </li>
          <li>
            <a href="https://openai.com/index/introducing-indqa/" target="_blank" rel="noopener noreferrer">
              OpenAI: Introducing IndQA
            </a>{" "}
            (3 November 2025)
          </li>
          <li>
            <a
              href="https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/feb/doc202629784101.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              PIB: Artificial Intelligence for Culture and Languages
            </a>{" "}
            (9 February 2026)
          </li>
          <li>
            <a
              href="https://play.google.com/store/apps/details?id=com.dibd.bhashini"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Play: BHASHINI app
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://www.medianama.com/2026/04/223-olas-krutrim-shuts-down-agentic-ai-assistant-kruti/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MediaNama: Ola's Krutrim shuts down agentic AI assistant Kruti
            </a>{" "}
            (April 2026)
          </li>
        </ul>
      </div>
    </>
  );
}
