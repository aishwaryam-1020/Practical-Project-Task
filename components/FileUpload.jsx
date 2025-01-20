import React from "react";
import { toast } from "react-toastify";

function FileUpload({ onFileUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected.");
      return;
    }

    // Validate file type
    if (file.type !== "application/json") {
      toast.error("Please upload a valid JSON file.");
      return;
    }

    // Optional: Validate file size (e.g., 5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("File size exceeds 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        onFileUpload(jsonData);
        toast.success("File uploaded successfully.");
      } catch (error) {
        toast.error("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="file-upload">
      <label htmlFor="file-input" className="btn btn-primary">
        Upload JSON File
      </label>
      <input
        id="file-input"
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default FileUpload;
