// src/pages/TrackerPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TrackerPage({ history, setHistory }) {
  const [filterCategory, setFilterCategory] = useState("all");

  // ✅ Filtered history
  const filteredHistory =
    filterCategory === "all"
      ? history
      : history.filter((h) => h.category === filterCategory);

  // ✅ Delete entry
  const handleDelete = (index) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Edit entry (simple prompt for now)
  const handleEdit = (index) => {
    const newValue = prompt(
      "Enter new CO₂ value (kg):",
      history[index].value
    );
    if (newValue) {
      const updated = [...history];
      updated[index].value = parseFloat(newValue);
      setHistory(updated);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">📒 Tracker Log</h1>

      {/* Filter */}
      <div className="flex gap-3 justify-center">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="Car">Car</option>
          <option value="Plane">Plane</option>
          <option value="Home">Home</option>
          <option value="Flame">Flame</option>
        </select>
      </div>

      {/* Table */}
      <motion.div
        className="overflow-x-auto bg-white/30 backdrop-blur-sm rounded-2xl shadow-md p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2">Date</th>
              <th className="p-2">Category</th>
              <th className="p-2">Value (kg CO₂)</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              filteredHistory.map((h, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-2">{h.date}</td>
                  <td className="p-2">{h.category}</td>
                  <td className="p-2">{h.value}</td>
                  <td className="p-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}





