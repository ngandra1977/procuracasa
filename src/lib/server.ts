import { Property } from "./properties";
function serverKey() {
  return process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
}
export function configured() {
  return Boolean(process.env.SUPABASE_URL && serverKey());
}
export async function database(path: string, init: RequestInit = {}) {
  const key = serverKey();
  if (!process.env.SUPABASE_URL || !key)
    throw new Error("Configure o armazenamento no servidor.");
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  // As novas sb_secret_* não são JWTs: usam apenas o cabeçalho apikey.
  if (!key.startsWith("sb_secret_")) headers.set("Authorization", `Bearer ${key}`);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const response = await fetch(`${process.env.SUPABASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers,
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
