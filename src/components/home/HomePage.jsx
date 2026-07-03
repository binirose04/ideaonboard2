import AppText from "../shared/AppText";

export default function HomePage({ openEmailGate, openDrawer }) {
  const sessionBoxes = [
    { en: "Detailed Steel Session", ar: "جلسة الصلب التفصيلية" },
    { en: "Detailed Concrete Session", ar: "جلسة الخرسانة التفصيلية" },
    { en: "BIM Workflow Session", ar: "جلسة سير عمل BIM" },
  ];

  const supportCards = [
    {
      type: "community",
      icon: "ph-users-three",
      labelEn: "Community",
      labelAr: "المجتمع",
      copyEn: "Technical updates and webinar announcements.",
      copyAr: "مجموعة المستخدمين الإقليمية والتحديثات الفنية وإعلانات الندوات.",
    },
    {
      type: "licence",
      icon: "ph-stack",
      labelEn: "Setup",
      labelAr: "إعداد الترخيص",
      copyEn: "Admin access, user creation and activation guidance.",
      copyAr: "وصول المسؤول وإنشاء المستخدمين وإرشادات التفعيل.",
    },
    {
      type: "resources",
      icon: "ph-books",
      labelEn: "Resources",
      labelAr: "المراجع",
      copyEn: "Support Center, Viewer and Connection Library.",
      copyAr: "مركز الدعم والعارض ومكتبة الوصلات.",
    },
    {
      type: "integrations",
      icon: "ph-plugs-connected",
      labelEn: "Integrations",
      labelAr: "التكاملات",
      copyEn: "Find the exact CAD or FEA integration page.",
      copyAr: "ابحث عن صفحة تكامل CAD أو FEA المناسبة.",
    },
  ];

  return (
    <section className="page active home-landing-page">
      <div className="home-hero-grid">
        <div className="home-hero-copy">
          <div className="roadmap-eyebrow">
            <i className="ph-fill ph-handshake" />
            <AppText en="GSD IDEA onboarding" ar="تأهيل GSD IDEA" />
          </div>

          <AppText
            as="h1"
            en="Start working with IDEA StatiCa"
            ar="ابدأ العمل مع IDEA StatiCa"
          />

          <div className="home-session-box-row" aria-label="Onboarding session coverage">
            {sessionBoxes.map((box) => (
              <AppText key={box.en} as="span" en={box.en} ar={box.ar} />
            ))}
          </div>

          <AppText
            as="p"
            en="A focused onboarding path for structural engineers: verify access, open the right workspace, and continue with the training route assigned to your licence type."
            ar="مسار تأهيل واضح للمهندسين الإنشائيين: تحقق من الوصول، وافتح مساحة العمل الصحيحة، وتابع مسار التدريب المخصص لنوع الترخيص."
          />

          <div className="home-action-row">
            <button type="button" className="primary-action-btn" onClick={openEmailGate}>
              <AppText en="Start onboarding" ar="بدء التأهيل" />
              <i className="ph ph-arrow-right" />
            </button>
          </div>
        </div>

        <aside className="home-support-panel" aria-label="Supporting setup information">
          <div className="home-support-panel-header">
            <AppText as="span" className="support-panel-kicker" en="Quick access" ar="وصول سريع" />
            <AppText as="strong" en="Open only what you need" ar="افتح ما تحتاجه فقط" />
            <AppText
              as="p"
              en="Community, licence and reference links are available as focused drawer actions, keeping the onboarding path clear."
              ar="المجتمع والترخيص والمراجع متاحة كإجراءات جانبية واضحة للحفاظ على مسار التأهيل منظمًا."
            />
          </div>

          <div className="home-support-card-list">
            {supportCards.map((card) => (
              <button
                type="button"
                className="home-support-card"
                key={card.type}
                onClick={() => openDrawer({ type: card.type })}
              >
                <span className="home-support-icon">
                  <i className={`ph ${card.icon}`} />
                </span>
                <span className="home-support-copy">
                  <AppText as="strong" en={card.labelEn} ar={card.labelAr} />
                  <AppText as="span" en={card.copyEn} ar={card.copyAr} />
                </span>
                <span className="home-support-action">
                  <AppText en="Open" ar="فتح" />
                  <i className="ph ph-arrow-right" />
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
