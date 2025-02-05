const Evaluator = require("../models/Evaluator.js");

const assignPdfToEvaluator = async (
  evaluatorName,
  subject,
  division,
  pdfUrl
) => {
  try {
    const evaluator = await Evaluator.findOne({ name: evaluatorName });

    if (!evaluator) {
      throw new Error("Evaluator not found");
    }

    // Convert __v to a number if it's a string
    if (typeof evaluator.__v === "string") {
      evaluator.__v = Number(evaluator.__v);
    }

    evaluator.assignedPdfs.push({ subject, division, pdfUrl });

    await evaluator.save();
    return { message: "PDF assigned successfully to evaluator." };
  } catch (error) {
    console.error("Error assigning PDF:", error);
    return { error: error.message };
  }
};

module.exports = { assignPdfToEvaluator };
