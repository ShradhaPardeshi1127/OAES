// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const Evaluation = () => {
//     const { id } = useParams();
//     const [selectedQuestion, setSelectedQuestion] = useState(null);
//     const [marks, setMarks] = useState({});
//     const [startTime] = useState(Date.now());
//     const [timeTaken, setTimeTaken] = useState("00:00:00");
//     const [isFullScreenPdf, setIsFullScreenPdf] = useState(false);
//     const [expandedQuestions, setExpandedQuestions] = useState({});
//     const [rollNumber, setRollNumber] = useState("");
//     const [rollNumberError, setRollNumberError] = useState("");
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // State to disable submit button initially

//     useEffect(() => {
//         const timer = setInterval(() => {
//             const elapsed = Math.floor((Date.now() - startTime) / 1000);
//             const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
//             const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
//             const seconds = String(elapsed % 60).padStart(2, "0");
//             setTimeTaken(`${hours}:${minutes}:${seconds}`); // Corrected line
//         }, 1000);
//         return () => clearInterval(timer);
//     }, [startTime]);

//     useEffect(() => {
//         // Validation effect to check roll number and enable/disable submit button
//         if (rollNumber.length === 5 && /^\d+$/.test(rollNumber)) {
//             setRollNumberError("");
//             setIsSubmitDisabled(false); // Enable submit if roll number is valid
//         } else {
//             setIsSubmitDisabled(true); // Disable submit if roll number is invalid or empty
//         }
//     }, [rollNumber]);

//     const handleMarkSelection = (mark) => {
//         if (selectedQuestion !== null) {
//             setMarks((prev) => ({ ...prev, [selectedQuestion]: mark }));
//         }
//     };

//     const getQuestionTotalMarks = (questionNumber) => {
//         let total = 0;
//         for (const key in marks) {
//             if (key.startsWith(questionNumber)) {
//                 total += marks[key];
//             }
//         }
//         return total;
//     };

//     const getSubQuestionMarks = (questionKey) => {
//         return marks[questionKey] || 0;
//     };

//     const isQuestionMarked = (questionKey) => {
//         return marks.hasOwnProperty(questionKey);
//     };

//     const toggleQuestionExpand = (questionNumber) => {
//         setExpandedQuestions(prev => ({
//             ...prev,
//             [questionNumber]: !prev[questionNumber]
//         }));
//     };

//     const handleRollNumberChange = (e) => {
//         const value = e.target.value;
//         setRollNumber(value);
//         if (value.length > 5 || !/^\d*$/.test(value)) { // Basic client-side validation for length and digits
//             setRollNumberError("Roll number must be exactly 5 digits.");
//         } else if (value.length < 5 && value.length > 0 && /^\d+$/.test(value)) {
//             setRollNumberError("Roll number must be exactly 5 digits.");
//         }
//         else {
//             setRollNumberError(""); // Clear error if input is within length and digit range (validation happens in useEffect)
//         }
//     };

//     const handleSubmitEvaluation = () => {
//         if (isSubmitDisabled) {
//             // This condition should ideally not be reached due to button disabling, but for extra safety
//             alert("Please enter a valid 5-digit Roll Number before submitting.");
//             return;
//         }
//         if (rollNumberError) {
//             alert("Please correct the Roll Number error before submitting.");
//             return;
//         }
//         // Handle submit logic here - e.g., send marks data and rollNumber
//         alert(`Evaluation Submitted for Roll Number: ${rollNumber}! Marks data: ${JSON.stringify(marks)}`);
//         console.log("Marks data:", marks);
//         console.log("Roll Number:", rollNumber);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 grid grid-cols-1 md:grid-cols-[240px_1fr_360px] gap-4">
//             {/* Marks Section - Fixed on Left */}
//             <aside className="bg-white rounded-lg shadow-md p-4 sticky top-4 h-fit">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-800">Marks (0-10)</h2>
//                 <div className="grid grid-cols-3 gap-2">
//                     {[...Array(11)].map((_, mark) => (
//                         <button
//                             key={mark}
//                             onClick={() => handleMarkSelection(mark)}
//                             className={`p-2 rounded text-sm ${marks[selectedQuestion] === mark
//                                 ? 'bg-blue-600 text-white'
//                                 : 'bg-blue-50 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
//                                 }`}
//                             aria-label={`Mark ${mark}`}
//                         >
//                             {mark}
//                         </button>
//                     ))}
//                 </div>
//             </aside>

