import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/mission/auth";
import { jsonOk } from "@/lib/mission/api";

export async function POST() {
  const res = jsonOk({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(0), maxAge: 0 });
  return res;
}
