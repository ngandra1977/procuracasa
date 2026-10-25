import json,pathlib
copy={
'en':{'O seu lugar.':'Your place.','Entre a cidade':'Between the city','e o':'and the','mar.':'sea.','Casas com lugar':'A home that fits','na sua vida.':'your life.','IMÓVEIS · GRANDE PORTO':'REAL ESTATE · GREATER PORTO','IMÓVEIS · GRANDE PORTO · LITORAL':'REAL ESTATE · GREATER PORTO · COAST','AS NOSSAS ZONAS DE REFERÊNCIA':'OUR MAIN AREAS','de':'of'},
'fr':{'O seu lugar.':'Votre chez-vous.','Entre a cidade':'Entre la ville','e o':'et la','mar.':'mer.','Casas com lugar':'Un chez-vous','na sua vida.':'à votre image.','IMÓVEIS · GRANDE PORTO':'IMMOBILIER · GRAND PORTO','IMÓVEIS · GRANDE PORTO · LITORAL':'IMMOBILIER · GRAND PORTO · LITTORAL','AS NOSSAS ZONAS DE REFERÊNCIA':'NOS PRINCIPAUX SECTEURS','de':'sur'},
'de':{'O seu lugar.':'Ihr Zuhause.','Entre a cidade':'Zwischen Stadt','e o':'und','mar.':'Meer.','Casas com lugar':'Ein Zuhause','na sua vida.':'für Ihr Leben.','IMÓVEIS · GRANDE PORTO':'IMMOBILIEN · GROSSRAUM PORTO','IMÓVEIS · GRANDE PORTO · LITORAL':'IMMOBILIEN · GROSSRAUM PORTO · KÜSTE','AS NOSSAS ZONAS DE REFERÊNCIA':'UNSERE SCHWERPUNKTGEBIETE','Vamos conversar ↗':'Sprechen wir ↗','Ferramentas e guias':'Rechner und Ratgeber','de':'von'},
'es':{'O seu lugar.':'Tu lugar.','Entre a cidade':'Entre la ciudad','e o':'y el','mar.':'mar.','Casas com lugar':'Un hogar','na sua vida.':'a tu medida.','IMÓVEIS · GRANDE PORTO':'INMUEBLES · GRAN OPORTO','IMÓVEIS · GRANDE PORTO · LITORAL':'INMUEBLES · GRAN OPORTO · COSTA','AS NOSSAS ZONAS DE REFERÊNCIA':'NUESTRAS ZONAS PRINCIPALES','de':'de'}
}
for lang,overrides in copy.items():
 p=pathlib.Path('src/lib/i18n')/(lang+'.json');d=json.loads(p.read_text())
 for k,v in list(d.items()):
  if '| Procuracasa' in k:d[k]=v.rsplit('|',1)[0].strip()+' | Procuracasa'
 d.update(overrides)
 p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
print('Reviewed brand, headline grammar and navigation in four languages.')
