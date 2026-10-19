import { Link } from "react-router-dom";
import { Award } from "lucide-react";
import { ChapterShell } from "../components/chapter/ChapterShell";
import { SectionEyebrow } from "../components/chapter/SectionEyebrow";
import { Callout } from "../components/chapter/Callout";
import { CopyBlock } from "../components/chapter/CopyBlock";
import { Step } from "../components/chapter/Step";
import { SafetyChecklist } from "../components/chapter/SafetyChecklist";
import { WordsTable } from "../components/chapter/WordsTable";
import { ChapterComplete } from "../components/chapter/ChapterComplete";
import { NextUpTeaser } from "../components/chapter/NextUpTeaser";
import { DownloadButton } from "../components/chapter/DownloadButton";
import { BoringTaskRecall } from "../components/demo/BoringTaskRecall";
import { ModuleCompleteBadge } from "../components/demo/ModuleCompleteBadge";
import { chapterById } from "../lib/courseData";

const meta = chapterById(11)!;

const BRIEF_TEMPLATE = `PROJECT BRIEF: [name your tool]

The problem: what do I do by hand today, and how long does it take?

Who uses it: just me, or others too? How often?

What goes in: which files, text or numbers? What do they look like?

What should happen: the steps, in plain English, in order.

What comes out: what do I want to see, download or copy at the end?

Test case: one example where I already know the right answer.
("If I put in X, I should get Y.")

Edge cases: what unusual situations should it handle?
(empty input, wrong format, duplicates, missing values)

What to avoid: things it must never do.

Version 1 (must have): the smallest version that would genuinely help me.

Later (nice to have): ideas I'm saving for after version 1 works.

Data safety: will I use only fake or non-confidential data while building?`;

const TEST_DATA_PROMPT = `Create realistic but completely fictional sample data for testing a tool.
It should look like this: [describe your real file's columns or format,
without using any real names or numbers].
Include about 15 rows, and deliberately include a few messy cases:
[for example: a duplicate, a blank row, a date in a different format].
Give it to me as [a CSV file / text I can paste].`;

const SLICE_PROMPT = `Here is the brief for a tool I want to build. Please read it, then build
only Slice 1: the simplest version that works from start to finish,
without the extras. I'll test it and then we'll add more, one piece at a time.

[paste your brief]`;

const DEMO_SCRIPT = `1. The problem (20 seconds): "Every month I spend about 3 hours combining
   the regional files by hand."
2. The demo (60 seconds): show it working, using test data.
3. The result (20 seconds): "It now takes about 2 minutes, and it flags
   files with missing columns."
4. The ask (20 seconds): "Could I try it on next month's real files,
   and is there anything I should check with IT first?"`;

const STARTER_A_BRIEF = `PROJECT BRIEF: Team Leave Tracker

The problem: I track my team's leave in a messy spreadsheet and keep
missing overlaps.

Who uses it: just me, a few times a week.

What goes in: a person's name, leave start date, leave end date, type
(Annual, Sick, Other). Team: Priya, Rahul, Anita, Vikram, Sneha, Arjun.

What should happen: show all leave in a list sorted by start date;
highlight anyone on leave today; warn me if 3 or more people are on
leave on the same day.

What comes out: the list, plus a clear warning for any overlap days.

Test case: Priya 10-14 Nov, Rahul 12-13 Nov, Anita 13-15 Nov.
On 13 Nov, three people are off, so I should see a warning for 13 Nov only.

Edge cases: end date before start date should show an error.

What to avoid: no logins. Keep the data saved between visits.

Version 1: add, list, today's highlight, overlap warning.

Later: a calendar view, exporting to Excel.`;

const STARTER_B_BRIEF = `PROJECT BRIEF: Invoice Detail Extractor

The problem: I copy details from vendor invoices into a spreadsheet by hand.

Who uses it: just me, weekly.

What goes in: I paste the text of one or more invoices.

What should happen: AI reads each invoice and pulls out: vendor name,
invoice number, invoice date, amount before GST, GST amount, total.

What comes out: a table with one row per invoice, a grand total, and
a Copy button so I can paste the table into Excel.

Test case: the three sample invoices give totals of 59,000, 14,000 and
1,18,000, so a grand total of 1,91,000.

Edge cases: if a detail isn't in the invoice, write "Not found".

What to avoid: never guess or invent numbers.

Version 1: extraction and table with grand total.

Later: flag invoices where amount + GST doesn't equal the total.`;

