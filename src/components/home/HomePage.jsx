import AppText from "../shared/AppText";

export default function HomePage({ openEmailGate, openDrawer }) {
  const supportCards = [
    {
      type: "community",
      icon: "ph-users-three",
      labelEn: "Community",
      labelAr: "المجتمع",
      copyEn: "Regional user group, technical updates and webinar announcements.",
      copyAr: "مجموعة المستخدمين الإقليمية والتحديثات الفنية وإعلانات الندوات.",
    },
    {
      type: "licence",
      icon: "ph-stack",
      labelEn: "Licence setup",
      labelAr: "إعداد الترخيص",
      copyEn: "Admin access, user creation and activation guidance.",
      copyAr: "وصول المسؤول وإنشاء المستخدمين وإرشادات التفعيل.",
    },
    {
      type: "resources",
      icon: "ph-books",
      labelEn: "Resources",
      labelAr: "المراجع",
      copyEn: "Support Center, Viewer, Connection Library and BIM links.",
      copyAr: "مركز الدعم والعارض ومكتبة الوصلات وروابط BIM.",
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
                <i className="ph ph-arrow-up-right home-support-arrow" />
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
