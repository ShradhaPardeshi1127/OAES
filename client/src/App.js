import "./styles/App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginOptions from "./components/LoginOptions";
import GuestDashboard from "./components/GuestDashboard";
import SignUpPage from "./pages/SignUpPage";
import AdminLogin from "./components/AdminLogin";
import ResetPassword from "./components/ResetPassword";
import EvaluatorLogin from "./components/EvaluatorLogin";
import StudentLogin from "./components/StudentLogin";
import AdminDashboard from "./components/AdminDashboard";
import OnScreenEvaluation from "./components/OnScreenEvaluation";
import Evaluation from "./components/Evaluation";
import AnswerSheetTable from "./components/AnswerSheetTable";
import PdfViewer from "./components/PdfViewer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-options" element={<LoginOptions />} />
        <Route path="/guest-dashboard" element={<GuestDashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/evaluatorlogin" element={<EvaluatorLogin />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/on-screen-evaluation" element={<OnScreenEvaluation />} />
        <Route path="/evaluation/:id" element={<Evaluation />} />
        <Route path="/answer-sheet-table" element={<AnswerSheetTable />} />
        <Route path="/pdf-viewer" element={<PdfViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
