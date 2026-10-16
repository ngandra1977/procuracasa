import { NextResponse } from "next/server";
import { authorized } from "@/lib/auth";
import { database } from "@/lib/server";
export async function POST(request: Request) {
  if (!(await authorized())) return new Response(null, { status: 401 });
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return new Response(null, { status: 403 });
  try {
    const file = (await request.formData()).get("file");
    if (
      !(file instanceof File) ||
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 3 * 1024 * 1024
    )
      return NextResponse.json(
        { error: "Use JPG, PNG ou WebP até 3 MB." },
        { status: 400 },
      );
    const bytes = new Uint8Array(await file.arrayBuffer());
    const valid =
      file.type === "image/jpeg"
        ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
        : file.type === "image/png"
          ? Buffer.from(bytes.subarray(0, 8)).equals(
              Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
            )
          : Buffer.from(bytes.subarray(0, 4)).toString() === "RIFF" &&
            Buffer.from(bytes.subarray(8, 12)).toString() === "WEBP";
    if (!valid)
      return NextResponse.json(
        { error: "O ficheiro não corresponde a uma imagem válida." },
        { status: 400 },
      );
    const key = `${crypto.randomUUID()}.${file.type.split("/")[1]}`;
    await database(`/storage/v1/object/property-images/${key}`, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: bytes,
    });
    return NextResponse.json({
      url: `${process.env.SUPABASE_URL}/storage/v1/object/public/property-images/${key}`,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Falha no carregamento. Verifique a configuração do armazenamento.",
      },
      { status: 500 },
    );
  }
}
