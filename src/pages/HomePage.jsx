// src/pages/HomePage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Leaf, BarChart3, Target, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto text-center text-gray-900 space-y-16">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 p-10 rounded-2xl bg-white/40 backdrop-blur-md shadow-xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">
          🌍 Welcome to CarboWise 
        </h1>
        <p className="text-lg md:text-xl text-gray-800">
          Track your daily carbon emissions, stay within your budget, and make
          eco-conscious choices every day.
        </p>
        {/* ✅ Button moved below with spacing */}
        <div className="mt-6">
          <Link
            to="/tracker"
            className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg shadow-md transition"
          >
        
          Start Tracking Now →
        </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <FeatureCard
          icon={<Leaf size={32} />}
          title="Track Emissions"
          text="Log your activities and calculate your carbon footprint with ease."
        />
        <FeatureCard
          icon={<BarChart3 size={32} />}
          title="Visual Insights"
          text="Get clear charts and insights to understand your daily habits."
        />
        <FeatureCard
          icon={<Target size={32} />}
          title="Stay Within Budget"
          text="Set a CO₂ budget and get alerts when you exceed safe limits."
        />
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="p-8 rounded-2xl bg-green-700 text-white shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold">Ready to take action?</h2>
        <p className="mt-2">Join the mission for a carbon-neutral future.</p>
        <Link
          to="/about"
          className="inline-block mt-4 px-6 py-3 bg-white text-green-800 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
        >
          Learn More →
        </Link>
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="p-6 bg-white/30 backdrop-blur-sm rounded-xl shadow-lg text-center space-y-3">
      <div className="flex justify-center text-green-700">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-800">{text}</p>
    </div>
  );
}


