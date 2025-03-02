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

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 7000;

// cloudinary.config({
//   cloud_name: " dfziqsewl",
//   api_key: "197534461119351",
//   api_secret: "fsUxy85jCPLx3AgTf7dCOw1CbGc",
// });

cloudinary.config({
  cloud_name: " dybikmq0t",
  api_key: "815433726972854",
  api_secret: "DhICqR6F99hfK1v5k91fBvCE_pI",
});

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// const connectToDB = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/LoginOptions", {
//     });
//     console.log("Connected to MongoDB: LoginOptions");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//     throw err;
//   }
// };

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/LoginOptions", {
      // Your connection string
    });
    console.log("Connected to MongoDB: LoginOptions");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
}

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

// app.post("/assign-pdf-to-evaluator", async (req, res) => {
//   try {
//     const { evaluatorName, subject, division, pdfUrl } = req.body;

//     if (!evaluatorName || !subject || !division || !pdfUrl) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     await connectToDB();

//     // Find the evaluator by name
//     // const evaluator = await evaluatorModel.findOne({ name: evaluatorName }); // THIS IS THE KEY CHANGE
//     const evaluator = await Evaluator.findOne({ name: evaluatorName }); // Corrected line

//     if (!evaluator) {
//       return res.status(404).json({ error: "Evaluator not found" });
//     }

//     // Add new PDF entry to the evaluator's assignedPdfs array
//     evaluator.assignedPdfs.push({ subject, division, pdfUrl });

//     // Save changes to MongoDB
//     await evaluator.save();

//     return res
//       .status(200)
//       .json({ message: "PDF assigned to evaluator successfully!" });
//   } catch (error) {
//     console.error("Error assigning PDF to evaluator:", error);
//     res.status(500).json({ error: "Error assigning file" });
//   }
// });

app.post("/assign-pdf-to-evaluator", async (req, res) => {
  try {
    const { evaluatorName, pdfs } = req.body; // Expect evaluatorName and a pdfs array

    if (!evaluatorName || !pdfs || !Array.isArray(pdfs)) {
      return res.status(400).json({ error: "evaluatorName and an array of pdfs are required" });
    }

    await connectToDB();

    const evaluator = await Evaluator.findOne({ name: evaluatorName });

    if (!evaluator) {
      return res.status(404).json({ error: "Evaluator not found" });
    }

    // Iterate through the pdfs array
    for (const pdfData of pdfs) {
      const { subject, division, pdfUrl } = pdfData;

      // Validate each PDF's data
      if (!subject || !division || !pdfUrl) {
        console.warn("Skipping PDF due to missing fields:", pdfData);
        continue; // Skip to the next PDF object if data is missing
      }

      // Add the PDF data to the evaluator's assignedPdfs array
      evaluator.assignedPdfs.push({ subject, division, pdfUrl });
    }

    await evaluator.save();

    return res.status(201).json({ message: "PDFs assigned successfully!", evaluator });

  } catch (error) {
    console.error("Error assigning PDFs:", error);
    res.status(500).json({ error: "Error assigning files", details: error.message });
  }
});

app.post("/get-pdfs", async (req, res) => {
  try {
    await connectToDB(); //Connect only once per request
    const { evaluatorName, subject, division } = req.body;

    console.log("Raw evaluatorName from frontend:", evaluatorName);
    const trimmedName = evaluatorName.trim();
    console.log("Trimmed evaluatorName:", trimmedName);

    // Fetch all evaluators to check names stored in the DB
    const allEvaluators = await Evaluator.find();
    console.log(
      "All evaluators in DB:",
      allEvaluators.map((e) => e.name)
    );

    // Try finding the evaluator with an exact match
    const evaluator = await Evaluator.findOne({
      name: trimmedName, // Exact match
      role: "evaluator",
    });

    console.log("Found evaluator:", evaluator);

    if (!evaluator) {
      return res
        .status(404)
        .json({ message: `Evaluator '${trimmedName}' not found in database!` });
    }

    // Filter PDFs assigned to the evaluator
    const filteredPdfs = evaluator.assignedPdfs.filter(
      (pdf) => pdf.subject === subject && pdf.division === division
    );

    if (filteredPdfs.length === 0) {
      return res
        .status(404)
        .json({ message: "No PDFs found for this selection." });
    }

    res.status(200).json(filteredPdfs);
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Example API endpoint using Express.js and Mongoose
app.get('/evaluators/:evaluatorName/assignedPdfs', async (req, res) => {
  const { evaluatorName } = req.params;
  const { subject, division } = req.query;

  try {
      // Find the evaluator by name
      const evaluator = await Evaluator.findOne({ name: evaluatorName });

      if (!evaluator) {
          return res.status(404).json({ message: 'Evaluator not found' });
      }

      // Filter assigned PDFs based on subject and division
      const assignedPdfs = evaluator.assignedPdfs.filter(pdf => {
          return pdf.subject === subject && pdf.division === division;
      });

      res.json(assignedPdfs);
  } catch (error) {
      console.error('Error fetching assigned PDFs:', error);
      res.status(500).json({ message: 'Failed to fetch assigned PDFs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
