// import React, { useState, useEffect, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const AnswerSheetTable = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { subject, evaluatorName, pdfs: locationPdfs } = location.state || { subject: "Subject Name", pdfs: [] };
//     const [answerSheets, setAnswerSheets] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [pdfs, setPdfs] = useState(locationPdfs || []);
//     const [hasUpdated, setHasUpdated] = useState(false); // Flag to prevent re-updates

//     useEffect(() => {
//         console.log("location.state in AnswerSheetTable:", location.state);
//         const initializeAnswerSheets = () => {
//             const initialAnswerSheets = locationPdfs.map((pdf, index) => ({
//                 index: index,
//                 pdfDetails: pdf,
//                 localMarks: {},
//                 localChecked: false,
//                 rollNumber: null
//             }));
//             setAnswerSheets(initialAnswerSheets);
//             setIsLoading(false);
//         };

//         if (locationPdfs) {
//             initializeAnswerSheets();
//         } else {
//             setIsLoading(false);
//         }
//     }, [locationPdfs, subject, evaluatorName]);

//     useEffect(() => {
//         setPdfs(locationPdfs || []);
//     }, [locationPdfs]);

//     const updateAnswerSheet = useCallback((sheetIndex, updateData) => {
//         setAnswerSheets(currentAnswerSheets => {
//             return currentAnswerSheets.map(sheet => {
//                 if (sheet.index === sheetIndex) {
//                     return {
//                         ...sheet,
//                         localMarks: updateData.marks,
//                         rollNumber: updateData.rollNumber,
//                         localChecked: true,
//                     };
//                 }
//                 return sheet;
//             });
//         });
//     }, []);

//     useEffect(() => {
//         // Check for submitted data in location.state when component mounts/location changes
//         if (location.state && location.state.submittedData && !hasUpdated) {
//             const submittedData = location.state.submittedData;
//             updateAnswerSheet(submittedData.index, { // Use index from submittedData
//                 marks: submittedData.marks,
//                 rollNumber: submittedData.rollNumber,
//                 checked: submittedData.checked,
//             });
//             setHasUpdated(true); // Mark as updated
//             navigate(location.pathname, { replace: true, state: {} }); // Clear location.state
//         }
//     }, [location, updateAnswerSheet, navigate, hasUpdated]);

//     const getAnswerSheet = (index) => {
//         const answerSheet = answerSheets.find(sheet => sheet.index === parseInt(index));
//         return answerSheet || {};
//     };

//     const calculateTotalMarks = (marks) => {
//         if (!marks) return 0;
//         return Object.values(marks).reduce((sum, mark) => sum + mark, 0);
//     };

//     useEffect(() => {
//         const fetchRollNumberStatus = async () => {
//             try {
//                 const response = await fetch('/answer-sheets'); // Ensure this API endpoint returns the required data
//                 const data = await response.json();

//                 console.log("Fetched data from DB:", data); // Debugging: Check what data is received

//                 setAnswerSheets(currentAnswerSheets =>
//                     currentAnswerSheets.map(sheet => {
//                         const updatedSheet = data.find(item => item.pdfId === sheet.index.toString()); // Match based on pdfId
//                         return updatedSheet
//                             ? {

//                                   rollNumber: updatedSheet.rollNumber || sheet.rollNumber,
//                                   localMarks: updatedSheet.marks || sheet.localMarks,
//                                   localChecked: updatedSheet.checked !== undefined ? updatedSheet.checked : sheet.localChecked,
//                               }
//                             : sheet;
//                     })
//                 );
//             } catch (error) {
//                 console.error('Error fetching roll number status:', error);
//             }
//         };

//         fetchRollNumberStatus(); // Fetch initially

//         const interval = setInterval(fetchRollNumberStatus, 5000); // Auto-refresh every 5 seconds
//         return () => clearInterval(interval); // Cleanup on unmount
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* ... rest of AnswerSheetTable.js UI code (same as before) ... */}
//             <div className="container mx-auto px-4 py-8">
//                 <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//                     <div className="header flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4">
//                         <div className="flex items-center mb-4 md:mb-0">
//                             <button
//                                 className="back-btn bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 flex items-center"
//                                 onClick={() => navigate(-1)}
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="h-5 w-5 mr-1"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                                 Back
//                             </button>
//                         </div>
//                         <h2 className="text-3xl font-bold text-gray-800 flex items-center">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-8 w-8 mr-2 text-blue-600"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                             >
//                                 <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0-2.443.29-3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
//                             </svg>
//                             {subject}
//                         </h2>
//                     </div>