//             {/* Answer Sheet Section - Middle */}
//             <main className="bg-white rounded-lg shadow-md flex-1 overflow-auto">
//                 <div className="p-4 border-b flex justify-between items-center">
//                     <h2 className="text-xl font-semibold text-gray-800">Answer Sheet: {id}</h2>
//                     <div className="text-gray-600 font-medium">
//                         Time: {timeTaken}
//                     </div>
//                 </div>
//                 <div className="h-[calc(100vh - 14rem)]">
//                     <embed
//                         src={`/answer-sheets/${id}.pdf`}
//                         type="application/pdf"
//                         className="w-full h-full"
//                     />
//                 </div>
//             </main>

//             {/* Questions Section - Right */}
//             <aside className="bg-white rounded-lg shadow-md p-4 h-fit">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
//                     <button
//                         onClick={() => setIsFullScreenPdf(!isFullScreenPdf)}
//                         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
//                     >
//                         {isFullScreenPdf ? 'Exit Full Screen' : 'Full Screen'}
//                     </button>
//                 </div>

//                 <div className="space-y-3 max-h-[70vh] overflow-y-auto">
//                     {[1, 2, 3, 4, 5, 6, 7, 8].map((q) => (
//                         <div key={q} className="border-b pb-3 bg-gray-50 rounded-md shadow-sm">
//                             <div className="px-4 py-2 cursor-pointer" onClick={() => toggleQuestionExpand(q)}>
//                                 <h3 className="font-medium mb-2 text-sm flex justify-between items-center">
//                                     <span>Question {q}</span>
//                                     <span className="font-semibold text-gray-700">{getQuestionTotalMarks(String(q))} Marks</span>
//                                 </h3>
//                             </div>
//                             {expandedQuestions[q] !== false && (
//                                 <div className="px-4">
//                                     <div className="grid grid-cols-1 gap-2">
//                                         {['a', 'b', 'c'].map((subQ) => (
//                                             <div key={`${q}${subQ}`} className="grid grid-cols-[1fr_50px] gap-2 items-center">
//                                                 <button
//                                                     key={`${q}${subQ}`}
//                                                     onClick={() => setSelectedQuestion(`${q}${subQ}`)}
//                                                     className={`p-2 text-xs rounded text-center flex items-center justify-center ${selectedQuestion === `${q}${subQ}`
//                                                         ? 'bg-blue-600 text-white'
//                                                         : isQuestionMarked(`${q}${subQ}`) ? 'bg-green-200 hover:bg-green-300' : 'bg-blue-50 hover:bg-blue-100'
//                                                         } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
//                                                 >
//                                                     {q}{subQ}
//                                                 </button>
//                                                 <div className="text-sm font-semibold text-gray-700 text-center bg-gray-100 py-2 rounded hover:bg-gray-200 focus:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-colors duration-200">
//                                                     {getSubQuestionMarks(`${q}${subQ}`)}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 <div className="mt-6 p-4 bg-blue-50 rounded-lg flex flex-col space-y-4">
//                     {/* Roll Number Input - ADDED HERE */}
//                     <div className="mb-2">
//                         <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
//                             Student Roll Number (5 Digits)
//                         </label>
//                         <input
//                             type="text"
//                             id="rollNumber"
//                             className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${rollNumberError ? 'border-red-500' : ''}`}
//                             placeholder="Enter 5-Digit Roll Number"
//                             value={rollNumber}
//                             onChange={handleRollNumberChange}
//                             maxLength="5" // Enforce max length in UI as well
//                         />
//                         {rollNumberError && <p className="mt-1 text-sm text-red-500">{rollNumberError}</p>}
//                     </div>