const STARTER_B_INVOICES = `BrightPack Solutions Pvt Ltd. Invoice No: BP-2026-0412.
Date: 14/04/2026. Subtotal: Rs 50,000. GST @18%: Rs 9,000.
Total: Rs 59,000.

Sharma Stationers - INV 7781 - 02-05-2026
Amount 12,500 + GST (12%) 1,500 = Rs 14,000

CloudNine IT Services | Bill #CN/889 | dated 21 May 2026
Total payable Rs. 1,18,000 (inclusive of 18% GST of Rs. 18,000)`;

const STARTER_C_BRIEF = `PROJECT BRIEF: Weekly Status Report Generator

The problem: every Friday I turn our task list export into a status
update for my manager.

Who uses it: just me, weekly.

What goes in: a CSV called tasks.csv with columns Task, Owner, Status, Due
(Status is Done, In progress or Not started; Due is YYYY-MM-DD).

What should happen: using a report date set at the top of the script,
count tasks done, list overdue tasks (not done and due before the report
date), list upcoming tasks (not done, due on or after the report date),
and count tasks done per owner.

What comes out: a neatly formatted text summary printed in the terminal
and saved as weekly_report.txt, ready to paste into an email.

Test case: with the sample file and report date 2026-10-10: 4 done;
overdue: Prepare Q3 deck (Priya, due 05 Oct), Review vendor contract
(Anita, due 08 Oct), Send client proposal (Vikram, due 09 Oct); upcoming:
Website copy refresh (Priya, due 15 Oct), Vendor renewal call (Vikram,
due 12 Oct), Monthly newsletter (Rahul, due 20 Oct).

Edge cases: a task with no owner should still show up, grouped as
"Unassigned".

What to avoid: never silently drop a row because a field looks odd.

Version 1: the counts, the overdue list, the upcoming list.

Later: emailing the report automatically.`;

const STARTER_C_CSV = `Task,Owner,Status,Due
Prepare Q3 deck,Priya,Not started,2026-10-05
Fix login bug,Rahul,Done,2026-10-01
Review vendor contract,Anita,In progress,2026-10-08
Update onboarding doc,Priya,Done,2026-09-28
Send client proposal,Vikram,Not started,2026-10-09
Team offsite planning,Rahul,Done,2026-10-02
Quarterly budget review,Anita,Done,2026-10-07
Website copy refresh,Priya,In progress,2026-10-15
Vendor renewal call,Vikram,Not started,2026-10-12
Monthly newsletter,Rahul,Not started,2026-10-20
`;

