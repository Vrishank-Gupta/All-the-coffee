import { ChapterShell } from "../components/chapter/ChapterShell";
import { SectionEyebrow } from "../components/chapter/SectionEyebrow";
import { Callout } from "../components/chapter/Callout";
import { CopyBlock } from "../components/chapter/CopyBlock";
import { Step } from "../components/chapter/Step";
import { Checkpoint } from "../components/chapter/Checkpoint";
import { Troubleshooting } from "../components/chapter/Troubleshooting";
import { TryItYourself } from "../components/chapter/TryItYourself";
import { WordsTable } from "../components/chapter/WordsTable";
import { ChapterComplete } from "../components/chapter/ChapterComplete";
import { NextUpTeaser } from "../components/chapter/NextUpTeaser";
import { ApiRestaurant } from "../components/diagrams/ApiRestaurant";
import { AiBuilderVsWorker } from "../components/diagrams/AiBuilderVsWorker";
import { NotesSummariserDemo } from "../components/demo/NotesSummariserDemo";
import { VENDOR_NOTES, SEATING_NOTES } from "../lib/vendorNotes";
import { ContractCheck } from "../components/tools/ContractCheck";
import { SAMPLE_CONTRACT } from "../lib/tools/contract";
import { chapterById } from "../lib/courseData";

const meta = chapterById(6)!;

const CONTRACT_PROMPT = `Who it's for: I'm a manager. Vendors send me contracts to sign, and I
want to know which clauses need a second look before I send them to legal.

What it does: a large box where I paste a contract, and a Check button.
The tool uses AI to find clauses about: automatic renewal, notice
periods, price increases, late payment charges, lock-ins or exit
penalties, limits on liability, indemnity, non-solicitation or
non-compete, and jurisdiction. For each one it shows:
1. a short title, and the clause number
2. the sentence from the contract, quoted word for word
3. one line in plain English on why it matters
Show "Reading the contract..." while it waits.

What good looks like: if the contract says it "will renew automatically"
unless notice is given "at least 90 days" before, the tool shows
"Renews automatically: 90 days' notice" with that sentence quoted.

What to avoid: never invent a clause, and quote only sentences that are
really in the contract. No legal advice.`;

const CONTRACT_QUOTE_CHECK = `New requirement: after the AI replies, the tool itself must check every
quote. If a quoted sentence doesn't appear in the contract exactly, word
for word, show it with a red "Not found in the contract" label instead
of hiding it. Also highlight each quote that is found inside the
contract text, so I can see where it is. Keep everything else the same.`;

const SUMMARISER_PROMPT = `Who it's for: I attend lots of meetings and write quick, messy notes.
I need a clean summary I can act on.

What it does: a large box where I paste my rough notes, and a Summarise
button. When I click it, the tool uses AI to produce:
1. a 2-3 sentence summary
2. a list of decisions made
3. a table of action items with three columns: Owner, Task, Due date
Show a friendly "Working on it..." message while it waits.

What good looks like: if my notes say "rahul to send quote by friday",
the table has a row: Rahul | Send quote | Friday.

What to avoid: never invent anything that isn't in my notes. If an owner
or due date isn't mentioned, write "Not mentioned".`;

const EMPTY_BOX_FIX = `I expected: a friendly message when I click Summarise with an empty box.
What happened instead: [what you saw].

If the box is empty, please show "Paste your notes first" and don't send
anything to the AI.`;

