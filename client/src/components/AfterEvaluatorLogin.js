import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AfterEvaluatorLogin.css";

const AfterEvaluatorLogin = () => {
  const [division, setDivision] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get the evaluator's name from location state
  const evaluatorName = location.state?.evaluatorName || "Evaluator";

  const handleSearch = () => {
    if (!subject || !division) {
      alert("Please select both subject and division.");
      return;
    }

    // Navigate to /on-screen-evaluation with evaluatorName
    navigate("/on-screen-evaluation", {
      state: { subject, division, evaluatorName },
    });
  };

  return (
    <div className="after-evaluator-login-container">
      <h1 className="after-title">Welcome, {evaluatorName}</h1>
      <div className="after-content">
        <label className="after-label">Select Division:</label>
        <select
          className="after-dropdown"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        >
          <option value="">-- Select Division --</option>
          {["A", "B", "C"].map((div, index) => (
            <option key={index} value={div}>
              {div}
            </option>
          ))}
        </select>

        <label className="after-label">Select Subject:</label>
        <select
          className="after-dropdown"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">-- Select Subject --</option>
          {["Mathematics", "Science", "English"].map((sub, index) => (
            <option key={index} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <button className="after-button search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default AfterEvaluatorLogin;
