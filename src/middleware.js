import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "./lib/auth";

const PUBLIC_PATHS = ["/login", "/api/login", "/api/health"];

export async function middleware(req) {
  // El muro solo aplica en producción; en local (pnpm dev) no bloquea nada.
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const secret = process.env.DOCUSIA_AUTH_SECRET;
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (secret && (await verifyAuthToken(token, secret))) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
