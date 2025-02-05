import React from "react";

const PdfUploader = ({ setPdfUrl }) => {
  const openUploadWidget = () => {
    if (!window.cloudinary) {
      console.error("Cloudinary script not loaded");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: "dybikmq0t",
        uploadPreset: "Rushikesh",
        multiple: false,
        resourceType: "raw",
        allowedFormats: ["pdf"],
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setPdfUrl(result.info.secure_url);
        }
      }
    );
  };

  return (
    <button onClick={openUploadWidget} className="upload-button">
      Upload PDF
    </button>
  );
};

export default PdfUploader;
