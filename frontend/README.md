# Student Management System — Frontend

A React + Vite single-page app wiring together the Dashboard, Student List,
Add Student, Student Details, Edit Student, and About pages into one
connected application with shared state.

## How the pages are connected

`App.jsx` owns the single source of truth — the `students` array — plus a
simple state-based "router" (`page`, one of `dashboard | students | add |
details | edit | about`). Every page is a pure function of props: it reads
`students`/`stats`/`student` from `App` and reports actions back up via
callbacks. No page manages its own copy of the student list, so a change
anywhere is reflected everywhere instantly:

- **Navbar / Footer** — always visible, call `onNavigate(pageKey)` to switch
  pages. The same function is shared by both.
- **HomeDashboard** — reads computed `stats` (total students, average age,
  total courses, new this month) from `App`, and its "View Students" /
  "Add Student" buttons call `onNavigate`.
- **StudentList** — reads `students`, filters/sorts locally via
  `SearchFilterBar`. "View" → `onView(id)` opens Student Details. "Edit" →
  `onEdit(id)` opens Edit Student. "Delete" → `onDelete(id)` removes the
  student immediately, everywhere.
- **AddStudent** — validates its form, then calls `onAddStudent(form)` to
  append a new student to the shared list (App auto-generates a
  `studentId`, join date, and default academic fields).
- **StudentDetails** — receives the selected `student` object (looked up by
  `App` from `selectedId`). Edit/Delete/Back all call back into `App`.
- **EditStudent** — pre-filled from the same `student` object. On save,
  calls `onSave(updatedFields)`, which updates the shared list and returns
  to the (now updated) Details page.
- **AboutPage** — static content, no shared state needed.

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── DashboardStats.jsx
│   └── SearchFilterBar.jsx
├── pages/
│   ├── HomeDashboard.jsx
│   ├── StudentList.jsx
│   ├── AddStudent.jsx
│   ├── StudentDetails.jsx
│   ├── EditStudent.jsx
│   └── AboutPage.jsx
├── App.jsx        # shared state + page routing
├── main.jsx        # React entry point
└── index.css        # global reset
```

## Running the app

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Sample Data

The app ships with 6 sample students (defined in `App.jsx`) so every page
has something to show on first load — including realistic contact info and
academic stats (attendance, semester, CGPA) for the Student Details page.

## Connecting to a Backend

This frontend currently keeps all student data in React state (`useState`
in `App.jsx`). To connect it to the Node/Express/MongoDB backend, replace
the state initialization and the `handleAddStudent` / `handleSaveEdit` /
`handleDelete` functions in `App.jsx` with `axios` calls to
`http://localhost:5000/api/students`, and load the initial list with a
`useEffect` on mount. Every page's props/callbacks stay exactly the same.
