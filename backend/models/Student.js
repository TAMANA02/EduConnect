const mongoose = require("mongoose");

/**
 * Student schema.
 * `studentId` is unique so duplicate enrollments are rejected at the
 * database level as well as in the controller. `timestamps: true`
 * automatically manages createdAt / updatedAt.
 */
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [16, "Age must be at least 16"],
      max: [60, "Age must be at most 60"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ["Male", "Female", "Other", ""],
        message: "Gender must be Male, Female, or Other",
      },
    },
    address: {
      type: String,
      trim: true,
    },
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      trim: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("Student", studentSchema);
