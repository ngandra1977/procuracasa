import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
export function equal(a: string, b: string) {
  const x = Buffer.from(a),
    y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
export function session() {
  const expires = String(Date.now() + 8 * 60 * 60 * 1000);
  return `${expires}.${createHmac("sha256", process.env.ADMIN_PASSWORD!).update(expires).digest("hex")}`;
}
export async function authorized() {
  const secret = process.env.ADMIN_PASSWORD;
  const value = (await cookies()).get("pc_session")?.value;
  if (!secret || !value) return false;
  const [expires, signature] = value.split(".");
  return (
    Number(expires) > Date.now() &&
    equal(
      signature || "",
      createHmac("sha256", secret).update(expires).digest("hex"),
    )
  );
}
