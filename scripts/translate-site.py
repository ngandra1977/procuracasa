"""Generate versioned translations of public website copy; never runs in requests."""
import json,re,urllib.request,urllib.parse,time,concurrent.futures,pathlib
src=json.loads(pathlib.Path('scripts/translation-sources.json').read_text())
items=list(src.items()); batches=[];batch=[];length=0
for key,val in items:
 if batch and length+len(val)>3200:batches.append(batch);batch=[];length=0
 batch.append((key,val));length+=len(val)+15
if batch:batches.append(batch)
root=pathlib.Path('src/lib/i18n');root.mkdir(exist_ok=True)
def translate(lang):
 out={};target=root/(lang+'.json')
 if target.exists():out=json.loads(target.read_text())
 for i,b in enumerate(batches):
  if all(k in out for k,v in b):continue
  q='\n'.join('⟦%04d⟧\n%s'%(j,v) for j,(k,v) in enumerate(b))
  url='https://translate.googleapis.com/translate_a/single?'+urllib.parse.urlencode({'client':'gtx','sl':'pt','tl':lang,'dt':'t','q':q})
  for attempt in range(3):
   try:
    with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=25) as r:data=json.load(r)
    text=''.join(x[0] for x in data[0] if x[0])
    parts=re.split(r'⟦\s*(\d{4})\s*⟧',text)
    parsed={int(parts[j]):parts[j+1].strip() for j in range(1,len(parts)-1,2)}
    if len(parsed)!=len(b):raise ValueError('Batch markers missing')
    for j,(key,val) in enumerate(b):out[key]=parsed[j]
    target.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
    print(lang,i+1,'/',len(batches),flush=True);break
   except Exception as e:
    if attempt==2:raise
    time.sleep(1+attempt)
 # Retain proper names, classifications and brand labels.
 for proper in ['Vila do Conde','Matosinhos','Leça da Palmeira','Foz do Douro','Lordelo do Ouro','Nevogilde','Massarelos','Porto','Procuracasa','procuracasa','IAD','ITP','IMT','VPT','TAN','TAEG','MTIC','AMI']:
  if proper in src:out[proper]=proper
 target.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
 return lang,len(out)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for result in pool.map(translate,['en','fr','de','es']):print('DONE',result,flush=True)
