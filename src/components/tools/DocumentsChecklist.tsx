"use client";
import { useLocalize } from "@/lib/i18n/client";
import { useState } from "react";
import Checklist from "./Checklist";
import { buyerDocuments, sellerDocuments } from "@/lib/checklists";
export default function DocumentsChecklist() {
    const localize = useLocalize();
    const [mode, setMode] = useState<"buyer" | "seller">("buyer");
    return localize((<>
      <div className="checklist-mode" role="group" aria-label="Escolher compra ou venda">
        <button type="button" aria-pressed={mode === "buyer"} onClick={() => setMode("buyer")}>
          Vou comprar
        </button>
        <button type="button" aria-pressed={mode === "seller"} onClick={() => setMode("seller")}>
          Vou vender
        </button>
      </div>
      <Checklist key={mode} sections={mode === "buyer" ? buyerDocuments : sellerDocuments} storageKey={`procuracasa:documentos:${mode}:v1`} title={mode === "buyer"
            ? "Documentos para comprar casa"
            : "Documentos para vender casa"}/>
    </>));
}
