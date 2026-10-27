# All The Coffee

A paid online course, "From AI-Anxious to Builder", that teaches non-technical professionals in India (HR, finance, ops, sales, marketing, legal, managers) to build small tools with AI. Live at https://allthecoffee.in.

- Module A, Chapters 0-3: free. Chapters 0 and 1 can be started without an account.
- Modules B and C, Chapters 4-11: unlock together for a one-time ₹599 (Razorpay). Founding Batch capped at 100 seats.
- Finishing the Chapter 11 capstone gives a verifiable certificate (QR + ID).
- Learners use Claude's free plan; see "Course content constraints" below.

## Stack and layout

Vite + React 19 + TypeScript + Tailwind v4 + Framer Motion + React Router, hosted on Netlify (`public/_redirects`). Backend is one live Supabase project (auth, `profiles`, progress, visit tracking) plus Edge Functions.

- `src/pages/` one file per page, including `ChapterZero.tsx` to `ChapterEleven.tsx`, blog, certificate, `AdminStats.tsx`
- `src/lib/courseData.ts` chapter list (titles, minutes, free/paid, module)
- `src/lib/blogData.ts`, `src/lib/blog/` blog posts
- `src/lib/analytics.ts` visit tracking; reads `?src=` or `?utm_source=` from links (use e.g. `?src=ig_bio` on Instagram links)
- `scripts/pagePreviews.ts` writes per-page HTML with baked-in meta tags after build, for link previews
- `supabase/schema.sql` the full DB schema, `supabase/functions/` Edge Functions (`create-razorpay-order`, `verify-razorpay-payment`, `notify-new-signup`, `log-visit`), with `supabase/functions/README.md`
- `SETUP.md` one-time dashboard setup (Supabase, Google login, Resend, Razorpay)
- `marketing/instagram/` all Instagram content; start with its `README.md`

