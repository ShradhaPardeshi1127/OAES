


//-----------
// // maonnnnnn woekingggg one eeeeee
// import React, { useState, useEffect } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";

// const Evaluation = () => {
//     const { sequentialId } = useParams(); // sequentialId will be the index
//     const location = useLocation();
//     const navigate = useNavigate();
//     const {
//         pdfUrl,
//         isChecked: tableIsChecked,
//         evaluatorName,
//         pdfId: locationPdfId,
//     } = location.state || {};
//     const [selectedQuestion, setSelectedQuestion] = useState(null);
//     const [marks, setMarks] = useState({});
//     const [startTime] = useState(Date.now());
//     const [timeTaken, setTimeTaken] = useState("00:00:00");
//     const [isFullScreenPdf, setIsFullScreenPdf] = useState(false);
//     const [expandedQuestions, setExpandedQuestions] = useState({});
//     const [rollNumber, setRollNumber] = useState("");
//     const [rollNumberError, setRollNumberError] = useState("");
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//     const [isReviewMode, setIsReviewMode] = useState(tableIsChecked || false);

//     useEffect(() => {
//         setIsReviewMode(tableIsChecked || false);
//     }, [tableIsChecked]);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             const elapsed = Math.floor((Date.now() - startTime) / 1000);
//             const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
//             const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
//             const seconds = String(elapsed % 60).padStart(2, "0");
//             setTimeTaken(`${hours}:${minutes}:${seconds}`);
//         }, 1000);
//         return () => clearInterval(timer);
//     }, [startTime]);

//     useEffect(() => {
//         if (rollNumber.length === 5 && /^\d+$/.test(rollNumber)) {
//             setRollNumberError("");
//             setIsSubmitDisabled(false);
//         } else {
//             setIsSubmitDisabled(true);
//         }
//     }, [rollNumber]);

//     const handleMarkSelection = (mark) => {
//         if (isReviewMode) return;
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
//         setExpandedQuestions((prev) => ({
//             ...prev,
//             [questionNumber]: !prev[questionNumber],
//         }));
//     };

//     const handleRollNumberChange = (e) => {
//         if (isReviewMode) return;
//         const value = e.target.value;
//         setRollNumber(value);
//         if (value.length > 5 || !/^\d*$/.test(value)) {
//             setRollNumberError("Roll number must be exactly 5 digits.");
//         } else if (value.length < 5 && value.length > 0 && /^\d+$/.test(value)) {
//             setRollNumberError("Roll number must be exactly 5 digits.");
//         } else {
//             setRollNumberError("");
//         }
//     };

//     const handleSubmitEvaluation = async () => {
//         if (isReviewMode) {
//             alert("This sheet is in review mode and cannot be submitted.");
//             return;
//         }
//         if (isSubmitDisabled) {
//             alert("Please enter a valid 5-digit Roll Number before submitting.");
//             return;
//         }
//         if (rollNumberError) {
//             alert("Please correct the Roll Number error before submitting.");
//             return;
//         }

//         const updatedData = {
//             index: parseInt(sequentialId), // Pass index back as 'index'
//             marks: marks,
//             rollNumber: rollNumber,
//             checked: true,
//         };

//         alert("Evaluation Submitted and Table will be Updated (Frontend Display Only)");
//         navigate(-1, { state: { submittedData: updatedData } }); // Pass updatedData in state
//     };

//     return (
//         <div
//             className={`min-h-screen bg-gray-50 p-4 ${isFullScreenPdf ? "fullscreen-pdf" : ""
//                 } grid grid-cols-1 md:grid-cols-[240px_1fr_360px] gap-4`}
//         >
//             {/* ... rest of Evaluation.js UI code (same as before) ... */}
//             <aside className="bg-white rounded-lg shadow-md p-4 sticky top-4 h-fit">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-800">
//                     Marks (0-10)
//                 </h2>
//                 <div className="grid grid-cols-3 gap-2">
//                     {[...Array(11)].map((_, mark) => (
//                         <button
//                             key={mark}
//                             onClick={() => handleMarkSelection(mark)}
//                             disabled={isReviewMode}
//                             className={`p-2 rounded text-sm transition-colors duration-300 ease-in-out ${marks[selectedQuestion] === mark
//                                 ? "bg-blue-600 text-white"
//                                 : "bg-blue-50 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                                 } ${isReviewMode ? "cursor-not-allowed opacity-50" : ""}`}
//                             aria-label={`Mark ${mark}`}
//                         >
//                             {mark}
//                         </button>
//                     ))}
//                 </div>
//             </aside>

