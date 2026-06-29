import { ONBOARDING_SESSIONS } from "../data/onboarding";

export function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatSessionDate(dateString, lang = "en") {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-AE" : "en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(parseLocalDate(dateString));
}

export function formatMonthLabel(date, lang = "en") {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-AE" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getMonthDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let day = 1; day <= totalDays; day += 1) cells.push(toDateKey(new Date(year, month, day)));
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
}

export function getInitialCalendarMonth() {
  return ONBOARDING_SESSIONS[0]?.date ? parseLocalDate(ONBOARDING_SESSIONS[0].date) : new Date();
}
