import { notFound } from "next/navigation";
import Brand from "@/components/Brand";
import Contact from "@/components/Contact";
import { getProperties } from "@/lib/server";
import { price } from "@/lib/properties";
export const dynamic = "force-dynamic";
export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = (await getProperties()).find((p) => p.id === id);
  if (!p) notFound();
  return (
    <>
      <header className="header">
        <Brand />
        <a className="underlink" href="/#imoveis">
          ← Todos os imóveis
        </a>
      </header>
      <main className="detail section">
        <p className="eyebrow">
          {p.location} · {p.operation} ·{" "}
          {p.status === "disponivel"
            ? "Disponível"
            : p.status === "reservado"
              ? "Reservado"
              : "Vendido / arrendado"}
        </p>
        <h1>{p.title}</h1>
        <p className="detail-price">{price(p)}</p>
        <div className="gallery">
          {p.photos.map((photo, i) => (
            <a href={photo} target="_blank" rel="noreferrer" key={photo}>
              <img
                src={photo}
                alt={`${p.title} — fotografia ${i + 1}`}
                loading={i ? "lazy" : "eager"}
              />
            </a>
          ))}
        </div>
        <div className="detail-columns">
          <article>
            <div className="property-specs">
              <span>T{p.bedrooms}</span>
              <span>{p.area} m²</span>
              <span>Energia: {p.energy || "Não indicada"}</span>
            </div>
            <h2>Um espaço para conhecer.</h2>
            <p className="description">{p.description}</p>
            <p>Referência: {p.reference || p.id.slice(0, 8)}</p>
            <p>
              Mediação: {p.agency} · AMI {p.ami}
            </p>
          </article>
          <aside>
            <h2>
              {p.status === "disponivel"
                ? "Vamos marcar uma visita?"
                : "Procura algo semelhante?"}
            </h2>
            <p>Envie o pedido à Carla Morais.</p>
            <Contact
              initial={`Gostaria de saber mais sobre ${p.title} (referência ${p.reference || p.id}).`}
            />
          </aside>
        </div>
      </main>
    </>
  );
}
