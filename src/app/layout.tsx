import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "Buy or Rent Property in Porto, Portugal | Procuracasa",
  description: "Local, licensed real estate guidance for foreigners buying or renting in Porto and the Greater Porto area. We help you navigate the Portuguese property process.",
};
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-EN">
      <body className="bg-white">{children}</body>
    </html>
  );
}
