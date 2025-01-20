import React from "react";

export default function SearchBar({ onSearch }){
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"  className="form-control"
      placeholder="Search by ID, Name, or Email"
      onKeyUp={handleSearch}
    />
  );
};


