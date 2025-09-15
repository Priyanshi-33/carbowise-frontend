// src/components/HistoryChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Eco-friendly color palette
const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171"];

export default function HistoryChart({ history, filter }) {
  // ✅ Date references
  const today = new Date().toLocaleDateString();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 29);

  // ✅ Filtered history
  const filteredHistory = history.filter((h) => {
    const entryDate = new Date(h.date);
    if (filter === "daily") return h.date === today;
    if (filter === "weekly") return entryDate >= weekAgo;
    if (filter === "monthly") return entryDate >= monthAgo;
    return true; // all
  });

  // ✅ Sort by date (important for line chart)
  const sortedHistory = [...filteredHistory].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // ✅ Line Chart Data
  const lineData = sortedHistory.map((h, index) => ({
    id: index,
    date: h.date,
    value: h.value,
  }));

  // ✅ Pie Chart Data (sum by category)
  const categoryTotals = filteredHistory.reduce((acc, h) => {
    acc[h.category] = (acc[h.category] || 0) + h.value;
    return acc;
  }, {});
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Line Chart */}
      <div className="w-full h-64 bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-md flex items-center justify-center">
        {lineData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e" // green
                strokeWidth={2}
                dot={{ r: 3, fill: "#22c55e" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-600 text-sm">No data available for this period.</p>
        )}
      </div>

      {/* Pie Chart */}
      <div className="w-full h-64 bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-md flex items-center justify-center">
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={85}
                label={({ name, value }) => `${name} (${value} kg)`}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-600 text-sm">No category data to show.</p>
        )}
      </div>
    </div>
  );
}









