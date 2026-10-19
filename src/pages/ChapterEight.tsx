import { ChapterShell } from "../components/chapter/ChapterShell";
import { SectionEyebrow } from "../components/chapter/SectionEyebrow";
import { Callout } from "../components/chapter/Callout";
import { Step } from "../components/chapter/Step";
import { Checkpoint } from "../components/chapter/Checkpoint";
import { Troubleshooting } from "../components/chapter/Troubleshooting";
import { TryItYourself } from "../components/chapter/TryItYourself";
import { WordsTable } from "../components/chapter/WordsTable";
import { ChapterComplete } from "../components/chapter/ChapterComplete";
import { NextUpTeaser } from "../components/chapter/NextUpTeaser";
import { OsProvider, OsToggle, OsStep, OsCommand } from "../components/chapter/OsToggle";
import { WorkshopTrio } from "../components/diagrams/WorkshopTrio";
import { RunProgramFlow } from "../components/diagrams/RunProgramFlow";
import { chapterById } from "../lib/courseData";

const meta = chapterById(8)!;

export default function ChapterEight() {
  return (
    <ChapterShell meta={meta}>
      <OsProvider>
        <SectionEyebrow n="01" label="Where you are" />
        <p>
          Chapter 8 of 12, the start of Module C. So far, everything has happened inside your browser. Today you'll
          set up a small coding workshop on your own computer: a place where you can build tools that work with the
          files on your laptop, handle hundreds of spreadsheets at once, and run whenever you want.
        </p>
        <p className="mt-3">
          By the end of this chapter, you'll have installed two programs, typed your first commands, and run your
          first program on your own machine.
        </p>

        <Callout variant="worry">
          "Installing things is where I mess up my laptop, or get in trouble with IT." Here's what's true: the two
          programs you'll install are free, used by millions of people, and as safe as installing Zoom or WhatsApp.
          You can uninstall them any time, the same way you'd remove any other app. Nothing in this chapter changes
          how the rest of your computer works. The one real caution is about work laptops, so let's deal with that
          first.
        </Callout>

        <SectionEyebrow n="02" label="Before you install: is my laptop OK?" />
        <ul className="list-disc space-y-2 pl-5 marker:text-caramel-500">
          <li>
            <strong>Use a personal laptop if you can.</strong> Many company laptops block installs or need IT
            approval. That's normal, and it's there for good reasons.
          </li>
          <li>
            <strong>Never try to get around IT controls.</strong> If your work laptop asks for an admin password you
            don't have, stop. Either use a personal computer or ask your IT team. It's a perfectly reasonable
            request: "I'm doing a course and need VS Code and Python."
          </li>
          <li>
            <strong>Check your space and connection.</strong> You'll need about 1 GB of free space and a decent
            internet connection for the downloads.
          </li>
          <li>
            <strong>Know your system.</strong> Pick Windows or Mac below; the steps differ a little.
          </li>
        </ul>
        <OsToggle />

        <Callout variant="reassurance">
          The setup is the hardest part of Module C. Once your workshop is ready, the building feels just like
          Modules A and B. Take your time with this chapter. Rushing setup is the most common reason people get
          stuck.
        </Callout>

        <SectionEyebrow n="03" label="Why build on your own computer?" />
        <p>
          Browser tools are brilliant for quick, interactive tools. But they can't easily reach the files on your
          computer, they struggle with dozens of files at once, and they live inside someone else's website.
        </p>
        <p className="mt-3">
          Working on your own computer is like moving from a demo kitchen into your own kitchen. You choose the
          tools, your ingredients are right there, and you can cook as much as you like. You'll need three things:
        </p>
        <WorkshopTrio />
        <ul className="list-disc space-y-2 pl-5 marker:text-caramel-500">
          <li>
            <strong>VS Code</strong>, your workbench. It's an app for writing and organising code, the way Word is an
            app for writing documents. It's made by Microsoft and is the most popular code editor in the world.
          </li>
          <li>
            <strong>Python</strong>, the engine. Python is a programming language, and installing it lets your
            computer understand and run instructions written in it. Without it, a Python file is like an Excel file
            on a computer with no Excel.
          </li>
          <li>
            <strong>The terminal</strong>, a way of texting your computer. Instead of clicking icons, you type a
            short instruction and press Enter. It's already built into your computer and into VS Code; you don't need
            to install it.
          </li>
        </ul>

        <SectionEyebrow n="04" label="Build it" />
        <Step n={1} title="Make a project folder">
          A coding project is just a folder with files in it. Open your Documents folder and create a new folder
          called <code className="rounded bg-latte px-1">ai-course</code>. Everything you build in Module C will live
          here.
        </Step>

        <Step n={2} title="Install Python">
          Go to <strong>python.org</strong>, click Downloads, and download the latest version for your system.
        </Step>
        <OsStep
          windows={
            <Callout variant="warning" title="The single most important click">
              Open the downloaded installer. Before clicking anything else, tick the box at the bottom that says{" "}
              <strong>"Add python.exe to PATH"</strong>. Then click Install Now, and Close when it finishes.
            </Callout>
          }
          mac={
            <Callout variant="tip">
              Open the downloaded file and follow the installer, clicking Continue and Agree through each screen,
              then Install. You may be asked for your Mac password; that's normal for installing any app.
            </Callout>
          }
        />

        <Step n={3} title="Install VS Code">
          Go to <strong>code.visualstudio.com</strong> and download it for your system.
        </Step>
        <OsStep
          windows={<p>Run the installer and keep all the default options.</p>}
          mac={<p>Open the downloaded file, then drag Visual Studio Code into your Applications folder.</p>}
        />

        <Step n={4} title="Open your project in VS Code">
          Open VS Code. Click <strong>File → Open Folder</strong> and choose your <code className="rounded bg-latte px-1">ai-course</code> folder.
          If VS Code asks "Do you trust the authors of the files in this folder?", click <strong>Yes</strong>. It's
          your own folder; you're the author.
        </Step>

        <Step n={5} title="Add Python support to VS Code">
          Click the Extensions icon on the left (it looks like four small squares). Search for{" "}
          <strong>Python</strong> and install the one made by Microsoft. Extensions are like add-ons for your
          workbench.
        </Step>

        <Step n={6} title="Open the terminal">
          From the top menu, choose <strong>Terminal → New Terminal</strong>. A panel opens at the bottom with a line
          of text ending in a symbol like <code className="rounded bg-latte px-1">&gt;</code> or{" "}
          <code className="rounded bg-latte px-1">%</code> and a blinking cursor. That line is called the{" "}
          <strong>prompt</strong>. Yes, the same word as in AI chat. In both cases, it means the computer is waiting
          for your instruction.
        </Step>

        <Step n={7} title="Your first command">
          Type this exactly and press Enter:
        </Step>
        <p>
          <OsCommand windows="python --version" mac="python3 --version" />
        </p>
        <p className="mt-2">
          You should see something like <code className="rounded bg-latte px-1">Python 3.13.1</code>. The exact
          number doesn't matter, as long as it starts with 3.
        </p>

        <SectionEyebrow n="05" label="Planned failure: the literal computer" />
        <p>Now make a deliberate mistake. Type this, with the letters swapped, and press Enter:</p>
        <p>
          <OsCommand windows="pyhton --version" mac="pyhton3 --version" />
        </p>
        <p className="mt-3">
          The computer has no idea what you mean. It doesn't guess, and it doesn't autocorrect. Remember the{" "}
          <code className="rounded bg-latte px-1">totl</code> typo from Chapter 3? The terminal is just as literal as
          code. When you see "not recognized" or "command not found", the first thing to check is always spelling.
        </p>
        <Callout variant="hint">
          Press the up arrow key. Your last command reappears, so you can fix it instead of retyping. That one
          shortcut will save you a lot of typing.
        </Callout>

        <SectionEyebrow n="06" label="Build it: your first program" />
        <Step n={8} title="Create a file">
          In VS Code, click <strong>File → New File</strong>, name it{" "}
          <code className="rounded bg-latte px-1">hello.py</code>, and save it in your{" "}
          <code className="rounded bg-latte px-1">ai-course</code> folder. The{" "}
          <code className="rounded bg-latte px-1">.py</code> at the end tells the computer it's a Python file, just
          as <code className="rounded bg-latte px-1">.xlsx</code> says Excel.
        </Step>
        <Step n={9} title="Paste these two lines into it">
          <pre className="not-prose overflow-x-auto rounded-xl bg-espresso-950 px-4 py-3 font-mono text-[13px] text-caramel-50">
{`print("Hello! My workshop is ready.")
print("Today is the day I stopped being scared of code.")`}
          </pre>
          <p className="mt-2">
            Save the file: Ctrl + S on Windows, Cmd + S on Mac. If you see a white dot next to the file name at the
            top, it isn't saved yet.
          </p>
        </Step>
        <Step n={10} title="Run it">
          In the terminal, type this and press Enter:
        </Step>
        <p>
          <OsCommand windows="python hello.py" mac="python3 hello.py" />
        </p>

        <Checkpoint>
          The terminal should show your two lines:
          <pre className="not-prose mt-2 overflow-x-auto rounded-lg bg-white/60 px-3 py-2 font-mono text-[13px] text-espresso-900">
{`Hello! My workshop is ready.
Today is the day I stopped being scared of code.`}
          </pre>
          If you see that, your workshop is fully working. You've installed a programming language and a
          professional code editor, used the terminal, and run a program on your own computer. Most people in your
          office have never done any of those things.
        </Checkpoint>

        <Callout variant="celebration">
          Take a screenshot of this. Seriously. A few weeks ago, this might have seemed impossible.
        </Callout>

        <SectionEyebrow n="07" label="What just happened" />
        <p>
          You wrote a tiny set of instructions in a file (<code className="rounded bg-latte px-1">hello.py</code>),
          then used the terminal to tell Python: "run the instructions in this file". Python read the file from top
          to bottom and did what each line said: <code className="rounded bg-latte px-1">print</code> means "show
          this text".
        </p>
        <RunProgramFlow />
        <p>
          Every Python program you build from now on works the same way, however long it is: instructions in a file,
          run with one command.
        </p>

        <SectionEyebrow n="08" label="Optional upgrade: AI inside your workbench" />
        <p>
          You can keep using your AI chat in the browser to write code and copy it into VS Code; that's how Chapter 9
          works. But many people later add an AI assistant directly into VS Code, so they can ask for code and
          changes right next to their files. If you'd like to try it, open the Extensions panel, search for an AI
          coding assistant, install it, and sign in. It's optional. Everything in Module C works without it.
        </p>

        <SectionEyebrow n="09" label="What you can skip" />
        <p>
          The dozens of other terminal commands, how your computer finds programs, other code editors, settings and
          themes in VS Code, and Python versions. Your three commands for now are: check the version, run a file,
          and press up-arrow to repeat.
        </p>

        <Troubleshooting
          items={[
            {
              problem: '"python is not recognized" even when spelled correctly, or the Microsoft Store opens.',
              answer:
                "Python wasn't added to your computer's list of known programs (called the PATH). First, close VS Code completely and open it again, since the terminal only checks this list when it starts. If that doesn't work, try py --version instead; if that works, use py instead of python for the rest of the course. If neither works, uninstall Python (Settings → Apps), run the installer again, and make sure you tick Add python.exe to PATH.",
            },
            {
              problem: 'A pop-up asks to install "command line developer tools" (Mac).',
              answer: "This is normal and safe. Click Install, wait for it to finish, then try again.",
            },
            {
              problem: '"command not found: python" (Mac).',
              answer: "On Macs, use python3, not python.",
            },
            {
              problem: "The file runs but shows an error about a missing file.",
              answer: "Make sure hello.py is saved inside the ai-course folder, and that VS Code has that folder open (it should appear in the left sidebar).",
            },
            {
              problem: "The installer asks for an admin password I don't have.",
              answer: "Stop here. You're on a managed laptop. Use a personal computer, or ask your IT team for help.",
            },
            {
              problem: "Something else.",
              answer: "Copy the exact message from the terminal and use the fix loop with your AI chat. Tell it whether you're on Windows or Mac.",
            },
          ]}
        />

        <SectionEyebrow n="10" label="Try it yourself" />
        <TryItYourself>
          <p className="mb-2">
            1. Change the messages in <code className="rounded bg-latte px-1">hello.py</code>, save, and run it
            again. (Forgetting to save before running is the most common beginner mistake, so notice when you do it.)
          </p>
          <p className="mb-2">
            2. Ask your AI chat: <em>"Write a short Python script that asks for my name and then says good morning to
            me by name."</em> Create a new file called <code className="rounded bg-latte px-1">greet.py</code>,
            paste it in, save and run it. The terminal will wait for you to type your name.
          </p>
          <p>
            3. Ask: <em>"Write a Python script that tells me how many days are left until 31 December this
            year."</em> Run it. No extra installs are needed.
          </p>
        </TryItYourself>

        <SectionEyebrow n="11" label="Words you can now use" />
        <WordsTable
          words={[
            { word: "VS Code", meaning: "A free, popular app for writing and organising code", sample: "Can you open the project in VS Code and show me?" },
            { word: "Python", meaning: "A programming language popular for automation and data", sample: "Could a Python script do this instead of someone doing it by hand?" },
            { word: "Terminal", meaning: "A way of giving your computer typed instructions", sample: "Do I run that from the terminal?" },
            { word: "Command", meaning: "One typed instruction in the terminal", sample: "What's the command to start it?" },
            { word: "Project", meaning: "A folder holding all the files for one piece of software", sample: "Which folder is the project in?" },
          ]}
        />

        <NextUpTeaser
          label="Chapter 9: Your first automation script"
          hook="You'll put your workshop to work: a script that does an afternoon of spreadsheet copying in about two seconds."
        />

        <ChapterComplete
          chapterId={8}
          nextPath="/chapter/9"
          nextTitle="Chapter 9: Your first automation script"
          quickCheck={{
            question: "What do you call one typed instruction you give the terminal?",
            options: ["A prompt", "A command", "A function"],
            correctIndex: 1,
          }}
        />
      </OsProvider>
    </ChapterShell>
  );
}
