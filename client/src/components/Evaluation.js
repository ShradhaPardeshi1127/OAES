import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access the assignment ID
import "../styles/Evaluation.css"; // Import your custom CSS file

const Evaluation = () => {
  // Get the assignment ID from the URL
  const { id } = useParams();

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [marks, setMarks] = useState({});
  const [startTime] = useState(Date.now());
  const [timeTaken, setTimeTaken] = useState("00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(
        2,
        "0"
      );
      const seconds = String(elapsed % 60).padStart(2, "0");
      setTimeTaken(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const handleMarkSelection = (mark) => {
    if (selectedQuestion !== null) {
      setMarks((prev) => ({ ...prev, [selectedQuestion]: mark }));
    }
  };

  return (
    <div className="evaluation-container">
      {/* Left Section */}
      <div className="marks-section">
        <h2 className="section-title">Marks</h2>
        {[...Array(9)].map((_, mark) => (
          <button
            key={mark}
            onClick={() => handleMarkSelection(mark)}
            className={`mark-btn ${
              marks[selectedQuestion] === mark ? "selected" : ""
            }`}
          >
            {mark}
          </button>
        ))}
      </div>

      {/* Center Section */}
      <div className="answer-sheet-section">
        <h2 className="section-title">Answer Sheet for ID: {id}</h2>
        {/* Display PDF for the particular assignment (this can be dynamic too) */}
        <div className="pdf-container">
          <embed
            src={`/answer-sheets/${id}.pdf`} // Dynamic PDF based on assignment ID
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="questions-section">
        <h2 className="section-title">Questions</h2>
        <div className="question-buttons">
          {[1, 2, 3, 4, 5].map((q) => (
            <button
              key={q}
              onClick={() => setSelectedQuestion(q)}
              className={`question-btn ${
                selectedQuestion === q ? "selected" : ""
              }`}
            >
              Q{q}
            </button>
          ))}
        </div>

        <h2 className="section-title">Question Paper for ID: {id}</h2>
        {/* Display Question Paper PDF (also dynamic based on assignment ID) */}
        <div className="pdf-container">
          <embed
            src={`/question-papers/${id}.pdf`} // Dynamic PDF for the question paper based on assignment ID
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </div>
      </div>

      {/* Timer */}
      <div className="timer">
        <p className="timer-text">Time Taken: {timeTaken}</p>
      </div>
    </div>
  );
};

export default Evaluation;
