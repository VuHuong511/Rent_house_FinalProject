import React from "react";
import Heading from "../../Common/Heading";
import { location } from "../../data";
import "./Location.css";

const Location = () => {
  return (
    <>
      <section className="location padding">
        <div className="container">
          <Heading
            title="Explore By Location"
            subtitle="Discover properties in your desired location. Explore our collection of properties for sale and rent in your favorite neighborhoods, towns, and cities."
          />
          <div className="content grid3 mtop">
            {location.map((item, index) => (
              <div className="box" key={index}>
                <img src={item.cover} alt="" />
                <div className="overlay">
                  <h5>{item.name}</h5>
                  <p>
                    <label>{item.Villas}</label>
                    <label>{item.Offices}</label>
                    <label>{item.Apartments}</label>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
