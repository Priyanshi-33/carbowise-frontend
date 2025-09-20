// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HistoryChart from "../components/HistoryChart";
import TrackerForm from "../components/TrackerForm";
import DashboardPage from "./pages/DashboardPage";
export default function DashboardPage({ budget }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("daily");

  // Fetch history from backend
  useEffect(() => {
    fetch(`${BASE_URL}/api/footprint`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setHistory(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addHistoryEntry = (entry) => {
    setHistory((prev) => [...prev, entry]);

    fetch(`${BASE_URL}/api/footprint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    })
      .then((res) => res.json())
      .then((data) => console.log("Saved:", data))
      .catch((err) => console.error(err));
  };

  // Filter history by date
  const filteredHistory = history.filter((h) => {
    const entryDate = new Date(h.date);
    const today = new Date();
    if (filter === "daily") return entryDate.toDateString() === today.toDateString();
    if (filter === "weekly") {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 6);
      return entryDate >= weekAgo;
    }
    if (filter === "monthly") {
      const monthAgo = new Date();
      monthAgo.setDate(today.getDate() - 29);
      return entryDate >= monthAgo;
    }
    return true;
  });

  const totalEmission = filteredHistory.reduce((sum, h) => sum + h.value, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">📊 Dashboard</h1>

      {/* Tracker Form */}
      <motion.div
        className="p-6 bg-white/30 backdrop-blur-sm rounded-2xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Add Emission Entry</h2>
        <TrackerForm addHistoryEntry={addHistoryEntry} />
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 mb-4">
        {["daily", "weekly", "monthly", "all"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              filter === f ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Emission Stats */}
      <motion.div
        className="p-6 bg-white/30 backdrop-blur-sm rounded-2xl shadow-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-2">
          {filter === "daily"
            ? "Today's Emission"
            : filter === "weekly"
            ? "Weekly Emission"
            : filter === "monthly"
            ? "Monthly Emission"
            : "Total Emission"}
        </h2>
        <p className={`text-3xl font-bold ${filter === "daily" && totalEmission > budget ? "text-red-600" : "text-green-600"}`}>
          {totalEmission} kg CO₂
        </p>
        {filter === "daily" && <p>Daily Budget: {budget} kg CO₂</p>}
        {filter === "daily" && totalEmission > budget && <p className="text-red-600 font-semibold mt-2">⚠️ Budget Exceeded!</p>}
      </motion.div>

      {/* Chart Section */}
      <motion.div
        className="p-6 bg-white/30 backdrop-blur-sm rounded-2xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-center mb-4">Emission Trends</h2>
        <div className="w-full h-64">
          <HistoryChart history={filteredHistory} />
        </div>
      </motion.div>
    </div>
  );
}
































