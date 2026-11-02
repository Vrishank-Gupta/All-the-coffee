import { BuilderHabit } from "../components/chapter/BuilderHabit";
import { ChapterShell } from "../components/chapter/ChapterShell";
import { SectionEyebrow } from "../components/chapter/SectionEyebrow";
import { Callout } from "../components/chapter/Callout";
import { CopyBlock } from "../components/chapter/CopyBlock";
import { Step } from "../components/chapter/Step";
import { Checkpoint } from "../components/chapter/Checkpoint";
import { Troubleshooting } from "../components/chapter/Troubleshooting";
import { TryItYourself } from "../components/chapter/TryItYourself";
import { WordsTable } from "../components/chapter/WordsTable";
import { CHAPTER_WORDS } from "../lib/glossary";
import { ChapterComplete } from "../components/chapter/ChapterComplete";
import { NextUpTeaser } from "../components/chapter/NextUpTeaser";
import { StaticDownloadLink } from "../components/chapter/StaticDownloadLink";
import { OsProvider, OsToggle, OsCommand } from "../components/chapter/OsToggle";
import { LibraryAppStore } from "../components/diagrams/LibraryAppStore";
import { DownloadButton } from "../components/chapter/DownloadButton";
import { OfferLetters } from "../components/tools/OfferLetters";
import { SAMPLE_JOINERS_CSV, DEFAULT_TEMPLATE } from "../lib/tools/letters";
import { chapterById } from "../lib/courseData";

const meta = chapterById(9)!;

const LETTERS_PROMPT = `Who it's for: I work in HR. Every month I write offer letters for new
joiners by hand, copying names, dates and salaries from a spreadsheet.

What it does: write a Python script called make_letters.py. Next to it
are two files: joiners.csv (one row per joiner, with the columns name,
designation, department, location, manager, joining_date, ctc) and
letter_template.txt (my letter, with blanks in curly brackets, like
{designation}). For each joiner, the script fills in the blanks and saves
a Word file in a folder called letters, named like
Offer_Letter_Priya_Nair.docx.
- {first_name} is the first word of their name
- {joining_date} is written like 1 December 2026
- {ctc} is the CTC in rupees, and {ctc_words} is the same amount in words
- {letter_date} is today's date, written like the joining date
- {signatory} is "HR Team" and {company} is "[my company]"
At the end it prints how many letters it made.

What good looks like: I run one command and a letters folder appears,
with a Word file for each joiner.

What to avoid: keep it simple, with a short plain-English comment above
each part. Tell me exactly which libraries I need and the exact command
to install them.`;

const LETTERS_FIX_INR = `I expected: Priya's letter to say ₹12,00,000 (Rupees Twelve Lakh Only).
What happened instead: [what her letter says].
Error message: none.

These letters are for India. Write amounts with Indian commas
(12,00,000 and 1,25,00,000) and in words using lakh and crore, like
"Rupees Twelve Lakh Fifty Thousand Only". Write your own small function
for this and explain how it works.`;

const LETTERS_FIX_BLANK = `I expected: 7 letters, because Rohan Das has no designation.
What happened instead: 8 letters, and Rohan's says "the position of in our
Marketing team".
Error message: none.

If any cell in a joiner's row is empty, make no letter for them, and
print which joiner was skipped and which column is empty. Explain the
change, then give me the whole script again.`;

const PROMPT = `Who it's for: I'm a beginner using VS Code and Python on [Windows/Mac].
Every year I combine 12 monthly sales files by hand.

What it does: write a Python script called merge_sales.py. Next to the
script is a folder called "data" with 12 Excel files named
sales_2026_01.xlsx to sales_2026_12.xlsx. Each file has the columns
Region, Salesperson and Amount. The script should:
- combine all 12 files into one table
- add a Month column, taken from each file's name
- save the result as combined_sales.xlsx with two sheets:
  "All sales" and "Totals by region"
- print in the terminal how many rows were combined, and the total
  for each region

What good looks like: I run one command and combined_sales.xlsx
appears in the same folder as the script.

What to avoid: keep it simple. Put a short plain-English comment above
each part of the code. Tell me exactly which libraries I need and the
exact command to install them.`;

const FIX_PROMPT = `I expected: 96 rows and a grand total of ₹43,92,000.
What happened instead: [paste the error, or your totals].

I found the cause: in sales_2026_07.xlsx the column is called "Amt"
instead of "Amount". Please explain in simple words why this broke
the script, then update the script so it treats "Amt" as "Amount".
Also, if any file is missing the Amount column under any name, the
script should stop and tell me which file has the problem.`;

