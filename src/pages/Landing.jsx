import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RobotAssistant from "../components/RobotAssistant";
import AICursor from "../components/AICursor";
import Robot3D from "../components/Robot3D";

import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-[#0f172a] text-[#cbd5f5] overflow-x-hidden">

      <Navbar />

      {/* ================= HERO SECTION ================= */}
<section className="relative min-h-screen pt-28 flex items-center overflow-hidden bg-[#0f172a]">

  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0f172a]" />

  <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

    {/* ===== LEFT: TEXT ===== */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <p className="text-[#22d3ee] text-sm uppercase tracking-wide">
        AI-Powered Learning
      </p>

      <h1 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight text-[#f8fafc]">
        Study Smarter with Your <br />
        <span className="text-[#22d3ee]">
          Personal AI Mentor
        </span>
      </h1>

      <p className="mt-6 text-base md:text-lg max-w-xl text-[#94a3b8]">
        Studymitra helps you plan studies, understand concepts,
        practice effectively, and track progress with intelligent AI guidance.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="px-8 py-4 rounded-xl bg-[#22d3ee] text-[#020617] font-medium">
          Get Started
        </button>

        <button className="px-8 py-4 rounded-xl border border-[#22d3ee]/40 text-[#22d3ee]">
          View Demo
        </button>
      </div>
    </motion.div>

    {/* ===== RIGHT: SPLINE 3D ROBOT ===== */}
    {/* RIGHT SIDE – 3D ROBOT */}
<div className="relative w-full h-[420px] md:h-[520px] border border-[#1e293b] rounded-2xl overflow-hidden">
  <Robot3D />
</div>


  </div>
</section>


      {/* ================= HOW IT WORKS ================= */}
     <section id="how" className="py-28 bg-[#020617]">
  <div className="max-w-7xl mx-auto px-6 text-center">

    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="text-3xl font-semibold text-[#f8fafc]"
    >
      How Studymitra Helps You Study
    </motion.h2>

    {/* Cards container */}
    <motion.div
      className="mt-20 grid md:grid-cols-4 gap-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.16, // ⭐ sweet spot
          },
        },
      }}
    >
      {[
        ["Set Goals", "Choose subjects and available study time"],
        ["AI Plans", "Creates a realistic and adaptive study schedule"],
        ["Study & Practice", "Learn with guided explanations"],
        ["Track Progress", "See improvement and weak areas clearly"],
      ].map(([title, desc], index) => (
        <motion.div
          key={index}
          variants={{
            hidden: {
              opacity: 0,
              y: 36,
              scale: 0.98,
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1], // ⭐ natural easing
              },
            },
          }}
          whileHover={{
            y: -8,
            boxShadow: "0 30px 60px rgba(34,211,238,0.18)",
          }}
          className="relative rounded-xl border border-[#1e293b] bg-[#020617] p-6 text-left transition"
        >
          <h3 className="text-[#22d3ee] font-semibold text-lg">
            {title}
          </h3>

          <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed">
            {desc}
          </p>

          {/* accent underline */}
          <div className="mt-6 h-[2px] w-8 bg-[#22d3ee]/40 rounded-full transition-all duration-300 group-hover:w-14" />
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>





      {/* ================= USE CASES ================= */}
      <section id="usecases" className="py-28">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-center text-[#f8fafc]">
            Designed for Real Study Sessions
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              "Daily Study Routine",
              "Exam Preparation",
              "Improving Weak Topics",
            ].map(item => (
              <div
                key={item}
                className="p-8 rounded-xl bg-white/5 border border-white/10"
              >
                {item}
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ================= AI CAPABILITIES ================= */}
<section className="py-28 bg-[#020617]">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-3xl md:text-4xl font-semibold text-white text-center">
      What Makes Studymitra Intelligent
    </h2>

    <div className="mt-20 grid md:grid-cols-3 gap-10">
      {[
        ["AI Mentor", "Explains concepts in a way you understand"],
        ["Smart Planner", "Adapts daily plans based on performance"],
        ["Insight Engine", "Finds weak areas automatically"],
      ].map(([title, desc], i) => (
        <motion.div
          key={i}
          whileHover={{
            rotateX: 6,
            rotateY: -6,
            scale: 1.03,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="relative rounded-2xl bg-[#020617] border border-[#1e293b] p-8"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#22d3ee]/10 to-transparent opacity-0 hover:opacity-100 transition" />

          <h3 className="text-lg font-semibold text-white relative z-10">
            {title}
          </h3>
          <p className="mt-3 text-sm text-[#94a3b8] relative z-10">
            {desc}
          </p>
        </motion.div>
      ))}
    </div>

  </div>
</section>
{/* ================= ADAPTIVE FLOW ================= */}
<section className="py-28 bg-[#0f172a]">
  <div className="max-w-5xl mx-auto px-6">

    <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-20">
      How Learning Adapts Over Time
    </h2>

    {[
      "You start studying",
      "AI observes your pace",
      "Weak areas are detected",
      "Plans adapt automatically",
    ].map((step, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`mb-14 flex ${
          i % 2 === 0 ? "justify-start" : "justify-end"
        }`}
      >
        <div className="w-full md:w-1/2 rounded-xl bg-[#020617] border border-[#1e293b] p-6">
          <p className="text-white font-medium">
            {step}
          </p>
        </div>
      </motion.div>
    ))}

  </div>
</section>

{/* ================= LIVE STATS ================= */}
<section className="py-28 bg-[#020617]">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">

    {[
      ["90%", "Consistency Improvement"],
      ["3×", "Faster Revision"],
      ["24/7", "AI Availability"],
      ["100%", "Personalized"],
    ].map(([num, label], i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      >
        <p className="text-4xl font-semibold text-[#22d3ee]">
          {num}
        </p>
        <p className="mt-2 text-sm text-[#94a3b8]">
          {label}
        </p>
      </motion.div>
    ))}

  </div>
</section>
{/* ================= FAQ ================= */}
<section className="py-28 bg-[#0f172a]">
  <div className="max-w-4xl mx-auto px-6">

    <h2 className="text-3xl font-semibold text-white text-center mb-16">
      Questions Students Usually Ask
    </h2>

    {[
      ["Is Studymitra free?", "Yes, you can start for free."],
      ["Does AI replace teachers?", "No, it supports learning."],
      ["Can plans change?", "Yes, they adapt automatically."],
    ].map(([q, a], i) => (
      <motion.details
        key={i}
        className="mb-6 rounded-xl bg-[#020617] border border-[#1e293b] p-6"
        whileHover={{ scale: 1.01 }}
      >
        <summary className="cursor-pointer text-white font-medium">
          {q}
        </summary>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-sm text-[#94a3b8]"
        >
          {a}
        </motion.p>
      </motion.details>
    ))}

  </div>
</section>


      {/* ================= FINAL CTA ================= */}
      <section className="py-28 bg-[#020617] text-center">
        <h2 className="text-3xl font-semibold text-[#f8fafc]">
          Make Your Study Time More Effective
        </h2>

        <button className="cta-btn mt-8 px-10 py-4 rounded-xl bg-[#22d3ee] text-[#020617] font-medium">
          Start Studying with AI
        </button>
      </section>

      <Footer />
      <RobotAssistant />
  <AICursor />
    </div>
  );
}
