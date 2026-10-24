import React from "react";
import {
  GraduationCap,
  Target,
  Code2,
  Braces,
  FileCode2,
  Palette,
  UserPlus,
  Trash2,
  Search,
  Smartphone,
  RefreshCw,
  Sparkles,
  Terminal,
  Briefcase,
  Mail,
} from "lucide-react";

const TECHNOLOGIES = [
  { icon: Code2, name: "React.js", note: "Component-based UI library" },
  { icon: Braces, name: "JavaScript (ES6)", note: "Core application logic" },
  { icon: FileCode2, name: "HTML5", note: "Semantic page structure" },
  { icon: Palette, name: "CSS3", note: "Styling, layout & animation" },
];

const FEATURES = [
  { icon: UserPlus, name: "Add Student", note: "Enroll new students with validated forms." },
  { icon: Trash2, name: "Delete Student", note: "Remove records instantly, no reload needed." },
  { icon: Search, name: "Search Student", note: "Find students by name in real time." },
  { icon: Smartphone, name: "Responsive UI", note: "Works cleanly on desktop, tablet, and mobile." },
  { icon: RefreshCw, name: "Dynamic Rendering", note: "Lists and stats update live from state." },
];

const OBJECTIVES = [
  "Provide a simple, reliable way to record and manage student information.",
  "Demonstrate a clean, component-based React architecture in practice.",
  "Offer instant search, filter, and sort so records are easy to find.",
  "Keep the interface approachable for both staff and students.",
];

const LEARNING_OUTCOMES = [
  "Structuring a React app into small, reusable components.",
  "Managing form state, validation, and user feedback with hooks.",
  "Rendering dynamic lists and updating the UI without a page reload.",
  "Building a responsive, accessible layout with Flexbox and Grid.",
  "Applying a consistent visual design system across multiple pages.",
];

