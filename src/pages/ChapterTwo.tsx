import { useState } from "react";
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
import { ReferenceGrid } from "../components/chapter/ReferenceGrid";
import { InputProcessOutput } from "../components/diagrams/InputProcessOutput";
import { SkeletonClothesMuscles } from "../components/diagrams/SkeletonClothesMuscles";
import { RestaurantCutaway } from "../components/diagrams/RestaurantCutaway";
import { AppFrame } from "../components/demo/AppFrame";
import { MeetingCostCalculator } from "../components/demo/MeetingCostCalculator";
import { CodeExplorer } from "../components/demo/CodeExplorer";
import { TreasureChecklist, type TreasureItem } from "../components/demo/TreasureChecklist";
import { UPDATED_SOURCE } from "../lib/calculatorSource";
import { chapterById } from "../lib/courseData";

const meta = chapterById(2)!;

const TWEAK_PROMPT = `Please make two changes to my calculator:
1. Change the main heading to: What did this meeting really cost?
2. Make the result number green.`;

const TREASURE_ITEMS: (TreasureItem & { match: string })[] = [
  { key: "heading", label: "The heading", tag: "HTML", match: "really cost" },
  { key: "colour", label: "The colour", tag: "CSS", match: "16a34a" },
  { key: "calc", label: "The calculation", tag: "JS", match: "2000" },
];

