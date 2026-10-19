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
import { DescribeBuildCheckLoop } from "../components/diagrams/DescribeBuildCheckLoop";
import { AppFrame } from "../components/demo/AppFrame";
import { MeetingCostCalculator } from "../components/demo/MeetingCostCalculator";
import { ChatToolMockup } from "../components/demo/ChatToolMockup";
import { BuildWatchDemo } from "../components/demo/BuildWatchDemo";
import { CodeExplorer } from "../components/demo/CodeExplorer";
import { TryFeatureDemo } from "../components/demo/TryFeatureDemo";
import { ORIGINAL_SOURCE } from "../lib/calculatorSource";
import { chapterById } from "../lib/courseData";

const meta = chapterById(1)!;

const PROMPT = `Build me a simple Meeting Cost Calculator as a web page.

It should let me enter:
- the number of people in the meeting
- their average yearly salary in Indian Rupees (for example 12,00,000)
- how long the meeting lasts, in minutes

Then show, in big clear numbers, how much the meeting cost in rupees.
Assume people work 2,000 hours a year.

Make it look clean and friendly, with a light colour theme,
and make sure it works on a phone screen too.`;

export default function ChapterOne() {
  return (
    <ChapterShell meta={meta}>
      <SectionEyebrow n="01" label="Where you are" />
      <p>
        Today you'll build a <strong>Meeting Cost Calculator</strong>: a small web tool where you enter how many
        people are in a meeting, their average salary and how long it runs, and it tells you what that meeting cost
        the company.
      </p>
      <p className="mt-3">
        You won't write a single line of code yourself. You'll describe what you want, and an AI tool will build it.
      </p>
      <AppFrame label="meeting-cost-calculator.ai (the finished thing)">
        <MeetingCostCalculator />
      </AppFrame>

      <Callout variant="worry">
        "This is the part where it gets technical and I get lost." It isn't. If you can write a WhatsApp message and
        copy-paste text, you can do everything in this chapter. And if something does go a bit wrong, there's a
        section at the end that covers it.
      </Callout>

      <SectionEyebrow n="02" label="Build it" />
      <Step n={1} title="Open the AI tool">
        Go to claude.ai in your web browser (Chrome, Edge or Safari are all fine).
      </Step>
      <ChatToolMockup highlight="signup" />
      <Callout variant="tip" title="Using a different tool?">
        This course uses Claude because its "Preview" panel shows your tool running right next to the chat, which
        makes the next few chapters easier to follow. ChatGPT and Gemini can build similar tools too, but exactly how
        varies by tool and changes often: look for a preview, canvas or app panel next to the chat, or just ask
        directly: "Can you show this to me as a live, interactive page I can use right here, not just code?"
      </Callout>
      <Step n={2} title="Create a free account">
        Sign up with your personal email address, not your work one. You'll get a code by email to confirm it's you.
        The free plan is enough for this whole module.
      </Step>
      <Callout variant="tip">
        Why personal email? Some companies have rules about AI tools on work accounts. Learning on a personal
        account keeps you on the safe side.
      </Callout>
      <Step n={3} title="Start a new chat">
        You'll see a box where you can type a message, much like a chat app.
      </Step>
      <ChatToolMockup highlight="newchat" />
      <Step n={4} title="Copy and paste this message, then press Enter">
        This message is called a <strong>prompt</strong>. It's just a clear description of what you want, the way
        you'd brief a colleague.
      </Step>
      <CopyBlock label="Prompt for Chapter 1">{PROMPT}</CopyBlock>
      <Callout variant="tip" title="Where does 2,000 hours come from?">
        It's a common rule of thumb: 40 hours a week &times; 50 working weeks a year (that 50 already assumes about
        two weeks off) &asymp; 2,000 hours. Finance and ops teams use this approximation constantly to turn a yearly salary into an
        hourly rate. It's not exact for every role, and that's fine; it's close enough to make the point.
      </Callout>

      <Step n={5} title="Watch it build">
        The AI will reply with a short message and then start writing. You may see strange-looking text scroll past.
        That's the code being written for you. Don't try to read it. Click below to see what that looks like.
      </Step>
      <BuildWatchDemo />

      <Step n={6} title="Try your tool">
        Type these numbers into your calculator: 8 people, average yearly salary 1200000, meeting length 60 minutes.
      </Step>

      <Checkpoint>
        Your calculator should show a cost of <strong>₹4,800</strong>. Here's why: 12 lakh a year divided by
        2,000 hours is ₹600 an hour per person. Eight people for one hour is 8 &times; ₹600 = ₹4,800.
        <br />
        <br />
        Your calculator will look different from ours: different colours, layout and wording. That's completely
        fine. What matters is that you get ₹4,800. Didn't get there? See "If something went wrong" below.
      </Checkpoint>

      <SectionEyebrow n="03" label="Make it yours" />
      <p>
        Before we look under the hood, swap in your own numbers. How many people are usually in your team's
        recurring meetings, and roughly what do they earn? Try it below.
      </p>
      <AppFrame label="meeting-cost-calculator.ai (now with your numbers)">
        <MeetingCostCalculator features={{ projection: true }} />
      </AppFrame>
      <Callout variant="reassurance">
        That "a year" number is usually the moment this stops feeling like a toy exercise. The same tool you just
        described in one sentence just put a real number on something you sit through every week.
      </Callout>

      <SectionEyebrow n="04" label="The surprise" />
      <p>
        Now let's look behind the curtain. Find the option to view the code (in Claude, there's a "Code" tab at the
        top of the preview). Scroll through it. You'll probably see somewhere between 100 and 300 lines of
        instructions.
      </p>
      <p className="mt-3">
        <strong>You just made that.</strong> You didn't type it, but you decided what it should do, described it
        clearly, and tested that it works. That's exactly what people do in vibe coding. You don't need to
        understand any of this yet. In Chapter 2 you'll learn to find your way around it.
      </p>
      <CodeExplorer code={ORIGINAL_SOURCE} label="index.html: your calculator's code" heightClass="max-h-72" />

      <SectionEyebrow n="05" label="What just happened" />
      <p>Three things happened, and they're the same three things that will happen in every build for the rest of this course:</p>
      <ol className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-caramel-600">
        <li>You described what you wanted, in plain English. That's your prompt.</li>
        <li>The AI wrote the instructions for the computer. That's the code.</li>
        <li>You checked the result, using numbers where you already knew the right answer.</li>
      </ol>
      <p className="mt-3">
        That third step is easy to skip, and it's the one that makes you good at this. Testing with numbers you can
        check yourself is how you catch mistakes, just like sanity-checking a colleague's spreadsheet.
      </p>
      <DescribeBuildCheckLoop filled={{ prompt: "Your prompt", code: "The code", result: "₹4,800 ✓" }} />

      <SectionEyebrow n="06" label="What you can skip" />
      <p>
        You don't need to know which programming language the AI used, how the page is laid out, or how the
        calculation is written. Developers care about those things. For now, you only care whether the tool does
        what you asked.
      </p>

      <Troubleshooting
        items={[
          {
            problem: "I see code but no working preview.",
            answer: <>Send: <em>"Please show this as a working, interactive preview I can use right here."</em></>,
          },
          {
            problem: "The answer isn't ₹4,800.",
            answer: (
              <>
                Double-check you typed <code className="rounded bg-latte px-1">1200000</code> with no commas or
                spaces. If it's still wrong, send: <em>"I entered 8 people, 1200000 salary and 60 minutes, and it
                showed [what you see]. It should be ₹4,800. Please fix the calculation."</em>
              </>
            ),
          },
          {
            problem: "The tool says I've reached a usage limit.",
            answer: "Free plans have a limit on messages in a few hours. Take a break and come back later. Your chat will still be there.",
          },
          {
            problem: "I closed the tab and lost it.",
            answer: "You haven't. Open claude.ai again and look in your list of recent chats on the left.",
          },
        ]}
      />

      <SectionEyebrow n="07" label="Try it yourself" />
      <TryItYourself>
        <p className="mb-3">Ask the AI to add one new feature. Pick one, or make up your own, and then test it.</p>
      </TryItYourself>
      <TryFeatureDemo />
      <Callout variant="reassurance">
        It's normal to need two or three rounds of back-and-forth. Developers do this all day. Asking for a fix
        isn't failing; it's the process.
      </Callout>

      <SectionEyebrow n="08" label="Words you can now use" />
      <WordsTable
        words={[
          { word: "Prompt", meaning: "The instructions or request you give an AI tool", sample: "Let me tweak the prompt and see if we get a better result." },
          { word: "Preview", meaning: "A working version of the tool you can try before sharing it", sample: "Here's a quick preview so you can click around." },
          { word: "Iterate", meaning: "Improve something through repeated small rounds of changes", sample: "It's a first version; we'll iterate on it next week." },
        ]}
      />

      <NextUpTeaser
        label="Chapter 2: What just happened?"
        hook="You'll crack open the code you just built and find your own edits inside it, like a treasure hunt."
      />

      <ChapterComplete
        chapterId={1}
        nextPath="/chapter/2"
        nextTitle="Chapter 2: What just happened?"
        quickCheck={{
          question: "What do you call the message you send an AI tool to describe what you want?",
          options: ["Query", "Prompt", "Command"],
          correctIndex: 1,
        }}
      />
    </ChapterShell>
  );
}
