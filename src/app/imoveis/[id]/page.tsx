import type { Metadata } from "next";
import { cache } from "react";
import { propertySeo, jsonLd, SITE_URL } from "@/lib/seo";
import { notFound } from "next/navigation";
import Brand from "@/components/Brand";
import Contact from "@/components/Contact";
import DirectContacts from "@/components/DirectContacts";
import ShareProperty from "@/components/ShareProperty";
import { getProperties } from "@/lib/server";
import { price, isResidential } from "@/lib/properties";
export const dynamic = "force-dynamic";
const findProperty = cache(async (id: string) =>
  (await getProperties()).find((p) => p.id === id),
);
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = await findProperty((await params).id);
  if (!p) return { title: "Imóvel não encontrado | Procuracasa", robots: { index: false, follow: true } };
  const seo = propertySeo(p);
  const images = p.photos[0] ? [{ url: p.photos[0], alt: p.title }] : [];
  return {
    title: seo.title, description: seo.description,
    alternates: { canonical: seo.url },
    openGraph: { title: seo.title, description: seo.description, url: seo.url, type: "website", locale: "pt_PT", images },
    twitter: { card: images.length ? "summary_large_image" : "summary", title: seo.title, description: seo.description, images: p.photos.slice(0, 1) },
  };
}
export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await findProperty(id);
  if (!p) notFound();
  return (
    <>
      <header className="header">
        <Brand />
        <a className="underlink" href="/#imoveis">
          ← Todos os imóveis
        </a>
      </header>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Procuracasa", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: p.title, item: propertySeo(p).url },
        ],
      }) }} />
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
        <ShareProperty title={p.title} url={propertySeo(p).url} />
        <div className="gallery">
          {p.photos.map((photo, i) => (
            <a href={photo} target="_blank" rel="noreferrer" key={photo}>
              <img
                src={photo}
                alt={`${p.title} em ${p.location} — fotografia ${i + 1}`}
                loading={i ? "lazy" : "eager"}
              />
            </a>
          ))}
        </div>
        <div className="detail-columns">
          <article>
            <div className="property-specs">
              <span>{p.property_type}</span>
              {isResidential(p.property_type) && <span>T{p.bedrooms}</span>}
              <span>{p.area} m²</span>
              {p.property_type !== "Terreno" && (
                <span>Energia: {p.energy || "Não indicada"}</span>
              )}
            </div>
            <h2>Um espaço para conhecer.</h2>
            <p className="description">{p.description}</p>
            <section className="tool-explanation">
              <h2>Prepare o próximo passo.</h2>
              <p>Antes de decidir, organize as perguntas para a visita e os documentos necessários.</p>
              <ul>
                <li><a href="/ferramentas/checklist-visita">Checklist para visitar um imóvel</a></li>
                <li><a href="/ferramentas/seguros">Seguros da casa: obrigações e custos</a></li>
                <li><a href="/ferramentas/documentos">Documentos para comprar ou vender casa</a></li>
                {p.operation === "Venda" && <>
                  <li><a href="/ferramentas/custos-compra">Calcular a entrada, o IMT e os custos da compra</a></li>
                  <li><a href="/ferramentas/prestacao-credito">Simular a prestação do crédito à habitação</a></li>
                </>}
              </ul>
            </section>
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
            <DirectContacts
              message={`Olá! Gostaria de saber mais sobre ${p.title} (referência ${p.reference || p.id}). https://www.procuracasa.pt/imoveis/${p.id}`}
              subject={`Informações sobre ${p.title} — referência ${p.reference || p.id}`}
            />
            <p className="contact-form-intro">
              Ou envie-nos o seu pedido pelo formulário.
            </p>
            <Contact
              initialPropertyType={p.property_type}
              initial={`Gostaria de saber mais sobre ${p.title} (referência ${p.reference || p.id}).`}
            />
          </aside>
        </div>
      </main>
    </>
  );
}
