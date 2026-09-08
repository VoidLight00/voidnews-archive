import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const inventory = JSON.parse(execFileSync(process.execPath, ['scripts/audit-thumbnails.mjs', '--summary-only'], { encoding: 'utf8' }));
assert.equal(inventory.total, Object.values(inventory.bySourceType).reduce((a, b) => a + b, 0));
assert.equal(inventory.total, Object.values(inventory.byStatus).reduce((a, b) => a + b, 0));
assert.ok(inventory.bySourceType['ab-model-watch'] > 0);
assert.equal(inventory.giFallbackCandidatesAfterProbe, 0, 'Unprobed sources must not authorize image generation');
assert.equal(inventory.needsOfficialImageProbe, inventory.byStatus['needs-official-image-probe']);
console.log(`PASS ${inventory.total} thumbnail records; model watch included; unverified sources cannot authorize generation`);
