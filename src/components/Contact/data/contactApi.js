export async function submitContact(payload) {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Contact submission error:", error);
    return { ok: false, reason: "network_error" };
  }
}
