// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../styles/OnScreenEvaluation.css";

// const OnScreenEvaluation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { subject, division, evaluatorName } = location.state || {};
//   const [pdfs, setPdfs] = useState([]);

//   useEffect(() => {
//     // Fetch evaluator's assigned PDFs based on the evaluatorName
//     // Example: Assuming you have an API to fetch assigned PDFs for a specific evaluator
//     const fetchAssignedPdfs = async () => {
//       try {
//         const response = await fetch(
//           `/api/evaluators/${evaluatorName}/assignedPdfs`
//         );
//         const data = await response.json();
//         const filteredPdfs = data.filter(
//           (pdf) => pdf.subject === subject && pdf.division === division
//         );
//         setPdfs(filteredPdfs);
//       } catch (error) {
//         console.error("Error fetching PDFs:", error);
//       }
//     };

//     fetchAssignedPdfs();
//   }, [evaluatorName, subject, division]);

//   return (
//     <div className="evaluation-container">
//       <h1>On-Screen Evaluation</h1>
//       <div className="cards-container">
//         <div className="paper-card">
//           <h2>{subject}</h2>
//           <p>
//             <strong>Division:</strong> {division}
//           </p>
//           <p>
//             <strong>Uploaded:</strong> {pdfs.length}
//           </p>
//           <p>
//             <strong>Checked:</strong> {pdfs.filter((p) => p.checked).length}
//           </p>
//           <p>
//             <strong>Remaining:</strong> {pdfs.filter((p) => !p.checked).length}
//           </p>
//           <button
//             className="check-paper-btn"
//             onClick={() =>
//               navigate("/answer-sheet-table", { state: { subject } })
//             }
//           >
//             Check Paper
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnScreenEvaluation;


//----------------------------------------
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OnScreenEvaluation.css";
import axios from 'axios';

const OnScreenEvaluation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { evaluatorName, subject, division } = location.state || {}; // Get values from location.state
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignedPdfs = async () => {
            setLoading(true);
            setError(null);
            try {
                // Removed hardcoded API and used the passed evaluatorName, subject and division
                const response = await axios.get(`http://localhost:7000/evaluators/${evaluatorName}/assignedPdfs?subject=${subject}&division=${division}`);

                setPdfs(response.data);
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
        navigate("/answer-sheet-table", {
            state: {
                subject,
                pdfs // Pass the fetched PDFs
            }
        });
    };

    return (
        <div className="evaluation-container">
            <h1>On-Screen Evaluation</h1>
            <div className="cards-container">
                <div className="paper-card">
                    <h2>{subject}</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p className="error-message">Error: {error}</p>}
                    <p>
                        <strong>Division:</strong> {division}
                    </p>
                    <p>
                        <strong>Uploaded:</strong> {pdfs.length}
                    </p>
                    <p>
                        <strong>Checked:</strong> {pdfs.filter((p) => p.checked).length}
                    </p>
                    <p>
                        <strong>Remaining:</strong> {pdfs.filter((p) => !p.checked).length}
                    </p>
                    <button
                        className="check-paper-btn"
                        onClick={navigateToAnswerSheet}
                        disabled={loading || error}
                    >
                        Check Paper
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnScreenEvaluation;
