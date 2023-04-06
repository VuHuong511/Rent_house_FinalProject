import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../components/Filter/Filter";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
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
    console.log(search);
    dispatch(SORT_ROOMS({ rooms, sort }));
  }, [dispatch, rooms, sort]);

  useEffect(() => {
    console.log(search);
    dispatch(FILTER_BY_SEARCH({ rooms, search }));
  }, [dispatch, rooms, search]);
  const url = window.location.href;
  const scrollToRooms = () => {
    if (url.includes("/homeLogin")) {
      window.scrollTo({
        top: 700,
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

  return (
    <div>
      <Filter />
      <div className="search">
        <BiSearch size={18} className="icon" />
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <div className="">
        <label>Sort by:</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="lowest-price">Lowest Price</option>
          <option value="highest-price">Highest Price</option>
          <option value="a-z">A - Z</option>
          <option value="z-a">Z - A</option>
        </select>
      </div>

      <ul className="sm:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {rooms.lenght === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {filteredRooms.map((room) => {
              const {
                listing,
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
                      className="absolute top-2 left-2 bg-blue-700 text-white
        uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
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
                  <button onClick={() => addToWishList(room)}>Add </button>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
}
