// src/components/TrackerForm.jsx
import React, { useState } from "react";

export default function TrackerForm({ addHistoryEntry }) {
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");

  const predefinedCategories = ["Car", "Plane", "Home", "Flame", "Energy", "Food"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !value) return;

    const record = {
      category,
      value: parseFloat(value),
      date: new Date().toISOString(), // store as ISO for chart consistency
    };

    addHistoryEntry(record);
    setCategory("");
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Activity / Category</label>
        <input
          type="text"
          list="categories"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Type or select activity"
          className="border p-2 rounded w-full"
          required
        />
        <datalist id="categories">
          {predefinedCategories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <div>
        <label className="block mb-1 font-medium">CO₂ Emission (kg)</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter amount"
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full transition"
      >
        ➕ Add Record
      </button>
    </form>
  );
}































