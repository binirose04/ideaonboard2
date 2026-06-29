import AppText from "../shared/AppText";

export default function StandardOnboardingPage({ openDrawer, setPage }) {
  return (
    <section className="page active onboarding-process-page standard-onboarding-page">
      <div className="process-header">
        <button type="button" className="text-back-btn" onClick={() => setPage(1)}>
          <i className="ph ph-arrow-left" />
          <AppText en="Back to homepage" ar="العودة للصفحة الرئيسية" />
        </button>
      </div>

      <div className="final-session-panel">
        <div>
          <AppText as="strong" en="Live onboarding session" ar="جلسة التأهيل المباشرة" />
          <AppText
            as="p"
            en="Choose a session after the setup checks are clear. If licence access is not ready, fix that before joining. Watching someone else use software is not training."
            ar="اختر جلسة بعد إكمال بنود التجهيز. إذا لم يكن الوصول إلى الترخيص جاهزًا، عالج ذلك قبل الانضمام."
          />
        </div>
        <button type="button" className="primary-action-btn" onClick={() => openDrawer({ type: "schedule" })}>
          <AppText en="Book onboarding session" ar="حجز جلسة التأهيل" />
          <i className="ph ph-calendar-check" />
        </button>
      </div>
    </section>
  );
}
