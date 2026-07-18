#!/bin/bash
# Curator channel registry gate (fail-closed). exit 0 = PASS, exit 1 = FAIL.
# 검증: 유효 JSON · 중복0(id/url/platform+handle) · 필수필드 · 신원검증 · discovery-only/promote 원칙 문구.
set -u
DIR="$(cd "$(dirname "$0")" && pwd)"
JSON="$DIR/curator-channels.json"
SEEDS="$DIR/collector-seeds.md"

python3 - "$JSON" "$SEEDS" <<'PY'
import json, sys, re
jf, sf = sys.argv[1], sys.argv[2]
fails = []

# 1) valid json
try:
    d = json.load(open(jf, encoding="utf-8"))
except Exception as e:
    print(f"FAIL[json] curator-channels.json invalid: {e}")
    sys.exit(1)

ch = d.get("channels", [])
if len(ch) < 16:
    fails.append(f"FAIL[count] channels={len(ch)} (<16)")

# 2) required fields
req = ["id","name","platform","handle","url","role","tier","discoveredVia","identityVerified"]
for c in ch:
    miss = [k for k in req if k not in c or c[k] in ("", None)]
    if miss:
        fails.append(f"FAIL[field] {c.get('id','?')} missing {miss}")

# 3) duplicates: id / url / platform+handle  (큐레이터 1명이 yt+x 가지는 건 허용 = platform 다름)
def dups(keyfn):
    seen, dd = set(), set()
    for c in ch:
        k = keyfn(c)
        if k in seen: dd.add(k)
        seen.add(k)
    return dd
for label, fn in [("id", lambda c: c.get("id")),
                  ("url", lambda c: c.get("url","").rstrip("/").lower()),
                  ("platform+handle", lambda c: (c.get("platform"), c.get("handle","").lower()))]:
    dd = dups(fn)
    if dd:
        fails.append(f"FAIL[dup-{label}] {sorted(dd)}")

# 4) identity verified for all
unv = [c.get("id") for c in ch if c.get("identityVerified") is not True]
if unv:
    fails.append(f"FAIL[identity] not verified: {unv}")

# 5) discoveredVia whitelist
bad = [c.get("id") for c in ch if c.get("discoveredVia") not in ("curator-youtube","curator-x","curator-web")]
if bad:
    fails.append(f"FAIL[discoveredVia] bad value: {bad}")

# 6) platform whitelist
badp = [c.get("id") for c in ch if c.get("platform") not in ("youtube","x","web")]
if badp:
    fails.append(f"FAIL[platform] bad: {badp}")

# 7) policy block present (discovery-only + promote-to-official)
pol = d.get("policy", {})
if pol.get("role") != "discovery-only":
    fails.append("FAIL[policy] role != discovery-only")
if "promote" not in (pol.get("onOfficialFound","") + " " + str(pol)).lower() and "공식" not in str(pol):
    fails.append("FAIL[policy] promote-to-official rule missing")

# 8) seeds md carries the 철칙 + curator section
try:
    md = open(sf, encoding="utf-8").read()
except Exception as e:
    print(f"FAIL[seeds] cannot read collector-seeds.md: {e}"); sys.exit(1)
if "discovery-only" not in md:
    fails.append("FAIL[seeds] 'discovery-only' missing in collector-seeds.md")
if "공식 1차 출처" not in md:
    fails.append("FAIL[seeds] promote-to-official 철칙 문구 missing")
if "curator-youtube" not in md or "curator-x" not in md:
    fails.append("FAIL[seeds] discoveredVia tags missing")

if fails:
    print("\n".join(fails))
    print(f"\n=== GATE FAIL ({len(fails)} issue) ===")
    sys.exit(1)

yt = sum(1 for c in ch if c["platform"]=="youtube")
x  = sum(1 for c in ch if c["platform"]=="x")
web = sum(1 for c in ch if c["platform"]=="web")
people = d.get("people", {})
print(f"channels={len(ch)} (youtube={yt}, x={x}, web={web}) | dup=0 | identityVerified=all | linked-people={list(people)}")
print("=== GATE PASS (curator registry sound) ===")
sys.exit(0)
PY
rc=$?
exit $rc
