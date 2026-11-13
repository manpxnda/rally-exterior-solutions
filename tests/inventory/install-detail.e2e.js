// Reports → click the customer → see/edit what was used. ~40 s.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const RALLY = 'http://localhost:3111';
const OUT = process.env.OUT || path.join(process.env.HOME, 'Desktop', 'Rally staging screenshots', 'install-detail');
fs.mkdirSync(OUT, { recursive: true });
const CREDS = { username: 'test', password: 'test' };
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail ? ' — ' + detail : '')); };
const sq = (t) => String(t || '').replace(/\s+/g, ' ').trim();
const settled = (p) => p.waitForFunction(() => /Synced|Cloud|Offline|failed/.test(document.getElementById('sync-pill').textContent), null, { timeout: 30000 });

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const ctx = await browser.newContext({ httpCredentials: CREDS, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
  page.on('dialog', async (d) => { await d.accept(); });
  await page.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await settled(page);
  await page.click('.div-btn:has-text("Christmas Lighting")');
  await page.waitForTimeout(300);
  await page.evaluate(() => { const b = state.inventory[0].variants[0]; b.unitCost = 0.6; b.bundleCost = 300; const w = state.inventory.find(g => g.name === 'Socket Wire').variants[0]; w.unitCost = 0.3; w.bundleCost = 300; save(); render(); });

  // Close a job: reserve 500 bulbs + 300 ft, use 480 + 300, add 2 timers at close-out
  await page.click('.nav button:has-text("Projects")');
  await page.click('button:has-text("+ New project")');
  await page.fill('#pn-name', 'Flanigan Test');
  await page.fill('#pn-addr', '9 Oak St');
  await page.fill('#pn-footage', '200');
  await page.fill('#pni-c1-c1v1', '500');
  await page.fill('#pni-c4-c4v1', '300');
  await page.click('.modal-footer button:has-text("Add project")');
  await page.waitForTimeout(200);
  await page.locator('#proj-list .tbl-wrap', { hasText: 'Flanigan Test' }).locator('button:has-text("Reserve")').last().click();
  await page.waitForTimeout(200);
  await page.click('#reserve-form button:has-text("Save reservation")');
  await page.waitForTimeout(300);
  await page.click('.nav button:has-text("Confirm install")');
  await page.waitForTimeout(200);
  await page.fill('#conf-c1-c1v1', '480');
  await page.fill('#conf-footage', '210');
  await page.selectOption('#conf-ex-group', { label: 'Timers' });
  await page.fill('#conf-ex-qty', '2');
  await page.click('#confirm-form button:has-text("+ Add")');
  await page.click('button:has-text("Confirm & close job")');
  await page.waitForTimeout(300);
  const rec = await page.evaluate(() => state.installs[0]);
  check('close-out now records per-line usage with cost at the time', rec.lines && rec.lines.length === 3 && rec.lines[0].qty === 480 && rec.lines[0].cost === 0.6 && rec.lines[0].reserved === 500 && rec.lines[2].extra === true && rec.lines[2].qty === 2, JSON.stringify(rec.lines));
  const stockAfter = await page.evaluate(() => ({ bulbs: state.inventory[0].variants[0].qty, timers: state.inventory.find(g => g.name === 'Timers').variants[0].qty }));
  check('stock reduced by what was used (2025−480, 28−2)', stockAfter.bulbs === 1545 && stockAfter.timers === 26, JSON.stringify(stockAfter));

  // Reports → name is a link → detail modal
  await page.click('.nav button:has-text("Reports")');
  await page.waitForTimeout(200);
  const link = await page.locator('#report-tbody a.inst-link', { hasText: 'Flanigan Test' }).count();
  check('Reports shows the customer name as a link', link === 1);
  await page.click('#report-tbody a.inst-link:has-text("Flanigan Test")');
  await page.waitForTimeout(200);
  const modal = sq(await page.locator('.modal').innerText());
  check('detail shows the product used, costs and totals', /C9 Bulbs — Warm white/.test(modal) && /500 reserved/.test(modal) && /Socket Wire — C9/.test(modal) && /Timers/.test(modal) && /added at close-out/.test(modal) && /material cost \$378\.00/i.test(modal) && /210 ft/.test(modal) && /cost \/ ft \$1\.80/i.test(modal), modal.slice(0, 300));
  const usedVals = await page.evaluate(() => [...document.querySelectorAll('#ie-lines input[type=number]')].map(i => i.value));
  check('line quantities and unit costs are editable fields', usedVals.join(',') === '480,0.6,300,0.3,2,0', usedVals.join(','));
  const adj = await page.isChecked('#ie-adjust');
  check('"adjust stock" is on by default for a job with recorded usage', adj === true);
  await page.screenshot({ path: path.join(OUT, '01-install-detail.png') });

  // Edit: bulbs 480 → 500, footage 210 → 200, add 1 surge protector, notes
  await page.locator('#ie-lines input[type=number]').first().fill('500');
  await page.fill('#ie-footage', '200');
  await page.fill('#ie-notes', 'Corrected after crew count');
  await page.selectOption('#ie-add-group', { label: 'Surge Protectors' });
  await page.fill('#ie-add-qty', '1');
  await page.click('.modal button:has-text("+ Add")');
  await page.waitForTimeout(100);
  const totals = sq(await page.locator('#ie-totals').innerText());
  check('totals update live (500×0.60 + 300×0.30 + 2×0 + 1×0 = $390.00, $1.95/ft)', /\$390\.00/.test(totals) && /\$1\.95/.test(totals), totals);
  await page.click('.modal-footer button:has-text("Save changes")');
  await page.waitForTimeout(300);
  const saved = await page.evaluate(() => ({ inst: state.installs[0], bulbs: state.inventory[0].variants[0].qty, surge: state.inventory.find(g => g.name === 'Surge Protectors').variants[0].qty }));
  check('saved: record updated (4 lines, $390, 200 ft, notes) and stock adjusted by the deltas (bulbs −20, surge −1)', saved.inst.lines.length === 4 && Math.abs(saved.inst.totalCost - 390) < 0.001 && saved.inst.footage === 200 && saved.inst.notes === 'Corrected after crew count' && saved.bulbs === 1525 && saved.surge === 2, JSON.stringify({ lines: saved.inst.lines.length, total: saved.inst.totalCost, bulbs: saved.bulbs, surge: saved.surge }));
  const row = sq(await page.locator('#report-tbody tr', { hasText: 'Flanigan Test' }).innerText());
  check('Reports row reflects the edit', /\$390\.00/.test(row) && /\$1\.95/.test(row) && /200 ft/.test(row) && /Corrected after crew count/.test(row), row);

  // Legacy install (no lines): detail falls back to reserved quantities, flagged, stock adjust off by default
  await page.evaluate(() => {
    state.projects.push({ id: 'legacy1', name: 'Legacy Job', address: '1 Old Rd', date: '2026-10-01', footage: 100, notes: '', status: 'reserved', items: [{ groupId: 'c1', variantId: 'c1v1', qty: 120 }], neededItems: [] });
    state.installs.push({ projectId: 'legacy1', date: '2026-10-01', notes: '', totalCost: 60, footage: 100, costPerFoot: 0.6 });
    save(); render();
  });
  await page.click('#report-tbody a.inst-link:has-text("Legacy Job")');
  await page.waitForTimeout(200);
  const legacy = sq(await page.locator('.modal').innerText());
  check('legacy job: lines rebuilt from reservations, flagged, recorded total shown', /closed before per-item usage was recorded/.test(legacy) && /\$60\.00/.test(legacy) && /C9 Bulbs — Warm white/.test(legacy), legacy.slice(0, 260));
  check('legacy job: "adjust stock" is off by default', (await page.isChecked('#ie-adjust')) === false);
  await page.locator('#ie-lines input[type=number]').first().fill('100');
  await page.click('.modal-footer button:has-text("Save changes")');
  await page.waitForTimeout(300);
  const leg = await page.evaluate(() => ({ lines: state.installs.find(i => i.projectId === 'legacy1').lines, total: state.installs.find(i => i.projectId === 'legacy1').totalCost, bulbs: state.inventory[0].variants[0].qty }));
  check('legacy edit saves real lines + new total without touching stock', leg.lines.length === 1 && leg.lines[0].qty === 100 && Math.abs(leg.total - 60) < 0.001 && leg.bulbs === 1525, JSON.stringify(leg));

  // Reopen job
  await page.click('#report-tbody a.inst-link:has-text("Flanigan Test")');
  await page.waitForTimeout(200);
  await page.click('.modal-footer button:has-text("Reopen job")');
  await page.waitForTimeout(300);
  const re = await page.evaluate(() => ({ installs: state.installs.length, proj: state.projects.find(p => p.name === 'Flanigan Test').status, bulbs: state.inventory[0].variants[0].qty, reservedBulbs: state.inventory[0].variants[0].reserved }));
  check('Reopen returns used stock (1525+500), re-reserves the plan (500) and removes the cost record', re.installs === 1 && re.proj === 'reserved' && re.bulbs === 2025 && re.reservedBulbs === 500, JSON.stringify(re));
  await page.click('.nav button:has-text("Projects")');
  const back = sq(await page.locator('#proj-list').innerText());
  check('reopened job is back in Projects as Reserved', /Flanigan Test/.test(back) && /Reserved/.test(back));

  await browser.close();
  const failed = results.filter(r => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error('E2E crashed:', e); process.exit(2); });
