// Build article-bound source-image evidence for new Weekly posts.
//
// For every (week, title, sourceUrl) triple it fetches the official article, runs the
// repository's own source-image policy selector, stores the publisher's original bytes,
// and appends an audit record to references/weekly-source-image-audit.json.
//
// It never invents an image and never reports a fetch failure as "no image exists" —
// that conflation is exactly what PM-20260909-01 was about. The three outcomes are
// distinct: available / no-meaningful-image-verified / fetch-failed.
//
// usage: node scripts/build-weekly-source-images.mjs --items <run>/03_normalized_items.json \
//          --out <run>/03_thumbnails.json --media-dir source-media/weekly-<YYYYMMDD> [--dry]
// emit-weeks.mjs reads <run>/03_thumbnails.json, so run this before emit-weeks.
//
// Promoted to the repo on 2026-10-19 from run 20261006-065837 (10a). Do not copy into run folders.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { imageContentType } from "./lib/source-image.mjs";

// Same policy implementation the repository uses (scripts/lib/source_image.py), but
// invoked with a timeout. The repo helper calls execFileSync with no timeout, so one
// pathological page blocks the entire event loop — a 2026-09-22 run froze on exactly
// that, 20 minutes on a single document, taking the whole concurrent pass down with it.
const SELECTOR = path.join(import.meta.dirname, "lib/source_image.py");
function selectSourceImage(html, url) {
  try {
    const out = execFileSync("python3", [SELECTOR], {
      input: JSON.stringify({ html, url }),
      maxBuffer: 20 * 1024 * 1024,
      timeout: 20000,
      killSignal: "SIGKILL",
    });
    const result = JSON.parse(out.toString("utf8"));
    const candidate = result.candidates[0];
    return candidate ? { ...candidate, title: result.title, description: result.description } : null;
  } catch (err) {
    throw new Error(`source-image selector failed or timed out: ${(err && err.message) || err}`);
  }
}

const ROOT = path.resolve(import.meta.dirname, "..");
const LEDGER = path.join(ROOT, "references/weekly-source-image-audit.json");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const args = process.argv.slice(2);
const argOf = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};
const itemsPath = argOf("--items");
const outPath = argOf("--out");
const dry = args.includes("--dry");
const MEDIA_DIR = argOf("--media-dir");
if (!itemsPath || !outPath || !/^source-media\/weekly-\d{8}$/.test(MEDIA_DIR || "")) {
  console.error("usage: --items <normalized.json> --out <map.json> --media-dir source-media/weekly-<YYYYMMDD> [--dry]");
  process.exit(2);
}

const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const EXT = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "image/svg+xml": ".svg",
};

// A stalled socket must not wedge the whole pass: the abort signal is backed by an
// outer hard deadline, because an already-resolved fetch whose body never finishes
// streaming is not interrupted by the signal alone. A 2026-09-22 run hung 55 minutes
// on one such read before this guard existed.
const HARD_MS = 25000;

async function get(url, { binary = false } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HARD_MS);
  const deadline = new Promise((resolve) =>
    setTimeout(() => resolve({ status: 0, buf: Buffer.alloc(0), contentType: "", finalUrl: url, error: `hard timeout after ${HARD_MS}ms` }), HARD_MS + 3000),
  );
  const attempt = (async () => {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": UA, Accept: binary ? "image/*,*/*" : "text/html,*/*" },
        redirect: "follow",
        signal: controller.signal,
      });
      const buf = Buffer.from(await res.arrayBuffer());
      return { status: res.status, buf, contentType: res.headers.get("content-type") || "", finalUrl: res.url };
    } catch (err) {
      return { status: 0, buf: Buffer.alloc(0), contentType: "", finalUrl: url, error: String((err && err.message) || err) };
    }
  })();
  try {
    return await Promise.race([attempt, deadline]);
  } finally {
    clearTimeout(timer);
  }
}

const input = JSON.parse(fs.readFileSync(itemsPath, "utf8"));
const posts = input.items || input.posts || input;
const ledger = JSON.parse(fs.readFileSync(LEDGER, "utf8"));
const existing = new Set(ledger.records.map((r) => `${r.week}|${r.title}|${r.sourceUrl}`));

const checkedAt = new Date().toISOString();
const PROGRESS = outPath.replace(/\.json$/, ".progress.jsonl");
const done = new Map();
if (fs.existsSync(PROGRESS)) {
  for (const line of fs.readFileSync(PROGRESS, "utf8").split("\n")) {
    if (!line.trim()) continue;
    try { const e = JSON.parse(line); done.set(e.postId, e); } catch { /* a truncated tail line is re-done */ }
  }
  console.log(`RESUME ${done.size} decision(s) already recorded`);
}
function record(postId, entry) {
  fs.appendFileSync(PROGRESS, JSON.stringify({ postId, ...entry }) + "\n");
}
const added = [];
const map = {};
let ok = 0;
let none = 0;
let failed = 0;

