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

  return (
    <div style={{ position: "fixed", bottom: 0, right: 0 }}>
      {playing ? null : (
        <svg
          onClick={handlePlay}
          style={{
            width: "30px",
            height: "30px",
            cursor: "pointer",
            margin: "10px",
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
