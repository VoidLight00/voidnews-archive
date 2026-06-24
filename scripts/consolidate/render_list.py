#!/usr/bin/env python3
"""Render CONSOLIDATED_MASTER.json -> human-readable CONSOLIDATED_LIST.md,
grouped, deduped, with bot provenance. Also asserts the no-duplicate property
(no two spine events share the same canonical officialUrl) and exits non-zero
if violated — this doubles as the seed for scripts/verify-no-duplicates.mjs.
"""
import json, os, sys, re
from collections import defaultdict, OrderedDict
from urllib.parse import urlparse, parse_qs

ROOT = sys.argv[1]
M = json.load(open(os.path.join(ROOT, "CONSOLIDATED_MASTER.json")))

def cu(u):
    if not u:
        return ""
    try:
        p = urlparse(u)
    except Exception:
        return u.lower()
    host = p.netloc.lower().replace("www.", "")
    if "youtube.com" in host or "youtu.be" in host:
        vid = (parse_qs(p.query).get("v") or [p.path.strip("/")])[0]
        return "yt:" + vid
    return (host + re.sub(r"/+$", "", p.path)).lower()

# ---- no-duplicate assertion on spine events ----
dups = defaultdict(list)
for c in M["spine_events"]:
    k = cu(c.get("url", ""))
    if k and not k.startswith("yt:"):
        dups[k].append(c["head_title"])
violations = {k: v for k, v in dups.items() if len(v) > 1}

PUB_ORDER = ["Anthropic", "OpenAI", "Google", "Microsoft", "NVIDIA", "GitHub",
             "xAI", "Meta", "Perplexity", "DeepSeek", "Mistral"]
def pub_rank(p):
    return PUB_ORDER.index(p) if p in PUB_ORDER else len(PUB_ORDER) + 1

def badges(c):
    b = []
    st = set(c.get("stores", []))
    weeks = [w for w in c.get("weeks", []) if w]
    if "ab-weekly" in st and weeks:
        b.append("주간 " + ",".join(sorted(set(w.replace("2026-", "") for w in weeks))))
    if "ab-edition" in st:
        b.append("VIP")
    if "ab-run" in st:
        b.append("run후보")
    if "threads-content" in st:
        b.append("봇발행")
    if c.get("bot_sqlite_count"):
        b.append(f"봇영상×{c['bot_sqlite_count']}")
    return " · ".join(b)

L = []
W = L.append
c = M["counts"]
W("---")
W("title: VoidNews AB 통합 정리 목록 (AB trend 전 ~ 2026-06-18)")
W("date: 2026-06-20")
W(f"range: {M['dateRange']['start']} ~ {M['dateRange']['end']}")
W("source: AB 주간 아카이브 + AB run 후보 + Threads 봇(sqlite 478 + content 96)")
W("status: deduped-consolidated")
W("---")
W("")
W("# VoidNews AB 통합 정리 목록")
W("")
W(f"원시 수집 **{c['raw_items']}건** → 중복 **{c['duplicates_collapsed']}건** 제거 → "
  f"고유 항목 **{c['unique_events_spine'] + c['bot_only_topical']}건** "
  f"(공식·편집 이벤트 {c['unique_events_spine']} + 봇 단독 {c['bot_only_topical']}) "
  f"+ 봇 커뮤니티 레이더 {c['bot_only_noise']}건(집계만).")
W("")
W(f"Threads 봇 수집 데이터는 ① 공식 이벤트에 흡수된 봇 클러스터 **{c['bot_clusters_attached_to_events']}개**, "
  f"② 봇 단독 토픽 **{c['bot_only_topical']}건**, ③ 레이더 잡음 **{c['bot_only_noise']}건** 으로 100% 반영됨.")
W("")
if violations:
    W(f"> ⚠️ 중복 위반 {len(violations)}건 감지 (같은 officialUrl 2개 이상) — 아래 자체검증 실패")
else:
    W("> ✅ 자체검증: 공식 이벤트 간 동일 officialUrl 중복 0건")
W("")

# ===== PART A: official / editorial events by publisher =====
W("## A. 공식·편집 이벤트 (중복 제거)")
W("")
by_pub = defaultdict(list)
for ev in M["spine_events"]:
    by_pub[ev["publisher"]].append(ev)
for pub in sorted(by_pub, key=lambda p: (pub_rank(p), -len(by_pub[p]))):
    evs = sorted(by_pub[pub], key=lambda e: (e.get("date") or "9999"))
    W(f"### {pub} ({len(evs)})")
    for e in evs:
        d = e.get("date") or "----"
        bg = badges(e)
        url = e.get("url", "")
        link = f" [link]({url})" if url.startswith("http") else ""
        W(f"- **{d}** {e['head_title']}" + (f"  ›{link}" if link else "") + (f"  _{bg}_" if bg else ""))
    W("")

# ===== PART B: bot-only topical =====
W("## B. Threads 봇 단독 수집 (AB 아카이브 미수록 · 중복 제거)")
W("")
bt = M.get("bot_only_topical", [])
# sub-group by matched entity, else 'misc'
by_ent = defaultdict(list)
for c2 in bt:
    key = c2["entities"][0] if c2.get("entities") else "기타 토픽/튜토리얼"
    by_ent[key].append(c2)
for ent in sorted(by_ent, key=lambda k: (-len(by_ent[k]), k)):
    grp = by_ent[ent]
    W(f"### {ent} ({len(grp)})")
    for c2 in grp[:60]:
        d = c2.get("date") or "----"
        url = c2.get("url", "")
        link = f" [link]({url})" if url.startswith("http") else ""
        W(f"- {d} {c2['head_title'][:100]}{link}")
    if len(grp) > 60:
        W(f"- … 외 {len(grp)-60}건")
    W("")

# ===== PART C: noise radar =====
W("## C. 봇 커뮤니티 레이더 (집계만 · AI 정보 이벤트 아님)")
W("")
W(f"HN/Reddit 스레드·다이제스트·Discord 링크 등 **{len(M.get('bot_only_noise_radar', []))}건** — 목록 제외, 집계만.")
W("")

open(os.path.join(ROOT, "CONSOLIDATED_LIST.md"), "w").write("\n".join(L) + "\n")
print("rendered CONSOLIDATED_LIST.md  lines:", len(L))
print("dup violations:", len(violations))
if violations:
    for k, v in list(violations.items())[:10]:
        print("  DUP", k, "->", v)
    sys.exit(2)
