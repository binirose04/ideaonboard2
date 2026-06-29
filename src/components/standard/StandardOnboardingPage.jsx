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

      <div className="final-session-panel standard-session-panel">
        <div>
          <AppText as="strong" en="Live onboarding session" ar="جلسة التأهيل المباشرة" />
          <AppText
            as="p"
            en="Choose a standard onboarding session after your licence and software access are ready. These sessions are for standard licence users only."
            ar="اختر جلسة تأهيل قياسية بعد جاهزية الترخيص والوصول إلى البرنامج. هذه الجلسات مخصصة لمستخدمي الترخيص القياسي فقط."
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