export default function ChapterEleven() {
  return (
    <ChapterShell meta={meta}>
      <SectionEyebrow n="01" label="Where you are" />
      <p>
        Chapter 11 of 12, the finish line of the Core course. On day one, in Chapter 0, you wrote down one boring,
        repetitive task from your working week. Today you'll turn that sentence into a working tool.
      </p>
      <p className="mt-3">
        This chapter is different from the others. There's no single tool everyone builds. Instead, you'll follow the
        same process professionals use: size the idea, write a brief, build in small slices, test like a sceptic, and
        show it to someone. If you don't have an idea you're happy with, there are three ready-made starter projects
        at the end.
      </p>
      <BoringTaskRecall />

      <Callout variant="worry">
        "Without step-by-step instructions, I'll get lost." Or: "My idea is too small to bother with." Or: "My idea
        is way too big for me." All three are normal. You'll get a step-by-step process instead of step-by-step
        clicks, which is what lets you build anything after this course ends. Small ideas are the best first
        projects. And if your idea is big, the first step will help you cut it down to a version you can finish this
        week.
      </Callout>

      <SectionEyebrow n="02" label="Suggested plan" />
      <div className="not-prose my-4 overflow-hidden rounded-2xl border border-espresso-900/10 bg-cream">
        <table className="w-full text-left text-sm">
          <thead className="bg-latte/60 text-espresso-700/70">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Session</th>
              <th className="px-4 py-2.5 font-semibold">What you'll do</th>
              <th className="px-4 py-2.5 font-semibold">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-espresso-900/10">
            <tr>
              <td className="px-4 py-2.5 font-semibold text-espresso-900">1</td>
              <td className="px-4 py-2.5 text-espresso-800">Steps 1–4: size the idea, choose where to build, write the brief, make test data</td>
              <td className="px-4 py-2.5 text-espresso-700/70">45 min</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-semibold text-espresso-900">2</td>
              <td className="px-4 py-2.5 text-espresso-800">Step 5: build version 1 in slices</td>
              <td className="px-4 py-2.5 text-espresso-700/70">45–60 min</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-semibold text-espresso-900">3</td>
              <td className="px-4 py-2.5 text-espresso-800">Step 6: test and improve</td>
              <td className="px-4 py-2.5 text-espresso-700/70">30–45 min</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-semibold text-espresso-900">4</td>
              <td className="px-4 py-2.5 text-espresso-800">Steps 7–8: safety check, then show it to someone</td>
              <td className="px-4 py-2.5 text-espresso-700/70">20–30 min</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionEyebrow n="03" label="Step 1: Size your idea" />
      <p>
        A good first project is like a good first cooking attempt: one dish, not a five-course dinner. Run your idea
        through these questions.
      </p>
      <p className="mt-4 font-semibold text-espresso-950">Good signs:</p>
      <ul className="list-disc space-y-1.5 pl-5 marker:text-caramel-500">
        <li>You do it at least every week or month.</li>
        <li>It takes you 15 minutes or more by hand.</li>
        <li>What goes in is something you control: files, text, numbers you type.</li>
        <li>You can tell whether the result is right.</li>
      </ul>
      <p className="mt-4 font-semibold text-espresso-950">Signs it's too big for now:</p>
      <ul className="list-disc space-y-1.5 pl-5 marker:text-caramel-500">
        <li>It needs to connect to company systems (your CRM, ERP, HR system or email server).</li>
        <li>Several people need to log in and share the same data.</li>
        <li>It can only work with confidential data you can't take outside work systems.</li>
      </ul>
      <p className="mt-4">
        If your idea has a "too big" sign, don't drop it. Shrink it to a slice:
      </p>
      <div className="not-prose my-4 overflow-hidden rounded-2xl border border-espresso-900/10 bg-cream">
        <table className="w-full text-left text-sm">
          <thead className="bg-latte/60 text-espresso-700/70">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Too big</th>
              <th className="px-4 py-2.5 font-semibold">A slice you can build this week</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-espresso-900/10">
            <tr>
              <td className="px-4 py-2.5 text-espresso-800">"Automatically pull sales from our CRM and email a weekly report to the team"</td>
              <td className="px-4 py-2.5 text-espresso-800">"Turn the CSV I export from the CRM every Monday into a formatted summary I can paste into an email"</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-espresso-800">"A leave system for the whole department"</td>
              <td className="px-4 py-2.5 text-espresso-800">"A leave tracker for my team of six that only I update"</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-espresso-800">"An AI assistant that answers all customer emails"</td>
              <td className="px-4 py-2.5 text-espresso-800">"A tool where I paste one customer email and get a polite draft reply"</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The connected, shared, multi-user versions are exactly what Tier 2 teaches. For now, the slice is the goal.
      </p>

      <SectionEyebrow n="04" label="Step 2: Choose where to build" />
      <p>You now know two ways to build. Pick the one that fits:</p>
      <div className="not-prose my-4 overflow-hidden rounded-2xl border border-espresso-900/10 bg-cream">
        <table className="w-full text-left text-sm">
          <thead className="bg-latte/60 text-espresso-700/70">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Build in the browser (Module B) when…</th>
              <th className="px-4 py-2.5 font-semibold">Build a Python script (Module C) when…</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-espresso-900/10">
            <tr>
              <td className="px-4 py-2.5 text-espresso-800">You want to click, type into boxes and see results instantly</td>
              <td className="px-4 py-2.5 text-espresso-800">You're processing files sitting on your computer</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-espresso-800">Other people might use it through a link</td>
              <td className="px-4 py-2.5 text-espresso-800">You're handling many files, or the same job again and again</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-espresso-800">It needs AI inside it to read or write text</td>
              <td className="px-4 py-2.5 text-espresso-800">You want it to produce new files (Excel, CSV, images)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-espresso-800">Examples: a tracker, a calculator, a summariser, a reply drafter</td>
              <td className="px-4 py-2.5 text-espresso-800">Examples: merging files, renaming files, building a report from exports</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>If both seem to fit, choose the browser. It's quicker to get a first version working.</p>

      <SectionEyebrow n="05" label="Step 3: Write your one-page brief" />
      <p>
        This is the most important step, and the one most people skip. A clear brief is the difference between
        building something useful in an hour and going round in circles for a day. It's the intern brief from Chapter
        3, extended for a real project. Copy this template into a document or note and fill it in. Keep each answer
        short.
      </p>
      <CopyBlock label="Project brief template" mono>{BRIEF_TEMPLATE}</CopyBlock>
      <p>
        The "Version 1" and "Later" lines matter more than they look. The most common way projects fail, at every
        level from personal tools to big company systems, is trying to build everything at once. Tech teams call this{" "}
        <strong>scope creep</strong>. Your Later list is where good ideas wait without derailing you.
      </p>
      <Callout variant="tip">
        Stuck on the brief? Paste your Chapter 0 sentence into your AI chat and ask: "Interview me, one question at a
        time, to help me fill in this project brief." Then paste the template.
      </Callout>

      <SectionEyebrow n="06" label="Step 4: Make test data" />
      <p>Never build with real company data. Instead, ask AI to make realistic fake data in the same shape:</p>
      <CopyBlock label="Prompt for sample data">{TEST_DATA_PROMPT}</CopyBlock>
      <p>
        Then work out the right answer for your test case yourself, by hand or in Excel. Write it in your brief.
        This is your ₹4,800: the number that tells you whether your tool really works.
      </p>

      <SectionEyebrow n="07" label="Step 5: Build in slices" />
      <p>Don't paste your whole brief and ask for everything. Build it in slices, smallest working version first:</p>
      <ol className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-caramel-600">
        <li>Slice 1: the thinnest version that works from start to finish. Something goes in, the main thing happens, something comes out. No extras.</li>
        <li>Test it against your test case.</li>
        <li>Slice 2: add the next most important piece. Test again, including everything that worked before.</li>
        <li>Repeat until version 1 is done. Then stop, even if you have ideas. They go on the Later list.</li>
      </ol>
      <CopyBlock label="Prompt to start building">{SLICE_PROMPT}</CopyBlock>
      <p>
        Keep working versions. Each time a slice works, save a copy. For a script, copy the file and name it{" "}
        <code className="rounded bg-latte px-1">my_tool_v1.py</code>, <code className="rounded bg-latte px-1">my_tool_v2.py</code> and
        so on. For a browser tool, note which message in the chat produced the working version. If a later change
        breaks everything, you can always go back. (In Tier 2, you'll meet the proper tool for this, called Git.)
      </p>

      <SectionEyebrow n="08" label="Step 6: Test like a sceptic" />
      <p>When version 1 is done, try to break it. Go through this checklist:</p>
      <SafetyChecklist
        title="Test like a sceptic: run through this"
        items={[
          "The test case: does it give the right answer you worked out in Step 4?",
          "A second normal case: try different data you also know the answer to.",
          "Empty input: what happens with nothing in it?",
          "Messy input: wrong format, a missing value, a duplicate.",
          "The honesty test (if AI is inside your tool): give it input that's missing information. Does it say so, or make things up?",
          "Someone else tries it: watch a friend or colleague use it without helping them. Where do they hesitate?",
        ]}
      />
      <p>Every problem you find now is one your manager won't. Use the fix loop for each.</p>

      <SectionEyebrow n="09" label="Step 7: Before using it for real" />
      <p>Your tool works with test data. Before using it with real work data, check these:</p>
      <ul className="list-disc space-y-2 pl-5 marker:text-caramel-500">
        <li>
          <strong>AI chat vs your own computer.</strong> A Python script running on your laptop keeps the data on
          your laptop. A browser tool built in an AI chat, especially one with AI inside it, may send what you type
          to the AI service. Know which kind you've built.
        </li>
        <li>
          <strong>Company policy.</strong> Check your company's rules on AI tools and on running your own software
          with work data. If you're unsure, ask your manager or IT. Showing them a working tool built and tested
          with fake data usually makes that conversation go well.
        </li>
        <li>
          <strong>Personal and confidential data.</strong> Customer details, salaries, health information and
          similar data need extra care and usually explicit permission.
        </li>
        <li>
          <strong>Keep a manual check for a while.</strong> For the first few real uses, check the tool's result
          against doing it the old way, at least partly.
        </li>
      </ul>

      <SectionEyebrow n="10" label="Step 8: Show it to someone" />
      <p>
        A tool nobody sees helps only you. Showing it to your manager or team is how a personal tool becomes a team
        tool, and how people start to see you differently. Keep the demo to two minutes. Use this outline:
      </p>
      <CopyBlock label="Two-minute demo outline" mono>{DEMO_SCRIPT}</CopyBlock>
      <Callout variant="reassurance">
        You don't need to explain how it works unless someone asks. If they do, you can now explain it: what goes
        in, what happens, what comes out, and which parts AI built.
      </Callout>

      <SectionEyebrow n="11" label="What just happened" />
      <p>
        You didn't just build a tool. You followed the same path real software projects follow: define the problem,
        size it, write a brief, build in small pieces, test, check safety, and present it. The tools and teams get
        bigger in the real world, but the shape stays the same. Next time someone in a meeting talks about scope,
        requirements, test cases or an MVP, you'll know exactly what they mean, because you've done it.
      </p>

      <SectionEyebrow n="12" label="Starter projects" />
      <p>
        If you'd rather start from a ready-made idea, pick one of these. Each has a brief you can paste straight into
        Step 5, and a known answer to test against.
      </p>

      <p className="mt-6 font-display text-lg font-semibold text-espresso-950">Starter A: Team Leave Tracker (browser)</p>
      <CopyBlock label="Starter A brief" mono>{STARTER_A_BRIEF}</CopyBlock>

      <p className="mt-6 font-display text-lg font-semibold text-espresso-950">Starter B: Invoice Detail Extractor (browser, with AI inside)</p>
      <CopyBlock label="Starter B brief" mono>{STARTER_B_BRIEF}</CopyBlock>
      <Step n={1} title="Sample invoices for Starter B">
        Paste all three together into your tool, if you build this one.
      </Step>
      <CopyBlock label="Sample invoices">{STARTER_B_INVOICES}</CopyBlock>
      <p>
        Notice the third invoice doesn't state the amount before GST directly. A good tool works it out as ₹1,00,000
        (1,18,000 minus 18,000), and the "never guess" rule should still allow that, because it's calculated from the
        invoice, not invented. Check what yours does.
      </p>

      <p className="mt-6 font-display text-lg font-semibold text-espresso-950">Starter C: Weekly Status Report Generator (Python script)</p>
      <CopyBlock label="Starter C brief" mono>{STARTER_C_BRIEF}</CopyBlock>
      <DownloadButton filename="tasks.csv" content={STARTER_C_CSV} label="Download tasks.csv" />

      <SectionEyebrow n="13" label="Words you can now use" />
      <WordsTable
        words={[
          { word: "Brief", meaning: "A one-page description of what to build, before building it", sample: "Do we have a brief for this, or are we building blind?" },
          { word: "Scope creep", meaning: "A project quietly growing beyond what was agreed", sample: "That's scope creep, let's put it on the Later list." },
          { word: "Slice", meaning: "The smallest working version of one more piece of a build", sample: "Let's ship this slice before adding the export feature." },
          { word: "MVP", meaning: "Minimum viable product: the smallest version that's genuinely useful", sample: "Is this the MVP, or are we gold-plating it?" },
        ]}
      />

      <SectionEyebrow n="14" label="The Core course, complete" />
      <p>
        Look back at everything since Chapter 0: a calculator, a tracker, a data cleaner, a tool with real AI inside
        it, something published live, a real coding workshop, an automation script, reading code like a recipe, and
        now a tool you sized, scoped and built yourself for your own job. None of that was luck. It's a repeatable
        method now.
      </p>
      <ModuleCompleteBadge
        title="The Core course: complete"
        desc="12 chapters, three modules, built from first principles to independent automation. You're not behind anymore. You're a builder."
        next="Tier 2: Builder, unlocking once learners like you keep finishing this one"
      />
      <div className="not-prose my-6 flex flex-col items-center gap-3 rounded-3xl border border-caramel-300/50 bg-gradient-to-br from-caramel-100/60 to-cream px-6 py-8 text-center">
        <Award className="h-8 w-8 text-caramel-700" />
        <p className="font-display text-xl font-semibold text-espresso-950">There's a certificate waiting for you.</p>
        <p className="max-w-md text-[14.5px] text-espresso-700/80">
          Specific, verifiable, and yours to share: it names exactly what you built, not a vague participation badge.
        </p>
        <Link
          to="/certificate"
          className="mt-1 inline-flex items-center gap-2 rounded-xl bg-espresso-950 px-6 py-3 font-semibold text-caramel-100 transition hover:bg-espresso-800"
        >
          Get your certificate
        </Link>
      </div>

      <NextUpTeaser
        label="Tier 2: Builder"
        hook="One growing project, teaching how real software is put together: servers, databases, integrations and deployment."
        locked
      />

      <ChapterComplete
        chapterId={11}
        nextPath="/certificate"
        nextTitle="your certificate"
        quickCheck={{
          question: "What's the most common reason a personal software project fails?",
          options: ["The AI isn't smart enough", "Trying to build everything at once (scope creep)", "Not knowing how to code"],
          correctIndex: 1,
        }}
      />
    </ChapterShell>
  );
}