export default function ChapterNine() {
  return (
    <ChapterShell meta={meta}>
      <OsProvider>
        <SectionEyebrow n="01" label="Where you are" />
        <p>
          Chapter 9 of 12. Imagine it's year-end. You have 12 monthly sales files, one for each month, and your
          manager wants them combined into one sheet with totals by region. By hand, that's an afternoon of opening
          files, copying, pasting and checking.
        </p>
        <p className="mt-3">
          Today you'll build a Python script that does it in about two seconds. And next year, it'll do it again with
          one command. There's an optional second build for HR at the end: every offer letter from one template.
        </p>

        <Callout variant="worry">
          "In the browser, the AI did everything. Now I have to handle files and commands myself." You'll handle a
          few more steps, yes: saving a file, typing two commands. But you did both in Chapter 8 already. The AI
          still writes all the code. You're still the one who describes, checks and fixes, exactly like before.
        </Callout>

        <SectionEyebrow n="02" label="Set up the project" />
        <OsToggle />
        <Callout variant="hint">
          Had to use <code className="rounded bg-latte px-1">py</code> instead of{" "}
          <code className="rounded bg-latte px-1">python</code> in Chapter 8? Keep swapping in{" "}
          <code className="rounded bg-latte px-1">py</code> everywhere you see{" "}
          <code className="rounded bg-latte px-1">python</code> below, same as before.
        </Callout>
        <Step n={1} title="Make a folder for this project">
          Inside your <code className="rounded bg-latte px-1">ai-course</code> folder, create a new folder called{" "}
          <code className="rounded bg-latte px-1">sales-merge</code>.
        </Step>
        <Step n={2} title="Get the sample files">
          Download the file below and unzip it. You'll get a folder called <code className="rounded bg-latte px-1">data</code>{" "}
          containing 12 Excel files, from <code className="rounded bg-latte px-1">sales_2026_01.xlsx</code> to{" "}
          <code className="rounded bg-latte px-1">sales_2026_12.xlsx</code>. Move that <code className="rounded bg-latte px-1">data</code>{" "}
          folder into <code className="rounded bg-latte px-1">sales-merge</code>.
        </Step>
        <StaticDownloadLink href="/downloads/monthly-sales.zip" label="Download monthly-sales.zip" />
        <Callout variant="tip">
          How to unzip: on Windows, right-click the file and choose Extract All. On Mac, double-click it. On
          Windows, Extract All puts the <code className="rounded bg-latte px-1">data</code> folder inside a folder
          called <code className="rounded bg-latte px-1">monthly-sales</code>. Move the{" "}
          <code className="rounded bg-latte px-1">data</code> folder itself.
        </Callout>
        <Step n={3} title="Look inside a couple of files">
          Open <code className="rounded bg-latte px-1">sales_2026_01.xlsx</code> in Excel. You'll see three columns:
          Region, Salesperson and Amount, with eight rows. Every month's file looks like this. Close Excel when
          you're done looking: a script can't reliably write to a file that's still open in Excel. On Windows
          you'll get a "Permission denied" error; on Mac, Excel may just keep showing the old version.
        </Step>
        <Step n={4} title="Open the project in VS Code">
          In VS Code, choose <strong>File → Open Folder</strong> and select{" "}
          <code className="rounded bg-latte px-1">sales-merge</code> (not{" "}
          <code className="rounded bg-latte px-1">ai-course</code> this time). You should see the{" "}
          <code className="rounded bg-latte px-1">data</code> folder in the left sidebar.
        </Step>

        <SectionEyebrow n="03" label="Build it" />
        <Step n={5} title="Ask your AI chat for the script">
          Open your AI chat in the browser, start a new chat, and paste this. Replace{" "}
          <code className="rounded bg-latte px-1">[Windows/Mac]</code> with your system.
        </Step>
        <CopyBlock label="Prompt for Chapter 9">{PROMPT}</CopyBlock>
        <Step n={6} title="Create the script file">
          In VS Code, click <strong>File → New File</strong>, name it{" "}
          <code className="rounded bg-latte px-1">merge_sales.py</code>, and save it in{" "}
          <code className="rounded bg-latte px-1">sales-merge</code> (next to the{" "}
          <code className="rounded bg-latte px-1">data</code> folder, not inside it). Copy the code from your AI
          chat, paste it into the file, and save.
        </Step>

        <SectionEyebrow n="04" label="Libraries: apps for your code" />
        <p>
          Your AI will have said you need to install something, probably <code className="rounded bg-latte px-1">pandas</code>{" "}
          and <code className="rounded bg-latte px-1">openpyxl</code>. These are <strong>libraries</strong>:
          ready-made code written by other people, which your script can use.
        </p>
        <p className="mt-3">
          Think of them like apps on your phone. Your phone can't edit photos well out of the box, so you install a
          photo app. Python can't read Excel files out of the box, so you install a library that can.{" "}
          <code className="rounded bg-latte px-1">pandas</code> is a hugely popular library for working with tables
          of data, and <code className="rounded bg-latte px-1">openpyxl</code> lets Python read and write Excel
          files. The tool that installs libraries is called <code className="rounded bg-latte px-1">pip</code>.
          Think of it as the app store for Python.
        </p>
        <LibraryAppStore />

        <Step n={7} title="Install the libraries">
          Open the terminal in VS Code (<strong>Terminal → New Terminal</strong>) and type:
        </Step>
        <p>
          <OsCommand windows="python -m pip install pandas openpyxl" mac="python3 -m pip install pandas openpyxl" />
        </p>
        <p className="mt-2">
          You'll see a lot of text scroll past as files download. Wait until the prompt line comes back. Somewhere
          near the end, it should say <code className="rounded bg-latte px-1">Successfully installed</code>.
        </p>
        <Callout variant="hint">
          You only need to do this once per computer. Next time you need pandas, it's already there.
        </Callout>

        <Step n={8} title="Run your script">
          <p>
            <OsCommand windows="python merge_sales.py" mac="python3 merge_sales.py" />
          </p>
        </Step>

        <SectionEyebrow n="05" label="Checkpoint" />
        <p>Here are the correct results. Compare carefully.</p>
        <div className="not-prose my-4 overflow-hidden rounded-2xl border border-espresso-900/10 bg-cream">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-espresso-900/10">
              <tr>
                <td className="px-4 py-2.5 font-semibold text-espresso-900">Rows combined</td>
                <td className="px-4 py-2.5 text-espresso-800">96</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-espresso-900">North</td>
                <td className="px-4 py-2.5 text-espresso-800">₹12,78,000</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-espresso-900">East</td>
                <td className="px-4 py-2.5 text-espresso-800">₹11,58,000</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-espresso-900">South</td>
                <td className="px-4 py-2.5 text-espresso-800">₹10,38,000</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-espresso-900">West</td>
                <td className="px-4 py-2.5 text-espresso-800">₹9,18,000</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-semibold text-espresso-900">Grand total</td>
                <td className="px-4 py-2.5 font-semibold text-caramel-700">₹43,92,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Did yours match? Most people's won't, the first time. You'll probably see one of these two things: an error
          that mentions <code className="rounded bg-latte px-1">'Amount'</code>, or totals that look reasonable but
          are too low, adding up to ₹40,24,000 instead of ₹43,92,000. Both come from the same hidden problem. Time to
          investigate.
        </p>
        <p className="mt-3">
          If yours matched first time, your AI was cautious. Still open the July file and see what it protected you
          from.
        </p>

        <SectionEyebrow n="06" label="Planned failure: the July file" />
        <p>
          Open <code className="rounded bg-latte px-1">sales_2026_07.xlsx</code> from the{" "}
          <code className="rounded bg-latte px-1">data</code> folder in Excel. Look at the column headings closely.
          Someone typed <code className="rounded bg-latte px-1">Amt</code> instead of{" "}
          <code className="rounded bg-latte px-1">Amount</code>. One tiny difference in one file out of twelve. This
          is exactly the kind of thing that happens in real offices, where different people prepare different files.
        </p>
        <p className="mt-3">
          To you, "Amt" and "Amount" obviously mean the same thing. To the script, they're completely different
          words. So either it stopped with an error, or it quietly skipped July's amounts and gave you totals that
          are wrong by ₹3,68,000 without any warning. The second outcome is the dangerous one, and it's why you always
          check against a known answer.
        </p>

        <SectionEyebrow n="07" label="Fix it: data or code?" />
        <p>There are two ways to fix this, and choosing between them is a real-world skill:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-caramel-500">
          <li>
            <strong>Fix the data:</strong> open the July file, change "Amt" to "Amount", save. Quick, but next year
            someone might type "Amt" again, or "Amnt", or "Sales".
          </li>
          <li>
            <strong>Fix the code:</strong> make the script handle both names. A bit more work now, but the tool
            becomes sturdier.
          </li>
        </ul>
        <p className="mt-3">
          If the files come from other people every year, fixing the code is usually smarter. Use the fix loop in
          your AI chat:
        </p>
        <CopyBlock label="Fix prompt">{FIX_PROMPT}</CopyBlock>
        <p>
          Replace the code in <code className="rounded bg-latte px-1">merge_sales.py</code> with the new version
          (select all with Ctrl + A or Cmd + A, then paste), save, and run it again.
        </p>
        <Callout variant="warning">
          Close <code className="rounded bg-latte px-1">combined_sales.xlsx</code> in Excel before you run the script
          again. If the file is open, the script can't overwrite it: on Windows you'll get a "Permission denied"
          error; on Mac, Excel may just keep showing the old version.
        </Callout>

        <Checkpoint title="Checkpoint, again">
          Now you should see 96 rows and a grand total of ₹43,92,000, with the regional totals matching the table
          above. Open <code className="rounded bg-latte px-1">combined_sales.xlsx</code> and check both sheets.
          Notice the last part of your fix prompt: you didn't just fix today's problem, you told the script to warn
          you clearly if a similar problem happens in future. That's how experienced builders think.
        </Checkpoint>

        <SectionEyebrow n="08" label="What just happened" />
        <p>
          You built an <strong>automation</strong>: a script that does a repetitive task for you. Count what it did:
          opened 12 files, read 96 rows, added a Month column, combined everything, calculated four totals, and
          wrote a new Excel file with two sheets. In about two seconds.
        </p>
        <p className="mt-3">
          Next year, you drop 12 new files into the <code className="rounded bg-latte px-1">data</code> folder,
          change "2026" to "2027" in your prompt or script, and run one command. That's the real value: not saving an
          afternoon once, but saving it every time.
        </p>
        <p className="mt-3">
          This is why Python is so popular in offices. There are libraries for Excel, PDFs, Word documents, emails,
          charts and much more. If a computer task is repetitive, there's a good chance a short Python script can do
          it.
        </p>

        <SectionEyebrow n="09" label="Optional build: every offer letter, one command" />
        <p>
          Same skill, HR's version. One template, a list of joiners, and a Word file for each person, with names,
          dates and salaries filled in. It's the same pattern as the sales merge (read a file, do something for each
          row, save the results), so it should feel familiar. About 25 minutes.
        </p>
        <Step n={9} title="Set up the project">
          Make a new folder called <code className="rounded bg-latte px-1">offer-letters</code> next to{" "}
          <code className="rounded bg-latte px-1">sales-merge</code>, and save these two files into it. The joiners
          are made up.
        </Step>
        <div className="not-prose flex flex-wrap gap-3">
          <DownloadButton filename="joiners.csv" content={SAMPLE_JOINERS_CSV + "\n"} />
          <DownloadButton filename="letter_template.txt" content={DEFAULT_TEMPLATE + "\n"} />
        </div>
        <Step n={10} title="Ask your AI chat for the script">
          Open <code className="rounded bg-latte px-1">offer-letters</code> in VS Code (File → Open Folder), then
          paste this into a new chat. Replace <code className="rounded bg-latte px-1">[my company]</code> with any
          name.
        </Step>
        <CopyBlock label="Offer letters prompt">{LETTERS_PROMPT}</CopyBlock>
        <Step n={11} title="Create make_letters.py, install the library, run it">
          Paste the code into a new file called <code className="rounded bg-latte px-1">make_letters.py</code> in{" "}
          <code className="rounded bg-latte px-1">offer-letters</code>. Your AI will tell you to install a library that writes
          Word files, called <code className="rounded bg-latte px-1">python-docx</code>:
        </Step>
        <p>
          <OsCommand windows="python -m pip install python-docx" mac="python3 -m pip install python-docx" />
        </p>
        <p className="mt-2">Then run it:</p>
        <p>
          <OsCommand windows="python make_letters.py" mac="python3 make_letters.py" />
        </p>
        <p className="mt-2">
          If it stops with an error about <code className="rounded bg-latte px-1">12,50,000</code>, that's Arjun's
          CTC, which is written with commas in the CSV. Paste the error into the fix loop, like you did with July.
        </p>
        <Checkpoint>
          Known answer: <strong>7 letters</strong> in the <code className="rounded bg-latte px-1">letters</code>{" "}
          folder, and a message saying Rohan Das was skipped because his designation is empty. Open Priya's
          letter: her CTC reads <strong>₹12,00,000 (Rupees Twelve Lakh Only)</strong>. Arjun's reads{" "}
          <strong>₹12,50,000 (Rupees Twelve Lakh Fifty Thousand Only)</strong>, and his joining date reads 1
          December 2026.
        </Checkpoint>
        <p>
          <strong>Trap 1: the wrong commas.</strong> Python's usual way of adding commas writes{" "}
          <code className="rounded bg-latte px-1">1,200,000</code>, the international style, and AI often writes the
          words as "One Million Two Hundred Thousand". Both are correct somewhere, just not on an Indian offer letter.
        </p>
        <CopyBlock label="Fix trap 1">{LETTERS_FIX_INR}</CopyBlock>
        <p className="mt-3">
          <strong>Trap 2: the letter that should never go out.</strong> If you got 8 letters, open Rohan's. It
          offers him "the position of in our Marketing team", because his designation is blank in the CSV. Nothing
          crashed, and a broken letter is sitting in the folder, ready to email. Tell the script to refuse:
        </p>
        <CopyBlock label="Fix trap 2">{LETTERS_FIX_BLANK}</CopyBlock>
        <p>
          There's a browser version too, which previews every letter and saves them all as one PDF. Try it below with
          the same joiners, or free at{" "}
          <a href="/tools/offer-letters" className="font-semibold text-caramel-700 underline">allthecoffee.in/tools/offer-letters</a>.
          The Python version is the one that makes a separate Word file per person.
        </p>
        <div className="my-5">
          <OfferLetters />
        </div>

        <BuilderHabit steps={["answer"]}>

          96 rows and ₹43,92,000 were the known answer, and the July file was trap 11 in the catalogue: one file is different from the rest.

        </BuilderHabit>


        <SectionEyebrow n="10" label="What you can skip" />
        <p>
          How pandas works inside, the many ways to install Python libraries, and "virtual environments" (a way
          developers keep different projects' libraries separate). You'll hear that last term from tech teams. For
          personal scripts like this, you don't need it.
        </p>

        <Troubleshooting
          items={[
            {
              problem: "\"No module named pandas\" (or openpyxl).",
              answer: "The library isn't installed, or was installed for a different Python. Run the install command from Step 7 again, using exactly the same word (python, python3 or py) that you use to run your script.",
            },
            {
              problem: '"No such file or directory", "The system cannot find the path specified", or "No objects to concatenate"',
              answer: "Python can't find the folder. Check that VS Code has sales-merge open (not ai-course), and that data sits directly inside it, next to merge_sales.py.",
            },
            {
              problem: '"Permission denied" when saving combined_sales.xlsx.',
              answer: "Close the file in Excel and run the script again.",
            },
            {
              problem: "An error mentions a file whose name starts with ~$",
              answer: "That's a temporary lock file Excel creates while a file is open. Close Excel and run the script again.",
            },
            {
              problem: "pip shows lots of red or yellow text.",
              answer: 'Yellow "WARNING" lines are usually harmless; look for "Successfully installed" near the end. If you see "ERROR", copy the last few lines and use the fix loop.',
            },
            {
              problem: "The totals are still wrong after the fix.",
              answer: "Use the fix loop and include your exact numbers next to the correct ones. Ask the AI to print the total for each month so you can see which month is off.",
            },
          ]}
        />

        <SectionEyebrow n="11" label="Try it yourself" />
        <TryItYourself>
          <p className="mb-2">
            1. Ask for a third sheet: <em>"Add a sheet called 'Totals by month' showing the total sales for each
            month."</em> (Check: January is ₹3,44,000 and December is ₹3,88,000.)
          </p>
          <p className="mb-2">
            2. Ask for a chart: <em>"Also save a bar chart of the totals by region as region_totals.png."</em> The AI
            will probably ask you to install another library, <code className="rounded bg-latte px-1">matplotlib</code>.
            You know how to do that now.
          </p>
          <p>
            3. If you turned on GitHub Copilot in VS Code in Chapter 8, open its chat and use it for exercise 2
            instead of the browser chat. Notice how it can see and change your file directly.
          </p>
        </TryItYourself>

        <SectionEyebrow n="12" label="Words you can now use" />
        <WordsTable words={CHAPTER_WORDS[9]} />

        <NextUpTeaser
          label="Chapter 10: Reading code like a recipe"
          hook="You'll open up a script and learn to read it like a recipe, not to write code from memory, but to recognise what each part is doing."
        />

        <ChapterComplete
          chapterId={9}
          nextPath="/chapter/10"
          nextTitle="Chapter 10: Reading code like a recipe"
          quickCheck={{
            question: "Why did the script's totals come out wrong before you fixed anything?",
            options: ["Python was installed incorrectly", "One file used \"Amt\" instead of \"Amount\"", "There were too many files"],
            correctIndex: 1,
          }}
        />
      </OsProvider>
    </ChapterShell>
  );
}
