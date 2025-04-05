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

// import React, { useState } from "react";
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

//-0-------------------------------------------------befoire making duplicate of it it is roginalm ifn some error occur 

// import React, { useState } from "react";
// import "./AfterEvaluatorLogin";

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
//     // Validate that all PDFs have subject and division. Critical!
//     for (const pdf of pdfs) {
//       if (!pdf.subject || !pdf.division) {
//         alert("Please select a subject and division for all PDFs.");
//         return; // Stop the upload
//       }
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
//         setSubject("");
//         setDivision("");
//       } else {
//         alert(data.error || "Something went wrong");
//       }
//     } catch (error) {
//       alert("Error: " + error.message);
//       console.error("Upload Error:", error);
//     }
//   };

//   // Function to remove a PDF from the list
//   const removePdf = (index) => {
//     setPdfs((prevPdfs) => prevPdfs.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-6">
//           <h1 className="text-3xl font-bold text-white text-center">Admin Dashboard</h1>
//         </div>
        
//         <div className="p-6 space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Subject Selection */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Subject</label>
//               <select
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//               >
//                 <option value="">Select Subject</option>
//                 <option value="Mathematics">Mathematics</option>
//                 <option value="Science">Science</option>
//                 {/* Add more subjects as needed */}
//               </select>
//             </div>

//             {/* Division Selection */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Division</label>
//               <select
//                 value={division}
//                 onChange={(e) => setDivision(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//               >
//                 <option value="">Select Division</option>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 {/* Add more divisions as needed */}
//               </select>
//             </div>
//           </div>

//           {/* Teacher Selection */}
//           <div className="space-y-3">
//             <label className="block text-lg font-medium text-gray-700">Select Evaluator:</label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {teachersList.map((teacher) => (
//                 <div
//                   key={teacher}
//                   className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                     selectedTeacher === teacher
//                       ? "border-blue-500 bg-blue-50 shadow-md"
//                       : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
//                   }`}
//                   onClick={() => handleTeacherSelect(teacher)}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
//                       selectedTeacher === teacher ? "bg-blue-600 border-blue-600" : "border-gray-400"
//                     }`}>
//                       {selectedTeacher === teacher && (
//                         <div className="w-3 h-3 rounded-full bg-white"></div>
//                       )}
//                     </div>
//                     <span className={`font-medium ${selectedTeacher === teacher ? "text-blue-700" : "text-gray-700"}`}>
//                       {teacher}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Upload Button */}
//           <div className="flex justify-center">
//             <button
//               onClick={openUploadWidget}
//               className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all flex items-center space-x-2"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
//               </svg>
//               <span>Upload PDFs</span>
//             </button>
//           </div>

//           {/* Display Uploaded PDFs */}
//           {pdfs.length > 0 && (
//             <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded PDFs</h3>
//               <div className="space-y-3">
//                 {pdfs.map((pdf, index) => (
//                   <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
//                     <div className="flex-1">
//                       <div className="flex flex-wrap gap-3">
//                         <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                           Subject: {pdf.subject}
//                         </span>
//                         <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
//                           Division: {pdf.division}
//                         </span>
//                       </div>
//                       <div className="mt-2">
//                         <a 
//                           href={pdf.pdfUrl} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                           </svg>
//                           View PDF
//                         </a>
//                       </div>
//                     </div>
//                     <button 
//                       onClick={() => removePdf(index)}
//                       className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Submit Button */}
//           <div className="flex justify-center pt-4">
//             <button
//               onClick={handleUpload}
//               className={`px-8 py-3 rounded-lg font-medium shadow-md transform hover:-translate-y-1 transition-all ${
//                 pdfs.length > 0
//                   ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg"
//                   : "bg-gray-200 text-gray-500 cursor-not-allowed"
//               }`}
//               disabled={pdfs.length === 0}
//             >
//               Submit All PDFs
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


//------------------------------------------------------------------




import React, { useState } from "react";
import "./AfterEvaluatorLogin";

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
    // Validate that all PDFs have subject and division. Critical!
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
        setSubject("");
        setDivision("");
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
    setPdfs((prevPdfs) => prevPdfs.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-6">
          <h1 className="text-3xl font-bold text-white text-center">Admin Dashboard</h1>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                {/* Add more subjects as needed */}
              </select>
            </div>

            {/* Division Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Division</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select Division</option>
                <option value="A">A</option>
                <option value="B">B</option>
                {/* Add more divisions as needed */}
              </select>
            </div>
          </div>

          {/* Teacher Selection */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-700">Select Evaluator:</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teachersList.map((teacher) => (
                <div
                  key={teacher}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedTeacher === teacher
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                  onClick={() => handleTeacherSelect(teacher)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      selectedTeacher === teacher ? "bg-blue-600 border-blue-600" : "border-gray-400"
                    }`}>
                      {selectedTeacher === teacher && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className={`font-medium ${selectedTeacher === teacher ? "text-blue-700" : "text-gray-700"}`}>
                      {teacher}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex justify-center">
            <button
              onClick={openUploadWidget}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>Upload PDFs</span>
            </button>
          </div>

          {/* Display Uploaded PDFs */}
          {pdfs.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded PDFs</h3>
              <div className="space-y-3">
                {pdfs.map((pdf, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          Subject: {pdf.subject}
                        </span>
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          Division: {pdf.division}
                        </span>
                      </div>
                      <div className="mt-2">
                        <a 
                          href={pdf.pdfUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View PDF
                        </a>
                      </div>
                    </div>
                    <button 
                      onClick={() => removePdf(index)}
                      className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleUpload}
              className={`px-8 py-3 rounded-lg font-medium shadow-md transform hover:-translate-y-1 transition-all ${
                pdfs.length > 0
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={pdfs.length === 0}
            >
              Submit All PDFs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
