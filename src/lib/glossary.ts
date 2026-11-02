// Every chapter's "Words you can now use", in one place: each chapter shows its own list, and
// /glossary shows them all, with a link back to the chapter that teaches each word.
import type { WordEntry } from "../components/chapter/WordsTable";

export const CHAPTER_WORDS: Record<number, WordEntry[]> = {
  0: [
    { word: "Code", meaning: "Written instructions for a computer", sample: "Is the logic already in the code, or is someone doing it manually?" },
    { word: "Vibe coding", meaning: "Building software by describing what you want to an AI tool and refining the result", sample: "I vibe-coded a quick prototype so we can see if the idea works." }
  ],
  1: [
    { word: "Prompt", meaning: "The instructions or request you give an AI tool", sample: "Let me tweak the prompt and see if we get a better result." },
    { word: "Preview", meaning: "A working version of the tool you can try before sharing it", sample: "Here's a quick preview so you can click around." },
    { word: "Iterate", meaning: "Improve something through repeated small rounds of changes", sample: "It's a first version; we'll iterate on it next week." }
  ],
  2: [
    { word: "Front end", meaning: "The part of an app you see and click", sample: "Is this a front-end change, or does it need back-end work too?" },
    { word: "Back end", meaning: "The behind-the-scenes part that stores data and does heavy work", sample: "Where does the back end store this data?" },
    { word: "HTML", meaning: "The language that sets out what's on a web page", sample: "It's just a content change in the HTML, right?" },
    { word: "CSS", meaning: "The language that controls how a web page looks", sample: "Can we fix the spacing with a quick CSS change?" },
    { word: "JavaScript", meaning: "The language that makes a web page react and calculate", sample: "Is the validation done in JavaScript on the page?" }
  ],
  3: [
    { word: "Bug", meaning: "A mistake in software that makes it behave wrongly", sample: "Is that a bug, or is it working as designed?" },
    { word: "Debugging", meaning: "Finding and fixing bugs", sample: "The team is still debugging the export issue." },
    { word: "Error message", meaning: "The computer's description of what went wrong", sample: "Can you send me the exact error message?" },
    { word: "Test case", meaning: "A set of inputs where you already know the right answer", sample: "Do we have a test case for the month-end scenario?" }
  ],
  4: [
    { word: "Data", meaning: "The information a tool works with or keeps", sample: "Is the tool the problem, or is the data wrong?" },
    { word: "Storage", meaning: "Where data is kept so it isn't lost", sample: "Where is this data stored, and who can access it?" },
    { word: "Requirement", meaning: "Something a tool must do", sample: "Was 'export to Excel' in the original requirements?" },
    { word: "Feature", meaning: "A specific thing a tool can do", sample: "Can we park that feature for version two?" },
    { word: "File extension", meaning: "The ending of a file name, like .html or .csv, that tells the computer what kind of file it is", sample: "Can you send it as a .csv rather than .xlsx?" }
  ],
  5: [
    { word: "CSV", meaning: "A plain-text file where commas separate the columns", sample: "Can you export it as a CSV so I can load it in?" },
    { word: "Data format", meaning: "The way data is written, such as how dates or amounts appear", sample: "Are both systems using the same date format?" },
    { word: "Data cleaning", meaning: "Fixing errors, gaps and inconsistencies in data", sample: "We need to clean the data before we report on it." },
    { word: "Test data", meaning: "Sample data where you already know the right answer", sample: "Let's run it on test data before using the real file." },
    { word: "Duplicate", meaning: "The same record appearing more than once", sample: "Has anyone checked for duplicates?" },
    { word: "Reconciliation", meaning: "Matching two records of the same thing and explaining every difference", sample: "Has the 2B reconciliation been done for September?" }
  ],
  6: [
    { word: "API", meaning: "A way for one piece of software to ask another for something", sample: "Does their system have an API we can connect to?" },
    { word: "Request / response", meaning: "What's sent to an API, and what comes back", sample: "The request goes through, but the response is empty." },
    { word: "API key", meaning: "A secret code that identifies who's using an API", sample: "Who owns the API key, and where is it stored?" },
    { word: "Edge case", meaning: "An unusual situation a tool must still handle", sample: "What happens in the edge case where the file is empty?" },
    { word: "Hallucination", meaning: "When AI confidently states something untrue or made up", sample: "Let's check the summary for hallucinations before we send it." }
  ],
  7: [
    { word: "URL", meaning: "A web address", sample: "Can you drop the URL in the chat?" },
    { word: "Hosting", meaning: "Keeping a tool on an always-on computer so others can use it", sample: "Where is this hosted, internally or with an outside provider?" },
    { word: "Server", meaning: "A computer that runs tools and websites for other people to reach", sample: "Is the slowness on our side or the server's?" },
    { word: "Deploy", meaning: "Put the latest version of a tool onto the server", sample: "When is the fix being deployed?" },
    { word: "Live", meaning: "Available to real users", sample: "Is the new version live yet?" },
    { word: "Version", meaning: "A saved, released state of a tool", sample: "Which version are the users on?" }
  ],
  8: [
    { word: "VS Code", meaning: "A free, popular app for writing and organising code", sample: "Can you open the project in VS Code and show me?" },
    { word: "Python", meaning: "A programming language popular for automation and data", sample: "Could a Python script do this instead of someone doing it by hand?" },
    { word: "Terminal", meaning: "A way of giving your computer typed instructions", sample: "Do I run that from the terminal?" },
    { word: "Command", meaning: "One typed instruction in the terminal", sample: "What's the command to start it?" },
    { word: "Project", meaning: "A folder holding all the files for one piece of software", sample: "Which folder is the project in?" }
  ],
  9: [
    { word: "Script", meaning: "A file of code that does a task when you run it", sample: "Could we write a script to do this every month?" },
    { word: "Run", meaning: "Tell the computer to carry out the instructions in a script", sample: "Who runs the script, and how often?" },
    { word: "Library", meaning: "Ready-made code that your code can use", sample: "Is there a library that already does this?" },
    { word: "Automation", meaning: "Getting a computer to do a repetitive task for you", sample: "This report is a good candidate for automation." }
  ],
  10: [
    { word: "Variable", meaning: "A labelled box that holds a value", sample: "Is the tax rate hard-coded, or is it a variable we can change?" },
    { word: "Condition", meaning: "A decision: if this, do that; otherwise, do something else", sample: "What's the condition for sending the reminder?" },
    { word: "Loop", meaning: "Repeat steps for each item in a list", sample: "Does it loop through every customer, or just active ones?" },
    { word: "Function", meaning: "A named mini-recipe that can be reused", sample: "Is there already a function that does the date formatting?" },
    { word: "Comment", meaning: "A note in the code for humans, ignored by the computer", sample: "Can we add comments so the next person understands it?" },
    { word: "Traceback", meaning: "Python's error report, read from the last line up", sample: "Can you send me the full traceback?" }
  ],
  11: [
    { word: "Brief", meaning: "A one-page description of what to build, before building it", sample: "Do we have a brief for this, or are we building blind?" },
    { word: "Scope creep", meaning: "A project quietly growing beyond what was agreed", sample: "That's scope creep, let's put it on the Later list." },
    { word: "Slice", meaning: "The smallest working version of one more piece of a build", sample: "Let's ship this slice before adding the export feature." },
    { word: "MVP", meaning: "Minimum viable product: the smallest version that's genuinely useful", sample: "Is this the MVP, or are we gold-plating it?" }
  ],
};

