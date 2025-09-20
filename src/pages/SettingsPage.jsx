// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SettingsPage from "./pages/SettingsPage";
export default function SettingsPage({ budget, setBudget, setHistory }) {
  const [tempBudget, setTempBudget] = useState(budget);

  // Keep tempBudget synced when navigating
  useEffect(() => {
    setTempBudget(budget);
  }, [budget]);

  const handleSaveBudget = () => {
    const newBudget = Number(tempBudget);
    if (newBudget > 0) {
      setBudget(newBudget);
      localStorage.setItem("carbonBudget", newBudget); // ✅ persist
      alert(`✅ Budget updated to ${newBudget} kg CO₂`);
    }
  };

  const handleClearHistory = () => {
    if (confirm("⚠️ Are you sure you want to clear all history?")) {
      setHistory([]);
      localStorage.removeItem("carbonHistory");
      alert("🗑️ History cleared successfully!");
    }
  };

  return (
    <motion.div
      className="p-6 rounded-xl shadow-md backdrop-blur-md bg-white/10 text-white max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">⚙️ Settings</h2>

      {/* Budget Input */}
      <label className="block mb-2 font-semibold">
        Set Carbon Budget (kg CO₂):
      </label>
      <input
        type="number"
        value={tempBudget}
        onChange={(e) => setTempBudget(e.target.value)}
        className="p-2 w-full rounded-lg text-black"
      />

      <button
        onClick={handleSaveBudget}
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
      >
        💾 Save Budget
      </button>

      <p className="mt-4">
        Current budget: <span className="font-bold">{budget} kg CO₂</span>
      </p>

      {/* Clear history */}
      <button
        onClick={handleClearHistory}
        className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
      >
        🗑️ Clear History
      </button>
    </motion.div>
  );
}






