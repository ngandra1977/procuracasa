"use client";
import { useState } from "react";

export default function ShareProperty({ title, url }: { title: string; url: string }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [showLink, setShowLink] = useState(false);

  async function share() {
    setBusy(true);
    setMessage("");
    setShowLink(false);
    try {
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ title, url });
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") return;
          // Some browsers expose share but block it. Continue with copy.
        }
      }
      try {
        await navigator.clipboard.writeText(url);
        setMessage("Link copiado. Pode colá-lo numa mensagem ou publicação.");
      } catch {
        setShowLink(true);
        setMessage("Não foi possível copiar automaticamente. Selecione e copie o link abaixo.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ marginBottom: "24px" }}>
      <button type="button" className="button" onClick={share} disabled={busy}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false">
          <path d="M12 15V3m-4 4 4-4 4 4M6 11H4v10h16V11h-2" />
        </svg>
        {busy ? "A abrir…" : "Partilhar"}
      </button>
      <p role="status" aria-live="polite">{message}</p>
      {showLink && (
        <label>
          Link deste imóvel
          <input type="url" value={url} readOnly onFocus={(event) => event.currentTarget.select()} style={{ width: "100%", padding: "12px", marginTop: "8px" }} />
        </label>
      )}
    </div>
  );
}
