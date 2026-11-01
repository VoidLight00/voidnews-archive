// playwright-engine.mjs — 리뉴얼 브라우저 시험이 Chromium 또는 WebKit을 띄우는 공용 함수
//
// 왜: 이 기기의 Playwright 1.58은 webkit-2248을 기대하지만 설치된 것은 webkit-2359(WebKit 26.0)입니다. 기대 빌드가 없으면
// 같은 캐시 폴더에서 설치를 마친 가장 새 webkit-* 빌드를 씁니다. 캐시 폴더는 Playwright가 알려 주는 기대 실행 파일 경로에서
// 구하므로 PLAYWRIGHT_BROWSERS_PATH와 운영체제별 기본 경로를 Playwright와 똑같이 따릅니다. 어떤 빌드를 썼는지 돌려줍니다.
import fs from 'node:fs';
import path from 'node:path';

export async function launchEngine(playwright, engine) {
  const type = playwright[engine];
  if (!type) throw new Error(`unknown engine ${engine}`);
  const expected = type.executablePath();
  const parts = expected.split(path.sep);
  const at = parts.findIndex((part) => /^(chromium|chromium_headless_shell|webkit)-\d+$/.test(part));
  const expectedBuild = at >= 0 ? parts[at] : 'unknown';
  try {
    return { browser: await type.launch(), build: expectedBuild, fallback: false };
  } catch (error) {
    if (engine !== 'webkit' || at < 0 || !/Executable doesn't exist/.test(error.message)) throw error;
    const cache = parts.slice(0, at).join(path.sep) || path.sep;
    const file = parts.slice(at + 1).join(path.sep);
    const builds = (fs.existsSync(cache) ? fs.readdirSync(cache) : [])
      .filter((d) => /^webkit-\d+$/.test(d) && fs.existsSync(path.join(cache, d, 'INSTALLATION_COMPLETE')) && fs.existsSync(path.join(cache, d, file)))
      .sort((x, y) => Number(y.slice(7)) - Number(x.slice(7)));
    if (!builds.length) throw new Error(`${error.message.split('\n')[0]} (install one with: npx playwright install webkit)`);
    const browser = await type.launch({ executablePath: path.join(cache, builds[0], file) });
    return { browser, build: `${builds[0]} (expected ${expectedBuild} is missing)`, fallback: true };
  }
}