async function processPost(post) {
  const week = post.weekSlug || post.week;
  const title = post.title;
  const sourceUrl = post.officialUrl || post.source || "";
  const key = `${week}|${title}|${sourceUrl}`;
  if (!week || !title || !sourceUrl) {
    console.error(`SKIP[incomplete] ${post.id}`);
    return;
  }
  if (existing.has(key)) {
    console.log(`SKIP[already-audited] ${key.slice(0, 90)}`);
    return;
  }
  const prior = done.get(post.id);
  if (prior) {
    added.push(prior.record);
    map[post.id] = prior.mapEntry;
    if (prior.mapEntry.status === "available") ok += 1;
    else if (prior.mapEntry.status === "no-meaningful-image-verified") none += 1;
    else failed += 1;
    return;
  }

  const page = await get(sourceUrl);
  const evidence = [
    {
      kind: "source-fetch",
      url: sourceUrl,
      httpStatus: page.status,
      sha256: page.buf.length ? sha256(page.buf) : null,
    },
  ];

  if (page.status !== 200 || !page.buf.length) {
    added.push({
      key, week, title, sourceUrl,
      status: "fetch-failed",
      checkedAt,
      reason: `원문 조회가 실패했습니다 (HTTP ${page.status}${page.error ? `, ${page.error}` : ""}). 이미지가 없다는 뜻이 아니라 수집에 실패했다는 기록입니다.`,
      evidence,
    });
    map[post.id] = { status: "fetch-failed" };
    record(post.id, { record: added[added.length - 1], mapEntry: map[post.id] });
    failed += 1;
    console.log(`FETCH-FAILED ${page.status} ${sourceUrl.slice(0, 80)}`);
    return;
  }

  let candidate = null;
  try {
    candidate = selectSourceImage(page.buf.toString("utf8"), page.finalUrl || sourceUrl);
  } catch (err) {
    // A selector crash or timeout is a collection failure, not "no image" (PM-20260909-01).
    // 10b recorded one blogs.windows.com timeout as no-meaningful-image-verified before this branch.
    console.error(`selector error: ${err.message}`);
    added.push({
      key, week, title, sourceUrl,
      status: "fetch-failed",
      checkedAt,
      reason: `원문은 정상 응답했으나 이미지 선택기가 실패했습니다 (${String(err.message).slice(0, 80)}). 이미지가 없다는 뜻이 아닙니다.`,
      evidence,
    });
    map[post.id] = { status: "fetch-failed" };
    record(post.id, { record: added[added.length - 1], mapEntry: map[post.id] });
    failed += 1;
    return;
  }

  if (!candidate || !candidate.image) {
    evidence.push({
      kind: "source-review",
      url: sourceUrl,
      httpStatus: 200,
      reviewedArticle: true,
      note: "정상 응답한 원문 본문을 검토했습니다. 기사 상단 이미지와 공유용 미리보기 이미지가 모두 없었습니다. 내비게이션·로고·프로필 사진·다른 기사 그림은 정책상 제외했습니다.",
    });
    added.push({
      key, week, title, sourceUrl,
      status: "no-meaningful-image-verified",
      checkedAt,
      reason: "HTTP 200 정상 원문에서 해당 기사 본문을 확인했습니다. 기사 이미지와 공유 이미지가 없으며 사이트 공통 장식 이미지는 제외했습니다.",
      evidence,
    });
    map[post.id] = { status: "no-meaningful-image-verified" };
    record(post.id, { record: added[added.length - 1], mapEntry: map[post.id] });
    none += 1;
    console.log(`NO-IMAGE ${sourceUrl.slice(0, 80)}`);
    return;
  }

  const img = await get(candidate.image, { binary: true });
  if (img.status !== 200 || !img.buf.length) {
    evidence.push({ kind: "image-fetch", url: candidate.image, httpStatus: img.status });
    added.push({
      key, week, title, sourceUrl,
      status: "fetch-failed",
      checkedAt,
      reason: `원문에서 기사 이미지를 찾았으나 이미지 파일 내려받기가 실패했습니다 (HTTP ${img.status}). 이미지 부재가 아닙니다.`,
      evidence,
    });
    map[post.id] = { status: "fetch-failed" };
    record(post.id, { record: added[added.length - 1], mapEntry: map[post.id] });
    failed += 1;
    console.log(`IMG-FAILED ${img.status} ${candidate.image.slice(0, 80)}`);
    return;
  }

  const type = imageContentType(img.buf, img.contentType);
  if (!type) {
    evidence.push({ kind: "image-fetch", url: candidate.image, httpStatus: img.status, note: `content-type ${img.contentType} did not validate as an image` });
    added.push({
      key, week, title, sourceUrl,
      status: "fetch-failed",
      checkedAt,
      reason: "이미지 주소는 응답했으나 반환된 바이트가 이미지 형식이 아니었습니다.",
      evidence,
    });
    map[post.id] = { status: "fetch-failed" };
    record(post.id, { record: added[added.length - 1], mapEntry: map[post.id] });
    failed += 1;
    return;
  }

  const digest = sha256(img.buf);
  const fileName = `${digest.slice(0, 12)}${EXT[type] || ".bin"}`;
  const publicPath = `/${MEDIA_DIR}/${fileName}`;
  const absolute = path.join(ROOT, "public", MEDIA_DIR, fileName);
  if (!dry) {
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, img.buf);
  }
  evidence.push({ kind: "image-fetch", url: candidate.image, httpStatus: 200, sha256: digest, contentType: type });
  added.push({
    key, week, title, sourceUrl,
    status: "available",
    checkedAt,
    reason:
      candidate.kind === "source-first-image"
        ? `기사 상단의 첫 의미 있는 이미지입니다${candidate.alt ? ` (대체 텍스트: ${candidate.alt})` : ""}.`
        : "기사 상단 이미지가 없어 같은 기사의 공유용 미리보기 이미지를 사용했습니다.",
    evidence,
    imageUrl: candidate.image,
    publicPath,
    sha256: digest,
    byteSize: img.buf.length,
    selectionKind: candidate.kind,
    selectionPolicy: candidate.selectionPolicy,
  });
  map[post.id] = {
    status: "available",
    src: publicPath,
    alt: candidate.alt || candidate.title || title,
    selectionKind: candidate.kind,
  };
  record(post.id, { record: added[added.length - 1], mapEntry: map[post.id] });
  ok += 1;
  console.log(`OK ${candidate.kind} ${publicPath}`);
}

// Bounded concurrency: publishers are unrelated hosts, so a slow one must not
// serialise the rest. Six keeps us well inside polite per-host request rates.
const queue = [...posts];
let inFlight = 0;
await new Promise((resolve) => {
  const pump = () => {
    if (!queue.length && inFlight === 0) return resolve();
    while (inFlight < 6 && queue.length) {
      const post = queue.shift();
      inFlight += 1;
      processPost(post)
        .catch((err) => console.error(`ERROR ${post.id}: ${err && err.message}`))
        .finally(() => { inFlight -= 1; pump(); });
    }
  };
  pump();
});

if (!dry) {
  ledger.records.push(...added);
  ledger.checkedAt = checkedAt;
  ledger.counts = {
    ...(ledger.counts || {}),
    records: ledger.records.length,
  };
  fs.writeFileSync(LEDGER, JSON.stringify(ledger, null, 2) + "\n");
  fs.writeFileSync(outPath, JSON.stringify({ checkedAt, counts: { available: ok, noImage: none, failed }, map }, null, 1) + "\n");
}
console.log(`DONE available=${ok} no-image=${none} fetch-failed=${failed} added=${added.length} dry=${dry}`);
