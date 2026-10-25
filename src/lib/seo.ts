import { Property, isResidential, price } from "./properties";
export const SITE_URL = "https://www.procuracasa.pt";
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
export function propertySeo(p: Property, locale: "pt" | "en" | "fr" | "de" | "es" = "pt") {
  if (locale !== "pt") return internationalPropertySeo(p, locale);
  const kind = `${p.property_type}${isResidential(p.property_type) ? ` T${p.bedrooms}` : ""}`;
  const operation = p.operation === "Venda" ? "à venda" : "para arrendar";
  const state = p.status === "reservado" ? "Reservado. " : p.status === "vendido" ? "Vendido / arrendado. " : "";
  return {
    title: `${kind} ${operation} em ${p.location} | Procuracasa`,
    description: `${state}${kind} ${operation} em ${p.location}, ${p.area} m², ${price(p)}. Consulte fotografias, características e informações sobre o imóvel na Procuracasa.`,
    url: `${SITE_URL}/imoveis/${p.id}`,
  };
}

function internationalPropertySeo(p: Property, locale: "en" | "fr" | "de" | "es") {
  const copy = {
    en: { types: ["Apartment", "House", "Land", "Shop", "Office", "Warehouse", "Property"], sale: "for sale", rent: "to rent", in: "in", reserved: "Reserved. ", sold: "Sold / rented. ", details: "View photos, property details and contact information at Procuracasa.", month: "month" },
    fr: { types: ["Appartement", "Maison", "Terrain", "Local commercial", "Bureau", "Entrepôt", "Bien"], sale: "à vendre", rent: "à louer", in: "à", reserved: "Réservé. ", sold: "Vendu / loué. ", details: "Consultez les photos, les caractéristiques et les coordonnées sur Procuracasa.", month: "mois" },
    de: { types: ["Wohnung", "Haus", "Grundstück", "Laden", "Büro", "Lagerhalle", "Immobilie"], sale: "zum Verkauf", rent: "zur Miete", in: "in", reserved: "Reserviert. ", sold: "Verkauft / vermietet. ", details: "Fotos, Objektdetails und Kontaktinformationen auf Procuracasa.", month: "Monat" },
    es: { types: ["Apartamento", "Casa", "Terreno", "Local comercial", "Oficina", "Almacén", "Inmueble"], sale: "en venta", rent: "en alquiler", in: "en", reserved: "Reservado. ", sold: "Vendido / alquilado. ", details: "Consulte fotos, características y datos de contacto en Procuracasa.", month: "mes" },
  }[locale];
  const keys = ["Apartamento", "Moradia", "Terreno", "Loja", "Escritório", "Armazém", "Outro"];
  const kind = `${copy.types[Math.max(0, keys.indexOf(p.property_type))]}${isResidential(p.property_type) ? ` T${p.bedrooms}` : ""}`;
  const operation = p.operation === "Venda" ? copy.sale : copy.rent;
  const state = p.status === "reservado" ? copy.reserved : p.status === "vendido" ? copy.sold : "";
  const amount = new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(p.price) + (p.operation === "Arrendamento" ? ` / ${copy.month}` : "");
  return { title: `${kind} ${operation} ${copy.in} ${p.location} | Procuracasa`, description: `${state}${kind} ${operation} ${copy.in} ${p.location}, ${p.area} m², ${amount}. ${copy.details}`, url: `${SITE_URL}/imoveis/${p.id}` };
}
