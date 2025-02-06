import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OnScreenEvaluation.css";

const OnScreenEvaluation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject, division, evaluatorName } = location.state || {};
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    // Fetch evaluator's assigned PDFs based on the evaluatorName
    // Example: Assuming you have an API to fetch assigned PDFs for a specific evaluator
    const fetchAssignedPdfs = async () => {
      try {
        const response = await fetch(
          `/api/evaluators/${evaluatorName}/assignedPdfs`
        );
        const data = await response.json();
        const filteredPdfs = data.filter(
          (pdf) => pdf.subject === subject && pdf.division === division
        );
        setPdfs(filteredPdfs);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchAssignedPdfs();
  }, [evaluatorName, subject, division]);

  return (
    <div className="evaluation-container">
      <h1>On-Screen Evaluation</h1>
      <div className="cards-container">
        <div className="paper-card">
          <h2>{subject}</h2>
          <p>
            <strong>Division:</strong> {division}
          </p>
          <p>
            <strong>Uploaded:</strong> {pdfs.length}
          </p>
          <p>
            <strong>Checked:</strong> {pdfs.filter((p) => p.checked).length}
          </p>
          <p>
            <strong>Remaining:</strong> {pdfs.filter((p) => !p.checked).length}
          </p>
          <button
            className="check-paper-btn"
            onClick={() =>
              navigate("/answer-sheet-table", { state: { subject } })
            }
          >
            Check Paper
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnScreenEvaluation;
