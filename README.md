# All The Coffee

A course site for "From AI-Anxious to Builder": a browser-first course that teaches non-technical professionals to build small tools with AI. This repo currently contains Module A (Chapters 0-3) and Module B (Chapters 4-7), the landing page, a course overview page, and a learner profile page.

## Stack

Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion + React Router. No backend, no database, no API keys. Everything a learner does (progress, saved answers, check-ins) is stored in their browser's `localStorage`, nothing is sent to a server.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally to sanity-check it
```

## Deploying

This is a static single-page app: the build output in `dist/` is plain HTML/CSS/JS with no server-side code, so it works on any static host's free tier. The only thing a static host needs to get right is **SPA fallback routing**: because this app uses client-side routing (`/chapter/3`, `/profile`, etc.), the host must serve `index.html` for any unknown path instead of returning a 404, otherwise a direct link to `/chapter/3` or a page refresh on it will break.

**Recommended: Netlify or Cloudflare Pages.** Both have generous free tiers, deploy straight from a git repo or a drag-and-drop of the `dist/` folder, and both honor the included `public/_redirects` file out of the box (it's copied into `dist/` on build). No extra configuration needed:

- Netlify: build command `npm run build`, publish directory `dist`.
- Cloudflare Pages: same build command and output directory.

**Vercel** works the same way and will pick up the included `vercel.json` rewrite rule automatically. Build command `npm run build`, output directory `dist`.

**GitHub Pages** also works, but needs one extra step the other three don't: GitHub Pages has no server-side rewrite support, so the common workaround is to duplicate `dist/index.html` as `dist/404.html` after building, so an unknown path falls back to the app shell. If the site lives at a repo subpath (`username.github.io/repo-name`) rather than a custom domain, `react-router-dom`'s `BrowserRouter` also needs a `basename="/repo-name"` prop, or the routes will all 404.

No environment variables, secrets, or build-time configuration are required for any of the above.
