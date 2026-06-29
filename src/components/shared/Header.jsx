import AppText from "./AppText";

export default function Header({ lang, toggleLanguage }) {
  return (
    <header className="brand-header refined-brand-header">
      <div className="brand-logo">
        <img src="/assets/idea.PNG" alt="IDEA StatiCa Authorised Reseller" />
      </div>

      <div className="brand-header-tools">
        <div className="lang-bar" aria-label="Language selector">
          <button
            type="button"
            className={`lang-toggle ${lang === "ar" ? "ar-selected" : ""}`}
            dir="ltr"
            onClick={toggleLanguage}
            aria-label="Switch language"
          >
            <div className="lang-toggle-slider" />
            <div className={`lang-option ${lang === "en" ? "active" : ""}`}>EN</div>
            <div className={`lang-option ${lang === "ar" ? "active" : ""}`}>AR</div>
          </button>
        </div>

        <div className="partner-logo">
          <img src="/assets/gsd.PNG" alt="GSD IDEA" />
        </div>
      </div>
    </header>
  );
}
