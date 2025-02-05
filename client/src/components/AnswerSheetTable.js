import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AnswerSheetTable.css"; // CSS file

const answerSheets = [
  {
    id: "91132",
    status: "In progress",
    checked: "No",
    marks: 0,
    attendance: "Present",
  },
  {
    id: "91131",
    status: "Check Answersheet",
    checked: "No",
    marks: 0,
    attendance: "Present",
  },
  {
    id: "91130",
    status: "Check Answersheet",
    checked: "No",
    marks: 0,
    attendance: "Present",
  },
  {
    id: "91129",
    status: "Check Answersheet",
    checked: "No",
    marks: 0,
    attendance: "Present",
  },
  {
    id: "91128",
    status: "Check Answersheet",
    checked: "No",
    marks: 0,
    attendance: "Present",
  },
];

const AnswerSheetTable = () => {
  const navigate = useNavigate();

  const handleCheckPaper = (id) => {
    navigate(`/evaluation/${id}`); // Navigate to evaluation page for the specific ID
  };

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>{" "}
        {/* Add a Back button to navigate to the previous page */}
        <h2>Marketing Analytics - Semester 4</h2>
      </div>

      <table className="answer-sheet-table">
        <thead>
          <tr>
            <th>Assignment ID</th>
            <th>Check Answersheet</th>
            <th>Is Checked</th>
            <th>Marks</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {answerSheets.map((sheet, index) => (
            <tr key={index}>
              <td>
                <span
                  className="assignment-link"
                  onClick={() => navigate(`/evaluation/${sheet.id}`)} // Clicking on ID will redirect to the evaluation page for that ID
                >
                  {sheet.id}
                </span>
              </td>
              <td>
                {sheet.status === "In progress" ? (
                  <span className="status in-progress">In progress</span>
                ) : (
                  <button
                    className="check-btn"
                    onClick={() => handleCheckPaper(sheet.id)} // Handle button click for redirection
                  >
                    Check Answersheet
                  </button>
                )}
              </td>
              <td>{sheet.checked}</td>
              <td>{sheet.marks}</td>
              <td>{sheet.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnswerSheetTable;
