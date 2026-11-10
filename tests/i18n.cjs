const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript'),React=require('react');
function read(file,imports={}){const m={exports:{}};new Function('require','module','exports',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText)((name)=>name in imports?imports[name]:require(name),m,m.exports);return m.exports;}
const shared=read('src/lib/i18n/shared.tsx');
const {localizedPath,localizedUrl,localizeTree,translator}=shared;
assert.equal(localizedPath('/imoveis/abc','en'),'/en/imoveis/abc');
assert.equal(localizedPath('/fr/ferramentas?x=1#custos','de'),'/de/ferramentas?x=1#custos');
assert.equal(localizedPath('/es','pt'),'/');
assert.equal(localizedPath('/api/contact','fr'),'/api/contact');
assert.equal(localizedPath('/brand.svg','en'),'/brand.svg');
assert.equal(localizedUrl('https://www.procuracasa.pt/en/imoveis/abc','fr'),'https://www.procuracasa.pt/fr/imoveis/abc');
for(const lang of ['en','fr','de','es']){
 const dictionary=JSON.parse(fs.readFileSync('src/lib/i18n/'+lang+'.json'));
 const t=translator(lang,dictionary);
 for(const [source,translated] of Object.entries(dictionary)){
  assert.ok(!/^(?:\.{1,2}\/|\/|#|@\/)/.test(source.trim()),'Technical path leaked into public dictionary: '+source);
  assert.ok(!/^\S*\/\S*$/.test(source.trim()),'Module specifier or route leaked into public dictionary: '+source);
  assert.ok(!/^(?:\.{1,2}\/|\/|#|@\/)/.test(translated.trim()),'Translated technical path leaked into public dictionary: '+translated);
 }
 const unsafe=translator(lang,{'./properties':'./Eigenschaften','#contacto':'#contact','/imoveis':'/properties'});
 assert.equal(unsafe('./properties'),'./properties');assert.equal(unsafe('#contacto'),'#contacto');assert.equal(unsafe('/imoveis'),'/imoveis');
 assert.notEqual(t('Zona de interesse'),'Zona de interesse');
 assert.notEqual(t('Tradução automática. A versão portuguesa prevalece.'),'Tradução automática. A versão portuguesa prevalece.');
 assert.equal(t('Carla Morais'),'Carla Morais');
 for(const [source,translated] of Object.entries(dictionary)) if(source.includes('| Procuracasa')) assert.ok(translated.endsWith('| Procuracasa'),'Brand must not be translated');
 const option=localizeTree(React.createElement('option',null,'Moradia'),lang,dictionary);
 assert.equal(option.props.value,'Moradia','Translated options must submit the Portuguese enum');
 assert.equal(option.props.children,t('Moradia'));
 const explicit=localizeTree(React.createElement('option',{value:'permanent'},'Habitação própria e permanente'),lang,dictionary);
 assert.equal(explicit.props.value,'permanent');
 const handler=()=>{};
 const input=localizeTree(React.createElement('input',{value:'200000',name:'principal',onChange:handler,placeholder:'Sem limite'}),lang,dictionary);
 assert.equal(input.props.value,'200000');assert.equal(input.props.name,'principal');assert.equal(input.props.onChange,handler);
 const anchor=localizeTree(React.createElement('a',{href:'/ferramentas/custos-compra'},'Calcular custos'),lang,dictionary);
 assert.equal(anchor.props.href,'/'+lang+'/ferramentas/custos-compra');
 const script=localizeTree(React.createElement('script',{type:'application/ld+json',dangerouslySetInnerHTML:{__html:JSON.stringify({'@type':'BreadcrumbList',item:'https://www.procuracasa.pt/imoveis/abc',name:'Imóveis'})}}),lang,dictionary);
 const data=JSON.parse(script.props.dangerouslySetInnerHTML.__html);assert.equal(data['@type'],'BreadcrumbList');assert.equal(data.item,'https://www.procuracasa.pt/'+lang+'/imoveis/abc');
 const current=JSON.parse(fs.readFileSync('scripts/property-translation-sources.json'));
 for(const p of current){assert.ok(dictionary[shared.normalize(p.title)],'Missing property title');assert.ok(dictionary[shared.normalize(p.description)],'Missing property description');}
}
const proxy=read('src/proxy.ts',{'@/lib/i18n/shared':shared,'next/server':{NextResponse:class {constructor(body,opts){this.status=opts.status;}static next(opts){return {kind:'next',opts};}static rewrite(url,opts){return {kind:'rewrite',url,opts};}static redirect(url,status){return {kind:'redirect',url,status};}}}}).proxy;
function req(path,lang='de'){const nextUrl=new URL('https://www.procuracasa.pt'+path);nextUrl.clone=()=>new URL(nextUrl);return {nextUrl,headers:new Headers({'x-site-locale':lang})};}
let r=proxy(req('/fr/ferramentas/custos-compra'));assert.equal(r.kind,'next');assert.equal(r.opts.request.headers.get('x-site-locale'),'fr');
r=proxy(req('/'));assert.equal(r.opts.request.headers.get('x-site-locale'),'pt','Ignore spoofed locale');
assert.equal(proxy(req('/en/gestao')).status,404);assert.equal(proxy(req('/es/api/contact')).status,404);
r=proxy(req('/pt/ferramentas'));assert.equal(r.status,308);assert.equal(r.url.pathname,'/ferramentas');
// Real Search Console examples: recover the intended page without a chain,
// preserve its language and query, and leave all unrelated routes alone.
const reported404s=[
 '/de/Checkliste','/de/Eigenschaften','/en/properties','/Checklist','/properties',
 '/de/properties','/en/ferramentas/properties','/de/ferramentas/Checkliste',
 '/fr/imoveis/Checklist','/de/imoveis/properties','/en/Checklist','/fr/propriétés',
 '/propriétés','/de/Checklist','/fr/Checklist','/fr/properties','/de/imoveis/Checklist',
 '/fr/imoveis/properties','/en/ferramentas/Checklist','/fr/imoveis/propriétés',
 '/en/imoveis/Checklist','/de/ferramentas/Checklist','/es/ferramentas/properties',
 '/de/ferramentas/Eigenschaften','/de/ferramentas/properties'
];
for(const path of reported404s){
 const language=path.match(/^\/(en|fr|de|es)\//)?.[1]||'pt';
 const catalogue=/properties|propriétés|Eigenschaften/.test(path);
 const expected=localizedPath(catalogue?'/':'/ferramentas/checklist-visita',language);
 const result=proxy(req(encodeURI(path)+'?source=facebook'));
 assert.equal(result.status,308,path);
 assert.equal(result.url.pathname,expected,path);
 assert.equal(result.url.hash,catalogue?'#imoveis':'',path);
 assert.equal(result.url.search,'?source=facebook',path);
 assert.equal(proxy(req(result.url.pathname+result.url.search)).kind,'next','Redirect must resolve in one hop');
}
for(const path of ['/gestao/properties','/it/properties','/unknown','/imoveis/not-a-real-id','/de/ferramentas/custos-compra','/de/imoveis/388331b1-888b-48fe-a172-2d2f7d3243f5']) assert.equal(proxy(req(path)).kind,'next',path);
assert.equal(proxy(req('/pt/imoveis/properties')).url.pathname,'/');
console.log('OK: four languages, links, enum values, controls, property copy, JSON-LD and locale routing.');
console.log('OK: no serialized module paths and all 25 reported crawl aliases recover in one hop.');
