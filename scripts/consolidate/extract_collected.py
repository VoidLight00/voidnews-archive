#!/usr/bin/env python3
"""Extract all *collected* (non-published-site) AI-info items into one JSONL.
Sources:
  - AB run workspace JSONs (06_dedup_master, collected, addenda, VOL.04)
  - threads-automation source_archive.sqlite (482 bot-collected sources)
  - threads-automation content_archive.json (96 published bot records)
  - threads curate briefs + raw_corpus (small)
Normalized record schema:
  store,file,id,title,url,publisher,namespace,date,summary,
  official(bool),rumor(bool),sourceType,sourceName
"""
import json, os, sqlite3, glob, sys, re
from urllib.parse import urlparse

HOME = os.path.expanduser("~")
AB = os.path.join(HOME, "projects/voidnews-archive/_workspace/ab")
TA = os.path.join(HOME, "threads-automation")
OUTDIR = sys.argv[1]

DATE_MIN = "2026-04-01"
DATE_MAX = "2026-06-18"

out = []

def domain_pub(url):
    try:
        h = urlparse(url).netloc.lower().replace("www.", "")
    except Exception:
        return ""
    m = {
        "anthropic.com": "Anthropic", "claude.com": "Anthropic", "code.claude.com": "Anthropic",
        "openai.com": "OpenAI", "blog.google": "Google", "deepmind.google": "Google",
        "developers.googleblog.com": "Google", "x.ai": "xAI", "docs.x.ai": "xAI",
        "meta.com": "Meta", "ai.meta.com": "Meta", "microsoft.com": "Microsoft",
        "github.com": "GitHub", "github.blog": "GitHub", "perplexity.ai": "Perplexity",
        "docs.perplexity.ai": "Perplexity", "deepseek.com": "DeepSeek",
        "mistral.ai": "Mistral", "cohere.com": "Cohere", "nvidia.com": "NVIDIA",
        "youtube.com": "YouTube", "youtu.be": "YouTube",
    }
    for k, v in m.items():
        if h.endswith(k):
            return v
    return h

def norm_date(*cands):
    for c in cands:
        if not c:
            continue
        s = str(c)
        mm = re.search(r"(\d{4})-(\d{2})-(\d{2})", s)
        if mm:
            return mm.group(0)
    return None

def add(rec):
    d = rec.get("date")
    # keep undated items too (bot rumor often lacks published_at) but tag
    if d and not (DATE_MIN <= d <= DATE_MAX):
        return  # out of range -> drop
    out.append(rec)

def push(store, file, item, **over):
    title = item.get("title") or item.get("topic") or ""
    if not title:
        return
    url = (over.get("url") or item.get("officialUrl") or item.get("source")
           or item.get("url") or "")
    if not url:
        su = item.get("source_urls") or item.get("sourceUrls")
        if isinstance(su, list) and su:
            url = su[0]
    pub = (over.get("publisher") or item.get("publisher") or item.get("company")
           or item.get("source_name") or domain_pub(url) or "")
    summ = item.get("summary") or item.get("humanize_summary") or ""
    if not isinstance(summ, str):
        summ = json.dumps(summ, ensure_ascii=False)
    rec = {
        "store": store, "file": file,
        "id": item.get("id") or "",
        "title": title.strip(),
        "url": url,
        "publisher": pub,
        "namespace": str(item.get("namespace") or item.get("topic_tag") or ""),
        "date": norm_date(item.get("date"), item.get("published_at"),
                          item.get("date_kst"), over.get("date")),
        "summary": summ[:400],
        "official": bool(over.get("official", item.get("official", 0)))
                    or item.get("sourceType", "").startswith("official"),
        "rumor": bool(over.get("rumor", item.get("rumor", 0))),
        "sourceType": item.get("sourceType") or item.get("source_trace_status") or "",
        "sourceName": item.get("source_name") or "",
    }
    add(rec)

# ---- AB run JSONs: scan every dict file, pull every list-of-dicts with titles ----
ab_files = []
for run in sorted(glob.glob(os.path.join(AB, "*"))):
    if "consolidate" in run:
        continue
    for jf in glob.glob(os.path.join(run, "*.json")):
        ab_files.append(jf)

for jf in ab_files:
    try:
        d = json.load(open(jf))
    except Exception as e:
        print("AB JSON FAIL", jf, e, file=sys.stderr); continue
    rel = os.path.relpath(jf, AB)
    if not isinstance(d, dict):
        continue
    for k, v in d.items():
        if isinstance(v, list) and v and isinstance(v[0], dict):
            # only treat as item list if items look like news items
            if any(("title" in it or "topic" in it) for it in v[:3]):
                rumor_list = "rumor" in k.lower()
                for it in v:
                    push("ab-run", rel + "#" + k, it,
                         rumor=rumor_list or bool(it.get("rumor", 0)))

# ---- threads source_archive.sqlite ----
db = os.path.join(TA, "data/threads/source_archive.sqlite")
if os.path.exists(db):
    con = sqlite3.connect(db)
    con.row_factory = sqlite3.Row
    for r in con.execute("SELECT id,title,url,summary,source_name,source_group,official,rumor,published_at,collected_at,source_trace_status FROM source_items"):
        push("threads-sqlite", "source_archive.sqlite", {
            "id": r["id"], "title": r["title"], "url": r["url"],
            "summary": r["summary"] or "", "source_name": r["source_name"],
            "official": r["official"], "rumor": r["rumor"],
            "published_at": r["published_at"], "date": None,
            "source_trace_status": r["source_trace_status"],
        }, date=norm_date(r["published_at"], r["collected_at"]))
    con.close()

# ---- threads content_archive.json (published bot records) ----
ca = os.path.join(TA, "data/threads/content_archive.json")
if os.path.exists(ca):
    d = json.load(open(ca))
    for r in d.get("records", []):
        push("threads-content", "content_archive.json", r,
             official=str(r.get("source_trace_status", "")).startswith("official"))

# ---- threads curate briefs ----
for bf in glob.glob(os.path.join(TA, "_workspace/curate/*_brief.json")):
    try:
        d = json.load(open(bf))
    except Exception:
        continue
    title = d.get("title") or d.get("topic") or os.path.basename(bf)
    push("threads-curate", os.path.basename(bf),
         {"title": title, "summary": str(d.get("hook") or d.get("summary") or "")[:300],
          "url": (d.get("source_urls") or d.get("sources") or [""])[0] if isinstance(d.get("source_urls") or d.get("sources"), list) else "",
          "id": os.path.basename(bf)})

# ---- write ----
os.makedirs(OUTDIR, exist_ok=True)
with open(os.path.join(OUTDIR, "collected_items.jsonl"), "w") as f:
    for o in out:
        f.write(json.dumps(o, ensure_ascii=False) + "\n")

from collections import Counter
by = Counter(o["store"] for o in out)
print("collected extracted:", len(out), dict(by), file=sys.stderr)
undated = sum(1 for o in out if not o["date"])
print("undated (kept):", undated, file=sys.stderr)
