import React, { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";

/**
 * Navbar
 * Reusable, sticky top navigation for the Student Management System.
 * Doesn't assume a router — pass the current page key via `activePage`
 * and handle navigation via `onNavigate(pageKey)`.
 */

const NAV_LINKS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "students", label: "Students" },
  { key: "add", label: "Add Student" },
  { key: "about", label: "About" },
];

export default function Navbar({ activePage = "dashboard", onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (key) => {
    onNavigate?.(key);
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        .nb-navbar {
          --ink: #0F1B3D;
          --navy: #1E3A8A;
          --blue: #2563EB;
          --line: rgba(30, 58, 138, 0.09);

          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.75rem;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--line);
          font-family: 'Inter', system-ui, sans-serif;
        }

        .nb-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.08rem;
          letter-spacing: -0.01em;
          color: var(--navy);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .nb-logo-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--blue), var(--navy));
          color: #fff;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35);
          flex-shrink: 0;
        }

        .nb-links {
          display: flex;
          gap: 0.35rem;
          align-items: center;
        }

        .nb-link {
          position: relative;
          border: none;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 0.92rem;
          color: #43507a;
          padding: 0.5rem 0.9rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
        }

        .nb-link:hover {
          background: rgba(37, 99, 235, 0.08);
          color: var(--navy);
          transform: translateY(-1px);
        }

        .nb-link.is-active {
          background: linear-gradient(135deg, var(--blue), var(--navy));
          color: #fff;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .nb-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--navy);
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .nb-menu-btn:hover { background: rgba(37, 99, 235, 0.08); }

        .nb-mobile-panel {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          max-height: 0;
          overflow: hidden;
          padding: 0 1.25rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--line);
          transition: max-height 0.3s ease, padding 0.3s ease;
          position: sticky;
          top: 62px;
          z-index: 99;
        }

        .nb-mobile-panel.is-open {
          max-height: 260px;
          padding: 0.75rem 1.25rem 1rem;
        }

        .nb-mobile-panel .nb-link { text-align: left; }

        @media (max-width: 640px) {
          .nb-links { display: none; }
          .nb-menu-btn { display: inline-flex; }
        }
      `}</style>

      <nav className="nb-navbar">
        <button className="nb-logo" onClick={() => handleClick("dashboard")}>
          <span className="nb-logo-badge"><GraduationCap size={20} /></span>
          Student Management System
        </button>

        <div className="nb-links">
          {NAV_LINKS.map(({ key, label }) => (
            <button
              key={key}
              className={`nb-link ${activePage === key ? "is-active" : ""}`}
              onClick={() => handleClick(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className="nb-menu-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div className={`nb-mobile-panel ${menuOpen ? "is-open" : ""}`}>
        {NAV_LINKS.map(({ key, label }) => (
          <button
            key={key}
            className={`nb-link ${activePage === key ? "is-active" : ""}`}
            onClick={() => handleClick(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
