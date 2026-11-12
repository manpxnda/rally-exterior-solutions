// Partial reservations top up once stock arrives; installed projects hidden by default. ~40 s.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const RALLY = 'http://localhost:3111';
const OUT = process.env.OUT || path.join(process.env.HOME, 'Desktop', 'Rally staging screenshots', 'reserve-topup');
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

  // Stock short: 100 warm-white C9 bulbs on hand, plan needs 500
  await page.evaluate(() => { state.inventory[0].variants[0].qty = 100; save(); render(); });
  await page.click('.nav button:has-text("Projects")');
  await page.click('button:has-text("+ New project")');
  await page.fill('#pn-name', 'Doyle Test');
  await page.fill('#pni-c1-c1v1', '500');
  await page.fill('#pni-c4-c4v1', '300');
  await page.click('.modal-footer button:has-text("Add project")');
  await page.waitForTimeout(200);
  await page.locator('#proj-list .tbl-wrap', { hasText: 'Doyle Test' }).locator('button:has-text("Reserve")').last().click();
  await page.waitForTimeout(200);
  await page.click('#reserve-form button:has-text("Reserve available + flag rest")');
  await page.waitForTimeout(300);
  await page.click('.nav button:has-text("Projects")');
  let card = sq(await page.locator('#proj-list .tbl-wrap', { hasText: 'Doyle Test' }).innerText());
  check('partial reservation when stock is short reads "needs ordering"', /100 reserved · 400 needs ordering/.test(card) && /1 item needs ordering/.test(card) && !/re-reserve/.test(card), card.slice(0, 200));

  // Stock arrives (Receive order) → the card now says the rest is in stock and offers one-click top-up
  await page.click('.nav button:has-text("Inventory")');
  await page.click('button:has-text("Receive order")');
  await page.fill('#pni-c1-c1v1', '1000');
  await page.click('.modal-footer button:has-text("Add to stock")');
  await page.waitForTimeout(200);
  await page.click('.nav button:has-text("Projects")');
  card = sq(await page.locator('#proj-list .tbl-wrap', { hasText: 'Doyle Test' }).innerText());
  check('after stock arrives the card says "in stock — re-reserve" and shows Reserve available', /100 reserved · 400 in stock — re-reserve/.test(card) && /1 item in stock — re-reserve/.test(card) && /Reserve available/.test(card), card.slice(0, 220));
  await page.screenshot({ path: path.join(OUT, '01-card-re-reserve.png') });

  // Reserve form prefills the NEEDED quantity, not the partial one
  await page.locator('#proj-list .tbl-wrap', { hasText: 'Doyle Test' }).locator('button:has-text("Reserve")').last().click();
  await page.waitForTimeout(200);
  const prefill = await page.inputValue('#res-c1-c1v1');
  check('Reserve form prefills 500 (the plan), not 100 (the partial reservation)', prefill === '500', prefill);
  await page.click('.nav button:has-text("Projects")');

  // One-click top-up
  await page.locator('#proj-list .tbl-wrap', { hasText: 'Doyle Test' }).locator('button:has-text("Reserve available")').click();
  await page.waitForTimeout(300);
  const st = await page.evaluate(() => { const p = state.projects.find(p => p.name === 'Doyle Test'); const v = state.inventory[0].variants[0]; return { status: p.status, got: p.items.find(i => i.variantId === 'c1v1').qty, reserved: v.reserved, qty: v.qty }; });
  check('Reserve available tops the reservation up to 500 and marks the project reserved', st.status === 'reserved' && st.got === 500 && st.reserved === 500 && st.qty === 1100, JSON.stringify(st));
  check('top-up confirms what it did', dialogs.some(m => /Reserved from stock:\n.*\+400/.test(m) && /Everything the plan needs is now reserved/.test(m)), dialogs.slice(-1)[0]);
  card = sq(await page.locator('#proj-list .tbl-wrap', { hasText: 'Doyle Test' }).innerText());
  check('card shows Reserved with no re-reserve badge', /Reserved/.test(card) && !/re-reserve/.test(card) && !/needs ordering/.test(card));

  // Hide installed: default hidden, toggle shows, remembered per device
  await page.click('.nav button:has-text("Confirm install")');
  await page.waitForTimeout(200);
  await page.click('button:has-text("Confirm & close job")');
  await page.waitForTimeout(300);
  await page.click('.nav button:has-text("Projects")');
  let list = sq(await page.locator('#proj-list').innerText());
  const tog = sq(await page.locator('#proj-sort-bar').innerText());
  check('installed project hidden by default, toggle shows the count', !/Doyle Test/.test(list) && /No open projects — 1 installed project is hidden/.test(list) && /Show installed 1/.test(tog), tog);
  await page.click('#proj-sort-bar button:has-text("Show installed")');
  await page.waitForTimeout(200);
  list = sq(await page.locator('#proj-list').innerText());
  check('Show installed reveals it with its Installed badge', /Doyle Test/.test(list) && /Installed/.test(list));
  await page.screenshot({ path: path.join(OUT, '02-show-installed.png') });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await settled(page);
  await page.click('.div-btn:has-text("Christmas")');
  await page.click('.nav button:has-text("Projects")');
  await page.waitForTimeout(200);
  const remembered = sq(await page.locator('#proj-sort-bar').innerText());
  check('the choice is remembered on this device', /Hide installed/.test(remembered), remembered);
  await page.click('#proj-sort-bar button:has-text("Hide installed")');
  list = sq(await page.locator('#proj-list').innerText());
  check('Hide installed hides it again', !/Doyle Test/.test(list));

  await browser.close();
  const failed = results.filter(r => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error('E2E crashed:', e); process.exit(2); });
