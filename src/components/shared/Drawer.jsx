import { BIM_GROUPS, BIM_TYPES, ONBOARDING_SESSIONS, PRE_ONBOARDING_TASKS } from "../../data/onboarding";
import { formatSessionDate, parseLocalDate } from "../../utils/date";
import AppText from "./AppText";
import ExternalLink from "./ExternalLink";

export default function Drawer({
  drawer,
  closeDrawer,
  lang,
  bimGroup,
  setBimGroup,
  bimType,
  setBimType,
  bimLink,
  calendarMonth,
  monthLabel,
  focusScheduleMonth,
  calendarDays,
  sessionsByDate,
  openSessionRegistration,
  openLightbox,
}) {
  if (!drawer) return null;

  const title = getDrawerTitle(drawer);

  return (
    <div
      className={`onboarding-drawer-overlay active ${lang}-active`}
      dir={lang === "ar" ? "rtl" : "ltr"}
      onClick={closeDrawer}
    >
      <aside
        className="onboarding-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={lang === "ar" ? title.ar : title.en}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer-header">
          <div>
            <span className="drawer-kicker">GSD IDEA</span>
            <AppText as="h2" en={title.en} ar={title.ar} />
          </div>
          <button type="button" className="drawer-close-btn" onClick={closeDrawer} aria-label="Close drawer">
            ×
          </button>
        </div>

        <div className="drawer-body">
          {drawer.type === "community" && <CommunityDrawer />}
          {drawer.type === "licence" && <LicenceDrawer openLightbox={openLightbox} />}
          {drawer.type === "resources" && (
            <ResourcesDrawer
              bimGroup={bimGroup}
              setBimGroup={setBimGroup}
              bimType={bimType}
              setBimType={setBimType}
              bimLink={bimLink}
            />
          )}
          {(drawer.type === "schedule" || drawer.type === "ama") && (
            <ScheduleDrawer
              lang={lang}
              mode={drawer.type === "ama" ? "ama" : "onboarding"}
              calendarMonth={calendarMonth}
              monthLabel={monthLabel}
              focusScheduleMonth={focusScheduleMonth}
              calendarDays={calendarDays}
              sessionsByDate={sessionsByDate}
              openSessionRegistration={openSessionRegistration}
            />
          )}
          {drawer.type === "task" && <TaskDrawer task={drawer.task} />}
        </div>
      </aside>
    </div>
  );
}

function getDrawerTitle(drawer) {
  if (drawer.type === "community") return { en: "Community", ar: "المجتمع" };
  if (drawer.type === "licence") return { en: "Licence setup", ar: "إعداد الترخيص" };
  if (drawer.type === "resources") return { en: "Resources", ar: "المراجع" };
  if (drawer.type === "schedule") return { en: "Onboarding sessions", ar: "جلسات التأهيل" };
  if (drawer.type === "ama") return { en: "Schedule AMA", ar: "جدولة جلسة أسئلة" };
  if (drawer.type === "task") return { en: drawer.task.titleEn, ar: drawer.task.titleAr };
  return { en: "Details", ar: "التفاصيل" };
}

function CommunityDrawer() {
  return (
    <div className="drawer-section-stack">
      <p className="drawer-intro">
        <AppText
          en="Join the IDEA StatiCa Gulf User Group for regional webinars, updates and structural engineering discussions."
          ar="انضم إلى مجموعة مستخدمي IDEA StatiCa Gulf للحصول على الندوات والتحديثات والمناقشات الهندسية الإقليمية."
        />
      </p>

      <div className="community-drawer-card">
        <div className="linkedin-embed-banner">
          <img src="/assets/licover.jpeg" alt="IDEA StatiCa Gulf banner" className="linkedin-banner-image" />
        </div>
        <div className="linkedin-embed-body compact-linkedin-body">
          <div className="linkedin-embed-logo-wrap">
            <div className="linkedin-embed-logo">
              <img src="/assets/lidp.jpeg" alt="IDEA StatiCa Gulf group logo" />
            </div>
          </div>
          <div className="linkedin-embed-meta">
            <div className="linkedin-embed-platform">
              <i className="ph-fill ph-linkedin-logo" />
              <AppText en="LinkedIn Group" ar="مجموعة LinkedIn" />
            </div>
            <AppText as="h3" className="linkedin-embed-title" en="IDEA StatiCa Gulf - User Group" ar="مجموعة مستخدمي IDEA StatiCa Gulf" />
            <AppText as="p" className="linkedin-embed-subtitle" en="Private group for regional structural engineering users." ar="مجموعة خاصة لمستخدمي الهندسة الإنشائية في المنطقة." />
          </div>
          <ExternalLink href="https://www.linkedin.com/groups/14652083/" className="linkedin-open-btn">
            <i className="ph-fill ph-linkedin-logo" />
            <AppText en="Request access" ar="طلب الانضمام" />
          </ExternalLink>
        </div>
      </div>

      <div className="drawer-mini-grid">
        <MiniInfo icon="ph-presentation-chart" en="Regional technical webinars" ar="ندوات فنية إقليمية" />
        <MiniInfo icon="ph-lightbulb" en="Tips and design insights" ar="نصائح ورؤى تصميمية" />
        <MiniInfo icon="ph-graduation-cap" en="Educational session updates" ar="تحديثات الجلسات التعليمية" />
        <MiniInfo icon="ph-chat-circle-text" en="AMA sessions" ar="جلسات AMA" />
      </div>
    </div>
  );
}

