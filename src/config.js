export const STORAGE_KEY = "gsd-idea-onboarding-progress";

export const USER_FLOW = {
  STANDARD: "standard",
  ENTERPRISE: "enterprise",
};

export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfMbStwFSczyhFgcX8_QRBuoM5xcgW5mxIORjuhzXfj5o4OKQ/formResponse";
export const GOOGLE_FORM_EMAIL_ENTRY_ID = "entry.259862658";

export const EMAIL_CHECK_API_URL =
  import.meta.env.VITE_EMAIL_CHECK_ENDPOINT || "/api/check-onboarding-email";

export const ENTERPRISE_ONBOARDING_VIDEO_URL =
  import.meta.env.VITE_ENTERPRISE_ONBOARDING_VIDEO_URL || "/assets/enterprise-onboarding.mp4";
export const ENTERPRISE_MAX_VIDEO_VIEWS = 3;
export const ENTERPRISE_ONBOARDING_VIDEO_TABS = [
  {
    id: "steel",
    labelEn: "Detailed Steel",
    labelAr: "الصلب التفصيلي",
    url: import.meta.env.VITE_ENTERPRISE_STEEL_VIDEO_URL || ENTERPRISE_ONBOARDING_VIDEO_URL,
  },
  {
    id: "concrete",
    labelEn: "Detailed Concrete",
    labelAr: "الخرسانة التفصيلية",
    url: import.meta.env.VITE_ENTERPRISE_CONCRETE_VIDEO_URL || ENTERPRISE_ONBOARDING_VIDEO_URL,
  },
  {
    id: "bim",
    labelEn: "BIM Workflow",
    labelAr: "سير عمل BIM",
    url: import.meta.env.VITE_ENTERPRISE_BIM_VIDEO_URL || ENTERPRISE_ONBOARDING_VIDEO_URL,
  },
];

export const STANDARD_ONBOARDING_VIDEO_URL =
  import.meta.env.VITE_STANDARD_ONBOARDING_VIDEO_URL || "/assets/standard-onboarding.mp4";
export const STANDARD_MAX_VIDEO_VIEWS = 1;
export const STANDARD_ONBOARDING_VIDEO_TABS = [
  {
    id: "steel",
    labelEn: "Detailed Steel",
    labelAr: "الصلب التفصيلي",
    url: import.meta.env.VITE_STANDARD_STEEL_VIDEO_URL || STANDARD_ONBOARDING_VIDEO_URL,
  },
  {
    id: "concrete",
    labelEn: "Detailed Concrete",
    labelAr: "الخرسانة التفصيلية",
    url: import.meta.env.VITE_STANDARD_CONCRETE_VIDEO_URL || STANDARD_ONBOARDING_VIDEO_URL,
  },
  {
    id: "bim",
    labelEn: "BIM Workflow",
    labelAr: "سير عمل BIM",
    url: import.meta.env.VITE_STANDARD_BIM_VIDEO_URL || STANDARD_ONBOARDING_VIDEO_URL,
  },
];

export const ENTERPRISE_AMA_SCHEDULER_URL =
  import.meta.env.VITE_ENTERPRISE_AMA_SCHEDULER_URL ||
  "mailto:support@gsdidea.ae?subject=Enterprise%20AMA%20Session%20Request";
