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
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
