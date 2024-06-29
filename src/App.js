import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CreateTombstone from "./components/CreateTombstone";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import TombstoneDetail from "./components/TombstoneDetail";
import MyProfile from "./components/MyProfile";
import Layout from "./Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
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
    </Router>
  );
};

export default App;
