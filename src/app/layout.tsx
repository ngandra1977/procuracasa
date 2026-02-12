import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Procuracasa.pt - Encontramos a Sua Casa Ideal",
  description: "Diga-nos que casa procura. Nos fazemos o trabalho de encontrar imoveis que encaixam nas suas necessidades.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT">
      <body className="bg-white">{children}</body>
    </html>
  );
}
