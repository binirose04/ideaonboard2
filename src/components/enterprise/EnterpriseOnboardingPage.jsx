import { useEffect, useState } from "react";
import { ENTERPRISE_MAX_VIDEO_VIEWS, ENTERPRISE_ONBOARDING_VIDEO_URL } from "../../config";
import { getEnterpriseVideoViews, saveEnterpriseVideoViews } from "../../utils/storage";
import AppText from "../shared/AppText";

export default function EnterpriseOnboardingPage({ openDrawer, setPage, userEmail }) {
  const [videoViews, setVideoViews] = useState(() => getEnterpriseVideoViews(userEmail));
  const [hasCountedCurrentView, setHasCountedCurrentView] = useState(false);

  useEffect(() => {
    setVideoViews(getEnterpriseVideoViews(userEmail));
    setHasCountedCurrentView(false);
  }, [userEmail]);

  const usedViews = Math.min(videoViews, ENTERPRISE_MAX_VIDEO_VIEWS);
  const remainingViews = Math.max(ENTERPRISE_MAX_VIDEO_VIEWS - usedViews, 0);
  const isVideoLocked = remainingViews <= 0;

  function handleVideoPlay() {
    if (hasCountedCurrentView || isVideoLocked) return;

    const nextCount = Math.min(usedViews + 1, ENTERPRISE_MAX_VIDEO_VIEWS);
    saveEnterpriseVideoViews(userEmail, nextCount);
    setVideoViews(nextCount);
    setHasCountedCurrentView(true);
  }

  return (
    <section className="page active onboarding-process-page enterprise-onboarding-page">
      <div className="process-header">
        <button type="button" className="text-back-btn" onClick={() => setPage(1)}>
          <i className="ph ph-arrow-left" />
          <AppText en="Back to homepage" ar="العودة للصفحة الرئيسية" />
        </button>
      </div>

      <section className="enterprise-video-card">
        <div className="enterprise-video-copy">
          <div className="roadmap-eyebrow">
            <i className="ph-fill ph-play-circle" />
            <AppText en="Enterprise onboarding" ar="تأهيل المؤسسات" />
          </div>
          <AppText
            as="h1"
            en="Recorded onboarding session"
            ar="جلسة التأهيل المسجلة"
          />
          <AppText
            as="p"
            en="Watch the recorded onboarding session first. Each registered workspace email is allowed three plays. Real enforcement still belongs in your backend, because localStorage is not Fort Knox."
            ar="شاهد جلسة التأهيل المسجلة أولاً. يُسمح لكل بريد مسجل بثلاث مرات تشغيل."
          />
        </div>

        <div className="enterprise-video-meta-grid">
          <div className="enterprise-video-meta-cell">
            <b>{remainingViews}</b>
            <AppText as="span" en="Views left" ar="مشاهدات متبقية" />
          </div>
          <div className="enterprise-video-meta-cell">
            <b>{ENTERPRISE_MAX_VIDEO_VIEWS}</b>
            <AppText as="span" en="Allowed plays" ar="مرات التشغيل" />
          </div>
          <div className="enterprise-video-meta-cell">
            <b>{isVideoLocked ? "LOCKED" : "OPEN"}</b>
            <AppText as="span" en="Video access" ar="وصول الفيديو" />
          </div>
        </div>

        <div className="enterprise-video-shell">
          {isVideoLocked ? (
            <div className="enterprise-video-locked">
              <i className="ph ph-lock-key" />
              <AppText
                as="strong"
                en="Video view limit reached"
                ar="تم الوصول إلى حد المشاهدة"
              />
              <AppText
                as="p"
                en="Use the AMA session if you need follow-up clarification. Frontend-only limits can be reset by users, so move this count to your OneDrive/n8n backend before going live."
                ar="استخدم جلسة الأسئلة إذا كنت بحاجة إلى توضيح إضافي."
              />
            </div>
          ) : (
            <video
              className="enterprise-video-player"
              controls
              preload="metadata"
              src={ENTERPRISE_ONBOARDING_VIDEO_URL}
              onPlay={handleVideoPlay}
            >
              <AppText
                en="Your browser does not support embedded video."
                ar="المتصفح لا يدعم عرض الفيديو المدمج."
              />
            </video>
          )}
        </div>
      </section>

      <div className="final-session-panel enterprise-ama-panel">
        <div>
          <AppText as="strong" en="Need help after the recording?" ar="هل تحتاج إلى مساعدة بعد التسجيل؟" />
          <AppText
            as="p"
            en="Use the AMA slot for questions, workflow blockers, model-specific doubts and follow-up clarification after watching the recorded onboarding session."
            ar="استخدم جلسة الأسئلة والأجوبة للاستفسارات والعوائق والأسئلة الخاصة بالنماذج بعد مشاهدة جلسة التأهيل المسجلة."
          />
        </div>
        <button type="button" className="primary-action-btn" onClick={() => openDrawer({ type: "ama" })}>
          <AppText en="Schedule AMA" ar="جدولة جلسة أسئلة" />
          <i className="ph ph-calendar-check" />
        </button>
      </div>
    </section>
  );
}
