import { ChapterShell } from "../components/chapter/ChapterShell";
import { SectionEyebrow } from "../components/chapter/SectionEyebrow";
import { Callout } from "../components/chapter/Callout";
import { CopyBlock } from "../components/chapter/CopyBlock";
import { Step } from "../components/chapter/Step";
import { Checkpoint } from "../components/chapter/Checkpoint";
import { Troubleshooting } from "../components/chapter/Troubleshooting";
import { TryItYourself } from "../components/chapter/TryItYourself";
import { WordsTable } from "../components/chapter/WordsTable";
import { RevealHint } from "../components/chapter/RevealHint";
import { ChapterComplete } from "../components/chapter/ChapterComplete";
import { NextUpTeaser } from "../components/chapter/NextUpTeaser";
import { OsProvider, OsToggle, OsCommand } from "../components/chapter/OsToggle";
import { CodeExplorer } from "../components/demo/CodeExplorer";
import { RecipeCardScript } from "../components/diagrams/RecipeCardScript";
import { PythonTraceback } from "../components/diagrams/PythonTraceback";
import { FourBuildingBlocks } from "../components/diagrams/FourBuildingBlocks";
import { chapterById } from "../lib/courseData";

const meta = chapterById(10)!;

const REFERENCE_SCRIPT = `# --- 1. Ingredients: the libraries we need ---
import pandas as pd
from pathlib import Path

# --- 2. Settings: things you might change next year ---
DATA_FOLDER = Path("data")
OUTPUT_FILE = "combined_sales.xlsx"
TARGET = 4000000  # 40 lakh

# --- 3. A mini-recipe for reading one month's file ---
def load_month(file_path):
    table = pd.read_excel(file_path)
    table = table.rename(columns={"Amt": "Amount"})
    if "Amount" not in table.columns:
        raise ValueError("No Amount column in " + file_path.name)
    table["Month"] = file_path.stem.replace("sales_", "")
    return table

# --- 4. Main steps: read every file, one at a time ---
all_months = []
for file_path in sorted(DATA_FOLDER.glob("sales_*.xlsx")):
    all_months.append(load_month(file_path))
    print("Loaded", file_path.name)

# --- 5. Combine and total ---
combined = pd.concat(all_months, ignore_index=True)
totals = combined.groupby("Region")["Amount"].sum()
grand_total = totals.sum()

# --- 6. Save the results to Excel ---
with pd.ExcelWriter(OUTPUT_FILE) as writer:
    combined.to_excel(writer, sheet_name="All sales", index=False)
    totals.to_excel(writer, sheet_name="Totals by region")

# --- 7. Report back in the terminal ---
print("Rows combined:", len(combined))
print(totals)
if grand_total >= TARGET:
    print("Target reached! Total sales:", grand_total)
else:
    print("Below target. Total sales:", grand_total)`;

