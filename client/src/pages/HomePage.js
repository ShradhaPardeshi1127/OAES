
import React from "react";
import { useNavigate } from "react-router-dom";
import osmillustration from "../assets/hs_page2.png"; // Keeping import in case you want to add image back

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500"> {/* Reduced max-w-6xl to max-w-4xl */}
        <div className="flex flex-col items-center"> {/* Changed grid to flex and items-center to center content */}

          {/* Content section */}
          <div className="text-center space-y-6"> {/* Removed md:text-left from here */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 relative group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-full">
                Welcome to Onscreen Answersheet Evaluation System
              </span>
              <span className="group-hover:opacity-0 transition-opacity duration-500">
                Welcome to Onscreen Answersheet Evaluation System
              </span>
            </h1>
            <p className="text-xl leading-relaxed mb-8 text-gray-700">

            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8"> {/* Centered buttons */}
              <button
                className="bg-blue-500 text-white font-bold py-4 px-10 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                onClick={() => navigate("/login-options")}
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-600 rounded-full group-hover:w-96 group-hover:h-96 opacity-10"></span>
                <span className="relative">Login</span>
              </button>
              <button
                className="bg-green-500 text-white font-bold py-4 px-10 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                onClick={() => navigate("/guest-dashboard")}
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-600 rounded-full group-hover:w-96 group-hover:h-96 opacity-10"></span>
                <span className="relative">Login as Guest</span>
              </button>
            </div>

            <div className="transform hover:scale-110 transition-all duration-300 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-md hover:shadow-xl">
              <p className="text-lg text-gray-600 relative overflow-hidden group inline-block">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-red-500 font-medium relative inline-block ml-2"
                >
                  <span className="relative z-10 text-xl">Sign up</span>
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