//             <main className="bg-white rounded-lg shadow-md flex-1 overflow-auto flex flex-col">
//                 <div className="p-4 border-b flex justify-between items-center">
//                     <h2 className="text-xl font-semibold text-gray-800">
//                         Answer Sheet: {sequentialId}
//                     </h2>
//                     <div className="text-gray-600 font-medium">Time: {timeTaken}</div>
//                 </div>
//                 {isReviewMode && (
//                     <div
//                         className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
//                         role="alert"
//                     >
//                         <p className="font-bold">Review Mode</p>
//                         <p>
//                             This answer sheet is in view-only mode. Marks and Roll Number
//                             cannot be edited.
//                         </p>
//                     </div>
//                 )}
//                 <div className="flex-grow">
//                     {pdfUrl ? (
//                         <embed
//                             src={pdfUrl}
//                             type="application/pdf"
//                             className="w-full h-full"
//                         />
//                     ) : (
//                         <div>Loading PDF...</div>
//                     )}
//                 </div>
//             </main>

//             <aside className="bg-white rounded-lg shadow-md p-4 h-fit">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
//                     <button
//                         onClick={() => setIsFullScreenPdf(!isFullScreenPdf)}
//                         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition-colors duration-300 ease-in-out"
//                     >
//                         {isFullScreenPdf ? "Exit Full Screen" : "Full Screen"}
//                     </button>
//                 </div>

//                 <div className="space-y-3 max-h-[70vh] overflow-y-auto">
//                     {[1, 2, 3, 4, 5, 6, 7, 8].map((q) => (
//                         <div
//                             key={q}
//                             className="border-b pb-3 bg-gray-50 rounded-md shadow-sm"
//                         >
//                             <div
//                                 className="px-4 py-2 cursor-pointer"
//                                 onClick={() => toggleQuestionExpand(q)}
//                             >
//                                 <h3 className="font-medium mb-2 text-sm flex justify-between items-center">
//                                     <span>Question {q}</span>
//                                     <span className="font-semibold text-gray-700">
//                                         {getQuestionTotalMarks(String(q))} Marks
//                                     </span>
//                                 </h3>
//                             </div>
//                             {expandedQuestions[q] !== false && (
//                                 <div className="px-4">
//                                     <div className="grid grid-cols-1 gap-2">
//                                         {["a", "b", "c"].map((subQ) => (
//                                             <div
//                                                 key={`${q}${subQ}`}
//                                                 className="grid grid-cols-[1fr_50px] gap-2 items-center"
//                                             >
//                                                 <button
//                                                     key={`${q}${subQ}`}
//                                                     onClick={() => setSelectedQuestion(`${q}${subQ}`)}
//                                                     disabled={isReviewMode}
//                                                     className={`p-2 text-xs rounded text-center flex items-center justify-center transition-colors duration-300 ease-in-out ${selectedQuestion === `${q}${subQ}`
//                                                         ? "bg-blue-600 text-white"
//                                                         : isQuestionMarked(`${q}${subQ}`)
//                                                             ? "bg-green-200 hover:bg-green-300"
//                                                             : "bg-blue-50 hover:bg-blue-100"
//                                                         } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isReviewMode ? "cursor-not-allowed opacity-50" : ""
//                                                         }`}
//                                                 >
//                                                     {q}
//                                                     {subQ}
//                                                 </button>
//                                                 <div className="text-sm font-semibold text-gray-700 text-center bg-gray-100 py-2 rounded hover:bg-gray-200 focus:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-colors duration-300 ease-in-out">
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
//                     <div className="mb-2">
//                         <label
//                             htmlFor="rollNumber"
//                             className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                             Student Roll Number (5 Digits)
//                         </label>
//                         <input
//                             type="text"
//                             id="rollNumber"
//                             className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md transition-colors duration-300 ease-in-out ${rollNumberError ? "border-red-500" : ""
//                                 }`}
//                             placeholder="Enter 5-Digit Roll Number"
//                             value={rollNumber}
//                             onChange={handleRollNumberChange}
//                             maxLength="5"
//                             disabled={isReviewMode}
//                         />
//                         {rollNumberError && (
//                             <p className="mt-1 text-sm text-red-500">{rollNumberError}</p>
//                         )}
//                     </div>

