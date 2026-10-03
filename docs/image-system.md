# PocketShell image system

Run `uv run --script scripts/generate-editorial-images.py` from the repository root. The script installs its isolated Pillow/CairoSVG dependencies and uses Linux DejaVu fonts for app-like sans and monospace text.

It generates the landing pair, OG PNG, and three compact feature SVG/WebP pairs at 720×400. The original 12 blog cover PNG/WebP pairs have been restored unchanged; the generator does not overwrite them. Their dark backgrounds fit the charcoal site, with the existing subtle borders and rounded frames providing the shared page styling. Add `--features-only` to regenerate just the three feature SVG/WebP pairs.

Illustrations share PocketShell's dark surfaces, muted borders, cyan active states, and modest panel radii. Green denotes activity; amber denotes warnings. Feature diagrams show host-data encryption, server-session persistence, and a browser terminal. They are explanatory artwork; the desktop capture remains a separate authentic product asset.

Edit diagram geometry in the generator, regenerate, and inspect the feature images. Check text fit, contrast, small-screen legibility, and accurate technical claims. Avoid decorative gradients, cartoon devices, and unsupported product UI or security claims.
