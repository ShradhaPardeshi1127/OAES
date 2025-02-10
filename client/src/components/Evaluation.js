import React, { useState } from 'react';
import '../styles/Evaluation.css';

const Evaluation = () => {
  const [selectedMark, setSelectedMark] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const questions = ["Q1", "Q2", "Q3", "Q4", "Q5"];

  return (
    <div className="evaluation-container">
      {/* Left Section: Marks */}
      <div className="marks-section">
        <h2 className="section-title">Marks</h2>
        {marks.map((mark) => (
          <button
            key={mark}
            className={`mark-btn ${selectedMark === mark ? "selected" : ""}`}
            onClick={() => setSelectedMark(mark)}
          >
            {mark}
          </button>
        ))}
      </div>

      {/* Center Section: Answer Sheet */}
      <div className="answer-sheet-section">
        <h2 className="section-title">Answer Sheet</h2>
        <div className="pdf-container">
          <embed
            src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            type="application/pdf"
          />
        </div>
        {selectedMark && <p>Selected Mark: {selectedMark}</p>}
      </div>

      {/* Right Section: Questions */}
      <div className="questions-section">
        <h2 className="section-title">Questions</h2>
        <div className="question-buttons">
          {questions.map((question, index) => (
            <button
              key={index}
              className={`question-btn ${
                selectedQuestion === question ? "selected" : ""
              }`}
              onClick={() => setSelectedQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Evaluation;