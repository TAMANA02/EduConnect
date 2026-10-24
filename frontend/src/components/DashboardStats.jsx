import React, { useEffect, useRef, useState } from "react";
import { Users, CalendarClock, BookOpen, UserPlus } from "lucide-react";

/**
 * DashboardStats
 * Four animated statistic cards. Numbers count up from 0 whenever the
 * target value changes, driven purely by props — the parent (Home
 * Dashboard) computes real numbers from the shared students list.
 */

function useCountUp(target, duration = 900, decimals = 0) {
  const [value, setValue] = useState(0);
  const frame = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (target - from) * eased;
      setValue(Number(current.toFixed(decimals)));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration, decimals]);

  return value;
}

function StatCard({ icon: Icon, value, label, accent, delay }) {
  return (
    <div className="ds-card" style={{ animationDelay: `${delay}ms` }}>
      <span className="ds-icon" style={{ background: accent }}>
        <Icon size={22} />
      </span>
      <div className="ds-value">{value}</div>
      <div className="ds-label">{label}</div>
    </div>
  );
}

export default function DashboardStats({
  totalStudents = 0,
  averageAge = 0,
  totalCourses = 0,
  newThisMonth = 0,
}) {
  const students = useCountUp(totalStudents, 900, 0);
  const age = useCountUp(averageAge, 900, 1);
  const courses = useCountUp(totalCourses, 900, 0);
  const newStudents = useCountUp(newThisMonth, 900, 0);

  const stats = [
    { icon: Users, value: students, label: "Total Students", accent: "linear-gradient(135deg, #2563EB, #1E3A8A)" },
    { icon: CalendarClock, value: age, label: "Average Age", accent: "linear-gradient(135deg, #1E3A8A, #0F1B3D)" },
    { icon: BookOpen, value: courses, label: "Total Courses", accent: "linear-gradient(135deg, #0EA5E9, #2563EB)" },
    { icon: UserPlus, value: `+${newStudents}`, label: "New Students This Month", accent: "linear-gradient(135deg, #22C55E, #0EA5E9)" },
  ];

  return (
    <div className="ds-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        .ds-root { font-family: 'Inter', system-ui, sans-serif; }

        .ds-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .ds-card {
          background: rgba(255, 255, 255, 0.66);
          border: 1px solid rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 20px;
          padding: 1.5rem 1.5rem 1.35rem;
          box-shadow: 0 12px 28px rgba(30, 58, 138, 0.12);
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          animation: ds-rise 0.5s ease both;
          cursor: default;
        }

        @keyframes ds-rise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ds-card:hover {
          transform: translateY(-7px) scale(1.015);
          box-shadow: 0 22px 42px rgba(30, 58, 138, 0.22);
        }

        .ds-icon {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: transform 0.3s ease;
        }

        .ds-card:hover .ds-icon { transform: rotate(-6deg) scale(1.08); }

        .ds-value {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 2.1rem;
          letter-spacing: -0.02em;
          color: #0F1B3D;
          line-height: 1;
        }

        .ds-label { font-size: 0.85rem; font-weight: 500; color: #5b6890; }

        @media (max-width: 900px) { .ds-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .ds-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="ds-grid">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 90} />
        ))}
      </div>
    </div>
  );
}
