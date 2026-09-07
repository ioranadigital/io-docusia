import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, createAuthToken } from "../../../lib/auth";

const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 días

// Rate limiting simple en memoria (proceso único en el contenedor de producción).
const attempts = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > 15 * 60 * 1000) {
    attempts.set(ip, { count: 1, first: now });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count += 1;
  return false;
}

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera 15 minutos." },
      { status: 429 }
    );
  }

  const validUser = process.env.DOCUSIA_AUTH_USER;
  const validPass = process.env.DOCUSIA_AUTH_PASS;
  const secret = process.env.DOCUSIA_AUTH_SECRET;

  if (!validUser || !validPass || !secret) {
    return NextResponse.json(
      { error: "Muro de autenticación no configurado en este entorno." },
      { status: 500 }
    );
  }

  const { email, password } = await req.json().catch(() => ({ email: "", password: "" }));

  if (email !== validUser || password !== validPass) {
    return NextResponse.json({ error: "Credenciales incorrectas." }, { status: 401 });
  }

  const token = await createAuthToken(secret, MAX_AGE_MS);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_MS / 1000,
    path: "/",
  });
  return res;
}
