// Proteção por instância; complementar com regras persistentes no firewall da Vercel.
const attempts = new Map<string, { count: number; expires: number }>();
export function rateLimited(request: Request, scope: string, limit: number) {
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.expires <= now) attempts.delete(key);
  const address = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const key = `${scope}:${address}`;
  const current = attempts.get(key);
  if (current && current.expires > now) {
    current.count++;
    return current.count > limit;
  }
  if (attempts.size > 10000) return true;
  attempts.set(key, { count: 1, expires: now + 15 * 60 * 1000 });
  return false;
}
