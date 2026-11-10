// Kits category: seeded once into the permanent division with Minleon dealer prices + links. ~30 s.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const RALLY = 'http://localhost:3111';
const OUT = process.env.OUT || path.join(process.env.HOME, 'Desktop', 'Rally staging screenshots', 'kits');
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

  // 1. Existing (pre-kits) state migrates: kits added once, flag set, other items untouched
  await page.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.clear();
    const st = { divisions: { permanent: { settings: { taxPct: 0, shippingEst: 20 }, inventory: [
      { id: 'g2', name: 'Pebble Track Channel', cat: 'track', unit: '3ft section', taxPct: null, shippingEst: null, variants: [{ id: 'g2v1', label: 'White', qty: 40, reserved: 0, reorderAt: 5, unitCost: 3.08, bundleQty: 100, bundleCost: 308 }] } ],
      projects: [], installs: [], wasteLog: [], supplier: { stores: ['https://minleonpermanentlighting.com'], map: {}, dealers: {} } },
      christmas: { settings: {}, inventory: [], projects: [], installs: [], wasteLog: [], supplier: { stores: [], map: {}, dealers: {} } } }, nextId: 500 };
    localStorage.setItem('rally_v3', JSON.stringify(st));
    localStorage.setItem('rally_v3_meta', JSON.stringify({ updatedAt: 1, device: 'legacy' }));
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await settled(page);
  const m = await page.evaluate(() => { const d = state.divisions.permanent; return { cats: CATS.map(c => c.id), groups: d.inventory.map(g => g.id), k1: d.inventory.find(g => g.id === 'k1'), k2: d.inventory.find(g => g.id === 'k2'), flag: d.settings.kitsSeeded, links: Object.keys(d.supplier.map).filter(k => /^k/.test(k)).length, xmasKits: state.divisions.christmas.inventory.some(g => g.cat === 'kits') }; });
  check('Kits is the first permanent category; Christmas untouched', m.cats[0] === 'kits' && !m.xmasKits, m.cats.join(','));
  check('two kit groups seeded ahead of existing items, flag set', m.groups.join(',') === 'k1,k2,g2' && m.flag === true, m.groups.join(','));
  check('12 variants each (4 sizes × 3 controllers), unit "kit"', m.k1.variants.length === 12 && m.k2.variants.length === 12 && m.k1.unit === 'kit' && m.k1.variants[0].label === '100 ft · WEC Mini' && m.k1.variants[11].label === '400 ft · Control Box (WEC Mini)', m.k1.variants.map(v => v.label).join(' | '));
  check('costs are the Minleon dealer prices (100 ft WEC Mini aluminum $1,072.72; track-only $1,055.12)', m.k1.variants[0].unitCost === 1072.72 && m.k2.variants[0].unitCost === 1055.12 && m.k1.variants[11].unitCost === 3360.72, m.k1.variants[0].unitCost + ' / ' + m.k2.variants[0].unitCost);
  check('all 24 variants linked to Minleon (white variant, pack 1)', m.links === 24);

  // 2. Deleting a kit group sticks (no re-seed)
  await page.evaluate(() => { state.inventory = state.inventory.filter(g => g.id !== 'k2'); save(); });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await settled(page);
  const after = await page.evaluate(() => state.divisions.permanent.inventory.map(g => g.id).join(','));
  check('a deleted kit group stays deleted on reload', after === 'k1,g2', after);
  check('kits seed muted so zero stock does not raise reorder alerts', await page.evaluate(() => state.divisions.permanent.inventory.find(g => g.id === 'k1').variants.every(v => v.muteReorder) && document.getElementById('inv-cards').innerText.includes('0')));
  // clearing the flag re-seeds the missing group (the way to get a deleted kit back)
  await page.evaluate(() => { state.settings.kitsSeeded = false; save(); });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await settled(page);
  const back = await page.evaluate(() => state.divisions.permanent.inventory.map(g => g.id).join(','));
  check('clearing settings.kitsSeeded brings a deleted kit group back', back === 'k1,k2,g2', back);

  // 3. Inventory tab renders the category; supplier tab shows them linked + priced
  await page.click('.div-btn:has-text("Permanent")');
  await page.waitForTimeout(200);
  const inv = sq(await page.locator('#inv-body').innerText());
  check('Inventory tab shows the Kits category with both groups', /KITS/.test(inv) && /Aluminum Track Pebble Kit 12 variants/.test(inv) && /Pebble Channel Track-Only Kit 12 variants/.test(inv), inv.slice(0, 160));
  await page.click('tr.g-row:has-text("Aluminum Track Pebble Kit")');
  const rows = await page.locator('tr.v-row').allInnerTexts();
  check('expanded kit rows show size · controller and the cost', rows.length === 12 && /100 ft · WEC Mini/.test(rows[0]) && /\$1,?072\.72/.test(rows[0]), sq(rows[0]));
  await page.screenshot({ path: path.join(OUT, '01-kits-inventory.png'), fullPage: false });
  await page.click('.nav button:has-text("Minleon prices")');
  await page.waitForFunction(() => { try { return !!catalogs['minleonpermanentlighting.com']; } catch (e) { return false; } }, null, { timeout: 60000 });
  await page.waitForTimeout(300);
  const krow = sq(await page.locator('#sup-body tr', { hasText: '400 ft · Dual Port WEC' }).first().innerText());
  check('price tab: kit row linked to the Minleon kit product with a list price', /Aluminum Track RGBW\+2 Pebble Kits/.test(krow) && /\$3,799\.00/.test(krow) && !/suggested/.test(krow), krow.slice(0, 220));
  const cards = sq(await page.locator('#sup-cards').innerText());
  check('linked-items count includes the 24 kits', /LINKED ITEMS 24 \/ 25/.test(cards), cards.slice(0, 120));
  await page.screenshot({ path: path.join(OUT, '02-kits-price-tab.png'), fullPage: false });

  await browser.close();
  const failed = results.filter(r => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error('E2E crashed:', e); process.exit(2); });
