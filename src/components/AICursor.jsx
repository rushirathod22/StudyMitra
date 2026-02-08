// src/components/AICursor.jsx
import { useEffect, useState } from "react";

export default function AICursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const activate = () => setActive(true);
    const deactivate = () => setActive(false);

    window.addEventListener("mousemove", move);

    // CTA hover detection
    document.querySelectorAll(".cta-btn").forEach(btn => {
      btn.addEventListener("mouseenter", activate);
      btn.addEventListener("mouseleave", deactivate);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll(".cta-btn").forEach(btn => {
        btn.removeEventListener("mouseenter", activate);
        btn.removeEventListener("mouseleave", deactivate);
      });
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[9999 pointer-events-none"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.08s ease-out",
      }}
    >
      <div
        className={`rounded-full transition-all duration-200
          ${active
            ? "w-10 h-10 bg-[#22d3ee]/30 blur-md"
            : "w-4 h-4 bg-[#22d3ee] opacity-80 blur-[2px]"
          }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}
