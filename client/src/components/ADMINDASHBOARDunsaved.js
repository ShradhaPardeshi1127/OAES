// // import React, { useState } from "react";
// // import "../styles/AdminDashboard.css";

// // const subjects = {
// //   "Advanced Java Programming": ["Nilesh Shirude", "Upasne"],
// //   "PDC": ["Teacher A", "Teacher B"],
// //   "Cellular Network": ["Teacher C", "Teacher D"],
// //   "Project Mnagement": ["Teacher E", "Teacher F"]
// // };

// // const AdminDashboard = () => {
// //   const [selectedSubject, setSelectedSubject] = useState("");
// //   const [selectedTeacher, setSelectedTeacher] = useState("");
// //   const [selectedFiles, setSelectedFiles] = useState({});
// //   const [uploadMessage, setUploadMessage] = useState("");

// //   const handleSubjectChange = (e) => {
// //     setSelectedSubject(e.target.value);
// //     setSelectedTeacher("");
// //   };

// //   const handleTeacherChange = (e) => {
// //     setSelectedTeacher(e.target.value);
// //   };

// //   const handleFileChange = (e) => {
// //     setSelectedFiles({ ...selectedFiles, [selectedTeacher]: e.target.files[0] });
// //   };

// //   const handleUpload = async () => {
// //     if (!selectedTeacher) {
// //       alert("Please select a teacher before uploading.");
// //       return;
// //     }

// //     const file = selectedFiles[selectedTeacher];
// //     if (!file) {
// //       alert(`Please select a file before uploading for ${selectedTeacher}.`);
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("pdfFile", file);

// //     try {
// //       const response = await fetch("http://localhost:7000/upload-pdf", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setUploadMessage(`✅ PDF uploaded successfully: ${data.url}`);
// //       } else {
// //         console.error("Upload error:", data.error);
// //         setUploadMessage(`❌ Error: ${data.error}`);
// //       }
// //     } catch (err) {
// //       console.error("Error uploading PDF:", err);
// //       setUploadMessage("❌ Failed to upload PDF.");
// //     }
// //   };

// //   return (
// //     <div className="admin-dashboard">
// //       {/* Heading (Outside of White Box) */}
// //       <h1 className="dashboard-title">Admin Dashboard</h1>
// //       <p className="dashboard-subtitle">Manage Subject Assignments</p>

// //       {/* White Container */}
// //       <div className="dashboard-card">
// //         <div className="dropdown-container">
// //           <label>Select Subject:</label>
// //           <select value={selectedSubject} onChange={handleSubjectChange} className="dropdown">
// //             <option value="">-- Select Subject --</option>
// //             {Object.keys(subjects).map((subject, index) => (
// //               <option key={index} value={subject}>
// //                 {subject}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {selectedSubject && (
// //           <div className="dropdown-container">
// //             <label>Select Teacher:</label>
// //             <select value={selectedTeacher} onChange={handleTeacherChange} className="dropdown">
// //               <option value="">-- Select Teacher --</option>
// //               {subjects[selectedSubject].map((teacher, idx) => (
// //                 <option key={idx} value={teacher}>
// //                   {teacher}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //         )}

// //         {selectedTeacher && (
// //           <div className="upload-section">
// //             {/* <h3>Selected Teacher: {selectedTeacher}</h3> */}
// //             <input type="file" accept=".pdf" onChange={handleFileChange} className="file-input" />
// //             <button onClick={handleUpload} className="upload-button">
// //               Upload PDF
// //             </button>
// //           </div>
// //         )}

// //         {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// import React, { useState } from "react";
// import "../styles/AdminDashboard.css";

// const subjects = {
//   "Advanced Java Programming": ["Nilesh Shirude", "Upasne"],
//   "PDC": ["Teacher A", "Teacher B"],
//   "Cellular Network": ["Teacher C", "Teacher D"],
//   "Project Mnagement": ["Teacher E", "Teacher F"],
// };

