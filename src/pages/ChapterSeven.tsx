import { ChapterShell } from "../components/chapter/ChapterShell";
import { SectionEyebrow } from "../components/chapter/SectionEyebrow";
import { Callout } from "../components/chapter/Callout";
import { CopyBlock } from "../components/chapter/CopyBlock";
import { Step } from "../components/chapter/Step";
import { Checkpoint } from "../components/chapter/Checkpoint";
import { Troubleshooting } from "../components/chapter/Troubleshooting";
import { TryItYourself } from "../components/chapter/TryItYourself";
import { WordsTable } from "../components/chapter/WordsTable";
import { SafetyChecklist } from "../components/chapter/SafetyChecklist";
import { ChapterComplete } from "../components/chapter/ChapterComplete";
import { NextUpTeaser } from "../components/chapter/NextUpTeaser";
import { HostingStall } from "../components/diagrams/HostingStall";
import { UrlAnatomy } from "../components/diagrams/UrlAnatomy";
import { PublishFlowDemo } from "../components/demo/PublishFlowDemo";
import { ModuleCompleteBadge } from "../components/demo/ModuleCompleteBadge";
import { NervousCheckIn } from "../components/demo/NervousCheckIn";
import { WorkTestimonialBox } from "../components/demo/WorkTestimonialBox";
import { chapterById } from "../lib/courseData";

const meta = chapterById(7)!;

const SHARE_MESSAGE = `Hi! I'm learning to build small tools with AI, and this is one of my first.
It works out what a meeting costs. Could you try it and tell me one thing
you'd improve?`;