export default function AboutPage() {
  return (
    <div className="ab-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');

        .ab-root {
          --ink: #0F1B3D;
          --navy: #1E3A8A;
          --blue: #2563EB;
          --sky: #0EA5E9;
          --paper: #F5F8FE;
          --line: rgba(30, 58, 138, 0.09);
          --glass-bg: rgba(255, 255, 255, 0.66);
          --glass-border: rgba(255, 255, 255, 0.85);
          --muted: #5b6890;

          min-height: calc(100vh - 400px);
          font-family: 'Inter', system-ui, sans-serif;
          color: var(--ink);
          background:
            repeating-linear-gradient(to bottom, transparent 0px, transparent 35px, var(--line) 36px),
            radial-gradient(circle at 12% 4%, #dbe9ff 0%, transparent 45%),
            radial-gradient(circle at 92% 0%, #e6f2ff 0%, transparent 40%),
            var(--paper);
        }

        .ab-wrap { max-width: 980px; margin: 0 auto; padding: 2.25rem 1.75rem 3rem; }

        .ab-hero {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          padding: 3rem 2.25rem;
          background: linear-gradient(120deg, #1E3A8A 0%, #2563EB 55%, #0EA5E9 120%);
          color: #fff;
          box-shadow: 0 20px 45px rgba(30, 58, 138, 0.28);
          text-align: center;
          animation: ab-rise 0.4s ease both;
        }

        @keyframes ab-rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ab-hero::before {
          content: "";
          position: absolute;
          width: 320px;
          height: 320px;
          right: -90px;
          top: -130px;
          background: radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%);
          border-radius: 50%;
        }

        .ab-hero::after {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          left: 8%;
          bottom: -140px;
          background: radial-gradient(circle, rgba(255,255,255,0.16), transparent 70%);
          border-radius: 50%;
        }

        .ab-hero-icon {
          position: relative;
          width: 56px;
          height: 56px;
          margin: 0 auto 1.1rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.32);
        }

        .ab-hero h1 {
          position: relative;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(1.6rem, 3.2vw, 2.4rem);
          margin: 0 0 0.85rem;
          letter-spacing: -0.01em;
        }

        .ab-hero p {
          position: relative;
          max-width: 620px;
          margin: 0 auto;
          font-size: 1rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.92);
        }

        .ab-section { margin-top: 2rem; }

        .ab-section-head { display: flex; align-items: center; gap: 0.55rem; margin-bottom: 1.1rem; }
        .ab-section-head svg { color: var(--blue); }
        .ab-section-head h2 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.2rem; color: var(--navy); margin: 0; }

        .ab-objectives {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 22px;
          padding: 1.75rem;
          box-shadow: 0 14px 30px rgba(30, 58, 138, 0.1);
        }

        .ab-objectives ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 0.85rem; }

        .ab-objectives li {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
          font-size: 0.94rem;
          line-height: 1.5;
          color: var(--ink);
        }

        .ab-bullet {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border-radius: 7px;
          background: rgba(37, 99, 235, 0.12);
          color: var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          margin-top: 0.1rem;
        }

        .ab-card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.1rem; }

        .ab-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 18px;
          padding: 1.4rem;
          box-shadow: 0 10px 24px rgba(30, 58, 138, 0.1);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .ab-card:hover { transform: translateY(-5px); box-shadow: 0 18px 36px rgba(30, 58, 138, 0.18); }

        .ab-card-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: linear-gradient(135deg, var(--blue), var(--navy));
        }

        .ab-card-name { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 1rem; color: var(--ink); }
        .ab-card-note { font-size: 0.85rem; color: var(--muted); line-height: 1.45; }

        .ab-outcomes {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 22px;
          padding: 1.75rem;
          box-shadow: 0 14px 30px rgba(30, 58, 138, 0.1);
        }

        .ab-outcomes ul { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem 1.5rem; }

        .ab-outcomes li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.92rem; line-height: 1.5; color: var(--ink); }

        .ab-outcomes li::before {
          content: "";
          flex-shrink: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 0.45rem;
          background: linear-gradient(135deg, var(--blue), var(--sky));
        }

        .ab-dev-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 22px;
          padding: 1.75rem;
          box-shadow: 0 14px 30px rgba(30, 58, 138, 0.1);
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .ab-dev-avatar {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.3rem;
          color: #fff;
          background: linear-gradient(135deg, var(--blue), var(--sky));
        }

        .ab-dev-info { flex: 1; min-width: 200px; }
        .ab-dev-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.05rem; color: var(--ink); }
        .ab-dev-role { font-size: 0.86rem; color: var(--muted); margin-top: 0.15rem; }

        .ab-dev-links { display: flex; gap: 0.55rem; }

        .ab-dev-links a {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border: 1px solid rgba(30, 58, 138, 0.14);
          color: var(--navy);
          transition: background 0.2s ease, transform 0.15s ease, color 0.2s ease;
        }

        .ab-dev-links a:hover { background: linear-gradient(135deg, var(--blue), var(--navy)); color: #fff; transform: translateY(-2px); }

        @media (max-width: 640px) {
          .ab-wrap { padding: 1.75rem 1.25rem 2.5rem; }
          .ab-hero { padding: 2.3rem 1.5rem; border-radius: 20px; }
          .ab-outcomes ul { grid-template-columns: 1fr; }
          .ab-dev-card { flex-direction: column; text-align: center; }
          .ab-dev-links { justify-content: center; }
        }
      `}</style>

      <div className="ab-wrap">
        <section className="ab-hero">
          <div className="ab-hero-icon"><GraduationCap size={26} /></div>
          <h1>Student Management System</h1>
          <p>
            A React-based web application for recording, searching, and
            organizing student information in one clean dashboard —
            built as a practical demonstration of component-driven
            front-end development.
          </p>
        </section>

        <section className="ab-section">
          <div className="ab-section-head"><Target size={20} /><h2>Objectives</h2></div>
          <div className="ab-objectives">
            <ul>
              {OBJECTIVES.map((text, i) => (
                <li key={text}>
                  <span className="ab-bullet">{String(i + 1).padStart(2, "0")}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ab-section">
          <div className="ab-section-head"><Code2 size={20} /><h2>Technologies Used</h2></div>
          <div className="ab-card-grid">
            {TECHNOLOGIES.map(({ icon: Icon, name, note }) => (
              <div className="ab-card" key={name}>
                <span className="ab-card-icon"><Icon size={20} /></span>
                <div className="ab-card-name">{name}</div>
                <div className="ab-card-note">{note}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="ab-section">
          <div className="ab-section-head"><Sparkles size={20} /><h2>Features</h2></div>
          <div className="ab-card-grid">
            {FEATURES.map(({ icon: Icon, name, note }) => (
              <div className="ab-card" key={name}>
                <span className="ab-card-icon"><Icon size={20} /></span>
                <div className="ab-card-name">{name}</div>
                <div className="ab-card-note">{note}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="ab-section">
          <div className="ab-section-head"><GraduationCap size={20} /><h2>Learning Outcomes</h2></div>
          <div className="ab-outcomes">
            <ul>
              {LEARNING_OUTCOMES.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ab-section">
          <div className="ab-section-head"><UserPlus size={20} /><h2>Developer Information</h2></div>
          <div className="ab-dev-card">
            <div className="ab-dev-avatar">DV</div>
            <div className="ab-dev-info">
              <div className="ab-dev-name">Developer Name</div>
              <div className="ab-dev-role">Front-End Developer · React.js Enthusiast</div>
            </div>
            <div className="ab-dev-links">
              <a href="#" aria-label="GitHub"><Terminal size={17} /></a>
              <a href="#" aria-label="LinkedIn"><Briefcase size={17} /></a>
              <a href="#" aria-label="Email"><Mail size={17} /></a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
