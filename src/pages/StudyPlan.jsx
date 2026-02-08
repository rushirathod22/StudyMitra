import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AICursor from "../components/AICursor";
import Navbar from "../components/Navbar";

export default function StudyPlan() {
  const [form, setForm] = useState({
    subjects: "",
    goal: "",
    examDate: "",
    hours: "",
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePlan = () => {
    setLoading(true);
    setPlan(null);

    // simulate AI processing delay
    setTimeout(() => {
      const generatedPlan = [
        { day: "Day 1", subject: "Core Concepts", time: "2 hrs" },
        { day: "Day 2", subject: "Practice + Examples", time: "1.5 hrs" },
        { day: "Day 3", subject: "Revision", time: "1 hr" },
        { day: "Day 4", subject: "Mock Test", time: "1 hr" },
      ];

      // SAVE TO LOCAL STORAGE
      localStorage.setItem("studyPlan", JSON.stringify(generatedPlan));

      // UPDATE STATE
      setPlan(generatedPlan);
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="bg-[#0f172a] text-[#cbd5f5] min-h-screen">
      <Navbar />

      {/* ================= HEADER ================= */}
      <section className="pt-32 pb-20 max-w-6xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#f8fafc]">
          Create Your AI Study Plan
        </h1>
        <p className="mt-2 text-[#94a3b8] max-w-xl">
          Tell the AI your goal and subjects. A focused plan will be created for you.
        </p>
      </section>

      {/* ================= FORM ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8 bg-[#020617] border border-[#1e293b] rounded-2xl p-8"
        >
          <div>
            <label className="text-sm text-[#94a3b8]">Subjects</label>
            <input
              name="subjects"
              placeholder="Maths, Physics"
              value={form.subjects}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg bg-[#0f172a] border border-[#1e293b] px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm text-[#94a3b8]">Goal</label>
            <input
              name="goal"
              placeholder="Exam revision"
              value={form.goal}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg bg-[#0f172a] border border-[#1e293b] px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm text-[#94a3b8]">Exam Date</label>
            <input
              type="date"
              name="examDate"
              value={form.examDate}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg bg-[#0f172a] border border-[#1e293b] px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm text-[#94a3b8]">Daily Hours</label>
            <input
              name="hours"
              placeholder="2"
              value={form.hours}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg bg-[#0f172a] border border-[#1e293b] px-4 py-3"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={generatePlan}
              className="px-8 py-3 rounded-xl bg-[#22d3ee] text-[#020617] font-medium"
            >
              Generate AI Study Plan
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ================= LOADING ================= */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mx-auto w-12 h-12 rounded-full border-2 border-[#22d3ee] border-t-transparent animate-spin" />
            <p className="mt-4 text-[#94a3b8]">
              AI is creating your study plan...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= GENERATED PLAN ================= */}
      <AnimatePresence>
        {plan && (
          <motion.section
            className="mt-20 max-w-6xl mx-auto px-6 pb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-semibold text-[#f8fafc] mb-8">
              Your AI-Generated Plan
            </h2>

            <div className="space-y-4">
              {plan.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex justify-between items-center rounded-xl bg-[#020617] border border-[#1e293b] p-6"
                >
                  <div>
                    <p className="text-[#22d3ee] font-medium">{item.day}</p>
                    <p className="text-sm text-[#94a3b8]">{item.subject}</p>
                  </div>
                  <span className="text-[#f8fafc] font-medium">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <AICursor />
    </div>
  );
}
