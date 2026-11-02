import { useState } from "react";
import { Clock, Globe, Terminal, Sparkles, ShieldAlert, Eye } from "lucide-react";
import { SectionEyebrow } from "../chapter/SectionEyebrow";
import { Step } from "../chapter/Step";
import { CopyBlock } from "../chapter/CopyBlock";
import { Checkpoint } from "../chapter/Checkpoint";
import { DownloadButton } from "../chapter/DownloadButton";
import { TryItYourself } from "../chapter/TryItYourself";
import { Runner } from "./Runner";
import type { Build } from "../../lib/playbooks/types";
import { trapById } from "../../lib/method";

const WHERE = {
  browser: { icon: Globe, label: "Browser tool, as in Chapters 4 and 5", how: "Start a new chat in your AI tool and paste this brief. When the tool appears, upload the sample files into it. If you'd like to keep it, save it as an .html file, as you did in Chapter 4." },
  python: { icon: Terminal, label: "Python script, as in Chapter 9", how: "Make a new folder, put the sample files in it, and open it in VS Code. Paste this brief into a new AI chat, save the script it writes next to the files, and run it, as you did in Chapter 9." },
  "ai-inside": { icon: Sparkles, label: "Tool with AI inside, as in Chapter 6", how: "Build this one in Claude, like the Chapter 6 summariser: the tool calls AI itself. Paste this brief into a new chat." },
} as const;

// One playbook build, taught so the learner thinks before copying: they draft the rules and the
// expected answer themselves, compare with our brief, check against the known answer, predict the
// trap before seeing it, and finally compare their tool with ours.
export function BuildLesson({ build, n }: { build: Build; n: number }) {
  const where = WHERE[build.where];
  const Icon = where.icon;
  const pattern = trapById(build.trap.pattern);
  const [shown, setShown] = useState(false);
  return (
    <section id={build.id} className="scroll-mt-20">
      <SectionEyebrow n={String(n).padStart(2, "0")} label={build.title} />
      <div className="not-prose -mt-1 mb-3 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="flex items-center gap-1 rounded-full bg-latte/60 px-3 py-1 text-espresso-800"><Clock className="h-3.5 w-3.5" /> {build.minutes}</span>
        <span className="flex items-center gap-1 rounded-full bg-latte/60 px-3 py-1 text-espresso-800"><Icon className="h-3.5 w-3.5" /> {where.label}</span>
      </div>
      <p>{build.why}</p>
      <Step n={1} title="Get the sample files">
        Made-up data, so you can practise without touching anything real. Open them and look before you do anything else.
      </Step>
      <div className="not-prose flex flex-wrap gap-3">
        {build.files.map((f) => <DownloadButton key={f.name} filename={f.name} content={f.content + "\n"} />)}
      </div>
      <Step n={2} title="Think first: two minutes, on paper">
        Before reading our brief, write down three things: the rules you'd give a new colleague doing this job, the
        result you'd expect for one row of the file, worked out by hand, and one thing in the file that a tool could
        easily misread. This is the part of the job AI can't do for you.
      </Step>
      <Step n={3} title="Compare with our brief, then paste it">
        Did your rules match ours? Anything you'd add? Then: {where.how}
      </Step>
      <CopyBlock label={`${build.title} brief`}>{build.prompt}</CopyBlock>
      <Checkpoint><span className="[overflow-wrap:anywhere]">{build.check}</span></Checkpoint>
      <Step n={4} title="Predict the trap">
        Most first builds of this tool get one thing quietly wrong. Look at the files and the brief again: where would
        you expect it? Check your tool there, then reveal ours.
      </Step>
      {!shown ? (
        <button
          onClick={() => setShown(true)}
          className="not-prose ml-12 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-brick-300 bg-brick-50 px-4 text-sm font-semibold text-brick-700 transition hover:bg-brick-100"
        >
          <Eye className="h-4 w-4" /> Show the trap
        </button>
      ) : (
        <div className="not-prose my-4 rounded-2xl border border-brick-200 bg-brick-50/60 px-5 py-4">
          <p className="flex flex-wrap items-center gap-2 font-display text-lg font-semibold text-espresso-950">
            <ShieldAlert className="h-5 w-5 text-brick-600" /> {build.trap.title}
          </p>
          {pattern && (
            <a href={`/method#trap-${pattern.id}`} className="mt-1 inline-block text-xs font-bold tracking-wide text-brick-700 uppercase hover:underline">
              Trap pattern {pattern.n}: {pattern.name}
            </a>
          )}
          <p className="mt-2 text-[15px] leading-relaxed text-espresso-900/90">{build.trap.text}</p>
          <div className="mt-3">
            <CopyBlock label="Fix it">{build.trap.fix}</CopyBlock>
          </div>
        </div>
      )}
      <p className="mt-4">
        <strong>Compare with ours.</strong> Here's our version of the same tool, running on the same files. Change a
        value in the file and run it again, then try the same change in yours.
      </p>
      <Runner files={build.files} run={build.run} label="Run our version" />
      <TryItYourself>
        {build.tryIt.map((t, i) => <p key={i} className="mb-2">{i + 1}. {t}</p>)}
      </TryItYourself>
    </section>
  );
}
