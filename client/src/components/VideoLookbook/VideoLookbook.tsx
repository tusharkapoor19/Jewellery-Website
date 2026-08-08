import { useState } from "react";
import "./VideoLookbook.css";
import lookbookVideo from "../../assets/lookbook/lookbook.mp4";

const VideoLookbook = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="lookbook">
        <video
          className="lookbook-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={lookbookVideo} type="video/mp4" />
        </video>

        <div className="lookbook-overlay">
          <div className="lookbook-content">
            <span>THE HIRANYA EXPERIENCE</span>

            <h2>
              Every Masterpiece
              <br />
              Tells A Story
            </h2>

            <p>
              Discover the passion, precision and timeless craftsmanship
              behind every HIRANYA creation.
            </p>

            <button
              className="play-btn"
              onClick={() => setOpen(true)}
            >
              <i className="bi bi-play-fill"></i>
            </button>
          </div>
        </div>
      </section>

      {open && (
        <div className="video-modal">
          <button
            className="close-btn"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <video
            controls
            autoPlay
            className="popup-video"
          >
            <source src={lookbookVideo} type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
};

export default VideoLookbook;