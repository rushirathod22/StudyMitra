import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RobotAssistant from "../components/RobotAssistant";
import AICursor from "../components/AICursor";

export default function Features() {
  return (
    <div className="bg-[#0f172a] text-[#cbd5f5] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-semibold text-[#f8fafc]"
        >
          Built Around an Intelligent <br />
          Learning System
        </motion.h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg text-[#94a3b8]">
          Studymitra uses AI to understand how you study, adapt plans in real time,
          and guide you toward better learning outcomes.
        </p>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {[
            {
              title: "AI Study Planner",
              desc: "Automatically creates daily and weekly study plans based on your goals, time availability, and performance.",
            },
            {
              title: "AI Mentor",
              desc: "Acts as a personal guide that explains concepts, answers doubts, and adjusts difficulty intelligently.",
            },
            {
              title: "Smart Practice",
              desc: "Practice questions are generated and selected based on your weak areas and recent mistakes.",
            },
            {
              title: "Progress Analytics",
              desc: "Clear insights into consistency, improvement trends, and topic-level strengths and weaknesses.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="rounded-xl border border-[#1e293b] bg-[#020617] p-6 hover:border-[#22d3ee]/40 transition"
            >
              <h3 className="text-lg font-semibold text-[#f8fafc]">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= AI LOGIC EXPLANATION ================= */}
      <section className="py-28 bg-[#020617]">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold text-[#f8fafc]"
          >
            How the AI Actually Helps You
          </motion.h2>

          <p className="mt-6 text-[#94a3b8] text-lg">
            Studymitra does not just give content. It observes, adapts, and improves
            your study strategy over time.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-10 text-left">

            {[
              "Understands your study habits and pace",
              "Identifies weak topics automatically",
              "Adjusts plans and practice dynamically",
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-xl border border-[#1e293b] bg-[#020617] p-6"
              >
                <p className="text-[#f8fafc] font-medium">
                  {point}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 text-center">
        <h2 className="text-3xl font-semibold text-[#f8fafc]">
          Ready to Study Smarter?
        </h2>

        <p className="mt-4 text-[#94a3b8]">
          Let AI plan, guide, and improve your learning.
        </p>

        <button className="mt-8 px-10 py-4 rounded-xl bg-[#22d3ee] text-[#020617] font-medium">
          Get Started with Studymitra
        </button>
      </section>

      <Footer />
       <RobotAssistant />
      <AICursor />
    </div>
  );
}
