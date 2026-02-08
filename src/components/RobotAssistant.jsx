// src/components/RobotAssistant.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AIChatModal from "./AIChatModal";

const INITIAL_POSITION = {
  x: window.innerWidth - 150,
  y: window.innerHeight - 220,
};

const RobotAssistant = () => {
  const mouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const robot = useRef({ ...INITIAL_POSITION });
  const robotElement = useRef(null);
  const clickTimer = useRef(null);

  const [emotion, setEmotion] = useState("idle");
  const [isFollowing, setIsFollowing] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [, forceRender] = useState(0);

  /* Track mouse */
  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Pause on scroll */
  useEffect(() => {
    let timer;
    const onScroll = () => {
      setPaused(true);
      setEmotion("idle");
      clearTimeout(timer);
      timer = setTimeout(() => setPaused(false), 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* CTA hover → happy */
  useEffect(() => {
    const ctas = document.querySelectorAll(".cta-btn");
    const enter = () => setEmotion("happy");
    const leave = () => setEmotion(isFollowing ? "active" : "idle");

    ctas.forEach((btn) => {
      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);
    });

    return () =>
      ctas.forEach((btn) => {
        btn.removeEventListener("mouseenter", enter);
        btn.removeEventListener("mouseleave", leave);
      });
  }, [isFollowing]);

  /* Stop follow + reset when clicking outside */
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        robotElement.current &&
        !robotElement.current.contains(e.target)
      ) {
        stopAndReset();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () =>
      document.removeEventListener("click", handleOutsideClick);
  }, []);

  /* Movement loop */
  useEffect(() => {
    const move = () => {
      if (!paused && isFollowing) {
        const dx = mouse.current.x - robot.current.x;
        const dy = mouse.current.y - robot.current.y;

        robot.current.x += dx * 0.06;
        robot.current.y += dy * 0.06;
      }

      forceRender((n) => n + 1);
      requestAnimationFrame(move);
    };
    move();
  }, [paused, isFollowing]);

  /* Hint bubble */
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  /* Helpers */
  const stopAndReset = () => {
    setIsFollowing(false);
    setEmotion("idle");
    robot.current = { ...INITIAL_POSITION };
  };

  /* Click handlers */
  const handleSingleClick = () => {
    if (isFollowing) {
      stopAndReset();
    } else {
      setIsFollowing(true);
      setEmotion("active");
    }
  };

  const handleDoubleClick = () => {
    stopAndReset();
    setEmotion("curious");
    setChatOpen(true);
  };

  const angle =
    Math.atan2(
      mouse.current.y - robot.current.y,
      mouse.current.x - robot.current.x
    ) *
    (180 / Math.PI);

  return (
    <>
      <div
        className="fixed z-50 hidden md:block pointer-events-none"
        style={{
          left: robot.current.x - 40,
          top: robot.current.y - 70,
        }}
      >
        {/* Hint */}
        {showHint && !chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-10 text-xs bg-white px-3 py-1 rounded-full shadow"
          >
            Need help?
          </motion.div>
        )}

        {/* Robot */}
        <motion.div
          ref={robotElement}
          onClick={() => {
            if (clickTimer.current) return;
            clickTimer.current = setTimeout(() => {
              handleSingleClick();
              clickTimer.current = null;
            }, 250);
          }}
          onDoubleClick={() => {
            clearTimeout(clickTimer.current);
            clickTimer.current = null;
            handleDoubleClick();
          }}
          className="flex flex-col items-center cursor-pointer pointer-events-auto"
        >
          {/* Head */}
          <motion.div
            className={`w-16 h-14 rounded-2xl shadow-lg flex items-center justify-center ${
              emotion === "happy"
                ? "bg-gradient-to-br from-green-400 to-emerald-500"
                : emotion === "active"
                ? "bg-gradient-to-br from-indigo-500 to-cyan-400"
                : emotion === "curious"
                ? "bg-gradient-to-br from-purple-500 to-indigo-500"
                : "bg-gradient-to-br from-indigo-400 to-indigo-600"
            }`}
            animate={{ rotate: angle * 0.05 }}
          >
            <div className="flex gap-2">
              <Eye mouse={mouse.current} robot={robot.current} />
              <Eye mouse={mouse.current} robot={robot.current} />
            </div>
          </motion.div>

          {/* Body */}
          <div className="w-20 h-16 bg-white rounded-2xl shadow border flex items-center justify-center mt-1">
            <motion.div
              className="w-6 h-6 rounded-full bg-indigo-500 opacity-70"
              animate={{ scale: isFollowing ? 1.4 : 1 }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      <AIChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

const Eye = ({ mouse, robot }) => {
  const dx = mouse.x - robot.x;
  const dy = mouse.y - robot.y;
  const angle = Math.atan2(dy, dx);

  return (
    <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
      <motion.div
        className="w-1.5 h-1.5 bg-indigo-800 rounded-full"
        animate={{
          x: Math.cos(angle) * 3,
          y: Math.sin(angle) * 3,
        }}
      />
    </div>
  );
};

export default RobotAssistant;
