# PocketShell homepage copy contract

## Authoritative copy

The supplied design in `references/pocketshell-landing.dc.html` governs the current homepage headings and wording. Use its “Your agents. Still running.” hero, “Close the laptop. Keep the momentum.” lede, section prompts (subject to later user corrections) and closing “Step away. Stay connected.” invitation. The earlier independent copy draft does not override the user's selected design.

## Required facts and prior corrections

- Identify supported agents and desktop, browser and Android access on the user's own machines.
- Setup shows the real installation command, then starting an agent in the app and opening that same session from another device. Do not put session-listing commands under installation or CLI attach commands under an app action.
- Remove the hero eyebrow badge; the heading leads directly.
- Avoid repeating the section list in three places. On desktop use the sidebar; header section links appear when it is hidden. The status bar shows only the current location and release status.
- Alpha access is allowlisted, with Google sign-in; keep these details in the relevant sign-in and FAQ context. Remove the hero’s “Free during alpha · access is allowlisted · sign in with Google” line. Newsletter signup is for launch updates and does not grant alpha access.
- Host-list encryption stays local: PBKDF2-SHA256 with 600,000 iterations, AES-256-GCM, server-side ciphertext and no passphrase reset.
- Browser private keys never sync. They are encrypted locally and travel over authenticated WSS to the bridge when connecting; the bridge uses them in memory without storing or logging them.
- FAQ answers retain complete security caveats and match structured metadata.
- Keep the rejected founder-origin sentence removed. The contribution graph is aspirational: “Your graph could look like this.” Keep its attribution secondary, identify it as the author’s activity across projects, and do not imply the total is PocketShell commits or a guaranteed result. Product GitHub links point to the PocketShell organization.
- The workspace uses the actual app renderer with local demo sessions. Do not replace it with a reconstructed interface or present sample replies as a live agent response.
- Do not add “illustration” labels to the feature graphics.
- Keep “Stay connected.” together on the closing heading’s second line. Remove the visible demo caption, full-screen link and explanatory note.

## Verification

Independent review against the selected reference accepted the implementation. See `redesign-review.md` for responsive, navigation, demo and newsletter evidence.
