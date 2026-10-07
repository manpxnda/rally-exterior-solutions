// End-to-end test: two divisions with MULTIPLE supplier stores per division, against the local
// server and the REAL stores (Minleon, Christmas Light Contractors USA, S4 Lights), all logged out.
// See README.md for how to start the server. Last run 20/20 on 2026-09-28.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const RALLY = 'http://localhost:3111';
const OUT = process.env.OUT || path.join(process.env.HOME, 'Desktop', 'Rally staging screenshots', 'christmas-suppliers');
fs.mkdirSync(OUT, { recursive: true });
const CREDS = { username: 'test', password: 'test' };

const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail ? ' — ' + detail : '')); };
const sq = (t) => String(t || '').replace(/\s+/g, ' ').trim();
const settled = (p) => p.waitForFunction(() => /Synced|Cloud|Offline|failed/.test(document.getElementById('sync-pill').textContent), null, { timeout: 30000 });

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const ctx = await browser.newContext({ httpCredentials: CREDS, viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
  page.on('dialog', async (d) => { console.log('dialog:', d.type(), d.message().slice(0, 110)); await d.accept(); });

  // ── 1. Migration from the single-store shape (what the app wrote on 2026-09-28 before multi-store)
  await page.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.clear();
    const singleStore = {
      divisions: {
        permanent: { settings: { taxPct: 7, shippingEst: 0 }, inventory: [
          { id: 'g2', name: 'Pebble Track Channel', cat: 'track', unit: '3ft section', taxPct: null, shippingEst: null,
            variants: [{ id: 'g2v1', label: 'White', qty: 40, reserved: 0, reorderAt: 5, unitCost: 3.15, bundleQty: 100, bundleCost: 315 }] } ],
          projects: [], installs: [], wasteLog: [],
          supplier: { store: 'https://minleonpermanentlighting.com', map: { g2v1: { vid: 46634368696487, pack: 100 } }, dealer: { at: Date.now(), cid: '1', loggedIn: true, n: 1, prices: { 46634368696487: [342.32, 1, 2] } } } },
        christmas: { settings: { taxPct: 7, shippingEst: 0 }, inventory: undefined, projects: [], installs: [], wasteLog: [], supplier: { store: null, map: {}, dealer: null } },
      }, nextId: 401 };
    localStorage.setItem('rally_v3', JSON.stringify(singleStore));
    localStorage.setItem('rally_v3_meta', JSON.stringify({ updatedAt: 1, device: 'legacy' }));
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await settled(page);
  await page.waitForTimeout(500);
  const mig = await page.evaluate(() => ({
    permStores: state.divisions.permanent.supplier.stores, permDealers: Object.keys(state.divisions.permanent.supplier.dealers),
    permLink: state.divisions.permanent.supplier.map.g2v1, xmasStores: state.divisions.christmas.supplier.stores, xmasGroups: state.divisions.christmas.inventory.length,
    hasOldKeys: 'store' in state.divisions.permanent.supplier || 'dealer' in state.divisions.permanent.supplier,
  }));
  check('single-store shape migrates: permanent keeps Minleon + its capture keyed by host; christmas gets both suppliers', mig.permStores.length === 1 && /minleon/.test(mig.permStores[0]) && mig.permDealers[0] === 'minleonpermanentlighting.com' && mig.xmasStores.length === 2 && /christmaslightcontractorsusa/.test(mig.xmasStores[0]) && /s4lights/.test(mig.xmasStores[1]) && mig.xmasGroups === 18 && !mig.hasOldKeys, JSON.stringify(mig));

  // ── 2. Permanent tab still works with the host-keyed capture
  await page.click('.nav button:has-text("Minleon prices")');
  await page.waitForSelector('#sup-body table');
  const prow = await page.locator('#sup-body tr', { hasText: 'Pebble Track Channel' }).first().innerText();
  check('permanent: migrated link resolves its store, math unchanged (+$0.27 / +8.7%)', /Minleon/.test(prow) && /\+\$0\.27/.test(prow) && /8\.7%/.test(prow), sq(prow).slice(0, 240));
  const pstores = await page.locator('#sup-alerts').innerText();
  check('permanent: store row shows account prices loaded + discount', /Minleon/.test(pstores) && /account prices/.test(pstores) && /12% off list/.test(pstores), sq(pstores).slice(0, 200));

  // ── 3. Christmas tab: both stores pre-connected, catalogs load
  await page.click('.div-btn:has-text("Christmas Lighting")');
  await page.waitForTimeout(300);
  await page.click('.nav button:has-text("Supplier prices")');
  await page.waitForFunction(() => { try { return !!(catalogs['christmaslightcontractorsusa.com'] && catalogs['s4lights.com']); } catch (e) { return false; } }, null, { timeout: 120000 });
  await page.waitForTimeout(400);
  const xs = await page.evaluate(() => ({ nav: document.getElementById('nav-supplier').textContent, title: document.getElementById('sup-title').textContent, rows: document.getElementById('sup-alerts').innerText.replace(/\s+/g, ' '), clc: catalogs['christmaslightcontractorsusa.com'].productCount, s4: catalogs['s4lights.com'].productCount, cards: document.getElementById('sup-cards').innerText.replace(/\s+/g, ' ') }));
  check('christmas: both stores connected and loaded (CLC USA 254, S4 433 products)', /Supplier prices/.test(xs.nav) && /Christmas Light Contractors USA/.test(xs.rows) && /S4 Lights/.test(xs.rows) && xs.clc === 254 && xs.s4 === 433 && /Stores\s*2/i.test(xs.cards), JSON.stringify(xs).slice(0, 300));
  await page.screenshot({ path: path.join(OUT, '01-christmas-two-stores.png'), fullPage: false });

  // ── 4. Link across stores: C9 warm white → CLC USA case of 500; C7 → S4 single bulb
  await page.locator('#sup-body tr', { hasText: 'Warm white' }).first().locator('button:has-text("Link…")').click();
  await page.fill('#lk-q', 'c9 minleon v2 faceted led sun warm white case of 500');
  await page.waitForTimeout(250);
  const r1 = await page.locator('.lk-row').allInnerTexts();
  check('search spans both stores and labels results by store', r1.length >= 1 && /Christmas Light Contractors USA/.test(r1[0]) && /Case of 500/.test(r1[0]), r1.length + ' results · ' + sq(r1[0]).slice(0, 120));
  await page.locator('.lk-row').first().click();
  const sel1 = await page.locator('#lk-selected').innerText();
  await page.click('.modal-footer button:has-text("Save link")');
  await page.waitForTimeout(200);
  const lk1 = await page.evaluate(() => state.supplier.map['c1v1']);
  check('C9 warm white linked to CLC USA case of 500 (pack 500, host stored)', lk1 && lk1.pack === 500 && lk1.host === 'christmaslightcontractorsusa.com', JSON.stringify(lk1) + ' | ' + sq(sel1));
  await page.locator('#sup-body tr', { hasText: 'C7 Bulbs' }).first().locator('button:has-text("Link…")').click();
  await page.fill('#lk-q', 'c7 led opaque bulb e12 warm white');
  await page.waitForTimeout(250);
  const r2 = await page.locator('.lk-row').allInnerTexts();
  check('S4 result found for C7', r2.some(t => /S4 Lights/.test(t) && /Warm White/.test(t)), r2.length + ' results');
  const s4Row = page.locator('.lk-row', { hasText: 'S4 Lights' }).filter({ hasText: 'Warm White' }).first();
  await s4Row.click();
  await page.click('.modal-footer button:has-text("Save link")');
  await page.waitForTimeout(200);
  const lk2 = await page.evaluate(() => state.supplier.map['c2v1']);
  check('C7 warm white linked to an S4 Lights single bulb (pack 1)', lk2 && lk2.pack === 1 && lk2.host === 's4lights.com', JSON.stringify(lk2));
  const c9row = await page.locator('#sup-body tr', { hasText: 'Warm white' }).first().innerText();
  const c7row = await page.locator('#sup-body tr', { hasText: 'C7 Bulbs' }).first().innerText();
  check('rows show each store name and per-bulb list price', /Christmas Light Contractors USA/.test(c9row) && /\$0\.6[0-9]/.test(c9row) && /S4 Lights/.test(c7row) && /\$0\.89/.test(c7row), sq(c9row).slice(0, 160) + ' || ' + sq(c7row).slice(0, 120));
  await page.locator('#sup-body tr', { hasText: 'Warm white' }).first().locator('button:has-text("Apply")').click();
  const ap = await page.evaluate(() => { const v = state.inventory[0].variants[0]; return [v.unitCost, v.bundleCost]; });
  check('Apply writes per-bulb + per-case cost (302.35 ÷ 500 → 0.6047 / 302.35)', Math.abs(ap[0] - 0.6047) < 0.0001 && Math.abs(ap[1] - 302.35) < 0.01, JSON.stringify(ap));
  await page.screenshot({ path: path.join(OUT, '02-christmas-linked.png'), fullPage: true });

  // ── 5. Add / refuse / remove stores
  await page.click('button:has-text("+ Add store")');
  await page.fill('#store-input', 'example.com');
  await page.click('.modal-footer button:has-text("Connect")');
  await page.waitForFunction(() => /Shopify-based/.test((document.getElementById('store-error') || {}).innerText || ''), null, { timeout: 30000 });
  check('non-Shopify store refused inside the add-store modal', true);
  await page.fill('#store-input', 'minleonpermanentlighting.com');
  await page.click('.modal-footer button:has-text("Connect")');
  await page.waitForFunction(() => state.supplier.stores.length === 3, null, { timeout: 45000 });
  const three = await page.evaluate(() => state.supplier.stores.map(o => o.replace(/^https:\/\//, '')));
  check('third store added (Minleon) → christmas now buys from 3 stores', three.length === 3 && /minleon/.test(three[2]), JSON.stringify(three));
  await page.locator('.store-row', { hasText: 'Minleon' }).locator('button[title^="Remove"]').click();
  await page.waitForTimeout(300);
  const two = await page.evaluate(() => ({ n: state.supplier.stores.length, links: Object.keys(state.supplier.map).length }));
  check('removing a store keeps the other stores and their links', two.n === 2 && two.links === 2, JSON.stringify(two));

  // ── 6. Bookmarklet for CLC USA runs on the real site and routes to christmas only
  await page.locator('.store-row', { hasText: 'Christmas Light Contractors USA' }).locator('button:has-text("Sync my prices")').click();
  const href = await page.locator('a.bm-link').getAttribute('href');
  check('bookmark generated for the CLC USA host', decodeURIComponent(href).includes('"www.christmaslightcontractorsusa.com"'), href.length + ' chars');
  await page.click('.modal-footer button:has-text("Done")');
  const clc = await ctx.newPage();
  await clc.goto('https://www.christmaslightcontractorsusa.com/collections/all', { waitUntil: 'domcontentloaded' });
  const code = decodeURIComponent(href.replace(/^javascript:/, ''));
  const popupPromise = ctx.waitForEvent('page');
  await clc.evaluate((c) => { (0, eval)(c); }, code);
  const popup = await popupPromise;
  popup.on('pageerror', (e) => console.log('POPUP PAGE ERROR:', e.message));
  await popup.waitForURL(/supplier-import/, { timeout: 15000 });
  const putP = popup.waitForResponse(r => r.request().method() === 'PUT' && /\/inventory\/api(\?|$)/.test(r.url()) && r.status() === 200, { timeout: 180000 });
  await popup.waitForFunction(() => { try { const d = state.divisions.christmas.supplier.dealers['christmaslightcontractorsusa.com']; return !!(d && d.n > 100); } catch (e) { return false; } }, null, { timeout: 180000 });
  const cap = await popup.evaluate(() => ({ c: state.divisions.christmas.supplier.dealers['christmaslightcontractorsusa.com'].n, loggedIn: state.divisions.christmas.supplier.dealers['christmaslightcontractorsusa.com'].loggedIn, permKeys: Object.keys(state.divisions.permanent.supplier.dealers), s4: !!state.divisions.christmas.supplier.dealers['s4lights.com'], active: activeDiv }));
  check('CLC USA capture stored under its host for christmas only (permanent untouched, S4 untouched)', cap.c > 1500 && cap.loggedIn === false && cap.permKeys.length === 1 && cap.permKeys[0] === 'minleonpermanentlighting.com' && !cap.s4 && cap.active === 'christmas', JSON.stringify(cap));
  await putP;
  const adopted = await page.evaluate(() => !!state.divisions.christmas.supplier.dealers['christmaslightcontractorsusa.com']);
  check('original tab adopted the capture (storage event)', adopted);
  await popup.close(); await clc.close();
  await page.waitForTimeout(500);
  const rowAfter = await page.locator('#sup-alerts').innerText();
  check('store row flags the logged-out capture', /synced while not logged in/.test(rowAfter), sq(rowAfter).slice(0, 200));
  await page.screenshot({ path: path.join(OUT, '03-christmas-after-capture.png'), fullPage: false });

  // ── 7. Fresh device pulls everything; cron helper sees all stores
  const ctx2 = await browser.newContext({ httpCredentials: CREDS, viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const fresh = await ctx2.newPage();
  let dialogs = 0;
  fresh.on('dialog', async (d) => { dialogs++; await d.accept(); });
  fresh.on('pageerror', (e) => console.log('FRESH PAGE ERROR:', e.message));
  await fresh.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await fresh.waitForFunction(() => { try { return state.divisions.permanent.inventory[0].variants[0].qty === 40; } catch (e) { return false; } }, null, { timeout: 20000 });
  const rt = await fresh.evaluate(() => ({ xmasStores: state.divisions.christmas.supplier.stores.length, xmasLinks: Object.keys(state.divisions.christmas.supplier.map).length, xmasDealers: Object.keys(state.divisions.christmas.supplier.dealers), cost: state.divisions.christmas.inventory[0].variants[0].unitCost }));
  check('fresh device: stores, links, captures and costs all come down from the cloud, no prompt', dialogs === 0 && rt.xmasStores === 2 && rt.xmasLinks === 2 && rt.xmasDealers[0] === 'christmaslightcontractorsusa.com' && Math.abs(rt.cost - 0.6047) < 0.0001, JSON.stringify(rt));
  const cron = await fresh.evaluate(async () => { const r = await fetch('/api/cron/supplier-catalogs', { headers: { authorization: 'Bearer testsecret' } }); return { status: r.status, body: await r.json() }; });
  check('cron refreshes every connected store (Minleon + CLC USA + S4)', cron.status === 200 && cron.body.ok && Object.keys(cron.body.stores).map(k => k.replace(/^www\./, '')).sort().join(',') === 'christmaslightcontractorsusa.com,minleonpermanentlighting.com,s4lights.com' && Object.values(cron.body.stores).every(v => v.ok), JSON.stringify(cron.body).slice(0, 220));

  // ── 8. Old-format (Minleon) paste routes to the permanent division only
  await fresh.click('.nav button:has-text("Minleon prices")');
  await fresh.click('button:has-text("Paste captured prices")');
  await fresh.fill('#paste-prices', JSON.stringify({ type: 'rally-minleon-prices', at: Date.now(), cid: '1', loggedIn: true, n: 1, prices: { 46634368696487: [300, 1, 2] } }));
  await fresh.click('.modal-footer button:has-text("Import")');
  await fresh.waitForTimeout(300);
  const lp = await fresh.evaluate(() => ({ perm: state.divisions.permanent.supplier.dealers['minleonpermanentlighting.com'].prices[46634368696487][0], xmasHasMinleon: !!state.divisions.christmas.supplier.dealers['minleonpermanentlighting.com'] }));
  check('old-format Minleon capture lands in permanent only (christmas no longer buys from Minleon)', lp.perm === 300 && !lp.xmasHasMinleon, JSON.stringify(lp));

  // ── 9. Mobile
  const mob = await ctx2.newPage();
  await mob.setViewportSize({ width: 390, height: 844 });
  await mob.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await settled(mob);
  await mob.click('.div-btn:has-text("Christmas")');
  await mob.waitForTimeout(300);
  await mob.click('.nav button:has-text("Supplier prices")');
  await mob.waitForTimeout(600);
  await mob.screenshot({ path: path.join(OUT, '04-christmas-suppliers-mobile.png'), fullPage: true });

  await browser.close();
  const failed = results.filter(r => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error('E2E crashed:', e); process.exit(2); });
