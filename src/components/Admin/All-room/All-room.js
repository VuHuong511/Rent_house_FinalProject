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
import Search from "../../Search/Search";
import { BiSearch } from "react-icons/bi";
function All_room() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useEffectCollection("listings");
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
        <h2>All Products</h2>
        <div className="search">
          <BiSearch size={18} className="icon" />
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
        {filteredRooms.lenght === 0 ? (
          <p>No room found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Regular Price</th>
                <th>Discounted Price</th>
                <th>Price</th>
                <th>Address</th>
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
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imgUrls}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>{`$${regularPrice}`}</td>
                    <td>{`$${discountedPrice}`}</td>
                    <td>{`$${regularPrice - discountedPrice}`}</td>

                    <td>{address}</td>
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
