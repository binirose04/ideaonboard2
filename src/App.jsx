import { useEffect, useMemo, useState } from "react";
import "./styles.css";

import { USER_FLOW } from "./config";
import { ONBOARDING_SESSIONS } from "./data/onboarding";
import {
  getInitialEmbedMode,
  getInitialLanguage,
  getInitialPage,
  getInitialUserFlow,
  getSavedProgress,
  isValidEmail,
  normalizeEmail,
  saveProgress,
} from "./utils/storage";
import { checkEmailAccess, submitEmailToGoogleForm } from "./utils/emailAccess";
import { formatMonthLabel, getInitialCalendarMonth, getMonthDays } from "./utils/date";

import Header from "./components/shared/Header";
import Drawer from "./components/shared/Drawer";
import EmailGateModal from "./components/shared/EmailGateModal";
import Lightbox from "./components/shared/Lightbox";
import AppText from "./components/shared/AppText";
import HomePage from "./components/home/HomePage";
import StandardOnboardingPage from "./components/standard/StandardOnboardingPage";
import EnterpriseOnboardingPage from "./components/enterprise/EnterpriseOnboardingPage";

export default function App() {
  const [lang, setLang] = useState(getInitialLanguage);
  const [page, setPage] = useState(getInitialPage);
  const [drawer, setDrawer] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [emailGateOpen, setEmailGateOpen] = useState(false);
  const [emailValue, setEmailValue] = useState(() => getSavedProgress().email || "");
  const [emailStatus, setEmailStatus] = useState("idle");
  const [userFlow, setUserFlow] = useState(getInitialUserFlow);
  const [calendarMonth, setCalendarMonth] = useState(getInitialCalendarMonth);
  const [bimGroup, setBimGroup] = useState(getSavedProgress().bimGroup || "all");
  const [bimType, setBimType] = useState(getSavedProgress().bimType || "");
  const [embedMode] = useState(getInitialEmbedMode);

  const sessionsByDate = useMemo(() => new Map(ONBOARDING_SESSIONS.map((session) => [session.date, session])), []);
  const calendarDays = useMemo(() => getMonthDays(calendarMonth), [calendarMonth]);
  const monthLabel = formatMonthLabel(calendarMonth, lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    saveProgress({ lang });
  }, [lang]);

  useEffect(() => {
    saveProgress({ page });

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("step", page === 1 ? "home" : "onboarding");
      if (lang === "ar") url.searchParams.set("lang", "ar");
      else url.searchParams.delete("lang");
      if (embedMode) url.searchParams.set("embed", "1");
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, lang, embedMode]);

  useEffect(() => {
    saveProgress({ bimGroup, bimType });
  }, [bimGroup, bimType]);

  useEffect(() => {
    document.body.classList.toggle("is-embed-mode", embedMode);
    return () => document.body.classList.remove("is-embed-mode");
  }, [embedMode]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDrawer(null);
        setLightbox(null);
        setEmailGateOpen(false);
        document.body.style.overflow = "";
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer || lightbox || emailGateOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer, lightbox, emailGateOpen]);

  useEffect(() => {
    if (page === 2 && !userFlow) {
      setPage(1);
      setEmailGateOpen(true);
    }
  }, [page, userFlow]);

  function toggleLanguage() {
    setLang((current) => (current === "en" ? "ar" : "en"));
  }

  function openSessionRegistration(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function focusScheduleMonth(delta) {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  }

  function openEmailGate() {
    setEmailStatus("idle");
    setEmailGateOpen(true);
  }

  function closeEmailGate() {
    setEmailGateOpen(false);
    setEmailStatus("idle");
  }

  async function completeEmailGate() {
    const cleanEmail = normalizeEmail(emailValue);

    if (!isValidEmail(cleanEmail)) {
      setEmailStatus("invalid");
      return;
    }

    setEmailStatus("checking");
    const accessResult = await checkEmailAccess(cleanEmail);

    if (!accessResult.ok) {
      setUserFlow(null);
      setEmailStatus("notFound");
      return;
    }

    setEmailStatus("saving");
    setUserFlow(accessResult.flow);
    saveProgress({ email: cleanEmail, userFlow: accessResult.flow });
    submitEmailToGoogleForm(cleanEmail);
    setEmailGateOpen(false);
    setPage(2);
  }

  return (
    <>
      <div id="onboarding-app" className={`${lang}-active${embedMode ? " embed-mode" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"}>
        <Header lang={lang} toggleLanguage={toggleLanguage} />

        <div className="main-card compact-onboarding-card">
          {page === 2 && (
            <nav className="nav-bar onboarding-single-nav" aria-label="Onboarding navigation">
              <button type="button" className="nav-item active" onClick={() => setPage(2)}>
                <i className="ph ph-rocket-launch" />
                <AppText en="ONBOARDING" ar="الانطلاق" />
              </button>
            </nav>
          )}

          <main className="content-area">
            {page === 1 ? (
              <HomePage openEmailGate={openEmailGate} openDrawer={setDrawer} />
            ) : userFlow === USER_FLOW.ENTERPRISE ? (
              <EnterpriseOnboardingPage openDrawer={setDrawer} setPage={setPage} userEmail={emailValue} />
            ) : (
              <StandardOnboardingPage openDrawer={setDrawer} setPage={setPage} userEmail={emailValue} />
            )}
          </main>
        </div>
      </div>

      <Drawer
        drawer={drawer}
        closeDrawer={() => setDrawer(null)}
        lang={lang}
        bimGroup={bimGroup}
        setBimGroup={setBimGroup}
        bimType={bimType}
        setBimType={setBimType}
        calendarMonth={calendarMonth}
        monthLabel={monthLabel}
        focusScheduleMonth={focusScheduleMonth}
        calendarDays={calendarDays}
        sessionsByDate={sessionsByDate}
        openSessionRegistration={openSessionRegistration}
        openLightbox={setLightbox}
      />

      <EmailGateModal
        isOpen={emailGateOpen}
        lang={lang}
        emailValue={emailValue}
        emailStatus={emailStatus}
        setEmailValue={setEmailValue}
        setEmailStatus={setEmailStatus}
        closeEmailGate={closeEmailGate}
        completeEmailGate={completeEmailGate}
      />

      <Lightbox lightbox={lightbox} closeLightbox={() => setLightbox(null)} />
    </>
  );
}
