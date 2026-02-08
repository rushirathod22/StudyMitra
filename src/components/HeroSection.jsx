import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-24 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Your Personal <span className="text-indigo-600">AI Study Companion</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Study smarter with an AI that plans, guides, and tracks your learning.
          </p>

          <button className="cta-btn mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg">
            Start Studying Smarter
          </button>
        </div>

        {/* RIGHT ANIMATION */}
        <div className="relative flex justify-center items-center">

          {/* AI Glow */}
          <motion.div
            className="absolute w-56 h-56 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 opacity-30 blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* AI Orb */}
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center text-indigo-600 font-semibold"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            AI
          </motion.div>

          {/* Student Illustration */}
          <motion.img
            src="/student-study.png" // your illustration
            alt="Student studying"
            className="w-72 relative z-10"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
