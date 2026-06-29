const EMAIL_CHECK_ENDPOINT =
  import.meta.env.VITE_EMAIL_CHECK_ENDPOINT || "/api/check-onboarding-email";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfMbStwFSczyhFgcX8_QRBuoM5xcgW5mxIORjuhzXfj5o4OKQ/formResponse";

const GOOGLE_FORM_EMAIL_ENTRY_ID = "entry.259862658";

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