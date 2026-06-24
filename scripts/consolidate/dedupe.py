#!/usr/bin/env python3
"""Merge ts_items + collected_items, dedupe by product-identity, cluster bot
coverage onto official/editorial events. Nothing is dropped; everything is
either a cluster head or attached coverage. Outputs CONSOLIDATED_MASTER.json.
"""
import json, os, re, sys
from urllib.parse import urlparse, parse_qs
from collections import defaultdict

ROOT = sys.argv[1]
EX = os.path.join(ROOT, "extract")

DATE_MAX = "2026-06-18"

def load(p):
    out = []
    if not os.path.exists(p):
        return out
    for line in open(p):
        line = line.strip()
        if line:
            out.append(json.loads(line))
    return out

items = load(os.path.join(EX, "ts_items.jsonl")) + load(os.path.join(EX, "collected_items.jsonl"))

# ---- canonicalization ----
def canon_url(u):
    if not u or not isinstance(u, str):
        return ""
    u = u.strip()
    try:
        p = urlparse(u)
    except Exception:
        return u.lower()
    host = p.netloc.lower().replace("www.", "")
    if "youtube.com" in host or "youtu.be" in host:
        if "youtu.be" in host:
            vid = p.path.strip("/").split("/")[0]
        else:
            vid = (parse_qs(p.query).get("v") or [""])[0]
        return "yt:" + vid if vid else "yt:" + p.path
    path = re.sub(r"/+$", "", p.path)
    return (host + path).lower()

HANGUL = r"가-힣"
def title_fp(t):
    t = (t or "").lower()
    t = re.sub(rf"[^a-z0-9{HANGUL} ]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t

# entity dictionary — major events in range (model/product/company signatures)
ENTITIES = {
    "opus 4.8": ["opus 4.8", "opus4.8", "claude opus 4.8", "opus-4-8"],
    "fable 5": ["fable 5", "fable5", "claude fable", "mythos"],
    "claude code": ["claude code", "dynamic workflow", "ultracode", "subagent"],
    "gemini 3.5": ["gemini 3.5", "gemini 3 flash", "gemini-3", "gemini 3"],
    "gpt-5.5": ["gpt-5.5", "gpt 5.5", "gpt5.5"],
    "ms mai": ["mai-", "mai model", "mai voice", "mai-1", "microsoft mai", "mai 1"],
    "nvidia ai factory": ["ai factory", "nvidia", "sk하이닉스", "sk telecom", "기가와트", "ai 팩토리"],
    "openai s-1": ["s-1", "s1 draft", "confidential s-1", "상장", "ipo"],
    "stainless": ["stainless"],
    "deepseek": ["deepseek"],
    "codex": ["codex"],
    "krea": ["krea"],
    "perplexity": ["perplexity", "comet"],
    "grok": ["grok"],
    "llama": ["llama"],
    "mistral": ["mistral"],
    "reachy": ["reachy"],
}
def entity_keys(text):
    t = (text or "").lower()
    ks = set()
    for k, pats in ENTITIES.items():
        if any(p in t for p in pats):
            ks.add(k)
    return ks

PUBLISHER_NORM = {
    "anthropic / claude": "Anthropic", "anthropic": "Anthropic", "claude.com": "Anthropic",
    "anthropic.com": "Anthropic", "code.claude.com": "Anthropic",
    "openai": "OpenAI", "openai.com": "OpenAI",
    "google": "Google", "google / deepmind": "Google", "google deepmind": "Google",
    "deepmind": "Google", "blog.google": "Google", "deepmind.google": "Google",
    "google/deepmind": "Google",
    "github": "GitHub", "github.com": "GitHub", "github.blog": "GitHub",
    "microsoft": "Microsoft", "microsoft / github": "Microsoft",
    "nvidia": "NVIDIA", "nvidia.com": "NVIDIA",
    "xai": "xAI", "x.ai": "xAI", "docs.x.ai": "xAI",
    "meta": "Meta", "ai.meta.com": "Meta",
    "perplexity": "Perplexity", "perplexity.ai": "Perplexity",
    "deepseek": "DeepSeek", "mistral": "Mistral",
    "커뮤니티 / 오픈소스": "커뮤니티·오픈소스", "오픈소스 · 커뮤니티": "커뮤니티·오픈소스",
    "오픈소스·커뮤니티": "커뮤니티·오픈소스", "커뮤니티": "커뮤니티·오픈소스",
    "기타": "기타", "": "기타",
}
def norm_pub(p):
    raw = (p or "").strip()
    key = raw.lower()
    if key in PUBLISHER_NORM:
        return PUBLISHER_NORM[key]
    for k, v in PUBLISHER_NORM.items():
        if k and k in key:
            return v
    return raw or "기타"

# bot-only community noise signatures (radar, not AI-info events)
NOISE_PAT = [
    r"^ask hn", r"^\[d\]", r"^\[p\]", r"^\[r\]", r"self-promotion", r"who'?s hiring",
    r"discord server", r"welcome back", r"monthly", r"weekly thread", r"^show hn",
    r"underrated", r"give me \d+ mins", r"save you millions",
]
def is_noise(title):
    t = (title or "").lower().strip()
    if any(re.search(p, t) for p in NOISE_PAT):
        return True
    # emoji-laden multi-topic digest (3+ emoji) = aggregator noise
    emo = len(re.findall(r"[\U0001F300-\U0001FAFF☀-➿]", title or ""))
    return emo >= 3

SPINE_STORES = {"ab-weekly", "ab-edition", "ab-run", "threads-content"}

for it in items:
    it["_cu"] = canon_url(it.get("url", ""))
    it["_fp"] = title_fp(it.get("title", ""))
    it["_ents"] = entity_keys((it.get("title", "") + " " + it.get("summary", "")))
    it["_spine"] = it["store"] in SPINE_STORES and not it.get("rumor")

# ---- Stage 1: union-find clustering by canonical url, then by (publisher,fp) ----
parent = list(range(len(items)))
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]
        x = parent[x]
    return x
