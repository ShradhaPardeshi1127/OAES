const mongoose = require("mongoose");

const answerSheetSchema = new mongoose.Schema({
  pdfId: String,
  rollNumber: String,
  marks: Object,
  checked: { type: Boolean, default: false },
});

const AnswerSheet = mongoose.model("AnswerSheet", answerSheetSchema); // Corrected model creation

module.exports = AnswerSheet; // Corrected export
