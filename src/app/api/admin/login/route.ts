import { rateLimited } from '@/lib/rate-limit';
import { NextResponse } from "next/server";
import { equal, session } from "@/lib/auth";
export async function POST(request: Request) {
  if (rateLimited(request, 'login', 10)) return NextResponse.json({ error: 'Demasiadas tentativas. Aguarde 15 minutos e tente novamente.' }, { status: 429, headers: { 'Retry-After': '900' } });
  if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 16)
    return NextResponse.json(
      {
        error:
          "Configure ADMIN_PASSWORD com pelo menos 16 caracteres na Vercel.",
      },
      { status: 503 },
    );
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return new Response(null, { status: 403 });
  const { password } = await request.json();
  if (
    typeof password !== "string" ||
    !equal(password, process.env.ADMIN_PASSWORD)
  )
    return NextResponse.json(
      { error: "Credenciais inválidas." },
      { status: 401 },
    );
  const response = NextResponse.json({ ok: true });
  response.cookies.set("pc_session", session(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 28800,
  });
  return response;
}
