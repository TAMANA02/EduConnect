const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// GET /api/students        -> list (search, filter, sort via query params)
// POST /api/students       -> create
router.route("/").get(getStudents).post(createStudent);

// GET /api/students/:id    -> single student
// PUT /api/students/:id    -> update
// DELETE /api/students/:id -> delete
router
  .route("/:id")
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
