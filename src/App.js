import React from "react";
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
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

      <AutoPlayAudio src="/assets/bgm.mp3" />
    </Router>
  );
};

export default App;
