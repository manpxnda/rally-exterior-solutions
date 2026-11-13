// Phone layout + Buy links. ~40 s.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const RALLY = 'http://localhost:3111';
const OUT = process.env.OUT || path.join(process.env.HOME, 'Desktop', 'Rally staging screenshots', 'mobile-buy');
fs.mkdirSync(OUT, { recursive: true });
const CREDS = { username: 'test', password: 'test' };
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail ? ' — ' + detail : '')); };
const sq = (t) => String(t || '').replace(/\s+/g, ' ').trim();
const settled = (p) => p.waitForFunction(() => /Synced|Cloud|Offline|failed/.test(document.getElementById('sync-pill').textContent), null, { timeout: 30000 });
const noHScroll = (p) => p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const ctx = await browser.newContext({ httpCredentials: CREDS, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
  page.on('dialog', async (d) => { await d.accept(); });
  await page.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await settled(page);
  await page.click('.div-btn:has-text("Permanent")');
  await page.waitForFunction(() => { try { return !!catalogs['minleonpermanentlighting.com']; } catch (e) { return false; } }, null, { timeout: 60000 });
  await page.evaluate(() => confirmAllSuggestions());
  await page.waitForTimeout(300);

  // Layout: no page-level horizontal scroll on the main tabs
  for (const tab of ['Inventory', 'Reorder', 'Projects', 'Reserve', 'Confirm install', 'Reports', 'Minleon prices']) {
    await page.click(`.nav button:has-text("${tab}")`);
    await page.waitForTimeout(200);
    check(`phone: ${tab} tab has no page-wide horizontal scroll`, await noHScroll(page), await page.evaluate(() => document.documentElement.scrollWidth + ' vs ' + window.innerWidth));
  }
  await page.click('.nav button:has-text("Inventory")');
  await page.waitForTimeout(200);
  const hidden = await page.evaluate(() => { const ths = [...document.querySelector('#inv-body table').querySelectorAll('th')]; return ths.map(th => th.textContent.trim() + ':' + (getComputedStyle(th).display === 'none' ? 'hidden' : 'shown')).join(','); });
  check('phone: inventory table shows Item/Stock/Avail/Unit cost and hides the rest', /Item:shown/.test(hidden) && /Unit:hidden/.test(hidden) && /Stock:shown/.test(hidden) && /Reserved:hidden/.test(hidden) && /Avail:shown/.test(hidden) && /Reorder at:hidden/.test(hidden) && /Unit cost:shown/.test(hidden) && /Bundle:hidden/.test(hidden) && /Est. reorder:hidden/.test(hidden) && /Status:hidden/.test(hidden), hidden);
  const fs16 = await page.evaluate(() => getComputedStyle(document.querySelector('.qty-input')).fontSize);
  check('phone: number inputs are 16px (no iOS zoom)', fs16 === '16px', fs16);
  const navScroll = await page.evaluate(() => { const n = document.querySelector('.nav'); return { wrap: getComputedStyle(n).flexWrap, overflow: getComputedStyle(n).overflowX }; });
  check('phone: section nav is one scrollable row', navScroll.wrap === 'nowrap' && navScroll.overflow === 'auto', JSON.stringify(navScroll));
  await page.screenshot({ path: path.join(OUT, '01-phone-inventory.png'), fullPage: false });

  // Buy links (kits are linked out of the box; confirmed suggestions link the rest)
  await page.click('tr.g-row:has-text("Aluminum Track Pebble Kit")');
  const kitHref = await page.locator('tr.v-row', { hasText: '100 ft · WEC Mini' }).locator('a.buy-link').getAttribute('href');
  check('kit variant row has a Buy link to its Minleon product page + variant', /^https:\/\/minleonpermanentlighting\.com\/products\/aluminum-track-rgbw-2-pebble-kits\?variant=51354602602663$/.test(kitHref || ''), kitHref);
  const tgt = await page.locator('tr.v-row', { hasText: '100 ft · WEC Mini' }).locator('a.buy-link').getAttribute('target');
  check('Buy link opens in a new tab', tgt === '_blank');
  const single = await page.locator('tr.i-row', { hasText: '3M VHB Tape' }).locator('a.buy-link').getAttribute('href');
  check('single-item row (confirmed suggestion) has a Buy link', /3m-vhb-2-sided-permanent-bonding-tape\?variant=47351560339623/.test(single || ''), single);
  const unlinked = await page.locator('tr.i-row', { hasText: 'Lite Clip Strips' }).locator('a.buy-link').count();
  check('an unlinked item shows no Buy link', unlinked === 0);
  await page.screenshot({ path: path.join(OUT, '02-phone-buy-links.png'), fullPage: false });

  // Reorder tab + order panel carry the link too
  await page.evaluate(() => { const g = state.inventory.find(g => g.name === '3M VHB Tape'); g.variants[0].qty = 0; g.variants[0].reorderAt = 2; save(); render(); });
  await page.click('.nav button:has-text("Reorder")');
  await page.waitForTimeout(200);
  const reorderBuy = await page.locator('.reorder-item', { hasText: '3M VHB Tape' }).locator('a.buy-link').count();
  check('Reorder tab rows have a Buy link', reorderBuy === 1);
  await page.screenshot({ path: path.join(OUT, '03-phone-reorder.png'), fullPage: false });
  await page.click('.nav button:has-text("Projects")');
  await page.click('button:has-text("+ New project")');
  await page.fill('#pn-name', 'Phone test');
  await page.fill('#pni-g5-g5v1', '3');
  await page.screenshot({ path: path.join(OUT, '04-phone-modal.png'), fullPage: false });
  await page.click('.modal-footer button:has-text("Add project")');
  await page.waitForTimeout(300);
  const panelBuy = await page.locator('#proj-order a.buy-link').count();
  check('Order-to-fulfill panel rows have a Buy link', panelBuy >= 1, panelBuy + ' links');
  check('phone: Projects tab with panel has no page-wide horizontal scroll', await noHScroll(page));
  await page.screenshot({ path: path.join(OUT, '05-phone-projects.png'), fullPage: false });

  // One-off link → Buy goes to the noted URL
  await page.click('.div-btn:has-text("Christmas")');
  await page.waitForTimeout(300);
  await page.evaluate(() => { sup().map['c17v1'] = { manual: true, source: 'Amazon', name: 'Tree', url: 'https://www.amazon.com/dp/B0EXAMPLE', price: 299.99, pack: 1, at: Date.now() }; save(); render(); });
  await page.click('.nav button:has-text("Inventory")');
  await page.waitForTimeout(200);
  const amz = await page.locator('tr.i-row', { hasText: 'Pre-lit Christmas Trees' }).locator('a.buy-link').getAttribute('href');
  check('one-off (Amazon) item: Buy goes to the noted URL', amz === 'https://www.amazon.com/dp/B0EXAMPLE', amz);

  // Desktop unchanged: all columns shown
  const desk = await ctx.browser().newContext({ httpCredentials: CREDS, viewport: { width: 1440, height: 900 } });
  const d = await desk.newPage();
  await d.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await settled(d);
  await d.click('.div-btn:has-text("Permanent")');
  await d.waitForTimeout(200);
  const deskCols = await d.evaluate(() => [...document.querySelector('#inv-body table').querySelectorAll('th')].filter(th => getComputedStyle(th).display !== 'none').length);
  check('desktop still shows all 11 inventory columns', deskCols === 11, String(deskCols));
  await d.screenshot({ path: path.join(OUT, '06-desktop-buy-links.png'), fullPage: false });

  await browser.close();
  const failed = results.filter(r => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error('E2E crashed:', e); process.exit(2); });