// Words the course uses that aren't in a chapter's list, with where you meet them.
export const MORE_WORDS: (WordEntry & { chapter: number })[] = [
  { chapter: 1, word: "Known answer", meaning: "The right result for a small sample, worked out by hand before the tool exists, so you can check the tool", sample: "What's the known answer for these five rows?" },
  { chapter: 3, word: "Trap", meaning: "A way a tool goes quietly wrong: a confident answer with no error message", sample: "Did we test it for the date trap?" },
  { chapter: 3, word: "Fix loop", meaning: "Telling the AI what you expected, what happened instead, and asking it to fix that", sample: "I sent it the fix loop with the exact numbers." },
  { chapter: 4, word: "localStorage", meaning: "Storage inside your browser, where a tool saved as a file keeps its data on your computer", sample: "It's in localStorage, so it's only on this laptop, in this browser." },
  { chapter: 4, word: "UTF-8", meaning: "The standard way of saving text, so symbols like ₹ show correctly", sample: "Save it as UTF-8 or the rupee sign breaks." },
  { chapter: 6, word: "AI model", meaning: "The AI system itself, which reads your text and writes a reply; apps like Claude and ChatGPT are built on one", sample: "Which model is this tool calling?" },
  { chapter: 7, word: "Personal data", meaning: "Information about an identifiable person, like a name, phone number or salary", sample: "This sheet has personal data, so it can't go into a public link." },
  { chapter: 9, word: "pip", meaning: "The command that installs Python libraries on your computer", sample: "Run pip install pandas before the script." },
  { chapter: 10, word: "File path", meaning: "The address of a file on your computer, folder by folder", sample: "The script can't find the file: check the path." },
];
