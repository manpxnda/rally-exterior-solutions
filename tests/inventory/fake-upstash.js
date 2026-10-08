// Minimal in-memory stand-in for the Upstash Redis REST API, so the inventory
// tests can run with no database at all. Speaks just what @upstash/redis sends
// for our code: single commands (POST /, body = ["GET","key"]) and pipelines
// (POST /pipeline, body = [["SET",k,v],["LPUSH",k,v],["LTRIM",k,0,8]]).
// Supports GET, SET, DEL, LPUSH, LTRIM, LRANGE, SCAN, PING. Not for production.
//
//   node tests/inventory/fake-upstash.js 3112 &
//   UPSTASH_REDIS_REST_URL=http://localhost:3112 UPSTASH_REDIS_REST_TOKEN=x npx next start -p 3111
const http = require('http');
const port = Number(process.argv[2] || 3112);
const store = new Map(); // key -> string | string[]

function run(cmd) {
  const [name, ...a] = cmd;
  switch (String(name).toUpperCase()) {
    case 'PING': return 'PONG';
    case 'GET': { const v = store.get(a[0]); return typeof v === 'string' ? v : null; }
    case 'SET': store.set(a[0], String(a[1])); return 'OK';
    case 'DEL': { let n = 0; for (const k of a) if (store.delete(k)) n++; return n; }
    case 'LPUSH': { const l = Array.isArray(store.get(a[0])) ? store.get(a[0]) : []; for (const v of a.slice(1)) l.unshift(String(v)); store.set(a[0], l); return l.length; }
    case 'LTRIM': { const l = Array.isArray(store.get(a[0])) ? store.get(a[0]) : []; const start = Number(a[1]); let end = Number(a[2]); if (end < 0) end = l.length + end; store.set(a[0], l.slice(start, end + 1)); return 'OK'; }
    case 'LRANGE': { const l = Array.isArray(store.get(a[0])) ? store.get(a[0]) : []; let end = Number(a[2]); if (end < 0) end = l.length + end; return l.slice(Number(a[1]), end + 1); }
    case 'LLEN': { const l = store.get(a[0]); return Array.isArray(l) ? l.length : 0; }
    case 'SCAN': { let match = null; for (let i = 1; i < a.length; i += 2) if (String(a[i]).toUpperCase() === 'MATCH') match = a[i + 1]; const re = match ? new RegExp('^' + String(match).replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$') : null; return ['0', [...store.keys()].filter(k => !re || re.test(k))]; }
    default: throw new Error('unsupported command ' + name);
  }
}

http.createServer((req, res) => {
  let body = '';
  req.on('data', c => { body += c; });
  req.on('end', () => {
    if (!/^Bearer /.test(req.headers.authorization || '')) { res.writeHead(401); return res.end('{"error":"Unauthorized"}'); }
    try {
      const data = JSON.parse(body || '[]');
      const out = req.url.startsWith('/pipeline') || req.url.startsWith('/multi-exec')
        ? data.map(c => { try { return { result: run(c) }; } catch (e) { return { error: e.message }; } })
        : { result: run(data) };
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(out));
    } catch (e) {
      res.writeHead(400, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
  });
}).listen(port, () => console.log('fake upstash on http://localhost:' + port));
