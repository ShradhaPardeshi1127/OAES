

import React, { useState } from "react";


const ResetPassword = () => {
  const [email] = useState(
    localStorage.getItem("emailToReset") || "" // Retrieve email passed from Forgot Password
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/reset-password`, // Your API URL here
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }), // Send email and new password
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setSuccess(data.message); // Display success message
        setTimeout(() => {
          window.location.href = "/adminlogin"; // Redirect after successful password reset
        }, 2000);
      } else {
        setError(data.error); // Display error message
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <h1>Reset Password</h1>
      <p>Set a new password for your account</p>
      <form className="login-form" onSubmit={handleResetPassword}>
        <div className="input-group">
          <label htmlFor="email">Your Email *</label>
          <input
            type="email"
            id="email"
            value={email}
            disabled // Prevent modification
          />
        </div>
        <div className="input-group">
          <label htmlFor="newPassword">New Password *</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" className="login-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