//                     <div>
//                         <h2 className="text-lg font-semibold mb-2">Total Marks</h2>
//                         <div className="text-2xl font-bold text-blue-600">
//                             {Object.values(marks).reduce((sum, mark) => sum + mark, 0)}
//                         </div>
//                     </div>
//                     <button
//                         className={`px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         onClick={handleSubmitEvaluation}
//                         disabled={isSubmitDisabled} // Disable button based on state
//                     >
//                         Submit Evaluation
//                     </button>
//                 </div>
//             </aside>
//         </div>
//     );
// };

// export default Evaluation;
//----------------------------------------------------------

//----------------------------------------------------------WITHOUT TAILWIND CSS
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "../styles/Evaluation.css"; // Import the CSS file

// const Evaluation = () => {
//   const { id } = useParams();
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [marks, setMarks] = useState({});
//   const [startTime] = useState(Date.now());
//   const [timeTaken, setTimeTaken] = useState("00:00:00");
//   const [isFullScreenPdf, setIsFullScreenPdf] = useState(false);
//   const [expandedQuestions, setExpandedQuestions] = useState({});
//   const [rollNumber, setRollNumber] = useState("");
//   const [rollNumberError, setRollNumberError] = useState("");
//   const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const elapsed = Math.floor((Date.now() - startTime) / 1000);
//       const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
//       const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(
//         2,
//         "0"
//       );
//       const seconds = String(elapsed % 60).padStart(2, "0");
//       setTimeTaken(`${hours}:${minutes}:${seconds}`);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [startTime]);

//   useEffect(() => {
//     if (rollNumber.length === 5 && /^\d+$/.test(rollNumber)) {
//       setRollNumberError("");
//       setIsSubmitDisabled(false);
//     } else {
//       setIsSubmitDisabled(true);
//     }
//   }, [rollNumber]);

//   const handleMarkSelection = (mark) => {
//     if (selectedQuestion !== null) {
//       setMarks((prev) => ({ ...prev, [selectedQuestion]: mark }));
//     }
//   };

//   const getQuestionTotalMarks = (questionNumber) => {
//     let total = 0;
//     for (const key in marks) {
//       if (key.startsWith(questionNumber)) {
//         total += marks[key];
//       }
//     }
//     return total;
//   };

//   const getSubQuestionMarks = (questionKey) => {
//     return marks[questionKey] || 0;
//   };

//   const isQuestionMarked = (questionKey) => {
//     return marks.hasOwnProperty(questionKey);
//   };

//   const toggleQuestionExpand = (questionNumber) => {
//     setExpandedQuestions((prev) => ({
//       ...prev,
//       [questionNumber]: !prev[questionNumber],
//     }));
//   };

//   const handleRollNumberChange = (e) => {
//     const value = e.target.value;
//     setRollNumber(value);
//     if (value.length > 5 || !/^\d*$/.test(value)) {
//       setRollNumberError("Roll number must be exactly 5 digits.");
//     } else if (value.length < 5 && value.length > 0 && /^\d+$/.test(value)) {
//       setRollNumberError("Roll number must be exactly 5 digits.");
//     } else {
//       setRollNumberError("");
//     }
//   };

//   const handleSubmitEvaluation = () => {
//     if (isSubmitDisabled) {
//       alert("Please enter a valid 5-digit Roll Number before submitting.");
//       return;
//     }
//     if (rollNumberError) {
//       alert("Please correct the Roll Number error before submitting.");
//       return;
//     }
//     alert(
//       `Evaluation Submitted for Roll Number: ${rollNumber}! Marks data: ${JSON.stringify(
//         marks
//       )}`
//     );
//     console.log("Marks data:", marks);
//     console.log("Roll Number:", rollNumber);
//   };

//   return (
//     <div className="evaluation-container">
//       {/* Marks Section */}
//       <aside className="marks-section">
//         <h2 className="marks-title">Marks (0-10)</h2>
//         <div className="marks-grid">
//           {[...Array(11)].map((_, mark) => (
//             <button
//               key={mark}
//               onClick={() => handleMarkSelection(mark)}
//               className={`mark-button ${
//                 marks[selectedQuestion] === mark ? "mark-button-selected" : ""
//               }`}
//               aria-label={`Mark ${mark}`}
//             >
//               {mark}
//             </button>
//           ))}
//         </div>
//       </aside>

