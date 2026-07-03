import { useEffect, useState } from "react";
import {
  ENTERPRISE_AMA_SCHEDULER_URL,
  ENTERPRISE_MAX_VIDEO_VIEWS,
  ENTERPRISE_ONBOARDING_VIDEO_TABS,
} from "../../config";
import { getEnterpriseVideoViews, saveEnterpriseVideoViews } from "../../utils/storage";
import AppText from "../shared/AppText";
import ExternalLink from "../shared/ExternalLink";

export default function EnterpriseOnboardingPage({ setPage, userEmail }) {
  const [videoViews, setVideoViews] = useState(() => getEnterpriseVideoViews(userEmail));
  const [hasCountedCurrentView, setHasCountedCurrentView] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(ENTERPRISE_ONBOARDING_VIDEO_TABS[0].id);

  useEffect(() => {
    setVideoViews(getEnterpriseVideoViews(userEmail));
    setHasCountedCurrentView(false);
  }, [userEmail]);

  const usedViews = Math.min(videoViews, ENTERPRISE_MAX_VIDEO_VIEWS);
  const remainingViews = Math.max(ENTERPRISE_MAX_VIDEO_VIEWS - usedViews, 0);
  const isVideoLocked = remainingViews <= 0 && !hasCountedCurrentView;
  const canBookLiveQna = usedViews > 0 || hasCountedCurrentView;
  const activeVideo = ENTERPRISE_ONBOARDING_VIDEO_TABS.find((video) => video.id === activeVideoId) || ENTERPRISE_ONBOARDING_VIDEO_TABS[0];

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

      <section className="enterprise-video-card video-watch-page">
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
            en="Watch the assigned enterprise onboarding recording before scheduling a follow-up AMA. Each registered workspace email has limited playback access."
            ar="شاهد تسجيل تأهيل المؤسسات المخصص قبل جدولة جلسة أسئلة ومتابعة. لكل بريد مساحة عمل مسجل وصول محدود للتشغيل."
          />
        </div>

        <div className="video-watch-layout">
          <div className="video-watch-main">
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
                    en="Schedule an enterprise AMA session for follow-up clarification or workflow-specific questions."
                    ar="قم بجدولة جلسة أسئلة للمؤسسات للحصول على توضيحات إضافية أو أسئلة خاصة بسير العمل."
                  />
                </div>
              ) : (
                <video
                  key={activeVideo.id}
                  className="enterprise-video-player"
                  controls
                  preload="metadata"
                  src={activeVideo.url}
                  onPlay={handleVideoPlay}
                >
                  <AppText
                    en="Your browser does not support embedded video."
                    ar="المتصفح لا يدعم عرض الفيديو المدمج."
                  />
                </video>
              )}
            </div>
            <div className="video-now-playing">
              <AppText as="span" en="Now playing" ar="يعرض الآن" />
              <strong>
                <span className="lang-en">{activeVideo.labelEn}</span>
                <span className="lang-ar">{activeVideo.labelAr}</span>
              </strong>
            </div>
          </div>

          <aside className="video-watch-sidebar" aria-label="Enterprise onboarding playlist">
            <div className="video-playlist-header">
              <AppText as="strong" en="Onboarding videos" ar="فيديوهات التأهيل" />
              <AppText as="span" en="Choose a topic" ar="اختر موضوعًا" />
            </div>

            <div className="onboarding-video-tabs" role="tablist" aria-label="Enterprise onboarding videos">
              {ENTERPRISE_ONBOARDING_VIDEO_TABS.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  role="tab"
                  aria-selected={activeVideo.id === video.id}
                  className={`onboarding-video-tab ${activeVideo.id === video.id ? "active" : ""}`}
                  onClick={() => setActiveVideoId(video.id)}
                >
                  <span className="video-tab-index">{index + 1}</span>
                  <span className="video-tab-copy">
                    <span className="lang-en">{video.labelEn}</span>
                    <span className="lang-ar">{video.labelAr}</span>
                  </span>
                  <i className="ph ph-play-circle" />
                </button>
              ))}
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
          </aside>
        </div>
      </section>

      <div className="final-session-panel enterprise-ama-panel">
        <div>
          <AppText as="strong" en="Enterprise AMA meeting" ar="جلسة أسئلة للمؤسسات" />
          <AppText
            as="p"
            en="Use the dedicated enterprise scheduler for model-specific questions, workflow blockers and post-recording clarification. This does not use the standard onboarding session calendar."
            ar="استخدم أداة جدولة المؤسسات للأسئلة الخاصة بالنماذج وعوائق سير العمل والتوضيحات بعد مشاهدة التسجيل. هذا لا يستخدم تقويم جلسات التأهيل القياسية."
          />
        </div>
        {canBookLiveQna ? (
          <ExternalLink href={ENTERPRISE_AMA_SCHEDULER_URL} className="primary-action-btn">
            <AppText en="Book live QnA Session" ar="حجز جلسة أسئلة مباشرة" />
            <i className="ph ph-calendar-check" />
          </ExternalLink>
        ) : (
          <button type="button" className="primary-action-btn" disabled>
            <AppText en="Book live QnA Session" ar="حجز جلسة أسئلة مباشرة" />
            <i className="ph ph-calendar-check" />
          </button>
        )}
      </div>
    </section>
  );
}
