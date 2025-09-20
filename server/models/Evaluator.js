
const mongoose = require("mongoose");

// Define the schema
const evaluatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessCode: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "evaluator",
    },
    assignedPdfs: [
      {
        subject: String,
        division: String,
        pdfUrl: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
        checked: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { versionKey: "__v", collection: "login" }
); //  collection name is 'login'

// Create the model
const Evaluator = mongoose.model("Evaluator", evaluatorSchema);

// Export the model
module.exports = Evaluator;
