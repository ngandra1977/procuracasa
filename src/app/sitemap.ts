import { locales, languageTags, localizedUrl } from "@/lib/i18n/shared";
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
  const urls = [...paths.map((path) => base + (path || "/")), ...properties.map((p) => `${base}/imoveis/${p.id}`)];
  return urls.flatMap((url) => locales.map((locale) => ({
    url: localizedUrl(url, locale),
    alternates: { languages: Object.fromEntries([...locales.map((lang) => [languageTags[lang], localizedUrl(url, lang)]), ["x-default", localizedUrl(url, "pt")]]) },
  })));
}
