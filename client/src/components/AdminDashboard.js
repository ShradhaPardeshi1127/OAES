// import React, { useState } from "react";
// import "../styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [selectedTeachers, setSelectedTeachers] = useState(""); // Changed to a string for single selection
//   const [subject, setSubject] = useState("");
//   const [division, setDivision] = useState("");
//   const [pdfUrl, setPdfUrl] = useState("");

//   const teachersList = ["Evaluator1", "Evaluator2", "Evaluator3"]; // Dynamic from backend

//   const handleTeacherSelect = (teacher) => {
//     console.log("Selected Teacher:", teacher);
//     setSelectedTeachers(teacher); // Set the selected teacher directly
//   };

//   const openUploadWidget = () => {
//     window.cloudinary.openUploadWidget(
//       {
//         cloudName: "dybikmq0t",
//         uploadPreset: "pdf_upload_v2",
//         multiple: true, // Ensures only one file at a time  <- REMOVE THIS
//         resourceType: "raw", //  Force 'raw' for PDFs
//         allowedFormats: ["pdf"],
//       },
//       (error, result) => {
//         if (!error && result.event === "success") {
//           // No need for URL modification.  Cloudinary handles this with resource_type: 'raw'
//           let pdfUrl = result.info.secure_url;

//           console.log("Cloudinary Upload Response:", result.info);

//           setPdfUrl(pdfUrl); // Use secure_url directly
//           console.log("PDF URL:", pdfUrl);
//         } else if (error) {
//           console.error("Upload Error:", error);
//         }
//       }
//     );
//   };

//   const handleUpload = async () => {
//     console.log("Selected Teacher Before Sending Request:", selectedTeachers);
//     console.log("Subject:", subject);
//     console.log("Division:", division);
//     console.log("PDF URL Before Sending Request:", pdfUrl);

//     if (!pdfUrl || !subject || !division || !selectedTeachers) {
//       alert("Please select all fields before uploading.");
//       return;
//     }

//     // NO URL FORMATTING NEEDED

//     try {
//       const response = await fetch(
//         "http://localhost:7000/assign-pdf-to-evaluator",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             evaluatorName: selectedTeachers,
//             subject,
//             division,
//             pdfUrl, // Send the correct URL directly
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message); // Success message
//       } else {
//         alert(data.error || "Something went wrong");
//       }
//     } catch (error) {
//       alert("Error: " + error.message);
//       console.error("Upload Error:", error);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1 className="admin-title">Admin Dashboard</h1>
//       <div className="admin-content">
//         {/* Subject Selection */}
//         <select
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           className="admin-dropdown"
//         >
//           <option value="">Select Subject</option>
//           <option value="Mathematics">Mathematics</option>
//           <option value="Science">Science</option>
//         </select>

//         {/* Division Selection */}
//         <select
//           value={division}
//           onChange={(e) => setDivision(e.target.value)}
//           className="admin-dropdown"
//         >
//           <option value="">Select Division</option>
//           <option value="A">A</option>
//           <option value="B">B</option>
//         </select>

//         {/* Teacher Selection */}
//         <div className="teacher-list">
//           <label className="teacher-label">Select Teachers:</label>
//           {teachersList.map((teacher) => (
//             <div key={teacher} className="teacher-item">
//               <input
//                 type="radio"
//                 checked={selectedTeachers === teacher} // Use strict equality (===)
//                 onChange={() => handleTeacherSelect(teacher)}
//               />
//               <span>{teacher}</span>
//             </div>
//           ))}
//         </div>

//         {/* Upload PDF Button */}
//         <button onClick={openUploadWidget} className="admin-button upload-btn">
//           Upload PDF
//         </button>

//         {/* Submit Button */}
//         <button onClick={handleUpload} className="admin-button submit-btn">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
//---------------------------------------------------secure url
// import React, { useState } from "react";
// import "../styles/AdminDashboard.css";
// import "./AfterEvaluatorLogin"

// const AdminDashboard = () => {
//   const [selectedTeacher, setSelectedTeacher] = useState(""); // Single teacher selection
//   const [subject, setSubject] = useState("");
//   const [division, setDivision] = useState("");
//   const [pdfs, setPdfs] = useState([]); // Array to store multiple PDF objects

//   const teachersList = ["Evaluator1", "Evaluator2", "Evaluator3"];

