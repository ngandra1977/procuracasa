import { NextResponse } from "next/server";
import { authorized } from "@/lib/auth";
import { database } from "@/lib/server";
export async function GET() {
  if (!(await authorized())) return new Response(null, { status: 401 });
  try {
    return NextResponse.json(
      await (
        await database("/rest/v1/properties?order=created_at.desc")
      ).json(),
    );
  } catch {
    return NextResponse.json(
      { error: "Configure a base de dados seguindo o README." },
      { status: 503 },
    );
  }
}
export async function POST(request: Request) {
  if (!(await authorized())) return new Response(null, { status: 401 });
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return new Response(null, { status: 403 });
  try {
    const input = await request.json();
    if (
      !input.title ||
      !input.location ||
      !["Venda", "Arrendamento"].includes(input.operation) ||
      !["disponivel", "reservado", "vendido", "rascunho"].includes(
        input.status,
      ) ||
      !Number.isFinite(input.price) ||
      input.price <= 0 ||
      !Number.isInteger(input.bedrooms) ||
      input.bedrooms < 0 ||
      !Number.isFinite(input.area) ||
      input.area <= 0 ||
      !Array.isArray(input.photos) ||
      input.photos.some(
        (p: unknown) =>
          typeof p !== "string" ||
          !p.startsWith(
            `${process.env.SUPABASE_URL}/storage/v1/object/public/property-images/`,
          ),
      )
    )
      return NextResponse.json(
        { error: "Verifique os dados e as fotografias." },
        { status: 400 },
      );
    if (
      input.status !== "rascunho" &&
      (!input.agency || !/^\d+$/.test(input.ami) || !input.photos.length)
    )
      return NextResponse.json(
        {
          error:
            "Para publicar, adicione fotografias, entidade mediadora e AMI.",
        },
        { status: 400 },
      );
    const fields = [
      "title",
      "location",
      "price",
      "bedrooms",
      "area",
      "operation",
      "status",
      "description",
      "photos",
      "agency",
      "ami",
      "reference",
      "energy",
    ];
    const record: Record<string, unknown> = {
      id:
        typeof input.id === "string" && /^[0-9a-f-]{36}$/.test(input.id)
          ? input.id
          : crypto.randomUUID(),
    };
    for (const field of fields) record[field] = input[field];
    await database("/rest/v1/properties?on_conflict=id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify(record),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível guardar o imóvel." },
      { status: 500 },
    );
  }
}
export async function DELETE(request: Request) {
  if (!(await authorized())) return new Response(null, { status: 401 });
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return new Response(null, { status: 403 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id || !/^[0-9a-f-]{36}$/.test(id))
    return new Response(null, { status: 400 });
  try {
    await database(`/rest/v1/properties?id=eq.${id}`, { method: "DELETE" });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível eliminar." },
      { status: 500 },
    );
  }
}
