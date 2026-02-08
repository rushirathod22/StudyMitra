import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function SessionSummary() {
  const data = JSON.parse(localStorage.getItem("sessionSummary"));

  if (!data) return null;

  const accuracy = Math.round((data.score / data.total) * 100);

  const pieData = [
    { name: "Correct", value: data.score },
    { name: "Wrong", value: data.total - data.score },
  ];

  const barData = [
    { name: "Accuracy", value: accuracy },
  ];

  const COLORS = ["#22c55e", "#ef4444"]; // green / red

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#cbd5f5]">
      <Navbar />

      <section className="pt-32 max-w-4xl mx-auto px-6 space-y-10">
        <h1 className="text-3xl text-white font-semibold">
          Session Summary
        </h1>

        {/* ================= TEXT SUMMARY ================= */}
        <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-6">
          <p>Total Questions: <b>{data.total}</b></p>
          <p>Correct Answers: <b>{data.score}</b></p>
          <p>Accuracy: <b>{accuracy}%</b></p>
          <p>Difficulty Level: <b>{data.level?.toUpperCase()}</b></p>
        </div>

        {/* ================= PIE CHART ================= */}
        <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-6 h-[300px]">
          <h3 className="text-lg text-white mb-4">
            Correct vs Wrong
          </h3>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #1e293b",
                  text:"white",
                  color: "#f8fafc",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ================= BAR CHART ================= */}
        <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-6 h-[250px]">
          <h3 className="text-lg text-white mb-4">
            Accuracy Overview
          </h3>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis domain={[0, 100]} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #1e293b",
                  color: "#f8fafc",
                }}
              />
              <Bar dataKey="value" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
  <motion.div whileHover={{ scale: 1.03 }} className="flex-1">
    <Link
      to="/mistakes"
      className="
        block text-center
        px-6 py-3 rounded-xl
        border border-[#38bdf8]
        text-[#38bdf8]
        font-medium
      "
    >
      Review Mistakes
    </Link>
  </motion.div>

  <motion.div whileHover={{ scale: 1.03 }} className="flex-1">
    <Link
      to="/practice"
      className="
        block text-center
        px-6 py-3 rounded-xl
        bg-[#38bdf8]
        text-[#020617]
        font-medium
      "
    >
      Practice Again
    </Link>
  </motion.div>
</div>
      </section>
    </div>
  );
}