//   const handleTeacherSelect = (teacher) => {
//     setSelectedTeacher(teacher);
//   };

//   const openUploadWidget = () => {
//     window.cloudinary.openUploadWidget(
//       {
//         cloudName: "dybikmq0t",
//         uploadPreset: "pdf_upload_v2",
        
// //  cloudName: " dfziqsewl",
// //         uploadPreset: "RUSHI BOI",
//         multiple: true, // Allow multiple file selection
//         resourceType: "raw",
//         allowedFormats: ["pdf"],
//       },
//       (error, result) => {
//         if (!error && result.event === "success") {
//           console.log("Cloudinary Upload Response:", result.info);

//           // Create a new PDF object
//           const newPdf = {
//             subject: subject, // Use the currently selected subject
//             division: division, // Use the currently selected division
//             pdfUrl: result.info.secure_url,
//             uploadedAt: new Date(), // Capture the upload time
//           };

//           // Add the new PDF object to the pdfs array
//           setPdfs((prevPdfs) => [...prevPdfs, newPdf]);

//           // Optionally, clear subject/division after upload *if* that's your desired behavior
//           // setSubject("");
//           // setDivision("");

//         } else if (error) {
//           console.error("Upload Error:", error);
//         }
//       }
//     );
//   };

//   const handleUpload = async () => {
//     if (!selectedTeacher || pdfs.length === 0) {
//       alert("Please select a teacher and upload at least one PDF.");
//       return;
//     }
//     // Validate that all PDFs have subject and division.  Critical!
//     for (const pdf of pdfs) {
//         if (!pdf.subject || !pdf.division) {
//             alert("Please select a subject and division for all PDFs.");
//             return; // Stop the upload
//         }
//     }


//     try {
//       const response = await fetch(
//         "http://localhost:7000/assign-pdf-to-evaluator",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             evaluatorName: selectedTeacher,
//             pdfs: pdfs, // Send the array of PDF objects
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//         // Clear the state after successful upload
//         setPdfs([]);
//         setSelectedTeacher("");
//         setSubject("");  //Consider clearing only if uploadWidget is not resetting these.
//         setDivision(""); //Consider clearing only if uploadWidget is not resetting these.

//       } else {
//         alert(data.error || "Something went wrong");
//       }
//     } catch (error) {
//       alert("Error: " + error.message);
//       console.error("Upload Error:", error);
//     }
//   };

//   // Function to remove a PDF from the list
//     const removePdf = (index) => {
//         setPdfs(prevPdfs => prevPdfs.filter((_, i) => i !== index));
//     };


//   return (
//     <div className="admin-dashboard">
//       <h1 className="admin-title">Admin Dashboard</h1>
//       <div className="admin-content">
//         {/* Subject Selection */}
//         <select
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           className="admin-dropdown"
//         >
//           <option value="">Select Subject</option>
//           <option value="Mathematics">Mathematics</option>
//           <option value="Science">Science</option>
//           {/* Add more subjects as needed */}
//         </select>

//         {/* Division Selection */}
//         <select
//           value={division}
//           onChange={(e) => setDivision(e.target.value)}
//           className="admin-dropdown"
//         >
//           <option value="">Select Division</option>
//           <option value="A">A</option>
//           <option value="B">B</option>
//           {/* Add more divisions as needed */}
//         </select>

//         {/* Teacher Selection */}
//         <div className="teacher-list">
//           <label className="teacher-label">Select Teacher:</label>
//           {teachersList.map((teacher) => (
//             <div key={teacher} className="teacher-item">
//               <input
//                 type="radio"
//                 checked={selectedTeacher === teacher}
//                 onChange={() => handleTeacherSelect(teacher)}
//               />
//               <span>{teacher}</span>
//             </div>
//           ))}
//         </div>

//         {/* Upload PDF Button */}
//         <button onClick={openUploadWidget} className="admin-button upload-btn">
//           Upload PDFs
//         </button>

//         {/* Display Uploaded PDFs */}
//         {pdfs.length > 0 && (
//           <div className="uploaded-pdfs">
//             <h3>Uploaded PDFs:</h3>
//             <ul>
//               {pdfs.map((pdf, index) => (
//                 <li key={index}>
//                   Subject: {pdf.subject}, Division: {pdf.division}, URL:{" "}
//                   <a href={pdf.pdfUrl} target="_blank" rel="noopener noreferrer">
//                     View PDF
//                   </a>
//                    <button onClick={() => removePdf(index)}>Remove</button>
//                 </li>

