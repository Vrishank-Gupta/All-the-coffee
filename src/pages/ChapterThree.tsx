import { ChapterShell } from "../components/chapter/ChapterShell";
import { SectionEyebrow } from "../components/chapter/SectionEyebrow";
import { Callout } from "../components/chapter/Callout";
import { CopyBlock } from "../components/chapter/CopyBlock";
import { Step } from "../components/chapter/Step";
import { Checkpoint } from "../components/chapter/Checkpoint";
import { Troubleshooting } from "../components/chapter/Troubleshooting";
import { TryItYourself } from "../components/chapter/TryItYourself";
import { RevealHint } from "../components/chapter/RevealHint";
import { WordsTable } from "../components/chapter/WordsTable";
import { ChapterComplete } from "../components/chapter/ChapterComplete";
import { ReferenceGrid } from "../components/chapter/ReferenceGrid";
import { ThreeWaysWrong } from "../components/diagrams/ThreeWaysWrong";
import { ErrorAnatomy } from "../components/diagrams/ErrorAnatomy";
import { WrongAnswerDemo } from "../components/demo/WrongAnswerDemo";
import { BrokenCalcDemo } from "../components/demo/BrokenCalcDemo";
import { ModuleCompleteBadge } from "../components/demo/ModuleCompleteBadge";
import { NervousCheckIn } from "../components/demo/NervousCheckIn";
import { FoundingOfferBox } from "../components/demo/FoundingOfferBox";
import { ModuleBSneakPeek } from "../components/demo/ModuleBSneakPeek";
import { chapterById } from "../lib/courseData";

const meta = chapterById(3)!;

const FIX_LOOP_TEMPLATE = `I expected: [what should have happened]
What happened instead: [what you saw]
Error message (if any): [paste it exactly]

Please explain in simple words what went wrong, then fix it.`;

const BUGGY_BUILD_PROMPT = `Build me a Meeting Cost Calculator web page. I enter the number of people,
their average yearly salary in rupees, and the meeting length in minutes,
and it shows what the meeting cost.

This is a learning exercise: please deliberately put one small mistake
in the calculation so it gives the wrong answer. Don't tell me what the
mistake is.`;

const BROKEN_HTML = `<!DOCTYPE html>
<html>
<body>
  <h1>Meeting Cost Calculator</h1>
  <p>People: <input id="people" type="number" value="8"></p>
  <p>Yearly salary (₹): <input id="salary" type="number" value="1200000"></p>
  <p>Minutes: <input id="minutes" type="number" value="60"></p>
  <button onclick="calculate()">Calculate</button>
  <h2 id="result"></h2>
  <script>
    function calculate() {
      const people = Number(document.getElementById("people").value);
      const salary = Number(document.getElementById("salary").value);
      const minutes = Number(document.getElementById("minutes").value);
      const total = people * (salary / 2000) * (minutes / 60);
      document.getElementById("result").textContent =
        "This meeting cost ₹" + totl.toLocaleString("en-IN");
    }
  </script>
</body>
</html>`;

const VAGUE_PROMPT = `Make a leave tracker.`;

const BRIEFED_PROMPT = `Who it's for: I manage a team of 6 people and need to see who is on leave.

What it does: I enter a name, a start date and an end date for each leave.
It shows a list of everyone's leave, sorted by start date, and highlights
anyone who is on leave today.

What good looks like: if Priya's leave runs from yesterday to tomorrow,
her row is highlighted.

What to avoid: keep it simple. No logins, no extra features I didn't ask for.`;

