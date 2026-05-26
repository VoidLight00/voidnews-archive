#!/usr/bin/env node
/**
 * voidbrief grok-fetcher — vGrok (CCR @ http://127.0.0.1:3456) 기반 큐레이션
 *
 * - Anthropic Messages API spec과 100% 호환 (CCR이 라우팅)
 * - 마스터 템플릿 v3.0 기반 6-section 출처-인용 본문 생성
 * - 응답의 인용 URL 전수 실재 검증 (HEAD/GET status)
 * - 헬스체크 실패 / 응답 부적합 시 exit 1 (폴백 트리거)
 *
 * usage:
 *   node scripts/vgrok-fetch.mjs --topic "Grok Build" --out _workspace/grok/grok-build.json
 *   node scripts/vgrok-fetch.mjs --topic "현대 보스턴 다이나믹스 Atlas" --style 1 --lang ko --out ...
 */
import fs from "node:fs";
import path from "node:path";

const CCR_URL = process.env.VGROK_CCR_URL || "http://127.0.0.1:3456/v1/messages";
const CCR_MODEL = process.env.VGROK_MODEL || "grok-4.3[1m]";
const HEALTH_TIMEOUT_MS = 4_000;
const FETCH_TIMEOUT_MS = 120_000;
const URL_VERIFY_TIMEOUT_MS = 8_000;
const URL_VERIFY_CONCURRENCY = 5;
const MIN_CITATION_COUNT = 4; // 6 section 중 최소 4개 인용 (느슨)
const MIN_VERIFIED_RATIO = 0.5; // 인용 중 50% 이상 실재 URL이어야 통과

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--topic") out.topic = args[++i];
    else if (a === "--style") out.style = args[++i];
    else if (a === "--lang") out.lang = args[++i];
    else if (a === "--compare") out.compare = args[++i];
    else if (a === "--emphasis") out.emphasis = args[++i];
    else if (a === "--date") out.date = args[++i];
    else if (a === "--out") out.out = args[++i];
    else if (a === "--strict") out.strict = true;
  }
  if (!out.topic) {
    console.error("usage: vgrok-fetch --topic '<주제>' [--style 1|2|3] [--lang ko|en] [--compare ...] [--emphasis ...] [--out path]");
    process.exit(2);
  }
  out.style = out.style || "1";
  out.lang = out.lang || "ko";
  out.date = out.date || new Date().toISOString().slice(0, 10);
  return out;
}

function buildPrompt({ topic, style, lang, compare, emphasis, date }) {
  return `────────────────────────────────────
【AI 정보 요약 마스터 템플릿 v3.0 – 출처 검증 최강 버전】
────────────────────────────────────

주제: ${topic}

현재 날짜 기준: ${date}

원하는 스타일 레벨: ${style}
(1 = 가장 추천·균형감 최고 / 2 = 형식적·학술적 / 3 = 가장 간결·전문적)

추가 요청사항:
- 비교할 경쟁 제품: ${compare || "(자유 큐레이션)"}
- 강조하고 싶은 부분: ${emphasis || "(자유 큐레이션)"}
- 출력 언어: ${lang === "ko" ? "한국어" : "영어"}
- 한국 청자 가중치: 한국 기업/매체/사용자 관점이 의미 있으면 별도 항목으로 다룰 것

────────────────────────────────────
※ 엄격한 출처 검증 규칙 (반드시 준수)
────────────────────────────────────

주제 '${topic}'에 관하여, ${date} 현재 실제 공식 발표 자료(x.ai/news, docs.x.ai, grok.x.ai, anthropic.com, openai.com, blog.google, blogs.nvidia.com, about.fb.com 등)와 신뢰할 수 있는 해외 테크 미디어(PCMag, TechCrunch, The Verge, Ars Technica, Wired, Reuters, Bloomberg)의 검증된 사실만을 기반으로 요약을 작성해 주십시오.

절대 규칙:
- 공식 발표나 신뢰할 수 있는 기사에서 직접 확인된 내용만 포함
- 추측, 예상, "~할 것으로 보인다", "소문에 따르면" 같은 미확인 정보는 완전히 배제
- 출처를 확인할 수 없는 사실은 절대 언급하지 않음
- 각 주요 사실 뒤에 (출처: <도메인>/<경로>, YYYY.M.D) 형식으로 반드시 출처 명시
- URL은 실제 존재하는 것만 사용 (가공된 URL 절대 금지)
- 마지막에 "참고 출처 목록"을 별도 섹션으로 정리

아래 구조를 반드시 지켜서 작성해 주세요:

1. 개요 및 배경
2. 핵심 특징 (기술적 스펙, 기능, 사용 환경)
3. 경쟁 제품 비교 분석 (${compare || "관련 경쟁 제품"}과 비교)
4. 현재 시장 평가 및 실증 사례
5. 한계점 및 향후 전망 (공식 로드맵 기반)
6. 결론 및 전략적 시사점

전문적이면서 객관적이고, 발표 자료나 보고서에 바로 사용할 수 있는 명료한 문체로 작성해 주십시오.`;
}

