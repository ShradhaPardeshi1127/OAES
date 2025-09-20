


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
const AnswerSheet = require("./models/answersheet");


const createUserModel = require('./models/User.js'); // Assuming User.js is in the same directory
const User = createUserModel('login'); // Create User model instance

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 7000;


cloudinary.config({
  cloud_name: " dybikmq0t",
  api_key: "815433726972854",
  api_secret: "DhICqR6F99hfK1v5k91fBvCE_pI",
});

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });


async function connectToDB(retries = 5, delay = 3000) {
  while (retries) {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/LoginOptions", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("✅ Connected to MongoDB: LoginOptions");
      return; // Exit function if connection is successful
    } catch (error) {
      console.error(`❌ MongoDB connection failed. Retries left: ${retries - 1}`);
      console.error("Error:", error.message);

      retries -= 1;
      if (!retries) {
        console.error("❌ Could not connect to MongoDB. Exiting...");
        process.exit(1);
      }
      
      // Wait before retrying
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}
connectToDB()

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
      console.error("Detailed Error:", error); // Enhanced error logging
      res.status(500).json({ message: 'Failed to fetch assigned PDFs' });
  }
});


app.post("/submit-evaluation", async (req, res) => {
  try {
    console.log("Entered here");
    const { pdfId, rollNumber, marks } = req.body;
    console.log(pdfId);

    // Find the existing answer sheet (if any) or create a new one
    let answerSheet = await AnswerSheet.findOne({pdfId});
    console.log("Ansersheet: ",answerSheet)
    if (!answerSheet) {
      answerSheet = new AnswerSheet({ pdfId, rollNumber, marks });
      answerSheet.checked = true; // Corrected variable name
    } else {
      answerSheet.rollNumber = rollNumber;
      answerSheet.marks = marks;
      answerSheet.checked = true;
    }

    await answerSheet.save();

    res.status(200).json({ message: "Evaluation submitted successfully!" });
  } catch (error) {
    console.error("Error submitting evaluation:", error);
    res.status(500).json({ error: "Failed to submit evaluation." });
  }
});


app.get('/answer-sheets', async (req, res) => {
  try {
    // Fetch all answer sheets from the AnswerSheet collection
    const answerSheets = await AnswerSheet.find();

    // Format the answer sheet data to include the fields needed by the frontend
    const formattedAnswerSheets = answerSheets.map(answerSheet => {
      return {
        _id: answerSheet._id,           // Unique ID of the AnswerSheet document (essential)
        pdfId: answerSheet.pdfId,
        rollNumber: answerSheet.rollNumber, // Student Roll Number
        marks: answerSheet.marks,         // Marks object (e.g., { "1a": 8, "1b": 7, ... })
        checked: answerSheet.checked,     // Boolean: true if checked, false if pending
        // pdfUrl: answerSheet.pdfUrl,       // URL of the PDF document (if stored in AnswerSheet)
        // evaluatorName: answerSheet.evaluatorName, // Name of the evaluator (if stored)
        // pdfId: answerSheet.pdfId,         // Original PDF ID (if relevant)
        // Add any other fields from your AnswerSheet model that you want to send to the frontend
      };
    });

    // Send the formatted answer sheets as a JSON response with status 200 (OK)
    res.status(200).json(formattedAnswerSheets);

  } catch (error) {
    // Handle errors gracefully and send an error response
    console.error("Error fetching answer sheets:", error);
    res.status(500).json({ error: "Failed to fetch answer sheets", details: error.message }); // Include error details for debugging
  }
});


// server.js

// app.post("/update-pdf-checked-status", async (req, res) => {
//   try {
//     const { evaluatorName, pdfUrl } = req.body;

//     if (!evaluatorName || !pdfUrl) {
//       return res.status(400).json({ error: "Evaluator name and PDF URL are required" });
//     }

//     await connectToDB();

//     const evaluator = await Evaluator.findOne({ name: evaluatorName });
//     if (!evaluator) {
//       return res.status(404).json({ error: "Evaluator not found" });
//     }

//     // Find the specific PDF in assignedPdfs array and update checked status
//     const pdfToUpdate = evaluator.assignedPdfs.find(pdf => pdf.pdfUrl === pdfUrl);
//     if (!pdfToUpdate) {
//       return res.status(404).json({ error: "PDF not found for this evaluator" });
//     }

//     pdfToUpdate.checked = true; // Set checked to true

//     await evaluator.save(); // Save the updated evaluator document

//     res.status(200).json({ message: "PDF checked status updated successfully" });

//   } catch (error) {
//     console.error("Error updating PDF checked status:", error);
//     res.status(500).json({ error: "Failed to update PDF checked status", details: error.message });
//   }
// });

//new eoute to assing pdf while upload 27 march

// app.post("/create-answer-sheets-on-assignment", async (req, res) => {
//   try {
//       const { evaluatorName, pdfs } = req.body; // Expect evaluatorName and pdfs array

//       if (!evaluatorName || !pdfs || !Array.isArray(pdfs)) {
//           return res.status(400).json({ error: "evaluatorName and an array of pdfs are required" });
//       }

//       await connectToDB(); // Ensure database connection

//       const createdAnswerSheetIds = []; // To track IDs of created AnswerSheets

//       // Iterate through the pdfs array
//       for (const pdfData of pdfs) {
//           const { subject, division, pdfUrl } = pdfData;

//           if (!subject || !division || !pdfUrl) {
//               console.warn("Skipping PDF due to missing fields:", pdfData);
//               continue; // Skip if data is missing
//           }

//           // Create a new AnswerSheet document in MongoDB for each PDF
//           const newAnswerSheet = new AnswerSheet({
//               pdfId: pdfUrl, // Or generate a unique ID if pdfUrl is not suitable as pdfId
//               rollNumber: null,
//               marks: {},
//               checked: false,
//               // You can add subject, division, evaluatorName, etc., to AnswerSheet if needed
//           });

//           const savedAnswerSheet = await newAnswerSheet.save();
//           createdAnswerSheetIds.push(savedAnswerSheet._id); // Track created AnswerSheet IDs
//       }

//       // After creating AnswerSheets, THEN assign PDFs to evaluator (your existing logic)
//       const evaluator = await Evaluator.findOne({ name: evaluatorName });
//       if (!evaluator) {
//           return res.status(404).json({ error: "Evaluator not found" });
//       }
//       for (const pdfData of pdfs) {
//           const { subject, division, pdfUrl } = pdfData;
//           evaluator.assignedPdfs.push({ subject, division, pdfUrl });
//       }
//       await evaluator.save();


//       res.status(201).json({
//           success: true,
//           message: "AnswerSheets created and PDFs assigned successfully!",
//           createdAnswerSheetIds: createdAnswerSheetIds, // Optionally return created AnswerSheet IDs
//           evaluator: evaluator, // Optionally return updated evaluator data
//       });

//   } catch (error) {
//       console.error('Error creating AnswerSheets and assigning PDFs:', error);
//       res.status(500).json({ success: false, message: 'Failed to create AnswerSheets and assign PDFs.', error: error.message });
//   }
// });

//------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});












