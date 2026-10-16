// Exercita as fronteiras de autenticação e publicação sem serviços externos.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
let cookie;
const modules = new Map();
function load(relative) {
  const filename = path.resolve(relative);
  if (modules.has(filename)) return modules.get(filename).exports;
  const module = { exports: {} };
  modules.set(filename, module);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const localRequire = (name) => name === 'next/headers' ? { cookies: async () => ({ get: () => cookie ? { value: cookie } : undefined }) } : name.startsWith('@/') ? load(`src/${name.slice(2)}.ts`) : name.startsWith('.') ? load(path.resolve(path.dirname(filename), `${name}.ts`)) : require(name);
  new Function('require', 'module', 'exports', source)(localRequire, module, module.exports);
  return module.exports;
}
(async () => {
  process.env.ADMIN_PASSWORD = 'test-password-at-least-16-characters';
  const auth = load('src/lib/auth.ts');
  assert.equal(await auth.authorized(), false);
  cookie = auth.session();
  assert.equal(await auth.authorized(), true);
  cookie += 'tampered';
  assert.equal(await auth.authorized(), false);
  cookie = '0.invalid';
  assert.equal(await auth.authorized(), false);
  cookie = auth.session();
  process.env.ADMIN_PASSWORD += '-changed';
  assert.equal(await auth.authorized(), false);
  cookie = undefined;
  const properties = load('src/app/api/admin/properties/route.ts');
  assert.equal((await properties.GET()).status, 401);
  const upload = load('src/app/api/admin/upload/route.ts');
  assert.equal((await upload.POST(new Request('https://example.test/api/admin/upload', { method: 'POST' }))).status, 401);
  cookie = auth.session();
  const request = body => new Request('https://example.test/api/admin/properties', { method: 'POST', headers: { origin: 'https://example.test', 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const listing = { title: 'Teste', location: 'Matosinhos', operation: 'Venda', status: 'disponivel', price: 100000, bedrooms: 2, area: 80, photos: [], ami: '', agency: '' };
  assert.equal((await properties.POST(request(listing))).status, 400, 'Publicação sem foto e mediadora deve falhar');
  assert.equal((await properties.POST(new Request('https://example.test/api/admin/properties', { method: 'POST', headers: { origin: 'https://attacker.test' }, body: '{}' }))).status, 403);
  const rate = load('src/lib/rate-limit.ts');
  const r = new Request('https://example.test');
  assert.equal(rate.rateLimited(r, 'test', 2), false);
  assert.equal(rate.rateLimited(r, 'test', 2), false);
  assert.equal(rate.rateLimited(r, 'test', 2), true);
  const contact = load('src/app/api/contact/route.ts');
  assert.equal((await contact.POST(new Request('https://example.test/api/contact', { method: 'POST', headers: {origin:'https://example.test'}, body: JSON.stringify({name:'Teste', email:'invalid', consent:true, message:''}) }))).status, 400);
  console.log('OK: sessões, adulteração, expiração, revogação, acesso privado, publicação, origem, limite de tentativas e validação de contacto.');
})().catch(error => { console.error(error); process.exitCode = 1; });
