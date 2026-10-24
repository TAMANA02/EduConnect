const mongoose = require("mongoose");
const Student = require("../models/Student");

/**
 * Generates a readable, reasonably-unique student ID like "STU-4821".
 * Used when the client doesn't supply one (e.g. the Add Student form
 * only collects name/email/age/etc.).
 */
const generateStudentId = () => {
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `STU-${random}`;
};

/**
 * @desc    Get all students — supports search, course filter, and sorting
 * @route   GET /api/students?search=riya&course=BCA&sortBy=name&order=asc
 * @access  Public
 */
const getStudents = async (req, res, next) => {
  try {
    const { search, course, sortBy, order } = req.query;

    const query = {};

    // Case-insensitive partial name search
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Exact course filter (skip if "All" or empty)
    if (course && course !== "All") {
      query.course = course;
    }

    // Sorting — only allow whitelisted fields to avoid arbitrary sort injection
    const sortableFields = { name: "name", age: "age" };
    let sortOption = { createdAt: -1 }; // default: newest first

    if (sortBy && sortableFields[sortBy]) {
      const direction = order === "desc" ? -1 : 1;
      sortOption = { [sortableFields[sortBy]]: direction };
    }

    const students = await Student.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single student by ID
 * @route   GET /api/students/:id
 * @access  Public
 */
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new student
 * @route   POST /api/students
 * @access  Public
 */
const createStudent = async (req, res, next) => {
  try {
    const { name, age, course, email, phone, gender, address, studentId, joiningDate } = req.body;

    // Basic required-field check before hitting Mongoose validation,
    // so we can return one clear message for the common case.
    if (!name || !age || !course || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, age, course, and email are required",
      });
    }

    // Prevent duplicate student IDs explicitly (in addition to the
    // schema-level unique index) so we can return a friendly message.
    const finalStudentId = studentId && studentId.trim() ? studentId.trim() : generateStudentId();
    const existing = await Student.findOne({ studentId: finalStudentId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `A student with ID ${finalStudentId} already exists`,
      });
    }

    const student = await Student.create({
      name,
      age,
      course,
      email,
      phone,
      gender,
      address,
      studentId: finalStudentId,
      joiningDate,
    });

    res.status(201).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing student
 * @route   PUT /api/students/:id
 * @access  Public
 */
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    // If the client tries to change studentId, make sure it doesn't collide
    if (req.body.studentId) {
      const duplicate = await Student.findOne({
        studentId: req.body.studentId.trim(),
        _id: { $ne: id },
      });
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: `A student with ID ${req.body.studentId} already exists`,
        });
      }
    }

    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated document
      runValidators: true, // re-run schema validation on update
    });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a student
 * @route   DELETE /api/students/:id
 * @access  Public
 */
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