def union(a, b):
    ra, rb = find(a), find(b)
    if ra != rb:
        parent[rb] = ra

# by canonical url (only non-empty, and not a bare yt: with no id collisions are fine)
url_map = defaultdict(list)
for i, it in enumerate(items):
    cu = it["_cu"]
    if cu and cu not in ("yt:",):
        url_map[cu].append(i)
for cu, idxs in url_map.items():
    for j in idxs[1:]:
        union(idxs[0], j)

# by (publisher_norm, title_fp) — same publisher + same normalized title = same event
def pubnorm(p):
    return re.sub(r"[^a-z0-9]", "", (p or "").lower())[:12]
fp_map = defaultdict(list)
for i, it in enumerate(items):
    if it["_fp"]:
        pub = norm_pub(it.get("publisher") or it.get("company") or "")
        fp_map[(pubnorm(pub), it["_fp"])].append(i)
for key, idxs in fp_map.items():
    for j in idxs[1:]:
        union(idxs[0], j)
# also merge purely by identical title_fp across stores (cross-store same headline)
fp_only = defaultdict(list)
for i, it in enumerate(items):
    if it["_fp"] and len(it["_fp"]) >= 12:
        fp_only[it["_fp"]].append(i)
for fp, idxs in fp_only.items():
    for j in idxs[1:]:
        union(idxs[0], j)

# sharp-entity spine merge: same publisher + same SPECIFIC release entity +
# dates within 30 days -> same event across stores (weekly/edition/run/bot-content).
# Broad entities (claude code, codex, grok...) intentionally excluded to avoid
# collapsing many distinct features into one.
SHARP_ENTITIES = {"opus 4.8", "fable 5", "gemini 3.5", "gpt-5.5", "ms mai",
                  "openai s-1", "stainless", "nvidia ai factory", "krea"}
from datetime import date as _date
def _d(s):
    try:
        return _date(*map(int, s.split("-")))
    except Exception:
        return None
sharp_groups = defaultdict(list)
for i, it in enumerate(items):
    if not it["_spine"]:
        continue
    pub = norm_pub(it.get("publisher") or it.get("company") or "")
    for e in (it["_ents"] & SHARP_ENTITIES):
        sharp_groups[(pub, e)].append(i)
for key, idxs in sharp_groups.items():
    idxs = sorted(idxs, key=lambda i: (items[i].get("date") or "9999"))
    chain = None
    for i in idxs:
        di = _d(items[i].get("date") or "")
        if chain is None:
            chain = i; chain_d = di; continue
        if di and chain_d and abs((di - chain_d).days) <= 30:
            union(chain, i)
        chain = i; chain_d = di if di else chain_d

# ---- gather clusters ----
clusters = defaultdict(list)
for i in range(len(items)):
    clusters[find(i)].append(i)

