"use client";
import { FormEvent, useEffect, useState } from "react";
import Brand from "@/components/Brand";
import {
  locations,
  Property,
  price,
  propertyTypes,
  isResidential,
} from "@/lib/properties";
const blank: Property = {
  id: "",
  title: "",
  location: "",
  price: 0,
  property_type: "Apartamento",
  bedrooms: 2,
  area: 0,
  operation: "Venda",
  status: "rascunho",
  description: "",
  photos: [],
  agency: "",
  ami: "",
  reference: "",
  energy: "",
};
export default function Management() {
  const [logged, setLogged] = useState(false),
    [items, setItems] = useState<Property[]>([]),
    [edit, setEdit] = useState<Property | null>(null),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  async function load() {
    try {
      const r = await fetch("/api/admin/properties");
      if (r.status === 401) {
        setLogged(false);
        return;
      }
      setLogged(true);
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setItems(data);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Falha ao carregar.");
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: new FormData(e.currentTarget).get("password"),
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Falha de acesso.");
    } finally {
      setBusy(false);
    }
  }
  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const r = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edit),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setEdit(null);
      await load();
      setMessage("Imóvel guardado.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Falha ao guardar.");
    } finally {
      setBusy(false);
    }
  }
  async function upload(files: FileList | null) {
    if (!files || !edit) return;
    setBusy(true);
    setMessage("");
    const photos = [...edit.photos];
    try {
      for (const file of Array.from(files)) {
        const data = new FormData();
        data.set("file", file);
        const r = await fetch("/api/admin/upload", {
          method: "POST",
          body: data,
        });
        const result = await r.json();
        if (!r.ok) throw new Error(result.error);
        photos.push(result.url);
      }
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Falha no carregamento.");
    } finally {
      setEdit((current) => (current ? { ...current, photos } : null));
      setBusy(false);
    }
  }
  async function remove(id: string) {
    if (!confirm("Eliminar este imóvel? Esta ação não pode ser anulada."))
      return;
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/properties?id=${id}`, {
        method: "DELETE",
      });
      if (!r.ok) throw new Error();
      await load();
    } catch {
      setMessage("Não foi possível eliminar.");
    } finally {
      setBusy(false);
    }
  }
  function field(key: keyof Property, value: string | number) {
    setEdit((current) => (current ? { ...current, [key]: value } : null));
  }
  return (
    <>
      <header className="header">
        <Brand />
        <a href="/">Ver site ↗</a>
      </header>
      <main className="admin section">
        <p className="eyebrow">ÁREA RESERVADA</p>
        <h1>Gestão de imóveis.</h1>
        {message && (
          <p className="notice" role="status">
            {message}
          </p>
        )}
        {!logged ? (
          <form onSubmit={login} className="login">
            <label>
              Palavra-passe
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </label>
            <button className="button" disabled={busy}>
              Entrar ↗
            </button>
          </form>
        ) : (
          <>
            <div className="admin-toolbar">
              <p>
                Carregue fotografias, prepare rascunhos e atualize a carteira.
              </p>
              <button
                className="text-button"
                onClick={async () => {
                  await fetch("/api/admin/logout", { method: "POST" });
                  setLogged(false);
                  setEdit(null);
                }}
              >
                Terminar sessão
              </button>
            </div>
            <button
              className="button"
              disabled={busy}
              onClick={() => setEdit({ ...blank })}
            >
              + Adicionar imóvel
            </button>
            {edit && (
              <form className="admin-form" onSubmit={save}>
                <h2>{edit.id ? "Editar imóvel" : "Novo imóvel"}</h2>
                <label>
                  Título
                  <input
                    required
                    maxLength={180}
                    value={edit.title}
                    onChange={(e) => field("title", e.target.value)}
                  />
                </label>
                <label>
                  Tipo de imóvel
                  <select
                    value={edit.property_type}
                    onChange={(e) => {
                      const type = e.target.value as Property["property_type"];
                      setEdit({
                        ...edit,
                        property_type: type,
                        bedrooms: isResidential(type) ? edit.bedrooms : 0,
                        energy: type === "Terreno" ? "" : edit.energy,
                      });
                    }}
                  >
                    {propertyTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </label>
                <div className="form-pair">
                  <div className="location-field">
                    <label>
                      Zona sugerida (opcional)
                      <select
                        value={
                          locations.includes(edit.location) ? edit.location : ""
                        }
                        onChange={(e) => {
                          if (e.target.value) field("location", e.target.value);
                        }}
                      >
                        <option value="">Escolher uma zona sugerida</option>
                        {locations.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Localização do imóvel
                      <input
                        type="text"
                        required
                        maxLength={200}
                        value={edit.location}
                        onChange={(e) => field("location", e.target.value)}
                        placeholder="Ex.: Gaia, Maia, Braga…"
                        aria-describedby="property-location-help"
                      />
                      <small id="property-location-help">
                        Pode escrever qualquer localidade, incluindo fora das
                        zonas sugeridas.
                      </small>
                    </label>
                  </div>
                  <label>
                    Finalidade
                    <select
                      value={edit.operation}
                      onChange={(e) => field("operation", e.target.value)}
                    >
                      <option>Venda</option>
                      <option>Arrendamento</option>
                    </select>
                  </label>
                </div>
                <div className="form-pair">
                  <label>
                    Preço (€)
                    <input
                      type="number"
                      required
                      min="1"
                      value={edit.price || ""}
                      onChange={(e) => field("price", Number(e.target.value))}
                    />
                  </label>
                  <label>
                    {edit.property_type === "Terreno"
                      ? "Área do terreno (m²)"
                      : "Área (m²)"}
                    <input
                      type="number"
                      required
                      min="1"
                      value={edit.area || ""}
                      onChange={(e) => field("area", Number(e.target.value))}
                    />
                  </label>
                </div>
                <div className="form-pair">
                  {isResidential(edit.property_type) && (
                    <label>
                      Quartos (0 = T0)
                      <input
                        type="number"
                        required
                        min="0"
                        step="1"
                        value={edit.bedrooms}
                        onChange={(e) =>
                          field("bedrooms", Number(e.target.value))
                        }
                      />
                    </label>
                  )}
                  <label>
                    Referência
                    <input
                      value={edit.reference}
                      onChange={(e) => field("reference", e.target.value)}
                    />
                  </label>
                </div>
                <label>
                  Descrição
                  <textarea
                    rows={6}
                    maxLength={10000}
                    value={edit.description}
                    onChange={(e) => field("description", e.target.value)}
                  />
                </label>
                <div className="form-pair">
                  <label>
                    Entidade mediadora
                    <input
                      value={edit.agency}
                      onChange={(e) => field("agency", e.target.value)}
                    />
                  </label>
                  <label>
                    Número AMI
                    <input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={edit.ami}
                      onChange={(e) => field("ami", e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-pair">
                  <label>
                    Estado
                    <select
                      value={edit.status}
                      onChange={(e) => field("status", e.target.value)}
                    >
                      <option value="rascunho">
                        Rascunho — oculto no site
                      </option>
                      <option value="disponivel">Disponível</option>
                      <option value="reservado">Reservado</option>
                      <option value="vendido">Vendido / arrendado</option>
                    </select>
                  </label>
                  <label>
                    Certificado energético
                    <select
                      value={edit.energy}
                      onChange={(e) => field("energy", e.target.value)}
                    >
                      <option value="">Não indicado</option>
                      {["A+", "A", "B", "B-", "C", "D", "E", "F", "Isento"].map(
                        (v) => (
                          <option key={v}>{v}</option>
                        ),
                      )}
                    </select>
                  </label>
                </div>
                <label>
                  Fotografias — JPG, PNG ou WebP, até 3 MB cada
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    disabled={busy}
                    onChange={(e) => {
                      upload(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
                <p>
                  A primeira fotografia é a capa. Use apenas imagens que tem
                  autorização para publicar.
                </p>
                <div className="admin-photos">
                  {edit.photos.map((photo, i) => (
                    <div key={photo}>
                      <img src={photo} alt={`Fotografia ${i + 1}`} />
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() =>
                          setEdit({
                            ...edit,
                            photos: [
                              photo,
                              ...edit.photos.filter((p) => p !== photo),
                            ],
                          })
                        }
                      >
                        Usar como capa
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() =>
                          setEdit({
                            ...edit,
                            photos: edit.photos.filter((p) => p !== photo),
                          })
                        }
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
                <div className="hero-actions">
                  <button className="button" disabled={busy}>
                    {busy ? "A processar…" : "Guardar imóvel"}
                  </button>
                  <button
                    type="button"
                    className="text-button"
                    disabled={busy}
                    onClick={() => setEdit(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
            <div className="admin-list">
              {items.length === 0 && (
                <p>
                  Ainda não existem imóveis. Comece por adicionar um rascunho.
                </p>
              )}
              {items.map((p) => (
                <div className="admin-row" key={p.id}>
                  <div>
                    <strong>{p.title}</strong>
                    <p>
                      {p.location} · {price(p)} · {p.status}
                    </p>
                  </div>
                  <div>
                    <button
                      className="text-button"
                      disabled={busy}
                      onClick={() => setEdit(p)}
                    >
                      Editar ↗
                    </button>
                    {" · "}
                    <button
                      className="text-button"
                      disabled={busy}
                      onClick={() => remove(p.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
