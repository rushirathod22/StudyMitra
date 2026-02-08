import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Robot3D from "../components/Robot3D";
import RobotAssistant from "../components/RobotAssistant";
import AICursor from "../components/AICursor";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function Auth() {
  const [mode, setMode] = useState("login"); // login | signup
  const [direction, setDirection] = useState(1);

  const switchToSignup = () => {
    setDirection(1);
    setMode("signup");
  };

  const switchToLogin = () => {
    setDirection(-1);
    setMode("login");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#cbd5f5] overflow-hidden">
      <Navbar />

      {/* ================= AUTH SECTION ================= */}
      <section className="pt-28 pb-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* ================= LEFT: SPLINE ROBOT ================= */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hidden md:flex justify-center"
            >
              <div className="w-[420px] h-[520px] rounded-2xl overflow-hidden border border-[#1e293b] bg-[#020617]">
                <Robot3D />
              </div>
            </motion.div>

            {/* ================= RIGHT: SLIDING FORM ================= */}
            <div className="relative w-full max-w-md mx-auto overflow-hidden">

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={mode}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-2xl border border-[#1e293b] bg-[#020617] p-8 shadow-xl"
                >
                  {/* TITLE */}
                  <h1 className="text-2xl font-semibold text-[#f8fafc] text-center">
                    {mode === "login"
                      ? "Welcome Back"
                      : "Create Your Account"}
                  </h1>

                  <p className="mt-2 text-sm text-center text-[#94a3b8]">
                    {mode === "login"
                      ? "Login to continue your AI-powered study journey"
                      : "Join Studymitra and study smarter with AI"}
                  </p>

                  {/* FORM */}
                  <form className="mt-8 space-y-5">
                    {mode === "signup" && (
                      <div>
                        <label className="text-sm text-[#94a3b8]">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your name"
                          className="mt-1 w-full rounded-lg bg-[#0f172a] border border-[#1e293b] px-4 py-3 text-sm outline-none focus:border-[#22d3ee]"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-sm text-[#94a3b8]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-lg bg-[#0f172a] border border-[#1e293b] px-4 py-3 text-sm outline-none focus:border-[#22d3ee]"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-[#94a3b8]">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="mt-1 w-full rounded-lg bg-[#0f172a] border border-[#1e293b] px-4 py-3 text-sm outline-none focus:border-[#22d3ee]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 rounded-lg bg-[#22d3ee] py-3 font-medium text-[#020617] hover:opacity-90 transition"
                    >
                      {mode === "login" ? "Login" : "Sign Up"}
                    </button>
                  </form>

                  {/* TOGGLE */}
                  <div className="mt-6 text-center text-sm text-[#94a3b8]">
                    {mode === "login" ? (
                      <>
                        Don’t have an account?{" "}
                        <button
                          onClick={switchToSignup}
                          className="text-[#22d3ee] hover:underline"
                        >
                          Sign up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          onClick={switchToLogin}
                          className="text-[#22d3ee] hover:underline"
                        >
                          Login
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>
        </div>
      </section>

      <Footer />
      <RobotAssistant />
      <AICursor />
    </div>
  );
}
