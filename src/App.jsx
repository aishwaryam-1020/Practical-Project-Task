import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FileUpload from "../components/FileUpload";
import RecordTable from "../components/RecordTable";
import SearchBar from "../components/SearchBar";
import "./App.css";

function App() {
  const [records, setRecords] = useState([]); // Holds all records
  const [searchQuery, setSearchQuery] = useState(""); // Holds search input

  // Handle file upload and merge data
  const handleFileUpload = (newRecords) => {
    const existingEmails = new Set(records.map((r) => r.email));
    const uniqueRecords = newRecords.filter(
      (record) => !existingEmails.has(record.email)
    );
    setRecords((prevRecords) => [...prevRecords, ...uniqueRecords]);
    toast.success("File uploaded and records merged successfully.");
  };

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // record edit
  const handleEdit = (record) => {
    const updatedEmail = prompt("Enter a new email:", record.email);
    if (updatedEmail && !records.some((r) => r.email === updatedEmail)) {
      setRecords((prevRecords) =>
        prevRecords.map((r) =>
          r.id === record.id ? { ...r, email: updatedEmail } : r
        )
      );
      toast.success("Record updated successfully.");
    } else {
      toast.error("Email must be unique.");
    }
  };

  // Handle record deletion
  const handleDelete = (id) => {
    setRecords((prevRecords) => prevRecords.filter((r) => r.id !== id));
    toast.success("Record deleted successfully.");
  };

  // Filter records based on search query
  const filteredRecords = records.filter(
    (record) =>
      record.id.toString().includes(searchQuery) ||
      record.name.toLowerCase().includes(searchQuery) ||
      record.email.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container-fluid mt-5 bg-light p-4">
      <h3 className="text-center mb-4">Client Record Management</h3>
      <br />
      
      <div className="row mb-3">
        <div className="col-md-5">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="col-md-7 text-end">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>
      </div>

      <RecordTable
        records={filteredRecords}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

     
      <ToastContainer />
    </div>
  );
}

export default App;
