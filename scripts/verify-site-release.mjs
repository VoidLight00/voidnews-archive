import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== '--url') {
  console.error('Usage: npm run verify:site -- --url https://voidnews-archive.vercel.app');
  process.exit(1);
}
let url;
try {
  url = new URL(args[1]);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') throw new Error('Use the site origin only');
} catch {
  console.error('FAIL[site-release] A plain HTTP(S) site origin is required');
  process.exit(1);
}
const baseURL = url.origin;
const run = path.resolve('_workspace/release', new Date().toISOString().replace(/[:.]/g, '-'));
fs.mkdirSync(run, { recursive: true });
const git = spawnSync('git', ['rev-parse', 'HEAD']);
if (git.status !== 0) {
  console.error('FAIL[site-release] Could not identify the current commit');
  process.exit(1);
}
const result = { status: 'RUNNING', baseURL, startedAt: new Date().toISOString(), commit: git.stdout.toString('utf8').trim(), checks: [] };
const env = { ...process.env, VOIDNEWS_TEST_URL: baseURL, VOIDNEWS_IMAGE_TEST_OUTPUT: path.join(run, 'weekly-images.json'), VOIDNEWS_SUPPLEMENT_TEST_OUTPUT: path.join(run, 'ab-supplements.json') };
const checks = [
  ['master', 'bash', ['gates/verify_voidnews.sh', '.']],
  ['browse-and-mobile', process.execPath, ['scripts/test-browse-ui.mjs']],
  ['image-disclosure-and-failure', process.execPath, ['scripts/test-image-disclosure.mjs']],
  ['ab-reader-and-supplements', process.execPath, ['scripts/test-ab-supplements-ui.mjs']],
  ['all-weekly-images', process.execPath, ['scripts/test-weekly-images-ui.mjs']],
];
const save = () => fs.writeFileSync(path.join(run, 'result.json'), JSON.stringify(result, null, 2) + '\n');
save();
for (const [name, command, commandArgs] of checks) {
  console.log(`RUN ${name} ${baseURL}`);
  const checkedAt = new Date().toISOString();
  const step = spawnSync(command, commandArgs, { env, timeout: 600_000, maxBuffer: 20 * 1024 * 1024 });
  const log = path.join(run, `${name}.log`);
  fs.writeFileSync(log, Buffer.concat([step.stdout || Buffer.alloc(0), step.stderr || Buffer.alloc(0)]));
  const exitCode = Number.isInteger(step.status) ? step.status : 1;
  result.checks.push({ name, checkedAt, exitCode, log: path.basename(log), ...(step.error ? { error: step.error.message } : {}) });
  if (exitCode !== 0) {
    result.status = 'FAIL';
    result.completedAt = new Date().toISOString();
    save();
    console.error(`FAIL[site-release] ${name}; see ${log}`);
    process.exit(1);
  }
  save();
  console.log(`PASS ${name}`);
}
result.status = 'PASS';
result.completedAt = new Date().toISOString();
save();
console.log(`PASS[site-release] All mandatory checks passed against ${baseURL}; evidence: ${path.join(run, 'result.json')}`);
// 보존 경고(2026-10-19): 호출마다 약 13MB 영수증 폴더가 생기고 상한이 없어 _workspace/release 가 2.8GB 가 됐다.
// 여기서는 지우지 않는다. 정리는 계획·대조·휴지통 이동을 하는 prune_workspace.py 가 맡는다.
const passCount = fs.readdirSync(path.dirname(run)).filter((d) => /^\d{4}-\d{2}-\d{2}T/.test(d)).filter((d) => {
  try { return JSON.parse(fs.readFileSync(path.join(path.dirname(run), d, 'result.json'), 'utf8')).status === 'PASS'; } catch { return false; }
}).length;
if (passCount > 5) console.log(`WARN[site-release:retention] PASS 영수증 ${passCount}개 (보존 기준 5). 정리 계획: python3 scripts/prune_workspace.py`);
