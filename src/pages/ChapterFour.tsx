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
import { OsTabs } from "../components/demo/OsTabs";
import { chapterById } from "../lib/courseData";

const meta = chapterById(4)!;

const CODE = "rounded bg-latte px-1";

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
should still be there, including which ones are done.

Use the browser's localStorage so it remembers my data. Then give me
the complete code for this tool as a single HTML file, in one code
block, so I can save it on my computer. Keep the design exactly as it is.`;

const CONTINUE_PROMPT = `Your reply got cut off. Please give me the whole file again,
from the very first line to the very last, in one code block.`;

const EXPORT_PROMPT = `Please add an Export button that downloads my follow-ups as a file
to my computer, and an Import button that loads that file back in.
Keep everything else exactly the same, and give me the complete
updated HTML file again in one code block.`;

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
        quietly explains most "why doesn't this just work" moments you'll run into later. You'll also save your
        first tool as a file on your own computer, so it keeps working without the chat.
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
        Use these, or real ones from your week: <strong>Send revised proposal</strong>, Rahul, tomorrow;{" "}
        <strong>Share Q3 numbers</strong>, Priya, in 3 days; <strong>Book team lunch</strong>, Anita, next week.
        "Send revised proposal" should land at the top, since it's due soonest. Now tick it as done and watch it drop
        straight to the bottom. Try it below; it works the same way.
      </Step>
      <AppFrame label="follow-up-tracker (in the chat)">
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
        Your tool was writing on a whiteboard that gets wiped every night. Where data is kept so it isn't lost is
        called <strong>storage</strong>: the register in the cupboard.
      </p>
      <MemoryVsStorage />

      <SectionEyebrow n="05" label="Build it: give your tool a memory" />
      <p>
        Here's the catch. On Claude's free plan, the preview next to your chat can't keep data, so asking for
        storage there won't help. So you'll take your tool out of the chat and save it as a file on your computer.
        Your web browser can then keep the data for you, for free, with no Claude plan needed.
      </p>
      <p className="mt-3">
        Think of the chat as a tailor's trial room: perfect for trying things on, but you don't leave your clothes
        there. Today you take the tool home.
      </p>

      <Callout variant="worry">
        "Saving code files is where I break something." You won't. The file you're about to save is plain text,
        exactly like a note in Notepad. Nothing gets installed, nothing on your computer changes, and if anything
        goes wrong, you delete the file and save it again. The steps below say exactly what to click, for Windows
        and for Mac.
      </Callout>

      <Step n={4} title="Ask for the tool as one file">
        Go back to the chat with your tracker and paste this:
      </Step>
      <CopyBlock label="New requirement">{STORAGE_PROMPT}</CopyBlock>

      <Step n={5} title="Copy the whole file">
        Claude will reply with a long block of code. It might be in the chat, or in the panel where your preview
        was. Find the <strong>Copy</strong> button on that block and click it; that copies every line, so you don't
        need to select anything by hand. A complete file starts with{" "}
        <code className={CODE}>&lt;!DOCTYPE html&gt;</code> and ends with <code className={CODE}>&lt;/html&gt;</code>.
        If the reply stops before that, send this:
      </Step>
      <CopyBlock label="If the reply got cut off">{CONTINUE_PROMPT}</CopyBlock>

      <Step n={6} title="Save it as a .html file">
        First make a home for your tools: on your Desktop, create a new folder called{" "}
        <code className={CODE}>my-tools</code> (right-click the Desktop, then New → Folder on Windows, or New Folder
        on Mac). Then pick your computer below.
      </Step>
      <OsTabs
        windows={
          <ol className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-caramel-600">
            <li>Open <strong>Notepad</strong> (click Start, type Notepad, press Enter).</li>
            <li>Paste the code: Ctrl+V.</li>
            <li>Click <strong>File → Save as</strong>.</li>
            <li>On the left, choose <strong>Desktop</strong>, then open your <code className={CODE}>my-tools</code> folder.</li>
            <li>
              Set <strong>Save as type</strong> to <strong>All files (*.*)</strong>. This one matters: it stops
              Notepad adding .txt to the end of the name.
            </li>
            <li>In <strong>File name</strong>, type <code className={CODE}>follow-up-tracker.html</code></li>
            <li>Check that <strong>Encoding</strong> says <strong>UTF-8</strong> (it usually does already). This keeps the ₹ sign and other symbols looking right.</li>
            <li>Click <strong>Save</strong>.</li>
          </ol>
        }
        mac={
          <ol className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-caramel-600">
            <li>Open <strong>TextEdit</strong> (press Cmd+Space, type TextEdit, press Return), then click <strong>New Document</strong>.</li>
            <li>
              <strong>Before you paste</strong>, click <strong>Format → Make Plain Text</strong>. If you only see
              "Make Rich Text" in that menu, you're already in plain text. Skipping this step is the most common way
              the file breaks.
            </li>
            <li>Paste the code: Cmd+V.</li>
            <li>Click <strong>File → Save</strong>.</li>
            <li>In <strong>Save As</strong>, type <code className={CODE}>follow-up-tracker.html</code></li>
            <li>Choose your <code className={CODE}>my-tools</code> folder on the Desktop, then click <strong>Save</strong>.</li>
            <li>If TextEdit asks whether to use .html or .txt, click <strong>Use .html</strong>.</li>
          </ol>
        }
      />

      <Step n={7} title="Open it">
        Double-click <code className={CODE}>follow-up-tracker.html</code>. It opens in your web browser, looking just
        like it did in the chat. The address bar shows something starting with{" "}
        <code className={CODE}>file:///</code>: that's your browser saying "this page is a file on this computer,
        not a website." Chrome or Edge work best for this. If it opens in a different browser, right-click the file,
        choose <strong>Open with</strong> (on Mac, <strong>Open With</strong>), and pick Chrome or Edge.
      </Step>

      <Step n={8} title="Test it properly">
        Add the three follow-ups again and tick one off. Now close the browser tab completely. Double-click the file
        again. The version below remembers too; try refreshing this page for real, or click the button.
      </Step>
      <AppFrame label="file:///.../my-tools/follow-up-tracker.html">
        <FollowUpTracker persist />
      </AppFrame>

      <Checkpoint>
        After closing and reopening the file, all three follow-ups are still there, with the same one ticked as
        done. Your tool now has a memory.
      </Checkpoint>

      <Callout variant="hint" title="If it opened as a page of code, or not at all">
        This is the snag most people hit the first time, and it takes a minute to fix. If double-clicking opens
        Notepad or TextEdit instead of your browser, or you see a wall of code on the page, the file didn't save
        as .html.
        <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-caramel-500">
          <li>
            <strong>Windows:</strong> your computer may be hiding the end of file names, so the file is secretly
            called <code className={CODE}>follow-up-tracker.html.txt</code>. Open File Explorer, click{" "}
            <strong>View → Show → File name extensions</strong> (on Windows 10: the <strong>View</strong> tab, then
            tick <strong>File name extensions</strong>). Now you can see the real name. Right-click the file,
            choose Rename, delete the <code className={CODE}>.txt</code> at the end, and click Yes when Windows asks
            if you're sure.
          </li>
          <li>
            <strong>Mac:</strong> if the browser shows your code as text on the page instead of the tool, the file
            was saved as rich text. Delete it, open a new TextEdit document, do{" "}
            <strong>Format → Make Plain Text</strong> first, then paste and save again. To see real file names, open
            Finder, click <strong>Finder → Settings → Advanced</strong> (Preferences on older Macs), and tick{" "}
            <strong>Show all filename extensions</strong>.
          </li>
        </ul>
      </Callout>

      <SectionEyebrow n="06" label="Where your data lives now" />
      <p>
        Here's the part that surprises people: your follow-ups are <strong>not</strong> inside the file. The file is
        the code. Your browser keeps the data in its own storage area for that file, on this computer. The name of
        that storage is <strong>localStorage</strong>, which is why it was in your prompt. It's free, private to
        you, and nothing is sent anywhere.
      </p>
      <p className="mt-3">That also tells you exactly when the data won't be there:</p>
      <ul className="list-disc space-y-1.5 pl-5 marker:text-caramel-500">
        <li>On a different computer, or in a different browser on this computer.</li>
        <li>If you clear your browser's history and site data (often called "browsing data" or "cookies and site data").</li>
        <li>In a private or incognito window, which forgets everything when you close it.</li>
        <li>Sometimes, if you move or rename the file: some browsers then treat it as a new page with an empty list. Move it back and your data returns.</li>
      </ul>
      <p className="mt-3">
        That's why a backup still matters. Ask for an Export button, so you can keep a copy of your data as a file.
      </p>
      <CopyBlock label="Add a backup">{EXPORT_PROMPT}</CopyBlock>
      <Step n={9} title="Save the new version over the old one">
        Copy the new file. Then save it exactly as you did in Step 6, starting with a fresh Notepad window or a new
        TextEdit document (on a Mac, Make Plain Text first). Use the same name,{" "}
        <code className={CODE}>follow-up-tracker.html</code>, in the same <code className={CODE}>my-tools</code>{" "}
        folder. When your computer says the file already exists, choose <strong>Yes</strong> (Windows) or{" "}
        <strong>Replace</strong> (Mac). Now double-click it.
      </Step>
      <Checkpoint>
        Your three follow-ups are still there, even though you replaced all of the code. That's code and data being
        separate, happening right in front of you. Click Export: a file lands in your Downloads folder. That file is
        your backup.
      </Checkpoint>
      <p>
        Every future change works the same way: ask in the chat, copy the whole new file, save it over the old one.
        Your data stays put.
      </p>

      <SectionEyebrow n="07" label="What you can skip" />
      <p>
        How localStorage works inside the browser, how much it can hold, and what format the data is saved in.
        Developers choose between many types of storage; you'll meet the most important one, a database, much later.
        For now, you only need one question for any tool: <strong>"If I close this, will my data still be here?"</strong>
      </p>

      <Troubleshooting
        items={[
          {
            problem: "Double-clicking opens Notepad or TextEdit, not my browser.",
            answer: "The file probably ended up as follow-up-tracker.html.txt, or saved as rich text on a Mac. See the box after the checkpoint in section 05: show file extensions, then rename the file or save it again.",
          },
          {
            problem: "The page is blank, or only part of the tool shows.",
            answer: <>The code was probably cut short. Open the file in Notepad or TextEdit and check the last line is <code className={CODE}>&lt;/html&gt;</code>. If not, ask: <em>"Please give me the whole file again, in one code block."</em> Paste over everything and save.</>,
          },
          {
            problem: "The ₹ sign or other symbols look like strange characters.",
            answer: "On Windows, save again with Encoding set to UTF-8. On a Mac, check the file was made plain text before you pasted.",
          },
          {
            problem: "My follow-ups disappear when I reopen the file.",
            answer: <>First check: did you open the same file, in the same browser, not in a private window? If you're using Safari or Firefox, try Chrome or Edge; browsers treat files on your computer slightly differently, and Chrome and Edge are the most dependable for this. Still empty? Use the fix loop: <em>"I expected: my follow-ups to still be there after reopening the file. What happened instead: the list was empty. Please make sure it saves to localStorage, then give me the whole file again."</em></>,
          },
          {
            problem: "My follow-ups vanished after I moved or renamed the file.",
            answer: "Move it back to where it was, with the same name, and they should return. If you need it somewhere new, Export first, move the file, then Import.",
          },
          {
            problem: "My Import button doesn't do anything.",
            answer: "Make sure you're choosing the file you exported, usually in your Downloads folder. If it still fails, copy any message you see and use the fix loop.",
          },
          {
            problem: "The dates show in a strange format, like 2026-10-17.",
            answer: <>That's a common computer date format. Ask: <em>"Please show dates in Indian format, like 17 Oct 2026."</em></>,
          },
          {
            problem: "The AI rebuilt the tool and it looks completely different.",
            answer: <>Ask: <em>"Keep the previous design exactly, and only add the saving feature."</em></>,
          },
        ]}
      />

      <SectionEyebrow n="08" label="Try it yourself" />
      <TryItYourself>
        Add two features to your tracker, one at a time, testing each before moving on: show overdue follow-ups in
        red, and add a filter so you can see only one person's follow-ups. Each time, ask for the whole file again
        and save it over the old one. Try both below.
      </TryItYourself>
      <TryTrackerFeatureDemo />
      <Callout variant="reassurance">
        Notice what you're doing now: adding features one at a time and testing after each. That's exactly how
        professional teams work. Re-checking old features after a new one is added is called{" "}
        <strong>regression testing</strong>, but you don't need to remember the word, just the habit.
      </Callout>

      <SectionEyebrow n="09" label="Words you can now use" />
      <WordsTable
        words={[
          { word: "Data", meaning: "The information a tool works with or keeps", sample: "Is the tool the problem, or is the data wrong?" },
          { word: "Storage", meaning: "Where data is kept so it isn't lost", sample: "Where is this data stored, and who can access it?" },
          { word: "Requirement", meaning: "Something a tool must do", sample: "Was 'export to Excel' in the original requirements?" },
          { word: "Feature", meaning: "A specific thing a tool can do", sample: "Can we park that feature for version two?" },
          { word: "File extension", meaning: "The ending of a file name, like .html or .csv, that tells the computer what kind of file it is", sample: "Can you send it as a .csv rather than .xlsx?" },
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
