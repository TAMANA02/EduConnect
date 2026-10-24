import React from "react";
import { Search, ChevronDown, ArrowUpDown, RotateCcw } from "lucide-react";

/**
 * SearchFilterBar
 * Fully controlled search/filter/sort toolbar. Owns no data itself —
 * StudentList feeds it course options and current values, and reads
 * changes back via the on* callbacks.
 */
export default function SearchFilterBar({
  courses = [],
  search,
  onSearchChange,
  course,
  onCourseChange,
  sortKey,
  sortDir,
  onSortChange,
  onClear,
  resultCount,
  totalCount,
}) {
  const toggleSort = (key) => {
    if (sortKey !== key) onSortChange(key, "asc");
    else onSortChange(key, sortDir === "asc" ? "desc" : "asc");
  };

  const hasActiveFilters = search.trim() !== "" || course !== "All" || sortKey !== "none";

  return (
    <div className="sf-toolbar">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        .sf-toolbar {
          --navy: #1E3A8A;
          --blue: #2563EB;
          --muted: #5b6890;

          font-family: 'Inter', system-ui, sans-serif;
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          align-items: center;
          background: rgba(255, 255, 255, 0.66);
          border: 1px solid rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 18px;
          padding: 1rem 1.1rem;
          box-shadow: 0 10px 26px rgba(30, 58, 138, 0.1);
        }

        .sf-search {
          flex: 1 1 220px;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          background: #fff;
          border: 1px solid rgba(30, 58, 138, 0.14);
          border-radius: 999px;
          padding: 0.6rem 1rem;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .sf-search:focus-within {
          border-color: var(--blue);
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.14);
        }

        .sf-search input {
          border: none;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.92rem;
          flex: 1;
          background: transparent;
          color: #0F1B3D;
        }

        .sf-search svg { color: var(--muted); flex-shrink: 0; }

        .sf-select-wrap { position: relative; flex: 0 1 180px; }

        .sf-select-wrap select {
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: #0F1B3D;
          background: #fff;
          border: 1px solid rgba(30, 58, 138, 0.14);
          border-radius: 12px;
          padding: 0.62rem 2.1rem 0.62rem 0.85rem;
          cursor: pointer;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .sf-select-wrap select:focus {
          outline: none;
          border-color: var(--blue);
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.14);
        }

        .sf-select-wrap svg {
          position: absolute;
          right: 0.7rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          pointer-events: none;
        }

        .sf-sort-btn, .sf-clear-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.86rem;
          font-weight: 600;
          border-radius: 999px;
          padding: 0.55rem 0.95rem;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease, color 0.2s ease, opacity 0.2s ease;
          border: 1px solid rgba(30, 58, 138, 0.14);
        }

        .sf-sort-btn { color: var(--navy); background: #fff; }
        .sf-sort-btn:hover { background: rgba(37, 99, 235, 0.08); }

        .sf-sort-btn.is-active {
          background: linear-gradient(135deg, var(--blue), var(--navy));
          border-color: transparent;
          color: #fff;
        }

        .sf-clear-btn {
          background: #fff;
          color: #C0392B;
          border-color: rgba(192, 57, 43, 0.25);
        }

        .sf-clear-btn:hover:not(:disabled) {
          background: #C0392B;
          color: #fff;
          border-color: transparent;
        }

        .sf-clear-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .sf-count {
          margin-left: auto;
          font-size: 0.84rem;
          color: var(--muted);
          font-weight: 500;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .sf-toolbar { flex-direction: column; align-items: stretch; }
          .sf-select-wrap { flex: 1 1 auto; }
          .sf-count { margin-left: 0; }
        }
      `}</style>

      <div className="sf-search">
        <Search size={17} />
        <input
          type="text"
          placeholder="Search students by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="sf-select-wrap">
        <select value={course} onChange={(e) => onCourseChange(e.target.value)}>
          <option value="All">All courses</option>
          {courses.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <ChevronDown size={16} />
      </div>

      <button
        className={`sf-sort-btn ${sortKey === "name" ? "is-active" : ""}`}
        onClick={() => toggleSort("name")}
      >
        <ArrowUpDown size={14} />
        Name {sortKey === "name" ? (sortDir === "asc" ? "A–Z" : "Z–A") : ""}
      </button>

      <button
        className={`sf-sort-btn ${sortKey === "age" ? "is-active" : ""}`}
        onClick={() => toggleSort("age")}
      >
        <ArrowUpDown size={14} />
        Age {sortKey === "age" ? (sortDir === "asc" ? "Low–High" : "High–Low") : ""}
      </button>

      <button className="sf-clear-btn" onClick={onClear} disabled={!hasActiveFilters}>
        <RotateCcw size={14} /> Clear Filters
      </button>

      {resultCount !== undefined && totalCount !== undefined && (
        <span className="sf-count">{resultCount} of {totalCount} students</span>
      )}
    </div>
  );
}
