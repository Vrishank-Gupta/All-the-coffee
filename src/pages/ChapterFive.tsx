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
import { DownloadButton } from "../components/chapter/DownloadButton";
import { ChapterComplete } from "../components/chapter/ChapterComplete";
import { NextUpTeaser } from "../components/chapter/NextUpTeaser";
import { FileFormatCompare } from "../components/diagrams/FileFormatCompare";
import { DataCleanerDemo } from "../components/demo/DataCleanerDemo";
import { GstReconcilerDemo } from "../components/demo/GstReconcilerDemo";
import { MESSY_SALES_CSV } from "../lib/messySales";
import { PURCHASE_REGISTER_CSV, GSTR_2B_CSV } from "../lib/gstSample";
import { chapterById } from "../lib/courseData";

const meta = chapterById(5)!;

const CLEANER_PROMPT = `Who it's for: I often receive messy sales spreadsheets as CSV files and
spend hours cleaning them by hand.

What it does: I upload a CSV file. The tool cleans it by:
- removing completely blank rows
- removing extra spaces at the start or end of any value
- writing names and regions with a capital first letter (Priya Sharma, North)
- turning amounts into plain numbers (62,000 becomes 62000)
- writing all dates in one format, like 03 Apr 2026
- removing duplicate rows, after cleaning

It then shows me the cleaned data as a table, tells me how many rows
went in, how many came out, and why rows were removed. It also shows
the total amount and the total for each region. Finally, it lets me
download the clean file as a CSV.

What good looks like: "RAHUL VERMA" and "rahul verma" with the same
details end up as one row called Rahul Verma.

What to avoid: never change the actual amounts or the meaning of the data.`;

const DATE_FIX_PROMPT = `I expected: 10 rows out, with Priya's date as 03 Apr 2026.
What happened instead: [your row count], and Priya's date shows as [what you see].
Error message: none.

The dates in my file are Indian style: day first, then month.
03/04/2026 means 3 April 2026. Please explain what went wrong, then fix it.`;

const RECON_PROMPT = `Who it's for: I work in accounts. Every month I check our purchase
register against GSTR-2B from the GST portal, by hand, with VLOOKUP.

What it does: I upload two CSV files: purchase-register.csv (our books)
and gstr-2b.csv (what our suppliers reported). The tool matches invoices
using the supplier's GSTIN and the invoice number, and puts every invoice
in one of four groups:
- Matched: in both files, with the same tax
- Amount mismatch: in both files, but the tax is different
  (show both amounts)
- Missing in 2B: only in our books
- Only in 2B: the supplier reported it, but it's not in our books
Tax means IGST + CGST + SGST added together.

It shows how many invoices are in each group, and the tax credit at risk:
the tax on invoices missing in 2B, plus the shortfall wherever 2B shows
less tax than our books. I can click a group to see only those invoices,
and download the result as a CSV.

What good looks like: every invoice from both files appears in exactly
one group.

What to avoid: never change any amounts, and never count an invoice twice.`;

const RECON_FIX_PROMPT = `I expected: 10 matched, 2 amount mismatches, 2 missing in 2B,
1 only in 2B.
What happened instead: [your four numbers].
Error message: none.

Look at Deccan Logistics: our books say INV/023 and 2B says INV-23.
That's the same invoice. Please match invoice numbers and GSTINs
ignoring capital letters, spaces, separators like / and -, and zeros at
the start of a number, so INV/023, inv-23 and INV 0023 all match.
Explain what went wrong, then fix it.`;

