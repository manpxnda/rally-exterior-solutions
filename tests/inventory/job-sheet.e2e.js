// Printable job sheets: buttons, content, print region, multi-project printing. ~30 s.
// Start the server as in README.md (fake-upstash is fine). Last run 2026-10-08.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const RALLY = 'http://localhost:3111';
const OUT = process.env.OUT || path.join(process.env.HOME, 'Desktop', 'Rally staging screenshots', 'job-sheets');
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
  page.on('dialog', async (d) => { console.log('dialog:', d.message().slice(0, 100)); await d.accept(); });
  await page.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await settled(page);
  await page.click('.div-btn:has-text("Christmas Lighting")');
  await page.waitForTimeout(300);

  // No reserved projects yet → button exists, alerts
  await page.click('.nav button:has-text("Projects")');
  const hasPrintAll = await page.locator('button:has-text("Print all reserved")').count();
  check('Projects toolbar has "Print all reserved"', hasPrintAll === 1);

  // Create + reserve two projects (one short on wire)
  for (const [name, bulbs, wire] of [['Miller Residence', 500, 300], ['Oak Street Church', 1200, 3500]]) {
    await page.click('button:has-text("+ New project")');
    await page.fill('#pn-name', name);
    await page.fill('#pn-addr', '12 Elm St, Wheeling WV');
    await page.fill('#pn-date', '2026-11-14');
    await page.fill('#pn-footage', '180');
    await page.fill('#pn-notes', 'Gate code 4411. Dog in yard.');
    await page.fill('#pni-c1-c1v1', String(bulbs));
    await page.fill('#pni-c4-c4v1', String(wire));
    await page.click('.modal-footer button:has-text("Add project")');
    await page.waitForTimeout(200);
  }
  const noSheetYet = await page.locator('#proj-list button:has-text("Job sheet")').count();
  check('unreserved projects show no Job sheet button', noSheetYet === 0);
  for (const name of ['Miller Residence', 'Oak Street Church']) {
    await page.locator('#proj-list .tbl-wrap', { hasText: name }).locator('button:has-text("Reserve")').click();
    await page.waitForTimeout(200);
    await page.click('#reserve-form button:has-text("Reserve"), #reserve-form button:has-text("Save reservation")');
    await page.waitForTimeout(300);
    await page.click('.nav button:has-text("Projects")');
  }
  const sheetBtns = await page.locator('#proj-list button:has-text("Job sheet")').count();
  check('reserved projects show a Job sheet button', sheetBtns === 2, sheetBtns + ' buttons');

  // Open one sheet
  await page.locator('#proj-list .tbl-wrap', { hasText: 'Oak Street Church' }).locator('button:has-text("Job sheet")').click();
  await page.waitForTimeout(200);
  const txt = sq(await page.locator('.js-preview').innerText());
  check('sheet header: project, address, date, footage, division', /Oak Street Church/.test(txt) && /12 Elm St/.test(txt) && /November 14, 2026/.test(txt) && /180 ft/.test(txt) && /Christmas Lighting · Job sheet/.test(txt), txt.slice(0, 200));
  check('sheet lists reserved materials with unit + pack counts', /C9 Bulbs Warm white 1200 bulbs/.test(txt) && /3 × 500/.test(txt) && /Socket Wire C9 2700 ft\b/.test(txt), txt.slice(200, 420));
  check('sheet flags the shortfall (3500 ft needed, 2700 reserved → 800 short)', /still short/i.test(txt) && /800 ft still needed/.test(txt), (txt.match(/still short.{0,120}/i) || [''])[0]);
  check('sheet carries project notes and sign-off lines', /Gate code 4411/.test(txt) && /Loaded by/.test(txt) && /Installed by/.test(txt) && /Actual footage/.test(txt));
  const boxes = await page.locator('.js-preview .js-box').count();
  check('tick boxes per material line', boxes === 2, boxes + ' boxes');
  const blanks = await page.locator('.js-preview thead th.js-blank').allInnerTexts();
  check('blank Loaded / Used / Returned columns', blanks.join(',').toLowerCase() === 'loaded,used,returned', blanks.join(','));
  await page.screenshot({ path: path.join(OUT, '01-job-sheet-preview.png') });

  // Print: body class toggles, print region holds the sheet, only the sheet is visible in print media
  await page.evaluate(() => { window.__printed = 0; window.print = () => { window.__printed++; }; });
  await page.click('.modal-footer button:has-text("Print")');
  const printed = await page.evaluate(() => window.__printed);
  check('Print button calls window.print()', printed === 1);
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.body.classList.add('printing-sheet'));
  const vis = await page.evaluate(() => ({ sheet: getComputedStyle(document.getElementById('job-sheet')).display, topbar: getComputedStyle(document.querySelector('.topbar')).display, container: getComputedStyle(document.querySelector('.container')).display, modal: getComputedStyle(document.getElementById('modal-root')).display, pages: document.querySelectorAll('#job-sheet .js-page').length }));
  check('print media shows only the sheet (app chrome + modal hidden)', vis.sheet === 'block' && vis.topbar === 'none' && vis.container === 'none' && vis.modal === 'none' && vis.pages === 1, JSON.stringify(vis));
  await page.screenshot({ path: path.join(OUT, '02-job-sheet-print-media.png'), fullPage: true });
  await page.emulateMedia({ media: 'screen' });
  await page.evaluate(() => document.body.classList.remove('printing-sheet'));
  await page.click('.modal-footer button:has-text("Close")');

  // Print all reserved → one page per project
  await page.click('button:has-text("Print all reserved")');
  await page.waitForTimeout(200);
  const pages = await page.locator('.js-preview .js-page').count();
  const titles = await page.locator('.js-preview .js-title').allInnerTexts();
  check('Print all reserved renders one page per reserved project', pages === 2 && titles.includes('Miller Residence') && titles.includes('Oak Street Church'), JSON.stringify(titles));
  await page.click('.modal-footer button:has-text("Close")');

  // Reserve + Confirm tabs carry the button; installed projects lose it
  await page.click('.nav button:has-text("Reserve")');
  await page.waitForTimeout(200);
  check('Reserve tab shows Job sheet for the selected project', (await page.locator('#res-project-meta button:has-text("Job sheet")').count()) === 1);
  await page.click('.nav button:has-text("Confirm install")');
  await page.waitForTimeout(200);
  check('Confirm tab shows Job sheet for the selected project', (await page.locator('#conf-project-meta button:has-text("Job sheet")').count()) === 1);
  await page.click('button:has-text("Confirm & close job")');
  await page.waitForTimeout(300);
  await page.click('.nav button:has-text("Projects")');
  const after = await page.locator('#proj-list button:has-text("Job sheet")').count();
  check('an installed project no longer offers a Job sheet', after === 1, after + ' buttons remain');

  // Mobile preview
  const mob = await ctx.newPage();
  await mob.setViewportSize({ width: 390, height: 844 });
  await mob.goto(RALLY + '/inventory', { waitUntil: 'domcontentloaded' });
  await settled(mob);
  await mob.click('.div-btn:has-text("Christmas")');
  await mob.waitForTimeout(300);
  await mob.click('.nav button:has-text("Projects")');
  await mob.locator('#proj-list button:has-text("Job sheet")').first().click();
  await mob.waitForTimeout(200);
  await mob.screenshot({ path: path.join(OUT, '03-job-sheet-mobile.png') });

  await browser.close();
  const failed = results.filter(r => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error('E2E crashed:', e); process.exit(2); });