async function withTimeout(promise, ms) {
  let timer;
  const t = new Promise((_, rej) => {
    timer = setTimeout(() => rej(new Error(`timeout-${ms}ms`)), ms);
  });
  try {
    return await Promise.race([promise, t]);
  } finally {
    clearTimeout(timer);
  }
}

async function healthCheck() {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), HEALTH_TIMEOUT_MS);
    const res = await fetch(new URL(CCR_URL).origin + "/", { signal: ctrl.signal });
    clearTimeout(timer);
    return res.ok || res.status === 404 || res.status === 200;
  } catch {
    return false;
  }
}

async function callVgrok(prompt) {
  const body = {
    model: CCR_MODEL,
    max_tokens: 6000,
    messages: [{ role: "user", content: prompt }],
  };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(CCR_URL, {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "local",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`ccr-${res.status}`);
    const data = await res.json();
    const text = (data?.content || [])
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("\n");
    return {
      text,
      raw: data,
      usage: data.usage || null,
    };
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

function extractCitations(text) {
  // (출처: domain/path, YYYY.M.D) — 본문 인라인 인용
  const inlineRe = /\(출처:\s*([^,)]+?)(?:,\s*([\d.]+))?\)/g;
  const inline = [];
  let m;
  while ((m = inlineRe.exec(text))) {
    inline.push({ raw: m[1].trim(), date: m[2] || null });
  }
  // "참고 출처 목록" 섹션에서 절대 URL 추출
  const refsSectionRe = /(?:참고 출처 목록|References)([\s\S]+)$/i;
  const refs = [];
  const sect = text.match(refsSectionRe);
  if (sect) {
    const urlRe = /(https?:\/\/[^\s)\]]+)/g;
    let u;
    while ((u = urlRe.exec(sect[1]))) {
      refs.push(u[1].replace(/[.,)]+$/, ""));
    }
  }
  // 본문 안의 절대 URL도 캡처
  const allUrls = [];
  const inlineUrlRe = /(https?:\/\/[^\s)\]]+)/g;
  let u2;
  while ((u2 = inlineUrlRe.exec(text))) {
    allUrls.push(u2[1].replace(/[.,)]+$/, ""));
  }
  const uniqueUrls = [...new Set([...refs, ...allUrls])];
  return { inline, refs, urls: uniqueUrls };
}

async function verifyUrl(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), URL_VERIFY_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": "voidbrief-grok-fetcher/1.0" },
    });
    clearTimeout(timer);
    return { url, status: res.status, ok: res.ok };
  } catch {
    clearTimeout(timer);
    return { url, status: 0, ok: false };
  }
}

async function verifyUrls(urls) {
  const queue = urls.slice();
  const out = [];
  async function worker() {
    while (queue.length) {
      const u = queue.shift();
      const r = await verifyUrl(u);
      out.push(r);
    }
  }
  await Promise.all(Array.from({ length: URL_VERIFY_CONCURRENCY }, worker));
  return out;
}

async function main() {
  const args = parseArgs();
  const t0 = Date.now();
  const result = {
    ok: false,
    topic: args.topic,
    model: CCR_MODEL,
    via: "ccr@127.0.0.1:3456",
    startedAt: new Date(t0).toISOString(),
    durationMs: 0,
    text: null,
    citations: null,
    verification: null,
    fallbackReason: null,
    usage: null,
  };

  if (!(await healthCheck())) {
    result.fallbackReason = "ccr-health-failed";
    finish(result, args, t0);
    process.exit(1);
  }

  let resp;
  try {
    resp = await callVgrok(buildPrompt(args));
  } catch (e) {
    result.fallbackReason = `vgrok-call-failed:${String(e).slice(0, 120)}`;
    finish(result, args, t0);
    process.exit(1);
  }

  result.text = resp.text;
  result.usage = resp.usage;
  const cits = extractCitations(resp.text);
  result.citations = cits;

  if ((cits.inline?.length || 0) < MIN_CITATION_COUNT && (cits.urls?.length || 0) < MIN_CITATION_COUNT) {
    result.fallbackReason = `insufficient-citations:inline=${cits.inline.length},urls=${cits.urls.length}`;
    finish(result, args, t0);
    process.exit(1);
  }

  const verified = await verifyUrls(cits.urls);
  const okCount = verified.filter((v) => v.ok).length;
  const ratio = verified.length ? okCount / verified.length : 0;
  result.verification = {
    total: verified.length,
    ok: okCount,
    ratio,
    details: verified,
  };

  if (verified.length > 0 && ratio < MIN_VERIFIED_RATIO) {
    result.fallbackReason = `low-verification-ratio:${ratio.toFixed(2)} ok=${okCount}/${verified.length}`;
    if (args.strict) {
      finish(result, args, t0);
      process.exit(1);
    }
  }

  result.ok = true;
  finish(result, args, t0);
  process.exit(0);
}

function finish(result, args, t0) {
  result.durationMs = Date.now() - t0;
  const json = JSON.stringify(result, null, 2);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, json);
    console.error(`[vgrok-fetch] wrote ${args.out} (ok=${result.ok}, fallback=${result.fallbackReason ?? "-"})`);
  } else {
    process.stdout.write(json + "\n");
  }
}

main().catch((e) => {
  console.error("[vgrok-fetch] fatal:", e);
  process.exit(1);
});
