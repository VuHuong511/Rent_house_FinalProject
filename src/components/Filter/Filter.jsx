import React, { useEffect, useState } from "react";
import "./Filter.css";
import {
  selectMaxPrice,
  selectMinPrice,
  selectRooms,
} from "../../redux/slice/roomSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_LOCATION,
  FILTER_BY_PRICE,
  FILTER_BY_TYPE,
} from "../../redux/slice/filterSlice";

export default function Filter() {
  const [place, setPlace] = useState("Select place");
  function handleFilter(event) {
    setPlace(event.target.value);
  }
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const [price, setPrice] = useState(12345678);
  const rooms = useSelector(selectRooms);
  const dispatch = useDispatch();
  const allTypes = ["All", ...new Set(rooms.map((room) => room.type))];
  const allLocation = ["All", ...new Set(rooms.map((room) => room.address))];
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("All");
  const clearFilter = () => {
    setType("All");
    setPlace("All");
    setPrice(maxPrice);
  };
  useEffect(() => {
    dispatch(FILTER_BY_TYPE({ rooms, type }));
  }, [dispatch, rooms, type]);

  useEffect(() => {
    dispatch(FILTER_BY_LOCATION({ rooms, location }));
  }, [dispatch, rooms, location]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ rooms, price }));
  }, [dispatch, rooms, price]);
  return (
    <section className="sort bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <form className="flex flex-wrap justify-between items-center h-[110px]">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <label className="mr-2 font-bold">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 border rounded-md"
            >
              {allTypes.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <label className="mr-2 font-bold">Location:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border rounded-md"
            >
              {allLocation.map((location, index) => {
                return (
                  <option key={index} value={location}>
                    {location}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <label className="mr-2 font-bold">Price:</label>
            <div className="flex items-center">
              <span className="mr-2">${price}</span>
              <div className="w-64">
                <input
                  type="range"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={minPrice}
                  max={maxPrice}
                  className="w-full"
                ></input>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <button
              onClick={clearFilter}
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Clear filter
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
