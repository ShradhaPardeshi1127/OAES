import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginOptions.css";

const LoginOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="login-options-container">
      <h1 className="login-options-title">OSM Evaluation System</h1>
      <div className="login-options-cards">
        {/* Admin Card */}
        <div
          className="login-card"
          onClick={() => navigate("/adminlogin")}
          style={{ cursor: "pointer" }}
        >
          <div className="icon">👤</div>
          <h2>Admin</h2>
          <p>
            Login as an administrator to oversee the evaluation process, manage
            user roles, and access analytics dashboards.
          </p>
        </div>

        {/* Evaluator Card */}
        <div
          className="login-card"
          onClick={() => navigate("/evaluatorlogin")}
          style={{ cursor: "pointer" }}
        >
          <div className="icon">📋</div>
          <h2>Evaluator</h2>
          <p>
            Login as an evaluator to review answer sheets, add annotations, and
            calculate scores efficiently.
          </p>
        </div>

        {/* Student Card */}
        <div
          className="login-card"
          onClick={() => navigate("/studentlogin")}
          style={{ cursor: "pointer" }}
        >
          <div className="icon">🎓</div>
          <h2>Student</h2>
          <p>
            Login as a student to view your results, track progress, and access
            feedback on evaluated answer sheets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;