// const AdminDashboard = () => {
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedTeacher, setSelectedTeacher] = useState("");
//   const [selectedDivision, setSelectedDivision] = useState(""); // New state for division
//   const [selectedFiles, setSelectedFiles] = useState({});
//   const [uploadMessage, setUploadMessage] = useState("");

//   const handleSubjectChange = (e) => {
//     setSelectedSubject(e.target.value);
//     setSelectedTeacher("");
//     setSelectedDivision(""); // Reset division when subject changes
//   };

//   const handleTeacherChange = (e) => {
//     setSelectedTeacher(e.target.value);
//   };

//   const handleDivisionChange = (e) => {
//     setSelectedDivision(e.target.value); // Handle division change
//   };

//   const handleFileChange = (e) => {
//     setSelectedFiles({
//       ...selectedFiles,
//       [selectedTeacher]: e.target.files[0],
//     });
//   };

//   const handleUpload = async () => {
//     if (!selectedTeacher) {
//       alert("Please select a teacher before uploading.");
//       return;
//     }

//     if (!selectedDivision) {
//       alert("Please select a division.");
//       return;
//     }

//     const file = selectedFiles[selectedTeacher];
//     if (!file) {
//       alert(`Please select a file before uploading for ${selectedTeacher}.`);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("pdfFile", file);
//     formData.append("subject", selectedSubject);
//     formData.append("teacher", selectedTeacher); // Append selected division to the form data
//     formData.append("division", selectedDivision);

//     try {
//       const response = await fetch("http://localhost:7000/upload-pdf", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUploadMessage(`✅ PDF uploaded successfully: ${data.url}`);
//       } else {
//         console.error("Upload error:", data.error);
//         setUploadMessage(`❌ Error: ${data.error}`);
//       }
//     } catch (err) {
//       console.error("Error uploading PDF:", err);
//       setUploadMessage("❌ Failed to upload PDF.");
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       {/* Heading (Outside of White Box) */}
//       <h1 className="dashboard-title">Admin Dashboard</h1>
//       <p className="dashboard-subtitle">Manage Subject Assignments</p>

//       {/* White Container */}
//       <div className="dashboard-card">
//         <div className="dropdown-container">
//           <label>Select Subject:</label>
//           <select
//             value={selectedSubject}
//             onChange={handleSubjectChange}
//             className="dropdown"
//           >
//             <option value="">-- Select Subject --</option>
//             {Object.keys(subjects).map((subject, index) => (
//               <option key={index} value={subject}>
//                 {subject}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedSubject && (
//           <div className="dropdown-container">
//             <label>Select Teacher:</label>
//             <select
//               value={selectedTeacher}
//               onChange={handleTeacherChange}
//               className="dropdown"
//             >
//               <option value="">-- Select Teacher --</option>
//               {subjects[selectedSubject].map((teacher, idx) => (
//                 <option key={idx} value={teacher}>
//                   {teacher}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {selectedSubject && selectedTeacher && (
//           <div className="dropdown-container">
//             <label>Select Division:</label>
//             <select
//               value={selectedDivision}
//               onChange={handleDivisionChange}
//               className="dropdown"
//             >
//               <option value="">-- Select Division --</option>
//               <option value="Div-5">Div-5</option>
//               <option value="Div-6">Div-6</option>
//               <option value="Div-7">Div-7</option>
//               <option value="Div-8">Div-8</option>
//             </select>
//           </div>
//         )}

//         {selectedTeacher && selectedDivision && (
//           <div className="upload-section">
//             <input
//               type="file"
//               accept=".pdf"
//               onChange={handleFileChange}
//               className="file-input"
//             />
//             <button onClick={handleUpload} className="upload-button">
//               Upload PDF
//             </button>
//           </div>
//         )}

//         {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

//------------------------------MAIN TODAY ADMINDASHBOARD.JS--------------------------------------------------

// import React, { useState } from "react";
// import "../styles/AdminDashboard.css";

// const subjects = {
//   "AJP": ["Teacher A", "Teacher B"],
//   "PDC": ["Teacher C", "Teacher D"],
//   "CN": ["Teacher E", "Teacher F"],
//   "PM": ["Teacher G", "Teacher H"],  // Fixed typo: "Project Mnagement" => "Project Management"
// };

