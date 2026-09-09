#!/usr/bin/env bash
# Scan every tracked or non-ignored publication candidate. Private environment
# files and downloaded evidence stay outside the Git publication boundary.
set -euo pipefail
ROOT="${1:-$(cd "$(dirname "$0")/.." && pwd)}"
python3 - "$ROOT" <<'PYCODE'
import re, subprocess, sys
from pathlib import Path
root = Path(sys.argv[1]).resolve()
result = subprocess.run(['git', 'ls-files', '--cached', '--others', '--exclude-standard', '-z'], cwd=root, capture_output=True)
if result.returncode != 0:
    print('FAIL[secrets]: cannot enumerate publication files'); sys.exit(1)
files = sorted(set(result.stdout.split(b'\0')) - {b''})
deleted = subprocess.run(['git', 'ls-files', '--deleted', '-z'], cwd=root, capture_output=True)
if deleted.returncode != 0:
    print('FAIL[secrets]: cannot enumerate removed publication files'); sys.exit(1)
deleted_files = set(deleted.stdout.split(b'\0')) - {b''}
files = [name for name in files if name not in deleted_files]
if not files:
    print('FAIL[secrets]: empty publication scope'); sys.exit(1)
pattern = re.compile(rb'(sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|ghp_[A-Za-z0-9]{30,}|xox[baprs]-[A-Za-z0-9-]{10,}|AIza[0-9A-Za-z_-]{30,})')
failed = []
for raw in files:
    name = raw.decode('utf-8', 'strict')
    p = root / name
    if not p.resolve().is_relative_to(root):
        failed.append(name + ' (external symlink)'); continue
    if any(part.startswith('.env') and not part.endswith('.example') for part in p.relative_to(root).parts):
        failed.append(name + ' (environment file)'); continue
    try:
        if pattern.search(p.read_bytes()): failed.append(name)
    except OSError:
        failed.append(name + ' (unreadable)')
if failed:
    print('FAIL[secrets]: publication files require review (values withheld)')
    print('\n'.join(failed)); sys.exit(1)
print(f'PASS[secrets]: {len(files)} publication files scanned')
PYCODE
