import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { BLOG_POSTS } from "../src/lib/blogData.ts";
import { CHAPTERS, chapterPageMeta } from "../src/lib/courseData.ts";
import { PAGE_META } from "../src/lib/pageMeta.ts";

// Link previews (WhatsApp, LinkedIn, X, Slack) and search crawlers read the
// raw HTML and never run our JavaScript, so without this every URL would show
// the home page's title and description. After the build, this writes one
// copy of index.html per public page (dist/blog/<slug>.html and so on) with
// that page's own tags baked in. Netlify serves those files before the SPA
// fallback in _redirects, and React takes over as normal once loaded.

const SITE = "https://allthecoffee.in";
const SITE_NAME = "All The Coffee";

interface Preview {
  path: string;
  title: string;
  description: string;
  article?: { publishedDate: string };
}

function fullTitle(title: string) {
  return `${title} | ${SITE_NAME}`;
}

function escapeAttr(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function collectPreviews(): Preview[] {
  const pages = Object.entries(PAGE_META).map(([path, meta]) => ({ path, ...meta }));
  const posts = BLOG_POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    article: { publishedDate: post.publishedDate },
  }));
  const chapters = CHAPTERS.filter((c) => c.live).map((c) => ({ path: c.path, ...chapterPageMeta(c) }));
  return [...pages, ...posts, ...chapters];
}

// Replaces exactly one match, so a template change that breaks a pattern
// fails the build instead of silently shipping the home page's tags.
function replaceOnce(html: string, pattern: RegExp, replacement: string, label: string) {
  const matches = html.match(new RegExp(pattern.source, "g"));
  if (matches?.length !== 1) {
    throw new Error(`pagePreviews: expected one ${label} in index.html, found ${matches?.length ?? 0}`);
  }
  return html.replace(pattern, replacement);
}

function renderPreview(template: string, preview: Preview) {
  const url = SITE + preview.path;
  // Previews already show og:site_name, so only the tab title gets the suffix.
  const tabTitle = escapeAttr(fullTitle(preview.title));
  const title = escapeAttr(preview.title);
  const description = escapeAttr(preview.description);
  const setMeta = (html: string, attr: string, value: string) =>
    replaceOnce(html, new RegExp(`(<meta ${attr} content=")[^"]*(")`), `$1${value}$2`, attr);

  let html = template;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${tabTitle}</title>`, "<title>");
  html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, "canonical link");
  html = setMeta(html, 'name="description"', description);
  html = setMeta(html, 'property="og:title"', title);
  html = setMeta(html, 'property="og:description"', description);
  html = setMeta(html, 'property="og:url"', url);
  html = setMeta(html, 'name="twitter:title"', title);
  html = setMeta(html, 'name="twitter:description"', description);

  if (preview.article) {
    html = setMeta(html, 'property="og:type"', "article");
    const articleLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: preview.title,
      description: preview.description,
      datePublished: preview.article.publishedDate,
      url,
      image: `${SITE}/og-image.png`,
      author: { "@type": "Organization", name: SITE_NAME, url: `${SITE}/` },
      publisher: { "@type": "Organization", name: SITE_NAME, url: `${SITE}/` },
    });
    html = replaceOnce(
      html,
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<meta property="article:published_time" content="${preview.article.publishedDate}" />\n    <script type="application/ld+json">${articleLd}</script>`,
      "JSON-LD block",
    );
  }
  return html;
}

export function pagePreviews(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "page-previews",
    apply: "build",
    configResolved(resolved) {
      config = resolved;
    },
    closeBundle() {
      const outDir = join(config.root, config.build.outDir);
      const template = readFileSync(join(outDir, "index.html"), "utf8");
      const previews = collectPreviews();
      for (const preview of previews) {
        const file = join(outDir, `${preview.path.slice(1)}.html`);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, renderPreview(template, preview));
      }
      config.logger.info(`page-previews: wrote ${previews.length} pages`);
    },
  };
}
