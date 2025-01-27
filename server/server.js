const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection function
const connectToDB = async (dbName) => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB: ${dbName}`);
  } catch (err) {
    console.error(`MongoDB connection error for ${dbName}:`, err);
    throw err;
  }
};

// Admin login route
app.post("/login-options/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    await connectToDB("AdminLogin/users");

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Admin login successful" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Evaluator login route
app.post("/login-options/evaluatorlogin", async (req, res) => {
  const { email, password, accessCode } = req.body;

  if (!email || !password || !accessCode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await connectToDB("EvaluatorLogin");

    const evaluator = await User.findOne({ email, role: "evaluator" });
    if (!evaluator) {
      return res.status(404).json({ error: "Evaluator not found" });
    }

    const isMatch = await bcrypt.compare(password, evaluator.password);
    if (!isMatch || evaluator.accessCode !== accessCode) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Evaluator login successful" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Student login route
app.post("/login-options/studentlogin", async (req, res) => {
  const { email, password, rollNumber, name } = req.body;

  if (!email || !password || !rollNumber || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await connectToDB("StudentLogin");

    const student = await User.findOne({ email, role: "student" });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Student login successful" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