//       {/* Answer Sheet Section */}
//       <main className="answer-sheet-section">
//         <div className="answer-sheet-header">
//           <h2 className="answer-sheet-title">Answer Sheet: {id}</h2>
//           <div className="time-display">Time: {timeTaken}</div>
//         </div>
//         <div className="answer-sheet-pdf-container">
//           <embed
//             src={`/answer-sheets/${id}.pdf`}
//             type="application/pdf"
//             className="answer-sheet-pdf"
//           />
//         </div>
//       </main>

//       {/* Questions Section */}
//       <aside className="questions-section">
//         <div className="questions-header">
//           <h2 className="questions-title">Questions</h2>
//           <button
//             onClick={() => setIsFullScreenPdf(!isFullScreenPdf)}
//             className="fullscreen-button"
//           >
//             {isFullScreenPdf ? "Exit Full Screen" : "Full Screen"}
//           </button>
//         </div>

//         <div className="questions-list">
//           {[1, 2, 3, 4, 5, 6, 7, 8].map((q) => (
//             <div key={q} className="question-item">
//               <div
//                 className="question-header"
//                 onClick={() => toggleQuestionExpand(q)}
//               >
//                 <h3 className="question-title">
//                   <span>Question {q}</span>
//                   <span className="question-marks">
//                     {getQuestionTotalMarks(String(q))} Marks
//                   </span>
//                 </h3>
//               </div>
//               {expandedQuestions[q] !== false && (
//                 <div className="sub-questions">
//                   <div className="sub-questions-grid">
//                     {["a", "b", "c"].map((subQ) => (
//                       <div key={`${q}${subQ}`} className="sub-question-item">
//                         <button
//                           key={`${q}${subQ}`}
//                           onClick={() => setSelectedQuestion(`${q}${subQ}`)}
//                           className={`sub-question-button ${
//                             selectedQuestion === `${q}${subQ}`
//                               ? "sub-question-button-selected"
//                               : isQuestionMarked(`${q}${subQ}`)
//                               ? "sub-question-button-marked"
//                               : ""
//                           }`}
//                         >
//                           {q}
//                           {subQ}
//                         </button>
//                         <div className="sub-question-marks">
//                           {getSubQuestionMarks(`${q}${subQ}`)}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="submission-section">
//           <div className="roll-number-input">
//             <label htmlFor="rollNumber" className="roll-number-label">
//               Student Roll Number (5 Digits)
//             </label>
//             <input
//               type="text"
//               id="rollNumber"
//               className={`roll-number-field ${
//                 rollNumberError ? "roll-number-error" : ""
//               }`}
//               placeholder="Enter 5-Digit Roll Number"
//               value={rollNumber}
//               onChange={handleRollNumberChange}
//               maxLength="5"
//             />
//             {rollNumberError && (
//               <p className="roll-number-error-message">{rollNumberError}</p>
//             )}
//           </div>

//           <div>
//             <h2 className="total-marks-label">Total Marks</h2>
//             <div className="total-marks-value">
//               {Object.values(marks).reduce((sum, mark) => sum + mark, 0)}
//             </div>
//           </div>
//           <button
//             className={`submit-button ${
//               isSubmitDisabled ? "submit-button-disabled" : ""
//             }`}
//             onClick={handleSubmitEvaluation}
//             disabled={isSubmitDisabled}
//           >
//             Submit Evaluation
//           </button>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default Evaluation;


//----------------

import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../styles/Evaluation.css"; // Import the CSS file