function LicenceDrawer({ openLightbox }) {
  const steps = [
    {
      img: "/assets/step1.jpeg",
      alt: "Admin Portal Login screenshot",
      eyebrowEn: "Step 01",
      eyebrowAr: "الخطوة 01",
      titleEn: "Admin portal login",
      titleAr: "تسجيل الدخول لبوابة المسؤول",
      textEn: "Identify the assigned licence administrator from the email you received. That administrator must sign in to the User Portal.",
      textAr: "حدد مسؤول الترخيص من الرسالة التي استلمتها. يجب على هذا المسؤول تسجيل الدخول إلى بوابة المستخدم.",
      pointsEn: ["Each licence pool has one administrator.", "Use the administrator email from the onboarding email.", "Only the admin can add users to the pool."],
      pointsAr: ["لكل مجموعة تراخيص مسؤول واحد.", "استخدم بريد المسؤول من رسالة التأهيل.", "المسؤول فقط يمكنه إضافة المستخدمين."],
    },
    {
      img: "/assets/step2.jpeg",
      alt: "User Creation in License Pool screenshot",
      eyebrowEn: "Step 02",
      eyebrowAr: "الخطوة 02",
      titleEn: "Create user in licence pool",
      titleAr: "إنشاء مستخدم في مجموعة التراخيص",
      textEn: "Inside License Users, select Create New User and add the user's official email address.",
      textAr: "داخل License Users، اختر Create New User وأضف البريد الرسمي للمستخدم.",
      pointsEn: ["Open the License Users tab.", "Select Create New User.", "Use the correct company email."],
      pointsAr: ["افتح تبويب License Users.", "اختر Create New User.", "استخدم البريد الرسمي الصحيح."],
    },
    {
      img: "/assets/step3.jpeg",
      alt: "User Migration and License Activation screenshot",
      eyebrowEn: "Step 03",
      eyebrowAr: "الخطوة 03",
      titleEn: "Migrate or activate user",
      titleAr: "ترحيل أو تفعيل المستخدم",
      textEn: "If the user already has a trial account, migrate it into the commercial licence pool, then sign in again.",
      textAr: "إذا كان المستخدم لديه حساب تجريبي، قم بترحيله إلى مجموعة الترخيص التجاري ثم سجل الدخول مرة أخرى.",
      pointsEn: ["Use Migrate User for existing or trial users.", "Save the username after selection.", "Log in again after activation."],
      pointsAr: ["استخدم Migrate User للمستخدمين الحاليين أو التجريبيين.", "احفظ اسم المستخدم بعد التحديد.", "سجل الدخول مرة أخرى بعد التفعيل."],
    },
  ];

  return (
    <div className="drawer-section-stack">
      <p className="drawer-intro">
        <AppText
          en="Use this only when licence access is not ready. Everyone else can skip portal instructions."
          ar="استخدم هذا فقط إذا لم يكن الوصول إلى الترخيص جاهزًا. يمكن للآخرين تجاوز تعليمات البوابة."
        />
      </p>

      {steps.map((step) => (
        <article className="drawer-protocol-card" key={step.titleEn}>
          <button type="button" className="protocol-img-placeholder" onClick={() => openLightbox({ src: step.img, alt: step.alt })}>
            <img src={step.img} alt={step.alt} />
            <span className="protocol-img-hint">
              <i className="ph ph-magnifying-glass-plus" />
            </span>
          </button>
          <div className="protocol-content compact-protocol-copy">
            <span className="protocol-eyebrow lang-en">{step.eyebrowEn}</span>
            <span className="protocol-eyebrow lang-ar">{step.eyebrowAr}</span>
            <h3 className="protocol-title lang-en">{step.titleEn}</h3>
            <h3 className="protocol-title lang-ar">{step.titleAr}</h3>
            <p className="protocol-desc lang-en">{step.textEn}</p>
            <p className="protocol-desc lang-ar">{step.textAr}</p>
            <ul className="protocol-points lang-en">
              {step.pointsEn.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <ul className="protocol-points lang-ar">
              {step.pointsAr.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

function ResourcesDrawer({ bimGroup, setBimGroup, bimType, setBimType, bimLink }) {
  return (
    <div className="drawer-section-stack">
      <p className="drawer-intro">
        <AppText
          en="Useful links for setup and future work. Not required reading unless something is unclear. A rare sensible boundary."
          ar="روابط مفيدة للتجهيز والعمل لاحقًا. ليست قراءة إلزامية إلا إذا كان هناك شيء غير واضح."
        />
      </p>

      <div className="resource-link-list">
        {PRE_ONBOARDING_TASKS.map((task) => (
          <ExternalLink key={task.id} href={task.href} className="resource-link-card">
            <i className={`ph ${task.icon}`} />
            <span>
              <strong className="lang-en">{task.titleEn}</strong>
              <strong className="lang-ar">{task.titleAr}</strong>
              <small className="lang-en">{task.actionEn}</small>
              <small className="lang-ar">{task.actionAr}</small>
            </span>
          </ExternalLink>
        ))}
      </div>

      <div className="bim-picker-box">
        <AppText as="h3" en="Find your BIM integration" ar="ابحث عن تكامل BIM" />
        <div className="bim-group-row">
          {BIM_GROUPS.map((group) => (
            <button
              type="button"
              key={group.value}
              className={`bim-group-btn ${bimGroup === group.value ? "active" : ""}`}
              onClick={() => setBimGroup(group.value)}
            >
              <span className="lang-en">{group.labelEn}</span>
              <span className="lang-ar">{group.labelAr}</span>
            </button>
          ))}
        </div>
        <select value={bimType} onChange={(event) => setBimType(event.target.value)} className="bim-select">
          <option value="">Select software</option>
          {BIM_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <ExternalLink href={bimLink} className="download-btn drawer-full-width-btn">
          <AppText en="Open integration guide" ar="فتح دليل التكامل" />
          <i className="ph ph-arrow-right" />
        </ExternalLink>
      </div>
    </div>
  );
}

function ScheduleDrawer({
  lang,
  mode = "onboarding",
  monthLabel,
  focusScheduleMonth,
  calendarDays,
  sessionsByDate,
  openSessionRegistration,
}) {
  const weekDays = lang === "ar"
    ? ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isAma = mode === "ama";

  return (
    <div className="drawer-section-stack">
      <p className="drawer-intro">
        <AppText
          en={isAma ? "Choose an AMA slot after watching the recorded onboarding session. Bring specific model or workflow questions, not vague spiritual confusion." : "Pick the next suitable onboarding slot. Complete access checks before attending."}
          ar={isAma ? "اختر موعد جلسة الأسئلة بعد مشاهدة التسجيل. جهز أسئلة محددة حول النموذج أو سير العمل." : "اختر الموعد المناسب. أكمل بنود الوصول قبل الحضور."}
        />
      </p>

      <section className="schedule-calendar-box">
        <div className="calendar-head compact-calendar-head">
          <button type="button" onClick={() => focusScheduleMonth(-1)} aria-label="Previous month">
            <i className="ph ph-caret-left" />
          </button>
          <strong>{monthLabel}</strong>
          <button type="button" onClick={() => focusScheduleMonth(1)} aria-label="Next month">
            <i className="ph ph-caret-right" />
          </button>
        </div>

        <div className="calendar-grid compact-calendar-grid">
          {weekDays.map((day) => <div className="calendar-weekday" key={day}>{day}</div>)}
          {calendarDays.map((dateKey, index) => {
            const session = dateKey ? sessionsByDate.get(dateKey) : null;
            const dayNumber = dateKey ? parseLocalDate(dateKey).getDate() : "";

            return (
              <button
                type="button"
                key={dateKey || `empty-${index}`}
                className={`calendar-day ${session ? "has-session" : ""}`}
                disabled={!session}
                onClick={() => session && openSessionRegistration(session.demioUrl)}
              >
                <span>{dayNumber}</span>
                {session && <small>{session.time}</small>}
              </button>
            );
          })}
        </div>
      </section>

      <section className="session-list compact-session-list">
        {ONBOARDING_SESSIONS.map((session) => (
          <article className="session-card" key={`${session.date}-${session.title}`}>
            <div>
              <span className="session-date">{formatSessionDate(session.date, lang)} • {session.time}</span>
              <h3>{isAma ? `AMA: ${session.title}` : session.title}</h3>
              <p>{session.duration} • {session.format} • {session.capacity}</p>
            </div>
            <button type="button" className="session-register-btn" onClick={() => openSessionRegistration(session.demioUrl)}>
              <AppText en={isAma ? "Schedule" : "Register"} ar={isAma ? "جدولة" : "تسجيل"} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function TaskDrawer({ task }) {
  return (
    <div className="drawer-section-stack">
      <p className="drawer-intro">
        <span className="lang-en">{task.descriptionEn}</span>
        <span className="lang-ar">{task.descriptionAr}</span>
      </p>

      <div className="task-drawer-flow">
        <span className="quick-flow-label">
          <AppText en="Quick steps" ar="خطوات سريعة" />
        </span>
        <ol>
          {task.stepsEn.map((step) => <li className="lang-en" key={step}>{step}</li>)}
          {task.stepsAr.map((step) => <li className="lang-ar" key={step}>{step}</li>)}
        </ol>
      </div>

      <ExternalLink href={task.href} className="download-btn drawer-full-width-btn">
        <span className="lang-en">{task.actionEn}</span>
        <span className="lang-ar">{task.actionAr}</span>
        <i className="ph ph-arrow-right" />
      </ExternalLink>
    </div>
  );
}

function MiniInfo({ icon, en, ar }) {
  return (
    <div className="mini-info-card">
      <i className={`ph ${icon}`} />
      <AppText as="span" en={en} ar={ar} />
    </div>
  );
}
