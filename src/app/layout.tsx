import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { headers } from "next/headers";
import { getLocale, dictionaries, localizedMetadata } from "@/lib/i18n/server";
import { languageTags } from "@/lib/i18n/shared";
import { LocaleProvider } from "@/lib/i18n/client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
const baseMetadata: Metadata = {
  metadataBase: new URL("https://www.procuracasa.pt"),
  title: "Procuracasa | Imóveis no Grande Porto",
  description:
    "Imóveis e acompanhamento próximo, com especial atenção ao Grande Porto e litoral. Procura noutra zona? Partilhe as suas preferências.",
  verification: { google: "rAXSc2K0UvErYuTEeUTXVjvlVQR88qVfy5t7MzMMCx0" },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      { url: "/brand.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Procuracasa",
    description: "O seu lugar. Entre a cidade e o mar.",
    locale: "pt_PT",
    type: "website",
  },
};
export async function generateMetadata() { return localizedMetadata(baseMetadata); }
export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const path = (await headers()).get("x-site-public-path") || "/";
  const dictionary = dictionaries[locale];
  return (
    <html lang={languageTags[locale]}>
      <body><LocaleProvider locale={locale} dictionary={dictionary}>
        {!path.startsWith("/gestao") && <LanguageSwitcher locale={locale} path={path} dictionary={dictionary} />}
        {children}
      </LocaleProvider></body>
    </html>
  );
}
