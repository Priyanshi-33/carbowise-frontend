// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
import TrackerPage from "./pages/TrackerPage";
import SettingsPage from "./pages/SettingsPage";
import ReduceFootprint from "./pages/ReduceFootprint";

// Components
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Context
import { UserProvider } from "./Context/UserContext.jsx";

export default function App() {
  const [history, setHistory] = useState([]);
  const [budget, setBudget] = useState(100);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem("carbonHistory");
    if (storedHistory) setHistory(JSON.parse(storedHistory));
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("carbonHistory", JSON.stringify(history));
    }
  }, [history]);

  // Add new record and check budget
  const handleAddRecord = (record) => {
    const updatedHistory = [record, ...history];
    setHistory(updatedHistory);

    const today = new Date().toLocaleDateString();
    const todayTotal = updatedHistory
      .filter((h) => h.date === today)
      .reduce((sum, h) => sum + h.value, 0);

    if (todayTotal > budget) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <UserProvider>
      <div
        className="min-h-screen bg-black/40 backdrop-blur-sm"
        style={{
          backgroundImage: "url('/images/back-leaves.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Toast Alerts */}
        {showAlert && (
          <div className="fixed top-20 right-6 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-bounce z-50">
            ⚠️ Daily CO₂ budget exceeded!
          </div>
        )}
        {showSuccess && (
          <div className="fixed top-36 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-bounce z-50">
            ✅ You are within today’s CO₂ budget!
          </div>
        )}

        {/* Routes */}
        <main className="p-6 m-6 pt-24 backdrop-blur-sm bg-white/30 rounded-2xl shadow-lg">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage history={history} budget={budget} />
      </ProtectedRoute>
    }
               />
               <Route
    path="/tracker"
    element={
      <ProtectedRoute>
        <TrackerPage history={history} onAddRecord={handleAddRecord} />
      </ProtectedRoute>
    }
  />
          <Route
    path="/settings"
    element={
      <ProtectedRoute>
        <SettingsPage
          budget={budget}
          setBudget={setBudget}
          setHistory={setHistory}
        />
      </ProtectedRoute>
    }
  />
  <Route
    path="/reduce-footprint"
    element={
      <ProtectedRoute>
        <ReduceFootprint />
      </ProtectedRoute>
    }
  />
            {/* Fallback → redirect to tracker for logged-in users */}
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <TrackerPage history={history} onAddRecord={handleAddRecord} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}




































