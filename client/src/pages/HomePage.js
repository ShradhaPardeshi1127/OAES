import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import osmillustration from "../assets/IMG_1.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-page-content">
        <div className="home-page-image">
          <img
            src={osmillustration} // Replace with actual image URL or local asset
            alt="OSM Illustration"
          />
        </div>
        <div className="home-page-text">
          <h1>Welcome to Evaluate Answer Sheet Using OSM</h1>
          <p>
            Streamline the evaluation process with our Onscreen Marking (OSM)
            system. Easily assess answer sheets, add annotations, and calculate
            scores. Manage feedback seamlessly and track progress efficiently.
          </p>
          <div className="home-page-buttons">
            <button
              className="login-btn"
              onClick={() => navigate("/login-options")}
            >
              Login
            </button>
            <button
              className="guest-btn"
              onClick={() => navigate("/guest-dashboard")}
            >
              Login as Guest
            </button>
          </div>
          <p className="signup-link">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="signup-btn"
              style={{
                background: "none",
                border: "none",
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
                padding: 0,
              }}
            >
             Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
