import { Property } from "./properties";
export function configured() {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
export async function database(path: string, init: RequestInit = {}) {
  if (!configured()) throw new Error("Configure o armazenamento no servidor.");
  const response = await fetch(`${process.env.SUPABASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (!response.ok)
    throw new Error("Não foi possível aceder ao armazenamento.");
  return response;
}
export async function getProperties(): Promise<Property[]> {
  if (!configured()) return [];
  const response = await database(
    "/rest/v1/properties?status=neq.rascunho&order=created_at.desc",
  );
  return response.json();
}
