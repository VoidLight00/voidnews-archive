#!/usr/bin/env node
// sync-source-registry.mjs — 출처 계층 스냅샷 lib/source-registry.json 갱신과 판정 대조(리뉴얼 계획 R5)
//
// 왜: 화면의 '공식' 문구는 매일 자동 게시가 카드를 거를 때 쓰는 뉴스레터 판정기
// (~/.claude/skills/voidnews-newsletter/bin/newsletter.py Classifier)와 같은 기준이어야 합니다.
// Vercel 빌더에는 ~/.claude가 없으므로 등록부 두 개를 로컬에서 읽어 스냅샷을 만들고 커밋합니다.
// 빌드와 lib/source-tier.ts는 커밋된 스냅샷만 읽습니다.
//
// 사용:
//   node scripts/sync-source-registry.mjs          등록부 두 개를 읽어 lib/source-registry.json을 씁니다.
//   node scripts/sync-source-registry.mjs --check  다음을 모두 확인합니다.
//     - 스냅샷이 지금 등록부와 같은 판인지(입력 해시, 다시 만든 결과와의 내용 비교)
//     - 사이트의 현재 링크 전부에서 JS 판정(lib/source-tier.ts)과 Python 판정기가 같은지
//     - 스냅샷에서 testingcatalog를 지운 함정을 위 비교가 실제로 잡아내는지
// 옵션: --registry <json> --curators <json> --classifier <newsletter.py> --snapshot <json>
// 종료 코드: 0 통과 · 1 판정 차이, 낡은 스냅샷, 함정 미검출 · 2 입력 오류(파일 없음, 판정기 실행 실패)
// 판정기가 있는 기기에서만 동작하므로 빌드(prebuild·postbuild)에는 넣지 않습니다.
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOME = os.homedir();
const DEFAULTS = {
  registry: path.join(HOME, ".claude/skills/voidnews-newsletter/references/official-sources.json"),
  curators: path.join(HOME, ".claude/skills/voidnews-briefing-pipeline/references/curator-channels.json"),
  classifier: path.join(HOME, ".claude/skills/voidnews-newsletter/bin/newsletter.py"),
  snapshot: path.join(ROOT, "lib/source-registry.json"),
};
// newsletter.py OFFICIAL_TYPES·channel_role과 같은 규칙입니다.
const OFFICIAL_TYPES = new Set(["official", "official_blog", "official_developer", "official_developer_tool", "official_media_vendor"]);
const NEUTRAL_TIERS = ["discovery-only", "press", "media"];
const TRAP_TOKEN = "testingcatalog";
const NOTE = "scripts/sync-source-registry.mjs가 만든 스냅샷입니다. 직접 고치지 말고 스크립트를 다시 실행하십시오.";

class InputError extends Error {}

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const shown = (file) => {
  if (file.startsWith(`${ROOT}/`)) return path.relative(ROOT, file);
  return file.startsWith(`${HOME}/`) ? `~/${file.slice(HOME.length + 1)}` : file;
};

function parseArgs(argv) {
  const opts = { ...DEFAULTS, check: false };
  const keys = { "--registry": "registry", "--curators": "curators", "--classifier": "classifier", "--snapshot": "snapshot" };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--check") { opts.check = true; continue; }
    const key = keys[argv[i]];
    if (!key || i + 1 >= argv.length) throw new InputError(`알 수 없는 인자이거나 값이 없습니다: ${argv[i]}`);
    opts[key] = path.resolve(argv[++i]);
  }
  return opts;
}

function readJson(file, label) {
  let bytes;
  try {
    bytes = fs.readFileSync(file);
  } catch (error) {
    throw new InputError(`${label} 파일을 읽지 못했습니다: ${shown(file)} (${error.code ?? error.message})`);
  }
  try {
    return { data: JSON.parse(bytes.toString("utf8")), sha256: sha256(bytes) };
  } catch (error) {
    throw new InputError(`${label} JSON을 해석하지 못했습니다: ${shown(file)} (${error.message})`);
  }
}

function channelRole(channel) {
  if (OFFICIAL_TYPES.has(channel.type)) return "official";
  if (String(channel.id ?? "").startsWith("research-") || channel.type === "benchmark_tracker") return "registry";
  return "discovery-only";
}

