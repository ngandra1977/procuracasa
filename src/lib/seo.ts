import { Property, isResidential, price } from "./properties";
export const SITE_URL = "https://www.procuracasa.pt";
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
export function propertySeo(p: Property) {
  const kind = `${p.property_type}${isResidential(p.property_type) ? ` T${p.bedrooms}` : ""}`;
  const operation = p.operation === "Venda" ? "à venda" : "para arrendar";
  const state = p.status === "reservado" ? "Reservado. " : p.status === "vendido" ? "Vendido / arrendado. " : "";
  return {
    title: `${kind} ${operation} em ${p.location} | Procuracasa`,
    description: `${state}${kind} ${operation} em ${p.location}, ${p.area} m², ${price(p)}. Consulte fotografias, características e informações sobre o imóvel na Procuracasa.`,
    url: `${SITE_URL}/imoveis/${p.id}`,
  };
}
