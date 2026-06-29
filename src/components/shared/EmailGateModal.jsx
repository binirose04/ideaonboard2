import AppText from "./AppText";

export default function EmailGateModal({
  isOpen,
  lang,
  emailValue,
  emailStatus,
  setEmailValue,
  setEmailStatus,
  closeEmailGate,
  completeEmailGate,
}) {
  if (!isOpen) return null;

  const isBusy = emailStatus === "checking" || emailStatus === "saving";
  const statusMessage = {
    idle: "",
    checking: lang === "ar" ? "جارٍ التحقق من البريد الإلكتروني..." : "Checking email access...",
    saving: lang === "ar" ? "جارٍ حفظ البريد الإلكتروني..." : "Saving your email...",
    invalid: lang === "ar" ? "يرجى إدخال بريد إلكتروني صحيح مثل engineer@company.com." : "Please enter a valid email such as engineer@company.com.",
    notFound: lang === "ar" ? "هذا البريد الإلكتروني غير مرتبط بمساحة تأهيل مسجلة." : "This email is not linked to a registered onboarding workspace.",
    failed: lang === "ar" ? "تعذر التحقق الآن. حاول مرة أخرى." : "Could not verify access right now. Try again.",
  }[emailStatus] || "";

  return (
    <div
      className={`email-gate-overlay active ${lang}-active`}
      dir={lang === "ar" ? "rtl" : "ltr"}
      onClick={closeEmailGate}
    >
      <div
        className="email-gate-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="emailGateTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="email-gate-close" onClick={closeEmailGate} aria-label="Close">
          ×
        </button>

        <div className="email-gate-kicker">GSD IDEA</div>
        <AppText
          as="h2"
          className="email-gate-title"
          en="Verify your workspace email"
          ar="تحقق من بريد مساحة العمل"
        />
        <AppText
          as="p"
          className="email-gate-copy"
          en="Enter your registered official email ID before opening the onboarding page. We use this to confirm the correct workspace access."
          ar="أدخل بريدك الإلكتروني الرسمي المسجل قبل فتح صفحة التأهيل. يساعد ذلك في ربط الوصول إلى الجلسة بمساحة العمل الصحيحة."
        />

        <label htmlFor="userEmailInput" className="email-gate-label">
          <AppText en="Official email ID" ar="البريد الإلكتروني الرسمي" />
        </label>
        <input
          type="email"
          id="userEmailInput"
          className="email-gate-input"
          placeholder="engineer@company.com"
          value={emailValue}
          disabled={isBusy}
          onChange={(event) => {
            setEmailValue(event.target.value);
            setEmailStatus("idle");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") completeEmailGate();
          }}
          autoFocus
        />

        {statusMessage && <p className="email-gate-status" aria-live="polite">{statusMessage}</p>}

        <AppText
          as="p"
          className="email-gate-note"
          en="Your email is checked against the registered onboarding list. Access opens only after verification."
          ar="نستخدم هذا للتحقق من تخصيص مساحة العمل والحفاظ على وضوح الوصول إلى التأهيل."
        />

        <div className="email-gate-actions">
          <button type="button" className="secondary-action-btn" onClick={closeEmailGate} disabled={isBusy}>
            <AppText en="Cancel" ar="إلغاء" />
          </button>
          <button type="button" className="primary-action-btn" onClick={completeEmailGate} disabled={isBusy}>
            <AppText en={isBusy ? "Checking..." : "Continue"} ar={isBusy ? "جارٍ التحقق..." : "متابعة"} />
            <i className="ph ph-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
}
