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
import { NotebookCodeData } from "../components/diagrams/NotebookCodeData";
import { MemoryVsStorage } from "../components/diagrams/MemoryVsStorage";
import { AppFrame } from "../components/demo/AppFrame";
import { FollowUpTracker } from "../components/demo/FollowUpTracker";
import { TryTrackerFeatureDemo } from "../components/demo/TryTrackerFeatureDemo";
import { chapterById } from "../lib/courseData";

const meta = chapterById(4)!;

const BRIEF_PROMPT = `Who it's for: I'm a busy professional who keeps forgetting to follow up
on things after meetings.

What it does: I can add a follow-up with three things: what it is,
who it's with, and a due date. It shows all my follow-ups as a list,
sorted by due date with the soonest at the top. I can tick a follow-up
as done, and done items move to the bottom and look faded.

What good looks like: if I add "Send revised proposal" with Rahul,
due tomorrow, it appears at the top of the list.

What to avoid: no logins, no extra features. Clean and simple.`;

const STORAGE_PROMPT = `New requirement: my follow-ups must stay saved even after I close
the tool or refresh the page. When I open it again, everything I added
should still be there, including which ones are done.`;

const EXPORT_FALLBACK_PROMPT = `Since you can't save data here, please add an Export button that
downloads my follow-ups as a file to my computer, and an Import button
that loads that file back in.`;

