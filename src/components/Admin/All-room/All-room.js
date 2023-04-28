import React, { useEffect, useState } from "react";
import "./All-room.css";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ROOMS, selectRooms } from "../../../redux/slice/roomSlice";
import useEffectCollection from "../../../hooks/useFetchCollection";
import {
  FILTER_BY_SEARCH,
  selectFilteredRooms,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../Pagination.js/Pagination";
import { BiSearch } from "react-icons/bi";
function All_room() {
  const [search, setSearch] = useState("");
  const { data } = useEffectCollection("listings");
  const filteredRooms = useSelector(selectFilteredRooms);
  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(10);
  // get current rooms
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const rooms = useSelector(selectRooms) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_ROOMS({
        rooms: data,
      })
    );
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ rooms, search }));
  }, [dispatch, rooms, search]);
  return (
    <>
      <div className="table">
        <div className="flex items-center mt-4 mb-6 border solid ">
          <BiSearch size={18} className="icon mr-2" />
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          />
        </div>
        {filteredRooms.length === 0 ? (
          <p>No room found</p>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Regular Price</th>
                <th className="px-4 py-2">Discounted Price</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.map((room, index) => {
                const {
                  id,
                  imgUrls,
                  name,
                  type,
                  regularPrice,
                  discountedPrice,
                  address,
                } = room;
                return (
                  <tr key={id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={imgUrls}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td className="border px-4 py-2">{name}</td>
                    <td className="border px-4 py-2">{type}</td>
                    <td className="border px-4 py-2">{`$${regularPrice}`}</td>
                    <td className="border px-4 py-2">{`$${discountedPrice}`}</td>
                    <td className="border px-4 py-2">{`$${
                      regularPrice - discountedPrice
                    }`}</td>
                    <td className="border px-4 py-2">{address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          roomsPerPage={roomsPerPage}
          totalRoom={filteredRooms.length}
        />
      </div>
    </>
  );
}
export default All_room;
