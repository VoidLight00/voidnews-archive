import crypto from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "_workspace", "thumbnails");
const WEEK_DIR = path.join(ROOT, "lib", "weeks");
const AB_DIR = path.join(ROOT, "lib", "ab", "editions");

function hash(value) {
  return crypto.createHash("sha1").update(value).digest("hex").slice(0, 8);
}

function slugify(value) {
  const ascii = value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 54);
  return ascii || hash(value);
}

function compact(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function propertyName(name) {
  if (!name) return "";
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return name.getText();
}

function expressionToValue(node) {
  if (!node) return undefined;

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element) => expressionToValue(element)).filter((value) => value !== undefined);
  }

  if (ts.isObjectLiteralExpression(node)) {
    const result = {};
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        result[propertyName(prop.name)] = expressionToValue(prop.initializer);
      }
    }
    return result;
  }

  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) {
    return expressionToValue(node.expression);
  }

  return undefined;
}

function extractExportObject(sourceText, filePath) {
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let found;

  function visit(node) {
    if (found) return;
    if (ts.isVariableDeclaration(node) && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
      found = expressionToValue(node.initializer);
      return;
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return found;
}

async function listTypeScriptFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".ts"))
    .map((entry) => path.join(dir, entry.name))
    .sort();
}

function primarySource(post) {
  return post.officialUrl || post.source || post.xUrl || post.threadsUrl || post.backupUrls?.[0]?.url || "";
}

function hasImage(item) {
  return Boolean(item.thumbnail?.src || item.images?.[0]?.src);
}

function statusFor(item) {
  if (hasImage(item)) return "explicit-image-present";
  if (primarySource(item)) return "needs-official-image-probe";
  return "needs-source-review";
}

function buildPrompt({ title, summary, company, sourceUrl }) {
  return [
    "Editorial AI newsletter thumbnail for VoidNews, a sober professional AI intelligence magazine.",
    `Topic: ${compact(title)}.`,
    company ? `Publisher or company context: ${company}.` : "",
    summary ? `Editorial context: ${compact(summary).slice(0, 420)}.` : "",
    sourceUrl ? `Use the official source context only as factual grounding: ${sourceUrl}.` : "",
    "Create a 16:9 premium publication thumbnail with restrained composition, clear subject metaphor, subtle technology texture, high credibility, no sensationalism.",
    "Avoid large readable text unless it is abstract UI texture; do not invent product logos, company logos, screenshots, email signup UI, subscribe forms, or fake interface details.",
  ]
    .filter(Boolean)
    .join(" ");
}

const NEGATIVE_PROMPT = [
  "email signup form",
  "subscribe button",
  "fake company logo",
  "fake product screenshot",
  "sensational headline text",
  "clickbait",
  "stock photo handshake",
  "overly glossy AI robot",
  "watermark",
  "low credibility",
].join(", ");

function weeklyItem({ filePath, week, company, post, postIndex }) {
  const companySlug = slugify(company.name);
  const titleSlug = `${slugify(post.title)}-${hash(`${week.slug}-${company.name}-${post.title}`)}`;
  const sourceUrl = primarySource(post);
  const status = statusFor(post);

  return {
    id: `weekly-${week.slug}-${companySlug}-${titleSlug}`,
    sourceType: "weekly",
    slug: week.slug,
    week: week.week,
    year: week.year,
    company: company.name,
    title: post.title,
    summary: post.summary || "",
    officialUrl: post.officialUrl || "",
    sourceUrl,
    backupUrls: post.backupUrls || [],
    hasThumbnail: Boolean(post.thumbnail?.src),
    hasImages: Boolean(post.images?.length),
    officialImageStatus: status,
    needsOfficialImageProbe: status === "needs-official-image-probe",
    giFallbackCandidate: status === "needs-official-image-probe",
    assetTarget: `/generated/weekly/${week.slug}/${companySlug}/${titleSlug}/thumb.webp`,
    dataTarget: path.relative(ROOT, filePath),
    dataPath: `companies[${week.companies.indexOf(company)}].posts[${postIndex}]`,
    prompt: buildPrompt({ title: post.title, summary: post.summary, company: company.name, sourceUrl }),
    negativePrompt: NEGATIVE_PROMPT,
  };
}

function abHighlightItem({ filePath, edition, highlight, index }) {
  const post = highlight.post || {};
  const titleSlug = `${slugify(post.title || highlight.keyQuote || `rank-${highlight.rank}`)}-${hash(`${edition.slug}-${highlight.rank}-${post.title || ""}`)}`;
  const sourceUrl = primarySource(post);
  const status = statusFor(post);

  return {
    id: `ab-${edition.slug}-highlight-${String(highlight.rank).padStart(2, "0")}-${titleSlug}`,
    sourceType: "ab-highlight",
    slug: edition.slug,
    volume: edition.volume,
    rank: highlight.rank,
    tier: highlight.tier,
    company: highlight.sourceCompany || "",
    title: post.title || "",
    summary: post.summary || highlight.editorial || "",
    officialUrl: post.officialUrl || "",
    sourceUrl,
    backupUrls: post.backupUrls || [],
    hasThumbnail: Boolean(post.thumbnail?.src),
    hasImages: Boolean(post.images?.length),
    officialImageStatus: status,
    needsOfficialImageProbe: status === "needs-official-image-probe",
    giFallbackCandidate: status === "needs-official-image-probe",
    assetTarget: `/generated/ab/${edition.slug}/highlight-${String(highlight.rank).padStart(2, "0")}-${titleSlug}/thumb.webp`,
    dataTarget: path.relative(ROOT, filePath),
    dataPath: `highlights[${index}].post`,
    prompt: buildPrompt({ title: post.title, summary: post.summary || highlight.editorial, company: highlight.sourceCompany, sourceUrl }),
    negativePrompt: NEGATIVE_PROMPT,
  };
}

