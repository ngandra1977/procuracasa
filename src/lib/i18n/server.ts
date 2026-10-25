import "server-only";
import { cache, ReactNode } from "react";
import { headers } from "next/headers";
import type { Metadata } from "next";
import en from "./en.json";
import fr from "./fr.json";
import de from "./de.json";
import es from "./es.json";
import { Dictionary, Locale, isLocale, locales, localizedUrl, languageTags, localizeTree, translator } from "./shared";
export const dictionaries: Record<Locale, Dictionary> = { pt: {}, en, fr, de, es };
export const getLocale = cache(async (): Promise<Locale> => {
  const locale = (await headers()).get("x-site-locale") || "pt";
  return isLocale(locale) ? locale : "pt";
});
export async function localizePage(node: ReactNode) {
  const locale = await getLocale();
  return localizeTree(node, locale, dictionaries[locale]);
}
export async function localizedMetadata(metadata: Metadata, path?: string): Promise<Metadata> {
  const locale = await getLocale();
  const t = translator(locale, dictionaries[locale]);
  const canonical = path || (typeof metadata.alternates?.canonical === "string" ? metadata.alternates.canonical : "https://www.procuracasa.pt/");
  const url = localizedUrl(canonical, locale);
  const title = typeof metadata.title === "string" ? t(metadata.title) : metadata.title;
  const description = metadata.description ? t(metadata.description) : undefined;
  return {
    ...metadata, title, description,
    alternates: { ...metadata.alternates, canonical: url,
      languages: Object.fromEntries([...locales.map((lang) => [languageTags[lang], localizedUrl(canonical, lang)]), ["x-default", localizedUrl(canonical, "pt")]]) },
    openGraph: { ...metadata.openGraph, title: typeof title === "string" ? title : undefined, description, url, locale: languageTags[locale].replace("-", "_"), type: "website" },
    twitter: { ...metadata.twitter, title: typeof title === "string" ? title : undefined, description },
  };
}
