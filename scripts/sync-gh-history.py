#!/usr/bin/env python3
"""Sync the GitHub contribution calendar onto the landing page.

Fetches the last year of contributions for GH_USER (default
alexeygrigorev) through the gh CLI's GraphQL endpoint, writes
_data/gh-history.json, and re-renders _includes/contrib-graph.svg. The
graph does not need to be fresh: run this when you feel like it.

    python3 scripts/sync-gh-history.py
"""

import json
import pathlib
import subprocess
import sys
from datetime import datetime, timedelta, timezone

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "_data" / "gh-history.json"
USER = "alexeygrigorev"

QUERY = """
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
"""


def main() -> None:
    to = datetime.now(timezone.utc).replace(hour=23, minute=59, second=59)
    frm = to - timedelta(days=365)
    proc = subprocess.run(
        [
            "gh", "api", "graphql",
            "-f", f"query={QUERY}",
            "-f", f"login={USER}",
            "-F", f"from={frm.strftime('%Y-%m-%dT%H:%M:%SZ')}",
            "-F", f"to={to.strftime('%Y-%m-%dT%H:%M:%SZ')}",
        ],
        capture_output=True,
        text=True,
    )
    if proc.returncode != 0:
        sys.exit(f"gh api graphql failed:\n{proc.stderr}")
    cal = json.loads(proc.stdout)["data"]["user"]["contributionsCollection"]["contributionCalendar"]

    weeks = [
        {
            "days": [
                {"date": d["date"][:10], "count": d["contributionCount"]}
                for d in w["contributionDays"]
            ]
        }
        for w in cal["weeks"]
    ]
    total = sum(d["count"] for w in weeks for d in w["days"]) or cal["totalContributions"]
    synced = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    OUT.write_text(json.dumps({
        "syncedAt": synced,
        "total": total,
        # liquid has no number-formatting filter; the layout prints this as-is
        "total_formatted": f"{total:,}",
        "weeks": weeks,
    }))
    print(f"wrote {OUT.relative_to(ROOT)} ({total} contributions through {synced})")

    gen = ROOT / "scripts" / "gen-contrib-graph.py"
    subprocess.run([sys.executable, gen], check=True)


if __name__ == "__main__":
    main()
