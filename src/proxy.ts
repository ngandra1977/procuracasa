import { NextRequest, NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n/shared";
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const segment = path.split("/")[1];
  const locale = isLocale(segment) ? segment : "pt";
  const localized = isLocale(segment);
  const internalPath = localized ? path.replace(/^\/(pt|en|fr|de|es)(?=\/|$)/, "") || "/" : path;
  if (localized && (/^\/(api|gestao|_next)(\/|$)/.test(internalPath) || /\.[a-z0-9]+$/i.test(internalPath))) return new NextResponse(null, { status: 404 });
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