export default function ChapterTwo() {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [burst, setBurst] = useState(0);

  function handleSearch(query: string) {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const newlyFound = TREASURE_ITEMS.find((t) => !found.has(t.key) && q.includes(t.match));
    if (newlyFound) {
      const next = new Set(found).add(newlyFound.key);
      setFound(next);
      setBurst((b) => b + 1);
    }
  }

  return (
    <ChapterShell meta={meta}>
      <SectionEyebrow n="01" label="Where you are" />
      <p>
        You've built a working tool. Now you'll understand what it's made of, using one simple idea that explains
        almost every app you use. Then you'll go on a small treasure hunt inside your own code.
      </p>

      <Callout variant="worry">
        "Reading code? That's definitely where I'll get lost." You're not going to read code the way a developer
        does. You're going to look for words you recognise, the way you might scan a document in a language you
        half-know for a name or a number. That's all.
      </Callout>

      <SectionEyebrow n="02" label="Every app does three things" />
      <p>
        Your Meeting Cost Calculator, WhatsApp, your bank's app and Excel all work on the same basic pattern: input,
        processing, output.
      </p>
      <InputProcessOutput input="8 people, ₹12L, 60 min" process="salary ÷ 2,000 × people × hours" output="₹4,800" />
      <p>
        Once you see this pattern, you'll see it everywhere. Ordering food: input is your order, processing is the
        kitchen, output is your meal. This also gives you a powerful way to describe any tool you want to build.
        Just answer three questions: <strong>What goes in? What should happen to it? What should come out?</strong>{" "}
        You'll use this in every prompt from now on.
      </p>

      <SectionEyebrow n="03" label="What your tool is made of" />
      <p>
        Your calculator runs inside your web browser. Browsers understand three languages, and your tool uses all
        three. A helpful way to picture them is as a body:
      </p>
      <SkeletonClothesMuscles />
      <p>
        You don't need to memorise these, but a few will start to look familiar every time you peek at code, the
        same way you'd recognise "total" or "subtotal" on an invoice without reading every line.
      </p>
      <ReferenceGrid
        groups={[
          {
            title: "HTML: skeleton",
            items: [
              { code: "<h1>", desc: "A big heading" },
              { code: "<button>", desc: "Something clickable" },
              { code: "<input>", desc: "A box to type into" },
              { code: "<div>", desc: "A container that groups things together" },
            ],
          },
          {
            title: "CSS: clothes",
            items: [
              { code: "color", desc: "Text colour" },
              { code: "background", desc: "Fill colour" },
              { code: "padding", desc: "Space inside a box" },
              { code: "border-radius", desc: "How rounded the corners are" },
            ],
          },
          {
            title: "JavaScript: muscles",
            items: [
              { code: "function", desc: "A named mini-recipe, like calculate()" },
              { code: "const", desc: "A label for a value, like people or salary" },
              { code: "if", desc: "A decision; do this only when something's true" },
            ],
          },
        ]}
      />

      <SectionEyebrow n="04" label="Why are there different programming languages?" />
      <p>
        For the same reason your office uses Excel for numbers and PowerPoint for slides: each is built for a
        different job. Browsers speak HTML, CSS and JavaScript. Later you'll meet Python, the go-to for office
        chores like combining spreadsheets.
      </p>

      <SectionEyebrow n="05" label="Where this tool lives" />
      <p>
        Everything you can see and click in an app is the <strong>front end</strong>. Think of a restaurant: the
        front end is the dining area. Many apps also have a <strong>back end</strong>: the kitchen and storeroom you
        never see, where orders are prepared and stock is kept. Your calculator doesn't need one, because all the work happens right on your screen.
      </p>
      <RestaurantCutaway />

      <SectionEyebrow n="06" label="Build it: the treasure hunt" />
      <Step n={1} title="Ask for two changes">
        Open the chat where you built your calculator in Chapter 1, and copy this in.
      </Step>
      <CopyBlock label="Prompt for the treasure hunt">{TWEAK_PROMPT}</CopyBlock>
      <p>Check your tool in the panel next to the chat; you should see your new heading and a green result:</p>
      <AppFrame label="meeting-cost-calculator.ai">
        <MeetingCostCalculator heading="What did this meeting really cost?" resultColor="sage" />
      </AppFrame>

      <Step n={2} title="Open the code">
        Open the code the same way you did in Chapter 1, or ask: <em>"Show me the full code for this tool in the
        chat."</em>
      </Step>
      <Step n={3} title="Find your heading">
        Click inside the code, then press Ctrl+F (Windows) or Cmd+F (Mac). Type <code className="rounded bg-latte px-1">really cost</code> and press Enter. Try it below.
        It works just like the real thing.
      </Step>
      <Step n={4} title="Find the colour">
        Now search for <code className="rounded bg-latte px-1">green</code>, or for a colour code like{" "}
        <code className="rounded bg-latte px-1">#22c55e</code>. Your AI picked its own shade of green, so your code
        may differ; the practice box below uses <code className="rounded bg-latte px-1">#16a34a</code>. Computers
        often write colours as codes instead of names. That line is CSS, the clothes.
      </Step>
      <Step n={5} title="Find the calculation">
        Finally, search for <code className="rounded bg-latte px-1">2000</code>. You may get more than one match; one
        is just the salary box (1200000 happens to contain "2000"), so skip that one. The real match is inside the{" "}
        <code className="rounded bg-latte px-1">&lt;script&gt;</code> tag further down: the "2,000 working hours a
        year" from your Chapter 1 prompt (JavaScript, the muscles doing the processing).
      </Step>
      <TreasureChecklist items={TREASURE_ITEMS} found={found} celebrateTrigger={burst} />
      <CodeExplorer
        code={UPDATED_SOURCE}
        searchable
        label="index.html: search it like Ctrl+F"
        heightClass="max-h-80"
        onSearch={handleSearch}
      />

      <Checkpoint>
        You've found three things in your code: the heading (HTML), the colour (CSS) and the calculation
        (JavaScript). If you found at least two, you've done this chapter properly.
      </Checkpoint>

      <SectionEyebrow n="07" label="What just happened" />
      <p>
        You just read code. Not all of it, and not like a developer would, but you looked at a page of
        instructions, found the parts you cared about, and understood what each part was for. That's the real
        skill. You're not supposed to read every line; searching for what you need and ignoring the rest is the
        whole trick.
      </p>

      <SectionEyebrow n="08" label="What you can skip" />
      <p>
        The exact rules of how HTML, CSS and JavaScript are written: the brackets, semicolons, indentation. That's
        called <strong>syntax</strong>, and the AI handles it. You also don't need to understand every line you
        searched past. Nobody does on a first read.
      </p>

      <Troubleshooting
        items={[
          {
            problem: "My search found nothing.",
            answer: <>Make sure the code is showing, not the tool. Check the spelling, or try a single word like <code className="rounded bg-latte px-1">cost</code>. Still nothing? Ask the AI: <em>"Which line has my heading?"</em></>,
          },
          {
            problem: "The AI rebuilt the whole tool and it looks completely different.",
            answer: <>That happens sometimes; it's fine. If you liked the old look better, send: <em>"Please keep the previous design and only change the heading and the result colour."</em></>,
          },
          {
            problem: "The code view looks different from here.",
            answer: <>Different AI tools show code differently. If you can't find it, ask: <em>"Where can I see the code for this tool?"</em></>,
          },
        ]}
      />

      <SectionEyebrow n="09" label="Try it yourself" />
      <TryItYourself>
        Pick one small thing about your calculator you'd like to change: a colour, a word, a button size. Ask the
        AI to change it, then find where that change lives in the code.
        <br />
        <br />
        <strong>Bonus challenge:</strong> before searching, guess whether it'll be in the skeleton (HTML), the
        clothes (CSS) or the muscles (JavaScript). Were you right?
      </TryItYourself>

      <SectionEyebrow n="10" label="Words you can now use" />
      <WordsTable
        words={[
          { word: "Front end", meaning: "The part of an app you see and click", sample: "Is this a front-end change, or does it need back-end work too?" },
          { word: "Back end", meaning: "The behind-the-scenes part that stores data and does heavy work", sample: "Where does the back end store this data?" },
          { word: "HTML", meaning: "The language that sets out what's on a web page", sample: "It's just a content change in the HTML, right?" },
          { word: "CSS", meaning: "The language that controls how a web page looks", sample: "Can we fix the spacing with a quick CSS change?" },
          { word: "JavaScript", meaning: "The language that makes a web page react and calculate", sample: "Is the validation done in JavaScript on the page?" },
        ]}
      />

      <div className="my-8 rounded-2xl border border-sage-200 bg-sage-50 p-5 text-center">
        <p className="font-display text-xl font-semibold text-espresso-950">Three chapters down</p>
        <p className="mt-2 text-[14.5px] text-espresso-800/80">
          You've gone from "I'm not a tech person" to building a working tool, changing it, and finding your way
          around its code. You didn't just watch a demo: you actually did it, and Chapter 3 is free too.
        </p>
      </div>

      <NextUpTeaser
        label="Chapter 3: When things break"
        hook="You'll break your calculator on purpose, twice, and fix it calmly both times. The fear-killer chapter."
      />

      <ChapterComplete
        chapterId={2}
        nextPath="/chapter/3"
        nextTitle="Chapter 3: When things break"
        quickCheck={{
          question: "Which one controls how your page looks: colours, spacing, fonts?",
          options: ["HTML", "CSS", "JavaScript"],
          correctIndex: 1,
        }}
      />
    </ChapterShell>
  );
}
