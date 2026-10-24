import React, { useState, useMemo } from "react";
import { Eye, Pencil, Trash2, UserRound, Users } from "lucide-react";
import SearchFilterBar from "../components/SearchFilterBar.jsx";

/**
 * StudentList
 * Reads students from shared app state (passed as `students`) and
 * reports actions back up: View -> details page, Edit -> edit page,
 * Delete -> removes from the shared list immediately.
 */

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function StudentList({ students, onView, onEdit, onDelete, onAddStudent }) {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All");
  const [sortKey, setSortKey] = useState("none");
  const [sortDir, setSortDir] = useState("asc");

  const courses = useMemo(
    () => Array.from(new Set(students.map((s) => s.course))),
    [students]
  );

  const visibleStudents = useMemo(() => {
    let list = students.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCourse = course === "All" || s.course === course;
      return matchesSearch && matchesCourse;
    });

    if (sortKey !== "none") {
      list = [...list].sort((a, b) => {
        const cmp = sortKey === "name" ? a.name.localeCompare(b.name) : a.age - b.age;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return list;
  }, [students, search, course, sortKey, sortDir]);

  const handleClear = () => {
    setSearch("");
    setCourse("All");
    setSortKey("none");
    setSortDir("asc");
  };

  return (
    <div className="sl-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');

        .sl-root {
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
          padding: 2.25rem 1.75rem 4rem;
        }

        .sl-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
        }

        .sl-header h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          letter-spacing: -0.01em;
          color: var(--navy);
          margin: 0 0 0.25rem;
        }

        .sl-header p { color: var(--muted); margin: 0; font-size: 0.96rem; }

        .sl-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          padding: 0.65rem 1.1rem;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, var(--blue), var(--navy));
          color: #fff;
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.3);
          transition: transform 0.15s ease, filter 0.2s ease;
        }

        .sl-add-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }

        .sl-toolbar-wrap { margin-bottom: 2rem; }

        .sl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .sl-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 1.4rem;
          box-shadow: 0 12px 26px rgba(30, 58, 138, 0.1);
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          animation: sl-fade-in 0.35s ease both;
        }

        .sl-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(30, 58, 138, 0.2); }

        @keyframes sl-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .sl-card-top { display: flex; align-items: center; gap: 0.9rem; }

        .sl-avatar {
          width: 54px;
          height: 54px;
          border-radius: 15px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #fff;
          background: linear-gradient(135deg, var(--blue), var(--sky));
        }

        .sl-card-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          line-height: 1.25;
          color: var(--ink);
          cursor: pointer;
        }

        .sl-card-name:hover { text-decoration: underline; }

        .sl-card-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--muted);
          letter-spacing: 0.02em;
        }

        .sl-card-meta { display: flex; gap: 0.6rem; flex-wrap: wrap; }

        .sl-chip {
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.32rem 0.7rem;
          border-radius: 999px;
          background: rgba(37, 99, 235, 0.09);
          color: var(--navy);
        }

        .sl-card-actions { display: flex; gap: 0.5rem; margin-top: 0.2rem; }

        .sl-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.55rem 0.5rem;
          border-radius: 10px;
          border: 1px solid rgba(30, 58, 138, 0.14);
          background: #fff;
          color: var(--navy);
          cursor: pointer;
          transition: transform 0.15s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }

        .sl-btn:hover { transform: translateY(-2px); }
        .sl-btn.view:hover { background: rgba(37, 99, 235, 0.08); }

        .sl-btn.edit:hover {
          background: linear-gradient(135deg, var(--blue), var(--navy));
          color: #fff;
          box-shadow: 0 8px 16px rgba(37, 99, 235, 0.3);
        }

        .sl-btn.delete { color: #C0392B; }
        .sl-btn.delete:hover {
          background: #C0392B;
          color: #fff;
          border-color: transparent;
          box-shadow: 0 8px 16px rgba(192, 57, 43, 0.28);
        }

        .sl-empty {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.9rem;
          padding: 3.5rem 1.5rem;
          background: var(--glass-bg);
          border: 1px dashed rgba(30, 58, 138, 0.25);
          border-radius: 20px;
        }

        .sl-empty-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(37, 99, 235, 0.1);
          color: var(--navy);
        }

        .sl-empty h3 { font-family: 'Space Grotesk', sans-serif; margin: 0; font-size: 1.1rem; color: var(--ink); }
        .sl-empty p { margin: 0; color: var(--muted); font-size: 0.92rem; max-width: 320px; }

        @media (max-width: 640px) {
          .sl-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="sl-header">
        <div>
          <h1>Students</h1>
          <p>Search, filter, and manage every enrolled student.</p>
        </div>
        <button className="sl-add-btn" onClick={onAddStudent}>+ Add Student</button>
      </div>

      <div className="sl-toolbar-wrap">
        <SearchFilterBar
          courses={courses}
          search={search}
          onSearchChange={setSearch}
          course={course}
          onCourseChange={setCourse}
          sortKey={sortKey}
          sortDir={sortDir}
          onSortChange={(key, dir) => { setSortKey(key); setSortDir(dir); }}
          onClear={handleClear}
          resultCount={visibleStudents.length}
          totalCount={students.length}
        />
      </div>

      <div className="sl-grid">
        {visibleStudents.length === 0 ? (
          <div className="sl-empty">
            <span className="sl-empty-icon"><Users size={26} /></span>
            <h3>{students.length === 0 ? "No students yet" : "No matches found"}</h3>
            <p>
              {students.length === 0
                ? "Add your first student to see them appear here."
                : "Try a different name, or clear the course filter."}
            </p>
          </div>
        ) : (
          visibleStudents.map((s) => (
            <div className="sl-card" key={s.id}>
              <div className="sl-card-top">
                <span className="sl-avatar">{initials(s.name) || <UserRound size={22} />}</span>
                <div>
                  <div className="sl-card-name" onClick={() => onView(s.id)}>{s.name}</div>
                  <div className="sl-card-id">{s.studentId}</div>
                </div>
              </div>

              <div className="sl-card-meta">
                <span className="sl-chip">Age {s.age}</span>
                <span className="sl-chip">{s.course}</span>
              </div>

              <div className="sl-card-actions">
                <button className="sl-btn view" onClick={() => onView(s.id)}>
                  <Eye size={14} /> View
                </button>
                <button className="sl-btn edit" onClick={() => onEdit(s.id)}>
                  <Pencil size={14} /> Edit
                </button>
                <button className="sl-btn delete" onClick={() => onDelete(s.id)}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
