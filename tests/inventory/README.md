# Inventory app — browser regression tests

End-to-end checks for the private inventory app (`public/inventory/index.html`, source of truth
`../Rally Inventory/rally_lighting_inventory.html`). They drive a local production build with
Playwright through the Google Chrome already installed on the Mac, and they talk to the REAL
supplier stores (Minleon, Christmas Light Contractors USA, S4 Lights) while logged out, so no
account pricing is involved and nothing is purchased.

| Script | Covers | Last run |
| --- | --- | --- |
| `multi-store.e2e.js` | migration from the one-store shape, Permanent tab with a captured Minleon price, Christmas pre-connected to both suppliers, cross-store link search, pack maths, add / refuse / remove stores, a real bookmarklet run on CLC USA routed to the Christmas division only, same-device tab sync, fresh-device cloud pull, cron over every store, old-format Minleon capture routing | 20/20, 2026-09-28 |
| `link-modal.e2e.js` | store-chooser pills, store-scoped search, one-off (Amazon) links: form, save, row, Apply, Update…, inventory chip, store removal leaves one-offs alone, cloud round trip, mobile screenshot | 16/16, 2026-09-28 |

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

# Blob token for the test store (never commit it):
vercel env pull /tmp/rally.env --environment=development --yes
TOKEN=$(grep '^BLOB_READ_WRITE_TOKEN=' /tmp/rally.env | cut -d= -f2- | tr -d '"')

# Local server on ISOLATED blob prefixes so production data (inventory/, minleon/, supplier/) is never touched:
DASHBOARD_USER=test DASHBOARD_PASSWORD=test BLOB_READ_WRITE_TOKEN="$TOKEN" \
INVENTORY_BLOB_PREFIX="inventory-test-$(date +%s)/" SUPPLIER_BLOB_PREFIX="supplier-test-$(date +%s)/" \
CRON_SECRET=testsecret npx next start -p 3111 &

# Pre-warm the three catalogs (first fetch of each takes a few seconds):
for st in https://minleonpermanentlighting.com https://www.christmaslightcontractorsusa.com https://s4lights.com; do
  curl -s -u test:test "http://localhost:3111/inventory/api/supplier?store=$st" -o /dev/null -w "$st → %{http_code}\n"
done

node tests/inventory/multi-store.e2e.js     # ~3 min (runs the bookmarklet on the live CLC USA site)
node tests/inventory/link-modal.e2e.js      # ~1 min

# Afterwards: stop the server and delete the test-only blobs.
pkill -f "next start -p 3111"
BLOB_READ_WRITE_TOKEN="$TOKEN" node -e '
const { list, del } = require("@vercel/blob");
(async () => { for (const prefix of ["inventory-test", "supplier-test"]) {
  const { blobs } = await list({ prefix, limit: 1000 }); if (blobs.length) await del(blobs.map(b => b.url));
  console.log(prefix, "→ deleted", blobs.length); } })();'
rm /tmp/rally.env
```

Screenshots land in `~/Desktop/Rally staging screenshots/<suite>/` (override with `OUT=…`).
Each suite exits non-zero if any check fails and writes `results.json` next to the screenshots.

Notes
- Restart the server on a fresh `INVENTORY_BLOB_PREFIX` between runs — the suites assume an empty
  cloud store (a fresh device must pull without a "keep which copy?" prompt).
- `multi-store.e2e.js` evaluates the generated bookmarklet inside a real
  `christmaslightcontractorsusa.com` tab; if that store changes its theme the "capture" checks are
  the ones to look at first.
- The Christmas seed (18 groups / 29 variants) and the Minleon suggestion table live in the app
  file itself; the pack-reader cases ("25 Lights (30 ft) (7ct)" = 175 units, "Case of 500" …) are
  covered inside the suites via the link-modal "Works out to" assertions.
