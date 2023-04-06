import React, { useEffect, useState } from "react";
import "./Filter.css";
import { selectRooms } from "../../redux/slice/roomSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_LOCATION,
  FILTER_BY_TYPE,
} from "../../redux/slice/filterSlice";
export default function Filter() {
  const [place, setPlace] = useState("Select place");
  function handleFilter(event) {
    setPlace(event.target.value);
  }
  const rooms = useSelector(selectRooms);
  const dispatch = useDispatch();
  const allTypes = ["All", ...new Set(rooms.map((room) => room.type))];
  console.log(allTypes);
  const allLocation = ["All", ...new Set(rooms.map((room) => room.address))];
  console.log(allLocation);
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("All");

  const filterRooms = (cat) => {
    setType(cat);
    dispatch(FILTER_BY_TYPE({ rooms, type: cat }));
  };

  useEffect(() => {
    dispatch(FILTER_BY_LOCATION({ rooms, location }));
  }, [dispatch, rooms, location]);
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
              <span>Select place</span>
              <div className="filter">
                <select onChange={handleFilter} value={place}>
                  <option value="Select place">Select place</option>
                  <option value="NguHanhSon">Ngu Hanh Son</option>
                  <option value="LienChieu">Lien Chieu</option>
                </select>
              </div>
              <h4>Price</h4>
              <p>5000</p>
              <div className="Price">
                <input type="range" name="proce" min={100} max="1000"></input>
              </div>
              <button>Clear filter</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