export default function ChapterTen() {
  return (
    <ChapterShell meta={meta}>
      <OsProvider>
        <SectionEyebrow n="01" label="Where you are" />
        <p>
          Chapter 10 of 12. You've built four browser tools, published one of them live, and built an automation
          script, and the AI wrote every line. Today you'll learn to
          read code: not every detail, but enough to recognise what each part is doing, predict what a change will
          do, and have a sensible conversation about code with anyone.
        </p>
        <p className="mt-3">You'll do it with a script you already understand, because it does the job from Chapter 9.</p>

        <Callout variant="worry">
          "This is the real programming part. This is where I find out I can't do it." You won't be writing code from
          memory, today or ever in this course. Think of how you read a recipe in a cookbook: you don't need to be a
          chef to understand "chop the onions, then fry until golden". Code is the same. It's a recipe, and nearly
          every recipe is made of just a few building blocks. Once you know them, you can follow almost any script.
        </Callout>

        <SectionEyebrow n="02" label="The reference script" />
        <p>
          The script your AI wrote in Chapter 9 will be slightly different from everyone else's. So for this chapter,
          everyone uses the same version, below. It does the same job as yours, including handling the "Amt" problem.
        </p>
        <OsToggle />
        <Step n={1} title="Create reference_merge.py">
          In VS Code, with your <code className="rounded bg-latte px-1">sales-merge</code> folder open, create a new
          file called <code className="rounded bg-latte px-1">reference_merge.py</code>, paste this in, and save.
        </Step>
        <CopyBlock label="reference_merge.py" mono>{REFERENCE_SCRIPT}</CopyBlock>
        <Step n={2} title="Run it">
          Make sure <code className="rounded bg-latte px-1">combined_sales.xlsx</code> is closed in Excel, then run:
        </Step>
        <p>
          <OsCommand windows="python reference_merge.py" mac="python3 reference_merge.py" />
        </p>

        <Checkpoint>
          You should see twelve "Loaded…" lines, then:
          <pre className="not-prose mt-2 overflow-x-auto rounded-lg bg-white/60 px-3 py-2 font-mono text-[12.5px] text-espresso-900">
{`Rows combined: 96
Region
East     1158000
North    1278000
South    1038000
West      918000
Name: Amount, dtype: int64
Target reached! Total sales: 4392000`}
          </pre>
          The line <code className="rounded bg-latte px-1">Name: Amount, dtype: int64</code> is pandas being chatty
          about what kind of numbers these are. You can ignore it.
        </Checkpoint>

        <SectionEyebrow n="03" label="Read it like a recipe" />
        <p>
          Before looking at any single line, look at the shape. Notice the lines starting with{" "}
          <code className="rounded bg-latte px-1">#</code>. Those are <strong>comments</strong>: notes for humans
          that Python ignores completely. Here, they split the script into seven parts, and together they read like a
          recipe.
        </p>
        <RecipeCardScript />
        <p>
          This is the first trick to reading any code: find the parts before reading the lines. Well-written code is
          organised this way on purpose, and if code has no comments, you can ask AI to add them (you'll do this
          later).
        </p>
        <CodeExplorer code={REFERENCE_SCRIPT} lang="python" searchable label="reference_merge.py" heightClass="max-h-96" />

        <SectionEyebrow n="04" label="The four building blocks" />
        <p>
          Almost every program, from this script to a banking app, is built from four building blocks. Your script
          contains all four.
        </p>
        <FourBuildingBlocks />

        <p className="mt-5">
          <strong>Building block 1: Variables, or labelled boxes.</strong>
        </p>
        <CopyBlock label="From the script" mono>{`TARGET = 4000000`}</CopyBlock>
        <p>
          This creates a box, labels it <code className="rounded bg-latte px-1">TARGET</code>, and puts{" "}
          <code className="rounded bg-latte px-1">4000000</code> inside. Later, whenever the script says{" "}
          <code className="rounded bg-latte px-1">TARGET</code>, it means "whatever's in that box". One thing trips
          up beginners: here <code className="rounded bg-latte px-1">=</code> doesn't mean "equals" as in maths. It
          means "put this into the box". Read <code className="rounded bg-latte px-1">TARGET = 4000000</code> as
          "TARGET gets 40 lakh". Find the other boxes in the script:{" "}
          <code className="rounded bg-latte px-1">DATA_FOLDER</code>,{" "}
          <code className="rounded bg-latte px-1">OUTPUT_FILE</code>,{" "}
          <code className="rounded bg-latte px-1">combined</code>,{" "}
          <code className="rounded bg-latte px-1">totals</code> and{" "}
          <code className="rounded bg-latte px-1">grand_total</code>. A box can hold a number, some text, a
          folder's location, or even a whole table of data.
        </p>

        <p className="mt-5">
          <strong>Building block 2: Conditions, or decisions.</strong>
        </p>
        <CopyBlock label="From the script" mono>{`if grand_total >= TARGET:
    print("Target reached! Total sales:", grand_total)
else:
    print("Below target. Total sales:", grand_total)`}</CopyBlock>
        <p>
          This reads almost like English: if the grand total is at least the target, say "Target reached!";
          otherwise (<code className="rounded bg-latte px-1">else</code>), say "Below target". It's exactly like an
          IF formula in Excel. Notice the spaces at the start of the print lines. In Python, this indentation shows
          what belongs to what, like sub-points under a bullet in a document. The indented lines only happen if the
          condition above them is true.
        </p>

        <p className="mt-5">
          <strong>Building block 3: Loops, or "do this for each one".</strong>
        </p>
        <CopyBlock label="From the script" mono>{`for file_path in sorted(DATA_FOLDER.glob("sales_*.xlsx")):
    all_months.append(load_month(file_path))
    print("Loaded", file_path.name)`}</CopyBlock>
        <p>
          Read it as: for each file in the data folder whose name starts with{" "}
          <code className="rounded bg-latte px-1">sales_</code> and ends in{" "}
          <code className="rounded bg-latte px-1">.xlsx</code>, do the two indented lines. Load it, add it to the
          pile, and say "Loaded". There are 12 files, so the indented lines run 12 times. That's why you saw twelve
          "Loaded" messages. This is where the real power of automation comes from. Twelve files or twelve thousand,
          the loop is the same three lines.
        </p>

        <p className="mt-5">
          <strong>Building block 4: Functions, or named mini-recipes.</strong>
        </p>
        <CopyBlock label="From the script" mono>{`def load_month(file_path):
    ...
    return table`}</CopyBlock>
        <p>
          <code className="rounded bg-latte px-1">def</code> means "define a mini-recipe". This one is called{" "}
          <code className="rounded bg-latte px-1">load_month</code>. You give it a file, it follows its steps (read
          the file, fix "Amt", check for Amount, add the month), and returns a finished table. It's written once, at
          the top. Then the loop uses it 12 times with{" "}
          <code className="rounded bg-latte px-1">load_month(file_path)</code>. It's like a recipe that says "make
          the sauce (see page 12)" instead of repeating the sauce instructions in every dish.
        </p>

        <SectionEyebrow n="05" label="Build it: predict, then run" />
        <p>
          Reading code really clicks when you predict what a change will do, then test it. For each experiment,
          write down your prediction before you run anything.
        </p>

        <Step n={3} title="Experiment 1: Raise the target">
          In the Settings section, change <code className="rounded bg-latte px-1">TARGET = 4000000</code> to{" "}
          <code className="rounded bg-latte px-1">TARGET = 5000000</code>. Save. Predict: which message will appear
          at the end? Then run the script.
        </Step>
        <RevealHint label="Show the answer">
          "Below target. Total sales: 4392000". The condition is now false, so the{" "}
          <code className="rounded bg-latte px-1">else</code> part runs. Change the target back to{" "}
          <code className="rounded bg-latte px-1">4000000</code> afterwards.
        </RevealHint>

        <Step n={4} title="Experiment 2: Remove a month">
          Move the file <code className="rounded bg-latte px-1">sales_2026_07.xlsx</code> out of the{" "}
          <code className="rounded bg-latte px-1">data</code> folder, for example onto your desktop. Predict: how
          many "Loaded" lines? How many rows combined? Will the target still be reached? Then run it.
        </Step>
        <RevealHint label="Show the answer">
          11 "Loaded" lines, 88 rows, and a grand total of 4024000. And yes, "Target reached!", because ₹40,24,000 is
          still above ₹40 lakh. Did you get that last one right? It's a good reminder that checks like this only test
          what you tell them to. Move the July file back into <code className="rounded bg-latte px-1">data</code>{" "}
          afterwards.
        </RevealHint>

        <Step n={5} title="Experiment 3: Switch off the safety net">
          Find this line in the mini-recipe:
          <pre className="not-prose mt-2 overflow-x-auto rounded-xl bg-espresso-950 px-4 py-3 font-mono text-[13px] text-caramel-50">
{`    table = table.rename(columns={"Amt": "Amount"})`}
          </pre>
          Type a <code className="rounded bg-latte px-1">#</code> at the very start of it, turning it into a comment,
          so Python ignores it. Save. Predict: what will happen when the loop reaches July? Then run it.
        </Step>
        <RevealHint label="Show the answer">
          The script stops with <code className="rounded bg-latte px-1">ValueError: No Amount column in sales_2026_07.xlsx</code>.
          The <code className="rounded bg-latte px-1">if</code> check you can see in the mini-recipe caught the
          problem and named the exact file. That's the safety net you asked for in Chapter 9. Remove the{" "}
          <code className="rounded bg-latte px-1">#</code> afterwards and run it once more to make sure everything is
          back to normal.
        </RevealHint>

        <Callout variant="reassurance">
          If you got a prediction wrong, that's the point of the exercise. Every wrong prediction teaches you
          something about how the code really works.
        </Callout>

        <SectionEyebrow n="06" label="Reading a Python error" />
        <p>
          If your script stopped with an error at some point, you saw something like this. It's called a{" "}
          <strong>traceback</strong>: the trail of what Python was doing when it got stuck. With pandas it can be
          long, because Python lists every step it took, including many steps inside pandas itself. It looks
          intimidating, but two rules make it manageable: read the last line first, then find the line that names
          your own file. That's where your script was when things went wrong.
        </p>
        <PythonTraceback />

        <SectionEyebrow n="07" label="What just happened" />
        <p>
          You read a real script, found its parts, recognised all four building blocks, and predicted what changes
          would do. That's what "being able to read code" means for most people who work with tech teams.
        </p>
        <p className="mt-3">
          You also learned a habit developers use constantly: when you're not sure what code does, change one small
          thing, predict, and run. It's a safe way to learn, because you can always change it back.
        </p>

        <SectionEyebrow n="08" label="What you can skip" />
        <p>
          The exact punctuation (brackets, colons, quote marks), the many other building blocks programmers use, the
          details of pandas commands like <code className="rounded bg-latte px-1">groupby</code>, and how to write
          any of this from a blank page. When you meet a line you don't understand, you don't need to work it out
          alone. Ask AI.
        </p>

        <Troubleshooting
          items={[
            {
              problem: '"IndentationError"',
              answer: "Python is strict about the spaces at the start of lines. You probably added or removed a space by accident. Press Ctrl + Z (Windows) or Cmd + Z (Mac) to undo, or paste the reference script in again.",
            },
            {
              problem: "My output looks different from the checkpoint.",
              answer: "Check that TARGET is back to 4000000 and the July file is back in data. Then compare your script with the reference line by line, or paste the reference in again.",
            },
            {
              problem: "I added # and now a different line is broken.",
              answer: "Make sure the # went at the very start of the line, before the spaces. Undo and try again.",
            },
          ]}
        />

        <SectionEyebrow n="09" label="Try it yourself" />
        <TryItYourself>
          <p className="mb-2">
            1. Ask about one line. Pick any line you're curious about, for example the{" "}
            <code className="rounded bg-latte px-1">groupby</code> line, and ask your AI chat:{" "}
            <em>"Explain this line of Python like I'm a complete beginner, using an everyday analogy: [paste the
            line]."</em>
          </p>
          <p className="mb-2">
            2. Get it fully commented. Paste your own Chapter 9 script (not the reference) into your AI chat with:{" "}
            <em>"Add a plain-English comment above every line of this script, and split it into labelled sections
            like a recipe."</em> Then read through it and find the four building blocks.
          </p>
          <p>
            3. Spot the blocks in a new script. Ask your AI for a short script (for example, "rename every file in a
            folder to add today's date, but skip any file that already has today's date in the name") and, before
            running it, mark where the variables, condition, loop and function are. Not every script will have all
            four; noticing which ones are missing, and why, is useful too. Then ask the AI whether you got it right.
          </p>
        </TryItYourself>

        <SectionEyebrow n="10" label="Words you can now use" />
        <WordsTable
          words={[
            { word: "Variable", meaning: "A labelled box that holds a value", sample: "Is the tax rate hard-coded, or is it a variable we can change?" },
            { word: "Condition", meaning: "A decision: if this, do that; otherwise, do something else", sample: "What's the condition for sending the reminder?" },
            { word: "Loop", meaning: "Repeat steps for each item in a list", sample: "Does it loop through every customer, or just active ones?" },
            { word: "Function", meaning: "A named mini-recipe that can be reused", sample: "Is there already a function that does the date formatting?" },
            { word: "Comment", meaning: "A note in the code for humans, ignored by the computer", sample: "Can we add comments so the next person understands it?" },
            { word: "Traceback", meaning: "Python's error report, read from the last line up", sample: "Can you send me the full traceback?" },
          ]}
        />

        <NextUpTeaser
          label="Chapter 11: Capstone"
          hook="You'll go back to the boring task you wrote down on day one, and build a tool for it."
        />

        <ChapterComplete
          chapterId={10}
          nextPath="/chapter/11"
          nextTitle="Chapter 11: Capstone"
          quickCheck={{
            question: "In a Python traceback, where should you look first?",
            options: ["The first line", "The last line", "The middle, where the file path is"],
            correctIndex: 1,
          }}
        />
      </OsProvider>
    </ChapterShell>
  );
}
