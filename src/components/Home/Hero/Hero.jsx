import React from "react";
import Heading from "../../Common/Heading";
import "./Hero.css";
const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <Heading
            title="Rent Your Dream Room with Us"
            subtitle="Find Your Perfect Space and Make It Your Own with Our Room Rentals"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
