# PocketShell design contract

## Authoritative reference

The user-supplied `references/pocketshell-landing.dc.html` is the visual reference for the current homepage and shared page chrome. Earlier paper/orange and sparse dark-shell interpretations are superseded. The reference supplies the centered display hero, sticky 56px topbar, project-style navigation rail, charcoal panels, cyan signal color, compact typography, modest rounded corners and dense product presentation. Later user corrections remove the hero eyebrow, show header section navigation only when the sidebar is absent, and remove the bottom bar’s section list. Setup follows actual installation and app actions; the contribution graph is an aspirational example across the author’s projects.

The homepage workspace remains the actual copied Vue/xterm desktop renderer. The reference's reconstructed product mock is replaced by that real renderer. Its app components, styles, icons, fonts and bundled assets remain byte-identical to the desktop build. A separate browser adapter supplies local sample sessions, files and simulated replies.

## Site typography and palette

- Self-hosted IBM Plex Sans variable 400–700 for body text, interface labels and display type. Section/display headings use 600; body uses 400; actions use 500 or 600.
- Self-hosted JetBrains Mono variable 400–700 for technical labels, metadata and command text. The desktop renderer keeps its own original font files.
- The font assets are WOFF2 files under `fonts/`, with original SIL Open Font License files alongside them. The page does not call Google Fonts at runtime.
- Canvas `#0e1013`; panel `#15181d`; topbar/terminal ground `#0b0d10`; normal text `#e4e6ea`; strong text `#f3f4f6`; supporting text `#a9aeb6`; secondary chrome `#8a909a`; border `#23272e`; elevated border `#33383f`; cyan `#5fd0ea`; cyan hover `#8fe0f2`.
- Radius: 6–7px buttons, 8–10px panels/visuals. Rounded status notation may follow the supplied reference. Do not add ornamental gradients or unrelated decorative colors.
- The reference's hierarchy governs type scale and spacing. Shared header brand is 17px/600, navigation 15px, action text 14px. Blog/article display uses 600 weight and compact negative tracking; prose remains 17–18px with a generous reading line height.

## Shared page family

The shared header uses the reference’s compact charcoal strip, cyan terminal brand mark, navigation tabs, sign-in action and cyan Open PocketShell button. Desktop chrome is sticky at 56px. Small screens wrap navigation into a readable second row, preserving all destinations and 44px targets. Blog pages do not acquire the homepage’s project navigation rail.

Shared footer identifies PocketShell as open-source SSH for desktop, web and Android. Its GitHub destination is the PocketShell organization. It does not include a founder-origin story. Blog cards and code surfaces use the same charcoal panel/rule/radius vocabulary; articles retain a comfortable reading width.

## Behavior and factual constraints

- Preserve app/download URLs, alpha availability, newsletter confirmation behavior, legal pages, article content and SEO metadata.
- Preserve host-list encryption, passphrase/no-reset caveats and private-key bridge handling. A visual redesign does not authorize stronger security or uptime claims.
- Keep the real renderer isolated inside its iframe. Its demo backend never opens SSH or sends prompts to an AI service. The caption identifies demo sessions, and the separate full-screen link exposes the same application.
- Mobile product canvas can scroll horizontally to preserve the actual desktop interface; disclose the gesture and provide the full-screen link. The site page itself must not overflow horizontally at 320px.
- Keep keyboard focus visible, real app controls unchanged and reduced-motion behavior usable.
- The homepage side panel has a keyboard-accessible hide/show toggle with a remembered preference. The embedded app retains its native session-panel hide/show controls.
- Seed the actual composer’s saved geometry at 520×190 for a compact initial panel; preserve native resize, expand, hide and per-session draft behavior. Session demos represent distinct tasks and retain their individual terminal histories.

## Verification

Build the site and run its SEO/internal-link checks plus renderer hash verification. Screenshot the homepage, blog index, an article and a legal page on desktop and small mobile. Exercise the actual embedded renderer’s session switch, tabs, composer send and file read. Verify original renderer bundle hashes against the source manifest and inspect preview styles against the app’s actual markdown stylesheet.

Independent review verdict: **ACCEPT**. The supplied composition passed eight viewport/breakpoint checks; actual app controls, original asset hashes, newsletter states and first-load scroll behavior passed. See `redesign-review.md`.
