# PocketShell homepage copy contract

## Authoritative copy

The supplied design in `references/pocketshell-landing.dc.html` governs the current homepage headings and wording. Use its “Your agents. Still running.” hero, “Close the laptop. Keep the momentum.” lede, section prompts and closing “Step away. Stay connected.” invitation. The earlier independent copy draft does not override the user's selected design.

## Required facts and prior corrections

- Identify supported agents and desktop, browser and Android access on the user's own machines.
- Setup starts with installing the PocketShell CLI on each host; aplexer hosts persistent agent sessions.
- Alpha is free and allowlisted, with Google sign-in. Newsletter signup is for launch updates and does not grant alpha access.
- Host-list encryption stays local: PBKDF2-SHA256 with 600,000 iterations, AES-256-GCM, server-side ciphertext and no passphrase reset.
- Browser private keys never sync. They are encrypted locally and travel over authenticated WSS to the bridge when connecting; the bridge uses them in memory without storing or logging them.
- FAQ answers retain complete security caveats and match structured metadata.
- Keep the rejected founder-origin sentence removed. Graph attribution describes the author's public activity; it is plain text. Product GitHub links point to the PocketShell organization.
- The workspace uses the actual app renderer with local demo sessions. Do not replace it with a reconstructed interface or present sample replies as a live agent response.
- Do not add “illustration” labels to the feature graphics.

## Verification

Independent review against the selected reference accepted the implementation. See `redesign-review.md` for responsive, navigation, demo and newsletter evidence.
