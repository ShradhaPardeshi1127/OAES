import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OnScreenEvaluation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { evaluatorName, subject, division } = location.state || {};
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignedPdfs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:7000/evaluators/${evaluatorName}/assignedPdfs?subject=${subject}&division=${division}`
        );
        // **MODIFICATION HERE:** Add sequential ID to each PDF object
        const pdfsWithSequentialId = response.data.map((pdf, index) => ({
          ...pdf,
          sequentialId: index + 1, // Adding sequentialId starting from 1
        }));
        setPdfs(pdfsWithSequentialId);
        console.log(
          "OnScreenEvaluation: Fetched PDFs from API:",
          response.data
        ); // DEBUG LOG - AFTER API CALL
      } catch (err) {
        setError(err.message || "Failed to fetch assigned PDFs.");
        setPdfs([]);
        console.error("Error fetching PDFs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (evaluatorName && subject && division) {
      fetchAssignedPdfs();
    } else {
      setError("Evaluator details, subject, or division not found.");
      setLoading(false);
    }
  }, [evaluatorName, subject, division]);

  const navigateToAnswerSheet = () => {
    console.log(
      "OnScreenEvaluation: PDFs being passed to AnswerSheetTable:",
      pdfs
    ); // DEBUG LOG - BEFORE NAVIGATION
    navigate("/answer-sheet-table", {
      state: {
        subject,
        pdfs,
        evaluatorName: evaluatorName,
      },
    });
  };

  // Calculate percentages for progress bar
  const checkedCount = pdfs.filter((p) => p.checked).length;
  const totalCount = pdfs.length;
  const completionPercentage =
    totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="bg-indigo-600 py-6 px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              On-Screen Evaluation
            </h1>
            <div className="flex items-center space-x-1">
              <span className="bg-white bg-opacity-20 text-white text-xs font-medium rounded-full px-3 py-1">
                Division {division}
              </span>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          {error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md mb-6 animate-pulse">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="rounded-full bg-indigo-100 p-2 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {subject}
                  </h2>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    <p className="mt-3 text-gray-600">Loading papers...</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          Total Papers
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                          {totalCount}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          Checked
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {checkedCount}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Progress
                        </span>
                        <span className="text-sm font-medium text-indigo-600">
                          {completionPercentage}%
                        </span>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${completionPercentage}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm">
                        <span className="font-medium">Remaining: </span>
                        <span className="text-gray-700 font-bold">
                          {totalCount - checkedCount}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          papers to check
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            onClick={navigateToAnswerSheet}
            disabled={loading || error || totalCount === 0}
          >
            <span className="flex items-center justify-center">
              {loading ? (
                "Loading Papers..."
              ) : totalCount === 0 ? (
                "No Papers Available"
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Start Checking Papers
                </>
              )}
            </span>
            {!loading && totalCount > 0 && !error && (
              <span className="absolute right-0 h-full w-12 -ml-12 transition-all duration-300 transform rotate-12 translate-x-12 bg-white opacity-10 group-hover:translate-x-0"></span>
            )}
          </button>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{evaluatorName}</span>
            </div>
            <div className="flex items-center text-indigo-600 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span>Division {division}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnScreenEvaluation;
