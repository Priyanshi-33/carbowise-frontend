// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import HistoryChart from "../components/HistoryChart";
import TrackerForm from "../components/TrackerForm";

export default function DashboardPage({ budget }) {
  // 🔹 Global history state
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("daily"); // daily | weekly | monthly | all

  // 🔹 Function to add new entry
  const addHistoryEntry = (entry) => {
    setHistory((prev) => [...prev, entry]);
  };

  // Dates for filtering
  const today = new Date().toLocaleDateString();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 29);

  // Filter history
  const filteredHistory = history.filter((h) => {
    const entryDate = new Date(h.date);
    if (filter === "daily") return h.date === today;
    if (filter === "weekly") return entryDate >= weekAgo;
    if (filter === "monthly") return entryDate >= monthAgo;
    return true; // all
  });

  // Calculate total emissions for selected filter
  const totalEmission = filteredHistory.reduce((sum, h) => sum + h.value, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">📊 Dashboard</h1>

      {/* Tracker Form (adds to history) */}
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
              filter === f
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Emission Stats for Selected Filter */}
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
        <p
          className={`text-3xl font-bold ${
            filter === "daily" && totalEmission > budget
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {totalEmission} kg CO₂
        </p>
        {filter === "daily" && <p>Daily Budget: {budget} kg CO₂</p>}
        {filter === "daily" && totalEmission > budget && (
          <p className="text-red-600 font-semibold mt-2">
            ⚠️ Budget Exceeded!
          </p>
        )}
      </motion.div>

      {/* Compact Chart Section */}
      <motion.div
        className="p-6 bg-white/30 backdrop-blur-sm rounded-2xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          Emission Trends
        </h2>
        <div className="w-full h-64">
          {/* Pass filter so charts & totals stay in sync */}
          <HistoryChart history={history} filter={filter} />
        </div>
      </motion.div>
    </div>
  );
}






























