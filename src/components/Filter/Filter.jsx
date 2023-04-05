import React, { useState } from "react";
import "./Filter.css";

export default function Filter() {
  const [place, setPlace] = useState("Select place");
  function handleFilter(event) {
    setPlace(event.target.value);
  }

  return (
    <>
      <section className="fillter">
        <div className="container">
          <form className="flex">
            <div className="box">
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