export default function ChapterFour() {
  return (
    <ChapterShell meta={meta}>
      <SectionEyebrow n="01" label="Where you are" />
      <p>
        The start of Module B. In Module A, your tools forgot everything the moment you closed them. Today you'll
        build a <strong>Follow-up Tracker</strong>: a small tool where you note who you need to get back to, about
        what, and by when. And this time, it will remember.
      </p>
      <p className="mt-3">
        Along the way you'll learn the difference between a tool and the information inside it, a distinction that
        quietly explains most "why doesn't this just work" moments you'll run into later.
      </p>

      <Callout variant="worry">
        "Module A was gentle. Module B is where it gets serious, right?" The tools get more useful, but the way you
        build them stays exactly the same: describe, build, check. You already know how to do this. If anything goes
        wrong, you already know the fix loop from Chapter 3.
      </Callout>

      <SectionEyebrow n="02" label="Build it" />
      <Step n={1} title="Start a new chat and paste this prompt">
        Notice it follows the four-part intern brief from Chapter 3.
      </Step>
      <CopyBlock label="Prompt for Chapter 4">{BRIEF_PROMPT}</CopyBlock>

      <Step n={2} title="Add three follow-ups, then tick one off">
        Use these, or real ones from your week. "Send revised proposal" should land at the top, since it's due
        soonest; now tick it as done and watch it drop straight to the bottom. Try it below; it works the same way.
      </Step>
      <AppFrame label="follow-up-tracker.ai">
        <FollowUpTracker persist={false} />
      </AppFrame>

      <Step n={3} title="The test">
        Now refresh your browser page (F5 on Windows, Cmd+R on Mac). Go back to your chat and open the tool again.
        Where did your follow-ups go? Click "Simulate closing and reopening the tool" above to see it happen here.
      </Step>

      <SectionEyebrow n="03" label="The forgetful tool" />
      <p>
        They're gone. Your tool works perfectly, but it has no memory. Every time it starts, it starts blank.
      </p>
      <p className="mt-3">
        This isn't a bug in the usual sense. The tool did exactly what you asked. You just didn't ask it to
        remember. In tech, the things a tool must do are called <strong>requirements</strong>, and a missing
        requirement is one of the most common reasons real projects go wrong. Developers spend a lot of time asking
        "what did we forget to say?"
      </p>

      <SectionEyebrow n="04" label="What just happened: the tool and the data" />
      <p>Every tool has two separate parts:</p>
      <ul className="list-disc space-y-2 pl-5 marker:text-caramel-500">
        <li><strong>The code</strong> is the tool itself: the boxes, the buttons, the rules like "sort by due date." It's like a blank notebook with printed columns.</li>
        <li><strong>The data</strong> is the information you put into it: "Send revised proposal, Rahul, tomorrow." It's what you write in the notebook.</li>
      </ul>
      <NotebookCodeData />
      <p>
        You already know this from Excel. The formulas and layout of a spreadsheet are one thing; the numbers you
        type in are another. You can send someone a blank template (code) or a filled-in sheet (code and data).
      </p>
      <p className="mt-3">
        Your tracker had the notebook but kept writing in pencil and erasing it every time you left. Where data is
        kept so it isn't lost is called <strong>storage</strong>.
      </p>
      <MemoryVsStorage />

      <SectionEyebrow n="05" label="Build it: give your tool a memory" />
      <Step n={4} title="Ask for storage">
        Go back to the chat with your tracker and paste:
      </Step>
      <CopyBlock label="New requirement">{STORAGE_PROMPT}</CopyBlock>

      <Step n={5} title="Test it properly">
        Add the three follow-ups again and tick one off. Then refresh the page, reopen the tool, and check. This
        version below actually remembers; try refreshing your browser tab for real, or click the button.
      </Step>
      <AppFrame label="follow-up-tracker.ai (now with storage)">
        <FollowUpTracker persist />
      </AppFrame>

      <Checkpoint>
        After refreshing, all three follow-ups should still be there, with the same one ticked as done.
      </Checkpoint>

      <Callout variant="tip">
        If the AI says it can't save data inside this tool, that's fine. Some AI tools don't allow it. Use the
        backup plan instead: ask for an Export button that downloads your follow-ups as a file, and an Import button
        that loads that file back in.
      </Callout>
      <CopyBlock label="Backup plan prompt">{EXPORT_FALLBACK_PROMPT}</CopyBlock>
      <p>
        Then test it: add follow-ups, click Export, refresh, click Import and choose the downloaded file. Your
        follow-ups should come back. It's a little more manual, but it teaches the same idea: your data has to live
        somewhere outside the tool.
      </p>

      <SectionEyebrow n="06" label="What you can skip" />
      <p>
        How the saving actually works, where exactly the data is kept, and what format it's saved in. Developers
        choose between many types of storage; you'll meet the most important one, a database, much later. For now,
        you only need one question for any tool: <strong>"If I close this, will my data still be here?"</strong>
      </p>

      <Troubleshooting
        items={[
          {
            problem: "The follow-ups still disappear after I asked for saving.",
            answer: <>Use the fix loop: <em>"I expected: my follow-ups to still be there after refreshing. What happened instead: the list was empty. Please explain in simple words why, then fix it."</em></>,
          },
          {
            problem: "The dates show in a strange format, like 2026-10-17.",
            answer: <>That's a common computer date format. Ask: <em>"Please show dates in Indian format, like 17 Oct 2026."</em></>,
          },
          {
            problem: "My Import button doesn't do anything.",
            answer: "Make sure you're choosing the file you exported, usually in your Downloads folder. If it still fails, copy any message you see and use the fix loop.",
          },
          {
            problem: "The AI rebuilt the tool and it looks completely different.",
            answer: <>Ask: <em>"Keep the previous design exactly, and only add the saving feature."</em></>,
          },
        ]}
      />

      <SectionEyebrow n="07" label="Try it yourself" />
      <TryItYourself>
        Add two features to your tracker, one at a time, testing each before moving on: show overdue follow-ups in
        red, and add a filter so you can see only one person's follow-ups. Try both below.
      </TryItYourself>
      <TryTrackerFeatureDemo />
      <Callout variant="reassurance">
        Notice what you're doing now: adding features one at a time and testing after each. That's exactly how
        professional teams work. Re-checking old features after a new one is added is called{" "}
        <strong>regression testing</strong>, but you don't need to remember the word, just the habit.
      </Callout>

      <SectionEyebrow n="08" label="Words you can now use" />
      <WordsTable
        words={[
          { word: "Data", meaning: "The information a tool works with or keeps", sample: "Is the tool the problem, or is the data wrong?" },
          { word: "Storage", meaning: "Where data is kept so it isn't lost", sample: "Where is this data stored, and who can access it?" },
          { word: "Requirement", meaning: "Something a tool must do", sample: "Was 'export to Excel' in the original requirements?" },
          { word: "Feature", meaning: "A specific thing a tool can do", sample: "Can we park that feature for version two?" },
        ]}
      />

      <NextUpTeaser
        label="Chapter 5: Taming messy spreadsheets"
        hook="You'll build a Data Cleaner that fixes a genuinely messy sales file in one click, and catch a bug hiding in plain sight."
      />

      <ChapterComplete
        chapterId={4}
        nextPath="/chapter/5"
        nextTitle="Chapter 5: Taming messy spreadsheets"
        quickCheck={{
          question: "Your tool works perfectly but forgets everything on refresh. What's actually missing?",
          options: ["A bug in the code", "A requirement to save the data", "More features"],
          correctIndex: 1,
        }}
      />
    </ChapterShell>
  );
}
