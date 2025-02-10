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

const mongoose = require("mongoose");

const EvaluatorSchema = new mongoose.Schema({
    email: String,
    password: String,
    accessCode: String,
    role: { type: String, default: "evaluator" },
    name: String,
    assignedPdfs: [
        {
            subject: String,
            division: String,
            pdfUrl: String,
            uploadedAt: { type: Date, default: Date.now },
        },
    ],
}, { versionKey: "__v", collection: "login" }); // Collection name is now 'login'

const Evaluator = mongoose.model("Evaluator", EvaluatorSchema); // Model name remains 'Evaluator'
module.exports = Evaluator;