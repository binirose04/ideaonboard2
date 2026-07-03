import { useState } from "react";
import { ENTERPRISE_AMA_SCHEDULER_URL } from "../../config";
import { BIM_GROUPS, BIM_INTEGRATIONS, BIM_MATERIALS, getBimIntegrationByValue, ONBOARDING_SESSIONS, PRE_ONBOARDING_TASKS } from "../../data/onboarding";
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
            <ResourcesDrawer />
          )}
          {drawer.type === "integrations" && (
            <IntegrationsDrawer
              bimGroup={bimGroup}
              setBimGroup={setBimGroup}
              bimType={bimType}
              setBimType={setBimType}
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
  if (drawer.type === "integrations") return { en: "Integrations", ar: "التكاملات" };
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

const RESOURCE_DETAIL_COPY = {
  install: {
    heroTitleEn: "IDEA STATICA",
    heroTitleAr: "IDEA STATICA",
    metaEn: "~710 MB FILE • 30-SEC DOWNLOAD • 1-MIN INSTALLATION",
    metaAr: "ملف ~710 ميجابايت • تنزيل 30 ثانية • تثبيت 1 دقيقة",
    summaryEn: "Automatically detects your FEA/CAD software and activates relevant BIM links to streamline your workflow.",
    summaryAr: "يكتشف تلقائياً برنامج FEA/CAD الخاص بك ويفعل روابط BIM المناسبة لتبسيط سير عملك.",
    detailLabelEn: "Detailed instructions",
    detailLabelAr: "التعليمات المفصلة",
    pointsEn: [
      ["Step 1", "Go to the official IDEA StatiCa download page."],
      ["Step 2", "Download the latest available version of the software."],
      ["Step 3", "Open the installer file once the download is complete."],
      ["Step 4", "Follow the on-screen installation instructions."],
      ["Step 5", "After installation, launch the software to confirm it is working correctly."],
      ["Step 6", "Check that your workstation meets the recommended hardware requirements to ensure smooth and optimal performance."],
    ],
    pointsAr: [
      ["الخطوة 1", "اذهب إلى صفحة التحميل الرسمية لبرنامج IDEA StatiCa."],
      ["الخطوة 2", "قم بتحميل أحدث إصدار متوفر من البرنامج."],
      ["الخطوة 3", "افتح ملف التثبيت بمجرد اكتمال التحميل."],
      ["الخطوة 4", "اتبع تعليمات التثبيت التي تظهر على الشاشة."],
      ["الخطوة 5", "بعد التثبيت، قم بتشغيل البرنامج للتأكد من أنه يعمل بشكل صحيح."],
      ["الخطوة 6", "تحقق من أن جهازك يلبي متطلبات الأجهزة الموصى بها لضمان أداء سلس ومثالي."],
    ],
  },
  "license-reserve": {
    heroTitleEn: "PRODUCT SELECTION",
    heroTitleAr: "تحديد المنتجات",
    metaEn: "SHARED POOL • STEEL & CONCRETE • OFFLINE CAPABLE",
    metaAr: "مجموعة مشتركة • صلب وخرسانة • إمكانية العمل دون اتصال",
    summaryEn: "Choose which IDEA StatiCa products, such as Steel or Concrete, you want to reserve from the shared company license pool.",
    summaryAr: "اختر منتجات IDEA StatiCa، مثل Steel أو Concrete، التي ترغب في حجزها من مجموعة تراخيص الشركة المشتركة.",
    detailLabelEn: "Detailed instructions",
    detailLabelAr: "التعليمات المفصلة",
    pointsEn: [
      ["Step 1", "Open IDEA StatiCa."],
      ["Step 2", "Click the License Setup lock icon in the application."],
      ["Step 3", "In the License configuration window, view the list of available products."],
      ["Step 4", "Select the products you want to use from the license pool."],
      ["Step 5", "Click Reserve products to assign them to your computer."],
      ["Optional", "Enable Keep products reserved if you want to keep the license for offline work."],
    ],
    pointsAr: [
      ["الخطوة 1", "افتح برنامج IDEA StatiCa."],
      ["الخطوة 2", "انقر على إعداد الترخيص، أيقونة القفل، في التطبيق."],
      ["الخطوة 3", "في نافذة تكوين الترخيص، اعرض قائمة المنتجات المتاحة."],
      ["الخطوة 4", "حدد المنتجات التي ترغب في استخدامها من مجموعة التراخيص."],
      ["الخطوة 5", "انقر على Reserve products لتعيينها لجهاز الكمبيوتر الخاص بك."],
      ["اختياري", "قم بتمكين Keep products reserved إذا كنت ترغب في الاحتفاظ بالترخيص للعمل دون اتصال بالإنترنت."],
    ],
  },
  bim: {
    heroTitleEn: "BIM INTEGRATIONS",
    heroTitleAr: "تكاملات BIM",
    metaEn: "FEA & CAD • STEEL & CONCRETE • CHECKBOT",
    metaAr: "FEA و CAD • صلب وخرسانة • CHECKBOT",
    summaryEn: "Explore compatible FEA and CAD integrations, then filter by application or type to find the correct installation guidance.",
    summaryAr: "استكشف تكاملات برامج FEA و CAD المتوافقة، ثم قم بالتصفية حسب التطبيق أو النوع للوصول إلى إرشادات التثبيت المناسبة.",
    detailLabelEn: "Detailed instructions",
    detailLabelAr: "التعليمات المفصلة",
    pointsEn: [
      ["Step 1", "Open the integrations page."],
      ["Step 2", "Select the IDEA StatiCa application, Steel or Concrete, from the right panel."],
      ["Step 3", "Filter the software type, FEA or CAD, if needed."],
      ["Step 4", "Click the software you want to integrate."],
      ["Step 5", "Watch the integration video and follow the provided installation steps."],
      ["Troubleshoot", "If the Checkbot BIM link does not start, refer to the support article from IDEA StatiCa."],
    ],
    pointsAr: [
      ["الخطوة 1", "افتح صفحة التكاملات."],
      ["الخطوة 2", "حدد تطبيق IDEA StatiCa، صلب أو خرسانة، من اللوحة اليمنى."],
      ["الخطوة 3", "قم بتصفية نوع البرنامج، FEA أو CAD، إذا لزم الأمر."],
      ["الخطوة 4", "انقر فوق البرنامج الذي ترغب في ربطه."],
      ["الخطوة 5", "شاهد فيديو الربط واتبع خطوات التثبيت المقدمة."],
      ["استكشاف الأخطاء", "إذا لم يبدأ Checkbot BIM link، فراجع مقال الدعم من IDEA StatiCa."],
    ],
  },
  support: {
    heroTitleEn: "SUPPORT CENTER",
    heroTitleAr: "مركز الدعم",
    metaEn: "LEARNING • DOCUMENTATION • TROUBLESHOOTING",
    metaAr: "التعلم • الوثائق • استكشاف الأخطاء",
    summaryEn: "The IDEA StatiCa Support Center provides guides, tutorials, videos, technical documentation, and troubleshooting information.",
    summaryAr: "يوفر مركز دعم IDEA StatiCa أدلة ودروساً تعليمية ومقاطع فيديو ووثائق فنية ومعلومات حول استكشاف الأخطاء وإصلاحها.",
    detailLabelEn: "Available resources",
    detailLabelAr: "الموارد المتاحة",
    pointsEn: [
      ["Getting Started", "Quick guides to help new users start working with IDEA StatiCa applications."],
      ["Tutorials", "Design examples that demonstrate how to use different features of the software."],
      ["Webinars", "Registration for upcoming webinars and access to recordings of previous sessions."],
      ["Videos", "Short instructional and overview videos about IDEA StatiCa features and workflows."],
      ["Theoretical Background", "Principles and methods used in IDEA StatiCa, including the fundamentals of CBFEM and CSFM."],
      ["Verifications", "Technical papers and validation examples that verify the accuracy of IDEA StatiCa calculations."],
      ["Knowledge Base", "A collection of help articles, tips, and explanations of software features."],
      ["FAQ", "Frequently asked questions about common topics related to IDEA StatiCa applications and methods."],
    ],
    pointsAr: [
      ["دليل البدء", "أدلة سريعة لمساعدة المستخدمين الجدد على بدء العمل مع تطبيقات IDEA StatiCa."],
      ["الدروس التعليمية", "أمثلة تصميمية توضح كيفية استخدام الميزات المختلفة للبرنامج."],
      ["الندوات", "التسجيل للندوات القادمة والوصول إلى تسجيلات الجلسات السابقة."],
      ["الفيديو", "مقاطع فيديو تعليمية وعامة قصيرة حول ميزات وسير عمل IDEA StatiCa."],
      ["الخلفية النظرية", "الخلفية النظرية والمبادئ والطرق المستخدمة في IDEA StatiCa، بما في ذلك أساسيات CBFEM و CSFM."],
      ["التحققات", "أوراق فنية وأمثلة تحقق تثبت دقة حسابات IDEA StatiCa."],
      ["قاعدة المعرفة", "مجموعة من مقالات المساعدة والنصائح وشروحات لميزات البرنامج."],
      ["الأسئلة الشائعة", "الأسئلة الشائعة حول المواضيع المتكررة المتعلقة بتطبيقات وطرق IDEA StatiCa."],
    ],
  },
  viewer: {
    heroTitleEn: "IDEA STATICA VIEWER",
    heroTitleAr: "عارض IDEA STATICA",
    metaEn: "BROWSER-BASED • COLLABORATION • NO INSTALL NEEDED",
    metaAr: "يعتمد على المتصفح • تعاون • لا يحتاج لتثبيت",
    summaryEn: "A web browser tool for viewing connection details and transferring design intent to colleagues without the full desktop application.",
    summaryAr: "أداة متصفح ويب لعرض تفاصيل الوصلة ونقل هدف التصميم إلى الزملاء دون الحاجة إلى تثبيت تطبيق IDEA StatiCa الكامل.",
    detailLabelEn: "Detailed instructions",
    detailLabelAr: "التعليمات المفصلة",
    pointsEn: [
      ["Step 1", "Open the IDEA StatiCa Viewer website using your license credentials."],
      ["Step 2", "Upload the .ideaCon project file you want to view."],
      ["Step 3", "View the model, results, and design details directly in the browser."],
      ["Step 4", "Use the navigation tools to rotate, zoom, and inspect the model."],
      ["Step 5", "Share the file or a generated link with colleagues for collaborative review."],
    ],
    pointsAr: [
      ["الخطوة 1", "افتح موقع عارض IDEA StatiCa باستخدام بيانات اعتماد الترخيص الخاصة بك."],
      ["الخطوة 2", "قم برفع ملف مشروع .ideaCon الذي تريد عرضه."],
      ["الخطوة 3", "اعرض النموذج والنتائج وتفاصيل التصميم مباشرة في المتصفح."],
      ["الخطوة 4", "استخدم أدوات التنقل لتدوير النموذج وتكبيره وفحصه."],
      ["الخطوة 5", "شارك الملف أو الرابط الذي تم إنشاؤه مع الزملاء للمراجعة التعاونية."],
    ],
  },
  library: {
    heroTitleEn: "CONNECTION LIBRARY",
    heroTitleAr: "مكتبة الوصلات",
    metaEn: "CLOUD DATABASE • TEMPLATES • DESIGN IDEAS",
    metaAr: "قاعدة بيانات سحابية • قوالب • أفكار تصميمية",
    summaryEn: "Browse, download, and use steel connection templates in your own projects to find design ideas quickly.",
    summaryAr: "تصفح وحمل واستخدم قوالب الوصلات الفولاذية في مشاريعك الخاصة للعثور على أفكار تصميمية بسرعة.",
    detailLabelEn: "Detailed instructions",
    detailLabelAr: "التعليمات المفصلة",
    pointsEn: [
      ["Step 1", "Open the Connection Library website in your browser."],
      ["Step 2", "Define the geometry or parameters of the connection you are looking for."],
      ["Step 3", "Browse the database results to find connection designs that match your criteria."],
      ["Step 4", "Sign in to your account to access connection details."],
      ["Step 5", "View, download, or open the selected connection model in Viewer or IDEA StatiCa desktop."],
    ],
    pointsAr: [
      ["الخطوة 1", "افتح موقع مكتبة الوصلات في متصفحك."],
      ["الخطوة 2", "حدد الشكل الهندسي أو المعلمات للوصلة التي تبحث عنها."],
      ["الخطوة 3", "تصفح نتائج قاعدة البيانات للعثور على تصميمات وصلات تطابق معاييرك."],
      ["الخطوة 4", "قم بتسجيل الدخول إلى حسابك للوصول إلى تفاصيل الوصلة."],
      ["الخطوة 5", "اعرض أو حمل أو افتح نموذج الوصلة المحدد في العارض أو تطبيق سطح المكتب IDEA StatiCa."],
    ],
  },
};

function ResourcesDrawer() {
  const [selectedTask, setSelectedTask] = useState(null);
  const resourceTasks = PRE_ONBOARDING_TASKS.filter((task) => task.id !== "bim");

  return (
    <div className="resource-drawer-shell">
      <div className="drawer-section-stack">
        <p className="drawer-intro">
          <AppText
            en="Useful reference links for setup and future project work."
            ar="روابط مرجعية مفيدة للتجهيز والعمل على المشاريع لاحقًا."
          />
        </p>

        <div className="resource-link-list">
          {resourceTasks.map((task) => (
            <button
              key={task.id}
              type="button"
              className="resource-link-card"
              onClick={() => setSelectedTask(task)}
              aria-haspopup="dialog"
            >
              <i className={`ph ${task.icon}`} />
              <span>
                <strong className="lang-en">{task.titleEn}</strong>
                <strong className="lang-ar">{task.titleAr}</strong>
                <small className="lang-en">{task.actionEn}</small>
                <small className="lang-ar">{task.actionAr}</small>
              </span>
              <i className="ph ph-caret-right resource-card-caret" />
            </button>
          ))}
        </div>
      </div>

      {selectedTask && (
        <ResourceSubDrawer
          task={selectedTask}
          detail={RESOURCE_DETAIL_COPY[selectedTask.id]}
          onBack={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

function IntegrationsDrawer({ bimGroup, setBimGroup, bimType, setBimType }) {
  const [bimSearch, setBimSearch] = useState("");
  const [bimMaterial, setBimMaterial] = useState("all");
  const selectedBimIntegration = getBimIntegrationByValue(bimType);
  const normalizedBimSearch = bimSearch.trim().toLowerCase();
  const visibleBimIntegrations = BIM_INTEGRATIONS.filter((integration) => (
    !bimGroup || bimGroup === "all" || integration.softwareType === bimGroup
  )).filter((integration) => (
    bimMaterial === "all" || integration.material === bimMaterial
  )).filter((integration) => (
    !normalizedBimSearch
    || integration.label.toLowerCase().includes(normalizedBimSearch)
    || integration.material.toLowerCase().includes(normalizedBimSearch)
    || integration.softwareType.toLowerCase().includes(normalizedBimSearch)
    || integration.aliases?.some((alias) => alias.toLowerCase().includes(normalizedBimSearch))
  ));

  function updateBimGroup(groupValue) {
    setBimGroup(groupValue);
    if (
      selectedBimIntegration
      && (
        (groupValue !== "all" && selectedBimIntegration.softwareType !== groupValue)
        || (bimMaterial !== "all" && selectedBimIntegration.material !== bimMaterial)
      )
    ) {
      setBimType("");
    }
  }

  function updateBimMaterial(materialValue) {
    setBimMaterial(materialValue);
    if (
      selectedBimIntegration
      && (
        (materialValue !== "all" && selectedBimIntegration.material !== materialValue)
        || (bimGroup !== "all" && selectedBimIntegration.softwareType !== bimGroup)
      )
    ) {
      setBimType("");
    }
  }

  return (
    <div className="drawer-section-stack">
      <p className="drawer-intro">
        <AppText
          en="Filter the supported CAD and FEA links, then open the exact integration page directly."
          ar="قم بتصفية روابط CAD و FEA المدعومة ثم افتح صفحة التكامل المناسبة مباشرة."
        />
      </p>

      <div className="bim-picker-box integration-finder-box">
        <AppText as="h3" en="Find your integration" ar="ابحث عن التكامل" />
        <div className="bim-search-wrap">
          <i className="ph ph-magnifying-glass" />
          <input
            type="search"
            value={bimSearch}
            onChange={(event) => setBimSearch(event.target.value)}
            placeholder="Search Tekla, Revit, SAP2000..."
            aria-label="Search BIM integrations"
          />
        </div>
        <div className="bim-group-row">
          <span className="bim-filter-label">
            <AppText en="Type" ar="النوع" />
          </span>
          {BIM_GROUPS.map((group) => (
            <button
              type="button"
              key={group.value}
              className={`bim-group-btn ${bimGroup === group.value ? "active" : ""}`}
              onClick={() => updateBimGroup(group.value)}
            >
              <span className="lang-en">{group.labelEn}</span>
              <span className="lang-ar">{group.labelAr}</span>
            </button>
          ))}
        </div>
        <div className="bim-group-row bim-material-row">
          <span className="bim-filter-label">
            <AppText en="Material" ar="المادة" />
          </span>
          {BIM_MATERIALS.map((material) => (
            <button
              type="button"
              key={material.value}
              className={`bim-group-btn ${bimMaterial === material.value ? "active" : ""}`}
              onClick={() => updateBimMaterial(material.value)}
            >
              <span className="lang-en">{material.labelEn}</span>
              <span className="lang-ar">{material.labelAr}</span>
            </button>
          ))}
        </div>
        <div className="bim-result-summary">
          <span className="lang-en">{visibleBimIntegrations.length} matching integrations</span>
          <span className="lang-ar">{visibleBimIntegrations.length} تكاملات مطابقة</span>
        </div>
        <div className="bim-result-list">
          {visibleBimIntegrations.map((integration) => (
            <ExternalLink
              key={integration.value}
              href={integration.href}
              className={`bim-integration-card ${selectedBimIntegration?.value === integration.value ? "active" : ""}`}
              onClick={() => setBimType(integration.value)}
            >
              <span className="bim-integration-icon">
                <i className={`ph ${integration.softwareType === "cad" ? "ph-cube" : "ph-chart-line-up"}`} />
              </span>
              <span className="bim-integration-copy">
                <strong>{integration.label}</strong>
                <span>
                  <b>{integration.softwareType.toUpperCase()}</b>
                  <em>{integration.material}</em>
                </span>
              </span>
              <span className="bim-integration-open">
                <span className="lang-en">Open</span>
                <span className="lang-ar">فتح</span>
                <i className="ph ph-arrow-up-right" />
              </span>
            </ExternalLink>
          ))}
          {visibleBimIntegrations.length === 0 && (
            <div className="bim-empty-state">
              <i className="ph ph-magnifying-glass" />
              <AppText
                as="span"
                en="No matching integration found"
                ar="لم يتم العثور على تكامل مطابق"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResourceSubDrawer({ task, detail, onBack }) {
  return (
    <section className="resource-subdrawer" role="dialog" aria-modal="false" aria-labelledby={`resource-subdrawer-${task.id}`}>
      <div className="resource-subdrawer-header">
        <button type="button" className="resource-back-btn" onClick={onBack}>
          <i className="ph ph-arrow-left" />
          <AppText en="Resources" ar="المراجع" />
        </button>
        <button type="button" className="drawer-close-btn resource-subdrawer-close" onClick={onBack} aria-label="Close resource detail">
          ×
        </button>
      </div>

      <div className="resource-subdrawer-body">
        <div className="resource-detail-heading">
          <i className={`ph ${task.icon}`} />
          <div>
            <h3 id={`resource-subdrawer-${task.id}`}>
              <span className="lang-en">{task.titleEn}</span>
              <span className="lang-ar">{task.titleAr}</span>
            </h3>
            <AppText as="p" en={task.descriptionEn} ar={task.descriptionAr} />
          </div>
        </div>

        <div className="task-drawer-flow resource-quick-flow">
          <span className="quick-flow-label">
            <AppText en="Quick setup" ar="إعداد سريع" />
          </span>
          <ol>
            {task.stepsEn.map((step) => <li className="lang-en" key={step}>{step}</li>)}
            {task.stepsAr.map((step) => <li className="lang-ar" key={step}>{step}</li>)}
          </ol>
        </div>

        <div className="resource-action-box">
          <span className="resource-action-kicker lang-en">{detail.metaEn}</span>
          <span className="resource-action-kicker lang-ar">{detail.metaAr}</span>
          <h3 className="lang-en">{detail.heroTitleEn}</h3>
          <h3 className="lang-ar">{detail.heroTitleAr}</h3>
          <p className="lang-en">{detail.summaryEn}</p>
          <p className="lang-ar">{detail.summaryAr}</p>
          <ExternalLink href={task.href} className="download-btn drawer-full-width-btn">
            <span className="lang-en">{task.actionEn}</span>
            <span className="lang-ar">{task.actionAr}</span>
            <i className="ph ph-arrow-right" />
          </ExternalLink>
        </div>

        <div className="resource-detail-section-title">
          <AppText as="h4" en={detail.detailLabelEn} ar={detail.detailLabelAr} />
        </div>
        <div className="resource-detail-grid lang-en">
          {detail.pointsEn.map(([label, text]) => (
            <DetailCard key={label} label={label} text={text} />
          ))}
        </div>
        <div className="resource-detail-grid lang-ar">
          {detail.pointsAr.map(([label, text]) => (
            <DetailCard key={label} label={label} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailCard({ label, text }) {
  return (
    <article className="resource-detail-card">
      <span>{label}</span>
      <p>{text}</p>
    </article>
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

  if (isAma) {
    return <EnterpriseAMASchedulerDrawer />;
  }

  return (
    <div className="drawer-section-stack">
      <p className="drawer-intro">
        <AppText
          en={isAma ? "Open the dedicated enterprise AMA scheduler after watching the recorded onboarding session." : "Pick the next suitable standard onboarding slot. Complete access checks before attending."}
          ar={isAma ? "افتح أداة جدولة جلسة الأسئلة الخاصة بالمؤسسات بعد مشاهدة التسجيل." : "اختر موعد التأهيل القياسي المناسب. أكمل بنود الوصول قبل الحضور."}
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

function EnterpriseAMASchedulerDrawer() {
  return (
    <div className="drawer-section-stack">
      <p className="drawer-intro">
        <AppText
          en="Enterprise users should schedule follow-up questions through the dedicated meeting scheduler, not the standard onboarding calendar."
          ar="يجب على مستخدمي المؤسسات جدولة أسئلة المتابعة من خلال أداة الجدولة المخصصة، وليس تقويم التأهيل القياسي."
        />
      </p>

      <div className="meeting-scheduler-card">
        <div className="meeting-scheduler-icon">
          <i className="ph ph-calendar-check" />
        </div>
        <div>
          <AppText as="h3" en="Enterprise AMA meeting" ar="جلسة أسئلة للمؤسسات" />
          <AppText
            as="p"
            en="Use this for workflow blockers, project-specific model questions, recorded-session clarification and implementation follow-up."
            ar="استخدم هذه الجلسة لعوائق سير العمل والأسئلة الخاصة بالنماذج وتوضيح التسجيل والمتابعة التنفيذية."
          />
        </div>
        <ExternalLink href={ENTERPRISE_AMA_SCHEDULER_URL} className="download-btn drawer-full-width-btn">
          <AppText en="Open meeting scheduler" ar="فتح أداة الجدولة" />
          <i className="ph ph-arrow-right" />
        </ExternalLink>
      </div>
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
