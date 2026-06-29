import AppText from "../shared/AppText";

export default function HomePage({ openEmailGate, openDrawer }) {
  const supportCards = [
    {
      type: "community",
      icon: "ph-users-three",
      labelEn: "Community",
      labelAr: "المجتمع",
      copyEn: "Gulf user group, webinars and regional engineering updates.",
      copyAr: "مجموعة المستخدمين الخليجية والندوات والتحديثات الهندسية الإقليمية.",
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
      copyEn: "Support centre, viewer, connection library and BIM links.",
      copyAr: "مركز الدعم والعارض ومكتبة الوصلات وروابط BIM.",
    },
  ];

  return (
    <section className="page active home-landing-page">
      <div className="home-hero-grid">
        <div className="home-hero-copy">
          <div className="roadmap-eyebrow">
            <i className="ph-fill ph-handshake" />
            <AppText en="Structured onboarding" ar="التأهيل المنظم" />
          </div>

          <AppText
            as="h1"
            en="Welcome to IDEA StatiCa Onboarding"
            ar="مرحبًا بكم في تأهيل IDEA StatiCa"
          />

          <AppText
            as="p"
            en="A short setup path for structural engineers who need to get working, not browse five tabs before touching the software."
            ar="مسار تجهيز مختصر للمهندسين الإنشائيين الذين يريدون البدء بالعمل دون التنقل بين عدة تبويبات."
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
            <AppText as="span" className="support-panel-kicker" en="Before the session" ar="قبل الجلسة" />
            <AppText as="strong" en="Open only what you need" ar="افتح ما تحتاجه فقط" />
            <AppText
              as="p"
              en="Community, licence and reference links are kept here as clean drawer actions instead of crowding the onboarding path."
              ar="تم وضع المجتمع والترخيص والمراجع هنا كإجراءات جانبية واضحة بدل ازدحام مسار التأهيل."
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
