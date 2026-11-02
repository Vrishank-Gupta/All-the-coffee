// The Fix-it guide (/fix-it): the problems learners hit most, by symptom, in one place. Each answer
// follows the chapter that teaches it (its "If something went wrong" box), with a link back there.
// Keep them in step: if a chapter's answer changes, change it here too.

export interface Fix {
  id: string;
  symptom: string;
  answer: string;
  ask?: string; // a message to paste into the AI chat, when that's the fix
  chapter: number;
}

export interface FixGroup {
  id: string;
  title: string;
  fixes: Fix[];
}

export const FIX_LOOP = `I expected: [what should have happened]
What happened instead: [what you saw, or the exact error message]
Please fix it, and give me the whole file again.`;

export const FIX_GROUPS: FixGroup[] = [
  {
    id: "chat", title: "In the AI chat",
    fixes: [
      { id: "limit", symptom: "It says I've reached a usage limit.", chapter: 1,
        answer: "Free plans limit how many messages you can send in a few hours. Take a break and come back later; your chat will still be there." },
      { id: "lost-chat", symptom: "I closed the tab and lost my chat.", chapter: 1,
        answer: "You haven't lost it. Open the AI tool again and look in your list of recent chats." },
      { id: "redesign", symptom: "The AI rebuilt the whole tool and it looks completely different.", chapter: 2,
        answer: "That happens; it's fine. Tell it to keep what you liked and change only one thing.",
        ask: "Please keep the previous design exactly, and only change [the one thing]." },
      { id: "tangle", symptom: "The AI built everything at once, and now it's a tangle.", chapter: 11,
        answer: "Start a new chat and build in slices: paste your brief and ask for the first slice only. Add the rest one piece at a time, testing after each.",
        ask: "Only build the first slice: [the core]. No extra features yet." },
      { id: "fix-fails", symptom: "I asked for a fix and it's still wrong, or something else broke.", chapter: 3,
        answer: "Use the three-tries rule. Tries 1 and 2: the fix loop again, with the new result and any new error message. Try 3: describe the problem differently, from what you clicked, typed and see. Still stuck? Go back to the last version that worked and try a different approach.",
        ask: "Please go back to the last version that worked, and let's try a different approach." },
      { id: "api-key", symptom: "The AI asks me for an API key.", chapter: 6,
        answer: "For the course you don't need one: ask it to work inside the chat without a key. Never paste a key into a chat or a tool you share.",
        ask: "Please build this so it works inside this chat without an API key." },
    ],
  },
  {
    id: "file", title: "Your tool saved as a file",
    fixes: [
      { id: "notepad", symptom: "Double-clicking opens Notepad or TextEdit, not my browser.", chapter: 4,
        answer: "The file probably ended up as tool.html.txt, or was saved as rich text on a Mac. Turn on file extensions so you can see the real name, then rename it to end in .html, or save it again as plain text." },
      { id: "blank", symptom: "The page is blank, or only part of the tool shows.", chapter: 4,
        answer: "The code was probably cut short. Open the file in Notepad or TextEdit and check that the last line is </html>. If it isn't, ask for the whole file again, paste over everything and save.",
        ask: "Please give me the whole file again, in one code block." },
      { id: "rupee", symptom: "The ₹ sign or other symbols look like strange characters.", chapter: 4,
        answer: "On Windows, save the file again with Encoding set to UTF-8. On a Mac, check the file was made plain text before you pasted." },
      { id: "forgot", symptom: "My data disappears when I reopen the file.", chapter: 4,
        answer: "Open the same file, in the same browser, not in a private window: the data lives in that browser, for that file. Chrome and Edge are the most dependable for this. If it's still empty, use the fix loop and ask it to save to localStorage." },
      { id: "moved", symptom: "My data vanished after I moved or renamed the file.", chapter: 4,
        answer: "Move it back, with the same name, and the data should return. To move it for good: Export first, move the file, then Import." },
      { id: "dates-iso", symptom: "Dates show in a strange format, like 2026-10-17.", chapter: 4,
        answer: "That's a common computer format. Ask for the Indian one.",
        ask: "Please show dates in Indian format, like 17 Oct 2026." },
    ],
  },
  {
    id: "data", title: "Spreadsheets and data",
    fixes: [
      { id: "upload", symptom: "The upload button does nothing.", chapter: 5,
        answer: "Choose the .csv file, not the Excel file. If it still fails, ask for a box to paste the data into instead.",
        ask: "Instead of uploading, let me paste the CSV text into a box." },
      { id: "download", symptom: "The Download button doesn't work.", chapter: 5,
        answer: "That's normal inside the AI chat's preview, which often blocks downloads. Add a Copy button, or save the tool as an .html file and use it from there.",
        ask: "Add a Copy button that copies the result with tabs between the columns, so I can paste it straight into Excel." },
      { id: "amounts", symptom: "The tool changed amounts it shouldn't touch.", chapter: 5,
        answer: "That breaks your \"what to avoid\" rule. Use the fix loop and quote the rule back to the AI, word for word." },
      { id: "off", symptom: "My totals are slightly off, or wildly off.", chapter: 5,
        answer: "Check the trap patterns first: a Total row counted, 1.2L read as 1.2, a comma that split a number, a date read month first. Work out one row by hand and compare." },
    ],
  },
  {
    id: "share", title: "Sharing a link",
    fixes: [
      { id: "password", symptom: "The link asks for a password, or says the project is private.", chapter: 7,
        answer: "New Netlify projects are private until you make them public. Go back to the Make public step in Chapter 7, then test the link again in a private window. If you dropped the folder without logging in, log in and drop it again." },
      { id: "phone", symptom: "It looks broken on my phone.", chapter: 7,
        answer: "Describe what you see to the AI, save the new file, drop the folder again on your project's Deploys page, and test again.",
        ask: "When I open this on a phone, [describe what you see]. Please make it work well on a small screen, and give me the whole file again." },
      { id: "no-change", symptom: "My change doesn't show up.", chapter: 7,
        answer: "Check you dropped the folder on your project's Deploys page, not the main Drop page, then refresh. If you ended up with a second site, delete the extra one." },
      { id: "mistake", symptom: "I shared something by mistake.", chapter: 7,
        answer: "Take it down straight away: delete or disable the project in Netlify, and the link stops working. Then tell anyone who needs to know." },
    ],
  },
  {
    id: "python", title: "Python and VS Code",
    fixes: [
      { id: "not-recognized", symptom: "\"python is not recognized\", or the Microsoft Store opens (Windows).", chapter: 8,
        answer: "Close VS Code completely and open it again. If that doesn't help, try py instead of python. If neither works, run the Python installer again and tick Add python.exe to PATH." },
      { id: "mac-python", symptom: "\"command not found: python\" (Mac).", chapter: 8,
        answer: "On a Mac, use python3, not python. If a pop-up offers to install command line developer tools, that's normal and safe: install, then try again." },
      { id: "no-module", symptom: "\"No module named pandas\" (or another library).", chapter: 9,
        answer: "The library isn't installed, or was installed for a different Python. Run the install command again, starting with exactly the word you use to run your script (python, python3 or py)." },
      { id: "no-file", symptom: "\"No such file or directory\" or \"cannot find the path specified\".", chapter: 9,
        answer: "Python can't find the file. Check that VS Code has the right folder open, and that the data sits where the script expects it, usually right next to the script." },
      { id: "permission", symptom: "\"Permission denied\" when saving an Excel file, or an error about a file starting with ~$.", chapter: 9,
        answer: "Excel has the file open. Close Excel and run the script again." },
      { id: "pip-red", symptom: "pip shows lots of red or yellow text.", chapter: 9,
        answer: "Yellow WARNING lines are usually harmless; look for \"Successfully installed\" near the end. If you see ERROR, copy the last few lines and use the fix loop." },
      { id: "admin", symptom: "The installer asks for an admin password I don't have.", chapter: 8,
        answer: "Stop there: it's a managed work laptop. Use a personal computer, or ask your IT team." },
    ],
  },
];
