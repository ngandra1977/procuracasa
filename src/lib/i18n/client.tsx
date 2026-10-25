"use client";
import { createContext, ReactNode, useContext } from "react";
import { Dictionary, Locale, localizeTree, translator } from "./shared";
const Context = createContext<{ locale: Locale; dictionary: Dictionary }>({ locale: "pt", dictionary: {} });
export function LocaleProvider({ locale, dictionary, children }: { locale: Locale; dictionary: Dictionary; children: ReactNode }) {
  return <Context.Provider value={{ locale, dictionary }}>{children}</Context.Provider>;
}
export function useLocalize() {
  const { locale, dictionary } = useContext(Context);
  return (node: ReactNode) => localizeTree(node, locale, dictionary);
}
export function useTranslation() {
  const { locale, dictionary } = useContext(Context);
  return { locale, t: translator(locale, dictionary) };
}
