import React, { useState } from "react";
import "./Pagination.css";
const Pagination = ({
  currentPage,
  setCurrentPage,
  roomsPerPage,
  totalRoom,
}) => {
  const pageNumbers = [];
  const totalPages = totalRoom / roomsPerPage;
  // limit the page number shown
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // GO to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    // Show next set of pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  // GO to prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    // Show prev set of pageNumbers
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  for (let i = 1; i <= Math.ceil(totalRoom / roomsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="flex justify-center items-center space-x-3 mt-6 mb-2">
      <li
        onClick={paginatePrev}
        className={`border rounded-md py-2 px-3 cursor-pointer ${
          currentPage === pageNumbers[0]
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        Prev
      </li>
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={`border rounded-md py-2 px-3 cursor-pointer ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {number}
            </li>
          );
        }
      })}
      <li
        onClick={paginateNext}
        className={`border rounded-md py-2 px-3 cursor-pointer ${
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        Next
      </li>
      <p className="text-gray-500 text-sm ml-4">
        Page <span className="font-bold">{currentPage}</span> of{" "}
        <span className="font-bold">{Math.ceil(totalPages)}</span>
      </p>
    </ul>
  );
};

export default Pagination;