//                     {isLoading ? (
//                         <div className="flex justify-center items-center h-64">
//                             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                         </div>
//                     ) : (
//                         <div className="overflow-x-auto bg-white rounded-lg shadow">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 {/* ... rest of table code (same as before) ... */}
//                                 <thead className="bg-gray-100">
//                                     <tr>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                                             ID
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                                             Action
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                                             Status
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                                             Marks
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                                             Roll Number
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                                             Attendance
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {answerSheets.map((answerSheetRow, index) => {
//                                         const pdf = answerSheetRow.pdfDetails;
//                                         const isChecked = answerSheetRow.localChecked || false;

//                                         return (
//                                             <tr
//                                                 key={index}
//                                                 className="hover:bg-gray-50 transition-colors duration-150"
//                                             >
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                     {pdf.sequentialId}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <button
//                                                         className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
//                                     ${isChecked ? "bg-indigo-600 hover:bg-indigo-700" : "bg-green-600 hover:bg-green-700"}
//                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200`}
//                                                         onClick={() =>
//                                                             navigate(`/evaluation/${index}`, {
//                                                                 state: {
//                                                                     pdfUrl: pdf.pdfUrl,
//                                                                     isChecked: isChecked,
//                                                                     evaluatorName: evaluatorName,
//                                                                     pdfId: index,
//                                                                     sequentialId: index,
//                                                                 },
//                                                             })
//                                                         }
//                                                         disabled={isChecked}
//                                                     >
//                                                         <svg
//                                                             xmlns="http://www.w3.org/2000/svg"
//                                                             className="h-4 w-4 mr-2"
//                                                             viewBox="0 0 20 20"
//                                                             fill="currentColor"
//                                                         >
//                                                             {isChecked ? (
//                                                                 <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                                                             ) : (
//                                                                 <path
//                                                                     fillRule="evenodd"
//                                                                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                                                     clipRule="evenodd"
//                                                                 />
//                                                             )}
//                                                         </svg>
//                                                         {isChecked ? "Review Sheet" : "Check Sheet"}
//                                                     </button>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <span
//                                                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                                         ${isChecked ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
//                                                     >
//                                                         {isChecked ? "Checked" : "Pending"}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <div className="text-sm font-medium text-gray-900">
//                                                         {isChecked && answerSheetRow.localMarks ? (
//                                                             <span className="font-bold">
//                                                                 {calculateTotalMarks(answerSheetRow.localMarks)}
//                                                             </span>
//                                                         ) : (
//                                                             <span className="text-gray-400">Not graded</span>
//                                                         )}
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <div className="text-sm text-gray-900">
//                                                         {isChecked && answerSheetRow.rollNumber ? (
//                                                             answerSheetRow.rollNumber
//                                                         ) : (
//                                                             <span className="text-gray-400">
//                                                                 Not available
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                                         Present
//                                                     </span>
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}

//                                     {pdfs.length === 0 && (
//                                         <tr>
//                                             <td
//                                                 colSpan="6"
//                                                 className="px-6 py-10 text-center text-gray-500"
//                                             >
//                                                 <svg
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     className="mx-auto h-12 w-12 text-gray-400"
//                                                     fill="none"
//                                                     viewBox="0 0 24 24"
//                                                     stroke="currentColor"
//                                                 >
//                                                     <path
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                         strokeWidth="2"
//                                                         d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                                                     />
//                                                 </svg>
//                                                 <p className="mt-2 text-sm font-medium">
//                                                     No answer sheets uploaded yet
//                                                 </p>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AnswerSheetTable;

//==-=-=-=-=-=-=-=-======================

import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AnswerSheetTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    subject,
    evaluatorName,
    pdfs: locationPdfs,
  } = location.state || { subject: "Subject Name", pdfs: [] };
  const [answerSheets, setAnswerSheets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfs, setPdfs] = useState(locationPdfs || []);
  const [hasUpdated, setHasUpdated] = useState(false);
  const [hasFetched, setHasFetched] = useState(false); // Flag to prevent re-fetching
  const baseUrl = "http://localhost:7000";

  useEffect(() => {
    console.log("location.state in AnswerSheetTable:", location.state);
    const initializeAnswerSheets = () => {
      const initialAnswerSheets = locationPdfs.map((pdf, index) => ({
        index: index,
        pdfDetails: pdf,
        localMarks: {},
        localChecked: false,
        rollNumber: null,
      }));
      setAnswerSheets(initialAnswerSheets);
      setIsLoading(false);
    };

    if (locationPdfs) {
      initializeAnswerSheets();
    } else {
      setIsLoading(false);
    }
  }, [locationPdfs]);

  useEffect(() => {
    setPdfs(locationPdfs || []);
  }, [locationPdfs]);

  const updateAnswerSheet = useCallback((sheetIndex, updateData) => {
    setAnswerSheets((currentAnswerSheets) => {
      return currentAnswerSheets.map((sheet) => {
        if (sheet.index === sheetIndex) {
          return {
            ...sheet,
            localMarks: updateData.marks,
            rollNumber: updateData.rollNumber,
            localChecked: true,
          };
        }
        return sheet;
      });
    });
  }, []);

  useEffect(() => {
    if (location.state && location.state.submittedData && !hasUpdated) {
      const submittedData = location.state.submittedData;
      updateAnswerSheet(submittedData.index, {
        marks: submittedData.marks,
        rollNumber: submittedData.rollNumber,
        checked: submittedData.checked,
      });
      setHasUpdated(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, updateAnswerSheet, navigate, hasUpdated]);

  const getAnswerSheet = (index) => {
    const answerSheet = answerSheets.find(
      (sheet) => sheet.index === parseInt(index)
    );
    return answerSheet || {};
  };

  const calculateTotalMarks = (marks) => {
    if (!marks) return 0;
    return Object.values(marks).reduce((sum, mark) => sum + mark, 0);
  };

  useEffect(() => {
    if (!isLoading && !hasFetched && answerSheets.length > 0) {
      const fetchRollNumberStatus = async () => {
        try {
          const response = await axios.get(`${baseUrl}/answer-sheets`);
          const data = await response.data;

          console.log("Fetched data from DB:", data);

          setAnswerSheets((currentAnswerSheets) =>
            currentAnswerSheets.map((sheet) => {
              console.log("Sheet: ", sheet);
              console.log("Sheet index:", sheet.pdfDetails.sequentialId);

              console.log("Data: ", data);

              const updatedSheet = data.find((item) => {
                console.log("Item: ", item);
                console.log("Item id: ", item.pdfId);

                return (
                  String(item.pdfId) ===
                  String(sheet.pdfDetails.sequentialId - 1)
                );
              });

              console.log("Updated sheet:", updatedSheet);

              return updatedSheet
                ? {
                    ...sheet,
                    rollNumber: updatedSheet.rollNumber || sheet.rollNumber,
                    localMarks: updatedSheet.marks || sheet.localMarks,
                    localChecked:
                      updatedSheet.checked !== undefined
                        ? updatedSheet.checked
                        : sheet.localChecked,
                  }
                : sheet;
            })
          );

          setHasFetched(true); // Mark as fetched to avoid future fetches
        } catch (error) {
          console.error("Error fetching roll number status:", error);
        }
      };

      fetchRollNumberStatus(); // Fetch once
    }
  }, [isLoading, answerSheets, hasFetched]);
  console.log("this is answersheets- ", answerSheets);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... rest of AnswerSheetTable.js UI code (same as before) ... */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="header flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <button
                className="back-btn bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 flex items-center"
                onClick={() => navigate(-1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back
              </button>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0-2.443.29-3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              {subject}
            </h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                {/* ... rest of table code (same as before) ... */}
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Marks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Roll Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Attendance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {answerSheets.map((answerSheetRow, index) => {
                    const pdf = answerSheetRow.pdfDetails;
                    const isChecked = answerSheetRow.localChecked || false;

                    return (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {pdf.sequentialId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                                    ${
                                      isChecked
                                        ? "bg-indigo-600 hover:bg-indigo-700"
                                        : "bg-green-600 hover:bg-green-700"
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200`}
                            onClick={() =>
                              navigate(`/evaluation/${index}`, {
                                state: {
                                  pdfUrl: pdf.pdfUrl,
                                  isChecked: isChecked,
                                  evaluatorName: evaluatorName,
                                  pdfId: index,
                                  sequentialId: index,
                                },
                              })
                            }
                            disabled={isChecked}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              {isChecked ? (
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              ) : (
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              )}
                            </svg>
                            {isChecked ? "Review Sheet" : "Check Sheet"}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                        ${
                                          isChecked
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                          >
                            {isChecked ? "Checked" : "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {isChecked && answerSheetRow.localMarks ? (
                              <span className="font-bold">
                                {calculateTotalMarks(answerSheetRow.localMarks)}
                              </span>
                            ) : (
                              <span className="text-gray-400">Not graded</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {isChecked && answerSheetRow.rollNumber ? (
                              answerSheetRow.rollNumber
                            ) : (
                              <span className="text-gray-400">
                                Not available
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Present
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {pdfs.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="mt-2 text-sm font-medium">
                          No answer sheets uploaded yet
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerSheetTable;
