import React, { useState } from "react";

function RecordTable({ records, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const recordsPerPage = 2; // Fixed records per page

  // Calculate records current page
  const startIndex = currentPage * recordsPerPage;
  const currentRecords = records.slice(startIndex, startIndex + recordsPerPage);

  // Handle Previous button click
  const handlePreviousClick = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Handle Next button click
  const handleNextClick = () => {
    if ((currentPage + 1) * recordsPerPage < records.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Records Table</h5>
      </div>

      {/* Table */}
      {currentRecords.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => onEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No records available.</p>
      )}

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-success"
          onClick={handlePreviousClick}
          // Disable if on the first page
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {Math.ceil(records.length / recordsPerPage)}
        </span>
        <button
          className="btn btn-success"
          onClick={handleNextClick}
          // Disable if on the last page
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RecordTable;
