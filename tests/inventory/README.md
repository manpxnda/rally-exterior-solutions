# Inventory app — browser regression tests

End-to-end checks for the private inventory app (`public/inventory/index.html`, source of truth
`../Rally Inventory/rally_lighting_inventory.html`). They drive a local production build with
Playwright through the Google Chrome already installed on the Mac, and they talk to the REAL
supplier stores (Minleon, Christmas Light Contractors USA, S4 Lights) while logged out, so no
account pricing is involved and nothing is purchased.

| Script | Covers | Last run |
| --- | --- | --- |
| `fake-upstash.js` | in-memory Upstash REST stand-in used by the runs below | — |
| `multi-store.e2e.js` | migration from the one-store shape, Permanent tab with a captured Minleon price, Christmas pre-connected to both suppliers, cross-store link search, pack maths, add / refuse / remove stores, a real bookmarklet run on CLC USA routed to the Christmas division only, same-device tab sync, fresh-device cloud pull, cron over every store, old-format Minleon capture routing | 20/20, 2026-10-08 (Redis) |
| `job-sheet.e2e.js` | printable job sheets: buttons on project card / Reserve / Confirm, sheet content (materials, packs, shortfalls, notes, sign-off), print media hides the app, Print all reserved = one page per project | 15/15, 2026-10-08 |
| `kits.e2e.js` | Kits category seeded once into the permanent division (24 Minleon kit variants with dealer prices + links, muted alerts), flag semantics, Inventory + price tab rendering | 12/12, 2026-11-10 |
| `reserve-topup.e2e.js` | partial reservation when stock is short → stock arrives → card says "in stock — re-reserve", Reserve form prefills the plan quantity, one-click "Reserve available" tops up; installed projects hidden by default with a remembered toggle | 10/10, 2026-11-12 |
| `order-panel.e2e.js` | "Order to fulfill open projects" panel: totals across open jobs vs on hand, pack rounding, tax-inclusive cost, Copy list, collapse, reacts to Receive order and Confirm install | 9/9, 2026-11-12 |
| `mobile-buy.e2e.js` | phone layout at 390px (no page-wide horizontal scroll on every tab, trimmed inventory columns, 16px inputs, scrollable nav) + Buy links on inventory / Reorder / order-panel rows (store product page + variant, one-off URL, none when unlinked); desktop keeps all columns | 19/19, 2026-11-13 |
| `install-detail.e2e.js` | close-out records per-line usage; Reports customer name → detail modal (edit date/footage/notes/lines, add a line, live totals, stock adjusted by deltas), legacy install fallback (reserved qty, adjust-stock off), Reopen job | 14/14, 2026-11-13 |
| `link-modal.e2e.js` | store-chooser pills, store-scoped search, one-off (Amazon) links: form, save, row, Apply, Update…, inventory chip, store removal leaves one-offs alone, cloud round trip, mobile screenshot | 16/16, 2026-10-08 (Redis) |

Not preserved: the first Christmas suite (migration from the pre-division flat state, Christmas
project → reserve → confirm install → reports, Receive order, Socket-wire reorder alert at seed,
CSV export across divisions, the 409 "outdated tab" server guard). It predates the multi-store
change and its assertions used the old single-store shape; re-create those checks against
`state.supplier.stores` / `dealers[host]` if that area changes again.

## Running

```bash
cd "Rally Website"
npm run build
npm i --no-save playwright@1.49.1          # not a site dependency; node_modules is gitignored

# No database needed: fake-upstash.js is an in-memory stand-in for the Upstash REST API.
# (A real Upstash database also works — point U/T at it and set REDIS_KEY_PREFIX=test-…:
# so the run never touches the real rally: keys.)
node tests/inventory/fake-upstash.js 3112 &
U=http://localhost:3112; T=anything

DASHBOARD_USER=test DASHBOARD_PASSWORD=test UPSTASH_REDIS_REST_URL="$U" UPSTASH_REDIS_REST_TOKEN="$T" \
REDIS_KEY_PREFIX="test-$(date +%s):" CRON_SECRET=testsecret npx next start -p 3111 &

# Pre-warm the three catalogs (first fetch of each takes a few seconds):
for st in https://minleonpermanentlighting.com https://www.christmaslightcontractorsusa.com https://s4lights.com; do
  curl -s -u test:test "http://localhost:3111/inventory/api/supplier?store=$st" -o /dev/null -w "$st → %{http_code}\n"
done

node tests/inventory/multi-store.e2e.js     # ~3 min (runs the bookmarklet on the live CLC USA site)
node tests/inventory/link-modal.e2e.js      # ~1 min
node tests/inventory/job-sheet.e2e.js       # ~30 s
node tests/inventory/kits.e2e.js            # ~30 s
node tests/inventory/reserve-topup.e2e.js   # ~40 s
node tests/inventory/order-panel.e2e.js     # ~30 s
node tests/inventory/mobile-buy.e2e.js      # ~40 s
node tests/inventory/install-detail.e2e.js  # ~40 s

# Afterwards: stop both servers (the fake store lives in memory, nothing to clean up).
pkill -f "next start -p 3111"; pkill -f fake-upstash.js
```

Screenshots land in `~/Desktop/Rally staging screenshots/<suite>/` (override with `OUT=…`).
Each suite exits non-zero if any check fails and writes `results.json` next to the screenshots.

Notes
- Restart the server on a fresh `REDIS_KEY_PREFIX` between runs — the suites assume an empty
  cloud store (a fresh device must pull without a "keep which copy?" prompt).
- `multi-store.e2e.js` evaluates the generated bookmarklet inside a real
  `christmaslightcontractorsusa.com` tab; if that store changes its theme the "capture" checks are
  the ones to look at first.
- The Christmas seed (18 groups / 29 variants) and the Minleon suggestion table live in the app
  file itself; the pack-reader cases ("25 Lights (30 ft) (7ct)" = 175 units, "Case of 500" …) are
  covered inside the suites via the link-modal "Works out to" assertions.
