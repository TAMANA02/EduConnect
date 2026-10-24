import React from "react";
import { GraduationCap, ArrowRight, UserPlus } from "lucide-react";
import DashboardStats from "../components/DashboardStats.jsx";

/**
 * HomeDashboard
 * Landing page. Stats are computed by App.jsx from the real shared
 * students list and passed in as props, so they update the moment a
 * student is added, edited, or deleted anywhere in the app.
 */
export default function HomeDashboard({ stats, onNavigate }) {
  return (
    <div className="hd-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        .hd-root {
          --ink: #0F1B3D;
          --navy: #1E3A8A;
          --blue: #2563EB;
          --sky: #0EA5E9;
          --paper: #F5F8FE;
          --line: rgba(30, 58, 138, 0.09);
          --muted: #5b6890;

          min-height: calc(100vh - 400px);
          font-family: 'Inter', system-ui, sans-serif;
          color: var(--ink);
          background:
            repeating-linear-gradient(to bottom, transparent 0px, transparent 35px, var(--line) 36px),
            radial-gradient(circle at 15% 8%, #dbe9ff 0%, transparent 45%),
            radial-gradient(circle at 90% 0%, #e6f2ff 0%, transparent 40%),
            var(--paper);
          padding-bottom: 4rem;
        }

        .hd-hero {
          position: relative;
          margin: 2.25rem 1.75rem 0;
          padding: 3rem 2.25rem;
          border-radius: 26px;
          overflow: hidden;
          background: linear-gradient(120deg, #1E3A8A 0%, #2563EB 55%, #0EA5E9 120%);
          color: #fff;
          box-shadow: 0 20px 45px rgba(30, 58, 138, 0.28);
        }

        .hd-hero::before {
          content: "";
          position: absolute;
          width: 340px;
          height: 340px;
          right: -80px;
          top: -120px;
          background: radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%);
          border-radius: 50%;
        }

        .hd-hero::after {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          left: 10%;
          bottom: -140px;
          background: radial-gradient(circle, rgba(255,255,255,0.16), transparent 70%);
          border-radius: 50%;
        }

        .hd-eyebrow {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.35rem 0.8rem;
          border-radius: 999px;
          margin-bottom: 1.1rem;
        }

        .hd-hero h1 {
          position: relative;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(1.75rem, 3.4vw, 2.75rem);
          line-height: 1.12;
          margin: 0 0 0.85rem;
          max-width: 720px;
          letter-spacing: -0.01em;
        }

        .hd-hero p {
          position: relative;
          max-width: 560px;
          font-size: 1.02rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.92);
          margin: 0 0 1.6rem;
        }

        .hd-hero-actions { position: relative; display: flex; gap: 0.75rem; flex-wrap: wrap; }

        .hd-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.92rem;
          padding: 0.7rem 1.2rem;
          border-radius: 999px;
          cursor: pointer;
          border: none;
          transition: transform 0.15s ease, filter 0.2s ease;
        }

        .hd-cta.primary { background: #fff; color: var(--navy); }
        .hd-cta.ghost { background: rgba(255,255,255,0.14); color: #fff; border: 1px solid rgba(255,255,255,0.35); }
        .hd-cta:hover { transform: translateY(-2px); filter: brightness(1.03); }

        .hd-stats {
          margin: -2.4rem 1.75rem 0;
          position: relative;
          z-index: 5;
        }

        @media (max-width: 860px) {
          .hd-hero { padding: 2.4rem 1.6rem; margin: 1.5rem 1.25rem 0; }
        }

        @media (max-width: 640px) {
          .hd-stats { margin: -1.6rem 1.25rem 0; }
          .hd-hero { border-radius: 20px; }
        }
      `}</style>

      <section className="hd-hero">
        <span className="hd-eyebrow"><GraduationCap size={14} /> Dashboard</span>
        <h1>Welcome to Student Management System</h1>
        <p>
          Keep every student record in one place. Add, search, filter, and
          update enrollments in a few clicks, and watch your totals update
          the moment they change.
        </p>
        <div className="hd-hero-actions">
          <button className="hd-cta primary" onClick={() => onNavigate("add")}>
            <UserPlus size={16} /> Add Student
          </button>
          <button className="hd-cta ghost" onClick={() => onNavigate("students")}>
            View Students <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <div className="hd-stats">
        <DashboardStats
          totalStudents={stats.totalStudents}
          averageAge={stats.averageAge}
          totalCourses={stats.totalCourses}
          newThisMonth={stats.newThisMonth}
        />
      </div>
    </div>
  );
}