function snapshotEntries(registry) {
  if (!Array.isArray(registry.entries)) throw new InputError("공식 출처 등록부에 entries 배열이 없습니다.");
  return registry.entries.map((entry, index) => {
    const ok = ["id", "owner", "tier"].every((key) => typeof entry[key] === "string")
      && Array.isArray(entry.domains) && Array.isArray(entry.x_handles)
      && (!Object.hasOwn(entry, "path_orgs") || Array.isArray(entry.path_orgs));
    if (!ok) throw new InputError(`공식 출처 등록부 ${index}번 항목의 형식이 판정기 계약과 다릅니다.`);
    const row = { id: entry.id, owner: entry.owner, tier: entry.tier, domains: entry.domains, x_handles: entry.x_handles };
    if (Object.hasOwn(entry, "path_orgs")) row.path_orgs = entry.path_orgs;
    return row;
  });
}

// 판정기가 핸들(X·YouTube)이나 http(s) 주소로 색인하는 채널만 남깁니다.
// 로컬 파일 경로처럼 판정에 쓰이지 않는 채널은 공개 스냅샷에 넣지 않습니다.
function snapshotChannels(curators) {
  if (!Array.isArray(curators.channels)) throw new InputError("큐레이터 채널 목록에 channels 배열이 없습니다.");
  const out = [];
  for (const channel of curators.channels) {
    const handle = String(channel.handle || "");
    const url = String(channel.url || "");
    const handleKey = handle.replace(/^@+/, "").toLowerCase();
    const byHandle = (channel.platform === "x" || channel.platform === "youtube") && handleKey !== "";
    if (!byHandle && !url.startsWith("http://") && !url.startsWith("https://")) continue;
    out.push({ platform: String(channel.platform ?? ""), handle, url, role: channelRole(channel), channel: channel.id || channel.handle || channel.url });
  }
  return out;
}

function buildSnapshot(opts) {
  const registry = readJson(opts.registry, "공식 출처 등록부");
  const curators = readJson(opts.curators, "큐레이터 채널 목록");
  const input = (file, json) => ({ file: shown(file), version: json.data.version ?? null, updated: json.data.updated ?? null, sha256: json.sha256 });
  return {
    schema: 1,
    note: NOTE,
    inputs: { registry: input(opts.registry, registry), curators: input(opts.curators, curators) },
    entries: snapshotEntries(registry.data),
    channels: snapshotChannels(curators.data),
  };
}

// 항목 하나를 한 줄에 둡니다. 등록부가 바뀌었을 때 diff가 항목 단위로 보이게 하려는 형식입니다.
function serialize(snapshot) {
  const list = (items) => (items.length ? `[\n${items.map((item) => `    ${JSON.stringify(item)}`).join(",\n")}\n  ]` : "[]");
  return [
    "{",
    `  "schema": ${JSON.stringify(snapshot.schema)},`,
    `  "note": ${JSON.stringify(snapshot.note)},`,
    `  "inputs": ${JSON.stringify(snapshot.inputs, null, 2).replace(/\n/g, "\n  ")},`,
    `  "entries": ${list(snapshot.entries)},`,
    `  "channels": ${list(snapshot.channels)}`,
    "}",
    "",
  ].join("\n");
}

function countBy(items, key) {
  const counts = {};
  for (const item of items) counts[key(item)] = (counts[key(item)] ?? 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name, count]) => `${name} ${count}`).join(" · ");
}

function sync(opts) {
  const snapshot = buildSnapshot(opts);
  const text = serialize(snapshot);
  if (JSON.stringify(JSON.parse(text)) !== JSON.stringify(snapshot)) throw new Error("직렬화 결과가 원래 객체와 다릅니다.");
  const previous = fs.existsSync(opts.snapshot) ? fs.readFileSync(opts.snapshot, "utf8") : null;
  if (previous !== text) fs.writeFileSync(opts.snapshot, text);
  console.log(`[sync-source-registry] ${shown(opts.snapshot)} ${previous === text ? "변경 없음" : "갱신"}`);
  console.log(`  등록 항목 ${snapshot.entries.length}개(${countBy(snapshot.entries, (entry) => entry.tier)})`);
  console.log(`  큐레이터 채널 ${snapshot.channels.length}개(${countBy(snapshot.channels, (channel) => channel.role)})`);
  for (const [name, input] of Object.entries(snapshot.inputs)) console.log(`  ${name}: ${input.file} v${input.version} (${input.updated}) sha256 ${input.sha256.slice(0, 12)}`);
  return 0;
}

