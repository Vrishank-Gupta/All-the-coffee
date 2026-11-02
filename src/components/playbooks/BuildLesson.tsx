import { Clock, Globe, Terminal, Sparkles } from "lucide-react";
import { SectionEyebrow } from "../chapter/SectionEyebrow";
import { Step } from "../chapter/Step";
import { CopyBlock } from "../chapter/CopyBlock";
import { Checkpoint } from "../chapter/Checkpoint";
import { DownloadButton } from "../chapter/DownloadButton";
import { TryItYourself } from "../chapter/TryItYourself";
import { Runner } from "./Runner";
import type { Build } from "../../lib/playbooks/types";

const WHERE = {
  browser: { icon: Globe, label: "Browser tool, as in Chapters 4 and 5", how: "Start a new chat in your AI tool and paste this brief. When the tool appears, upload the sample files into it. If you'd like to keep it, save it as an .html file, as you did in Chapter 4." },
  python: { icon: Terminal, label: "Python script, as in Chapter 9", how: "Make a new folder, put the sample files in it, and open it in VS Code. Paste this brief into a new AI chat, save the script it writes next to the files, and run it, as you did in Chapter 9." },
  "ai-inside": { icon: Sparkles, label: "Tool with AI inside, as in Chapter 6", how: "Build this one in Claude, like the Chapter 6 summariser: the tool calls AI itself. Paste this brief into a new chat." },
} as const;

export function BuildLesson({ build, n }: { build: Build; n: number }) {
  const where = WHERE[build.where];
  const Icon = where.icon;
  return (
    <section id={build.id} className="scroll-mt-20">
      <SectionEyebrow n={String(n).padStart(2, "0")} label={build.title} />
      <div className="not-prose -mt-1 mb-3 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="flex items-center gap-1 rounded-full bg-latte/60 px-3 py-1 text-espresso-800"><Clock className="h-3.5 w-3.5" /> {build.minutes}</span>
        <span className="flex items-center gap-1 rounded-full bg-latte/60 px-3 py-1 text-espresso-800"><Icon className="h-3.5 w-3.5" /> {where.label}</span>
      </div>
      <p>{build.why}</p>
      <Step n={1} title="Get the sample files">
        Made-up data, so you can practise without touching anything real.
      </Step>
      <div className="not-prose flex flex-wrap gap-3">
        {build.files.map((f) => <DownloadButton key={f.name} filename={f.name} content={f.content + "\n"} />)}
      </div>
      <Step n={2} title="Paste this brief">{where.how}</Step>
      <CopyBlock label={`${build.title} brief`}>{build.prompt}</CopyBlock>
      <Checkpoint><span className="[overflow-wrap:anywhere]">{build.check}</span></Checkpoint>
      <p className="mt-4">
        <strong>The trap: {build.trap.title}.</strong> {build.trap.text}
      </p>
      <CopyBlock label="Fix it">{build.trap.fix}</CopyBlock>
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
