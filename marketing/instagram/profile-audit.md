# @all.the_coffee profile audit (1 November 2026)

Read through the Instagram Graph API on 1 Nov 2026: 9 followers, 12 posts (9 images, 3 reels). The API can't edit the bio, old captions, pins or highlights, so those are listed as tasks with the exact text to paste.

## What the numbers say

| Post | Date | Type | Reach | Views | Likes | Saves / shares / comments |
|---|---|---|---|---|---|---|
| Intro: "I'm just not a tech person" | 17 Oct | Image | 6 | 15 | 5 | 0 |
| Vibe coding | 19 Oct | Image | 5 | 14 | 5 | 0 |
| Hallucination | 19 Oct | Image | 8 | 19 | 5 | 0 |
| ChatGPT Go free year | 20 Oct | Image | 7 | 19 | 4 | 0 |
| r/IndianWorkplace automation | 22 Oct | Image | 5 | 19 | 5 | 0 |
| Monday ChatGPT routine | 25 Oct | Image | 3 | 7 | 4 | 0 |
| API, restaurant version | 25 Oct | Image | 3 | 8 | 4 | 0 |
| **Intro reel** | 25 Oct | **Reel** | **31** | 35 | 4 | 0 |
| Appraisal self-review | 27 Oct | Image | 3 | 12 | 5 | 0 |
| 92% of Indian knowledge workers | 31 Oct | Image | 3 | 6 | 3 | 0 |
| **Chapter 9 reel** | 31 Oct | **Reel** | **12** | 16 | 3 | 0 |
| **GSTR-2B reel** | 31 Oct | **Reel** | **20** | 25 | 3 | 0 |

- Reels reach 4 to 10 times more accounts than images. Images mostly reach your own followers; reels get shown to strangers. Lead with reels.
- Three posts went up on 25 Oct and three on 31 Oct. Posts on the same day compete with each other, and reach fell for every one of them. One post a day, at most.
- No post has a save, share or comment yet. Every caption should give one clear reason to do one of these.

## 1. Bio (Edit profile in the app)

Current: "Practical AI skills for HR, finance, ops & sales teams / Build real tools with AI. No coding background needed. / start free"

The last line is lowercase and doesn't say what's free. Suggested (under 150 characters):

```
AI for HR, finance, sales & ops. No coding.
Build real work tools in 20 min ☕
Free tools + Chapters 0 to 3 free 👇
```

Name field "All The Coffee | AI at Work" is good: the name field is searchable, so keep "AI at Work" in it.

## 2. Bio link

Current: `http://allthecoffee.in/?src=ig` (http, not https).

- This week, while Reel 4 is fresh: `https://allthecoffee.in/tools/ctc-calculator?src=ig_reel4`
- After that, the default: `https://allthecoffee.in/?src=ig_bio`

The `?src=` part shows up in the site's visit stats, so you can see which reel brought people.

## 3. Fix three old captions (open the post, ··· , Edit)

Posts 1 to 3 use em-dashes, which the copy rules don't allow. Post 1 also says the price "goes back to ₹999 the moment Module C launches": Module C is live and the price hasn't changed, so that line is no longer true. Replacements below keep everything else.

**Post 1, 17 Oct (instagram.com/p/DeloArGEewq):**

```
"I'm just not a tech person."

You've said it. Maybe this week.

Here's the thing: you were never behind. Nobody ever showed you the actual first step, so "AI" turned into this vague, overwhelming thing happening to everyone except you.

All The Coffee fixes that. No coding background. No jargon you have to pretend to understand in meetings. Just you, a browser, and your first real AI-built tool in about 20 minutes.

☕ Chapters 0 to 3 are free. No card. Build your first tool before you decide anything.
☕ Chapters 4 to 11: a one-time ₹599 (Founding Batch, capped at 100 seats).
☕ Built for HR, finance, ops, sales and marketing people, not developers.

You don't need a technical bone in your body. You need 20 minutes and the willingness to find out you were wrong about yourself.

Start free: link in bio.

#AllTheCoffee #LearnAI #AIForBeginners #AIatWork #IndianProfessionals
```

**Post 2, 19 Oct, vibe coding (instagram.com/p/Deq6omIRA-5):** replace the two dashed sentences:
- "No years of learning syntax first. No CS degree. Just a clear description and a few rounds of feedback, the same way you'd brief a colleague."
- "You're not behind by learning it this way. This is how it's actually done."

Then add at the end: `#VibeCoding #AIatWork #PracticalAI`

**Post 3, 19 Oct, hallucination (instagram.com/p/Deq67epR07X):** replace "It's when AI states something false — a date, a name, a number — as if it's completely certain." with:
- "It's when AI states something false, like a date, a name or a number, as if it's completely certain."

Then add at the end: `#AIHallucination #AIatWork #PracticalAI`

## 4. Pin three posts (open the post, ··· , Pin to your profile)

Pinned posts are the first thing a new visitor sees. Pin, in this order:
1. Reel 4 (CTC calculator), once it's live tonight: the most broadly useful one.
2. The intro reel (25 Oct): your best reach so far, and it explains the course.
3. Post 1 (intro image), after fixing its caption: who it's for and what's free.

## 5. Story highlights (Profile, + New)

Two highlights, each with a cover in the brand colours:
- **Free tools**: share each tool reel to your Story with a link sticker to its `/tools/...` page, then save to this highlight.
- **Start here**: one Story with a link sticker to Chapter 0, plus the intro reel.

## 6. Every new reel

- Share it to your Story within the first hour, with a link sticker to the tool. Story link stickers are clickable, captions are not.
- Reply to every comment in the first hour; early replies count towards how far the reel is pushed.
- Post one reel a day at most, around 7:30 PM IST, and nothing else that day.
- Keep 3 to 5 hashtags, specific to the topic (#inhandsalary beats #CareerGrowth).
- For image posts, add alt text (Advanced settings, Write alt text): it helps accessibility and search.

## 7. Content mix from here

- Reels first: the five tool reels (4 to 8), one every one or two days, then more in the same format.
- Keep image posts for explainers people save (API, hallucination): end them with "Save this for your next meeting" to earn saves.
- The site's Founding offer box shows "Limited time" and a struck-through ₹999. If ₹999 isn't a price you'll actually charge on a set date, that's the kind of urgency the copy rules rule out; worth a decision before posting anything that repeats it.

## What can be automated from here

publish.py can post reels to Instagram and the Facebook Page (scheduled), reply to comments, and pull these numbers again. Ask for a weekly report and it can be added.
