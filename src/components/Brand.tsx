"use client";
import { useLocalize } from "@/lib/i18n/client";
export default function Brand() {
    const localize = useLocalize();
    return localize((<a href="/" className="brand" aria-label="Procuracasa — início">
      <img src="/brand.svg" alt="" width="42" height="42"/>
      <span>
        procuracasa
        <span className="brand-sub">IMÓVEIS · GRANDE PORTO</span>
      </span>
    </a>));
}
