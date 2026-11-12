// "Order to fulfill open projects" panel on the Projects tab. ~30 s.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const RALLY = 'http://localhost:3111';
const OUT = process.env.OUT || path.join(process.env.HOME, 'Desktop', 'Rally staging screenshots', 'order-panel');
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
  const dialogs = [];
  page.on('dialog', async (d) => { dialogs.push(d.message()); await d.accept(); });
  await page.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await settled(page);
  await page.click('.div-btn:has-text("Christmas Lighting")');
  await page.waitForTimeout(300);
  // Known stock: warm-white C9 2025 (case 500, cost blank → set $0.60), C9 wire 3000 ft (spool 1000, $0.30/ft), tax 6%
  await page.evaluate(() => { const b = state.inventory[0].variants[0]; b.unitCost = 0.6; b.bundleCost = 300; const w = state.inventory.find(g => g.name === 'Socket Wire').variants[0]; w.unitCost = 0.3; w.bundleCost = 300; state.settings.taxPct = 6; save(); render(); });
  await page.click('.nav button:has-text("Projects")');
  check('no projects → no panel', (await page.locator('#proj-order .ord-panel').count()) === 0);

  // Two jobs: together need 2600 bulbs (575 short → 2 cases) and 3500 ft wire (500 short → 1 spool); one reserved, one planned
  for (const [name, bulbs, wire] of [['Job A', 1500, 1000], ['Job B', 1100, 2500]]) {
    await page.click('button:has-text("+ New project")');
    await page.fill('#pn-name', name);
    await page.fill('#pni-c1-c1v1', String(bulbs));
    await page.fill('#pni-c4-c4v1', String(wire));
    await page.click('.modal-footer button:has-text("Add project")');
    await page.waitForTimeout(200);
  }
  await page.locator('#proj-list .tbl-wrap', { hasText: 'Job A' }).locator('button:has-text("Reserve")').last().click();
  await page.waitForTimeout(200);
  await page.click('#reserve-form button:has-text("Save reservation")');
  await page.waitForTimeout(300);
  await page.click('.nav button:has-text("Projects")');
  const panel = sq(await page.locator('#proj-order').innerText());
  check('panel counts open projects and items short', /2 open projects/.test(panel) && /2 items short/.test(panel), panel.slice(0, 160));
  check('bulbs: all jobs need 2600, on hand 2025, short 575 → order 2 × 500 = 1000', /C9 Bulbs — Warm white Job A · Job B 2600 bulb 2025 575 2 × 500 = 1000/.test(panel), panel.slice(0, 300));
  check('wire: need 3500, on hand 3000, short 500 → 1 × 1000', /Socket Wire — C9 Job A · Job B 3500 ft 3000 500 1 × 1000 = 1000/.test(panel));
  // cost: 1000 bulbs × $0.60 × 1.06 = $636.00 + 1000 ft × $0.30 × 1.06 = $318.00 → $954.00
  check('estimated cost includes tax (1000×$0.60 + 1000×$0.30, ×1.06 = $954.00)', /Total to order \$954\.00/.test(panel) && /about \$954\.00 to order/.test(panel), (panel.match(/Total to order[^A-Z]*/) || [''])[0]);
  await page.screenshot({ path: path.join(OUT, '01-order-panel.png') });

  // Copy list
  await page.evaluate(() => { window.__copied = ''; navigator.clipboard.writeText = (t) => { window.__copied = t; return Promise.resolve(); }; });
  await page.click('#proj-order button:has-text("Copy list")');
  await page.waitForTimeout(200);
  const copied = await page.evaluate(() => window.__copied);
  check('Copy list puts a plain-text order list on the clipboard', /order 2 × 500 \(1000 bulb\)/.test(copied) && /order 1 × 1000 \(1000 ft\)/.test(copied) && /\$954\.00/.test(copied), copied.split('\n')[1]);

  // Collapse persists; receiving stock removes a line; installing a job drops it from the totals
  await page.click('#proj-order .ord-head');
  check('panel collapses', (await page.locator('#proj-order table').count()) === 0);
  await page.click('#proj-order .ord-head');
  await page.click('.nav button:has-text("Inventory")');
  await page.click('button:has-text("Receive order")');
  await page.fill('#pni-c4-c4v1', '1000');
  await page.click('.modal-footer button:has-text("Add to stock")');
  await page.waitForTimeout(200);
  await page.click('.nav button:has-text("Projects")');
  const after = sq(await page.locator('#proj-order').innerText());
  check('receiving 1000 ft of wire removes it from the order list', /1 item short/.test(after) && !/Socket Wire/.test(after), after.slice(0, 120));
  await page.click('.nav button:has-text("Confirm install")');
  await page.waitForTimeout(200);
  await page.click('button:has-text("Confirm & close job")');
  await page.waitForTimeout(300);
  await page.click('.nav button:has-text("Projects")');
  const afterInstall = sq(await page.locator('#proj-order').innerText());
  // Job A installed (used 1500 bulbs → on hand 525); Job B still needs 1100 → short 575 → 2 cases
  check('after installing Job A only Job B counts (1100 needed, 525 on hand, short 575)', /1 open project/.test(afterInstall) && /Job B 1100 bulb 525 575 2 × 500/.test(afterInstall), afterInstall.slice(0, 220));

  await browser.close();
  const failed = results.filter(r => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error('E2E crashed:', e); process.exit(2); });
