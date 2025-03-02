//----------------------------
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "../styles/AfterEvaluatorLogin.css"; // Make sure this path is correct

// const AfterEvaluatorLogin = () => {
//     const [division, setDivision] = useState("");
//     const [subject, setSubject] = useState("");
//     const [pdfs, setPdfs] = useState([]);
//     const [error, setError] = useState("");
//     const [selectedPdf, setSelectedPdf] = useState(null);
//     const [pdfLoadingError, setPdfLoadingError] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const evaluatorName = location.state?.evaluatorName || "Evaluator";
//     // **IMPORTANT:  Replace with your actual Cloudinary cloud name if it's different!**
//     const CLOUDINARY_CLOUD_NAME = "dybikmq0t"; // Assuming this is still your cloud name

//     const handleSearch = async () => {
//         if (!subject || !division) {
//             alert("Please select both subject and division.");
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:7000/get-pdfs", {
//                 evaluatorName,
//                 subject,
//                 division,
//             });

//             if (response.status === 404) {
//                 setError(response.data.message);
//                 setPdfs([]);
//                 return;
//             }
//             setPdfs(response.data);
//             setError("");

//             // Console log the fetched PDF URLs (or filenames) for debugging
//             console.log("Fetched PDF Data from Backend:", response.data); // Log the raw response

//         } catch (error) {
//             setError(error.response?.data?.message || "Error fetching PDFs");
//             setPdfs([]);
//         }
//     };

//     const goToEvaluation = () => {
//         if (pdfs.length > 0) {
//             localStorage.setItem('evaluatorName', evaluatorName);
//             localStorage.setItem('subject', subject);
//             localStorage.setItem('division', division);
//             localStorage.setItem('pdfs', JSON.stringify(pdfs));
//             navigate("/on-screen-evaluation");
//         } else {
//             alert("No PDFs to evaluate");
//         }
//     };

//     const extractFilename = (url) => {
//         try {
//             const urlParts = new URL(url).pathname.split('/');
//             return urlParts.pop();
//         } catch (error) {
//             console.error("Invalid URL", error);
//             return url;
//         }
//     };

//     const handlePdfClick = (pdfData) => { // Modified to accept pdfData (could be filename or object)
//         let pdfUrlToUse = "";

//         if (typeof pdfData === 'string') { // Assume backend returned just filename (String)
//             const filename = pdfData;
//             // **Construct Cloudinary URL from filename (TEMPORARY WORKAROUND)**
//             pdfUrlToUse = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload/pdfs/${filename}`;
//             console.log("Constructed Cloudinary URL from filename:", pdfUrlToUse); // Log constructed URL
//         } else if (typeof pdfData === 'object' && pdfData.pdfUrl) { // Assume backend returned object with pdfUrl
//             pdfUrlToUse = pdfData.pdfUrl; // Use the pdfUrl directly
//             console.log("Using pdfUrl from backend object:", pdfUrlToUse); // Log URL from backend object
//         } else {
//             console.error("Unexpected PDF data format:", pdfData);
//             alert("Error: Could not determine PDF URL.");
//             return;
//         }

//         setSelectedPdf(pdfUrlToUse);
//         setPdfLoadingError(false);
//     };


//     const handleClosePdf = () => {
//         setSelectedPdf(null);
//         setPdfLoadingError(false);
//     };

//     const handleIframeError = () => {
//         setPdfLoadingError(true);
//     };

//     return (
//         <div className="after-evaluator-login-container">
//             <h1 className="after-title">Welcome, {evaluatorName}</h1>
//             <div className="after-content">
//                 <label className="after-label">Select Division:</label>
//                 <select className="after-dropdown" value={division} onChange={(e) => setDivision(e.target.value)}>
//                     <option value="">-- Select Division --</option>
//                     {["A", "B", "C"].map((div) => (<option key={div} value={div}>{div}</option>))}
//                 </select>

//                 <label className="after-label">Select Subject:</label>
//                 <select className="after-dropdown" value={subject} onChange={(e) => setSubject(e.target.value)}>
//                     <option value="">-- Select Subject --</option>
//                     {["Mathematics", "Science", "English"].map((sub) => (<option key={sub} value={sub}>{sub}</option>))}
//                 </select>

//                 <button className="after-button search-btn" onClick={handleSearch}>Search</button>

//                 {error && <p className="error-message">{error}</p>}

//                 {pdfs.length > 0 && (
//                     <div className="pdf-list">
//                         <h3>Available PDFs:</h3>
//                         <ul>
//                             {pdfs.map((pdf, index) => { // Added index here for key if needed in future
//                                 const pdfDisplayName = typeof pdf === 'string' ? pdf : extractFilename(pdf.pdfUrl || "unknown.pdf"); // Handle filename or URL
//                                 return (
//                                     <li key={index}> {/* Use index as key for now, but ideally use _id if available from backend */}
//                                         <span
//                                             className="pdf-link"
//                                             onClick={() => handlePdfClick(pdf)} // Pass the pdf data (filename or object)
//                                         >
//                                             {pdfDisplayName}
//                                         </span>
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                         <button className="after-button" onClick={goToEvaluation}>Go to Evaluation</button>
//                     </div>
//                 )}

//                 {selectedPdf && (
//                     <div className="pdf-viewer-modal">
//                         <div className="pdf-viewer-content">
//                             <button className="close-button" onClick={handleClosePdf}>×</button>
//                             {pdfLoadingError ? (
//                                 <div className="pdf-error-message">
//                                     <p>Error</p>
//                                     <p>Failed to load PDF document.</p>
//                                 </div>
//                             ) : (
//                                 <>
//                                     {console.log("PDF URL being passed to iframe:", selectedPdf)}
//                                     <iframe
//                                         src={selectedPdf}
//                                         width="100%"
//                                         height="100%"
//                                         title="PDF Viewer"
//                                         onError={handleIframeError}
//                                     ></iframe>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AfterEvaluatorLogin;
//------------------------------

//-------------------------------
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/AfterEvaluatorLogin.css";

const AfterEvaluatorLogin = () => {
    const [division, setDivision] = useState("");
    const [subject, setSubject] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const evaluatorName = location.state?.evaluatorName || "Evaluator";

    const handleProceedToEvaluation = () => {
        if (!subject || !division) {
            alert("Please select both subject and division.");
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
        <div className="after-evaluator-login-container">
            <h1 className="after-title">Welcome, {evaluatorName}</h1>
            <div className="after-content">
                <label className="after-label">Select Division:</label>
                <select className="after-dropdown" value={division} onChange={(e) => setDivision(e.target.value)}>
                    <option value="">-- Select Division --</option>
                    {["A", "B", "C"].map((div) => (<option key={div} value={div}>{div}</option>))}
                </select>

                <label className="after-label">Select Subject:</label>
                <select className="after-dropdown" value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option value="">-- Select Subject --</option>
                    {["Mathematics", "Science", "English"].map((sub) => (<option key={sub} value={sub}>{sub}</option>))}
                </select>

                <button className="after-button proceed-btn" onClick={handleProceedToEvaluation}>Proceed to Evaluation</button>

                {error && <p className="error-message">{error}</p>}


            </div>
        </div>
    );
};

export default AfterEvaluatorLogin;
//-------------------------------