import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/gestao", "/api/"] },
    sitemap: "https://www.procuracasa.pt/sitemap.xml",
  };
}
