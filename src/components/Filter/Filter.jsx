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

  const filterRooms = (cat) => {
    setType(cat);
    dispatch(FILTER_BY_TYPE({ rooms, type: cat }));
  };

  useEffect(() => {
    dispatch(FILTER_BY_LOCATION({ rooms, location }));
  }, [dispatch, rooms, location]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ rooms, price }));
  }, [dispatch, rooms, price]);
  return (
    <>
      <section className="fillter">
        <div className="container">
          <form className="flex">
            <div className="box">
              <h4>Type</h4>
              <div>
                {allTypes.map((cat, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      className={`${type}` === cat}
                      onClick={() => filterRooms(cat)}
                    >
                      &#8250; {cat}
                    </button>
                  );
                })}
                <button>All</button>
              </div>
              <h4>Location</h4>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {allLocation.map((location, index) => {
                  return (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  );
                })}
              </select>
              <h4>Price</h4>
              <p>{`$${price}`}</p>
              <div className="Price">
                <input
                  type="range"
                  name="proce"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={minPrice}
                  max={maxPrice}
                ></input>
              </div>
              <button onClick={clearFilter}>Clear filter</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
