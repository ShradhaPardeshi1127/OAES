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


// const mongoose = require("mongoose");

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//   },
//   role: {
//     type: String,
//     required: true,
//     enum: ["admin", "student", "evaluator"],
//     default: "student",  // Default role is student
//   },
//   accessCode: {
//     type: String,
//     default: null, // Only for evaluators
//   },
//   rollNumber: {
//     type: String,
//     required: function () { return this.role === "student"; }
//   },
//   name: {
//     type: String,
//     required: function () { return this.role === "student"; }
//     },
//   pdfFile: {
//     type: Buffer, // To store the PDF file as binary data
//   },
// });

// // Create and export the User model with dynamic collection name
// module.exports = (login) =>
//   mongoose.model("User", userSchema, login);

// const mongoose = require("mongoose");

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//   },
//   role: {
//     type: String,
//     required: true,
//     enum: ["admin", "student", "evaluator"],
//     default: "student", // Default role is student
//   },
//   accessCode: {
//     type: String,
//     default: null, // Only for evaluators
//   },
//   rollNumber: {
//     type: String,
//     // Remove required here, we'll handle it in the validation middleware
//   },
//   name: {
//     type: String,
//     // Remove required here, we'll handle it in the validation middleware
//   },
//   pdfFile: {
//     type: Buffer, // To store the PDF file as binary data
//   },
// });

// // Middleware to ensure required fields for students
// userSchema.pre("validate", function (next) {
//   if (this.role === "student") {
//     if (!this.rollNumber) {
//       return next(new Error("Roll number is required for students"));
//     }
//     if (!this.name) {
//       return next(new Error("Name is required for students"));
//     }
//   }
//   next();
// });

// // MongoDB File Schema
// // const fileSchema = new mongoose.Schema({
// //   subject: { type: String, required: true },
// //   division: { type: String, required: true },
// //   teacher: { type: String, required: true },
// //   filename: { type: String, required: true },
// //   url: { type: String, required: true },
// //   createdAt: { type: Date, default: Date.now },
// // });

// const pdfSchema = new mongoose.Schema({
//   subject: { type: String, required: true },
//   division: { type: String, required: true },
//   pdfUrl: { type: String, required: true },
// });

// const teacherSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   assignedPdfs: [pdfSchema], // Array of PDFs assigned to the teacher
// });

// // const teacherSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   assignedPdfs: [pdfSchema], // Array of PDFs assigned to the teacher
// // });
// // File Schema (Links PDFs to Teachers)
// // const fileSchema = new mongoose.Schema({
// //   subject: { type: String, required: true },
// //   division: { type: String, required: true },
// //   teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }, // Ensure teacher reference
// //   filename: { type: String, required: true },
// //   url: { type: String, required: true },
// //   createdAt: { type: Date, default: Date.now },
// // });

// // Create models for User and File
// // const User = mongoose.model("User", userSchema);
// // // const File = mongoose.model("File", fileSchema);
// // const Teacher = mongoose.model("Teacher", teacherSchema);

// // Create and export the User model with dynamic collection name
// // module.exports = (login) => ({
// //   User: mongoose.model("User", userSchema, login),
// //   // File: File, // Exporting File model for file handling
// //   Teacher: Teacher,
// // });

// const User = mongoose.model("User", userSchema);
// const Teacher = mongoose.model("Teacher", teacherSchema);

// module.exports = { User, Teacher };


//--------------------------
