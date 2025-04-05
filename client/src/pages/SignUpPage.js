import React, { useState } from "react";


const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!rollNo.match(/^\d+$/)) {
      setError("Roll No must be a valid number.");
      return;
    }

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Roll No:", rollNo);
    console.log("Password:", password);

    try {
      const response = await fetch("http://localhost:7000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, rollNo, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Sign-Up error:", data.error);
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
    <div className="signup-container">
      <h1>Sign Up</h1>
      <p>Create your account by filling in the details below</p>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="input-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
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
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="rollNo">Roll No *</label>
          <input
            type="text"
            id="rollNo"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter your roll number"
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
              placeholder="Enter your password"
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
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
