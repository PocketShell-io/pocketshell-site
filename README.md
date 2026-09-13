# pocketshell-site

The static pocketshell.io website: landing page, blog, feeds — built with
[rustkyll](https://github.com/alexeygrigorev/rustkyll) (a Jekyll drop-in in
Rust, same as datatalksclub.github.io) and deployed via GitHub Pages.

The PocketShell web app itself lives in
[pocketshell-web](https://github.com/alexeygrigorev/pocketshell-web) and is
served from **app.pocketshell.io** (S3 + CloudFront). Every "Sign in" CTA on
this site points there, landing directly on the sign-in screen.

## Layout

- `index.html` + `_layouts/landing.html` — the landing page (hero desktop
  mock, contribution calendar, FAQ). The mock's content lives in
  `_data/desktop-mock.yml`; `js/landing.js` toggles folders/tabs.
- `_posts/` — blog posts (`_posts/YYYY-MM-DD-<slug>.md`, permalink
  `/blog/<slug>/`). `reading_minutes` and the other front-matter fields
  drive the post layout and cards.
- `_data/gh-history.json` — GitHub contribution snapshot for the calendar.
- `blog.css` — blog-page styles; `style.css` — landing-page styles (both
  inherited from the web app, kept at the same URLs as before the split).
- `app.md`, `login.md` — noindex meta-refresh pages so old
  pocketshell.io/app and /login bookmarks land on the app subdomain.

## Commands

    make install   # fetch the rustkyll binary into .bin/
    make serve     # dev server on http://localhost:4000
    make build     # production build into _site/
    make graph     # re-render the contribution calendar SVG

## Contribution calendar

    python3 scripts/sync-gh-history.py   # refresh _data/gh-history.json (gh CLI)
    python3 scripts/gen-contrib-graph.py # re-render _includes/contrib-graph.svg

Neither needs to be fresh; run them when you feel like it.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds with rustkyll and
publishes to GitHub Pages. The custom domain (pocketshell.io) is set in the
repo's Pages settings and in the `CNAME` file; DNS lives in the Route 53
zone `pocketshell.io` (apex + www → GitHub Pages, `app` → CloudFront; see
`aws-infra/sandbox/pocketshell-web`).
