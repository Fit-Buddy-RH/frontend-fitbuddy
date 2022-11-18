import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import { LandingPage } from './pages/LandingPage'
import { MyRunsPage } from './pages/MyRunsPage'
import { RunPage } from './pages/RunPage'
import { RunsPage } from './pages/RunsPage'
import { UserPage } from './pages/UserPage'
import { DashboardPage } from './pages/DashboardPage'
import { CreateRunPage } from './pages/CreateRunPage'
import { LoginPage3 } from './pages/LoginPage3'
import { LoginPage4 } from './pages/LoginPage4'

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/runs" element={<RunsPage/>} />
        <Route path="/login3" element={<LoginPage3/>} />
        <Route path="/login4" element={<LoginPage4/>} />
        <Route path="/my-runs" element={<MyRunsPage/>} />
        <Route path="/run" element={<RunPage/>} />
        <Route path="/post" element={<CreateRunPage/>} />
        <Route path="/user" element={<UserPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
