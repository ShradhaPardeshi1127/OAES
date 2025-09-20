const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "student", "evaluator"],
    default: "student",  // Default role is student
  },
  accessCode: {
    type: String,
    default: null, // Only for evaluators
  },
  rollNumber: {
    type: String,
    // Remove required here, we'll handle it in the validation middleware
  },
  name: {
    type: String,
    // Remove required here, we'll handle it in the validation middleware
  },
  pdfFile: {
    type: Buffer, // To store the PDF file as binary data
  },
  assignedPdfs: [
    {
      subject: { type: String, required: true },
      division: { type: String, required: true },
      pdfUrl: { type: String, required: true },
    },
  ],
});

// Middleware to ensure required fields for students
userSchema.pre("validate", function (next) {
  if (this.role === "student") {
    if (!this.rollNumber) {
      return next(new Error("Roll number is required for students"));
    }
    if (!this.name) {
      return next(new Error("Name is required for students"));
    }
  }
  next();
});

module.exports = (login) =>
    mongoose.model("User", userSchema, login); 

