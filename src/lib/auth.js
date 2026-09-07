// Cookie firmado con HMAC-SHA256 (Web Crypto, compatible con Edge y Node runtime).
// No requiere Buffer para poder ejecutarse dentro del middleware de Next.js.

export const AUTH_COOKIE_NAME = "docusia_auth";

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(secret, data) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return toHex(signature);
}

export async function createAuthToken(secret, maxAgeMs) {
  const expiresAt = Date.now() + maxAgeMs;
  const signature = await hmac(secret, String(expiresAt));
  return `${expiresAt}.${signature}`;
}

export async function verifyAuthToken(token, secret) {
  if (!token) return false;
  const [expiresAtStr, signature] = token.split(".");
  if (!expiresAtStr || !signature) return false;

  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expected = await hmac(secret, expiresAtStr);
  return expected === signature;
}
