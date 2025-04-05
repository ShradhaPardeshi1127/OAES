import React, { useState } from "react";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Student Login</h1>
          <p className="text-blue-100">Welcome back! Please enter your details</p>
        </div>
        
        <form className="p-6 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="rollNumber" className="text-sm font-medium text-gray-700 block mb-1">
                Roll Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="rollNumber"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter your Roll Number"
                required
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            
            <div className="relative">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            
            <div className="relative">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                required
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            
            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer">
              <input
                type="checkbox"
                className="rounded text-blue-500 focus:ring-blue-500 mr-2"
                onChange={(e) => {
                  localStorage.setItem("rememberStudent", e.target.checked);
                }}
              />
              Remember me
            </label>
            <a
              href="/reset-password"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              onClick={() => localStorage.setItem("emailToReset", email)}
            >
              Forgot password?
            </a>
          </div>
          
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              LOGIN
            </button>
            
            <button
              type="button"
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              onClick={() => window.location.href = "/guest-dashboard"}
            >
              LOGIN AS GUEST
            </button>
          </div>
        </form>
        
        <div className="p-6 bg-gray-50 text-center border-t">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;