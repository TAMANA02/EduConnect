import React, { useState } from "react";
import {
  UserPlus,
  Mail,
  CalendarClock,
  BookOpen,
  Phone,
  MapPin,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/**
 * EditStudent
 * Pre-filled edit form for an existing student, read from shared app
 * state. Calls `onSave({ id, ...updatedFields })` on success.
 */

const COURSES = ["BCA", "B.Tech", "MCA", "B.Sc", "BBA", "M.Tech", "M.Sc"];

function validate(form) {
  const errors = {};

  if (!form.name.trim()) errors.name = "Student name is required.";

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.age.toString().trim()) {
    errors.age = "Age is required.";
  } else {
    const ageNum = Number(form.age);
    if (!Number.isFinite(ageNum) || ageNum < 16 || ageNum > 60) {
      errors.age = "Age must be between 16 and 60.";
    }
  }

  if (!form.course) errors.course = "Please select a course.";

  if (!form.mobile.trim()) {
    errors.mobile = "Mobile number is required.";
  } else if (!/^\d{10}$/.test(form.mobile.trim())) {
    errors.mobile = "Mobile number must be exactly 10 digits.";
  }

  if (!form.address.trim()) errors.address = "Address is required.";

  return errors;
}

export default function EditStudent({ student, onSave, onCancel }) {
  const [form, setForm] = useState(
    student
      ? {
          name: student.name,
          email: student.email,
          age: student.age,
          course: student.course,
          mobile: student.mobile,
          address: student.address,
        }
      : { name: "", email: "", age: "", course: "", mobile: "", address: "" }
  );
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  if (!student) {
    return (
      <div style={{
        minHeight: "calc(100vh - 400px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#5b6890",
        background: "#F5F8FE",
      }}>
        <div style={{ textAlign: "center" }}>
          <p>No student selected to edit.</p>
          <button onClick={onCancel} style={{ marginTop: "0.75rem", cursor: "pointer" }}>
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus({ type: "error", message: "Please fix the highlighted fields and try again." });
      return;
    }

    onSave({ id: student.id, ...form });
    setStatus({ type: "success", message: "Student details updated successfully." });
  };

  return (
    <div className="es-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');

        .es-root {
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
            radial-gradient(circle at 10% 6%, #dbe9ff 0%, transparent 45%),
            radial-gradient(circle at 92% 0%, #e6f2ff 0%, transparent 40%),
            var(--paper);
          padding: 2.25rem 1.5rem 4rem;
          display: flex;
          justify-content: center;
        }

        .es-wrap { width: 100%; max-width: 720px; }
        .es-header { text-align: center; margin-bottom: 1.75rem; }

        .es-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--navy);
          background: rgba(37, 99, 235, 0.1);
          padding: 0.35rem 0.8rem;
          border-radius: 999px;
          margin-bottom: 0.9rem;
        }

        .es-header h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          letter-spacing: -0.01em;
          margin: 0 0 0.4rem;
          color: var(--ink);
        }

        .es-header p { margin: 0; color: var(--muted); font-size: 0.95rem; }
        .es-header p span { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--navy); }

        .es-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 20px 44px rgba(30, 58, 138, 0.14);
          animation: es-rise 0.4s ease both;
        }

        @keyframes es-rise {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .es-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.15rem 1.1rem; }
        .es-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .es-field.full { grid-column: 1 / -1; }

        .es-label { font-size: 0.83rem; font-weight: 600; color: var(--navy); display: flex; align-items: center; gap: 0.4rem; }
        .es-label svg { color: var(--blue); }

        .es-input, .es-select, .es-textarea {
          width: 100%;
          font-family: 'Inter', sans-serif;
          font-size: 0.94rem;
          color: var(--ink);
          background: #fff;
          border: 1.5px solid rgba(30, 58, 138, 0.15);
          border-radius: 13px;
          padding: 0.72rem 0.95rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .es-textarea { resize: vertical; min-height: 84px; font-family: 'Inter', sans-serif; }
        .es-select { appearance: none; -webkit-appearance: none; cursor: pointer; }

        .es-input:focus, .es-select:focus, .es-textarea:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.14);
        }

        .es-field.has-error .es-input,
        .es-field.has-error .es-select,
        .es-field.has-error .es-textarea { border-color: var(--danger); }

        .es-error { display: flex; align-items: center; gap: 0.32rem; font-size: 0.78rem; color: var(--danger); font-weight: 500; }

        .es-actions { display: flex; gap: 0.85rem; margin-top: 1.85rem; }

        .es-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.94rem;
          padding: 0.85rem 1rem;
          border-radius: 13px;
          cursor: pointer;
          border: none;
          transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }

        .es-btn.primary {
          background: linear-gradient(135deg, var(--blue), var(--navy));
          color: #fff;
          box-shadow: 0 12px 26px rgba(37, 99, 235, 0.35);
        }

        .es-btn.primary:hover { transform: translateY(-2px); filter: brightness(1.05); }
        .es-btn.primary:active { transform: translateY(0); }

        .es-btn.ghost {
          background: #fff;
          color: var(--navy);
          border: 1.5px solid rgba(30, 58, 138, 0.16);
          flex: 0 0 auto;
          padding-left: 1.3rem;
          padding-right: 1.3rem;
        }

        .es-btn.ghost:hover { background: rgba(37, 99, 235, 0.08); }

        .es-status {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          font-weight: 500;
          padding: 0.8rem 1rem;
          border-radius: 13px;
          margin-top: 1.25rem;
          animation: es-slide-in 0.3s ease both;
        }

        @keyframes es-slide-in {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .es-status.success { background: rgba(16, 163, 74, 0.1); color: #0F7A3D; }
        .es-status.error { background: rgba(192, 57, 43, 0.1); color: var(--danger); }

        @media (max-width: 600px) {
          .es-grid { grid-template-columns: 1fr; }
          .es-card { padding: 1.5rem; border-radius: 20px; }
          .es-actions { flex-direction: column; }
          .es-btn.ghost { width: 100%; }
        }
      `}</style>

      <div className="es-wrap">
        <div className="es-header">
          <span className="es-eyebrow"><UserPlus size={14} /> Edit Enrollment</span>
          <h1>Edit Student</h1>
          <p>Updating record <span>{student.studentId}</span></p>
        </div>

        <div className="es-card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="es-grid">
              <div className={`es-field full ${errors.name ? "has-error" : ""}`}>
                <label className="es-label" htmlFor="name"><UserPlus size={15} /> Student Name</label>
                <input id="name" className="es-input" type="text" placeholder="e.g. Rahul Sharma"
                  value={form.name} onChange={handleChange("name")} />
                {errors.name && <span className="es-error"><AlertCircle size={13} /> {errors.name}</span>}
              </div>

              <div className={`es-field full ${errors.email ? "has-error" : ""}`}>
                <label className="es-label" htmlFor="email"><Mail size={15} /> Student Email</label>
                <input id="email" className="es-input" type="email" placeholder="e.g. rahul.sharma@email.com"
                  value={form.email} onChange={handleChange("email")} />
                {errors.email && <span className="es-error"><AlertCircle size={13} /> {errors.email}</span>}
              </div>

              <div className={`es-field ${errors.age ? "has-error" : ""}`}>
                <label className="es-label" htmlFor="age"><CalendarClock size={15} /> Age</label>
                <input id="age" className="es-input" type="number" placeholder="16–60"
                  value={form.age} onChange={handleChange("age")} />
                {errors.age && <span className="es-error"><AlertCircle size={13} /> {errors.age}</span>}
              </div>

              <div className={`es-field ${errors.course ? "has-error" : ""}`}>
                <label className="es-label" htmlFor="course"><BookOpen size={15} /> Course</label>
                <select id="course" className="es-select" value={form.course} onChange={handleChange("course")}>
                  <option value="">Select course</option>
                  {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.course && <span className="es-error"><AlertCircle size={13} /> {errors.course}</span>}
              </div>

              <div className={`es-field full ${errors.mobile ? "has-error" : ""}`}>
                <label className="es-label" htmlFor="mobile"><Phone size={15} /> Mobile Number</label>
                <input id="mobile" className="es-input" type="tel" placeholder="10-digit number"
                  value={form.mobile} onChange={handleChange("mobile")} />
                {errors.mobile && <span className="es-error"><AlertCircle size={13} /> {errors.mobile}</span>}
              </div>

              <div className={`es-field full ${errors.address ? "has-error" : ""}`}>
                <label className="es-label" htmlFor="address"><MapPin size={15} /> Address</label>
                <textarea id="address" className="es-textarea" placeholder="Street, city, state, ZIP"
                  value={form.address} onChange={handleChange("address")} />
                {errors.address && <span className="es-error"><AlertCircle size={13} /> {errors.address}</span>}
              </div>
            </div>

            {status && (
              <div className={`es-status ${status.type}`}>
                {status.type === "success" ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}
                {status.message}
              </div>
            )}

            <div className="es-actions">
              <button type="submit" className="es-btn primary"><Save size={17} /> Save Changes</button>
              <button type="button" className="es-btn ghost" onClick={onCancel}><X size={16} /> Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
