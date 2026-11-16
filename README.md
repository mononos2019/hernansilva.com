# hernansilva.com

Personal website for Hernan Silva, built with [Astro](https://astro.build) as a fully static site and hosted on Cloudflare Pages.

## Project layout

| Path | What it is |
| --- | --- |
| `src/layouts/Base.astro` | Shared page shell: `<head>` / SEO tags, global CSS, nav, footer, shared scripts |
| `src/pages/index.astro` | Home page (pulls in `src/_sections/home-top.html` and `home-contact.html`, plus the 3 latest posts) |
| `src/pages/blog/index.astro` | Blog listing with Pagefind search and category filter |
| `src/pages/blog/[...slug].astro` | Individual blog post pages |
| `src/pages/news.astro`, `src/pages/certifications.astro` | News & press, certifications |
| `src/pages/sitemap.xml.ts`, `src/pages/rss.xml.ts` | Generated sitemap and RSS feed |
| `src/content/blog/*.md` | Blog posts (Astro content collection, schema in `src/content.config.ts`) |
| `src/lib/images.ts` | Build-time helpers: image width/height lookup, optimized image paths, blog card thumbnails |
| `scripts/prepare-images.mjs` | Runs before every build/dev start: writes resized, compressed copies of blog images and the logo, plus small WebP card thumbnails, to `public/optimized/` (git-ignored). Originals in `public/` are never changed. |
| `public/` | Static files copied as-is (images, favicon, `robots.txt`, `og-image.jpg`) |
| `index.html` (repo root) | Legacy single-page version of the site. Not used by the Astro build. |

Fonts (DM Sans and Cormorant Garamond) are self-hosted through `@fontsource` packages, so no request goes to Google Fonts.

## Adding a blog post

1. Add the image to `public/images/blog/` (JPG or PNG). Any size works: the build makes a ~1200 px wide compressed JPG for the post header and social share (`og:image`) picture, and a small WebP thumbnail for the blog cards.
2. Create `src/content/blog/<url-slug>.md`:

   ```md
   ---
   title: "Post title"
   date: 2026-11-16
   category: "AI & Automation"   # or "IT & MSP" or "Personal"
   tags: ["AI", "productivity"]
   image: "/images/blog/33.jpg"
   imagePosition: "center top"   # optional, crop focus for the card image
   excerpt: "One or two sentences shown on cards and in search results."
   draft: false
   ---

   Post body in Markdown...
   ```

3. Commit and push (through a pull request, since `main` is protected). The optimized images, sitemap, RSS feed, and search index are generated automatically during the build.

## Local development

```bash
npm ci
npm run dev       # local dev server
npm run build     # optimize images + astro build + Pagefind search index -> dist/
npm run preview   # serve the built dist/ locally
```

Node 24 is used in CI.

## How it deploys

`.github/workflows/deploy.yml` runs on every push to `main`: it installs dependencies, runs `npm run build`, and deploys `dist/` to the Cloudflare Pages project `hernansilva` with Wrangler. The live site updates about a minute later.

## Security headers

The security headers on the live site (including the `Content-Security-Policy`) are set in Cloudflare on the `hernansilva.com` zone, not in this repo. If a new third-party script, font, or form endpoint is added, the CSP there has to allow it too.
