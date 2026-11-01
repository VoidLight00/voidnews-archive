// AB 회차 등록과 참조 파일을 읽는 공용 규칙. 빌드 게이트(check-ab-editions.mjs), 커밋 직전 검사(check-staged-editions.mjs),
// 운영 화면 시험(test-ab-edition-ui.mjs)이 같은 규칙을 쓰도록 한곳에 둡니다.
// 2026-11-02 검토: 세 스크립트가 정규식을 따로 가져, 주석 처리한 import를 등록으로 세고 @/ 경로 import는 놓쳤습니다.
// 참조 파일은 작은따옴표·백틱, ?v= 쿼리, %2B 같은 인코딩, 공백이 든 경로를 놓치거나 잘못 판정했습니다.
const SLUG = /^\d{4}-\d{2}[a-z]$/;
const IMPORT = /from\s+["'](?:\.\/|@\/lib\/ab\/)editions\/([^"']+)["']/g;
// 첫 경로 조각은 public/ 아래 폴더 이름(공백 없음)이어야 해서 "/goal 명령 결과.png" 같은 본문 문장은 잡지 않습니다.
// "//host/x.png"(다른 사이트)는 첫 조각이 비어 있어 건너뜁니다.
const ASSET = /(["'`])(\/[\w.-]+(?:\/[^"'`?#\n]*?)?\.(?:png|jpe?g|webp|gif|avif|svg|mp4|webm|mov|m4v))(?:[?#][^"'`\n]*)?\1/gi;

const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

/** lib/ab/data.ts가 등록한 회차 slug. 주석 속 import와 회차 형식(YYYY-MMx)이 아닌 보조 모듈은 뺍니다. */
export function registeredEditions(dataTs) {
  return [...stripComments(dataTs).matchAll(IMPORT)].map((m) => m[1].replace(/\.[jt]sx?$/, "")).filter((s) => SLUG.test(s));
}

/** 소스가 참조하는 사이트 내부 이미지·영상 경로(퍼센트 인코딩을 푼 값). ${} 템플릿은 실제 경로를 알 수 없어 건너뜁니다. */
export function assetRefs(src) {
  return [...src.matchAll(ASSET)]
    .map((m) => m[2])
    .filter((p) => !p.includes("${"))
    .map((p) => p.split("/").map((s) => { try { return decodeURIComponent(s); } catch { return s; } }).join("/"));
}
