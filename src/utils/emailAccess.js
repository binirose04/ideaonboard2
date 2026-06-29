const EMAIL_CHECK_ENDPOINT =
  import.meta.env.VITE_EMAIL_CHECK_ENDPOINT || "/api/check-onboarding-email";

export async function checkEmailAccess(email) {
  try {
    const response = await fetch(EMAIL_CHECK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      return { ok: false };
    }

    const data = await response.json();

    if (!data?.ok || !["standard", "enterprise"].includes(data.flow)) {
      return { ok: false };
    }

    return {
      ok: true,
      flow: data.flow,
    };
  } catch (error) {
    console.error("Email access check failed:", error);
    return { ok: false };
  }
}