# Independent adversarial review — 3 October 2026

Final verdict: **ACCEPT** against the user-supplied `PocketShell_Landing.dc.html` reference.

The previous design and reconstructed-demo acceptance are superseded. This candidate follows the supplied composition while retaining the user's earlier requirements: embed the actual app, preserve working newsletter signup and security details, remove the founder story, and link GitHub navigation to the PocketShell organization.

## Reference fidelity

Independently checked 1440, 1180, 1179, 900, 899, 768, 390 and 320px. The header is sticky and 56px tall; the sidebar is 250px wide and appears at 1180px; header tabs appear at 900px; the light bottom status strip is fixed and 28px tall. The centered hero, RUNNING pill, white/cyan two-line title, centered copy and actions, prompt-style section bars, nine-row navigation and grouped downloads follow the reference. IBM Plex Sans and JetBrains Mono are self-hosted. Section navigation updates the selected row, top tab and status text.

The mobile header fits, the sidebar and primary tabs hide at the reference thresholds, the hero retains its intended two lines, and the newsletter becomes a clean single column. All eight FAQ entries remain, with the first open initially. No leftover DC/support custom elements or the rejected personal origin story remain.

A blocking initial-load issue was found and fixed during review: the actual application's composer focus scrolled the landing page before user input. The embedded transport bridge now prevents that focus from moving the parent viewport; original application assets remain unchanged. Fresh loads at 1440, 1180, 900, 768, 390 and 320px stayed at scrollY 0 after 2.3 seconds, with header top 0 and no horizontal page overflow.

## Actual application fidelity and interaction

Calculated SHA-256 for all 51 exported renderer JavaScript, CSS and font files. Every hash matches both the source desktop build and `demo/renderer-manifest.json`. The app uses the original Vue components, xterm, provider SVGs, tabs, composer and file browser. Markdown previews use the app's native exported stylesheet and palette.

Exercised the final embedded app at 1440, 768, 390 and 320px: select API project, switch to OpenCode session, open composer, send a prompt and observe the local xterm reply, create Files tab, open README, switch to the original code editor and return to terminal. Each width confirmed Vue, xterm and actual SVG controls. All passed with zero JavaScript errors, zero requests outside the local site and no page overflow.

Phones preserve a 900px desktop canvas inside a horizontally scrolling preview, with an explicit swipe hint and full-screen link. This is the original desktop UI with local sample host responses; it opens no SSH connection or AI request.

## Functional and copy preservation

Reference-styled newsletter verification-request success, rate-limit failure, already-subscribed response and token confirmation passed with intercepted API responses. Every request state cleared aria-busy; confirmation removed the token from the URL. No real email was sent. Native FAQ interaction and status tracking passed at all eight widths. The PocketShell organization links and real server-CLI/security details remain.

Adversarial copy verdict: **ACCEPT** within the supplied reference. Its hero language is preserved as instructed and supported by explicit agent/device/host context. Alpha allowlisting and Google sign-in stay visible. The reconstructed app and fake signup behavior from the reference were correctly replaced with the previously required original renderer and actual newsletter transport. The removed founder story was correctly kept absent.

No blocking design, reference-fidelity, app-fidelity or functional issue remains.

Evidence: `.tmp/design-review/reference-results.json`, `reference-final-results.json`, `reference-state-results.json`, `reference-final-hero-{1440,1180,900,768,390,320}.png`, reference FAQ/newsletter captures, `actual-results.json`, and `actual-demo-{1440,768,390,320}.png` / `actual-files-{1440,768,390,320}.png`. Review harnesses are stored in the same directory.

## Follow-up: panel controls and compact composer

Independent follow-up verdict: **ACCEPT**.

At 1440 and 1180px, the homepage side panel collapses, stays collapsed after reload and restores correctly. The control is hidden at 390 and 320px, where the navigation rail is already hidden. The actual embedded application's separate Hide session panel / Show session panel controls work at all four widths.

The native composer measures 520 × 190px on each fresh demo. Dragging its north resize grip increases the height to 223px, and sending a prompt produces the local terminal reply at 1440, 1180, 390 and 320px. All fresh loads preserve scrollY 0; no page overflow or JavaScript errors were observed. Desktop headers remain readable with the added panel control.

The adapter now supplies six different session scenarios and project-specific sample files, retaining the original application components. Evidence for the independently exercised panel and composer actions is `.tmp/design-review/panel-results.json` and `panels-header-{1440,1180}.png`.
