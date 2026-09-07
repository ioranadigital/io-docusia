"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push(next);
        router.refresh();
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data.error || "Credenciales incorrectas.");
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F7FA",
        padding: "1rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#101C3A" }}>
            DOCUSIA
          </div>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.5rem" }}>
            Acceso restringido
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "1rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            border: "1px solid #E2E8F0",
            padding: "2rem",
          }}
        >
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#101C3A", marginBottom: "1.5rem" }}>
            Iniciar sesión
          </h1>

          <label htmlFor="email" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#334155", marginBottom: "0.25rem" }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.625rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid #E2E8F0",
              color: "#0F172A",
              outline: "none",
            }}
            placeholder="tucorreo@docusia.com"
          />

          <label htmlFor="password" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#334155", marginBottom: "0.25rem" }}>
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "1.5rem",
              padding: "0.625rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid #E2E8F0",
              color: "#0F172A",
              outline: "none",
            }}
            placeholder="••••••••"
          />

          {error && (
            <p style={{ fontSize: "0.875rem", color: "#DC2626", marginBottom: "1rem" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
              color: "#fff",
              background: "#101C3A",
              border: "none",
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "background 0.15s",
            }}
          >
            {loading ? "Accediendo..." : "Acceder"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#94A3B8", marginTop: "1.5rem" }}>
          © {new Date().getFullYear()} Docusia. Acceso privado.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
