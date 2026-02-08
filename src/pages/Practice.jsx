import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const QUESTION_POOL = [
  {
    level: "easy",
    question: "2x + 4 = 10. Find x.",
    options: ["2", "3", "4", "5"],
    correct: "3",
    explanation: "2x = 6, so x = 3.",
  },
  {
    level: "medium",
    question: "Which number is a prime number?",
    options: ["9", "15", "17", "21"],
    correct: "17",
    explanation: "17 has only two divisors: 1 and itself.",
  },
  {
    level: "hard",
    question: "If f(x)=2x², what is f(3)?",
    options: ["12", "18", "9", "6"],
    correct: "18",
    explanation: "f(3) = 2 × 9 = 18.",
  },
];

export default function Practice() {
  const navigate = useNavigate();

  /* -------- SETUP STATE -------- */
  const [step, setStep] = useState("setup"); // setup | loading | practice
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("easy");
  const [count, setCount] = useState(2);

  /* -------- PRACTICE STATE -------- */
  const questions = QUESTION_POOL.filter(q => q.level === level).slice(0, count);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState([]);

  const current = questions[index];

  /* -------- START PRACTICE -------- */
  const startPractice = () => {
    setStep("loading");
    setTimeout(() => {
      setStep("practice");
    }, 1500);
  };

  /* -------- HANDLE ANSWER -------- */
  const answer = (opt) => {
    if (showResult) return;

    setSelected(opt);
    setShowResult(true);

    if (opt === current.correct) {
      setScore(s => s + 1);
    } else {
      setMistakes(m => [...m, { ...current, user: opt }]);
    }
  };

  /* -------- NEXT QUESTION -------- */
  const next = () => {
    setSelected(null);
    setShowResult(false);

    if (index + 1 === questions.length) {
      // ✅ SAVE SESSION SUMMARY
      localStorage.setItem(
        "sessionSummary",
        JSON.stringify({
          topic,
          level,
          total: questions.length,
          score,
          accuracy: Math.round((score / questions.length) * 100),
        })
      );

      // ✅ SAVE MISTAKES
      localStorage.setItem("mistakes", JSON.stringify(mistakes));

      // ✅ GO TO SESSION SUMMARY PAGE
      navigate("/session-summary");
    } else {
      setIndex(i => i + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#cbd5f5]">
      <Navbar />

      <section className="pt-28 pb-24 max-w-3xl mx-auto px-6">

        {/* ================= SETUP ================= */}
        {step === "setup" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#020617] border border-[#1e293b] rounded-2xl p-8 space-y-6"
          >
            <h1 className="text-2xl text-white font-semibold">
              Start Practice
            </h1>

            <input
              placeholder="Enter Topic (e.g. Algebra)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#0f172a] border border-[#1e293b] px-4 py-3 rounded-lg"
            />

            <div className="flex gap-3">
              {["easy", "medium", "hard"].map(l => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-4 py-2 rounded-lg border ${
                    level === l
                      ? "border-sky-400 text-sky-400"
                      : "border-[#1e293b]"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <input
              type="number"
              min="1"
              max="3"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full bg-[#0f172a] border border-[#1e293b] px-4 py-3 rounded-lg"
              placeholder="Number of Questions"
            />

            <button
              onClick={startPractice}
              className="w-full bg-sky-400 text-black py-3 rounded-lg font-medium"
            >
              Start Practice
            </button>
          </motion.div>
        )}

        {/* ================= LOADING ================= */}
        {step === "loading" && (
          <div className="text-center mt-20">
            <div className="mx-auto w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-slate-400">
              AI is preparing your practice session...
            </p>
          </div>
        )}

        {/* ================= PRACTICE ================= */}
        {step === "practice" && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#020617] border border-[#1e293b] rounded-2xl p-6"
          >
            <p className="text-sm text-slate-400">
              Question {index + 1} of {questions.length}
            </p>

            <h2 className="text-xl text-white mt-2">
              {current.question}
            </h2>

            <div className="mt-4 space-y-2">
              {current.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => answer(opt)}
                  className={`w-full px-4 py-2 rounded-lg border text-left ${
                    showResult
                      ? opt === current.correct
                        ? "border-green-400 text-green-400"
                        : opt === selected
                          ? "border-red-400 text-red-400"
                          : "border-[#1e293b]"
                      : "border-[#1e293b] hover:border-sky-400"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* AI EXPLANATION */}
            {showResult && (
              <div className="mt-4 border border-sky-400/30 rounded-lg p-4">
                <p className="text-sky-400 text-sm font-medium">
                  AI Explanation
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  {current.explanation}
                </p>
              </div>
            )}

            {showResult && (
              <button
                onClick={next}
                className="mt-6 bg-sky-400 text-black px-5 py-2 rounded-lg"
              >
                Next
              </button>
            )}
          </motion.div>
        )}

      </section>
    </div>
  );
}
