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
import { VENDOR_NOTES } from "../lib/vendorNotes";
import { chapterById } from "../lib/courseData";

const meta = chapterById(6)!;

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
        APIs are everywhere once you notice them. When you pay with UPI, the payment app sends a request to your
        bank's API. When your phone shows the weather, an app asks a weather service's API. Most modern software is
        lots of tools sending requests to each other's APIs.
      </p>

      <SectionEyebrow n="03" label="API keys: the ID card" />
      <p>
        Restaurants don't serve just anyone who walks into the kitchen. APIs are the same: most need to know who's
        asking, and who's paying. That's what an <strong>API key</strong> is: a long secret code, like a membership
        card number, that your tool shows with every request.
      </p>
      <ul className="list-disc space-y-2 pl-5 marker:text-caramel-500">
        <li>They often cost money per use. Each request to an AI API usually costs a small amount, charged to whoever owns the key.</li>
        <li>Treat them like your bank PIN. Never paste an API key into a chat, an email, a screenshot or a shared document.</li>
      </ul>
      <Callout variant="tip">
        Good news for today: when you build this tool inside Claude, it uses your own Claude account to talk to the
        AI, so you don't need an API key at all. You'll use real keys later in the course, when you build outside the
        chat.
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
        Paste the sample notes into your tool's box and click Summarise. Wait a few seconds. Try it below. It's
        preloaded with the same notes.
      </Step>
      <NotesSummariserDemo />

      <Checkpoint>
        Your result won't be word-for-word the same as anyone else's, since AI writes slightly differently each time. But
        the facts should match: Rahul sends the revised quote by Friday, Priya confirms budget with the CFO by next
        Wednesday, Anita shares delivery data with Rahul tomorrow. The decision should mention both conditions: the
        two-year price at ₹16.5 lakh <strong>and</strong> the penalty clause. If it misses the "and," that's a
        meaningful error: use the fix loop.
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
      <Step n={4} title="Test 1: the empty box">
        Clear the notes box completely and click Summarise above. What happened? An error, a strange summary of
        nothing, or a freeze? Real people click buttons at the wrong time, so good tools plan for it. Unusual
        situations like this are called <strong>edge cases</strong>.
      </Step>
      <CopyBlock label="Fix the empty-box edge case">{EMPTY_BOX_FIX}</CopyBlock>

      <Step n={5} title="Test 2: the honesty test">
        Load the honesty-test notes above (deliberately no owners or dates) and click Summarise. Check the action
        items carefully. Do they say "Not mentioned," or did the AI invent names and deadlines?
      </Step>
      <p>
        AI models sometimes make things up and present them confidently. This is called a{" "}
        <strong>hallucination</strong>. Your "what to avoid" instruction makes it much less likely, but it's always
        worth checking AI output against the source, especially before you send it to anyone.
      </p>

      <SectionEyebrow n="07" label="What you can skip" />
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
            problem: "It asks me for an API key.",
            answer: <>If you're in Claude, ask: <em>"Please build this so it works inside this chat without an API key."</em> Using another tool that can't do this? Skip the hands-on build for now, read the rest of this chapter for the concepts, and you'll wire up a real API key properly in Tier 2.</>,
          },
          { problem: "The action items table is missing or messy.", answer: "Use the fix loop and show exactly the table you expected, using the checkpoint table above." },
        ]}
      />

      <SectionEyebrow n="08" label="Try it yourself" />
      <TryItYourself>
        <p className="mb-2">1. Add a second button, Write Email, that turns the summary into a short, polite email to your manager.</p>
        <p className="mb-2">2. Add a dropdown to choose the summary length: one line, short or detailed.</p>
        <p>
          3. <strong>Bonus:</strong> write a few lines of notes from a real meeting you attended, leaving out anything
          confidential, and test your tool on them in the demo above. Check every action item against your notes.
        </p>
      </TryItYourself>

      <SectionEyebrow n="09" label="Words you can now use" />
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
