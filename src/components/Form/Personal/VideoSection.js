import Badges from "components/Badges";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useUserInteraction } from "userInteraction";
import "./video-section.css";
import "intersection-observer";
import YouTube from "react-youtube";

// https://www.youtube.com/watch?v=o6Agt7RZe-g
const VideoSection = () => {
  const { userInteraction, setUserInteraction } = useUserInteraction();

  const { t, i18n } = useTranslation();
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    setUserInteraction({ isVideoSectionVisible: inView });

    return () => {
      setUserInteraction({ isVideoSectionVisible: false });
    };
  }, [inView, setUserInteraction]);

  function handleReady(e) {
    // access to player in all event handlers via event.target
    e.target.pauseVideo();
  }

  const opts = {
    height: "281",
    width: "500",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div ref={ref} className="form-section  form-section--video-section">
      <h2>{t("video_section_title")}</h2>
      <p>{t("video_section_subtitle")}</p>

      <div className="video-wrapper">
        <YouTube videoId="o6Agt7RZe-g" opts={opts} onReady={handleReady} />
      </div>
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
