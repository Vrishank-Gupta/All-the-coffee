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
import { OsTabs } from "../components/demo/OsTabs";
import { chapterById } from "../lib/courseData";

const meta = chapterById(7)!;

const CODE = "rounded bg-latte px-1";

const FILE_PROMPT = `Please give me the complete code for this tool as a single HTML file,
in one code block, so I can save it on my computer and put it online.
Everything must be inside that one file. Keep the design exactly as it is,
and make sure it works well on a phone screen too.`;

const SHARE_MESSAGE = `Hi! I'm learning to build small tools with AI, and this is one of my first.
It works out what a meeting costs. Could you try it and tell me one thing
you'd improve?`;

export default function ChapterSeven() {
  return (
    <ChapterShell meta={meta}>
      <SectionEyebrow n="01" label="Where you are" />
      <p>
        The last chapter of Module B. Until now, your tools have lived inside your chat, or as a file on your own
        computer. Today you'll turn one into a link that anyone can open, with no login, test it the way a real user
        would, and send it to someone.
      </p>
      <p className="mt-3">
        You'll also learn what tech teams mean when they say something is "hosted," "deployed" or "live."
      </p>

      <Callout variant="worry">
        "What if people see it and think it's not good enough? What if I share something I shouldn't?" Both are
        reasonable worries. For the first: nobody judges a version one as harshly as you're imagining right now. For
        the second: this chapter gives you a simple safety checklist, you'll start with your safest tool, and you'll
        learn how to take it down before you put it up.
      </Callout>

      <SectionEyebrow n="02" label="What hosting means" />
      <p>
        Right now, your tool runs in your chat or on your computer, and only you can use it. For other people to use
        it, it needs to live somewhere that's always on and reachable from anywhere: a <strong>server</strong>.
      </p>
      <p className="mt-3">
        Think of it like food. Cooking in your home kitchen is great for you, but strangers can't walk in and order.
        Hosting is renting a stall that's open all day, every day. Only people you give the address to will find
        it. Moving the latest version of your tool onto that server is called <strong>deploying</strong>. Once it's
        there and people can use it, it's <strong>live</strong>.
      </p>
      <HostingStall />
      <p>
        You'll use <strong>Netlify</strong>, a well-known hosting company with a free plan and a page called
        Netlify Drop, where you drag a folder into your browser and get a link back. No code, no setup.
      </p>

      <SectionEyebrow n="03" label="What a link is made of" />
      <p>
        The link you'll get is a <strong>URL</strong>, a web address. Every URL has the same basic parts, just like
        a postal address has a city, a street and a house number. You don't need to remember the parts; just know
        that the ending (here, <code className={CODE}>.netlify.app</code>) tells you who's hosting it, which is useful
        when deciding whether to trust a link someone sends you.
      </p>
      <UrlAnatomy />

      <SectionEyebrow n="04" label="Before you share: the safety checklist" />
      <p>
        One honest fact first: <strong>anything inside a page you publish can be seen by anyone with the
        link</strong>, including text in the code that doesn't show on screen. So never publish real company or
        personal data inside the page, not even as example text.
      </p>
      <p className="mt-3">
        Run through this every time you share anything you've built. For this chapter, use your Meeting Cost
        Calculator from Chapter 1, since it passes every item easily.
      </p>
      <SafetyChecklist
        items={[
          "No real data inside it: no real names, customer details, salaries, sales figures, not even in example text.",
          "No secrets: no passwords and no API keys, anywhere.",
          "No company tools shared publicly without checking with your manager or IT first.",
          "Nothing you'd mind being forwarded: assume anyone with the link can pass it on.",
          "You know how to take it down: in Netlify, open the project, go to Project configuration, then General, and scroll to the Danger zone. Delete the project there, or choose Disable project, which also takes it offline. For anything shared from Claude, click Share and switch it back to Only you.",
        ]}
      />

      <SectionEyebrow n="05" label="Build it" />
      <Callout variant="reassurance">
        You've done the fiddly part already: saving a tool as a file is exactly what you did in Chapter 4. Today's
        only new idea is hosting, putting that file somewhere other people can reach it.
      </Callout>

      <Step n={1} title="Get your calculator as one file">
        Go back to the chat from Chapter 1 (or Chapter 2, if you changed it there) and paste this. Then copy the
        whole file with the code block's Copy button, as you did in Chapter 4.
      </Step>
      <CopyBlock label="Ask for the file">{FILE_PROMPT}</CopyBlock>

      <Step n={2} title="Save it as index.html, inside its own folder">
        On your Desktop, make a new folder called <code className={CODE}>meeting-cost-calculator</code>. Save the
        file inside it, named <code className={CODE}>index.html</code>. Why that name? It's the file every web
        server looks for first, like the front door of a house. Netlify needs a folder with an index.html inside;
        with any other name, visitors would see "Page not found."
      </Step>
      <OsTabs
        windows={
          <ol className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-caramel-600">
            <li>Open <strong>Notepad</strong> and paste the code (Ctrl+V).</li>
            <li>Click <strong>File → Save as</strong> and open your <code className={CODE}>meeting-cost-calculator</code> folder on the Desktop.</li>
            <li>Set <strong>Save as type</strong> to <strong>All files (*.*)</strong>.</li>
            <li>Type the file name <code className={CODE}>index.html</code>, check <strong>Encoding</strong> says <strong>UTF-8</strong>, and click <strong>Save</strong>.</li>
          </ol>
        }
        mac={
          <ol className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-caramel-600">
            <li>Open <strong>TextEdit</strong>, click <strong>New Document</strong>, then <strong>Format → Make Plain Text</strong> before you paste.</li>
            <li>Paste the code (Cmd+V), then click <strong>File → Save</strong>.</li>
            <li>Type the name <code className={CODE}>index.html</code>, choose your <code className={CODE}>meeting-cost-calculator</code> folder on the Desktop, and click <strong>Save</strong>.</li>
            <li>If asked, click <strong>Use .html</strong>.</li>
          </ol>
        }
      />
      <Step n={3} title="Check it on your computer first">
        Double-click <code className={CODE}>index.html</code>. Your calculator opens in your browser. Enter 8 people,
        1200000 salary, 60 minutes: you should get ₹4,800. If it opens as code instead, it's the .txt snag from
        Chapter 4; the same fix works.
      </Step>

      <Step n={4} title="Create a free Netlify account">
        Go to <code className={CODE}>netlify.com</code> and click <strong>Sign up</strong>. Use your personal email,
        just as you did for Claude. The free plan is enough. If it asks a few setup questions, short answers are
        fine. Why an account? Without one, Netlify locks your site behind a temporary password and deletes it soon
        after. With one, it stays up until you remove it.
      </Step>

      <Step n={5} title="Drop your folder">
        While logged in, go to <code className={CODE}>app.netlify.com/drop</code>. You'll see a big box asking you
        to drag and drop your project folder. Open your Desktop in a window next to the browser, then drag the{" "}
        <strong>whole meeting-cost-calculator folder</strong> (not the file inside it) onto that box. Wait a few
        seconds while it uploads.
      </Step>

      <Step n={6} title="Read before you click: make it public">
        New Netlify projects start private, so only you can open them while logged in. On your project's page, look
        for <strong>Make public</strong> and click it. (If you can't see it: Project configuration, then General, then
        Visitor access, then Project visibility.) This is the moment that matters: after this, anyone with the link
        can open your tool, with no login. Nobody can find it unless you share the address.
      </Step>

      <Step n={7} title="Give it a friendly name">
        Netlify picks a random name, like a string of odd words and numbers. To change it, go to your project's
        overview, click <strong>Customize</strong>, then <strong>Manage project name and cover image</strong>, and
        type something like <code className={CODE}>yourname-meeting-cost</code>. Your link becomes{" "}
        <code className={CODE}>https://yourname-meeting-cost.netlify.app</code>. If the name is taken, add a word or
        a number.
      </Step>

      <Step n={8} title="Copy your link, then test it like a stranger">
        You're logged in to Netlify, so things may look different for you than for everyone else. Open a private
        window: <strong>Ctrl+Shift+N</strong> in Chrome or Edge on Windows, <strong>Ctrl+Shift+P</strong> in
        Firefox, <strong>Cmd+Shift+N</strong> on a Mac. Paste the link there. Try the whole flow below.
      </Step>
      <PublishFlowDemo />
      <Step n={9} title="Test it on a phone">
        Send the link to yourself on WhatsApp or email and open it there. Most people who receive a link will open it
        on a phone, so this matters.
      </Step>

      <Checkpoint>
        In a private window, your link opens straight into your calculator, with no login and no Netlify page in
        between. It gives ₹4,800 for the test numbers, and it looks right on your phone. If you see "you don't have
        access" or a login page, it's still private: go back to Step 6. Finding problems like this before your
        friend does is exactly why you tested.
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
      <Step n={10} title="Send it to one person">
        Choose someone friendly: a friend, family member or a supportive colleague.
      </Step>
      <CopyBlock label="Message to send">{SHARE_MESSAGE}</CopyBlock>
      <Step n={11} title="Make one improvement">
        When they reply, go back to your chat and ask the AI to make that change and give you the whole file again.
        Save it over your index.html (same name, same folder). Check it on your computer. Then, in Netlify, open your
        project, go to <strong>Deploys</strong>, and drag the folder into the drop box there. Use that box, not the
        main Drop page: the main page would create a second site with a new link.
      </Step>
      <Checkpoint>
        Open your same link again (refresh it if it was already open). It shows the new version. The address didn't
        change, so your friend's link still works.
      </Checkpoint>
      <p>
        Each published state of a tool is a <strong>version</strong>. You've just gone from version one to version
        two because of real user feedback. That's how almost every product you use was built.
      </p>

      <SectionEyebrow n="08" label="What about the tool with AI inside?" />
      <p>
        Your Meeting Notes Summariser from Chapter 6 can't go on Netlify this way. Its AI part only works inside
        Claude. To share it, use Claude's own <strong>Share</strong> button on the tool, if your plan shows one.
        Anyone you share it with needs their own Claude account, and their use comes out of their own Claude
        allowance, not yours.
      </p>

      <SectionEyebrow n="09" label="What you can skip" />
      <p>
        Custom domain names (like yourname.com), how servers work inside, paid hosting plans, and the many other
        hosting companies. For personal tools, a free Netlify account and a folder with an index.html are all you
        need.
      </p>

      <Troubleshooting
        items={[
          {
            problem: "The link shows \"you don't have access\" or asks people to log in.",
            answer: "The project is still private. Go back to Step 6 and click Make public, then test again in a fresh private window.",
          },
          {
            problem: "The link asks for a password.",
            answer: "The folder was dropped while you weren't logged in. Log in to Netlify (or sign up) and claim the site if it offers that, or simply log in and drop the folder again.",
          },
          {
            problem: "Netlify says \"Page not found.\"",
            answer: <>The file inside your folder isn't called exactly <code className={CODE}>index.html</code>. Turn on file extensions (as in Chapter 4) and check it isn't <code className={CODE}>index.html.txt</code> or <code className={CODE}>meeting-cost.html</code>. Rename it, then drop the folder again on your project's Deploys page.</>,
          },
          {
            problem: "I can't drag the folder into the browser.",
            answer: "Make the browser window smaller so you can see your Desktop beside it, then drag the folder across. If dragging still doesn't work, click the box on the Drop page and choose the folder instead, if your browser offers that.",
          },
          {
            problem: "It looks broken on my phone.",
            answer: <>Go back to the chat: <em>"When I open this on a phone, [describe what you see]. Please make it work well on a small screen, and give me the whole file again."</em> Save it, drop the folder again on your Deploys page, and retest.</>,
          },
          {
            problem: "My change doesn't show up.",
            answer: "Check you dropped the folder on your project's Deploys page, not the main Drop page. Then refresh the link. If you ended up with a second site, delete the extra one.",
          },
          {
            problem: "The name I want is taken.",
            answer: "Project names are shared by everyone on Netlify. Add your name, a word or a number until it's accepted.",
          },
          {
            problem: "I shared something by mistake.",
            answer: "Take it down straight away: in Netlify, open the project, go to Project configuration, then General, and scroll to the Danger zone. Delete the project, or choose Disable project if that's the option you see. Either way, the link stops working. Then tell anyone who needs to know.",
          },
        ]}
      />

      <SectionEyebrow n="10" label="Try it yourself" />
      <TryItYourself>
        <p className="mb-2">
          1. Publish your Follow-up Tracker from Chapter 4 the same way: a new folder, the file inside named
          index.html, dropped onto Netlify and made public. Use only the sample follow-ups, never real ones. Open
          your link in a private window and add a follow-up. Then open the same link in a normal window. The
          follow-up isn't there. Each visitor's data stays in their own browser: nothing they type is shared with
          anyone or sent to you, and you can't see it.
        </p>
        <p>2. Go back to the safety checklist and decide: is your Meeting Notes Summariser from Chapter 6 safe to share? What would you check first?</p>
      </TryItYourself>

      <SectionEyebrow n="11" label="Words you can now use" />
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

      <SectionEyebrow n="12" label="Module B complete" />
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