export default function ChapterFive() {
  return (
    <ChapterShell meta={meta}>
      <SectionEyebrow n="01" label="Where you are" />
      <p>
        Almost everyone in an office has received a spreadsheet like this: names in random capitals, extra spaces,
        dates written six different ways, the same row twice. Today you'll build a <strong>Data Cleaner</strong>{" "}
        that fixes all of that in one click.
      </p>
      <p className="mt-3">
        You'll also learn why computers are so fussy about formats, and catch one of the sneakiest problems in
        office data. If you work in finance or accounts, there's an optional second build at the end: a GSTR-2B
        reconciler.
      </p>

      <Callout variant="worry">
        "I'm not a numbers person. Data sounds technical." You don't need to be. If you've ever tidied up a
        spreadsheet by hand, you already understand everything this tool will do. The only difference is that it'll
        take seconds instead of an afternoon.
      </Callout>

      <Callout variant="warning">
        Never upload real company data, customer details or anything confidential to an AI tool unless your company
        has said it's allowed. Use the sample file in this chapter. When you use this tool for real, check your
        company's policy first.
      </Callout>

      <SectionEyebrow n="02" label="Meet the messy file" />
      <Step n={1} title="Get the sample file">
        Download <code className="rounded bg-latte px-1">messy-sales.csv</code>, or copy the text below.
      </Step>
      <DownloadButton filename="messy-sales.csv" content={MESSY_SALES_CSV} />
      <CopyBlock label="messy-sales.csv" mono>
        {MESSY_SALES_CSV}
      </CopyBlock>

      <Step n={2} title="Open it two ways">
        First, open it in Excel or Google Sheets. It looks like a normal (messy) spreadsheet. Then open it in a
        plain text app: Notepad on Windows, TextEdit on Mac. Now it looks like the text above. Close Excel without
        saving: if you save, Excel quietly rewrites the dates and the 62,000, and your results won't match the
        checkpoint later.
      </Step>

      <SectionEyebrow n="03" label="What just happened: what a CSV really is" />
      <p>
        That's the whole secret of a CSV file: it's just text. CSV stands for "comma-separated values." Each line is
        a row, and commas separate the columns. That's why the amount "62,000" has quote marks around it. Without
        them, the computer would think the comma started a new column.
      </p>
      <FileFormatCompare />
      <p>
        When someone at work says "just export it as a CSV," this is what they mean: strip away the formatting, keep
        only the data, in a format almost every system can read.
      </p>
      <p className="mt-3">
        Now look at the mess. Can you spot all the problems? There are at least six: inconsistent capitals, extra
        spaces, a blank row, duplicates, an amount with a comma, and dates written in six different ways.
      </p>

      <SectionEyebrow n="04" label="Build it" />
      <Step n={3} title="Start a new chat and paste this prompt">
        This one leans hard on the intern-brief structure from Chapter 3; a vaguer version would leave the AI
        guessing on every single rule.
      </Step>
      <CopyBlock label="Prompt for Chapter 5">{CLEANER_PROMPT}</CopyBlock>

      <Step n={4} title="Upload the file">
        When the tool appears, click its upload button and choose messy-sales.csv. Try it below. It works the same
        way, including the date trap you're about to meet.
      </Step>
      <DataCleanerDemo />

      <Checkpoint>
        This chapter has its own known-answer test, the same trick as ₹4,800 back in Chapter 1. You should see 14
        rows in, 1 blank removed, 3 duplicates removed and 10 rows out. The total should be ₹4,06,500: North
        ₹1,40,000, East ₹1,40,000, South ₹71,000, West ₹55,500. Priya Sharma's date should be{" "}
        <strong>03 Apr 2026</strong>. If all of that matches, well done. If you got 11 or 12 rows instead, or Priya's
        date shows as 04 Mar 2026, you've just hit the sneakiest problem in office data. Read on.
      </Checkpoint>

      <SectionEyebrow n="05" label="The date trap" />
      <p>
        Look at Priya's original date: <code className="rounded bg-latte px-1">03/04/2026</code>. In India, that
        means 3 April. In the United States, it means 4 March. Many programs, including code the AI writes, assume
        the American order unless told otherwise, so they quietly read it as 4 March.
      </p>
      <p className="mt-3">
        Now look at the duplicates. Rahul appears once as <code className="rounded bg-latte px-1">2026-04-05</code>{" "}
        and once as <code className="rounded bg-latte px-1">05/04/2026</code>. If the tool reads the second one the
        American way (4 May), the two rows look different, so the duplicate isn't removed. The same happens to
        Anita. That's how you end up with 11 or 12 rows.
      </p>
      <p className="mt-3">
        Here's the unsettling part: nothing showed an error. The tool looked like it worked perfectly. This is the "wrong answer" bug
        from Chapter 3, and it's exactly why checking against a known answer matters. It also came from a missing
        requirement: your prompt said "one format" but never said how to read the original dates.
      </p>
      <CopyBlock label="Fix it">{DATE_FIX_PROMPT}</CopyBlock>
      <p>
        If your result was right the first time, the AI guessed well. Add the sentence about Indian-style dates to
        your prompt anyway, so it never has to guess.
      </p>

      <Step n={5} title="Download the clean file">
        Click your tool's Download button. Inside Claude's preview, downloads are sometimes blocked, so don't worry if
        nothing happens. If nothing downloads, ask for a Copy button instead:{" "}
        <em>"Add a Copy button that copies the cleaned data, with tabs between the columns, so I can paste it straight into Excel."</em> Click it, open a
        blank Excel sheet, click cell A1 and paste. Names, regions, amounts and dates should each land in their own column.
      </Step>

      <SectionEyebrow n="06" label="Optional second build: a GSTR-2B reconciler" />
      <p>
        Same skill, a finance team's monthly headache. Your purchase register says which supplier invoices you
        booked. GSTR-2B, from the GST portal, says which invoices those suppliers actually reported. You can
        generally claim input tax credit only for invoices that appear in your GSTR-2B, so every month someone
        compares the two, usually with VLOOKUP. Skip this section if it isn't your world; nothing later depends on
        it. It takes about 15 minutes.
      </p>

      <Step n={6} title="Get the two sample files">
        The suppliers and GSTINs are made up (every GSTIN has "TEST" in it). The 2B file uses the same column names
        as the B2B sheet in the portal's GSTR-2B Excel download, keeping only the columns this tool needs.
      </Step>
      <DownloadButton filename="purchase-register.csv" content={PURCHASE_REGISTER_CSV} />
      <DownloadButton filename="gstr-2b.csv" content={GSTR_2B_CSV} />

      <Step n={7} title="Start a new chat, paste this prompt, upload both files">
        The structure is the same intern brief you used for the cleaner: who it's for, what it does, what good looks
        like, what to avoid.
      </Step>
      <CopyBlock label="Prompt for the reconciler">{RECON_PROMPT}</CopyBlock>
      <GstReconcilerDemo />

      <Checkpoint>
        Known answer: books have 14 invoices, 2B has 13. You should see <strong>10 matched</strong>,{" "}
        <strong>2 amount mismatches</strong> (Patel Printing PPW-95 and Bengaluru Cloud BCS/26-27/0455),{" "}
        <strong>2 missing in 2B</strong> (Deccan Logistics INV/031 and Gujarat Packaging GP/0928) and{" "}
        <strong>1 only in 2B</strong> (Pune Stationery PSM/552). Tax credit at risk: <strong>₹25,560</strong>. If
        you got 7 matched, 5 missing and 4 only in 2B, with ₹45,900 at risk, you've met this build's trap.
      </Checkpoint>

      <p>
        <strong>The invoice-number trap.</strong> Your books say <code className="rounded bg-latte px-1">INV/023</code>;
        the supplier reported <code className="rounded bg-latte px-1">INV-23</code>. To you, obviously the same invoice.
        To a tool comparing text exactly, two different invoices: one "missing in 2B" and one "only in 2B". Three
        invoices in the sample are written differently on each side, so a strict tool reports six problems that
        don't exist, and overstates the credit at risk by ₹20,340. Again, no error message: just a confident wrong
        answer, caught only because you knew what to expect.
      </p>
      <CopyBlock label="Fix it">{RECON_FIX_PROMPT}</CopyBlock>
      <p>
        Before using this on a real return, check a few invoices from each group by hand, and treat the tool as a
        first pass: your CA or tax team has the final word on what credit you claim. The real portal file has more
        columns than the sample; if your tool expects the sample's layout, tell the AI which columns your file has.
      </p>

      <SectionEyebrow n="07" label="What you can skip" />
      <p>
        The dozens of other data formats (JSON, XML, Parquet and so on), how quote marks and special characters are
        handled inside CSV files, and how to clean data with formulas. For office work, "CSV is plain text with
        commas" covers almost everything.
      </p>

      <Troubleshooting
        items={[
          { problem: "I can't find the downloaded file.", answer: "Look in your Downloads folder. On some computers, files ending in .csv open automatically in Excel." },
          {
            problem: "The upload button does nothing.",
            answer: <>Make sure you're choosing the .csv file, not an Excel file. If it still fails, ask: <em>"Instead of uploading, let me paste the CSV text into a box."</em> Then paste the text from Step 1.</>,
          },
          {
            problem: "The Download button doesn't work.",
            answer: <>That's normal inside Claude's preview, which often blocks downloads. Use the Copy button route from Step 5: <em>"Add a Copy button that copies the cleaned data, with tabs between the columns, so I can paste it straight into Excel."</em></>,
          },
          { problem: "The amounts changed.", answer: "That breaks your “what to avoid” rule. Use the fix loop and quote your rule back to the AI." },
          {
            problem: "My totals are slightly off.",
            answer: "Check whether Vikram's “62,000” became 62000. If it became 62 or 0, the comma confused the tool. Use the fix loop.",
          },
        ]}
      />

      <SectionEyebrow n="08" label="Try it yourself" />
      <TryItYourself>
        <p className="mb-2">1. Add a column called Month, showing the month of each date, like Apr 2026.</p>
        <p className="mb-2">2. Highlight any sale over ₹50,000 in green, and show how many there are.</p>
        <RevealHint label="Check your answer">There are 2: Mohammed Khan and Vikram Singh.</RevealHint>
        <p className="mt-3">
          3. <strong>Bonus:</strong> think of a messy file you deal with at work. Without uploading it, write a
          prompt describing its problems using the intern brief. Save it for your capstone in Chapter 11.
        </p>
      </TryItYourself>

      <SectionEyebrow n="09" label="Words you can now use" />
      <WordsTable
        words={[
          { word: "CSV", meaning: "A plain-text file where commas separate the columns", sample: "Can you export it as a CSV so I can load it in?" },
          { word: "Data format", meaning: "The way data is written, such as how dates or amounts appear", sample: "Are both systems using the same date format?" },
          { word: "Data cleaning", meaning: "Fixing errors, gaps and inconsistencies in data", sample: "We need to clean the data before we report on it." },
          { word: "Test data", meaning: "Sample data where you already know the right answer", sample: "Let's run it on test data before using the real file." },
          { word: "Duplicate", meaning: "The same record appearing more than once", sample: "Has anyone checked for duplicates?" },
          { word: "Reconciliation", meaning: "Matching two records of the same thing and explaining every difference", sample: "Has the 2B reconciliation been done for September?" },
        ]}
      />

      <NextUpTeaser
        label="Chapter 6: Putting AI inside your tool"
        hook="You'll build a tool that calls AI itself, and finally understand what an API actually is."
      />

      <ChapterComplete
        chapterId={5}
        nextPath="/chapter/6"
        nextTitle="Chapter 6: Putting AI inside your tool"
        quickCheck={{
          question: "Your cleaner shows a plausible row count but Priya's date is wrong. What kind of bug is this?",
          options: ["An error message", "Nothing happens", "The wrong answer"],
          correctIndex: 2,
        }}
      />
    </ChapterShell>
  );
}
