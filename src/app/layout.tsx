import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buy or Rent Property in Porto, Portugal | Procuracasa",
  description: "Local, licensed real estate guidance for foreigners buying or renting in Porto and the Greater Porto area. We help you navigate the Portuguese property process.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
