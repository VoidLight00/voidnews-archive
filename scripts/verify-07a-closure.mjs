#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const closurePath = join(ROOT, "references/closures/2026-07a.json");
const manifestPath = join(ROOT, "_workspace/ab/20260703-142555-ab-20260625-20260708/RUN_MANIFEST.json");
const reportPath = join(process.env.HOME, "projects/voidnews-reports/2026-07a/index.html");
const weeklyPath = join(ROOT, "lib/weeks/2026-w28.ts");
const editionPath = join(ROOT, "lib/ab/editions/2026-07a.ts");
const sourcePath = join(ROOT, "app/ab/[edition]/components/source.tsx");

const closure = JSON.parse(readFileSync(closurePath, "utf8"));
const weekly = readFileSync(weeklyPath, "utf8");
const edition = readFileSync(editionPath, "utf8");
const source = readFileSync(sourcePath, "utf8");
const failures = [];

const requireText = (body, text, label) => {
  if (!body.includes(text)) failures.push(`${label}: '${text}' 누락`);
};
const forbidText = (body, text, label) => {
  if (body.includes(text)) failures.push(`${label}: 금지 문구 '${text}' 잔존`);
};

if (closure.status !== "completed") failures.push("closure status != completed");
if (closure.presentationDate !== "2026-07-09") failures.push("closure presentationDate != 2026-07-09");
if (closure.sourceVerification?.status !== "generally-available-api") failures.push("closure GPT status 불일치");
if (!closure.supersededItemIds?.includes("openai-20260626-gpt-5-6-sol-terra-luna")) failures.push("closure superseded preview id 누락");
const closureException = closure.approvedPostWindowExceptions?.find((item) => item.cardId === "bytedance-20260709-seedream-5-pro-layer-editing");
if (!closureException || closureException.date !== "2026-07-09" || closureException.evidence !== "git 4776436") failures.push("closure Seedream 승인 예외 불완전");
if (!closure.resolvedUserDecisions?.some((item) => item.decision === "발표안 선택" && item.value === "finalized-2026-07-08")) failures.push("closure resolved 발표안 결정 누락");

requireText(weekly, 'officialUrl": "https://developers.openai.com/api/docs/models/gpt-5.6"', "Weekly official source");
requireText(weekly, '"verifiedAt": "2026-07-17"', "Weekly verifiedAt");
requireText(weekly, '"title": "OpenAI, GPT-5.6 Sol·Terra·Luna 일반 공개', "Weekly KO GA");
requireText(weekly, '"title": "OpenAI makes GPT-5.6 Sol, Terra, and Luna generally available"', "Weekly EN GA");
forbidText(weekly, "상무부 CAISI의 추가 테스트를 통과해 일반 공개가 승인", "Weekly unsupported claim");

requireText(edition, 'officialUrl: "https://developers.openai.com/api/docs/models/gpt-5.6"', "AB official source");
requireText(edition, 'verifiedAt: "2026-07-17"', "AB verifiedAt");
requireText(edition, "일반 사용 가능한 API 모델", "AB KO GA");
requireText(edition, "generally available API models", "AB EN GA");
forbidText(edition, "아직 신뢰 파트너 대상 제한 프리뷰", "AB stale preview");

forbidText(source, 'checked: "확인일 2026-05-26"', "SourceAudit hardcode");
requireText(source, "input.verifiedAt ? `확인일 ${input.verifiedAt}` : null", "SourceAudit conditional value");
requireText(source, "audit.checked ? <div><dt>확인</dt><dd>{audit.checked}</dd></div> : null", "SourceAudit conditional row");

// Workspace와 보고서는 운영 산출물이라 clean clone에 없을 수 있다. 존재할 때만 tracked closure와 교차검증한다.
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (manifest.publication?.status !== closure.status) failures.push("manifest/closure publication.status drift");
  if (manifest.publication?.presentationDate !== closure.presentationDate) failures.push("manifest/closure presentationDate drift");
  if (!manifest.publication?.supersededItemIds?.includes("openai-20260626-gpt-5-6-sol-terra-luna")) failures.push("manifest superseded preview id 누락");
  const exception = manifest.approvedPostWindowExceptions?.find((item) => item.cardId === closureException.cardId);
  if (!exception || exception.date !== closureException.date || exception.evidence !== closureException.evidence) failures.push("manifest/closure Seedream 예외 drift");
  const pending = manifest.planModeResult?.pendingUserDecisions || [];
  if (pending.includes("발표안 선택(A/B/C)")) failures.push("stale 발표안 pending token 잔존");
  const resolved = manifest.planModeResult?.resolvedUserDecisions || [];
  if (!resolved.some((item) => item.decision === "발표안 선택" && item.value === "finalized-2026-07-08")) failures.push("manifest resolved 발표안 결정 누락");
}

if (existsSync(reportPath)) {
  const report = readFileSync(reportPath, "utf8");
  requireText(report, "발표일 <b>2026-07-09</b>", "Report date");
  requireText(report, "상태 <b>발표 완료</b>", "Report status");
  forbidText(report, "상태 <b>사전 수집</b>", "Report stale status");
  forbidText(report, "GPT-5.6 Sol·Terra·Luna 제한 프리뷰", "Report superseded preview");
  const top10Count = (report.match(/class="prow(?: main)?"/g) || []).length;
  if (top10Count !== 10) failures.push(`Report Top10 count=${top10Count}`);
}

if (failures.length) {
  console.error("FAIL[verify-07a-closure]");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(2);
}
console.log("PASS[verify-07a-closure] tracked closure·GA/API 단일 상태·KO/EN·SourceAudit 검증 완료");
