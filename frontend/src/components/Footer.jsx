import React from "react";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Terminal,
  Briefcase,
  MessageCircle,
  Users2,
} from "lucide-react";

/**
 * Footer
 * Reusable site footer. Same navy/blue design language as the rest of
 * the app. Quick Links call `onNavigate(pageKey)` so it shares the
 * exact routing function used by the Navbar.
 */

const QUICK_LINKS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "students", label: "Students" },
  { key: "add", label: "Add Student" },
  { key: "about", label: "About" },
];

const CONTACT_INFO = [
  { icon: Mail, text: "support@educonnect.app" },
  { icon: Phone, text: "+91 98765 43210" },
  { icon: MapPin, text: "Kanpur, Uttar Pradesh, India" },
];

const SOCIALS = [
  { icon: Terminal, label: "GitHub", href: "#" },
  { icon: Briefcase, label: "LinkedIn", href: "#" },
  { icon: MessageCircle, label: "Twitter", href: "#" },
  { icon: Users2, label: "Facebook", href: "#" },
];

export default function Footer({ onNavigate }) {
  return (
    <footer className="ft-footer">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        .ft-footer {
          --ink: #0F1B3D;
          --navy: #1E3A8A;
          --blue: #2563EB;
          --sky: #0EA5E9;
          --muted: #a9b6dd;

          font-family: 'Inter', system-ui, sans-serif;
          color: #dbe6ff;
          background: linear-gradient(160deg, #10224f 0%, #0F1B3D 60%, #0b1533 100%);
          padding: 3rem 1.75rem 0;
          position: relative;
          overflow: hidden;
        }

        .ft-footer::before {
          content: "";
          position: absolute;
          width: 360px;
          height: 360px;
          right: -100px;
          top: -160px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.28), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .ft-inner {
          position: relative;
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.2fr 1fr;
          gap: 2rem;
          padding-bottom: 2.25rem;
        }

        .ft-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          color: #fff;
          margin-bottom: 0.85rem;
        }

        .ft-brand-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: linear-gradient(135deg, var(--blue), var(--sky));
          color: #fff;
          flex-shrink: 0;
        }

        .ft-brand-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--muted);
          max-width: 300px;
        }

        .ft-col h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          color: #fff;
          margin: 0 0 1rem;
        }

        .ft-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .ft-links button {
          background: none;
          border: none;
          padding: 0;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          color: var(--muted);
          cursor: pointer;
          text-align: left;
          transition: color 0.2s ease, transform 0.15s ease;
        }

        .ft-links button:hover { color: #7fb0ff; transform: translateX(3px); }

        .ft-contact {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .ft-contact li {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-size: 0.87rem;
          color: var(--muted);
          line-height: 1.4;
        }

        .ft-contact svg { color: #7fb0ff; flex-shrink: 0; margin-top: 0.15rem; }

        .ft-socials {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .ft-socials a {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #dbe6ff;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .ft-socials a:hover {
          background: linear-gradient(135deg, var(--blue), var(--sky));
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.35);
        }

        .ft-bottom {
          position: relative;
          max-width: 1080px;
          margin: 0 auto;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.25rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-size: 0.82rem;
          color: var(--muted);
        }

        .ft-bottom strong { color: #fff; }

        .ft-bottom-links {
          display: flex;
          gap: 1.25rem;
        }

        .ft-bottom-links button {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.82rem;
          color: var(--muted);
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .ft-bottom-links button:hover { color: #7fb0ff; }

        @media (max-width: 860px) {
          .ft-inner { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 560px) {
          .ft-inner { grid-template-columns: 1fr; gap: 1.75rem; }
          .ft-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="ft-inner">
        <div className="ft-col">
          <div className="ft-brand">
            <span className="ft-brand-badge"><GraduationCap size={20} /></span>
            EduConnect
          </div>
          <p className="ft-brand-desc">
            A modern Student Management System for recording, searching,
            and organizing student information — all in one clean
            dashboard.
          </p>
        </div>

        <div className="ft-col">
          <h4>Quick Links</h4>
          <ul className="ft-links">
            {QUICK_LINKS.map(({ key, label }) => (
              <li key={key}>
                <button onClick={() => onNavigate?.(key)}>{label}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="ft-col">
          <h4>Contact Information</h4>
          <ul className="ft-contact">
            {CONTACT_INFO.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon size={15} />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ft-col">
          <h4>Follow Us</h4>
          <div className="ft-socials">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a href={href} key={label} aria-label={label}>
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <span>
          &copy; {new Date().getFullYear()} <strong>EduConnect</strong>. All rights reserved.
        </span>
        <div className="ft-bottom-links">
          <button onClick={() => onNavigate?.("about")}>About</button>
          <button type="button">Privacy Policy</button>
          <button type="button">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
}