function abEditorPickItem({ filePath, edition, pick, index }) {
  const titleSlug = `${slugify(pick.title)}-${hash(`${edition.slug}-editor-${pick.title}`)}`;
  const sourceUrl = pick.sourceUrl || pick.guideUrl || "";
  const status = statusFor({ ...pick, officialUrl: pick.sourceUrl, source: pick.guideUrl });

  return {
    id: `ab-${edition.slug}-editor-pick-${titleSlug}`,
    sourceType: "ab-editor-pick",
    slug: edition.slug,
    volume: edition.volume,
    category: pick.category || "",
    company: pick.category || "",
    title: pick.title,
    summary: pick.summary || pick.subtitle || "",
    officialUrl: pick.sourceUrl || "",
    sourceUrl,
    backupUrls: pick.guideUrl ? [{ label: pick.guideLabel || "Guide", url: pick.guideUrl }] : [],
    hasThumbnail: Boolean(pick.thumbnail?.src),
    hasImages: Boolean(pick.images?.length),
    officialImageStatus: status,
    needsOfficialImageProbe: status === "needs-official-image-probe",
    giFallbackCandidate: status === "needs-official-image-probe",
    assetTarget: `/generated/ab/${edition.slug}/editor-pick-${titleSlug}/thumb.webp`,
    dataTarget: path.relative(ROOT, filePath),
    dataPath: `editorsPicks[${index}]`,
    prompt: buildPrompt({ title: pick.title, summary: pick.summary || pick.body, company: pick.category, sourceUrl }),
    negativePrompt: NEGATIVE_PROMPT,
  };
}

async function collectWeeklyItems() {
  const files = await listTypeScriptFiles(WEEK_DIR);
  const items = [];

  for (const filePath of files) {
    const source = await readFile(filePath, "utf8");
    const week = extractExportObject(source, filePath);
    if (!week?.companies) continue;

    for (const company of week.companies) {
      for (const [postIndex, post] of (company.posts || []).entries()) {
        items.push(weeklyItem({ filePath, week, company, post, postIndex }));
      }
    }
  }

  return items;
}

async function collectAbItems() {
  const files = await listTypeScriptFiles(AB_DIR);
  const items = [];

  for (const filePath of files) {
    const source = await readFile(filePath, "utf8");
    const edition = extractExportObject(source, filePath);
    if (!edition?.slug) continue;

    for (const [index, highlight] of (edition.highlights || []).entries()) {
      items.push(abHighlightItem({ filePath, edition, highlight, index }));
    }

    for (const [index, pick] of (edition.editorsPicks || []).entries()) {
      items.push(abEditorPickItem({ filePath, edition, pick, index }));
    }
  }

  return items;
}

function summarize(items) {
  const byStatus = items.reduce((acc, item) => ({ ...acc, [item.officialImageStatus]: (acc[item.officialImageStatus] || 0) + 1 }), {});
  const bySourceType = items.reduce((acc, item) => ({ ...acc, [item.sourceType]: (acc[item.sourceType] || 0) + 1 }), {});
  const needsOfficialImageProbe = items.filter((item) => item.needsOfficialImageProbe).length;

  return {
    total: items.length,
    needsOfficialImageProbe,
    giFallbackCandidatesAfterProbe: needsOfficialImageProbe,
    byStatus,
    bySourceType,
  };
}

function renderPrompts(items) {
  const candidates = items.filter((item) => item.giFallbackCandidate);
  const sections = candidates.map((item, index) => `## ${index + 1}. ${item.title}\n\n- id: ${item.id}\n- sourceType: ${item.sourceType}\n- source: ${item.sourceUrl || "N/A"}\n- target: ${item.assetTarget}\n- dataTarget: ${item.dataTarget} → ${item.dataPath}\n\n### /gi prompt\n\n${item.prompt}\n\n### Negative prompt\n\n${item.negativePrompt}\n`);

  return [
    "# VoidNews /gi Thumbnail Prompt Scaffold",
    "",
    "공식 출처에 이미 연결된 이미지가 없는 항목만 정리했습니다. 이 목록은 최종 생성 대상이 아니라 공식 출처 첫 이미지 재확인 대상이며, 공식 이미지 부재가 확인된 항목에만 `/gi` fallback을 적용합니다.",
    "",
    `공식 이미지 확인 필요 후보: ${candidates.length}`,
    "",
    ...sections,
  ].join("\n");
}

async function main() {
  const [weeklyItems, abItems] = await Promise.all([collectWeeklyItems(), collectAbItems()]);
  const items = [...weeklyItems, ...abItems];
  const generatedAt = new Date().toISOString();
  const manifest = {
    generatedAt,
    policy: {
      imagePriority: [
        "existing thumbnail",
        "existing images[0]",
        "official source first image or safe OG/screenshot",
        "/gi generated fallback only after official image absence is confirmed",
        "domain fallback",
      ],
      prohibited: ["subscribe UI", "email form", "fake logos", "fake screenshots", "sensational text"],
    },
    summary: summarize(items),
    items,
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(path.join(OUTPUT_DIR, "thumbnail-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(path.join(OUTPUT_DIR, "gi-prompts.md"), renderPrompts(items));

  console.log(JSON.stringify(manifest.summary, null, 2));
  console.log(`Wrote ${path.relative(ROOT, path.join(OUTPUT_DIR, "thumbnail-manifest.json"))}`);
  console.log(`Wrote ${path.relative(ROOT, path.join(OUTPUT_DIR, "gi-prompts.md"))}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