// ── --check ─────────────────────────────────────────────────────────

const require = createRequire(import.meta.url);

function loadTypeScript(modulePath) {
  const ts = require("typescript");
  if (!require.extensions[".ts"]) {
    const options = { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true };
    require.extensions[".ts"] = (module, filename) => {
      module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: options, fileName: filename }).outputText, filename);
    };
  }
  return require(modulePath);
}

// 사이트가 실제로 그리는 외부 링크 자리: 주간 카드, AB 본편 카드, AB 추천·모델 카드, AB 데모 카드.
function collectLinks(weeks, editions) {
  const rows = [];
  const add = (url, field, scope, where) => {
    if (typeof url === "string" && url.trim()) rows.push({ url, field, scope, where });
  };
  const addPost = (post, scope, where) => {
    for (const field of ["officialUrl", "source", "xUrl", "threadsUrl"]) add(post[field], field, scope, where);
    for (const link of post.backupUrls ?? []) add(link?.url, "backupUrls", scope, where);
  };
  for (const week of weeks) {
    for (const company of week.companies) for (const post of company.posts) addPost(post, "weekly", `${week.slug}/${post.slug ?? post.title}`);
  }
  for (const edition of editions) {
    for (const item of edition.highlights ?? []) addPost(item.post, "ab", `ab/${edition.slug}/${item.post.slug ?? item.post.title}`);
    for (const pick of [...(edition.modelWatch ?? []), ...(edition.editorsPicks ?? [])]) {
      add(pick.sourceUrl, "sourceUrl", "ab", `ab/${edition.slug}/${pick.slug ?? pick.title}`);
      add(pick.guideUrl, "guideUrl", "ab", `ab/${edition.slug}/${pick.slug ?? pick.title}`);
    }
    for (const demo of edition.demoCards ?? []) add(demo.url, "url", "ab", `ab/${edition.slug}/${demo.slug ?? demo.title}`);
  }
  return rows;
}

const PYTHON_JUDGE = String.raw`
import importlib.util, json, sys
from pathlib import Path
classifier, registry, curators = sys.argv[1:4]
spec = importlib.util.spec_from_file_location("vn_newsletter_check", classifier)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
clf = module.Classifier(Path(registry), Path(curators))
urls = json.loads(sys.stdin.buffer.read().decode("utf-8"))
sys.stdout.write(json.dumps([clf.classify(url) for url in urls], ensure_ascii=True))
`;

function pythonVerdicts(opts, urls) {
  if (!fs.existsSync(opts.classifier)) throw new InputError(`판정기가 없습니다: ${shown(opts.classifier)}`);
  const result = spawnSync("python3", ["-I", "-c", PYTHON_JUDGE, opts.classifier, opts.registry, opts.curators], {
    input: JSON.stringify(urls),
    maxBuffer: 1 << 28,
  });
  if (result.error) throw new InputError(`python3를 실행하지 못했습니다: ${result.error.message}`);
  if (result.status !== 0) throw new InputError(`판정기가 exit ${result.status}로 끝났습니다: ${result.stderr.toString("utf8").trim().slice(-600)}`);
  const verdicts = JSON.parse(result.stdout.toString("utf8"));
  if (!Array.isArray(verdicts) || verdicts.length !== urls.length) throw new InputError("판정기 결과 수가 입력 주소 수와 다릅니다.");
  return new Map(urls.map((url, index) => [url, verdicts[index]]));
}

const sameVerdict = (js, py) => Boolean(py) && js.tier === py.tier && js.sourceId === py.source_id && js.owner === py.owner;

function mismatches(urls, classify, python) {
  return urls.filter((url) => !sameVerdict(classify(url), python.get(url)));
}

function withoutTrapToken(snapshot) {
  const keep = (value) => !String(value).toLowerCase().includes(TRAP_TOKEN);
  return {
    ...snapshot,
    entries: snapshot.entries.map((entry) => ({ ...entry, domains: entry.domains.filter(keep), x_handles: entry.x_handles.filter(keep) })),
    channels: snapshot.channels.filter((channel) => keep(channel.handle) && keep(channel.url)),
  };
}

