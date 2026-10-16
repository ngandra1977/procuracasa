import { rateLimited } from '@/lib/rate-limit';
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  if (rateLimited(request, 'contact', 6)) return NextResponse.json({ error: 'Demasiadas tentativas. Aguarde 15 minutos e tente novamente.' }, { status: 429, headers: { 'Retry-After': '900' } });
  try {
    if (request.headers.get("origin") !== new URL(request.url).origin)
      return new Response(null, { status: 403 });
    const input = await request.json();
    if (input.website) return NextResponse.json({ ok: true });
    if (
      typeof input.name !== "string" ||
      input.name.trim().length < 2 ||
      typeof input.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) ||
      input.consent !== true ||
      typeof input.message !== "string" ||
      input.message.length > 5000
    )
      return NextResponse.json(
        { error: "Verifique o nome, email e consentimento." },
        { status: 400 },
      );
    const response = await fetch("https://formspree.io/f/xeelaaew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: input.name.slice(0, 200),
        email: input.email.slice(0, 254),
        message: input.message,
        subject: "Pedido Procuracasa — Carla Morais",
      }),
    });
    if (!response.ok) throw new Error();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Não foi possível enviar. Tente novamente ou contacte-nos pelas redes sociais.",
      },
      { status: 502 },
    );
  }
}
