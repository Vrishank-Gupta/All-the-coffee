import { ChapterShell } from "../components/chapter/ChapterShell";
import { SectionEyebrow } from "../components/chapter/SectionEyebrow";
import { Callout } from "../components/chapter/Callout";
import { TryItYourself } from "../components/chapter/TryItYourself";
import { WordsTable } from "../components/chapter/WordsTable";
import { ChapterComplete } from "../components/chapter/ChapterComplete";
import { NextUpTeaser } from "../components/chapter/NextUpTeaser";
import { InstructionsTrio } from "../components/diagrams/InstructionsTrio";
import { DescribeBuildCheckLoop } from "../components/diagrams/DescribeBuildCheckLoop";
import { ToolCollage } from "../components/diagrams/ToolCollage";
import { BoringTaskBox } from "../components/demo/BoringTaskBox";
import { NervousCheckIn } from "../components/demo/NervousCheckIn";
import { chapterById } from "../lib/courseData";

const meta = chapterById(0)!;

export default function ChapterZero() {
  return (
    <ChapterShell meta={meta}>
      <SectionEyebrow n="01" label="Where you are" />
      <p>
        This is the starting line. There's nothing to install and nothing to build in this chapter. By the end,
        you'll know exactly what this course will and won't ask of you, and you'll have written down the one idea
        that will become your final project.
      </p>

      <Callout variant="worry">
        Maybe you've watched a colleague build something with AI in ten minutes and felt a small knot in your
        stomach. Maybe you nod along in meetings when someone says "API" and hope nobody asks a follow-up question.
        Maybe you've started a course before, hit a wall, and quietly closed the tab.
        <br />
        <br />
        If any of that sounds familiar, here's the honest truth: <strong>you are not behind.</strong> Most people in
        most offices feel exactly the same way. They're just not saying it out loud either.
      </Callout>

      <SectionEyebrow n="02" label="What coding actually is" />
      <p>
        Forget everything you've seen in films: the green text, the hoodies, the fast typing. Coding is much more
        ordinary than that.
      </p>
      <p className="mt-3 font-display text-xl font-semibold text-espresso-950">
        Coding is writing instructions for a computer.
      </p>
      <p className="mt-3">
        That's it. A recipe is instructions for a cook. A process document is instructions for a new joiner. Code is
        instructions for a computer. The only difference is that a computer is extremely literal: it does exactly
        what you say, nothing more, nothing less. That's why code looks strange: it has to be very precise.
      </p>
      <InstructionsTrio />
      <p>
        You already follow and write instructions like this all day without calling it coding: an Excel formula
        (<code className="rounded bg-latte px-1">=SUM(A1:A10)</code>), a washing machine's cycle settings, turn-by-turn
        GPS directions. Each one says "if this, then do that" in a very exact way. Code is the same habit, just
        written for a computer instead of a person or a machine.
      </p>

      <SectionEyebrow n="03" label='What "vibe coding" is' />
      <p>
        Until recently, you had to learn the computer's precise language to give it instructions. That took months
        or years.
      </p>
      <p className="mt-3">
        Now there's a middle step. You describe what you want in plain English to an AI tool, and the AI writes the
        precise instructions (the code) for you. You look at the result, say what you'd like changed, and the AI
        changes it. This back-and-forth way of building is what people call <strong>vibe coding</strong>.
      </p>
      <p className="mt-3">You're not cheating by doing it this way. Professional developers now work like this every day.</p>
      <DescribeBuildCheckLoop />
      <p>
        People use this same back-and-forth for real work: a tool that compares vendor quotes side by side, a lookup
        for the questions your team gets asked every week, a shift roster for a small team. If you can describe the
        end result in a couple of sentences, it's usually fair game, which is exactly what Chapter 1 proves.
      </p>

      <SectionEyebrow n="04" label="What you'll be able to do by the end" />
      <ul className="list-disc space-y-2 pl-5 marker:text-caramel-500">
        <li>Build small tools that help with your actual job, like a spreadsheet cleaner or a notes summariser.</li>
        <li>Read an error message without panicking, and know how to get it fixed.</li>
        <li>Understand the words tech teams use, so you can follow and contribute in those conversations.</li>
        <li>Automate at least one boring, repetitive task you do today.</li>
      </ul>
      <ToolCollage />

      <SectionEyebrow n="05" label="What this course will NOT ask you to do" />
      <ul className="list-disc space-y-2 pl-5 marker:text-caramel-500">
        <li><strong>No maths.</strong> If you can use a calculator, you have all the maths you need.</li>
        <li><strong>No memorising code.</strong> You'll learn to recognise things, like a language you can't speak fluently.</li>
        <li><strong>No becoming a developer.</strong> You're learning to build for yourself, and work confidently with people who build for a living.</li>
        <li><strong>No installing anything until Chapter 8.</strong> For the first seven chapters, everything happens in your browser.</li>
        <li><strong>No jargon without an explanation.</strong> You'll always get the plain version first.</li>
      </ul>

      <SectionEyebrow n="06" label="How to get the most out of this course" />
      <ul className="list-disc space-y-2 pl-5 marker:text-caramel-500">
        <li>One chapter a day is perfect. Most take 25–45 minutes. Slow and steady beats a weekend binge you don't finish.</li>
        <li>Read on your phone, build on a laptop. Reading parts work fine on mobile, but when a chapter says "Build it," use a laptop.</li>
        <li>Do the exercises, even small ones. Reading about building is like reading about swimming.</li>
        <li>Use your personal email for the AI tools. Keep your learning separate from work systems for now.</li>
      </ul>

      <Callout variant="reassurance">
        Stuck at any point? Every chapter has an "If something went wrong" section. Getting stuck is part of the
        course, not a sign you're failing it.
      </Callout>

      <SectionEyebrow n="07" label="One honest check-in" />
      <NervousCheckIn point="start" />

      <SectionEyebrow n="08" label="Try it yourself" />
      <TryItYourself>
        <p>
          Think about your working week. Write down one boring, repetitive task you do on a computer, something
          that makes you think "there must be a better way." Don't worry if you have no idea how it could be
          automated. That's what the rest of the course is for. In Chapter 11, you'll come back to this sentence and
          build a tool for it.
        </p>
      </TryItYourself>
      <BoringTaskBox />

      <SectionEyebrow n="09" label="Words you can now use" />
      <WordsTable
        words={[
          { word: "Code", meaning: "Written instructions for a computer", sample: "Is the logic already in the code, or is someone doing it manually?" },
          { word: "Vibe coding", meaning: "Building software by describing what you want to an AI tool and refining the result", sample: "I vibe-coded a quick prototype so we can see if the idea works." },
        ]}
      />

      <NextUpTeaser
        label="Chapter 1: Your first tool in 20 minutes"
        hook="You'll build a real, working Meeting Cost Calculator, and watch an AI write the code for you. Really."
      />

      <ChapterComplete
        chapterId={0}
        nextPath="/chapter/1"
        nextTitle="Chapter 1: Your first tool"
        quickCheck={{
          question: "What's the best description of “vibe coding”?",
          options: ["Writing all the code yourself", "Describing what you want and letting AI write the code", "A programming language"],
          correctIndex: 1,
        }}
      />
    </ChapterShell>
  );
}
