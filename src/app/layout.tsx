import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
export const metadata: Metadata = {
  title: "Procuracasa | Carla Morais — Imóveis no Grande Porto",
  description:
    "Imóveis e acompanhamento com Carla Morais, com especial atenção ao Grande Porto e litoral. Procura noutra zona? Partilhe as suas preferências.",
  icons: { icon: "/brand.svg" },
  openGraph: {
    title: "Procuracasa · Carla Morais",
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
