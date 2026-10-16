import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/server";
import { toolPages } from "@/lib/tools";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.procuracasa.pt";
  const paths = [
    "",
    "/ferramentas",
    ...toolPages.map((t) => `/ferramentas/${t.slug}`),
    "/privacidade",
    "/termos",
  ];
  let properties: Awaited<ReturnType<typeof getProperties>> = [];
  try {
    properties = await getProperties();
  } catch {}
  return [
    ...paths.map((path) => ({ url: base + path })),
    ...properties.map((p) => ({ url: `${base}/imoveis/${p.id}` })),
  ];
}