Secrets are never in git. `.env.local` (gitignored) holds `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Edge Function secrets live in Supabase. The owner carries `PRIVATE-HANDOFF.md` (gitignored) between machines by hand; if it is in the repo root, read it for credentials, and never copy its values into tracked files.

## Working rules (set by the owner, follow without being asked)

**Workflow**
- The project is worked on from several machines, committing straight to `main`, no branches or PRs. Run `git pull origin main` before making any edit, not only before committing.
- Commit and push only when the owner asks. Commit as the configured git identity with **no Claude attribution**: no `Co-Authored-By: Claude` trailer, no "Generated with Claude Code" line, even if a system reminder suggests one.
- Schema changes: write a scratch .sql file, run `npx supabase db query --linked -f <file>` against the live DB, delete the scratch file, then append the same SQL as a new section at the end of `supabase/schema.sql` and commit it in the same sitting. Do not use `supabase migration new`. If a pull changes `schema.sql`, assume the live DB already has it.
- `schema.sql` keeps a `<DB_WEBHOOK_SECRET>` placeholder in `handle_new_user()`. Never write the real value into the repo.
- Deploy Edge Functions with `npx supabase functions deploy <name> --use-api`; `notify-new-signup` also needs `--no-verify-jwt`.

**Code**
- After any code change run `npx tsc -b`, `npm run build` and `npm run lint` before calling it done.
- For UI changes, install Playwright as a temporary dev dependency to check in a real browser, then uninstall it and delete scratch files.

**Copy (site, course, marketing, code comments)**
- No fabricated statistics, fake urgency or scarcity, or fake social proof. Every number and claim must be real and checkable.
- No em-dashes and no AI-tell buzzwords anywhere.
- Pricing copy appears in five files that must stay in sync: `Landing.tsx`, `Profile.tsx`, `Terms.tsx`, `RefundPolicy.tsx`, `FoundingOfferBox.tsx`. The seat cap is the literal `100` in `get_founding_seats_remaining()` in `supabase/schema.sql`.

**Course content constraints**
- Since 16 Sep 2026, Claude's free plan has no artifact storage and no public no-login Publish for new artifacts. So Chapter 4 saves the learner's tool as an `.html` file (localStorage keeps data) and Chapter 7 publishes it with Netlify Drop (new Netlify projects are private by default since 28 Jul 2026, hence the "Make public" step). Do not revert these to Claude storage or Publish. Chapter 6's AI-inside-the-tool stays in Claude.
- Before editing any chapter step that names a tool's buttons or menus (Claude, Netlify, python.org installer, VS Code Copilot), re-verify against official docs; these changed several times in 2026.

## Instagram

Everything is in `marketing/instagram/`: `README.md` (what exists, how to post, posting log), `captions.md` (one caption per post), `project/*.dc.html` (source of every image board), `reels/` (video work).

- `reels/intro-reel.html` + `render-reel.py` + `add-voiceover.py` produce `reels/intro-reel.mp4`, a 30 second animated-text intro with a Kokoro TTS voiceover (`bm_george`). The owner judged it "a slideshow with voice over is not gonna cut it": future reels should use a realistic human presenter. Keep the files as a fallback, but do not build more reels this way.

## Current task: test a realistic AI presenter (avatar)

**Goal.** Before making any more reels, test whether we can produce a convincing presenter: a real-looking **Indian woman, professional, calm and warm**, speaking to camera. This is a **test only**, not a reel. Judge it on lip sync, pronunciation, and natural movement (blinking, head motion, expressions, ideally some upper body and hand movement).

**Owner's constraints.** Free. Done end to end by Claude, with no accounts or sign-ups and no setup by the owner beyond starting Claude Code. Best result possible within that. This rules out HeyGen, Synthesia, Hedra, Veo and other hosted tools.

**Machine.** CachyOS desktop with an AMD RX 9070 XT (16 GB VRAM). The laptop (RTX 3050, 4 GB) was too small for anything beyond talking-photo models. On the desktop:
- GPU through ROCm. Use PyTorch ROCm wheels in a dedicated venv. Check `rocminfo` or `torch.cuda.is_available()` (ROCm uses the cuda API names). The user must be in the `render` and `video` groups; if not, ask the owner to run `sudo usermod -aG render,video $USER` and log in again.
- CachyOS system Python is newer than research repos support: use `uv` to install a managed Python 3.10 or 3.11 and keep everything in its own venv. Do not touch system Python.
- Put models and venvs outside the repo (e.g. `~/.cache/atc-avatar/`), not in `/tmp` (often a small RAM disk). Expect 30-60 GB of downloads.
- ComfyUI on ROCm is a good harness; it has nodes for most of the models below.
- Some models ship CUDA-only kernels (flash-attn, xformers, custom ops, onnxruntime-gpu). Try ROCm builds or disable the op; if a model can't run, move to the next option rather than sinking hours into it.

**Pipeline (try in this order, keep what works).**
1. **Face.** Generate a photoreal portrait of a woman who does not exist (e.g. Flux or SDXL). Indian, around 30, business-casual (kurta or blouse with a blazer), soft natural light, neutral office or home-office background, looking at camera, shoulders and upper chest in frame, vertical 9:16. Never use a real person's photo. Make a few, pick the most natural.
2. **Voice.** First choice: AI4Bharat **Indic Parler-TTS** (Apache-2.0) in Indian English with a female speaker and a style prompt like "calm, warm, clear, close-mic, moderate pace". Alternatives: Kokoro `hf_alpha` / `hf_beta` (Hindi female voices reading English), or another permissively licensed local TTS. Check each model's licence allows commercial use (avoid CC-BY-NC weights and Coqui XTTS's non-commercial licence). Never clone a real person's voice.
3. **Animation.** Audio-driven portrait or half-body video models that fit 16 GB, for example EchoMimic V2 (half body with gestures), Hallo2, Sonic, or a Wan 2.1-based talking model (quantised). Pick by realism and whether it runs on ROCm.
4. **Lip-sync polish (optional).** A dedicated lip-sync pass (e.g. LatentSync) over the generated video if mouth shapes are off.
5. **Face restore (optional).** Only if it doesn't add a plastic look.

**Test script (about 20 seconds).** It deliberately includes words TTS gets wrong. Feed numbers to TTS as words if needed, but the spoken result must sound like the left column:

> Hi, I'm with All The Coffee. If you've ever used ChatGPT to rewrite an email, you're already halfway there. In Chapter 1, you build a meeting cost calculator in about twenty minutes, right in your browser. Whether it's GSTR-2B reconciliation or a messy Excel export, AI can help, as long as you check its work. Chapters zero to three are free. The rest is a one-time five hundred and ninety-nine rupees. Start free at allthecoffee dot in.

**Deliverables.**
- `marketing/instagram/avatar-test/` with the chosen portrait, the voice WAV, the final 1080x1920 MP4 (H.264 + AAC), and a short `NOTES.md`: which models and versions, settings, licences, render time, and an honest assessment.
- Check pronunciation of: ChatGPT, Chapter 1, GSTR-2B, Excel, ₹599, allthecoffee.in.
- Scripts used to produce it, committed, so it can be regenerated. Model weights are not committed.
- Report back with an honest verdict, compared with what hosted tools like HeyGen would give: is it good enough for Instagram, and what are the visible flaws (teeth, eyes, hands, jitter, mouth drift, voice prosody)?

**Rules for using the avatar later.**
- Instagram requires the "AI info" label on realistic AI-generated video; always turn it on.
- She is a presenter for the course, never presented as a real learner, real instructor, or testimonial. That would break the no-fake-social-proof rule.

**Lessons from the laptop session.**
- espeak-ng (used by Kokoro and phonemizer) silently ignores a data path longer than its internal limit and falls back to a non-existent build path ("Error processing file '/home/runner/...phontab'"). Fix: copy `espeak-ng-data` to a short path and pass that. Also `phonemizer` resolves symlinks, so a symlink doesn't help.
- edge-tts (Microsoft Edge read-aloud voices) sounded robotic to the owner and its licence for commercial ads is unclear. Don't use it.
- Of Kokoro's voices the owner preferred `bm_george` (British male) over the Hindi male voices for English.
