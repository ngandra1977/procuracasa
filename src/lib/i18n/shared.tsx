import { cloneElement, isValidElement, ReactNode, ReactElement } from "react";
export const locales = ["pt", "en", "fr", "de", "es"] as const;
export type Locale = typeof locales[number];
export type Dictionary = Record<string, string>;
export const languageTags: Record<Locale, string> = { pt: "pt-PT", en: "en", fr: "fr", de: "de", es: "es" };
export function isLocale(value: string): value is Locale { return (locales as readonly string[]).includes(value); }
export function normalize(value: string) { return value.replace(/\s+/g, " ").trim(); }
export function localizedPath(path: string, locale: Locale) {
  if (!path.startsWith("/") || path.startsWith("//") || /^\/(api|gestao|_next)(\/|$)/.test(path) || /\.[a-z0-9]+(?:[?#]|$)/i.test(path)) return path;
  const clean = path.replace(/^\/(pt|en|fr|de|es)(?=\/|[?#]|$)/, "") || "/";
  return locale === "pt" ? clean : `/${locale}${clean === "/" ? "" : clean}`;
}
export function localizedUrl(url: string, locale: Locale) {
  const base = "https://www.procuracasa.pt";
  return url.startsWith(base + "/") || url === base ? base + localizedPath(url.slice(base.length) || "/", locale) : localizedPath(url, locale);
}
export function translator(locale: Locale, dictionary: Dictionary) {
  const patterns = Object.keys(dictionary).filter((key) => /\{\d+\}/.test(key)).map((key) => {
    const variables: string[] = [];
    const escaped = key.split(/(\{\d+\})/).map((part) => {
      if (/^\{\d+\}$/.test(part)) { variables.push(part); return "(.+?)"; }
      return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
    return { regex: new RegExp(`^${escaped}$`), variables, value: dictionary[key] };
  });
  function t(value: string): string {
    if (locale === "pt" || !value.trim()) return value;
    const key = normalize(value);
    let result = dictionary[key];
    if (!result) {
      for (const pattern of patterns) {
        const match = key.match(pattern.regex);
        if (!match) continue;
        result = pattern.value.replace(/\{\d+\}/g, (placeholder) => {
          const i = pattern.variables.indexOf(placeholder);
          return i < 0 ? placeholder : dictionary[normalize(match[i + 1])] || match[i + 1];
        });
        break;
      }
    }
    if (!result) return value;
    return (value.match(/^\s*/)?.[0] || "") + result + (value.match(/\s*$/)?.[0] || "");
  }
  return t;
}
/** Translate visible copy and internal links; keep values, IDs and event handlers stable. */
export function localizeTree(node: ReactNode, locale: Locale, dictionary: Dictionary): ReactNode {
  const t = translator(locale, dictionary);
  function visit(value: ReactNode): ReactNode {
    if (typeof value === "string") return t(value);
    if (Array.isArray(value)) return value.map((child, index) => {
      const result = visit(child);
      return isValidElement(result) && result.key === null ? cloneElement(result, { key: `localized-${index}` }) : result;
    });
    if (!isValidElement(value)) return value;
    const element = value as ReactElement<Record<string, unknown>>;
    const props = element.props;
    const next: Record<string, unknown> = {};
    for (const key of ["placeholder", "aria-label", "title", "alt", "eyebrow", "intro", "description"]) {
      if (typeof props[key] === "string") next[key] = t(props[key] as string);
    }
    for (const key of ["href", "url"]) if (typeof props[key] === "string") next[key] = localizedUrl(props[key] as string, locale);
    if (element.type === "option" && props.value === undefined && typeof props.children === "string") next.value = props.children;
    if (element.type === "script" && props.type === "application/ld+json" && props.dangerouslySetInnerHTML) {
      const raw = (props.dangerouslySetInnerHTML as { __html: string }).__html;
      try {
        const rewrite = (obj: unknown): unknown => {
          if (typeof obj === "string") return obj.startsWith("https://www.procuracasa.pt") ? localizedUrl(obj, locale) : t(obj);
          if (Array.isArray(obj)) return obj.map(rewrite);
          if (obj && typeof obj === "object") return Object.fromEntries(Object.entries(obj).map(([key, v]) => [key, key.startsWith("@") ? v : rewrite(v)]));
          return obj;
        };
        next.dangerouslySetInnerHTML = { __html: JSON.stringify(rewrite(JSON.parse(raw))).replace(/</g, "\\u003c") };
      } catch { /* Preserve original structured data if it cannot be parsed. */ }
    }
    if (props.children !== undefined) next.children = visit(props.children as ReactNode);
    return cloneElement(element, next);
  }
  return visit(node);
}
