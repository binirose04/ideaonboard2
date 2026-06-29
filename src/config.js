export const STORAGE_KEY = "gsd-idea-onboarding-progress";

export const USER_FLOW = {
  STANDARD: "standard",
  ENTERPRISE: "enterprise",
};

export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfMbStwFSczyhFgcX8_QRBuoM5xcgW5mxIORjuhzXfj5o4OKQ/formResponse";
export const GOOGLE_FORM_EMAIL_ENTRY_ID = "entry.259862658";

// Put your n8n / backend webhook URL in Vercel as VITE_EMAIL_CHECK_ENDPOINT.
// The webhook should check the OneDrive Excel sheet and return only: { ok: true, flow: "standard" | "enterprise" } or { ok: false }.
export const EMAIL_CHECK_API_URL =
  import.meta.env.VITE_EMAIL_CHECK_ENDPOINT || "/api/onboarding/check-email";

// Local-only testing. Keep false in production. Set VITE_ENABLE_DEV_EMAIL_FALLBACK=true only while testing locally.
export const ENABLE_DEV_EMAIL_FALLBACK = import.meta.env.VITE_ENABLE_DEV_EMAIL_FALLBACK === "true";
export const DEV_EMAIL_ACCESS_OVERRIDES = new Map([
  ["abc@gmail.com", USER_FLOW.STANDARD],
  ["bini.rose04@gmail.com", USER_FLOW.ENTERPRISE],
]);

export const ENTERPRISE_ONBOARDING_VIDEO_URL =
  import.meta.env.VITE_ENTERPRISE_ONBOARDING_VIDEO_URL || "/assets/enterprise-onboarding.mp4";
export const ENTERPRISE_MAX_VIDEO_VIEWS = 3;
