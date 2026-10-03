# Homepage adversarial attack — second pass

## Authoritative direction update

The user supplied an actual PocketShell screenshot and identified the decisive flaw: the paper/orange marketing skin does not match the product. The screenshot shows near-black terminal content, charcoal chrome and cyan active controls. Product fidelity now governs the visual direction. Use the actual app tokens, restrained cyan routes/focus, charcoal section surfaces and interactive workspace preview. The site must feel like an introduction to the same tool the visitor will open, while retaining a marketing page’s clear type hierarchy.

Updated visual tests: no paper or orange site surfaces; no unrelated illustration palette; no ornate glow/gradient tricks; a clearly labeled interactive app-style demo anchors the hero; diagrams use the shell’s neutral/cyan language; headings and actions remain legible and specific.


## Visual attack

1. The paper/orange palette conflicts with the actual dark/cyan product. Use product tokens rather than a second brand.
2. Oversized Space Grotesk headlines and square controls feel unlike the app's UI typography and restrained rounding.
3. A passive screenshot shows the workspace but cannot explain session selection, tabs or prompt composition. Replace it with a clearly labeled local interactive preview.
4. Three feature rows repeat long paragraphs, chips and unrelated toy device/terminal drawings. Remove duplicate chips, shorten explanations, and use one coherent app-derived illustration family.
5. Equal-weight three-column rows make setup, download options and features look interchangeable. Differentiate with density and function; place the interactive workspace first.
6. Coverless homepage posts and equal blog cards lack a lead story. Use matching illustrations and a featured article followed by compact ruled rows.
7. Broad privacy slogans are ambiguous. Name host-list encryption and retain the separate private-key bridge caveat.
8. The activity graph measures the author's public contributions, not PocketShell quality. Preserve explicit attribution.
9. Footer origin-story copy is unwanted and distracts from the product. Replace with a simple category description.

## Copy attack

1. “Agent-aware SSH” requires decoding two concepts before explaining the product. Use “SSH for AI agents” for immediate recognition.
2. “Your agents. Still running.” is memorable but emphasizes indefinite uptime without naming the app or session dependency. Make the primary promise access: “Your agents. Within reach.”
3. “Close the laptop. Keep the momentum.” is generic ad language. Replace it with the category: “An SSH client for your AI agents.”
4. “Already there” appears in three places and assumes a synced desktop setup. A first visitor needs setup information, including the host CLI prerequisite.
5. “Back at your terminal. In three steps.” currently starts after initial installation, while claiming to explain how the product works. Include install, connect, and return in the three steps.
6. Feature paragraphs are 60–90 words and mix a benefit with implementation details. Lead with one concrete action, then give the mechanism in one or two sentences. Keep encryption detail in security/FAQ.
7. “Works where clients can’t” and “Nothing to configure” overstate availability. Browser access still requires configured hosts, passphrase, keys and host CLI. Say “Open a terminal in your browser.”
8. “Your infrastructure. Your business.” is vague security theatre. “Your host list stays private.” names the actual security property without suggesting the bridge cannot see keys.
9. The open-source paragraph is a personal usage story and GitHub totals do not prove reliability. Explain public code and label personal activity as personal activity.
10. “Notes from the terminal” is fine as a title, but the long follow-up clause says nothing. Name the subjects: SSH configuration, key handling, agents on remote machines.
11. “Step away. Stay connected.” could advertise any remote-work service. “Open your next session.” is a useful next action with the same visual two-line structure.
12. “Get the launch email” is accurate only if exactly one email is promised; the note says launch updates. Use “Get launch updates” consistently.

## Review criteria for next rendered iteration

The first screen identifies an SSH client, AI agents and own machines; the web CTA never implies guaranteed alpha entry. Every illustration belongs to the actual app’s charcoal/black/cyan family. No repeated generic card/feature rhythm. Setup names the CLI prerequisite. Security preserves local host-list encryption, browser-local keys, authenticated WSS bridge transfer, in-memory handling and lack of passphrase reset. Mobile hero and illustrations remain readable.

## Actual app requirement

The homepage must embed the actual compiled PocketShell desktop renderer, including its Vue components, icons and xterm terminal. A reconstructed lookalike was rejected by the user. The app's IPC transport can use local sample sessions and responses; its UI assets must remain unchanged. The renderer export records source asset hashes so verification can distinguish reused product code from an imitation. Remove redundant “illustration” labels from feature graphics and page captions.

Independent actual-renderer review accepted the integration. Original asset hashes and rendered session, composer, file and terminal behavior passed; see `redesign-review.md`.
