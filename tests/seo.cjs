const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
function readModule(file, imports = {}) {
 const module = {exports:{}};
 new Function('module','exports','require',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(module,module.exports,(name)=>imports[name]);
 return module.exports;
}
const properties = readModule('src/lib/properties.ts');
const {propertySeo,jsonLd} = readModule('src/lib/seo.ts',{'./properties':properties});
const p={id:'test',property_type:'Apartamento',bedrooms:2,operation:'Venda',location:'Matosinhos',area:90,price:250000,status:'disponivel'};
assert.match(propertySeo(p).title,/Apartamento T2 à venda em Matosinhos/);
assert.match(propertySeo({...p,property_type:'Terreno'}).title,/Terreno à venda/);
assert.doesNotMatch(propertySeo({...p,property_type:'Terreno'}).title,/T2/);
assert.match(propertySeo({...p,status:'reservado'}).description,/^Reservado/);
assert.match(propertySeo({...p,operation:'Arrendamento'}).title,/para arrendar/);
assert.equal(propertySeo(p).url,'https://www.procuracasa.pt/imoveis/test');
const hostile={title:'</script><script>alert(1)</script>'};
assert.ok(!jsonLd(hostile).includes('<'));
assert.deepEqual(JSON.parse(jsonLd(hostile)),hostile);
console.log('OK: property metadata, operations, status, canonical and safe JSON-LD.');
