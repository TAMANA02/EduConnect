const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Connect to MongoDB before the server starts accepting requests
connectDB();

const app = express();

// Middleware
app.use(cors()); // allow the React frontend (different origin/port) to call this API
app.use(express.json()); // parse incoming JSON request bodies

// Health check — useful for confirming the server is up
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Student Management API is running" });
});

// Routes
app.use("/api/students", studentRoutes);

// Error handling (must be registered after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
