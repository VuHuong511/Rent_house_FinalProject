import React from "react";
import { BiSearch } from "react-icons/bi";
import "./Search.css";

function Search(value, onChange) {
  return (
    <div className="search">
      <BiSearch size={18} className="icon" />
      <input
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default Search;