const Evaluation = () => {
  const { id } = useParams();
  const location = useLocation();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [marks, setMarks] = useState({});
  const [startTime] = useState(Date.now());
  const [timeTaken, setTimeTaken] = useState("00:00:00");
  const [isFullScreenPdf, setIsFullScreenPdf] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [rollNumber, setRollNumber] = useState("");
  const [rollNumberError, setRollNumberError] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(""); // State to store the PDF URL

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(
        2,
        "0"
      );
      const seconds = String(elapsed % 60).padStart(2, "0");
      setTimeTaken(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    if (rollNumber.length === 5 && /^\d+$/.test(rollNumber)) {
      setRollNumberError("");
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [rollNumber]);

  // Fetch PDF URL from location state
  useEffect(() => {
    if (location.state && location.state.pdfUrl) {
      setPdfUrl(location.state.pdfUrl);
    } else {
      console.error("PDF URL not found in location state");
      // Optionally, set a default PDF or display an error message
      // setPdfUrl("/default-pdf.pdf");
    }
  }, [location.state]);

  const handleMarkSelection = (mark) => {
    if (selectedQuestion !== null) {
      setMarks((prev) => ({ ...prev, [selectedQuestion]: mark }));
    }
  };

  const getQuestionTotalMarks = (questionNumber) => {
    let total = 0;
    for (const key in marks) {
      if (key.startsWith(questionNumber)) {
        total += marks[key];
      }
    }
    return total;
  };

  const getSubQuestionMarks = (questionKey) => {
    return marks[questionKey] || 0;
  };

  const isQuestionMarked = (questionKey) => {
    return marks.hasOwnProperty(questionKey);
  };

  const toggleQuestionExpand = (questionNumber) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionNumber]: !prev[questionNumber],
    }));
  };

  const handleRollNumberChange = (e) => {
    const value = e.target.value;
    setRollNumber(value);
    if (value.length > 5 || !/^\d*$/.test(value)) {
      setRollNumberError("Roll number must be exactly 5 digits.");
    } else if (value.length < 5 && value.length > 0 && /^\d+$/.test(value)) {
      setRollNumberError("Roll number must be exactly 5 digits.");
    } else {
      setRollNumberError("");
    }
  };

  const handleSubmitEvaluation = () => {
    if (isSubmitDisabled) {
      alert("Please enter a valid 5-digit Roll Number before submitting.");
      return;
    }
    if (rollNumberError) {
      alert("Please correct the Roll Number error before submitting.");
      return;
    }
    alert(
      `Evaluation Submitted for Roll Number: ${rollNumber}! Marks data: ${JSON.stringify(
        marks
      )}`
    );
    console.log("Marks data:", marks);
    console.log("Roll Number:", rollNumber);
  };

  return (
    <div className="evaluation-container">
      {/* Marks Section */}
      <aside className="marks-section">
        <h2 className="marks-title">Marks (0-10)</h2>
        <div className="marks-grid">
          {[...Array(11)].map((_, mark) => (
            <button
              key={mark}
              onClick={() => handleMarkSelection(mark)}
              className={`mark-button ${
                marks[selectedQuestion] === mark ? "mark-button-selected" : ""
              }`}
              aria-label={`Mark ${mark}`}
            >
              {mark}
            </button>
          ))}
        </div>
      </aside>

      {/* Answer Sheet Section */}
      <main className="answer-sheet-section">
        <div className="answer-sheet-header">
          <h2 className="answer-sheet-title">Answer Sheet: {id}</h2>
          <div className="time-display">Time: {timeTaken}</div>
        </div>
        <div className="answer-sheet-pdf-container">
          {pdfUrl ? (
            <embed
              src={pdfUrl}
              type="application/pdf"
              className="answer-sheet-pdf"
            />
          ) : (
            <div>Loading PDF...</div>
          )}
        </div>
      </main>

      {/* Questions Section */}
      <aside className="questions-section">
        <div className="questions-header">
          <h2 className="questions-title">Questions</h2>
          <button
            onClick={() => setIsFullScreenPdf(!isFullScreenPdf)}
            className="fullscreen-button"
          >
            {isFullScreenPdf ? "Exit Full Screen" : "Full Screen"}
          </button>
        </div>

        {/* Questions List */}
        {/* Submission Section */}
      </aside>
    </div>
  );
};

export default Evaluation;