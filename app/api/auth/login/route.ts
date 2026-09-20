import {
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
  SESSION_COOKIE,
} from "@/lib/mission/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/mission/api";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    if (!body.password || typeof body.password !== "string") {
      return jsonError("Password is required", 400);
    }
    if (!verifyPassword(body.password)) {
      return jsonError("Invalid credentials", 401);
    }
    const token = createSessionToken();
    const res = jsonOk({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return res;
  } catch (err) {
    return handleApiError(err);
  }
}
