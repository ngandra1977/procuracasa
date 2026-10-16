"use client";
import { useEffect, useState } from "react";
import type { CheckSection } from "@/lib/checklists";
export default function Checklist({
  sections,
  storageKey,
  title,
}: {
  sections: CheckSection[];
  storageKey: string;
  title: string;
}) {
  const [checked, setChecked] = useState<string[]>([]),
    [ready, setReady] = useState(false);
  const total = sections.reduce((n, s) => n + s.items.length, 0);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const valid = new Set(sections.flatMap((s) => s.items.map((i) => i.id)));
      if (Array.isArray(saved))
        setChecked(
          saved.filter(
            (v): v is string => typeof v === "string" && valid.has(v),
          ),
        );
    } catch {}
    setReady(true);
  }, [storageKey, sections]);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem(storageKey, JSON.stringify(checked));
      } catch {}
  }, [checked, ready, storageKey]);
  function download() {
    const text =
      `PROCURACASA — ${title}\nhttps://www.procuracasa.pt/ferramentas\n\n` +
      sections
        .map(
          (s) =>
            s.title +
            "\n" +
            s.items
              .map(
                (i) =>
                  `${checked.includes(i.id) ? "[x]" : "[ ]"} ${i.title}\n    ${i.detail}`,
              )
              .join("\n\n"),
        )
        .join("\n\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${storageKey.replaceAll(":", "-")}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="checklist">
      <div className="checklist-toolbar">
        <div>
          <p className="eyebrow">A SUA PREPARAÇÃO</p>
          <p role="status">
            {checked.length} de {total} pontos marcados
          </p>
        </div>
        <div className="checklist-actions">
          <button
            type="button"
            className="text-button"
            onClick={() => window.print()}
          >
            Imprimir / guardar PDF ↗
          </button>
          <button type="button" className="text-button" onClick={download}>
            Descarregar checklist ↓
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => setChecked([])}
          >
            Limpar marcações ↺
          </button>
        </div>
      </div>
      <p className="local-note">
        As marcações ficam apenas neste navegador. A lista é orientadora e deve
        ser adaptada ao imóvel e ao negócio.
      </p>
      {sections.map((s) => (
        <section key={s.title} className="checklist-section">
          <h2>{s.title}</h2>
          {s.items.map((i) => (
            <label
              key={i.id}
              className={`checklist-item ${checked.includes(i.id) ? "is-checked" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked.includes(i.id)}
                onChange={(e) =>
                  setChecked((current) =>
                    e.target.checked
                      ? [...current, i.id]
                      : current.filter((id) => id !== i.id),
                  )
                }
              />
              <span>
                <strong>{i.title}</strong>
                <span>{i.detail}</span>
              </span>
            </label>
          ))}
        </section>
      ))}
    </div>
  );
}
