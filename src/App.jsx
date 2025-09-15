// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import TrackerPage from "./pages/TrackerPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ReduceFootprint from './pages/ReduceFootprint';
export default function App() {
  const [history, setHistory] = useState([]);
  const [budget, setBudget] = useState(100); // ✅ Default daily budget
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 🔹 Load history from localStorage on mount
  useEffect(() => {
    const storedHistory = localStorage.getItem("carbonHistory");
    if (storedHistory) setHistory(JSON.parse(storedHistory));
  }, []);

  // 🔹 Save history changes to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("carbonHistory", JSON.stringify(history));
    }
  }, [history]);

  // 🔹 Add new record with alert check
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
    <div
      className="min-h-screen bg-black/40 backdrop-blur-sm"
      style={{
        backgroundImage: "url('/images/back-leaves.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Toast Alerts */}
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

      {/* 🔹 Routes */}
      <main className="p-6 m-6 pt-24 backdrop-blur-sm bg-white/30 rounded-2xl shadow-lg">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reduce-footprint" element={<ReduceFootprint />} />
          {/* TrackerPage → add entries */}
          <Route
            path="/tracker"
            element={
              <TrackerPage history={history} onAddRecord={handleAddRecord} />
            }
          />

          {/* DashboardPage → stats + charts */}
          <Route
            path="/dashboard"
            element={<DashboardPage history={history} budget={budget} />}
          />

          {/* SettingsPage → budget + reset */}
          <Route
            path="/settings"
            element={
              <SettingsPage
                budget={budget}
                setBudget={setBudget}
                setHistory={setHistory}
              />
            }
          />

          {/* Fallback route */}
          <Route
            path="*"
            element={
              <TrackerPage history={history} onAddRecord={handleAddRecord} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

