export default function ChapterThree() {
  return (
    <ChapterShell meta={meta}>
      <SectionEyebrow n="01" label="Where you are" />
      <p>
        This is the last chapter of Module A. Today you'll break things on purpose (twice), then fix them calmly,
        using a simple three-step method you'll use for the rest of this course, and probably the rest of your
        career. At the end there's an optional bonus on writing prompts that get better results the first time.
      </p>

      <Callout variant="worry">
        "What if I break something and can't fix it?" Here's something most beginners don't know: professional
        developers see errors all day long, dozens of them. An error message isn't a sign you've failed; it's the
        computer telling you, precisely, what it didn't understand. And nothing you do in this chapter can harm your
        computer. The worst that can happen is a tool that doesn't work yet.
      </Callout>

      <SectionEyebrow n="02" label="Three ways things go wrong" />
      <p>
        A mistake in software is called a <strong>bug</strong>. Finding and fixing it is called{" "}
        <strong>debugging</strong>. You're about to do both.
      </p>
      <ThreeWaysWrong />

      <SectionEyebrow n="03" label="The fix loop: Expected, Happened, Ask" />
      <p>Whenever something goes wrong, tell the AI three things. Save this template: you'll use it a lot.</p>
      <CopyBlock label="The fix loop template">{FIX_LOOP_TEMPLATE}</CopyBlock>
      <p>Asking for the explanation matters. It turns every bug into a tiny lesson.</p>

      <SectionEyebrow n="04" label="Build it, part 1: the wrong answer" />
      <p>You'll start with the sneakiest kind of bug.</p>
      <Step n={1} title="Ask for a calculator with a hidden mistake">
        Open a new chat and paste this.
      </Step>
      <CopyBlock label="Prompt for the deliberately-buggy build">{BUGGY_BUILD_PROMPT}</CopyBlock>
      <Step n={2} title="Test it with numbers you know">
        Use the numbers from Chapter 1: 8 people, 1200000 salary, 60 minutes. The right answer is ₹4,800. Notice
        how normal a wrong answer looks; nothing is red, nothing is flashing. Try it below.
      </Step>
      <WrongAnswerDemo />
      <Step n={3} title="Send the fix loop in your real chat">
        Copy the fix loop template from above and paste it into the same chat. Fill in the three lines: what you
        expected (₹4,800), what happened instead (the number your tool showed), and{" "}
        <em>Error message: none</em>, because this kind of bug doesn't show one. Then send it.
      </Step>

      <Checkpoint title="Checkpoint 1">
        The AI should explain the mistake and give you a fixed version showing ₹4,800. Test it again to be
        sure: never assume a fix worked; always check.
      </Checkpoint>

      <SectionEyebrow n="05" label="Build it, part 2: the error message" />
      <p>Now for a real error. Below is a small calculator with one typo hidden in it. Copy all of it.</p>
      <CopyBlock label="broken-calculator.html" mono>
        {BROKEN_HTML}
      </CopyBlock>
      <Step n={1} title="Open a new chat">
        Start a fresh chat, so this doesn't get mixed up with your earlier calculator.
      </Step>
      <Step n={2} title="Tell it not to fix anything">
        Type: <em>"Show this exactly as it is, don't fix anything."</em>
      </Step>
      <Step n={3} title="Paste the code and send">
        Paste the code you copied underneath your message, then press Enter.
      </Step>
      <Step n={4} title="Click Calculate">
        When your tool appears next to the chat, click Calculate. Try it below.
      </Step>
      <BrokenCalcDemo />
      <Step n={5} title="Ask for a fix">
        If Claude shows a <strong>"Try fixing with Claude"</strong> button, click it: it sends the error to Claude
        for you. If nothing appears at all, use the fix loop with <em>Error message: none</em>. Describing what you
        expected and what happened is usually enough.
      </Step>

      <p className="mt-4">How to read an error message, since most have three parts you can translate:</p>
      <ErrorAnatomy />
      <p>
        You'll keep seeing the same handful of error types. You don't need to memorise them; just recognise the
        shape, the way you'd recognise "insufficient funds" on a bank app without knowing how banking software works:
      </p>
      <ReferenceGrid
        groups={[
          {
            title: "Common error types",
            items: [
              { code: "ReferenceError", desc: "You used a name the computer doesn't recognise, like totl instead of total." },
              { code: "TypeError", desc: "You tried to do something with a value that doesn't support it, like reading the name off an envelope that never arrived." },
              { code: "SyntaxError", desc: "The instructions themselves are written incorrectly, like a form with a bracket opened and never closed." },
            ],
          },
        ]}
      />

      <Checkpoint title="Checkpoint 2">
        The AI should spot the typo, explain it, and give you a fixed version. Click Calculate: you should see "This
        meeting cost ₹4,800." If the AI asks for more detail, the fix loop is your answer: say what you expected,
        what happened, and paste any error you can see.
      </Checkpoint>

      <SectionEyebrow n="06" label="When the fix doesn't work" />
      <p>Sometimes the AI's first fix doesn't solve it, or creates a new problem. Use the three-tries rule:</p>
      <ul className="list-disc space-y-1.5 pl-5 marker:text-caramel-500">
        <li><strong>Try 1 and 2:</strong> use the fix loop again, with the new result and any new error message.</li>
        <li><strong>Try 3:</strong> describe the problem differently, based on what you clicked, typed, what you see.</li>
        <li>
          <strong>Still stuck?</strong> Ask it to go back: <em>"Please go back to the last version that worked, and
          let's try a different approach."</em> Starting over isn't failure. It's often the fastest way to actually
          get unstuck.
        </li>
      </ul>

      <SectionEyebrow n="07" label="Bonus: better prompts, brief it like a new intern" />
      <Callout variant="tip" title="Optional: read this when you're ready">
        This section is a bonus. You've already done this chapter's one big idea, the fix loop. Skip ahead if
        you've had enough for today, and come back to this before Chapter 4, which builds on it.
      </Callout>
      <p>
        Many bugs come from vague prompts. Imagine briefing a smart new intern: quick and eager, but they know
        nothing about your work. Tell them four things: who it's for, what it does, what good looks like, and what
        to avoid.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-bold tracking-wide text-brick-600 uppercase">Vague</p>
          <CopyBlock label="Vague prompt">{VAGUE_PROMPT}</CopyBlock>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-bold tracking-wide text-sage-700 uppercase">Briefed like an intern</p>
          <CopyBlock label="Briefed prompt">{BRIEFED_PROMPT}</CopyBlock>
        </div>
      </div>
      <p>The second prompt takes one extra minute to write and usually saves ten minutes of back-and-forth.</p>

      <SectionEyebrow n="08" label="What just happened" />
      <p>
        You met all three kinds of bug, and fixed two of them on purpose. You learned that error messages have a
        structure you can read, that the AI can help even when you don't understand the error, and that testing
        with a known answer catches bugs that don't announce themselves. This is the most important chapter in
        Module A. From now on, when something breaks, you'll have a method instead of a panic.
      </p>

      <SectionEyebrow n="09" label="What you can skip" />
      <p>
        The different types of errors (there are dozens), how to find hidden errors using developer tools in your
        browser, and how to fix code by hand. The AI does the heavy lifting; your job is to notice, describe and
        check.
      </p>

      <Troubleshooting
        items={[
          {
            problem: "In part 1, the AI refused to add a mistake, or told me what it was.",
            answer: "No problem. Ask it to remove the explanation and continue, or skip straight to part 2.",
          },
          {
            problem: "In part 1, my answer was ₹4,800 anyway.",
            answer: "The AI may have hidden the mistake somewhere else. Try different numbers, like 4 people, 600000 salary, 30 minutes. The right answer is ₹600.",
          },
          {
            problem: "In part 2, the AI fixed the typo on its own.",
            answer: "Some tools tidy code automatically. Read the error explanation in its reply anyway, and move on to the checkpoint.",
          },
          {
            problem: "In part 2, the tool won't show at all.",
            answer: <>Make sure you copied the code from the very first line to the very last line, then send: <em>"Please show this HTML code as an interactive preview."</em> Still only code? Check that Settings, then Capabilities, then "Cloud code execution and file creation" is switched on, as in Chapter 1.</>,
          },
        ]}
      />

      <SectionEyebrow n="10" label="Try it yourself" />
      <TryItYourself>
        <p className="mb-2"><strong>1. Bonus: rewrite a vague prompt.</strong> If you read the intern section, take "Make a tool to split a restaurant bill" and rewrite it using the four-part intern brief. Then build and test it with numbers you can check.</p>
        <p>
          <strong>2. Read an error.</strong> Translate this into plain English:{" "}
          <code className="rounded bg-latte px-1 text-[13px]">TypeError: Cannot read properties of undefined (reading 'name')</code>
        </p>
        <RevealHint>
          Something the code expected to exist wasn't there, so it couldn't find its "name." Like asking for the
          name on an envelope that never arrived.
        </RevealHint>
      </TryItYourself>

      <SectionEyebrow n="11" label="Words you can now use" />
      <WordsTable
        words={[
          { word: "Bug", meaning: "A mistake in software that makes it behave wrongly", sample: "Is that a bug, or is it working as designed?" },
          { word: "Debugging", meaning: "Finding and fixing bugs", sample: "The team is still debugging the export issue." },
          { word: "Error message", meaning: "The computer's description of what went wrong", sample: "Can you send me the exact error message?" },
          { word: "Test case", meaning: "A set of inputs where you already know the right answer", sample: "Do we have a test case for the month-end scenario?" },
        ]}
      />

      <SectionEyebrow n="12" label="Module A complete" />
      <p>
        Four chapters ago you weren't sure you belonged here. Since then you've built a tool, changed it, read its
        code, and fixed two bugs on purpose, and all of it was free. That's not nothing: that's further than most people
        expect to get in a first week. But every tool you've built so far has had the same limit: it forgets
        everything the second you close it. Module B is where that changes.
      </p>
      <NervousCheckIn point="end" />
      <ModuleCompleteBadge next="Module B: Building useful things, a founding-member upgrade" />

      <ModuleBSneakPeek />

      <FoundingOfferBox />

      <ChapterComplete
        chapterId={3}
        nextPath="/chapter/4"
        nextTitle="Chapter 4: A tool that remembers"
        quickCheck={{
          question: "What are the three parts of the fix loop?",
          options: ["Guess, panic, restart", "Expected, Happened, Ask", "Describe, ignore, repeat"],
          correctIndex: 1,
        }}
      />
    </ChapterShell>
  );
}