//                     <div>
//                         <h2 className="text-lg font-semibold mb-2">Total Marks</h2>
//                         <div className="text-2xl font-bold text-blue-600">
//                             {Object.values(marks).reduce((sum, mark) => sum + mark, 0)}
//                         </div>
//                     </div>
//                     <button
//                         className={`px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out ${isSubmitDisabled || isReviewMode
//                             ? "opacity-50 cursor-not-allowed"
//                             : ""
//                             }`}
//                         onClick={handleSubmitEvaluation}
//                         disabled={isSubmitDisabled || isReviewMode}
//                     >
//                         Submit Evaluation
//                     </button>
//                 </div>
//             </aside>
//         </div>
//     );
// };

// export default Evaluation;

//-----------
// evaluation.js
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Evaluation = () => {
    const { sequentialId } = useParams(); // sequentialId will be the index
    console.log("Sequesntial ID: ", sequentialId)
    const location = useLocation();
    const navigate = useNavigate();
    const {
        pdfUrl,
        isChecked: tableIsChecked,
        evaluatorName,
        pdfId: locationPdfId,
        rollNumber: locationRollNumber,
        marks: locationMarks,
        checked: locationChecked,
        _id: answerSheetId // Assuming _id is passed for existing answer sheets
    } = location.state || {};

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [marks, setMarks] = useState(locationMarks || {}); // Initialize marks from location.state if available
    const [startTime] = useState(Date.now());
    const [timeTaken, setTimeTaken] = useState("00:00:00");
    const [isFullScreenPdf, setIsFullScreenPdf] = useState(false);
    const [expandedQuestions, setExpandedQuestions] = useState({});
    const [rollNumber, setRollNumber] = useState(locationRollNumber || ""); // Initialize rollNumber from location.state if available
    const [rollNumberError, setRollNumberError] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isReviewMode, setIsReviewMode] = useState(tableIsChecked || locationChecked || false); // Use locationChecked as well

    useEffect(() => {
        setIsReviewMode(tableIsChecked || locationChecked || false); // Update review mode based on both tableIsChecked and locationChecked
    }, [tableIsChecked, locationChecked]);

    useEffect(() => {
        const timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
            const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
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

    const handleMarkSelection = (mark) => {
        if (isReviewMode) return;
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
        if (isReviewMode) return;
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

    const handleSubmitEvaluation = async () => {
        if (isReviewMode) {
            alert("This sheet is in review mode and cannot be submitted.");
            return;
        }
        if (isSubmitDisabled) {
            alert("Please enter a valid 5-digit Roll Number before submitting.");
            return;
        }
        if (rollNumberError) {
            alert("Please correct the Roll Number error before submitting.");
            return;
        }

        try {
            console.log("Entered here 1")
            // const response = await fetch("/submit-evaluation", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         pdfId: locationPdfId,
            //         rollNumber: rollNumber,
            //         marks: marks,
            //     }),
            // });

            const response = await axios.post("http://localhost:7000/submit-evaluation", {
              pdfId: sequentialId,
              rollNumber: rollNumber,
              marks: marks,
          }, {
              headers: {
                  "Content-Type": "application/json",
              },
          });

            if (response.status === 200) {
              console.log("Here")
              console.log("Seuential id: ", sequentialId)
              console.log("Response: ", response.data)
                alert("Evaluation submitted successfully!");
                navigate(-1); // Go back to the answer sheets table
            } else {
                const errorData = await response.json();
                console.error("Submission failed:", errorData);
                alert(`Failed to submit evaluation. ${errorData.error || "Please try again."}`);
            }
        } catch (error) {
            console.error("Error submitting evaluation:", error);
            alert("Failed to submit evaluation. Please check your network and try again.");
        }
    };

    return (
        <div
            className={`min-h-screen bg-gray-50 p-4 ${isFullScreenPdf ? "fullscreen-pdf" : ""
                } grid grid-cols-1 md:grid-cols-[240px_1fr_360px] gap-4`}
        >
            {/* ... rest of Evaluation.js UI code (same as before) ... */}
            <aside className="bg-white rounded-lg shadow-md p-4 sticky top-4 h-fit">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Marks (0-10)
                </h2>
                <div className="grid grid-cols-3 gap-2">
                    {[...Array(11)].map((_, mark) => (
                        <button
                            key={mark}
                            onClick={() => handleMarkSelection(mark)}
                            disabled={isReviewMode}
                            className={`p-2 rounded text-sm transition-colors duration-300 ease-in-out ${marks[selectedQuestion] === mark
                                ? "bg-blue-600 text-white"
                                : "bg-blue-50 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                } ${isReviewMode ? "cursor-not-allowed opacity-50" : ""}`}
                            aria-label={`Mark ${mark}`}
                        >
                            {mark}
                        </button>
                    ))}
                </div>
            </aside>

            <main className="bg-white rounded-lg shadow-md flex-1 overflow-auto flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Answer Sheet: {sequentialId}
                    </h2>
                    <div className="text-gray-600 font-medium">Time: {timeTaken}</div>
                </div>
                {isReviewMode && (
                    <div
                        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
                        role="alert"
                    >
                        <p className="font-bold">Review Mode</p>
                        <p>
                            This answer sheet is in view-only mode. Marks and Roll Number
                            cannot be edited.
                        </p>
                    </div>
                )}
                <div className="flex-grow">
                    {pdfUrl ? (
                        <embed
                            src={pdfUrl}
                            type="application/pdf"
                            className="w-full h-full"
                        />
                    ) : (
                        <div>Loading PDF...</div>
                    )}
                </div>
            </main>

            <aside className="bg-white rounded-lg shadow-md p-4 h-fit">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
                    <button
                        onClick={() => setIsFullScreenPdf(!isFullScreenPdf)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition-colors duration-300 ease-in-out"
                    >
                        {isFullScreenPdf ? "Exit Full Screen" : "Full Screen"}
                    </button>
                </div>

                <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((q) => (
                        <div
                            key={q}
                            className="border-b pb-3 bg-gray-50 rounded-md shadow-sm"
                        >
                            <div
                                className="px-4 py-2 cursor-pointer"
                                onClick={() => toggleQuestionExpand(q)}
                            >
                                <h3 className="font-medium mb-2 text-sm flex justify-between items-center">
                                    <span>Question {q}</span>
                                    <span className="font-semibold text-gray-700">
                                        {getQuestionTotalMarks(String(q))} Marks
                                    </span>
                                </h3>
                            </div>
                            {expandedQuestions[q] !== false && (
                                <div className="px-4">
                                    <div className="grid grid-cols-1 gap-2">
                                        {["a", "b", "c"].map((subQ) => (
                                            <div
                                                key={`${q}${subQ}`}
                                                className="grid grid-cols-[1fr_50px] gap-2 items-center"
                                            >
                                                <button
                                                    key={`${q}${subQ}`}
                                                    onClick={() => setSelectedQuestion(`${q}${subQ}`)}
                                                    disabled={isReviewMode}
                                                    className={`p-2 text-xs rounded text-center flex items-center justify-center transition-colors duration-300 ease-in-out ${selectedQuestion === `${q}${subQ}`
                                                        ? "bg-blue-600 text-white"
                                                        : isQuestionMarked(`${q}${subQ}`)
                                                            ? "bg-green-200 hover:bg-green-300"
                                                            : "bg-blue-50 hover:bg-blue-100"
                                                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isReviewMode ? "cursor-not-allowed opacity-50" : ""
                                                        }`}
                                                >
                                                    {q}
                                                    {subQ}
                                                </button>
                                                <div className="text-sm font-semibold text-gray-700 text-center bg-gray-100 py-2 rounded hover:bg-gray-200 focus:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-colors duration-300 ease-in-out">
                                                    {getSubQuestionMarks(`${q}${subQ}`)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg flex flex-col space-y-4">
                    <div className="mb-2">
                        <label
                            htmlFor="rollNumber"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Student Roll Number (5 Digits)
                        </label>
                        <input
                            type="text"
                            id="rollNumber"
                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md transition-colors duration-300 ease-in-out ${rollNumberError ? "border-red-500" : ""
                                }`}
                            placeholder="Enter 5-Digit Roll Number"
                            value={rollNumber}
                            onChange={handleRollNumberChange}
                            maxLength="5"
                            disabled={isReviewMode}
                        />
                        {rollNumberError && (
                            <p className="mt-1 text-sm text-red-500">{rollNumberError}</p>
                        )}
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Total Marks</h2>
                        <div className="text-2xl font-bold text-blue-600">
                            {Object.values(marks).reduce((sum, mark) => sum + mark, 0)}
                        </div>
                    </div>
                    <button
                        className={`px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out ${isSubmitDisabled || isReviewMode
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                            }`}
                        onClick={handleSubmitEvaluation}
                        disabled={isSubmitDisabled || isReviewMode}
                    >
                        Submit Evaluation
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default Evaluation;



