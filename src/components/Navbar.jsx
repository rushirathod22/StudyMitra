import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Study Plan", path: "/study-plan" },
  { name: "AI Tutor", path: "/ai-mentor" },
  { name: "Practice", path: "/practice" },
  { name: "Progress", path: "/progress" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);
  const location = useLocation();

  /* ---------- SCROLL: TRANSPARENT → SOLID ---------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- UPDATE UNDERLINE POSITION ---------- */
  useEffect(() => {
    const activeLink = navRef.current?.querySelector(
      `[data-path='${location.pathname}']`
    );

    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink;
      setUnderline({ left: offsetLeft, width: offsetWidth });
    }
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div
        className={`
          w-full transition-all duration-300
          ${scrolled
            ? "bg-[#0f172a]/95 backdrop-blur-md border-b border-[#1e293b]"
            : "bg-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* ===== LOGO ===== */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#22d3ee] flex items-center justify-center text-[#020617] font-semibold">
              🤖
            </div>
            <span className="text-lg font-semibold text-[#f8fafc]">
              Studymitra
            </span>
          </Link>

          {/* ===== NAV LINKS ===== */}
          <div className="relative hidden md:flex items-center gap-6" ref={navRef}>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                data-path={item.path}
                className={({ isActive }) =>
                  `
                  text-sm transition-colors
                  ${isActive
                    ? "text-[#22d3ee]"
                    : "text-[#cbd5f5] hover:text-[#22d3ee]"}
                  `
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* SLIDING UNDERLINE */}
            <span
              className="absolute -bottom-1 h-[2px] bg-[#22d3ee] transition-all duration-300"
              style={{
                left: underline.left,
                width: underline.width,
              }}
            />
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="flex items-center gap-4">
            <Link
              to="/auth"
              className="text-sm text-[#cbd5f5] hover:text-[#22d3ee]"
            >
              Log in
            </Link>

            <Link
              to="/auth"
              className="px-5 py-2 rounded-xl bg-[#22d3ee] text-[#020617] text-sm font-medium hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
