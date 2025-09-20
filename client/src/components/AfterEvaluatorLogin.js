

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AfterEvaluatorLogin = () => {
    const [division, setDivision] = useState("");
    const [subject, setSubject] = useState("");
    const [error, setError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const evaluatorName = location.state?.evaluatorName || "Evaluator";

    // Check form validity whenever division or subject changes
    useEffect(() => {
        setIsFormValid(!!division && !!subject);
    }, [division, subject]);

    const handleProceedToEvaluation = () => {
        if (!subject || !division) {
            setError("Please select both subject and division.");
            return;
        }

        navigate("/on-screen-evaluation", {
            state: {
                evaluatorName: evaluatorName,
                subject: subject,
                division: division
            }
        });
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-2xl rounded-xl p-8 sm:p-12 max-w-md w-full transform transition-all duration-300 hover:scale-102 hover:shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        Welcome, <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{evaluatorName}</span>
                    </h1>
                    <p className="text-gray-500">Please select your preferences to continue</p>
                </div>
                
                <div className="space-y-6">
                    {/* Select Division */}
                    <div className="transition-all duration-200 transform hover:translate-y-1">
                        <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Select Division:
                        </label>
                        <div className="relative">
                            <select
                                id="division"
                                className="appearance-none block w-full py-3 px-4 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                                value={division}
                                onChange={(e) => {
                                    setDivision(e.target.value);
                                    setError("");
                                }}
                            >
                                <option value="">-- Select Division --</option>
                                {["A", "B", "C"].map((div) => (
                                    <option key={div} value={div}>{div}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Select Subject */}
                    <div className="transition-all duration-200 transform hover:translate-y-1">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Select Subject:
                        </label>
                        <div className="relative">
                            <select
                                id="subject"
                                className="appearance-none block w-full py-3 px-4 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                    setError("");
                                }}
                            >
                                <option value="">-- Select Subject --</option>
                                {["Mathematics", "Science", "English"].map((sub) => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded animate-pulse">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Proceed Button */}
                    <div className="pt-4">
                        <button
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                            ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'} 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 relative overflow-hidden group`}
                            onClick={handleProceedToEvaluation}
                            disabled={!isFormValid}
                        >
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                                Proceed to Evaluation
                            </span>
                            {isFormValid && (
                                <span className="absolute right-0 h-full w-12 -ml-12 transition-all duration-300 transform rotate-12 translate-x-12 bg-white opacity-10 group-hover:translate-x-0"></span>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Additional hint */}
                <div className="mt-8 text-center text-xs text-gray-500">
                    <p>Select both options to enable the button</p>
                </div>
            </div>
        </div>
    );
};

export default AfterEvaluatorLogin;