export default function ChapterSeven() {
  return (
    <ChapterShell meta={meta}>
      <SectionEyebrow n="01" label="Where you are" />
      <p>
        The last chapter of Module B. Until now, your tools have lived only inside your chat. Today you'll turn one
        into a link that anyone can open, test it the way a real user would, and send it to someone.
      </p>
      <p className="mt-3">
        You'll also learn what tech teams mean when they say something is "hosted," "deployed" or "live."
      </p>

      <Callout variant="worry">
        "What if people see it and think it's not good enough? What if I share something I shouldn't?" Both are
        reasonable worries. For the first: nobody judges a version one as harshly as you're imagining right now. For
        the second: this chapter gives you a simple safety checklist, and you'll start with your safest
        tool.
      </Callout>

      <SectionEyebrow n="02" label="What hosting means" />
      <p>
        Right now, your tool runs in your chat, and only you can use it. For other people to use it, it needs to live
        somewhere that's always on and reachable from anywhere: a <strong>server</strong>.
      </p>
      <p className="mt-3">
        Think of it like food. Cooking in your home kitchen is great for you, but strangers can't walk in and order.
        Hosting is renting a stall in a busy market that's open all day, every day. Moving the latest version of your
        tool onto that server is called <strong>deploying</strong>. Once it's there and people can use it, it's{" "}
        <strong>live</strong>.
      </p>
      <HostingStall />

      <SectionEyebrow n="03" label="What a link is made of" />
      <p>
        The link you'll get is a <strong>URL</strong>, a web address. Every URL has the same basic parts, just like
        a postal address has a city, a street and a house number. You don't need to remember the parts; just know
        that the domain tells you who's hosting it, which is useful when deciding whether to trust a link someone
        sends you.
      </p>
      <UrlAnatomy />

      <SectionEyebrow n="04" label="Before you share: the safety checklist" />
      <p>Run through this every time you share anything you've built. For this chapter, use your Meeting Cost Calculator from Chapter 1, since it passes every item easily.</p>
      <SafetyChecklist
        items={[
          "No real data inside it: no real names, customer details, salaries, sales figures, not even in example text.",
          "No secrets: no passwords and no API keys, anywhere.",
          "No company tools shared publicly without checking with your manager or IT first.",
          "Nothing you'd mind being forwarded: assume anyone with the link can pass it on.",
          "You know how to take it down: find the unpublish or delete option before you share.",
        ]}
      />

      <SectionEyebrow n="05" label="Build it" />
      <Step n={1} title="Open your calculator">
        Go back to the chat from Chapter 1 (or Chapter 2, if you changed it there), and open the preview.
      </Step>
      <Step n={2} title="Find the publish option">
        Look for a Publish or Share button near the top of the preview.
      </Step>
      <Step n={3} title="Read before you click">
        Most tools show a short message explaining who will be able to see it. Read it, then publish.
      </Step>
      <Step n={4} title="Copy your link, then test it like a stranger">
        You're logged in, so things may look different for you than for everyone else. Open a private window (Ctrl+Shift+N
        on Windows, Cmd+Shift+N on Mac) and paste the link there. Try the whole flow below.
      </Step>
      <PublishFlowDemo />
      <Step n={5} title="Test it on a phone">
        Send the link to yourself on WhatsApp or email and open it there. Most people who receive a link will open it
        on a phone, so this matters.
      </Step>

      <Checkpoint>
        Your calculator opens in a private window and on your phone, and still gives ₹4,800 for the test numbers. If
        it asked you to log in, or looked broken on the phone, see "If something went wrong" below. Finding these
        problems before your friend does is exactly why you tested.
      </Checkpoint>

      <SectionEyebrow n="06" label="What just happened" />
      <p>You just did, in miniature, what software teams call a release:</p>
      <ol className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-caramel-600">
        <li>You checked it was safe to share.</li>
        <li>You deployed it, so it's hosted on a server.</li>
        <li>You tested it as a real user would, including on a phone.</li>
      </ol>
      <p className="mt-3">
        Professional teams have far more steps, but the idea is the same: never assume it works for other people just
        because it works for you.
      </p>

      <SectionEyebrow n="07" label="Build it, part 2: share it and improve it" />
      <Step n={6} title="Send it to one person">
        Choose someone friendly: a friend, family member or a supportive colleague.
      </Step>
      <CopyBlock label="Message to send">{SHARE_MESSAGE}</CopyBlock>
      <Step n={7} title="Make one improvement">
        When they reply, go back to your chat and ask the AI to make that change. Test it. Then publish again so the
        link shows the new version. Check whether your tool updates the same link or gives you a new one.
      </Step>
      <p>
        Each published state of a tool is a <strong>version</strong>. You've just gone from version one to version
        two because of real user feedback. That's how almost every product you use was built.
      </p>

      <SectionEyebrow n="08" label="What you can skip" />
      <p>
        Domain names, servers, hosting companies and costs. In the advanced track that comes after this course,
        you'll see the full range of hosting options, from free and simple to big cloud platforms. For now,
        one-button publishing from your AI tool is all you need for personal tools.
      </p>

      <Troubleshooting
        items={[
          { problem: "The link asks people to log in.", answer: "Some tools need viewers to have an account, or have a visibility setting. Look for a sharing setting. If there isn't one, mention it in your message." },
          {
            problem: "It looks broken on my phone.",
            answer: <>Go back to the chat: <em>"When I open this on a phone, [describe what you see]. Please make it work well on a small screen."</em> Then publish again and retest.</>,
          },
          {
            problem: "I can't find a publish button.",
            answer: <>Your AI tool may call it something else, or not support it on your plan. Ask: <em>"How can I share this tool with someone as a link?"</em></>,
          },
          { problem: "I shared something by mistake.", answer: "Unpublish or delete it straight away, using the option you found in the checklist. Then tell anyone who needs to know." },
        ]}
      />

      <SectionEyebrow n="09" label="Try it yourself" />
      <TryItYourself>
        <p className="mb-2">
          1. Publish your Follow-up Tracker from Chapter 4. Open it in a private window and add a follow-up. Then
          open your own version. Can you see what the private window added? Each person usually gets their own copy
          of the data, which is good news for privacy.
        </p>
        <p>2. Go back to the safety checklist and decide: is your Meeting Notes Summariser from Chapter 6 safe to share? What would you check first?</p>
      </TryItYourself>

      <SectionEyebrow n="10" label="Words you can now use" />
      <WordsTable
        words={[
          { word: "URL", meaning: "A web address", sample: "Can you drop the URL in the chat?" },
          { word: "Hosting", meaning: "Keeping a tool on an always-on computer so others can use it", sample: "Where is this hosted, internally or with an outside provider?" },
          { word: "Server", meaning: "A computer that runs tools and websites for other people to reach", sample: "Is the slowness on our side or the server's?" },
          { word: "Deploy", meaning: "Put the latest version of a tool onto the server", sample: "When is the fix being deployed?" },
          { word: "Live", meaning: "Available to real users", sample: "Is the new version live yet?" },
          { word: "Version", meaning: "A saved, released state of a tool", sample: "Which version are the users on?" },
        ]}
      />

      <SectionEyebrow n="11" label="Module B complete" />
      <p>
        Look at what you've built in the last four chapters: a tool that remembers, a spreadsheet cleaner that
        catches the date trap, a summariser with AI inside it, and a tool real people have used through a link. You
        now also understand data and storage, file formats, APIs and keys, and what it means to deploy something,
        vocabulary many people working alongside tech teams never quite pick up.
      </p>
      <NervousCheckIn point="moduleB" />
      <WorkTestimonialBox />
      <ModuleCompleteBadge
        title="Module B: Building useful things, complete"
        desc="A tool that remembers, a cleaner that catches a real data bug, AI inside your own tool, and something a real person has actually used."
        next="Module C: Your own computer, live now"
      />

      <NextUpTeaser
        label="Module C: Your own computer"
        hook="You'll set up a real coding workshop, and write a script that does an afternoon of spreadsheet work in seconds."
      />

      <ChapterComplete
        chapterId={7}
        quickCheck={{
          question: "What do you call moving the latest version of your tool onto a server so people can use it?",
          options: ["Hosting", "Deploying", "Publishing an API"],
          correctIndex: 1,
        }}
      />
    </ChapterShell>
  );
}
