import React, { useState } from "react";

export default function TrackerForm({ addHistoryEntry }) {
  const [category, setCategory] = useState("Travel");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    const record = {
      category,
      value: parseFloat(value),
      date: new Date().toLocaleDateString(), // consistent with Dashboard
    };

    addHistoryEntry(record); // ✅ match DashboardPage
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option>Travel</option>
          <option>Energy</option>
          <option>Food</option>
          <option>Others</option>
        </select>
      </div>

      {/* CO2 Value */}
      <div>
        <label className="block mb-1 font-medium">CO₂ Emission (kg)</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter amount"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full transition"
      >
        ➕ Add Record
      </button>
    </form>
  );
}






























