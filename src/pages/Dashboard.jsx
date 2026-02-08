import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import AICursor from "../components/AICursor";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [studyPlan, setStudyPlan] = useState([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("studyPlan");
    if (savedPlan) {
      setStudyPlan(JSON.parse(savedPlan));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#cbd5f5]">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 space-y-12">

          {/* ================= WELCOME + AI INSIGHT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[#1e293b] bg-[#020617] p-8"
          >
            <h1 className="text-2xl font-semibold text-[#f8fafc]">
              Welcome back 👋
            </h1>
            <p className="mt-2 text-[#94a3b8]">
              <span className="text-[#22d3ee] font-medium">AI Insight:</span>{" "}
              You’re learning best with short sessions. Focus on revision today
              before moving to new topics.
            </p>
          </motion.div>

          {/* ================= ROW 2 ================= */}
          <div className="grid md:grid-cols-3 gap-8">

            {/* TODAY'S FOCUS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-[#22d3ee]/40 bg-[#020617] p-6"
            >
              <p className="text-sm text-[#22d3ee] font-medium">
                Today’s Focus
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[#f8fafc]">
                Algebra – Core Revision
              </h3>
              <p className="mt-2 text-sm text-[#94a3b8]">
                AI selected this topic based on your recent performance.
              </p>

              <button className="mt-6 px-5 py-2 rounded-lg bg-[#22d3ee] text-[#020617] text-sm font-medium">
                Start Now
              </button>
            </motion.div>

            {/* PROGRESS RING */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-[#1e293b] bg-[#020617] p-6 flex flex-col items-center justify-center"
            >
              <div className="relative w-24 h-24 rounded-full border-4 border-[#1e293b] flex items-center justify-center">
                <motion.div
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 30 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 rounded-full border-4 border-[#22d3ee]"
                />
                <span className="text-lg font-semibold text-[#f8fafc]">
                  70%
                </span>
              </div>
              <p className="mt-4 text-sm text-[#94a3b8]">
                Today’s Progress
              </p>
            </motion.div>

            {/* STUDY STREAK */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-[#1e293b] bg-[#020617] p-6"
            >
              <p className="text-sm text-[#94a3b8]">Study Streak</p>
              <h3 className="mt-2 text-3xl font-semibold text-[#22d3ee]">
                5 Days 🔥
              </h3>
              <p className="mt-2 text-sm text-[#94a3b8]">
                Keep going to build consistency.
              </p>
            </motion.div>

          </div>

          {/* ================= STUDY PLAN (TODAY) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#1e293b] bg-[#020617] p-8"
          >
            <h3 className="text-lg font-semibold text-[#f8fafc] mb-4">
              Today’s Study Plan
            </h3>

            {studyPlan.length === 0 ? (
              <p className="text-sm text-[#94a3b8]">
                No study plan created yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {studyPlan.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex justify-between items-center border border-[#1e293b] rounded-lg p-4"
                  >
                    <div>
                      <p className="text-[#22d3ee] font-medium">
                        {item.day}
                      </p>
                      <p className="text-sm text-[#94a3b8]">
                        {item.subject}
                      </p>
                    </div>
                    <span className="text-sm text-[#f8fafc]">
                      {item.time}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* ================= ROW 4 ================= */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* WEAK AREAS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-[#1e293b] bg-[#020617] p-6"
            >
              <h3 className="text-lg font-semibold text-[#f8fafc]">
                Weak Areas
              </h3>
              <div className="mt-4 flex gap-2 flex-wrap">
                {["Algebra", "Trigonometry", "Physics Numericals"].map(
                  (topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 rounded-full bg-[#22d3ee]/10 text-[#22d3ee] text-sm"
                    >
                      {topic}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* QUICK ACTIONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-[#1e293b] bg-[#020617] p-6"
            >
              <h3 className="text-lg font-semibold text-[#f8fafc]">
                Quick Actions
              </h3>

              <div className="mt-4 flex flex-col gap-3">
                <Link to="/study-plan">
                  <button className="w-full px-4 py-2 rounded-lg bg-[#22d3ee] text-[#020617] text-sm font-medium">
                    Regenerate Study Plan
                  </button>
                </Link>

                <Link to="/ai-mentor">
                  <button className="w-full px-4 py-2 rounded-lg border border-[#22d3ee] text-[#22d3ee] text-sm font-medium">
                    Ask AI Mentor
                  </button>
                </Link>
              </div>
            </motion.div>

          </div>
                <AICursor />
        </div>
      </section>
    </div>
  );
}
