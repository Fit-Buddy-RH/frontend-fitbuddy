import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import { LandingPage } from './pages/LandingPage'
import { MyRunsPage } from './pages/MyRunsPage'
import { RunPage } from './pages/RunPage'
import { RunsPage } from './pages/RunsPage'
import { UserPage } from './pages/UserPage'
import { DashboardPage } from './pages/DashboardPage'

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/runs" element={<RunsPage/>} />
        <Route path="/my-runs" element={<MyRunsPage/>} />
        <Route path="/run" element={<RunPage/>} />
        <Route path="/user" element={<UserPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
