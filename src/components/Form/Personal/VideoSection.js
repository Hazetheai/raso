import Badges from "components/Badges";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useUserInteraction } from "userInteraction";
import "./video-section.css";
import "intersection-observer";

const VideoSection = () => {
  const { userInteraction, setUserInteraction } = useUserInteraction();

  const { t, i18n } = useTranslation();
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    setUserInteraction({ isVideoSectionVisible: inView });
  }, [inView, setUserInteraction]);

  return (
    <div ref={ref} className="form-section  form-section--video-section">
      {console.log(`inView`, inView)}
      <h2>{t("video_section_title")}</h2>
      <p>{t("video_section_subtitle")}</p>

      <div className="video-wrapper">Video</div>
      <div className="video-instructions">
        <ul>
          <li className="step-one">{t("video_section_step_one")}</li>
          <li className="step-two">{t("video_section_step_two")}</li>
          <li className="step-three">{t("video_section_step_three")}</li>
        </ul>
      </div>
      <Badges />
    </div>
  );
};
export default VideoSection;
