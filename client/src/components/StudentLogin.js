import React, { useState } from "react";
import "../styles/StudentLogin.css";

const StudentLogin = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Roll Number:", rollNumber);
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("Password:", password);

    try {
      const response = await fetch(
        "http://localhost:7000/login-options/studentlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rollNumber, email, name, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Login error:", data.error);
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      const data = await response.json();
      alert(data.message);
      window.location.href = "/student-dashboard";
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="student-login-container">
      <h1>Student Login</h1>
      <p>Welcome back! Please enter your details</p>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="rollNumber">Roll Number *</label>
          <input
            type="text"
            id="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter your Roll Number"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password *</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{ width: "100%" }}
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="options">
          <label>
            <input
              type="checkbox"
              onChange={(e) => {
                localStorage.setItem("rememberStudent", e.target.checked);
              }}
            />{" "}
            Remember me
          </label>
          <a
            href="/reset-password"
            className="reset-password-link"
            onClick={() => localStorage.setItem("emailToReset", email)}
          >
            Forgot password?
          </a>
        </div>
        <button type="submit" className="login-btn">
          LOGIN
        </button>
        <button type="button" className="guest-login-btn">
          LOGIN AS GUEST
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;