// const AdminDashboard = () => {
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedTeacher, setSelectedTeacher] = useState("");
//   const [selectedDivision, setSelectedDivision] = useState(""); // New state for division
//   const [selectedFiles, setSelectedFiles] = useState({});
//   const [uploadMessage, setUploadMessage] = useState("");

//   const handleSubjectChange = (e) => {
//     setSelectedSubject(e.target.value);
//     setSelectedTeacher("");  // Reset teacher when subject changes
//     setSelectedDivision(""); // Reset division when subject changes
//   };

//   const handleTeacherChange = (e) => {
//     setSelectedTeacher(e.target.value);
//   };

//   const handleDivisionChange = (e) => {
//     setSelectedDivision(e.target.value);  // Handle division change
//   };

//   const handleFileChange = (e) => {
//     setSelectedFiles({
//       ...selectedFiles,
//       [selectedTeacher]: e.target.files[0],
//     });
//   };

//   const handleUpload = async () => {
//     if (!selectedTeacher) {
//       alert("Please select a teacher before uploading.");
//       return;
//     }

//     if (!selectedDivision) {
//       alert("Please select a division before uploading.");
//       return;
//     }

//     const file = selectedFiles[selectedTeacher];
//     if (!file) {
//       alert(`Please select a file before uploading for ${selectedTeacher}.`);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("pdfFile", file);
//     formData.append("subject", selectedSubject);
//     formData.append("teacher", selectedTeacher);
//     formData.append("division", selectedDivision);

//     try {
//       const response = await fetch("http://localhost:7000/upload-pdf", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUploadMessage(`✅ PDF uploaded successfully: ${data.url}`);
//       } else {
//         console.error("Upload error:", data.error);
//         setUploadMessage(`❌ Error: ${data.error}`);
//       }
//     } catch (err) {
//       console.error("Error uploading PDF:", err);
//       setUploadMessage("❌ Failed to upload PDF.");
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       {/* Heading (Outside of White Box) */}
//       <h1 className="dashboard-title">Admin Dashboard</h1>
//       <p className="dashboard-subtitle">Manage Subject Assignments</p>

//       {/* White Container */}
//       <div className="dashboard-card">
//         {/* Subject Dropdown */}
//         <div className="dropdown-container">
//           <label>Select Subject:</label>
//           <select
//             value={selectedSubject}
//             onChange={handleSubjectChange}
//             className="dropdown"
//           >
//             <option value="">-- Select Subject --</option>
//             {Object.keys(subjects).map((subject, index) => (
//               <option key={index} value={subject}>
//                 {subject}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Teacher Dropdown */}
//         {selectedSubject && (
//           <div className="dropdown-container">
//             <label>Select Teacher:</label>
//             <select
//               value={selectedTeacher}
//               onChange={handleTeacherChange}
//               className="dropdown"
//             >
//               <option value="">-- Select Teacher --</option>
//               {subjects[selectedSubject].map((teacher, idx) => (
//                 <option key={idx} value={teacher}>
//                   {teacher}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Division Dropdown */}
//         {selectedSubject && selectedTeacher && (
//           <div className="dropdown-container">
//             <label>Select Division:</label>
//             <select
//               value={selectedDivision}
//               onChange={handleDivisionChange}
//               className="dropdown"
//             >
//               <option value="">-- Select Division --</option>
//               <option value="Div-5">Div-5</option>
//               <option value="Div-6">Div-6</option>
//               <option value="Div-7">Div-7</option>
//               <option value="Div-8">Div-8</option>
//             </select>
//           </div>
//         )}

//         {/* File Upload Section */}
//         {selectedTeacher && selectedDivision && (
//           <div className="upload-section">
//             <input
//               type="file"
//               accept=".pdf"
//               onChange={handleFileChange}
//               className="file-input"
//             />
//             <button onClick={handleUpload} className="upload-button">
//               Upload PDF
//             </button>
//           </div>
//         )}

//         {/* Upload Message */}
//         {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;