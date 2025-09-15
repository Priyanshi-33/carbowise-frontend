// src/pages/AboutPage.jsx
import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto text-center text-gray-900 space-y-10">
      <motion.div
        className="p-10 rounded-2xl bg-white/40 backdrop-blur-md shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ✅ Darker heading */}
        <h1 className="text-4xl font-extrabold text-green-900 mb-4">
          About CarboWise
        </h1>

        {/* About Content */}
        <p className="text-lg text-gray-800 leading-relaxed">
          CarboWise is your personal carbon footprint tracker.  
          It helps you monitor your daily CO₂ emissions, set realistic budgets, 
          and take action toward a more sustainable lifestyle.
        </p>

        {/* ✅ Highlighted Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-10 text-left">
          <motion.div
            className="p-6 rounded-xl bg-green-100 shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              🌱 Eco Tracking
            </h3>
            <p className="text-gray-700 text-sm">
              Track emissions from travel, home energy, and daily habits.
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl bg-green-100 shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              📊 Insights
            </h3>
            <p className="text-gray-700 text-sm">
              Visualize progress with charts and stay motivated.
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl bg-green-100 shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              ⚡ Smart Alerts
            </h3>
            <p className="text-gray-700 text-sm">
              Get instant alerts when your budget is exceeded.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}