//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Submit Button */}
//         <button onClick={handleUpload} className="admin-button submit-btn">
//           Submit All PDFs
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
//--------------------------------------------secured url code above

import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import "./AfterEvaluatorLogin"

const AdminDashboard = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(""); // Single teacher selection
  const [subject, setSubject] = useState("");
  const [division, setDivision] = useState("");
  const [pdfs, setPdfs] = useState([]); // Array to store multiple PDF objects

  const teachersList = ["Evaluator1", "Evaluator2", "Evaluator3"];

  const handleTeacherSelect = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const openUploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dybikmq0t",
        uploadPreset: "pdf_upload_v2",
        
//  cloudName: " dfziqsewl",
//         uploadPreset: "RUSHI BOI",
        multiple: true, // Allow multiple file selection
        resourceType: "raw",
        allowedFormats: ["pdf"],
      },
      (error, result) => {
        if (!error && result.event === "success") {
          console.log("Cloudinary Upload Response:", result.info);

          // Create a new PDF object
          const newPdf = {
            subject: subject, // Use the currently selected subject
            division: division, // Use the currently selected division
            pdfUrl: result.info.secure_url,
            uploadedAt: new Date(), // Capture the upload time
          };

          // Add the new PDF object to the pdfs array
          setPdfs((prevPdfs) => [...prevPdfs, newPdf]);

          // Optionally, clear subject/division after upload *if* that's your desired behavior
          // setSubject("");
          // setDivision("");

        } else if (error) {
          console.error("Upload Error:", error);
        }
      }
    );
  };

  const handleUpload = async () => {
    if (!selectedTeacher || pdfs.length === 0) {
      alert("Please select a teacher and upload at least one PDF.");
      return;
    }
    // Validate that all PDFs have subject and division.  Critical!
    for (const pdf of pdfs) {
        if (!pdf.subject || !pdf.division) {
            alert("Please select a subject and division for all PDFs.");
            return; // Stop the upload
        }
    }


    try {
      const response = await fetch(
        "http://localhost:7000/assign-pdf-to-evaluator",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            evaluatorName: selectedTeacher,
            pdfs: pdfs, // Send the array of PDF objects
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Clear the state after successful upload
        setPdfs([]);
        setSelectedTeacher("");
        setSubject("");  //Consider clearing only if uploadWidget is not resetting these.
        setDivision(""); //Consider clearing only if uploadWidget is not resetting these.

      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      alert("Error: " + error.message);
      console.error("Upload Error:", error);
    }
  };

  // Function to remove a PDF from the list
    const removePdf = (index) => {
        setPdfs(prevPdfs => prevPdfs.filter((_, i) => i !== index));
    };


  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="admin-content">
        {/* Subject Selection */}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="admin-dropdown"
        >
          <option value="">Select Subject</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          {/* Add more subjects as needed */}
        </select>

        {/* Division Selection */}
        <select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="admin-dropdown"
        >
          <option value="">Select Division</option>
          <option value="A">A</option>
          <option value="B">B</option>
          {/* Add more divisions as needed */}
        </select>

        {/* Teacher Selection */}
        <div className="teacher-list">
          <label className="teacher-label">Select Teacher:</label>
          {teachersList.map((teacher) => (
            <div key={teacher} className="teacher-item">
              <input
                type="radio"
                checked={selectedTeacher === teacher}
                onChange={() => handleTeacherSelect(teacher)}
              />
              <span>{teacher}</span>
            </div>
          ))}
        </div>

        {/* Upload PDF Button */}
        <button onClick={openUploadWidget} className="admin-button upload-btn">
          Upload PDFs
        </button>

        {/* Display Uploaded PDFs */}
        {pdfs.length > 0 && (
          <div className="uploaded-pdfs">
            <h3>Uploaded PDFs:</h3>
            <ul>
              {pdfs.map((pdf, index) => (
                <li key={index}>
                  Subject: {pdf.subject}, Division: {pdf.division}, URL:{" "}
                  <a href={pdf.pdfUrl} target="_blank" rel="noopener noreferrer">
                    View PDF
                  </a>
                   <button onClick={() => removePdf(index)}>Remove</button>
                </li>

              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <button onClick={handleUpload} className="admin-button submit-btn">
          Submit All PDFs
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;