function freshnessProblems(opts, snapshot) {
  const problems = [];
  const fresh = buildSnapshot(opts);
  for (const name of ["registry", "curators"]) {
    const recorded = snapshot.inputs?.[name]?.sha256;
    if (recorded !== fresh.inputs[name].sha256) problems.push(`${name} 해시가 다릅니다(스냅샷 ${String(recorded).slice(0, 12)} · 현재 ${fresh.inputs[name].sha256.slice(0, 12)})`);
  }
  const content = (value) => JSON.stringify({ entries: value.entries, channels: value.channels });
  if (content(snapshot) !== content(fresh)) problems.push("스냅샷 내용이 지금 등록부로 다시 만든 결과와 다릅니다");
  return problems;
}

function reportNeutral(rows, classify) {
  const neutral = rows.filter((row) => NEUTRAL_TIERS.includes(classify(row.url).tier));
  console.log(`  '공식' 문구를 떼는 주간 officialUrl ${neutral.length}건(${countBy(neutral, (row) => classify(row.url).tier)}) — 데이터 정정 후보:`);
  for (const row of neutral) console.log(`    ${row.where} · ${classify(row.url).tier} · ${row.url.slice(0, 96)}`);
}

function check(opts) {
  const snapshot = readJson(opts.snapshot, "스냅샷").data;
  const { createSourceClassifier } = loadTypeScript(path.join(ROOT, "lib/source-tier.ts"));
  const { weeks } = loadTypeScript(path.join(ROOT, "lib/data.ts"));
  const { editions } = loadTypeScript(path.join(ROOT, "lib/ab/data.ts"));
  const rows = collectLinks(weeks, editions);
  const urls = [...new Set(rows.map((row) => row.url))];
  const python = pythonVerdicts(opts, urls);
  const classify = createSourceClassifier(snapshot);
  const official = rows.filter((row) => row.scope === "weekly" && row.field === "officialUrl");
  const officialUrls = [...new Set(official.map((row) => row.url))];
  const allDiff = mismatches(urls, classify, python);
  const officialDiff = mismatches(officialUrls, classify, python);
  const trapDiff = mismatches(urls, createSourceClassifier(withoutTrapToken(snapshot)), python);
  const stale = freshnessProblems(opts, snapshot);

  console.log(`[sync-source-registry --check] 스냅샷 ${shown(opts.snapshot)} · 판정기 ${shown(opts.classifier)}`);
  console.log(`  입력 판: ${stale.length ? stale.join("; ") : "등록부와 같습니다"}`);
  console.log(`  주간 officialUrl ${official.length}건(고유 ${officialUrls.length}) · JS·Python 판정 차이 ${officialDiff.length}건`);
  console.log(`  사이트 링크 전체 ${rows.length}건(고유 ${urls.length}) · JS·Python 판정 차이 ${allDiff.length}건`);
  console.log(`  주간 officialUrl 계층: ${countBy(official, (row) => classify(row.url).tier)}`);
  reportNeutral(official, classify);
  console.log(`  함정(스냅샷에서 ${TRAP_TOKEN} 삭제): 판정 차이 ${trapDiff.length}건 → ${trapDiff.length ? "검출" : "미검출"}`);
  for (const url of allDiff.slice(0, 20)) {
    console.error(`  차이: ${url} · JS ${JSON.stringify(classify(url))} · Python ${JSON.stringify(python.get(url))}`);
  }

  const failures = [];
  if (stale.length) failures.push("stale-snapshot");
  if (allDiff.length) failures.push("mismatch");
  if (!trapDiff.length) failures.push("trap-not-detected");
  if (failures.length) {
    console.error(`FAIL[sync-source-registry:${failures.join(",")}] 스냅샷을 다시 만들려면 node scripts/sync-source-registry.mjs 를 실행하십시오.`);
    return 1;
  }
  console.log("PASS[sync-source-registry --check] JS 판정과 Python 판정기가 사이트의 모든 현재 링크에서 같습니다.");
  return 0;
}

try {
  const opts = parseArgs(process.argv.slice(2));
  process.exit(opts.check ? check(opts) : sync(opts));
} catch (error) {
  if (error instanceof InputError) {
    console.error(`FAIL[sync-source-registry:input] ${error.message}`);
    process.exit(2);
  }
  console.error(`FAIL[sync-source-registry:crash] ${error.stack ?? error}`);
  process.exit(2);
}
