import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SubmitStory from "./pages/SubmitStory";
import StoryDetail from "./pages/StoryDetail";
import ProDashboard from "./pages/ProDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit-story" element={<SubmitStory />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/dashboard" element={<ProDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
