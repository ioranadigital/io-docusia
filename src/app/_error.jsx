"use client";

export const dynamic = "force-dynamic";

export default function ErrorBoundary({ error, reset }) {
  return (
    <div style={{ padding: "2rem", textAlign: "center", minHeight: "100vh" }}>
      <h1>Oops! Something went wrong</h1>
      <p>{error?.message || "An unexpected error occurred"}</p>
      <button
        onClick={reset}
        style={{
          padding: "0.5rem 1rem",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Try again
      </button>
    </div>
  );
}
