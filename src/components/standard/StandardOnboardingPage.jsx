import { useEffect, useState } from "react";
import {
  STANDARD_MAX_VIDEO_VIEWS,
  STANDARD_ONBOARDING_VIDEO_TABS,
} from "../../config";
import { getStandardVideoViews, saveStandardVideoViews } from "../../utils/storage";
import AppText from "../shared/AppText";

export default function StandardOnboardingPage({ openDrawer, setPage, userEmail }) {
  const [videoViews, setVideoViews] = useState(() => getStandardVideoViews(userEmail));
  const [hasCountedCurrentView, setHasCountedCurrentView] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(STANDARD_ONBOARDING_VIDEO_TABS[0].id);

  useEffect(() => {
    setVideoViews(getStandardVideoViews(userEmail));
    setHasCountedCurrentView(false);
  }, [userEmail]);

  const usedViews = Math.min(videoViews, STANDARD_MAX_VIDEO_VIEWS);
  const remainingViews = Math.max(STANDARD_MAX_VIDEO_VIEWS - usedViews, 0);
  const isVideoLocked = remainingViews <= 0 && !hasCountedCurrentView;
  const canBookLiveQna = usedViews > 0 || hasCountedCurrentView;
  const activeVideo = STANDARD_ONBOARDING_VIDEO_TABS.find((video) => video.id === activeVideoId) || STANDARD_ONBOARDING_VIDEO_TABS[0];

  function handleVideoPlay() {
    if (hasCountedCurrentView || isVideoLocked) return;

    const nextCount = Math.min(usedViews + 1, STANDARD_MAX_VIDEO_VIEWS);
    saveStandardVideoViews(userEmail, nextCount);
    setVideoViews(nextCount);
    setHasCountedCurrentView(true);
  }

  return (
    <section className="page active onboarding-process-page standard-onboarding-page">
      <div className="process-header">
        <button type="button" className="text-back-btn" onClick={() => setPage(1)}>
          <i className="ph ph-arrow-left" />
          <AppText en="Back to homepage" ar="العودة للصفحة الرئيسية" />
        </button>
      </div>

      <section className="enterprise-video-card standard-video-card video-watch-page">
        <div className="enterprise-video-copy">
          <div className="roadmap-eyebrow">
            <i className="ph-fill ph-play-circle" />
            <AppText en="Standard onboarding" ar="التأهيل القياسي" />
          </div>
          <AppText
            as="h1"
            en="Onboarding session"
            ar="جلسة التأهيل المسجلة"
          />
          <AppText
            as="p"
            en="Watch the assigned standard onboarding recording before booking your live onboarding session. Each registered workspace email has one playback access."
            ar="شاهد تسجيل التأهيل القياسي المخصص قبل حجز جلسة التأهيل المباشرة. لكل بريد مساحة عمل مسجل وصول تشغيل واحد."
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
                    en="Book a live onboarding session for follow-up guidance and workflow questions."
                    ar="احجز جلسة تأهيل مباشرة للحصول على إرشادات إضافية وأسئلة خاصة بسير العمل."
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

            <div className="final-session-panel video-action-panel standard-session-panel">
              <div>
                <AppText as="strong" en="Live onboarding session" ar="جلسة التأهيل المباشرة" />
                <AppText
                  as="p"
                  en="Choose a standard onboarding session after your licence and software access are ready. These sessions are for standard licence users only."
                  ar="اختر جلسة تأهيل قياسية بعد جاهزية الترخيص والوصول إلى البرنامج. هذه الجلسات مخصصة لمستخدمي الترخيص القياسي فقط."
                />
              </div>
              <button
                type="button"
                className="primary-action-btn"
                disabled={!canBookLiveQna}
                onClick={() => openDrawer({ type: "schedule" })}
              >
                <AppText en="Book live QnA Session" ar="حجز جلسة أسئلة مباشرة" />
                <i className="ph ph-calendar-check" />
              </button>
            </div>
          </div>

          <aside className="video-watch-sidebar" aria-label="Standard onboarding playlist">
            <div className="video-playlist-header">
              <AppText as="strong" en="Onboarding videos" ar="فيديوهات التأهيل" />
              <AppText as="span" en="Choose a topic" ar="اختر موضوعًا" />
            </div>

            <div className="onboarding-video-tabs" role="tablist" aria-label="Standard onboarding videos">
              {STANDARD_ONBOARDING_VIDEO_TABS.map((video, index) => (
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
                <b>{STANDARD_MAX_VIDEO_VIEWS}</b>
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
    </section>
  );
}
