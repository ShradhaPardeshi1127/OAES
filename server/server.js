const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const multer = require("multer");
// const User = require("./models/User.js")("login");
const { assignPdfToEvaluator } = require("./controllers/evaluatorController");
const Evaluator = require("./models/Evaluator.js");
const evaluatorModel = Evaluator("login");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 7000;

cloudinary.config({
  cloud_name: "dybikmq0t",
  api_key: "815433726972854",
  api_secret: "DhICqR6F99hfK1v5k91fBvCE_pI",
});

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/LoginOptions", {});
    console.log("Connected to MongoDB: LoginOptions");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};
//---------------------------main evaluator login
app.post("/login-options/evaluatorlogin", async (req, res) => {
  const { email, password, accessCode } = req.body;

  if (!email || !password || !accessCode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await connectToDB();

    const User = require("./models/User.js")("login");

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
//----------------------------------------



app.post("/signup", async (req, res) => {
  let { email, password, rollNumber, name, role } = req.body;

  // Assign default role as "student" if not provided
  role = role || "student"; // Default role if not provided

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (role === "student") {
    if (!rollNumber || !name) {
      return res
        .status(400)
        .json({ error: "Roll number and name are required for students" });
    }
  }

  try {
    await connectToDB();

    const User = require("./models/User.js")("login");

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user object
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    // Add rollNumber and name for students
    if (role === "student") {
      newUser.rollNumber = rollNumber;
      newUser.name = name;
    }

    // Save user to MongoDB
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login-options/studentlogin", async (req, res) => {
  const { email, password, rollNumber, name } = req.body;

  if (!email || !password || !rollNumber || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await connectToDB();

    const User = require("./models/User.js")("login");

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

app.post("/login-options/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    await connectToDB();

    const User = require("./models/User.js")("login");

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

// app.post("/upload-pdf", async (req, res) => {
//     try {
//       const { subject, teacher, division, pdfUrl } = req.body;

//       // Validate subject, teacher, and division
//       if (!validSubjects[subject] || !validSubjects[subject].includes(teacher)) {
//         return res.status(400).json({ error: "Invalid subject or teacher" });
//       }

//       if (!validDivisions.includes(division)) {
//         return res.status(400).json({ error: "Invalid division" });
//       }

//       if (!pdfUrl) {
//         return res.status(400).json({ error: "No PDF URL provided" });
//       }

//       // Find the teacher by name
//       const teacherDoc = await Teacher.findOne({ name: teacher });

//       // If teacher doesn't exist, return an error
//       if (!teacherDoc) {
//         return res.status(404).json({ error: "Teacher not found" });
//       }

//       // Create a new PDF object
//       const newPdf = {
//         subject,
//         division,
//         pdfUrl, // Cloudinary URL
//       };

//       // Add the PDF to the teacher's assigned PDFs array
//       teacherDoc.assignedPdfs.push(newPdf);

//       // Save the updated teacher document
//       await teacherDoc.save();

//       return res.status(200).json({
//         message: "File uploaded and assigned successfully!",
//         pdfUrl, // Return the PDF URL
//       });
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//       res.status(500).json({ error: "Error uploading file" });
//     }
//   });

// app.get("/get-pdfs", async (req, res) => {
//     try {
//       const { teacher, subject, division } = req.query;

//       // Validate the parameters
//       if (!teacher || !subject || !division) {
//         return res.status(400).json({ error: "Teacher, subject, and division are required" });
//       }

//       // Find the teacher by name
//       const teacherDoc = await Teacher.findOne({ name: teacher });

//       if (!teacherDoc) {
//         return res.status(404).json({ error: "Teacher not found" });
//       }

//       // Filter the PDFs assigned to the teacher based on subject and division
//       const assignedPdfs = teacherDoc.assignedPdfs.filter(
//         (pdf) => pdf.subject === subject && pdf.division === division
//       );

//       return res.status(200).json({ assignedPdfs });
//     } catch (error) {
//       console.error("Error retrieving PDFs:", error);
//       res.status(500).json({ error: "Error retrieving PDFs" });
//     }
//   });

// Upload PDF and assign it to a teacher

app.post("/upload-pdf", async (req, res) => {
  try {
    const { subject, teacher, division, pdfUrl } = req.body;

    if (!subject || !teacher || !division || !pdfUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await connectToDB();

    // Find the teacher by name
    let teacherDoc = await Teacher.findOne({ name: teacher });

    if (!teacherDoc) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Add new PDF entry
    teacherDoc.assignedPdfs.push({
      subject,
      division,
      pdfUrl,
    });

    await teacherDoc.save();

    return res.status(200).json({
      message: "File uploaded and assigned successfully!",
      pdfUrl,
    });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ error: "Error uploading file" });
  }
});

// Retrieve PDFs assigned to a teacher
app.get("/get-pdfs", async (req, res) => {
  try {
    const { teacher, subject, division } = req.query;

    if (!teacher || !subject || !division) {
      return res
        .status(400)
        .json({ error: "Teacher, subject, and division are required" });
    }

    await connectToDB();

    const teacherDoc = await Teacher.findOne({ name: teacher });

    if (!teacherDoc) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const assignedPdfs = teacherDoc.assignedPdfs.filter(
      (pdf) => pdf.subject === subject && pdf.division === division
    );

    return res.status(200).json({ assignedPdfs });
  } catch (error) {
    console.error("Error retrieving PDFs:", error);
    res.status(500).json({ error: "Error retrieving PDFs" });
  }
});

app.post("/assign-pdf-to-evaluator", async (req, res) => {
  try {
    const { evaluatorName, subject, division, pdfUrl } = req.body;

    if (!evaluatorName || !subject || !division || !pdfUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await connectToDB();

    // Find the evaluator by name
    const evaluator = await evaluatorModel.findOne({ name: evaluatorName });

    if (!evaluator) {
      return res.status(404).json({ error: "Evaluator not found" });
    }

    // Add new PDF entry to the evaluator's assignedPdfs array
    evaluator.assignedPdfs.push({ subject, division, pdfUrl });

    // Save changes to MongoDB
    await evaluator.save();

    return res
      .status(200)
      .json({ message: "PDF assigned to evaluator successfully!" });
  } catch (error) {
    console.error("Error assigning PDF to evaluator:", error);
    res.status(500).json({ error: "Error assigning file" });
  }
});

// app.post("/assign-pdf-to-evaluator", async (req, res) => {
//   try {
//     const { evaluatorName, subject, division, pdfUrl } = req.body;

//     if (!evaluatorName || !subject || !division || !pdfUrl) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     await connectToDB();

//     const result = await assignPdfToEvaluator(evaluatorName, subject, division, pdfUrl);

//     if (result.error) {
//       return res.status(400).json({ error: result.error });
//     }

//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error in API:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
//----------main get request 
// app.get("/get-evaluator-pdfs", async (req, res) => {
//   try {
//     const { evaluatorName } = req.query;

//     if (!evaluatorName) {
//       return res.status(400).json({ error: "Evaluator email is required" });
//     }

//     const evaluator = await Evaluator.findOne({ email: evaluatorName });

//     if (!evaluator) {
//       return res.status(404).json({ error: "Evaluator not found" });
//     }

//     return res.status(200).json({ assignedPdfs: evaluator.assignedPdfs });
//   } catch (error) {
//     console.error("Error retrieving PDFs:", error);
//     res.status(500).json({ error: "Error retrieving PDFs" });
//   }
// });

//----------------------

// app.get("/get-evaluator-pdfs", async (req, res) => {
//   try {
//     const { evaluatorName } = req.body;

//     if (!evaluatorName) {
//       return res.status(400).json({ error: "Evaluator name is required" });
//     }

//     const evaluator = await Evaluator.findOne({ Name: evaluatorName });

//     if (!evaluator) {
//       return res.status(404).json({ error: "Evaluator not found" });
//     }

//     return res.status(200).json({ assignedPdfs: evaluator.assignedPdfs });
//   } catch (error) {
//     console.error("Error retrieving PDFs:", error);
//     res.status(500).json({ error: "Error retrieving PDFs" });
//   }
// });
//-----------------------------

// app.get("/get-evaluator-pdfs", async (req, res) => {
//   try {
//     const { evaluatorName } = req.query;

//     if (!evaluatorName) {
//       return res.status(400).json({ error: "Evaluator name is required" });
//     }

//     await connectToDB();
//     const evaluator = await Evaluator.findOne({ name: evaluatorName });

//     if (!evaluator) {
//       return res.status(404).json({ error: "Evaluator not found" });
//     }

//     // Ensure assignedPdfs exists
//     evaluator.assignedPdfs = evaluator.assignedPdfs || [];

//     return res.status(200).json({ assignedPdfs: evaluator.assignedPdfs });
//   } catch (error) {
//     console.error("Error retrieving PDFs:", error);
//     res.status(500).json({ error: "Error retrieving PDFs" });
//   }
// });

// app.get("/get-evaluator-pdfs", async (req, res) => {
//   try {
//     const { evaluatorName } = req.query;

//     if (!evaluatorName) {
//       return res.status(400).json({ error: "Evaluator name is required" });
//     }

//     await connectToDB();
//     console.log("Searching for evaluator:", evaluatorName);

//     const evaluator = await Evaluator.findOne({ name: evaluatorName }); // Try changing to { email: evaluatorName } if needed
//     console.log("Evaluator found:", evaluator);

//     if (!evaluator) {
//       return res.status(404).json({ error: "Evaluator not found" });
//     }

//     // Ensure assignedPdfs exists
//     const assignedPdfs = evaluator.assignedPdfs || [];

//     return res.status(200).json({ assignedPdfs });
//   } catch (error) {
//     console.error("Error retrieving PDFs:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const multer = require("multer");
// // const cloudinary = require("cloudinary").v2;
// // const User = require("./models/User"); // Import the User model

// // const app = express();
// // const PORT = process.env.PORT || 7000;

// // cloudinary.config({
// //   cloud_name: "dybikmq0t",
// //   api_key: "815433726972854",
// //   api_secret: "DhICqR6F99hfK1v5k91fBvCE_pI",
// // });

// // app.use(express.json());
// // app.use(cors());

// // const storage = multer.memoryStorage();
// // const upload = multer({ storage });

// // // Connect to MongoDB
// // const connectToDB = async () => {
// //   try {
// //     await mongoose.connect("mongodb://127.0.0.1:27017/LoginOptions", {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     console.log("Connected to MongoDB: LoginOptions");
// //   } catch (err) {
// //     console.error("MongoDB connection error:", err);
// //     throw err;
// //   }
// // };

// // app.post("/login-options/evaluatorlogin", async (req, res) => {
// //   const { email, password, accessCode } = req.body;

// //   if (!email || !password || !accessCode) {
// //     return res.status(400).json({ error: "All fields are required" });
// //   }

// //   try {
// //     await connectToDB();

// //     const User = require("./models/User.js")("login");

// //     const evaluator = await User.findOne({ email, role: "evaluator" });
// //     if (!evaluator) {
// //       return res.status(404).json({ error: "Evaluator not found" });
// //     }

// //     const isMatch = await bcrypt.compare(password, evaluator.password);
// //     if (!isMatch || evaluator.accessCode !== accessCode) {
// //       return res.status(400).json({ error: "Invalid credentials" });
// //     }

// //     res.status(200).json({ message: "Evaluator login successful" });
// //   } catch (err) {
// //     console.error("Server error:", err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// // app.post("/signup", async (req, res) => {
// //   let { email, password, rollNumber, name, role } = req.body;

// //   // Assign default role as "student" if not provided
// //   role = role || "student"; // Default role if not provided

// //   // Validate required fields
// //   if (!email || !password) {
// //     return res.status(400).json({ error: "Email and password are required" });
// //   }

// //   if (role === "student") {
// //     if (!rollNumber || !name) {
// //       return res
// //         .status(400)
// //         .json({ error: "Roll number and name are required for students" });
// //     }
// //   }

// //   try {
// //     await connectToDB();

// //     const User = require("./models/User.js")("login");

// //     // Check if user already exists
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ error: "User already exists" });
// //     }

// //     // Hash the password before saving
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Prepare user object
// //     const newUser = new User({
// //       email,
// //       password: hashedPassword,
// //       role,
// //     });

// //     // Add rollNumber and name for students
// //     if (role === "student") {
// //       newUser.rollNumber = rollNumber;
// //       newUser.name = name;
// //     }

// //     // Save user to MongoDB
// //     await newUser.save();
// //     res.status(201).json({ message: "User registered successfully" });
// //   } catch (err) {
// //     console.error("Signup error:", err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// // app.post("/login-options/studentlogin", async (req, res) => {
// //   const { email, password, rollNumber, name } = req.body;

// //   if (!email || !password || !rollNumber || !name) {
// //     return res.status(400).json({ error: "All fields are required" });
// //   }

// //   try {
// //     await connectToDB();

// //     const User = require("./models/User.js")("login");

// //     const student = await User.findOne({ email, role: "student" });
// //     if (!student) {
// //       return res.status(404).json({ error: "Student not found" });
// //     }

// //     const isMatch = await bcrypt.compare(password, student.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ error: "Invalid credentials" });
// //     }

// //     res.status(200).json({ message: "Student login successful" });
// //   } catch (err) {
// //     console.error("Server error:", err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// // app.post("/login-options/adminlogin", async (req, res) => {
// //   const { email, password } = req.body;

// //   if (!email || !password) {
// //     return res.status(400).json({ error: "Email and password are required" });
// //   }

// //   try {
// //     await connectToDB();

// //     const User = require("./models/User.js")("login");

// //     const admin = await User.findOne({ email, role: "admin" });
// //     if (!admin) {
// //       return res.status(404).json({ error: "Admin not found" });
// //     }

// //     const isMatch = await bcrypt.compare(password, admin.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ error: "Invalid credentials" });
// //     }

// //     res.status(200).json({ message: "Admin login successful" });
// //   } catch (err) {
// //     console.error("Server error:", err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// // app.post("/upload-pdf", upload.single("pdfFile"), async (req, res) => {
// //   if (!req.file) {
// //     return res.status(400).json({ error: "No file uploaded" });
// //   }

// //   // Ensure only PDF files are allowed
// //   if (req.file.mimetype !== "application/pdf") {
// //     return res.status(400).json({ error: "Only PDF files are allowed" });
// //   }

// //   try {
// //     const uploadPromise = new Promise((resolve, reject) => {
// //       const uploadStream = cloudinary.uploader.upload_stream(
// //         { resource_type: "raw", format: "pdf" }, // Ensure it's stored as a PDF
// //         (error, result) => {
// //           if (error) {
// //             reject(error);
// //           } else {
// //             resolve(result);
// //           }
// //         }
// //       );

// //       uploadStream.end(req.file.buffer);
// //     });

// //     const uploadedFile = await uploadPromise;

// //     res.status(200).json({
// //       message: "✅ PDF uploaded successfully",
// //       url: uploadedFile.secure_url,
// //     });
// //   } catch (err) {
// //     console.error("Error uploading file:", err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// // // POST: Reset Password Route
// // app.post("/reset-password", async (req, res) => {
// //   const { email, newPassword } = req.body;

// //   if (!email || !newPassword) {
// //     return res
// //       .status(400)
// //       .json({ error: "Email and new password are required" });
// //   }

// //   try {
// //     // Connect to DB
// //     await connectToDB();

// //     // Find the user by email
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(404).json({ error: "User not found" });
// //     }

// //     // Hash the new password
// //     const hashedPassword = await bcrypt.hash(newPassword, 10);

// //     // Update the password in the database
// //     await User.updateOne({ email }, { $set: { password: hashedPassword } });

// //     return res.status(200).json({ message: "Password reset successful" });
// //   } catch (error) {
// //     console.error("Error resetting password:", error);
// //     return res
// //       .status(500)
// //       .json({ error: "Something went wrong. Please try again." });
// //   }
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });

//------------------------------
// app.post("/upload-pdf", upload.single("pdfFile"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const { subject, teacher } = req.body;

//     // Validate subject and teacher mapping
//     const validSubjects = {
//       AJP: ["Teacher A", "Teacher B"],
//       PDC: ["Teacher C", "Teacher D"],
//       CN: ["Teacher E", "Teacher F"],
//       PM: ["Teacher G", "Teacher H"],
//     };

//     const validDivisions = ["Div-5", "Div-6", "Div-7", "Div-8"];

//     if (!validSubjects[subject] || !validSubjects[subject].includes(teacher)) {
//       return res.status(400).json({ error: "Invalid subject or teacher" });
//     }

//     // Define the Cloudinary folder structure (Home > Subject > Teacher)
//     const folderPath = `Home/${subject}/${teacher}`;

//     // Upload file to Cloudinary
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder: folderPath, // Cloudinary automatically creates folders
//         resource_type: "auto", // Auto detect file type (pdf in this case)
//         public_id: Date.now().toString(), // Unique file name
//       },
//       (error, result) => {
//         if (error) {
//           return res.status(500).json({ error: error.message });
//         }

//         return res.status(200).json({
//           message: "File uploaded successfully!",
//           url: result.secure_url, // Cloudinary URL of uploaded file
//         });
//       }
//     );

//     // Pipe the file buffer to Cloudinary's upload stream
//     streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     res.status(500).json({ error: "Error uploading file" });
//   }
// });
//----------------------

// // Define valid subjects, teachers, and divisions
// const validSubjects = {
//   AJP: ["Teacher A", "Teacher B"],
//   PDC: ["Teacher C", "Teacher D"],
//   CN: ["Teacher E", "Teacher F"],
//   PM: ["Teacher G", "Teacher H"],
// };

// const validDivisions = ["Div-5", "Div-6", "Div-7", "Div-8"]; // Allowed divisions

// app.post("/upload-pdf", upload.single("pdfFile"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const { subject, teacher, division } = req.body;

//     // Validate subject, teacher, and division
//     if (!validSubjects[subject] || !validSubjects[subject].includes(teacher)) {
//       return res.status(400).json({ error: "Invalid subject or teacher" });
//     }

//     if (!validDivisions.includes(division)) {
//       return res.status(400).json({ error: "Invalid division" });
//     }

//     // Define the Cloudinary folder structure (Home > Subject > Teacher > Division)
//     const folderPath = `${subject}/${teacher}/${division}`;

//     // Upload file to Cloudinary
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder: folderPath, // Cloudinary automatically creates folders
//         resource_type: "auto", // Auto detect file type (pdf in this case)
//         public_id: Date.now().toString(), // Unique file name
//       },
//       (error, result) => {
//         if (error) {
//           return res.status(500).json({ error: error.message });
//         }

//         return res.status(200).json({
//           message: "File uploaded successfully!",
//           url: result.secure_url, // Cloudinary URL of uploaded file
//         });
//       }
//     );
//     // Pipe the file buffer to Cloudinary's upload stream
//     streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     res.status(500).json({ error: "Error uploading file" });
//   }
// });
//-------------------------------------
