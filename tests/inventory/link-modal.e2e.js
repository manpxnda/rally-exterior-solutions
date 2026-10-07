// Link modal: store chooser + one-off (manual) sources. Fast — no bookmarklet run.
// See README.md for how to start the server. Last run 16/16 on 2026-09-28.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const RALLY = 'http://localhost:3111';
const OUT = process.env.OUT || path.join(process.env.HOME, 'Desktop', 'Rally staging screenshots', 'link-sources');
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
  page.on('dialog', async (d) => { console.log('dialog:', d.type(), d.message().slice(0, 110)); await d.accept(); });
  await page.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await settled(page);
  await page.click('.div-btn:has-text("Christmas Lighting")');
  await page.waitForTimeout(300);
  await page.click('.nav button:has-text("Supplier prices")');
  await page.waitForFunction(() => { try { return !!(catalogs['christmaslightcontractorsusa.com'] && catalogs['s4lights.com']); } catch (e) { return false; } }, null, { timeout: 120000 });
  await page.waitForTimeout(300);

  // 1. Store chooser pills
  await page.locator('#sup-body tr', { hasText: 'C7 Bulbs' }).first().locator('button:has-text("Link…")').click();
  const pills = await page.locator('#lk-modes .pill').allInnerTexts();
  check('link modal offers All stores / each store / Somewhere else', pills.length === 4 && pills[0] === 'All stores' && /Christmas Light Contractors USA/.test(pills[1]) && /S4 Lights/.test(pills[2]) && /Somewhere else/.test(pills[3]), JSON.stringify(pills));
  await page.fill('#lk-q', 'c7 led opaque');
  await page.waitForTimeout(200);
  const allRes = await page.locator('.lk-row').allInnerTexts();
  await page.click('#lk-modes .pill:has-text("S4 Lights")');
  await page.waitForTimeout(100);
  const label = await page.locator('#lk-body label').first().innerText();
  await page.fill('#lk-q', 'c7 led opaque');
  await page.waitForTimeout(200);
  const s4Res = await page.locator('.lk-row').allInnerTexts();
  check('choosing a store scopes the search to it', /Search S4 Lights/i.test(label) && s4Res.length >= 1 && s4Res.every(t => !/Christmas Light Contractors/.test(t)) && allRes.length >= s4Res.length, `all=${allRes.length} s4=${s4Res.length} · ${sq(label)}`);
  await page.click('#lk-modes .pill:has-text("Christmas Light Contractors USA")');
  await page.fill('#lk-q', 'c7');
  await page.waitForTimeout(200);
  const clcRes = await page.locator('.lk-row').allInnerTexts();
  check('switching store re-scopes the same search', clcRes.length >= 1 && clcRes.every(t => !/S4 Lights/.test(t)), clcRes.length + ' CLC results');
  await page.screenshot({ path: path.join(OUT, '01-link-modal-store-chooser.png') });
  await page.click('.modal-footer button:has-text("Cancel")');

  // 2. One-off source: Christmas trees from Amazon
  await page.locator('#sup-body tr', { hasText: 'Pre-lit Christmas Trees' }).first().locator('button:has-text("Link…")').click();
  await page.click('#lk-modes .pill:has-text("Somewhere else")');
  await page.waitForTimeout(100);
  const hasForm = await page.locator('#lk-src').count();
  check('Somewhere else shows the one-off form', hasForm === 1);
  await page.fill('#lk-src', 'Amazon');
  await page.fill('#lk-name', '7.5 ft pre-lit Christmas tree');
  await page.fill('#lk-url', 'www.amazon.com/dp/B0EXAMPLE');
  await page.fill('#lk-price', '299.99');
  await page.fill('#lk-mpack', '1');
  const works = await page.locator('#lk-selected').innerText();
  check('one-off form computes the per-unit price', /\$299\.99/.test(works), sq(works));
  await page.screenshot({ path: path.join(OUT, '02-link-modal-one-off.png') });
  await page.click('.modal-footer button:has-text("Save link")');
  await page.waitForTimeout(200);
  const m = await page.evaluate(() => state.supplier.map['c17v1']);
  check('one-off link saved (source, name, https url, price, pack, date)', m && m.manual === true && m.source === 'Amazon' && /pre-lit/.test(m.name) && m.url === 'https://www.amazon.com/dp/B0EXAMPLE' && m.price === 299.99 && m.pack === 1 && m.at > 0, JSON.stringify(m));
  const row = await page.locator('#sup-body tr', { hasText: 'Pre-lit Christmas Trees' }).first().innerText();
  check('row shows the one-off source, noted price, "no cost yet" and Apply', /Amazon · one-off · price noted/.test(row) && /\$299\.99/.test(row) && /no cost yet/.test(row) && /Apply/.test(row) && /Update…/.test(row), sq(row).slice(0, 220));
  const href = await page.locator('#sup-body tr', { hasText: 'Pre-lit Christmas Trees' }).first().locator('a.sup-link').getAttribute('href');
  check('product name links to the Amazon page', href === 'https://www.amazon.com/dp/B0EXAMPLE', href);
  await page.locator('#sup-body tr', { hasText: 'Pre-lit Christmas Trees' }).first().locator('button:has-text("Apply")').click();
  const cost = await page.evaluate(() => state.inventory.find(g => g.name === 'Pre-lit Christmas Trees').variants[0].unitCost);
  check('Apply writes the noted price as the stored cost', cost === 299.99, String(cost));
  const cards = await page.locator('#sup-cards').innerText();
  check('Linked items card counts the one-off', /1 one-off/.test(sq(cards)), sq(cards));

  // 3. Update… reopens prefilled in one-off mode; a price change shows on the row and the inventory chip
  await page.locator('#sup-body tr', { hasText: 'Pre-lit Christmas Trees' }).first().locator('button:has-text("Update…")').click();
  const pre = await page.evaluate(() => ({ mode: linkModal.mode, src: document.getElementById('lk-src').value, price: document.getElementById('lk-price').value, active: document.querySelector('#lk-modes .pill.active').textContent }));
  check('Update… reopens in one-off mode with the saved values', pre.mode === 'manual' && pre.src === 'Amazon' && pre.price === '299.99' && /Somewhere else/.test(pre.active), JSON.stringify(pre));
  await page.fill('#lk-price', '279.00');
  await page.click('.modal-footer button:has-text("Save link")');
  await page.waitForTimeout(200);
  const row2 = await page.locator('#sup-body tr', { hasText: 'Pre-lit Christmas Trees' }).first().innerText();
  check('new noted price compares against the stored cost (−$20.99, −7.0%)', /\$279\.00/.test(row2) && /−\$20\.99/.test(row2) && /-7\.0%/.test(row2), sq(row2).slice(0, 220));
  await page.click('.nav button:has-text("Inventory")');
  const chip = await page.locator('tr', { hasText: 'Pre-lit Christmas Trees' }).first().locator('.live-chip').innerText();
  check('inventory chip shows the one-off price', /\$279\.00/.test(chip), chip);
  const chipTitle = await page.locator('tr', { hasText: 'Pre-lit Christmas Trees' }).first().locator('.live-chip').getAttribute('title');
  check('chip explains the source', /Amazon price you noted/.test(chipTitle), chipTitle);
  await page.screenshot({ path: path.join(OUT, '03-inventory-one-off-chip.png') });

  // 4. Removing a store leaves one-off links alone; store links still work
  await page.click('.nav button:has-text("Supplier prices")');
  await page.locator('#sup-body tr', { hasText: 'C7 Bulbs' }).first().locator('button:has-text("Link…")').click();
  await page.click('#lk-modes .pill:has-text("S4 Lights")');
  await page.fill('#lk-q', 'c7 led opaque bulb e12 warm white');
  await page.waitForTimeout(200);
  await page.locator('.lk-row').first().click();
  await page.click('.modal-footer button:has-text("Save link")');
  await page.waitForTimeout(200);
  await page.locator('.store-row', { hasText: 'S4 Lights' }).locator('button[title^="Remove"]').click();
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => ({ stores: state.supplier.stores.length, c7: state.supplier.map['c2v1'], tree: state.supplier.map['c17v1'] && state.supplier.map['c17v1'].manual }));
  check('removing S4 drops its item link but keeps the Amazon one-off', after.stores === 1 && !after.c7 && after.tree === true, JSON.stringify(after));

  // 5. Cloud round trip on a fresh device
  const ctx2 = await browser.newContext({ httpCredentials: CREDS, viewport: { width: 1440, height: 900 } });
  const fresh = await ctx2.newPage();
  fresh.on('dialog', async (d) => { await d.accept(); });
  await fresh.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await fresh.waitForFunction(() => { try { return !!state.divisions.christmas.supplier.map['c17v1']; } catch (e) { return false; } }, null, { timeout: 20000 });
  const rt = await fresh.evaluate(() => ({ m: state.divisions.christmas.supplier.map['c17v1'], cost: state.divisions.christmas.inventory.find(g => g.name === 'Pre-lit Christmas Trees').variants[0].unitCost }));
  check('one-off link and cost sync to another device', rt.m && rt.m.manual && rt.m.price === 279 && rt.cost === 299.99, JSON.stringify(rt));

  // 6. Mobile
  const mob = await ctx2.newPage();
  await mob.setViewportSize({ width: 390, height: 844 });
  await mob.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await settled(mob);
  await mob.click('.div-btn:has-text("Christmas")');
  await mob.waitForTimeout(300);
  await mob.click('.nav button:has-text("Supplier prices")');
  await mob.waitForTimeout(600);
  await mob.locator('#sup-body tr', { hasText: 'Pre-lit Christmas Trees' }).first().locator('button:has-text("Update…")').click();
  await mob.waitForTimeout(200);
  await mob.screenshot({ path: path.join(OUT, '04-one-off-modal-mobile.png') });

  await browser.close();
  const failed = results.filter(r => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error('E2E crashed:', e); process.exit(2); });
