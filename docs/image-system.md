# PocketShell image system

Run `uv run --script scripts/generate-editorial-images.py` from the repository root. The script installs its isolated Pillow/CairoSVG dependencies and uses Linux DejaVu fonts for app-like sans and monospace text.

It generates all 12 article cover PNG/WebP pairs at 1200×630, the landing pair, OG PNG, and three compact feature SVG/WebP pairs at 720×400. Existing paths stay stable. Add `--features-only` to regenerate just the three feature SVG/WebP pairs. The article contact sheet is saved to `.tmp/design/editorial-image-contact-sheet.png`.

Illustrations share PocketShell's dark surfaces, muted borders, cyan active states, and modest panel radii. Green denotes activity; amber denotes warnings. Feature diagrams show host-data encryption, server-session persistence, and a browser terminal. They are explanatory artwork; the desktop capture remains a separate authentic product asset.

Edit topic text and diagram geometry in the generator, regenerate, and inspect the contact sheet and feature images. Check text fit, contrast, small-screen legibility, and accurate technical claims. Avoid decorative gradients, cartoon devices, and unsupported product UI or security claims.
