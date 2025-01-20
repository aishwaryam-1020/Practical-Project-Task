import React, { useState, useEffect } from "react";

function RecordTable({ records, onEdit, onDelete, searchQuery }) {
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const recordsPerPage = 3; // Fixed records per page

  // Filter records based on search query
  const filteredRecords = records.filter(
    (record) =>
      record.id.toString().includes(searchQuery) ||
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate current page records
  const startIndex = currentPage * recordsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, startIndex + recordsPerPage);

  // Reset to the first page when searchQuery changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);

  // Handle Previous button click
  const handlePreviousClick = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Handle Next button click
  const handleNextClick = () => {
    if ((currentPage + 1) * recordsPerPage < filteredRecords.length) {
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
          disabled={currentPage === 0} // Disable if on the first page
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {Math.ceil(filteredRecords.length / recordsPerPage)}
        </span>
        <button
          className="btn btn-success"
          onClick={handleNextClick}
          disabled={(currentPage + 1) * recordsPerPage >= filteredRecords.length} // Disable if on the last page
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RecordTable;
