const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
  },
  accessCode: {
    type: String,
    default: null, // Only for evaluators
  },
  rollNumber: {
    type: String,
    default: null, // Only for students
  },
  name: {
    type: String,
    default: null, // Only for students
  },
});

// Password hashing middleware before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
