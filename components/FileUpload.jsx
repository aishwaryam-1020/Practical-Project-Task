import React from "react";

function FileUpload({ onFileUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        onFileUpload(jsonData);
      } catch (error) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
    </div>
  );
}

export default FileUpload;
