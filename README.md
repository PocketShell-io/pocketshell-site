# pocketshell-site

The static pocketshell.io website: landing page, blog, feeds — built with
[rustkyll](https://github.com/alexeygrigorev/rustkyll) (a Jekyll drop-in in
Rust, same as datatalksclub.github.io) and deployed via GitHub Pages.

The PocketShell web app itself lives in
[pocketshell-web](https://github.com/alexeygrigorev/pocketshell-web) and is
served from **app.pocketshell.io** (S3 + CloudFront). Every "Sign in" CTA on
this site points there, landing directly on the sign-in screen.

## Layout

- `index.html` + `_layouts/landing.html` — the landing page (interactive workspace
  demo, contribution calendar, FAQ). The vector desktop capture lives in
  `images/desktop/session-workspace.svg`. It is exported from the actual Vue
  and xterm desktop renderer with sample session data. All shapes and text
  are vector paths; it contains no embedded images.
- `_posts/` — blog posts (`_posts/YYYY-MM-DD-<slug>.md`, permalink
  `/blog/<slug>/`). `reading_minutes` and the other front-matter fields
  drive the post layout and cards.
- `_data/gh-history.json` — GitHub contribution snapshot for the calendar.
- `_includes/interactive-demo.html`, `demo.css`, `js/demo.js` — the frame and lazy
  loader for the actual PocketShell desktop renderer.
- `demo/assets/` — unchanged compiled Vue/xterm app assets copied from the built
  sibling desktop app. `demo/adapter.js` replaces Electron IPC with in-memory
  sessions, files and terminal responses. `renderer-manifest.json` records asset
  SHA-256 hashes. `demo/preferences.js` seeds a compact 520×190 native prompt
  composer; users can resize it normally. Each session has its own sample task
  and terminal history. The preview supports opening the app in a full browser tab.
- `style.css` — shared reference typography, charcoal/cyan tokens and page shell.
- `landing-design.css`, `js/landing-design.js` — the supplied landing composition,
  responsive navigation, a persistent hide/show sidebar toggle, section highlighting
  and the fixed page status bar.
  `docs/references/pocketshell-landing.dc.html` preserves the original design export.
  `blog.css` imports it and adds article and blog-index layouts.
- `fonts/` — self-hosted IBM Plex Sans and JetBrains Mono from the supplied design,
  plus legacy font assets, with licenses. The embedded app retains its own fonts.
- `docs/design-contract.md` — visual direction, design rules, and the original
  interface audit. Design-review screenshots belong in ignored `.tmp/design/`.
- `app.md`, `login.md` — noindex meta-refresh pages so old
  pocketshell.io/app and /login bookmarks land on the app subdomain.

## Commands

    make install   # fetch the rustkyll binary into .bin/
    make serve     # dev server on http://localhost:4000
    make build     # production build into _site/
    make check     # build, check SEO and verify original demo assets (requires Node.js)
    make graph     # re-render the contribution calendar SVG
    make demo      # copy the built desktop renderer into demo/

Refresh the embedded app after building the sibling desktop app:

    make demo

This copies the original renderer assets without changing its components or CSS.
Only the browser entry point loads the local IPC adapter before the app starts.
The homepage embeds the app; the desktop layout can scroll within its frame on
small screens. The standalone renderer remains available at `/demo/`.

Regenerate the desktop capture after building the sibling desktop app:

    node scripts/capture-desktop-svg.cjs ../pocketshell-desktop

This uses the desktop app's installed Playwright and Chromium, plus
`pdftocairo` (Poppler). Set `CHROMIUM_PATH` if Chromium is installed elsewhere.
The capture uses the built `out/renderer` bundle and a sample IPC transport;
Vue renders the app and xterm renders the sample terminal stream. Chromium
prints the screen to vector PDF, then Poppler exports SVG with outlined font
glyphs. Decorative shadows and filters are disabled to avoid rasterization.
The script rejects any export containing raster images or HTML objects.

## Contribution calendar

    python3 scripts/sync-gh-history.py   # refresh _data/gh-history.json (gh CLI)
    python3 scripts/gen-contrib-graph.py # re-render _includes/contrib-graph.svg

Neither needs to be fresh; run them when you feel like it.

## Website analytics

The `pocketshell-site` GA4 web stream belongs to the existing Pocket Shell
property (`541426830`, account `397810399`). Its measurement ID is set in
`_config.yml`. The shared analytics include loads `js/analytics.js` on public
pages. Google Analytics loads only after visitors accept analytics; the footer
allows them to change their choice. Tracking runs only on pocketshell.io and
www.pocketshell.io, never local previews or app.pocketshell.io. Query strings
and fragments are stripped from page URLs/referrers. Advertising signals are
disabled. Enhanced measurement covers page views, scrolls, outbound clicks,
and downloads; form interactions, site search, and video events are disabled.

## Deploy

The generated canonical, Open Graph, and structured-data URLs must match
the sitemap URLs, including the trailing slash. Use `page.url` / `p.url`
in templates and link directly to `/blog/<slug>/` in Markdown. The SEO
check runs on pull requests and before deployment. It also checks that
descriptions fit within 160 characters and titles within 70; these are
editorial limits for this site, not search-engine guarantees. A post can
set `seo_title` for a shorter search title while keeping its visible `title`.

Push to `main` → `.github/workflows/deploy.yml` builds with rustkyll and
publishes to GitHub Pages. The custom domain (pocketshell.io) is set in the
repo's Pages settings and in the `CNAME` file.

> DNS does NOT live here. Domain / DNS changes (A, AAAA, CNAME, TXT —
> e.g. `google-site-verification`) belong in
> `aws-infra/sandbox/pocketshell-web`: the Route 53 `pocketshell.io` zone
> is defined in `template.yaml` (apex + www → GitHub Pages, `app` →
> CloudFront via `domain.yaml`; `route53-site-records.json` holds the
> hand-applied apex/www records).

## Illustration assets

Regenerate the landing, social, and feature assets with
`uv run --script scripts/generate-editorial-images.py`.
The original blog PNG and WebP artwork is preserved at its existing paths and
1200×630 dimensions. The generator does not modify blog covers.
The design and copy contracts live in `docs/`; rendered review evidence goes in `.tmp/`.
