import React, { useState } from "react";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    console.log("Email:", email); // Debug log
    console.log("Password:", password); // Debug log

    try {
      const response = await fetch(
        "http://localhost:7000/login-options/adminlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Login error:", data.error); // Debug log
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      const data = await response.json();
      alert(data.message);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>
      <p>Welcome back! Please enter your details</p>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Enter your email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            autoComplete="email"
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
              autoComplete="current-password"
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
                localStorage.setItem("rememberMe", e.target.checked);
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
      </form>
    </div>
  );
};

export default AdminLogin;
