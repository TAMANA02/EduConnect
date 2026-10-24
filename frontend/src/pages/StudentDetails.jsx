import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  CalendarClock,
  BookOpen,
  BadgeCheck,
  CalendarDays,
  Pencil,
  Trash2,
  ArrowLeft,
  TrendingUp,
  Layers,
  Percent,
} from "lucide-react";

/**
 * StudentDetails
 * Full profile view for a single student, read from shared app state.
 * If `student` is null (e.g. deep link without a selection), shows a
 * friendly empty state instead of crashing.
 */

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function StudentDetails({ student, onBack, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!student) {
    return (
      <div className="sd-root sd-empty-page">
        <style>{`
          .sd-empty-page {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 400px);
            font-family: 'Inter', system-ui, sans-serif;
            color: #5b6890;
            background: #F5F8FE;
          }
        `}</style>
        <div>
          <p>No student selected.</p>
          <button onClick={onBack} style={{ marginTop: "0.75rem", cursor: "pointer" }}>
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  const infoRows = [
    { icon: BadgeCheck, label: "Student ID", value: student.studentId, mono: true },
    { icon: CalendarClock, label: "Age", value: `${student.age} years` },
    { icon: BookOpen, label: "Course", value: student.course },
    { icon: Mail, label: "Email", value: student.email },
    { icon: Phone, label: "Phone Number", value: student.mobile },
    { icon: MapPin, label: "Address", value: student.address },
    { icon: CalendarDays, label: "Joining Date", value: student.joiningDate },
  ];

  const academicStats = [
    { icon: Percent, label: "Attendance", value: `${student.attendance}%`, accent: "#2563EB" },
    { icon: Layers, label: "Current Semester", value: student.semester, accent: "#1E3A8A" },
    { icon: TrendingUp, label: "CGPA", value: Number(student.cgpa).toFixed(1), accent: "#0EA5E9" },
  ];

  return (
    <div className="sd-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');

        .sd-root {
          --ink: #0F1B3D;
          --navy: #1E3A8A;
          --blue: #2563EB;
          --sky: #0EA5E9;
          --paper: #F5F8FE;
          --line: rgba(30, 58, 138, 0.09);
          --glass-bg: rgba(255, 255, 255, 0.66);
          --glass-border: rgba(255, 255, 255, 0.85);
          --muted: #5b6890;
          --danger: #C0392B;

          min-height: calc(100vh - 400px);
          font-family: 'Inter', system-ui, sans-serif;
          color: var(--ink);
          background:
            repeating-linear-gradient(to bottom, transparent 0px, transparent 35px, var(--line) 36px),
            radial-gradient(circle at 10% 4%, #dbe9ff 0%, transparent 45%),
            radial-gradient(circle at 92% 0%, #e6f2ff 0%, transparent 40%),
            var(--paper);
          padding: 2.25rem 1.75rem 4rem;
        }

        .sd-wrap { max-width: 980px; margin: 0 auto; }

        .sd-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #fff;
          border: 1px solid rgba(30, 58, 138, 0.14);
          color: var(--navy);
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.86rem;
          padding: 0.55rem 1rem;
          border-radius: 999px;
          cursor: pointer;
          margin-bottom: 1.5rem;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .sd-back:hover { background: rgba(37, 99, 235, 0.08); transform: translateX(-2px); }

        .sd-layout { display: grid; grid-template-columns: 300px 1fr; gap: 1.5rem; align-items: start; }

        .sd-profile-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 24px;
          padding: 2rem 1.5rem;
          box-shadow: 0 16px 36px rgba(30, 58, 138, 0.14);
          text-align: center;
          animation: sd-rise 0.4s ease both;
        }

        @keyframes sd-rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .sd-avatar {
          width: 108px;
          height: 108px;
          border-radius: 28px;
          margin: 0 auto 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 2.1rem;
          color: #fff;
          background: linear-gradient(135deg, var(--blue), var(--sky));
          box-shadow: 0 14px 28px rgba(37, 99, 235, 0.32);
        }

        .sd-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.28rem; letter-spacing: -0.01em; margin-bottom: 0.3rem; }

        .sd-id-tag {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.76rem;
          font-weight: 500;
          color: var(--navy);
          background: rgba(37, 99, 235, 0.1);
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          margin-bottom: 1.4rem;
        }

        .sd-profile-actions { display: flex; flex-direction: column; gap: 0.6rem; }

        .sd-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.72rem 1rem;
          border-radius: 12px;
          cursor: pointer;
          border: none;
          transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .sd-btn.primary {
          background: linear-gradient(135deg, var(--blue), var(--navy));
          color: #fff;
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.32);
        }
        .sd-btn.primary:hover { transform: translateY(-2px); filter: brightness(1.05); }

        .sd-btn.danger { background: #fff; border: 1.5px solid rgba(192, 57, 43, 0.3); color: var(--danger); }
        .sd-btn.danger:hover { background: var(--danger); color: #fff; }

        .sd-btn.danger.confirming {
          background: var(--danger);
          color: #fff;
          animation: sd-pulse 1.1s ease infinite;
        }

        @keyframes sd-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(192, 57, 43, 0.35); }
          50% { box-shadow: 0 0 0 8px rgba(192, 57, 43, 0); }
        }

        .sd-right { display: flex; flex-direction: column; gap: 1.25rem; }

        .sd-section {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 22px;
          padding: 1.75rem;
          box-shadow: 0 14px 30px rgba(30, 58, 138, 0.1);
          animation: sd-rise 0.45s ease both;
        }

        .sd-section-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.05rem; color: var(--navy); margin: 0 0 1.25rem; }

        .sd-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.15rem 1.5rem; }
        .sd-info-item.full { grid-column: 1 / -1; }

        .sd-info-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 0.3rem;
        }

        .sd-info-label svg { color: var(--blue); }
        .sd-info-value { font-size: 0.96rem; font-weight: 500; color: var(--ink); line-height: 1.45; }
        .sd-info-value.mono { font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; }

        .sd-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }

        .sd-stat {
          background: #fff;
          border: 1px solid rgba(30, 58, 138, 0.1);
          border-radius: 16px;
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .sd-stat:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(30, 58, 138, 0.14); }

        .sd-stat-icon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        .sd-stat-value { font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 1.4rem; color: var(--ink); }
        .sd-stat-label { font-size: 0.82rem; color: var(--muted); font-weight: 500; }

        .sd-progress-track {
          width: 100%;
          height: 6px;
          background: rgba(37, 99, 235, 0.12);
          border-radius: 999px;
          overflow: hidden;
          margin-top: -0.15rem;
        }

        .sd-progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--blue), var(--sky)); }

        @media (max-width: 820px) {
          .sd-layout { grid-template-columns: 1fr; }
          .sd-profile-card { display: flex; flex-direction: column; align-items: center; }
        }

        @media (max-width: 560px) {
          .sd-info-grid { grid-template-columns: 1fr; }
          .sd-stats { grid-template-columns: 1fr; }
          .sd-section { padding: 1.35rem; }
        }
      `}</style>

      <div className="sd-wrap">
        <button className="sd-back" onClick={onBack}><ArrowLeft size={16} /> Back to Students</button>

        <div className="sd-layout">
          <div className="sd-profile-card">
            <div className="sd-avatar">{initials(student.name)}</div>
            <div className="sd-name">{student.name}</div>
            <span className="sd-id-tag">{student.studentId}</span>

            <div className="sd-profile-actions">
              <button className="sd-btn primary" onClick={() => onEdit(student.id)}>
                <Pencil size={16} /> Edit Student
              </button>
              <button
                className={`sd-btn danger ${confirmDelete ? "confirming" : ""}`}
                onClick={() => {
                  if (confirmDelete) onDelete(student.id);
                  else setConfirmDelete(true);
                }}
                onBlur={() => setConfirmDelete(false)}
              >
                <Trash2 size={16} /> {confirmDelete ? "Confirm Delete" : "Delete Student"}
              </button>
            </div>
          </div>

          <div className="sd-right">
            <div className="sd-section">
              <h2 className="sd-section-title">Student Information</h2>
              <div className="sd-info-grid">
                {infoRows.map(({ icon: Icon, label, value, mono }) => (
                  <div className={`sd-info-item ${label === "Address" ? "full" : ""}`} key={label}>
                    <div className="sd-info-label"><Icon size={14} /> {label}</div>
                    <div className={`sd-info-value ${mono ? "mono" : ""}`}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sd-section">
              <h2 className="sd-section-title">Academic Information</h2>
              <div className="sd-stats">
                {academicStats.map(({ icon: Icon, label, value, accent }) => (
                  <div className="sd-stat" key={label}>
                    <span className="sd-stat-icon" style={{ background: accent }}><Icon size={18} /></span>
                    <div className="sd-stat-value">{value}</div>
                    <div className="sd-stat-label">{label}</div>
                    {label === "Attendance" && (
                      <div className="sd-progress-track">
                        <div className="sd-progress-fill" style={{ width: `${student.attendance}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
