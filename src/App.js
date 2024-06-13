import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import CreateTombstone from "./components/CreateTombstone/CreateTombstone";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateTombstone />} />
    </Routes>
  </Router>
);

export default App;
