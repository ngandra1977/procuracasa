import { NextRequest, NextResponse } from "next/server";
import { isLocale, localizedPath } from "@/lib/i18n/shared";
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const segment = path.split("/")[1];
  const locale = isLocale(segment) ? segment : "pt";
  const localized = isLocale(segment);
  const internalPath = localized ? path.replace(/^\/(pt|en|fr|de|es)(?=\/|$)/, "") || "/" : path;
  if (localized && (/^\/(api|gestao|_next)(\/|$)/.test(internalPath) || /\.[a-z0-9]+$/i.test(internalPath))) return new NextResponse(null, { status: 404 });
  // Recover only the module names exposed by the old translation dictionaries.
  // These are not property IDs or a reason to redirect arbitrary missing pages.
  let decodedPath = internalPath;
  try { decodedPath = decodeURIComponent(internalPath); } catch { /* Let the router handle malformed URLs. */ }
  const alias = decodedPath.match(/^\/(?:ferramentas\/|imoveis\/)?(properties|propriétés|Eigenschaften|propiedades|Checklist|Checkliste|Liste de contrôle|Lista de verificación)\/?$/u)?.[1];
  if (alias) {
    const catalogue = ["properties", "propriétés", "Eigenschaften", "propiedades"].includes(alias);
    const target = request.nextUrl.clone();
    target.pathname = localizedPath(catalogue ? "/" : "/ferramentas/checklist-visita", locale);
    target.hash = catalogue ? "imoveis" : "";
    return NextResponse.redirect(target, 308);
  }
  if (segment === "pt") {
    const target = request.nextUrl.clone(); target.pathname = internalPath;
    return NextResponse.redirect(target, 308);
  }
  const headers = new Headers(request.headers);
  headers.set("x-site-locale", locale);
  headers.set("x-site-public-path", path);
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/((?!api(?:/|$)|_next(?:/|$)|.*\\.[a-zA-Z0-9]+$).*)"] };