def cluster_obj(idxs):
    members = [items[i] for i in idxs]
    spine = [m for m in members if m["_spine"]]
    head = (spine or members)[0]
    # prefer a spine member with officialUrl as head
    for m in members:
        if m["_spine"] and (m.get("url", "").startswith("http")):
            head = m; break
    stores = sorted(set(m["store"] for m in members))
    ents = set()
    for m in members:
        ents |= m["_ents"]
    dates = sorted([m["date"] for m in members if m.get("date")])
    bot_sqlite = [m for m in members if m["store"] == "threads-sqlite"]
    pub = head.get("publisher") or head.get("company") or ""
    if not pub:
        for m in members:
            pub = m.get("publisher") or m.get("company") or ""
            if pub:
                break
    return {
        "head_title": head.get("title", ""),
        "publisher": norm_pub(pub),
        "url": head.get("url", ""),
        "date": (dates[0] if dates else None),
        "date_max": (dates[-1] if dates else None),
        "entities": sorted(ents),
        "stores": stores,
        "is_spine": any(m["_spine"] for m in members),
        "size": len(members),
        "bot_sqlite_count": len(bot_sqlite),
        "weeks": sorted(set(m.get("slug", "") for m in members if m.get("slug"))),
        "member_titles": [m.get("title", "")[:90] for m in members][:8],
        "_idxs": idxs,
    }

cobjs = [cluster_obj(idxs) for idxs in clusters.values()]

# ---- Stage 2: attach bot-only clusters to spine events by entity + date proximity ----
spine_clusters = [c for c in cobjs if c["is_spine"]]
botonly = [c for c in cobjs if not c["is_spine"]]

def daysdiff(a, b):
    if not a or not b:
        return 999
    from datetime import date
    ya = list(map(int, a.split("-"))); yb = list(map(int, b.split("-")))
    return abs((date(*ya) - date(*yb)).days)

attached = 0
remaining_botonly = []
for bc in botonly:
    if not bc["entities"]:
        remaining_botonly.append(bc); continue
    best = None
    for sc in spine_clusters:
        if set(bc["entities"]) & set(sc["entities"]):
            dd = daysdiff(bc["date"], sc["date"])
            if dd <= 21:
                if best is None or dd < best[1]:
                    best = (sc, dd)
    if best:
        sc = best[0]
        sc["bot_sqlite_count"] += bc["bot_sqlite_count"]
        sc.setdefault("attached_bot_clusters", []).append(bc["head_title"][:80])
        sc["size"] += bc["size"]
        attached += 1
    else:
        remaining_botonly.append(bc)

# dedupe remaining bot-only among themselves already handled by union; now sort
def sortkey(c):
    return (c.get("date") or "9999", c.get("publisher") or "")

# split remaining bot-only into topical (AI-info the bot uniquely found) vs
# community radar noise (HN/reddit threads, digests, discord links)
bot_topical = [c for c in remaining_botonly if not is_noise(c["head_title"])]
bot_noise = [c for c in remaining_botonly if is_noise(c["head_title"])]

spine_clusters.sort(key=sortkey)
bot_topical.sort(key=lambda c: (-c["size"], c.get("date") or "9999"))
bot_noise.sort(key=lambda c: (-c["size"]))

master = {
    "runId": os.path.basename(ROOT),
    "dateRange": {"start": "2026-04-06", "end": DATE_MAX},
    "rawItemsIn": len(items),
    "counts": {
        "raw_items": len(items),
        "clusters_total": len(cobjs),
        "unique_events_spine": len(spine_clusters),
        "bot_only_topical": len(bot_topical),
        "bot_only_noise": len(bot_noise),
        "bot_clusters_attached_to_events": attached,
        "duplicates_collapsed": len(items) - len(cobjs),
    },
    "spine_events": spine_clusters,
    "bot_only_topical": bot_topical,
    "bot_only_noise_radar": bot_noise,
}
# strip internal idxs for output
for c in spine_clusters + remaining_botonly:
    c.pop("_idxs", None)

with open(os.path.join(ROOT, "CONSOLIDATED_MASTER.json"), "w") as f:
    json.dump(master, f, ensure_ascii=False, indent=2)

print(json.dumps(master["counts"], ensure_ascii=False, indent=2))
# store breakdown of spine events
from collections import Counter
ev_pub = Counter(c["publisher"] for c in spine_clusters)
print("\ntop publishers (spine events):")
for p, n in ev_pub.most_common(12):
    print(f"  {n:3d}  {p}")
print("\nbot-only TOPICAL (top 12 by size):")
for c in bot_topical[:12]:
    print(f"  size={c['size']:2d} ents={c['entities']} | {c['head_title'][:70]}")
print(f"\nbot-only NOISE radar: {len(bot_noise)} (HN/reddit/digest/discord — counted, not itemized)")
