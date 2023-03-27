import React from "react";
import img from "../images/services.jpg";
import "../Home/Featured/Feature.css";
import FeaturedCard from "../Home/Featured/FeatureCard";
import Back from "../Common/Back";

const Services = () => {
  return (
    <>
      <section className="services mb">
        <Back name="Services" title="Services-All Services" cover={img} />
        <div className="featured container">
          <FeaturedCard />
        </div>
      </section>
    </>
  );
};

export default Services;
