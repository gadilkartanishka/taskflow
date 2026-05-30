import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import Navbar from "./components/Navbar";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/projects/:id" element={<ProjectDetail />} />

            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
