import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
export const metadata: Metadata = {
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
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
