import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { ADMIN_PASSWORD, SESSION_COOKIE, SESSION_SECRET } from "./constants";

export { SESSION_COOKIE, ADMIN_PASSWORD };
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type SessionPayload = {
  sub: "admin";
  exp: number;
};

function sign(payload: string): string {
  return createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
}

export function createSessionToken(): string {
  const payload: SessionPayload = {
    sub: "admin",
    exp: Date.now() + SESSION_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = sign(body);
  return `${body}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  try {
    const [body, sig] = token.split(".");
    if (!body || !sig) return false;
    const expected = sign(body);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as SessionPayload;
    if (payload.sub !== "admin") return false;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  if (!password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(ADMIN_PASSWORD);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function sessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const jar = await cookies();
    return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
  } catch {
    return false;
  }
}

export function generateId(prefix = "id"): string {
  return `${prefix}_${randomBytes(8).toString("hex")}`;
}
