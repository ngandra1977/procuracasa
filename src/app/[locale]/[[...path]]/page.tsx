import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/shared";
import Home, { generateMetadata as homeMetadata } from "@/app/page";
import Tools, { generateMetadata as toolsMetadata } from "@/app/ferramentas/page";
import Costs, { generateMetadata as costsMetadata } from "@/app/ferramentas/custos-compra/page";
import Mortgage, { generateMetadata as mortgageMetadata } from "@/app/ferramentas/prestacao-credito/page";
import Documents, { generateMetadata as documentsMetadata } from "@/app/ferramentas/documentos/page";
import Visit, { generateMetadata as visitMetadata } from "@/app/ferramentas/checklist-visita/page";
import Insurance, { generateMetadata as insuranceMetadata } from "@/app/ferramentas/seguros/page";
import Privacy, { generateMetadata as privacyMetadata } from "@/app/privacidade/page";
import Terms, { generateMetadata as termsMetadata } from "@/app/termos/page";
import Property, { generateMetadata as propertyMetadata } from "@/app/imoveis/[id]/page";
const pages = {
  "": [Home, homeMetadata],
  "ferramentas": [Tools, toolsMetadata],
  "ferramentas/custos-compra": [Costs, costsMetadata],
  "ferramentas/prestacao-credito": [Mortgage, mortgageMetadata],
  "ferramentas/documentos": [Documents, documentsMetadata],
  "ferramentas/checklist-visita": [Visit, visitMetadata],
  "ferramentas/seguros": [Insurance, insuranceMetadata],
  "privacidade": [Privacy, privacyMetadata],
  "termos": [Terms, termsMetadata],
} as const;
type Params = { params: Promise<{ locale: string; path?: string[] }> };
async function resolve(params: Params["params"]) {
  const { locale, path = [] } = await params;
  if (!isLocale(locale) || locale === "pt") notFound();
  if (path.length === 2 && path[0] === "imoveis") return { property: path[1] };
  const key = path.join("/");
  if (!Object.hasOwn(pages, key)) notFound();
  return { page: pages[key as keyof typeof pages] };
}
export async function generateMetadata({ params }: Params) {
  const route = await resolve(params);
  return route.property ? propertyMetadata({ params: Promise.resolve({ id: route.property }) }) : route.page![1]();
}
export default async function LocalizedPage({ params }: Params) {
  const route = await resolve(params);
  return route.property ? Property({ params: Promise.resolve({ id: route.property }) }) : route.page![0]();
}
