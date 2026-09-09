import fs from 'node:fs';
import { collectWeeklyImages, validateWeeklyImages } from './lib/weekly-images.mjs';
const ledgerPath = 'references/weekly-source-image-audit.json';
let ledger;
try { ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8')); } catch { /* validator reports a missing audit */ }
const items = collectWeeklyImages();
const result = validateWeeklyImages(items, ledger);
if (result.failures.length) {
  console.error(`FAIL[weekly-source-images] ${result.failures.length} failures\n${result.failures.slice(0, 20).join('\n')}`);
  process.exit(1);
}
const counts = result.unresolved.reduce((acc, item) => ({ ...acc, [item.status]: (acc[item.status] || 0) + 1 }), {});
console.log(`PASS[weekly-source-images] ${items.length} current Weekly posts; ${result.checkedFiles} local image files have valid signatures; ${result.available.length} recovered source images are attached with matching hashes; ${result.unresolved.length} explicitly unresolved source reviews ${JSON.stringify(counts)}. This is not a claim that unresolved sources have no images.`);
