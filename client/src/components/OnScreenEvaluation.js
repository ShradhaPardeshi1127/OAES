import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/OnScreenEvaluation.css";

const papers = [
  {
    course: "BCA",
    specialization: "Marketing Analytics",
    semester: "Semester 4",
    endDate: "Jan 31, 2020",
    uploaded: 5,
    checked: 0,
    remaining: 5,
  },
];

const OnScreenEvaluation = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleCheckPaper = () => {
    // Redirect to the Answer Sheet Table page
    navigate("/answer-sheet-table");
  };

  return (
    <div className="evaluation-container">
      <h1>On-Screen Evaluation</h1>
      <div className="cards-container">
        {papers.map((paper, index) => (
          <div className="paper-card" key={index}>
            <h2>{paper.specialization}</h2>
            <p>
              <strong>Course:</strong> {paper.course}
            </p>
            <p>
              <strong>Semester:</strong> {paper.semester}
            </p>
            <p>
              <strong>End Date:</strong> {paper.endDate}
            </p>
            <div className="status">
              <p>
                <strong>Uploaded:</strong> {paper.uploaded}
              </p>
              <p>
                <strong>Checked:</strong> {paper.checked}
              </p>
              <p>
                <strong>Remaining:</strong> {paper.remaining}
              </p>
            </div>
            <button className="check-paper-btn" onClick={handleCheckPaper}>
              Check Paper
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnScreenEvaluation;

