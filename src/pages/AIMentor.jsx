import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AICursor from "../components/AICursor";
import Navbar from "../components/Navbar";

export default function AIMentor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const endRef = useRef(null);

  // auto scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const sendMessage = (text) => {
    if (!text.trim() || isThinking) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    // Simulated AI response (replace later with backend)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "Great question. Let’s approach this step by step so it’s easy to understand. Tell me what you already know about this topic.",
        },
      ]);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <div className="h-screen bg-[#0f172a] text-[#cbd5f5] flex flex-col">
      <Navbar />

      {/* ================= HEADER ================= */}
      <div className="border-b border-[#1e293b] px-6 py-4">
        <h1 className="text-lg font-semibold text-[#f8fafc]">
          AI Mentor
        </h1>
        <p className="text-sm text-[#94a3b8]">
          Your personal study companion
        </p>
      </div>

      {/* ================= CHAT AREA ================= */}
      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-4xl mx-auto w-full">

        {/* EMPTY STATE */}
        {messages.length === 0 && !isThinking && (
          <div className="text-center mt-24">
            <h2 className="text-2xl font-semibold text-[#f8fafc]">
              How can I help you today?
            </h2>
            <p className="mt-2 text-[#94a3b8]">
              Ask doubts, plan studies, or revise topics.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                "Create a study plan",
                "Explain a concept",
                "Help me revise",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-xl border border-[#1e293b] bg-[#020617] p-4 text-sm hover:border-[#22d3ee] transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`mb-5 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#22d3ee] text-[#020617]"
                  : "bg-[#020617] border border-[#1e293b]"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* AI THINKING */}
        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start mb-5"
            >
              <div className="rounded-2xl px-5 py-3 text-sm bg-[#020617] border border-[#1e293b]">
                <span className="animate-pulse">
                  AI Mentor is thinking…
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={endRef} />
      </div>

      {/* ================= INPUT ================= */}
      <div className="border-t border-[#1e293b] px-6 py-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask your AI mentor..."
            disabled={isThinking}
            className="flex-1 rounded-xl bg-[#020617] border border-[#1e293b] px-5 py-3 text-sm outline-none focus:border-[#22d3ee]"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isThinking}
            className="rounded-xl bg-[#22d3ee] px-6 py-3 font-medium text-[#020617] disabled:opacity-50"
          >
            Send
          </button>
          <AICursor />
        </div>
      </div>
    </div>
  );
}
