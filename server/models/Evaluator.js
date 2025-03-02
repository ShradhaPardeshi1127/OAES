// const mongoose = require("mongoose");

// const EvaluatorSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   accessCode: String,
//   role: { type: String, default: "evaluator" },
//   name: String,
//   assignedPdfs: [
//     {
//       subject: String,
//       division: String,
//       pdfUrl: String,
//       uploadedAt: { type: Date, default: Date.now },
//     },
//   ],
// }, { versionKey: "__v" });

// const Evaluator = mongoose.model("Evaluator", EvaluatorSchema);
// module.exports = Evaluator;

// // module.exports = (login) =>
// //     mongoose.model("Evaluator", EvaluatorSchema, login);

// evaluator.js (Your Model File)

//----------------------------
// const mongoose = require("mongoose");

// const EvaluatorSchema = new mongoose.Schema({
//     email: String,
//     password: String,
//     accessCode: String,
//     role: { type: String, default: "evaluator" },
//     name: String,
//     assignedPdfs: [
//         {
//             subject: String,
//             division: String,
//             pdfUrl: String,
//             uploadedAt: { type: Date, default: Date.now },
//         },
//     ],
// }, { versionKey: "__v", collection: "login" }); // Collection name is now 'login'

// const Evaluator = mongoose.model("Evaluator", EvaluatorSchema); // Model name remains 'Evaluator'
// module.exports = Evaluator;
//----------------------------------------

//--------------------------------------
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
