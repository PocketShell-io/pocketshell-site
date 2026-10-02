# PocketShell design contract

## Attack on the original

- The centered 54px system-font hero has the same silhouette as a generic SaaS template.
- Blue conversion buttons and blue article titles borrow GitHub's identity instead of creating PocketShell's.
- Hero and feature chips repeat claims already present in adjacent paragraphs.
- Steps, downloads, security, articles, FAQ and the closing CTA all use near-identical dark rounded boxes, flattening the hierarchy.
- The four-cell fact strip competes with the product capture before the visitor sees the interface.
- Feature illustrations repeat window chrome and anonymous device silhouettes.
- The closing generated illustration adds no product evidence.
- The landing page and blog use system fonts with little distinction between marketing and technical notation.

## Direction: a field manual for work in progress

Paper, ink, signal. The real desktop capture is the primary visual evidence. The oversized headline is the only marketing display moment. Supporting sections read as an engineered document, using rules, numbered rows and deliberate changes in density.

- Fonts: self-hosted Space Grotesk regular/700 for prose and display; IBM Plex Mono 400 for notation, numbers, metadata and terminal illustrations. Font licenses live beside the assets.
- Type: headline 104px maximum, 46px minimum; section heads 48/34px; feature heads 32/26px; body 17px; lede 20px; technical metadata 12px. Body line-height 1.65, display 0.98, section heads 1.1.
- Palette: paper #f3f1e9, white #faf9f4, ink #20241f, muted #62675d, rule #c9ccc0, orange #b83b16 (accessible text/fill), bright orange #e25b30 (large display only), terminal #171b18, terminal text #e9ede3, terminal muted #a4b09f, green #96c77b. No gradients.
- Radius: 0 everywhere in the site UI; product screenshots retain their actual interface. No floating shadows.
- Borders: 1px rules. The screenshot uses a solid ink frame with a mono caption. No bordered cards around explanatory prose.
- Spacing: 8px base; 24px mobile gutters, 48px desktop gutters; content maximum 1248px; sections 96px desktop / 64px mobile; reading width 760px.
- Buttons: hard rectangular, minimum 44px height, orange primary and ink outline secondary; hover changes fill with no motion. Links underline on hover; prose links always underlined.
- Badges: plain mono notation; no pills. Tables/host previews: ruled rows within a dark terminal surface. Inputs: square, paper background, ink border, minimum 48px height. FAQ: ruled disclosure rows, minimum 56px targets. Native details behavior remains intact. No custom dialogs needed on this static site.
- Header/footer shared across landing and blog. All navigation retained at small widths with wrapped 44px targets.
- Focus: 2px orange outline with 4px offset. No animation; reduced motion remains static. Content never overflows at 320px. Technical preformatted blocks may scroll inside their own containers.
- Preserve sign-in/download destinations, newsletter behavior and confirmation tokens, security caveats, alpha availability, contribution attribution and blog content/SEO.

## Banned

System-font identity, blue/purple decoration, pastel chips, ornamental gradients, rounded card grids, shadow stacks, repeated eyebrow labels, redundant icons, fabricated product screenshots, decorative generated hero artwork, and equal emphasis on every section.

## Accepted review

Independent adversarial reviewer verdict: **ACCEPT**.

The reviewer inspected the landing page, blog index and a long SSH article at
1440, 768, 390 and 320px, along with open FAQ and newsletter success states.
All acceptance criteria passed: visual hierarchy and page-family consistency,
responsive layout without page overflow, keyboard focus and FAQ controls,
contrast, 44px navigation/primary controls, reduced motion, and destinations.
No blocking or material design issue remained.

Evidence: `.tmp/design/{landing,hero,blog,post}-{1440,768,390,320}.png`,
`faq-open.png`, `signup-success.png`, and `confirmation-mobile.png`.
All screenshot images were decoded before capture. Newsletter success and
confirmation were checked with intercepted API responses, without sending email.
`make check` passed for 14 sitemap pages, 13 blog pages and 134 internal blog links;
`git diff --check` passed.


## Follow-up: product facts and security

The four product facts now sit below the product capture as a light, ruled strip
with benefit headings and short supporting copy. Four columns become two on
tablets and a single reading column on phones.

The security section uses a connected three-step host-sync path: local key
derivation, local encryption, and ciphertext sync. Private SSH key handling sits
outside that path with the authenticated WSS/in-memory bridge caveat intact.
The server CLI dependency remains visible in a separate footer line.

Section evidence: `.tmp/design/facts-{1440,768,390,320}.png` and
`.tmp/design/security-{1440,768,390,320}.png`.

Follow-up independent reviewer verdict: **ACCEPT**. The reviewer checked all
four section widths, the FAQ action and keyboard disclosure, reduced motion,
and mobile blog/article regressions. No blocking or material issue remained.
