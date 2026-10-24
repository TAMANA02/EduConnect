import React, { useState, useMemo } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomeDashboard from "./pages/HomeDashboard.jsx";
import StudentList from "./pages/StudentList.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";
import EditStudent from "./pages/EditStudent.jsx";
import AboutPage from "./pages/AboutPage.jsx";

/**
 * App
 * Owns the single source of truth — the students array — and a simple
 * state-based "router" (no react-router needed for this size of app).
 * Every page reads from and writes to this shared state, so adding,
 * editing, or deleting a student anywhere updates the Dashboard stats,
 * the Student List, and the Details page instantly.
 */

// ---------------------------------------------------------------------
// Sample data — at least 5 students, with enough fields to populate
// every page (contact info + academic info for StudentDetails).
// ---------------------------------------------------------------------
const now = new Date();
const thisMonthDate = (daysAgo) => {
  const d = new Date(now);
  d.setDate(d.getDate() - daysAgo);
  return d;
};

const INITIAL_STUDENTS = [
  {
    id: "1",
    studentId: "STU-1042",
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    age: 20,
    gender: "Male",
    course: "BCA",
    mobile: "9876543210",
    address: "18 MG Road, Kanpur, Uttar Pradesh, 208001",
    joiningDate: "10 Jul 2023",
    attendance: 92,
    semester: "3rd Semester",
    cgpa: 8.4,
    createdAt: thisMonthDate(3),
  },
  {
    id: "2",
    studentId: "STU-1043",
    name: "Priya Singh",
    email: "priya.singh@email.com",
    age: 19,
    gender: "Female",
    course: "B.Tech",
    mobile: "9876543211",
    address: "24 Lotus Enclave, Sector 12, Kanpur, Uttar Pradesh, 208001",
    joiningDate: "12 Aug 2023",
    attendance: 87,
    semester: "5th Semester",
    cgpa: 8.6,
    createdAt: thisMonthDate(60),
  },
  {
    id: "3",
    studentId: "STU-1044",
    name: "Aman Verma",
    email: "aman.verma@email.com",
    age: 21,
    gender: "Male",
    course: "MCA",
    mobile: "9876543212",
    address: "7 Civil Lines, Lucknow, Uttar Pradesh, 226001",
    joiningDate: "02 Jan 2022",
    attendance: 78,
    semester: "2nd Semester",
    cgpa: 7.9,
    createdAt: thisMonthDate(400),
  },
  {
    id: "4",
    studentId: "STU-1045",
    name: "Neha Gupta",
    email: "neha.gupta@email.com",
    age: 22,
    gender: "Female",
    course: "B.Sc",
    mobile: "9876543213",
    address: "45 Park Street, Kolkata, West Bengal, 700016",
    joiningDate: "15 Jul 2021",
    attendance: 95,
    semester: "7th Semester",
    cgpa: 9.1,
    createdAt: thisMonthDate(700),
  },
  {
    id: "5",
    studentId: "STU-1046",
    name: "Arjun Kumar",
    email: "arjun.kumar@email.com",
    age: 20,
    gender: "Male",
    course: "B.Tech",
    mobile: "9876543214",
    address: "12 Model Town, Delhi, 110009",
    joiningDate: "20 Aug 2023",
    attendance: 84,
    semester: "3rd Semester",
    cgpa: 7.5,
    createdAt: thisMonthDate(5),
  },
  {
    id: "6",
    studentId: "STU-1047",
    name: "Sanya Kapoor",
    email: "sanya.kapoor@email.com",
    age: 19,
    gender: "Female",
    course: "BCA",
    mobile: "9876543215",
    address: "3 Green Park, Jaipur, Rajasthan, 302001",
    joiningDate: "01 Sep 2023",
    attendance: 90,
    semester: "1st Semester",
    cgpa: 8.0,
    createdAt: thisMonthDate(10),
  },
];

// Generates a readable, unlikely-to-collide student ID.
function generateStudentId(existingStudents) {
  let id;
  do {
    id = `STU-${Math.floor(1000 + Math.random() * 9000)}`;
  } while (existingStudents.some((s) => s.studentId === id));
  return id;
}

function formatToday() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [page, setPage] = useState("dashboard"); // dashboard | students | add | details | edit | about
  const [selectedId, setSelectedId] = useState(null);

  const selectedStudent = useMemo(
    () => students.find((s) => s.id === selectedId) || null,
    [students, selectedId]
  );

  // -------------------------------------------------------------
  // Navigation
  // -------------------------------------------------------------
  const goTo = (pageKey) => {
    setPage(pageKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleView = (id) => {
    setSelectedId(id);
    goTo("details");
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    goTo("edit");
  };

  // -------------------------------------------------------------
  // CRUD operations — shared across every page
  // -------------------------------------------------------------
  const handleAddStudent = (form) => {
    const newStudent = {
      id: `${Date.now()}`,
      studentId: generateStudentId(students),
      name: form.name.trim(),
      email: form.email.trim(),
      age: Number(form.age),
      gender: form.gender,
      course: form.course,
      mobile: form.mobile.trim(),
      address: form.address.trim(),
      joiningDate: formatToday(),
      attendance: 100,
      semester: "1st Semester",
      cgpa: 0,
      createdAt: new Date(),
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleSaveEdit = (updated) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === updated.id
          ? {
              ...s,
              name: updated.name.trim(),
              email: updated.email.trim(),
              age: Number(updated.age),
              course: updated.course,
              mobile: updated.mobile.trim(),
              address: updated.address.trim(),
            }
          : s
      )
    );
    // Let the success banner on the Edit page show briefly, then
    // return to the updated profile.
    setTimeout(() => {
      setSelectedId(updated.id);
      goTo("details");
    }, 900);
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    // If we were viewing/editing the deleted student, head back to the list.
    if (selectedId === id) {
      setSelectedId(null);
      goTo("students");
    }
  };

  const handleCancelEdit = () => {
    if (selectedId) goTo("details");
    else goTo("students");
  };

  // -------------------------------------------------------------
  // Derived dashboard stats — always in sync with `students`
  // -------------------------------------------------------------
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const averageAge = totalStudents
      ? students.reduce((sum, s) => sum + s.age, 0) / totalStudents
      : 0;
    const totalCourses = new Set(students.map((s) => s.course)).size;
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const newThisMonth = students.filter((s) => new Date(s.createdAt) >= monthStart).length;

    return {
      totalStudents,
      averageAge: Number(averageAge.toFixed(1)),
      totalCourses,
      newThisMonth,
    };
  }, [students]);

  // -------------------------------------------------------------
  // Page router
  // -------------------------------------------------------------
  let content;
  switch (page) {
    case "students":
      content = (
        <StudentList
          students={students}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddStudent={() => goTo("add")}
        />
      );
      break;

    case "add":
      content = <AddStudent onAddStudent={handleAddStudent} onNavigate={goTo} />;
      break;

    case "details":
      content = (
        <StudentDetails
          student={selectedStudent}
          onBack={() => goTo("students")}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
      break;

    case "edit":
      content = (
        <EditStudent
          student={selectedStudent}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      );
      break;

    case "about":
      content = <AboutPage />;
      break;

    case "dashboard":
    default:
      content = <HomeDashboard stats={stats} onNavigate={goTo} />;
      break;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar activePage={page === "details" || page === "edit" ? "students" : page} onNavigate={goTo} />
      <div style={{ flex: 1 }}>{content}</div>
      <Footer onNavigate={goTo} />
    </div>
  );
}
