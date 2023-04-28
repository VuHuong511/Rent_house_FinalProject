import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import "./HomeLogin.css";
import {
  FILTER_BY_SEARCH,
  SORT_ROOMS,
  selectFilteredRooms,
} from "../redux/slice/filterSlice";
import {
  GET_PRICE_RANGE,
  STORE_ROOMS,
  selectRooms,
} from "../redux/slice/roomSlice";
import useEffectCollection from "../hooks/useFetchCollection";
import Moment from "react-moment";
import { MdLocationOn } from "react-icons/md";
import { ADD_TO_WISHLIST } from "../redux/slice/wishListSlice";
import Pagination from "../components/Pagination.js/Pagination";
export default function HomeLogin() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredRooms = useSelector(selectFilteredRooms);
  const { data } = useEffectCollection("listings");
  const rooms = useSelector(selectRooms) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_ROOMS({
        rooms: data,
      })
    );
    dispatch(
      GET_PRICE_RANGE({
        rooms: data,
      })
    );
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(SORT_ROOMS({ rooms, sort }));
  }, [dispatch, rooms, sort]);
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ rooms, search }));
  }, [dispatch, rooms, search]);
  const url = window.location.href;
  const scrollToRooms = () => {
    if (url.includes("/homeLogin")) {
      window.scrollTo({
        top: 740,
        behavior: "smooth",
      });
      return;
    }
  };
  useEffect(() => {
    scrollToRooms();
  }, []);
  const addToWishList = (room) => {
    dispatch(ADD_TO_WISHLIST(room));
  };
  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(12);
  // get current rooms
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <div className="homeLogin">
      <Filter />
      <div className="flex items-center ml-[70px]">
        <div className="search">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
        <div className="sorting">
          <label style={{ marginLeft: 15 }}>Sort by:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{ marginTop: 10 }}
          >
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-3">
        <ul
          className="sm:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center"
          style={{ columnGap: 150 }}
        >
          {rooms.length === 0 ? (
            <p>No product found.</p>
          ) : (
            <>
              {currentRooms.map((room) => {
                const {
                  id,
                  type,
                  imgUrls,
                  timestamp,
                  address,
                  offer,
                  discountedPrice,
                  regularPrice,
                  bedrooms,
                  bathrooms,
                  name,
                } = room;
                return (
                  <li className="w-[250px] relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow m-[10px]">
                    <Link className="contents" to={`/category/${type}/${id}`}>
                      <img
                        className="h-[170px] w-full object-cover duration-300 ease-in"
                        loading="lazy"
                        src={imgUrls}
                        alt=""
                      />
                      <Moment
                        className="absolute top-2 left-2 bg-blue-700 text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
                        fromNow
                      >
                        {timestamp?.toDate()}
                      </Moment>
                      <div className="w-full p-[10px]">
                        <div className="flex items-center space-x-1">
                          <MdLocationOn className="h-4 w-4 text-blue-600" />
                          <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
                            {address}
                          </p>
                        </div>
                        <p className="font-semibold m-0 text-xl truncate">
                          {name}
                        </p>
                        <p className="text-[#457b9b] mt-2 font-semibold">
                          ${offer ? discountedPrice : regularPrice}
                          {type === "discount" ? " / month" : ""}
                        </p>
                        <div className="flex items-center mt-[10px] space-x-3">
                          <div className="flex items-center space-x-1">
                            <p className="font-bold text-xs">
                              {bedrooms > 1 ? `${bedrooms} Beds` : "1 bed"}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <p className="font-bold text-xs">
                              {bathrooms > 1 ? `${bathrooms} baths` : "1 bath"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link className="mt-[-25px] ml-[190px]  hover:text-red-600 focus:text-red-600">
                      <AiFillHeart onClick={() => addToWishList(room)} />
                    </Link>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        roomsPerPage={roomsPerPage}
        totalRoom={filteredRooms.length}
      />
    </div>
  );
}
