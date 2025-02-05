import React, { useState } from "react";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [selectedTeachers, setSelectedTeachers] = useState(""); //[]
  const [subject, setSubject] = useState("");
  const [division, setDivision] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const teachersList = ["Evaluator1", "Evaluator2", "Evaluator3"]; // Dynamic from backend

  // const handleTeacherSelect = (teacher) => {
  //   setSelectedTeachers((prev) =>
  //     prev.includes(teacher)
  //       ? prev.filter((t) => t !== teacher)
  //       : [...prev, teacher]
  //   );
  // };

  const handleTeacherSelect = (teacher) => {
    console.log("Selected Teacher:", teacher);
    setSelectedTeachers(teacher);
  };

  // const openUploadWidget = () => {
  //   window.cloudinary.openUploadWidget(
  //     {
  //       cloudName: "dybikmq0t",
  //       uploadPreset: "Rushikesh",
  //       multiple: true, //------false
  //       resourceType: "raw",
  //       allowedFormats: ["pdf"],
  //     },
  //     (error, result) => {
  //       if (!error && result.event === "success") {
  //         let pdfUrl = result.info.secure_url;
  
  //         // Ensure URL ends with .pdf
  //         if (!pdfUrl.endsWith(".pdf")) {
  //           pdfUrl = pdfUrl.split("?")[0] + ".pdf"; // Remove extra query parameters and add .pdf
  //         }
  
  //         setPdfUrl(pdfUrl);
  //         console.log("PDF URL:", pdfUrl);
  //       }
  //     }
  //   );
  // };

  // const handleUpload = async () => {

  //   console.log("Selected Teacher:", selectedTeachers);
  //   console.log("Subject:", subject);
  //   console.log("Division:", division);
  //   console.log("PDF URL:", pdfUrl);

  //   if (!pdfUrl || !subject || !division || !selectedTeachers) {
  //     //---selectedTeacher
  //     alert("Please select all fields before uploading.");
  //     return;
  //   }

  //   // const response = await fetch("http://localhost:7000/upload-pdf", {
  //   //   method: "POST",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   body: JSON.stringify({
  //   //     teacher: selectedTeachers,
  //   //     subject,
  //   //     division,
  //   //     pdfUrl,
  //   //   }),
  //   // });

  //   //--
  //   //Change the URL to match the backend endpoint for evaluator PDF storage
  //   const response = await fetch(
  //     "http://localhost:7000/assign-pdf-to-evaluator",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         evaluatorName: selectedTeachers, // Assuming teacher selection is an evaluator
  //         subject,
  //         division,
  //         pdfUrl,
  //       }),
  //     }
  //   );
  //   //--

  //   const data = await response.json();
  //   alert(data.message);
  // };

  const openUploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dybikmq0t",
        uploadPreset: "Rushikesh",
        multiple: false, // Ensures only one file at a time
        resourceType: "auto", // Auto-detects PDF as raw
        allowedFormats: ["pdf"],
      },
      (error, result) => {
        if (!error && result.event === "success") {
          let pdfUrl = result.info.secure_url;
  
          console.log("Cloudinary Upload Response:", result.info);
  
          // Ensure Cloudinary treats it as a raw file
          if (result.info.resource_type !== "raw") {
            console.warn("File uploaded as", result.info.resource_type, "instead of 'raw'");
          }
          setPdfUrl(pdfUrl);
          console.log("PDF URL:", pdfUrl);
        } else if (error) {
          console.error("Upload Error:", error);
        }
      }
    );
  };  

  const handleUpload = async () => {
    console.log("Selected Teacher Before Sending Request:", selectedTeachers);
    console.log("Subject:", subject);
    console.log("Division:", division);
    console.log("PDF URL Before Sending Request:", pdfUrl);
  
    if (!pdfUrl || !subject || !division || !selectedTeachers) {
      alert("Please select all fields before uploading.");
      return;
    }

  // Ensure PDF URL is correctly formatted
  let formattedPdfUrl = pdfUrl;
  if (!formattedPdfUrl.endsWith(".pdf")) {
    formattedPdfUrl = formattedPdfUrl.split("?")[0] + ".pdf"; // Remove unnecessary query params
  }

  console.log("Formatted PDF URL:", formattedPdfUrl);
  
    try {
      const response = await fetch("http://localhost:7000/assign-pdf-to-evaluator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          evaluatorName: selectedTeachers,
          subject,
          division,
          pdfUrl:formattedPdfUrl,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message); // Success message
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      alert("Error: " + error.message);
      console.error("Upload Error:", error);
    }
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
        </select>

        {/* Teacher Selection */}
        <div className="teacher-list">
          <label className="teacher-label">Select Teachers:</label>
          {teachersList.map((teacher) => (
            <div key={teacher} className="teacher-item">
              <input
                type="radio" //--radio
               //-- name:"Evaluator"
                checked={selectedTeachers === teacher} //---- selectedTeachers.includes(teacher)
                onChange={() => handleTeacherSelect(teacher)} //----setSelectedTeachers(teacher)
              />
              <span>{teacher}</span>
            </div>
          ))}
        </div>

        {/* Upload PDF Button */}
        <button onClick={openUploadWidget} className="admin-button upload-btn">
          Upload PDF
        </button>
        
        {/* Submit Button */}
        <button onClick={handleUpload} className="admin-button submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
