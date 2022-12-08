import React from "react";
import { LoginPage2 } from "./pages/LoginPage2";
import { LoginPage1 } from "./pages/LoginPage1";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LandingPage } from "./pages/LandingPage";
import { MyRunsPage } from "./pages/MyRunsPage";

import { RunPage } from "./pages/RunPage";
import { RunsPage } from "./pages/RunsPage";
import { UserPage } from "./pages/UserPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CreateRunPage } from "./pages/CreateRunPage";
import { LoginPage3 } from "./pages/LoginPage3";
import { LoginPage4 } from "./pages/LoginPage4";
import { LoginPage5 } from "./pages/LoginPage5";
import { CreateComment } from "./pages/CreateComment";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login-1" element={<LoginPage1/>} />
        <Route path="/login-2" element={<LoginPage2 />} />
        <Route path="/login-3" element={<LoginPage3 />} />
        <Route path="/login-4" element={<LoginPage4 />} />
        <Route path="/login-5" element={<LoginPage5 />} />

        <Route path="/runs" element={<RunsPage />} />

        <Route path="/my-runs" element={<MyRunsPage />} />
        <Route path="/run/:id" element={<RunPage />} />
        <Route path="/post" element={<CreateRunPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create" element={<CreateComment/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
