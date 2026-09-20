function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i]!);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): string {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return atob(b64);
}

type SessionPayload = {
  sub: "admin";
  exp: number;
};

/** Edge-safe verify for middleware (Web Crypto HMAC). */
export async function verifySessionTokenEdge(
  token: string | undefined | null,
  secret: string,
): Promise<boolean> {
  if (!token || !secret) return false;
  try {
    const [body, sig] = token.split(".");
    if (!body || !sig) return false;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(body),
    );
    const expected = toBase64Url(signature);
    if (sig.length !== expected.length) return false;
    let mismatch = 0;
    for (let i = 0; i < sig.length; i++) {
      mismatch |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    if (mismatch !== 0) return false;

    const payload = JSON.parse(fromBase64Url(body)) as SessionPayload;
    if (payload.sub !== "admin") return false;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}
