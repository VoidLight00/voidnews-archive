#!/usr/bin/env node
import assert from "node:assert/strict";
import { buildPrompt, outputLimit, extractCitations } from "./vgrok-fetch.mjs";

const args = { topic: "Fixture", style: "1", lang: "ko", date: "2026-09-20" };
const full = buildPrompt(args);
const compact = buildPrompt({ ...args, compact: true });
assert.match(full, /6\. 결론 및 전략적 시사점/);
assert.match(compact, /후보 탐색 전용/);
assert.match(compact, /한국 청자 가중치/);
assert.ok(compact.length < full.length);
assert.equal(outputLimit(), 6000);
assert.equal(outputLimit(true), 1800);
const text = Array.from({ length: 4 }, (_, i) => `사실 (출처: example.com/${i}, 2026.9.20) https://example.com/${i}`).join("\n");
const citations = extractCitations(text);
assert.equal(citations.inline.length, 4);
assert.equal(citations.urls.length, 4);
console.log("PASS[vgrok-compact] default/opt-in/citations; no API calls; token savings unknown");
