import { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CreateTombstone from "./components/CreateTombstone";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import TombstoneDetail from "./components/TombstoneDetail";
import MyProfile from "./components/MyProfile";
import CreateGene from "./components/CreateGene";
import AutoPlayAudio from "./components/AutoPlayAudio";
import Layout from "./Layout";

const App = () => {
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
    <Router>
      <audio ref={audioRef} src="/assets/bgm.mp3" loop />
      <Routes>
        <Route
          path="/"
          element={<HomePage handlePlay={handlePlay} playing={playing} />}
        />
        <Route path="/create-gene" element={<CreateGene />} />
        <Route
          path="/create"
          element={
            <Layout>
              <CreateTombstone />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/forgot-password"
          element={
            <Layout>
              <ForgotPassword />
            </Layout>
          }
        />
        <Route
          path="/tombstones/:id"
          element={
            <Layout>
              <TombstoneDetail />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <MyProfile />
            </Layout>
          }
        />
      </Routes>

      <AutoPlayAudio
        playing={playing}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
    </Router>
  );
};

export default App;
