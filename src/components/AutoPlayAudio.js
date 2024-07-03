import React, { useRef, useState } from "react";

const AutoPlayAudio = ({ src }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((error) => {
        console.log("Audio playback failed: ", error);
      });
      setPlaying(true);
    }
  };
  const handlePause = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 0, right: 0 }}>
      {playing ? (
        <svg
          onClick={handlePause}
          style={{
            width: "30px",
            height: "30px",
            cursor: "pointer",
            margin: "30px",
          }}
          viewBox="0 0 24 24"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 5H10V19H6V5ZM14 5H18V19H14V5Z" />
        </svg>
      ) : (
        <svg
          onClick={handlePlay}
          style={{
            width: "30px",
            height: "30px",
            cursor: "pointer",
            margin: "30px",
          }}
          viewBox="0 0 24 24"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5V19L19 12L8 5Z" />
        </svg>
      )}

      <audio ref={audioRef} src={src} loop />
    </div>
  );
};

export default AutoPlayAudio;
