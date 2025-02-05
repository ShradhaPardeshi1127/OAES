import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PdfViewer = ({ evaluatorName }) => {
  const [pdfs, setPdfs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `http://localhost:5000/get-evaluator-pdfs?evaluatorName=${evaluatorName}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.assignedPdfs) {
          setPdfs(data.assignedPdfs);
        } else {
          alert("No PDFs found.");
        }
      })
      .catch((err) => console.error(err));
  }, [evaluatorName]);

  const handleViewPDF = (pdfUrl) => {
    navigate(`/pdf-viewer?url=${encodeURIComponent(pdfUrl)}`);
  };

  return (
    <div>
      <h1>Assigned PDFs</h1>
      <ul>
        {pdfs.map((pdf, index) => (
          <li key={index}>
            <button onClick={() => handleViewPDF(pdf.pdfUrl)}>View PDF</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PdfViewer;
