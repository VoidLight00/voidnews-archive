#!/usr/bin/env node
// Linux 배포 전에 macOS NFD 한글 파일명을 코드 참조와 같은 NFC 별칭으로 복제한다.
// macOS는 두 정규형을 같은 경로로 처리하지만 Linux는 다른 파일명으로 구분한다.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = path.join(ROOT, "public", "og-cache");

let created = 0;
for (const name of fs.readdirSync(CACHE)) {
  const normalized = name.normalize("NFC");
  if (name === normalized) continue;

  const source = path.join(CACHE, name);
  const target = path.join(CACHE, normalized);
  if (fs.existsSync(target)) continue;

  fs.copyFileSync(source, target);
  created += 1;
}

console.log(`[normalize-og-cache-names] NFC aliases created=${created}`);
