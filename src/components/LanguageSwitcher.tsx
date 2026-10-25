import { Locale, locales, localizedPath, translator, Dictionary } from "@/lib/i18n/shared";
const labels: Record<Locale, string> = { pt: "Português", en: "English", fr: "Français", de: "Deutsch", es: "Español" };
export default function LanguageSwitcher({ locale, path, dictionary }: { locale: Locale; path: string; dictionary: Dictionary }) {
  const t = translator(locale, dictionary);
  return <div className="language-bar">
    <nav aria-label={t("Idioma")}>
      {locales.map((lang) => <a key={lang} href={localizedPath(path, lang)} hrefLang={lang} lang={lang} aria-label={labels[lang]} aria-current={lang === locale ? "page" : undefined}>{lang.toUpperCase()}</a>)}
    </nav>
    {locale !== "pt" && <small>{t("Tradução automática. A versão portuguesa prevalece.")}</small>}
  </div>;
}
