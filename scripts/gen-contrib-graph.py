#!/usr/bin/env python3
"""Render _data/gh-history.json as _includes/contrib-graph.svg.

The landing page's contribution calendar is static HTML — this script does
what the web app's LandingView.vue does at runtime (same geometry, same
level colors, same month-label rules) at build time. Re-run after
sync-gh-history.py refreshes the snapshot; rustkyll picks the new include
up on the next build.

    python3 scripts/sync-gh-history.py   # refresh the snapshot (gh CLI)
    python3 scripts/gen-contrib-graph.py # re-render the SVG
"""

import json
import pathlib
from datetime import datetime

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "_data" / "gh-history.json"
OUT = ROOT / "_includes" / "contrib-graph.svg"

CELL = 10
PITCH = CELL + 3
PAD_LEFT = 30
PAD_TOP = 18

LEVEL_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def day(iso: str) -> datetime:
    return datetime.strptime(iso, "%Y-%m-%d")


history = json.loads(DATA.read_text())
weeks = history["weeks"]

# Levels are quartiles over the nonzero days, like GitHub's own coloring.
counts = sorted(c for w in weeks for d in w["days"] for c in [d["count"]] if c > 0)


def at(q: float) -> int:
    if not counts:
        return 1
    return counts[min(len(counts) - 1, int(len(counts) * q))]


cutoffs = (at(0.25), at(0.5), at(0.75))


def level(count: int) -> int:
    if count <= 0:
        return 0
    if count <= cutoffs[0]:
        return 1
    if count <= cutoffs[1]:
        return 2
    if count <= cutoffs[2]:
        return 3
    return 4


width = PAD_LEFT + (len(weeks) - 1) * PITCH + CELL + 8
height = PAD_TOP + 6 * PITCH + CELL + 4

# Labels: the first week carries its own month; after that, a month is
# labeled at the first week that ends in it — one label per month.
labels = []
for wi, w in enumerate(weeks):
    first = w["days"][0]["date"]
    last = w["days"][-1]["date"]
    if wi == 0:
        labels.append((PAD_LEFT, MONTHS[day(first).month - 1]))
        continue
    prev_last = day(weeks[wi - 1]["days"][-1]["date"])
    last_day = day(last)
    if prev_last.month != last_day.month:
        labels.append((PAD_LEFT + wi * PITCH, MONTHS[last_day.month - 1]))

wday_labels = [("Mon", 1), ("Wed", 3), ("Fri", 5)]

out = [
    f'<svg class="contrib" viewBox="0 0 {width} {height}" role="img"',
    '     aria-label="GitHub contribution calendar for alexeygrigorev, last 12 months">',
]
for x, name in labels:
    out.append(f'  <text class="contrib-month" x="{x}" y="12">{name}</text>')
for name, row in wday_labels:
    y = PAD_TOP + row * PITCH + CELL - 2
    out.append(f'  <text class="contrib-wday" x="{PAD_LEFT - 6}" y="{y}">{name}</text>')
for wi, w in enumerate(weeks):
    for d in w["days"]:
        x = PAD_LEFT + wi * PITCH
        # python weekday() is Monday=0; JS getUTCDay() (the geometry the app
        # mirrors) is Sunday=0.
        y = PAD_TOP + (day(d["date"]).weekday() + 1) % 7 * PITCH
        out.append(
            f'  <rect x="{x}" y="{y}" width="{CELL}" height="{CELL}" rx="2"'
            f' fill="{LEVEL_COLORS[level(d["count"])]}"'
            f' data-count="{d["count"]}" data-date="{d["date"]}" />'
        )
out.append("</svg>")
OUT.write_text("\n".join(out) + "\n")
print(f"contrib-graph.svg: {len(weeks)} weeks, {history['total']} contributions")
