import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import AICursor from "../components/AICursor";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";


export default function Progress() {
     
    const renderLabel = ({ name, percent }) => {
  return `${name}: ${(percent * 100).toFixed(0)}%`;
};

    const studyDistribution = [
  { name: "Mathematics", value: 40 },
  { name: "Physics", value: 30 },
  { name: "Chemistry", value: 20 },
  { name: "Revision", value: 10 },
];



const pieColors = ["#38bdf8", "#60a5fa", "#a5b4fc", "#64748b"];


  const [view, setView] = useState("weekly"); // weekly | monthly
  const [activeSubject, setActiveSubject] = useState("All");

  /* ---------- DATA (DUMMY, FRONTEND-ONLY) ---------- */
  const stats = [
    { label: "Accuracy", value: "78%" },
    { label: "Study Time", value: "14 hrs" },
    { label: "Consistency", value: "5 days" },
    { label: "Topics Covered", value: "12" },
  ];

  const comparison = {
    weekly: [
      { label: "Study Hours", last: 10, current: 14 },
      { label: "Accuracy", last: 66, current: 78 },
      { label: "Consistency", last: 4, current: 5 },
    ],
    monthly: [
      { label: "Study Hours", last: 42, current: 56 },
      { label: "Accuracy", last: 62, current: 75 },
      { label: "Consistency", last: 18, current: 22 },
    ],
  };

  const subjects = ["All", "Mathematics", "Physics", "Chemistry"];

  const subjectPerformance = [
    { subject: "Mathematics", value: 75 },
    { subject: "Physics", value: 62 },
    { subject: "Chemistry", value: 48 },
  ];

  const consistency = [true, true, false, true, true, true, false]; // last 7 days

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#cbd5f5]">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">

          {/* ================================================= */}
          {/* HEADER + TOGGLE + EXPORT */}
          {/* ================================================= */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-[#f8fafc]">
                Progress Overview
              </h1>
              <p className="mt-2 text-[#94a3b8]">
                Track how your learning is improving over time.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Toggle */}
              <div className="flex rounded-xl border border-[#1e293b] overflow-hidden">
                {["weekly", "monthly"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setView(t)}
                    className={`px-4 py-2 text-sm transition ${
                      view === t
                        ? "bg-[#1e293b] text-[#f8fafc]"
                        : "text-[#94a3b8]"
                    }`}
                  >
                    {t === "weekly" ? "Weekly" : "Monthly"}
                  </button>
                ))}
              </div>

              {/* Export */}
              <button className="px-4 py-2 text-sm rounded-xl border border-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc]">
                Export PDF
              </button>
            </div>
          </div>

          {/* ================================================= */}
          {/* OVERALL STATS */}
          {/* ================================================= */}
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-[#1e293b] bg-[#020617] p-6"
              >
                <p className="text-sm text-[#94a3b8]">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-[#38bdf8]">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ================================================= */}
          {/* PROGRESS COMPARISON */}
          {/* ================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#1e293b] bg-[#020617] p-8"
          >
            <h3 className="text-lg font-semibold text-[#f8fafc] mb-6">
              Last {view === "weekly" ? "Week" : "Month"} vs This{" "}
              {view === "weekly" ? "Week" : "Month"}
            </h3>

            <div className="space-y-5">
              {comparison[view].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className="text-[#94a3b8]">
                      {item.last} →{" "}
                      <span className="text-[#38bdf8] font-medium">
                        {item.current}
                      </span>
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-[#1e293b] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(item.current / Math.max(item.current, item.last)) * 100}%`,
                      }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-[#38bdf8]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================================================= */}
          {/* SUBJECT FILTER */}
          {/* ================================================= */}
          <div className="flex gap-2 flex-wrap">
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubject(sub)}
                className={`px-4 py-1.5 rounded-full text-sm border transition ${
                  activeSubject === sub
                    ? "border-[#38bdf8] text-[#38bdf8]"
                    : "border-[#1e293b] text-[#94a3b8]"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* ================================================= */}
          {/* SUBJECT PERFORMANCE */}
          {/* ================================================= */}
          <div className="rounded-2xl border border-[#1e293b] bg-[#020617] p-8">
            <h3 className="text-lg font-semibold text-[#f8fafc] mb-6">
              Subject-wise Performance
            </h3>

            <div className="space-y-5">
              {subjectPerformance
                .filter(
                  (s) => activeSubject === "All" || s.subject === activeSubject
                )
                .map((sub, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{sub.subject}</span>
                      <span className="text-[#38bdf8]">{sub.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#1e293b] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sub.value}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full bg-[#38bdf8]"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
                {/* ================= STUDY TIME DISTRIBUTION ================= */}
{/* ================= STUDY TIME DISTRIBUTION ================= */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  className="rounded-2xl border border-[#1e293b] bg-[#020617] p-8"
>
  <h3 className="text-lg font-semibold text-[#f8fafc] mb-2">
    Study Time Distribution
  </h3>

  <p className="text-sm text-[#94a3b8] mb-6">
    How your study time is divided across subjects.
  </p>

  <div className="w-full h-[300px] relative">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>

        {/* PIE */}
        <Pie
  data={studyDistribution}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  innerRadius={70}
  outerRadius={110}
  paddingAngle={3}
  label={renderLabel}
  labelLine={false}
>
  {studyDistribution.map((_, index) => (
    <Cell key={index} fill={pieColors[index]} />
  ))}
</Pie>


        {/* CENTER LABEL */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#f8fafc"
          fontSize="14"
          fontWeight="600"
        >
          Study Time
        </text>

        <text
          x="50%"
          y="56%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#94a3b8"
          fontSize="12"
        >
          Distribution
        </text>

        {/* TOOLTIP */}
        <Tooltip
  cursor={{ fill: "transparent" }}   // remove dark hover overlay
  contentStyle={{
    backgroundColor: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "10px",
    padding: "10px 12px",
    color: "#f8fafc",               // FORCE text color
    fontSize: "13px",
  }}
  itemStyle={{
    color: "#f8fafc",               // FORCE item text
    fontWeight: 500,
  }}
  labelStyle={{
    color: "#38bdf8",               // label (subject name)
    fontWeight: 600,
  }}
  formatter={(value, name) => [`${value}%`, name]}
/>


        {/* LEGEND */}
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          formatter={(value) => (
            <span style={{ color: "#cbd5f5", fontSize: "13px" }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
</motion.div>


          {/* ================================================= */}
          {/* CONSISTENCY */}
          {/* ================================================= */}
          <div className="rounded-2xl border border-[#1e293b] bg-[#020617] p-8">
            <h3 className="text-lg font-semibold text-[#f8fafc] mb-4">
              Consistency (Last 7 Days)
            </h3>

            <div className="flex gap-3">
              {consistency.map((done, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-6 h-6 rounded-full ${
                    done ? "bg-[#38bdf8]" : "bg-[#1e293b]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* AI INSIGHT */}
          {/* ================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#38bdf8]/30 bg-[#020617] p-8"
          >
            <h3 className="text-lg font-semibold text-[#f8fafc]">
              AI Progress Insight
            </h3>
            <p className="mt-3 text-[#94a3b8] max-w-4xl">
              Your study time and accuracy improved significantly compared to last
              {view === "weekly" ? " week" : " month"}. However, Chemistry remains
              weaker than other subjects. Short daily revision sessions could help
              stabilize performance.
            </p>
          </motion.div>

        </div>
      </section>
      <AICursor />
    </div>
  );
}
