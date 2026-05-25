#!/usr/bin/env python3
"""
Inline every external asset reference into a single self-contained HTML file.

Reads dist-single/index.html (built with BUILD_SINGLE=1), resolves any
remaining /brand/... or /favicon... references against the public/ folder,
base64-encodes each file with the right MIME type, and replaces the
references inline.

Output: dist-single/corex-stage2-landing-single.html (one file, drop on
any plain HTML server, no Node required, no asset folder needed).
"""

from __future__ import annotations

import base64
import mimetypes
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "dist-single" / "index.html"
OUT = ROOT / "dist-single" / "corex-stage2-landing-single.html"
PUBLIC = ROOT / "public"

# Match references to /brand/... or /favicon... in HTML attributes,
# CSS url() / src() calls, and JS template literals (backticks).
# Keeps the surrounding character so we can re-insert it cleanly.
PATTERN = re.compile(
    r"""(["'`\(])(?:\./)?(/?(?:brand|favicon)[^"'`\)\s]+)""",
    re.VERBOSE,
)


def encode_asset(rel_url: str) -> str:
    rel = rel_url.lstrip("./").lstrip("/")
    asset_path = PUBLIC / rel
    if not asset_path.exists():
        raise FileNotFoundError(f"Missing asset {asset_path}")
    mime, _ = mimetypes.guess_type(asset_path.name)
    mime = mime or "application/octet-stream"
    payload = base64.b64encode(asset_path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{payload}"


def main() -> int:
    if not SOURCE.exists():
        print(f"[!] Run BUILD_SINGLE=1 pnpm build first ({SOURCE} missing)", file=sys.stderr)
        return 1

    html = SOURCE.read_text(encoding="utf-8")

    seen: dict[str, str] = {}
    misses: list[str] = []

    def replace(match: re.Match[str]) -> str:
        opener, url = match.group(1), match.group(2)
        if url not in seen:
            try:
                seen[url] = encode_asset(url)
            except FileNotFoundError:
                misses.append(url)
                return match.group(0)
        return opener + seen[url]

    out = PATTERN.sub(replace, html)

    if misses:
        print(f"[!] Could not inline: {sorted(set(misses))}", file=sys.stderr)
        return 2

    OUT.write_text(out, encoding="utf-8")
    print(f"[OK] Inlined {len(seen)} asset(s)")
    print(f"  Source : {SOURCE.relative_to(ROOT)} ({SOURCE.stat().st_size:,} bytes)")
    print(f"  Output : {OUT.relative_to(ROOT)} ({OUT.stat().st_size:,} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
