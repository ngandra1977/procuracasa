const ts=require('typescript'),fs=require('fs'),path=require('path');
const sources=new Map();
const norm=s=>s.replace(/\s+/g,' ').trim();
function add(s){const key=norm(s);if(key && /[a-zA-ZÀ-ÿ]/.test(key)&&!key.startsWith('http')&&!key.startsWith('/')&&!key.startsWith('@/')&&key.length>1)sources.set(key,key);}
function scan(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory()){if(!['api','gestao','i18n'].includes(entry.name))scan(p);}else if(/\.tsx?$/.test(p)){const root=ts.createSourceFile(p,fs.readFileSync(p,'utf8'),ts.ScriptTarget.Latest,true,p.endsWith('x')?ts.ScriptKind.TSX:ts.ScriptKind.TS);function visit(n){if(ts.isJsxText(n)||ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n))add(n.text);
if(ts.isTemplateExpression(n)){let pattern=n.head.text;n.templateSpans.forEach((span,i)=>{pattern+='{'+i+'}'+span.literal.text;});if(pattern.replace(/\{\d+\}/g,'').trim().length>=6)add(pattern);}ts.forEachChild(n,visit);}visit(root);}}}
scan('src');
for(const p of JSON.parse(fs.readFileSync('scripts/property-translation-sources.json','utf8'))){add(p.title);add(p.description);for(const para of p.description.split(/\n+/))add(para);}
for(const text of ['Idioma','Tradução automática. A versão portuguesa prevalece.','Descrição original em português.','Página não encontrada','Português','English','Français','Deutsch','Español'])add(text);
fs.writeFileSync('scripts/translation-sources.json',JSON.stringify(Object.fromEntries(sources),null,2));
console.log(sources.size+' translation source strings, '+[...sources.keys()].join('').length+' characters');
