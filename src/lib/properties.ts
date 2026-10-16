export const propertyTypes = [
  "Apartamento",
  "Moradia",
  "Terreno",
  "Loja",
  "Escritório",
  "Armazém",
  "Outro",
] as const;
export type PropertyType = (typeof propertyTypes)[number];
export function isResidential(type: string) {
  return type === "Apartamento" || type === "Moradia";
}
export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  property_type: PropertyType;
  bedrooms: number;
  area: number;
  operation: "Venda" | "Arrendamento";
  status: "disponivel" | "reservado" | "vendido" | "rascunho";
  description: string;
  photos: string[];
  agency: string;
  ami: string;
  reference: string;
  energy: string;
};
export const locations = [
  "Vila do Conde",
  "Matosinhos",
  "Leça da Palmeira",
  "Foz do Douro",
  "Lordelo do Ouro",
  "Nevogilde",
  "Massarelos",
];
export const price = (p: Property) =>
  new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(p.price) + (p.operation === "Arrendamento" ? " / mês" : "");