export default function ChapterSix() {
  return (
    <ChapterShell meta={meta}>
      <SectionEyebrow n="01" label="Where you are" />
      <p>
        So far, you've used AI to build tools. Today, you'll build a tool that uses AI itself: a{" "}
        <strong>Meeting Notes Summariser</strong>. You paste in rough notes, click one button, and get a clean
        summary, the decisions made, and a table of who's doing what by when.
      </p>
      <p className="mt-3">
        Along the way, you'll finally understand the word you've probably heard in a hundred meetings: <strong>API</strong>.
        If you deal with contracts, there's an optional second build: a red-flag checker that has to prove every quote.
      </p>

      <Callout variant="worry">
        "API sounds like the moment this stops being for people like me." API is one of the most over-mystified words
        in tech. By the end of this chapter, you'll be able to explain it to a colleague using a restaurant. Really.
      </Callout>

      <SectionEyebrow n="02" label="What an API is" />
      <p>
        Imagine you're at a restaurant. You don't walk into the kitchen and start cooking. You tell the waiter what
        you want, the waiter takes your order to the kitchen, and comes back with your food.
      </p>
      <p className="mt-3 font-display text-xl font-semibold text-espresso-950">An API is the waiter between two pieces of software.</p>
      <ApiRestaurant />
      <p>
        APIs are everywhere once you notice them. When you pay with UPI, the payment app sends a request through UPI,
        the system run by NPCI, which asks your bank. When your phone shows the weather, an app asks a weather service's API. Most modern software is
        lots of tools sending requests to each other's APIs.
      </p>

      <SectionEyebrow n="03" label="API keys: your card and PIN in one" />
      <p>
        Most APIs need to know who's asking, and who's paying. That's what an <strong>API key</strong> is: a long
        secret code your tool sends with every request. An API key is like your debit card number and PIN in one:
        the service charges whoever's key it is. Guard it the same way.
      </p>
      <ul className="list-disc space-y-2 pl-5 marker:text-caramel-500">
        <li>They often cost money per use. Each request to an AI API usually costs a small amount, charged to whoever owns the key.</li>
        <li>Never paste an API key into a chat, an email, a screenshot or a shared document.</li>
        <li>Never put a key inside a tool you share. Anyone who opens a web page can read everything in it, including the key, and spend your money.</li>
      </ul>
      <Callout variant="tip">
        Good news for today: when you build this tool inside Claude, it uses your own Claude account to talk to the
        AI, so you don't need an API key at all. You won't need an API key anywhere in this course.
      </Callout>

      <SectionEyebrow n="04" label="Build it" />
      <Step n={1} title="Get the sample notes">
        Here are some messy notes from a fictional vendor meeting. Copy them; you'll need them in Step 3.
      </Step>
      <CopyBlock label="vendor-meeting-notes.txt" mono>
        {VENDOR_NOTES}
      </CopyBlock>

      <Step n={2} title="Start a new chat and paste this prompt">
        The intern-brief structure is back, and so is an explicit "what to avoid."
      </Step>
      <CopyBlock label="Prompt for Chapter 6">{SUMMARISER_PROMPT}</CopyBlock>

      <Step n={3} title="Try it">
        Paste the sample notes into your own tool's box (the one you just built) and click Summarise. Wait a few
        seconds.
      </Step>
      <p className="text-sm text-espresso-700/70">
        Here's a reference copy of the finished tool, preloaded with the same notes, so you can compare your result
        against it. It only knows the two sample notes in this chapter, so use your own tool for anything else.
      </p>
      <NotesSummariserDemo />

      <Checkpoint>
        In <strong>your own tool</strong>, the result won't be word-for-word the same as anyone else's, since AI
        writes slightly differently each time. But the facts should match: Rahul sends the revised quote by Friday,
        Priya confirms budget with the CFO by next Wednesday, Anita shares delay data with Rahul tomorrow. The
        decision should mention both conditions: the two-year price at ₹16.5 lakh <strong>and</strong> the penalty
        clause. If it misses the "and," that's a meaningful error: use the fix loop.
      </Checkpoint>

      <SectionEyebrow n="05" label="What just happened" />
      <p>
        Every time you clicked Summarise, your tool sent a request through an API to an AI model, carrying your
        notes and instructions. The AI did the thinking and sent back a response, which your tool arranged into a
        summary and a table.
      </p>
      <p className="mt-3">
        There are now two different jobs for AI in your work, and it's worth telling them apart. The AI in the chat built the tool. The AI inside
        the tool does the work every time you use it. That's the difference between using AI and building with AI.
      </p>
      <AiBuilderVsWorker />

      <SectionEyebrow n="06" label="Build it, part 2: two important tests" />
      <p>
        Run both of these tests in <strong>your own tool</strong>, not the reference copy above. The reference copy
        is hardcoded to always behave well, which makes it useless for finding real problems. Your tool, running
        real AI, can actually fail these in a way worth catching.
      </p>
      <Step n={4} title="Test 1: the empty box">
        Clear the notes box completely and click Summarise. What happened? An error, a strange summary of nothing, or
        a freeze? Real people click buttons at the wrong time, so good tools plan for it. Unusual situations like
        this are called <strong>edge cases</strong>.
      </Step>
      <CopyBlock label="Fix the empty-box edge case">{EMPTY_BOX_FIX}</CopyBlock>

      <Step n={5} title="Test 2: the honesty test">
        Paste these deliberately vague notes (no owners, no dates) into your own tool and click Summarise.
      </Step>
      <CopyBlock label="honesty-test-notes.txt" mono>
        {SEATING_NOTES}
      </CopyBlock>
      <p>
        Check the action items carefully. Do they say "Not mentioned," or did the AI invent names and deadlines that
        aren't in the notes?
      </p>
      <p className="mt-3">
        AI models sometimes make things up and present them confidently. This is called a{" "}
        <strong>hallucination</strong>. Your "what to avoid" instruction makes it much less likely, but it's always
        worth checking AI output against the source, especially before you send it to anyone.
      </p>

      <SectionEyebrow n="07" label="Optional build: a contract red-flag checker" />
      <p>
        Same idea, higher stakes. A vendor sends a contract and wants it signed by Friday. Your tool reads it and
        points at the clauses worth a second look. With contracts, an AI that makes something up is dangerous, so
        this tool checks the AI's work itself. About 20 minutes.
      </p>
      <Step n={6} title="Start a new chat and paste this">
        Like the summariser, this tool uses AI inside it, so build it in Claude.
      </Step>
      <CopyBlock label="Contract checker prompt">{CONTRACT_PROMPT}</CopyBlock>
      <Step n={7} title="Test it on the sample contract">
        Copy the sample below (it's made up) into your tool and click Check.
      </Step>
      <CopyBlock label="Sample contract">{SAMPLE_CONTRACT}</CopyBlock>
      <Checkpoint>
        Known answer: the planted red flags are an automatic renewal with 90 days' notice (clause 2), a 10%
        increase on renewal (3), 24% interest on late payment (4), paying for the rest of the term if you leave early
        (5), the vendor's liability capped at one month's fees while you indemnify them without limit (6), no hiring
        their staff for 24 months (8), and disputes only in Kolkata courts (9). Confidentiality (7) and notices (10)
        are normal. Then the real test: find every quoted sentence in the contract. Each one should be there, word for
        word.
      </Checkpoint>
      <p>
        <strong>The trap: quotes that aren't quotes.</strong> AI often "quotes" by rewording, or tidies two sentences
        into one, and now and then it describes a clause that isn't in the contract at all. On a contract, that's the
        difference between a useful tool and a liability. Don't rely on checking by eye. Make the tool check itself:
      </p>
      <CopyBlock label="Make it check every quote">{CONTRACT_QUOTE_CHECK}</CopyBlock>
      <Step n={8} title="Prove the check works">
        Delete clause 6 from the contract in your tool and click Check again. The indemnity flag should disappear. If
        the AI still reports it, your new "Not found in the contract" label should appear next to it. Either way,
        nothing invented gets past you.
      </Step>
      <p>
        There's a free version at{" "}
        <a href="/tools/contract-check" className="font-semibold text-caramel-700 underline">allthecoffee.in/tools/contract-check</a>{" "}
        that works the other way round: no AI, it looks for the words risky clauses usually use. It can't invent
        anything, but it can miss a clause written in unusual words. Yours understands meaning but needs checking.
        Knowing that trade-off is half of using AI well. Neither one is legal advice.
      </p>
      <div className="my-5">
        <ContractCheck />
      </div>

      <SectionEyebrow n="08" label="What you can skip" />
      <p>
        How the request is actually written, what format the response comes back in, how API pricing is calculated,
        and which AI model you're using. The useful questions when you work with tech teams are simpler: "Which API
        are we calling?", "Who owns the key?" and "What does it cost per use?"
      </p>

      <Troubleshooting
        items={[
          { problem: "It says something about an API error, or nothing comes back.", answer: "The AI service may be busy, or you may have hit a usage limit. Wait a minute and try again. If it keeps happening, use the fix loop and paste the error." },
          {
            problem: "The AI built a tool that summarises without AI.",
            answer: <>Sometimes it writes simple rules instead (picking out lines with "to" in them). Ask: <em>"Please use AI inside the tool to do the summarising, rather than fixed rules."</em></>,
          },
          {
            problem: "Claude asks me for an API key.",
            answer: <>You don't need one. Ask: <em>"Please build this so it works inside this chat without an API key."</em> Never paste a key in, even if you have one.</>,
          },
          {
            problem: "My tool isn't Claude, and it wants an API key.",
            answer: "The quickest fix is a free Claude account just for this chapter: go to claude.ai, sign up, and paste the same prompt from Step 2. You can go back to your usual tool from Chapter 7 onward. Or skip the hands-on build for now and read the rest of this chapter for the concepts.",
          },
          { problem: "The action items table is missing or messy.", answer: "Use the fix loop and show exactly the table you expected, using the checkpoint table above." },
        ]}
      />

      <SectionEyebrow n="09" label="Try it yourself" />
      <TryItYourself>
        <p className="mb-2">1. Add a second button, Write Email, that turns the summary into a short, polite email to your manager.</p>
        <p className="mb-2">2. Add a dropdown to choose the summary length: one line, short or detailed.</p>
        <p>
          3. <strong>Bonus:</strong> write a few lines of notes from a real meeting you attended, leaving out anything
          confidential, and test your own tool on them. Check every action item against your notes.
        </p>
      </TryItYourself>

      <SectionEyebrow n="10" label="Words you can now use" />
      <WordsTable
        words={[
          { word: "API", meaning: "A way for one piece of software to ask another for something", sample: "Does their system have an API we can connect to?" },
          { word: "Request / response", meaning: "What's sent to an API, and what comes back", sample: "The request goes through, but the response is empty." },
          { word: "API key", meaning: "A secret code that identifies who's using an API", sample: "Who owns the API key, and where is it stored?" },
          { word: "Edge case", meaning: "An unusual situation a tool must still handle", sample: "What happens in the edge case where the file is empty?" },
          { word: "Hallucination", meaning: "When AI confidently states something untrue or made up", sample: "Let's check the summary for hallucinations before we send it." },
        ]}
      />

      <NextUpTeaser
        label="Chapter 7: Sharing what you built"
        hook="You'll turn one of your tools into a link anyone can open, and learn what 'going live' actually means."
      />

      <ChapterComplete
        chapterId={6}
        nextPath="/chapter/7"
        nextTitle="Chapter 7: Sharing what you built"
        quickCheck={{
          question: "What's it called when an AI confidently states something that isn't true?",
          options: ["An edge case", "A hallucination", "A request"],
          correctIndex: 1,
        }}
      />
    </ChapterShell>
  );
}
