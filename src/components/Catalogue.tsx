"use client";
import { useState } from "react";
import { Property, price } from "@/lib/properties";
export default function Catalogue({ properties }: { properties: Property[] }) {
  const [zone, setZone] = useState("");
  const [operation, setOperation] = useState("");
  const [budget, setBudget] = useState("");
  const availableLocations = Array.from(
    new Set(properties.map((p) => p.location)),
  ).sort((a, b) => a.localeCompare(b, "pt-PT"));
  const filtered = properties.filter(
    (p) =>
      (!zone || p.location === zone) &&
      (!operation || p.operation === operation) &&
      (!budget || p.price <= Number(budget)),
  );
  return (
    <>
      <div className="filters">
        <label>
          Localização
          <select value={zone} onChange={(e) => setZone(e.target.value)}>
            <option value="">Todas as zonas</option>
            {availableLocations.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
        <label>
          Finalidade
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="">Comprar ou arrendar</option>
            <option>Venda</option>
            <option>Arrendamento</option>
          </select>
        </label>
        <label>
          Preço máximo
          <input
            type="number"
            min="1"
            placeholder="Sem limite"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </label>
        <button
          className="text-button"
          onClick={() => {
            setZone("");
            setOperation("");
            setBudget("");
          }}
        >
          Limpar filtros ↺
        </button>
      </div>
      <p className="results" aria-live="polite">
        {filtered.length}{" "}
        {filtered.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
      </p>
      {filtered.length ? (
        <div className="property-grid">
          {filtered.map((p) => (
            <a className="property" key={p.id} href={`/imoveis/${p.id}`}>
              <div className="property-photo">
                {p.photos[0] && (
                  <img src={p.photos[0]} alt={p.title} loading="lazy" />
                )}
                <span className="tag">
                  {p.status === "disponivel"
                    ? p.operation
                    : p.status === "reservado"
                      ? "Reservado"
                      : "Vendido / arrendado"}
                </span>
                <span className="photo-arrow">↗</span>
              </div>
              <p className="eyebrow">{p.location}</p>
              <h3>{p.title}</h3>
              <p className="property-price">{price(p)}</p>
              <div className="property-specs">
                <span>T{p.bedrooms}</span>
                <span>{p.area} m²</span>
                <span>Ref. {p.reference || p.id.slice(0, 8)}</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty">
          <span className="eyebrow">UMA PROCURA À SUA MEDIDA</span>
          <h3>A sua casa pode ainda não estar aqui.</h3>
          <p>
            {properties.length
              ? "Não encontrámos imóveis com estes filtros."
              : "Estamos a preparar a seleção de imóveis para esta página."}{" "}
            Diga-nos o que procura e ajudamos a identificar opções.
          </p>
          <a href="#contacto" className="button">
            Quero encontrar casa ↗
          </a>
        </div>
      )}
    </>
  );
}
