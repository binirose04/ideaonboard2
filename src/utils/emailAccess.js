import { EMAIL_CHECK_API_URL, GOOGLE_FORM_EMAIL_ENTRY_ID, GOOGLE_FORM_URL } from "../config";

export async function checkEmailAccess(email) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(EMAIL_CHECK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      signal: controller.signal,
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
    return { ok: false, failed: true };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function submitEmailToGoogleForm(email) {
  if (!email) return Promise.resolve();

  const formData = new FormData();
  formData.append(GOOGLE_FORM_EMAIL_ENTRY_ID, email);

  return fetch(GOOGLE_FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  }).catch((error) => {
    console.error("Google Form submission failed:", error);
  });
}
