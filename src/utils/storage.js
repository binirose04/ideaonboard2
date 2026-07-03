import { ENTERPRISE_MAX_VIDEO_VIEWS, STANDARD_MAX_VIDEO_VIEWS, STORAGE_KEY, USER_FLOW } from "../config";

export function getSavedProgress() {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveProgress(patch) {
  if (typeof window === "undefined") return;

  const current = getSavedProgress();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    }),
  );
}

export function getInitialLanguage() {
  if (typeof window === "undefined") return "en";

  const params = new URLSearchParams(window.location.search);
  const saved = getSavedProgress();
  const lang = params.get("lang") || saved.lang;

  return lang === "ar" ? "ar" : "en";
}

export function getInitialPage() {
  if (typeof window === "undefined") return 1;

  const params = new URLSearchParams(window.location.search);
  const stepParam = params.get("step") || params.get("page") || window.location.hash.replace("#", "");
  const saved = getSavedProgress();
  const normalized = String(stepParam || "").trim().toLowerCase();

  if (["2", "onboarding", "process", "setup"].includes(normalized)) return 2;
  if (["1", "home", "homepage", "overview"].includes(normalized)) return 1;

  return saved.page === 2 ? 2 : 1;
}

export function getInitialEmbedMode() {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);
  return params.get("embed") === "1" || params.get("embed") === "true";
}

export function getInitialUserFlow() {
  const saved = getSavedProgress();
  return Object.values(USER_FLOW).includes(saved.userFlow) ? saved.userFlow : null;
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function getEnterpriseVideoViewKey(emailAddress) {
  const normalizedEmail = normalizeEmail(emailAddress);
  return `${STORAGE_KEY}:enterprise-video-views:${normalizedEmail || "anonymous"}`;
}

export function getEnterpriseVideoViews(emailAddress) {
  if (typeof window === "undefined") return 0;

  const rawValue = window.localStorage.getItem(getEnterpriseVideoViewKey(emailAddress));
  const parsedValue = Number.parseInt(rawValue || "0", 10);

  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 0;
}

export function saveEnterpriseVideoViews(emailAddress, count) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    getEnterpriseVideoViewKey(emailAddress),
    String(Math.min(Math.max(count, 0), ENTERPRISE_MAX_VIDEO_VIEWS)),
  );
}

export function getStandardVideoViewKey(emailAddress) {
  const normalizedEmail = normalizeEmail(emailAddress);
  return `${STORAGE_KEY}:standard-video-views:${normalizedEmail || "anonymous"}`;
}

export function getStandardVideoViews(emailAddress) {
  if (typeof window === "undefined") return 0;

  const rawValue = window.localStorage.getItem(getStandardVideoViewKey(emailAddress));
  const parsedValue = Number.parseInt(rawValue || "0", 10);

  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 0;
}

export function saveStandardVideoViews(emailAddress, count) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    getStandardVideoViewKey(emailAddress),
    String(Math.min(Math.max(count, 0), STANDARD_MAX_VIDEO_VIEWS)),
  );
}
