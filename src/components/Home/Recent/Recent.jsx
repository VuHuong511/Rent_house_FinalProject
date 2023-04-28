import React from "react";
import Heading from "../../Common/Heading";
import "./Recent.css";
import RecentCard from "./RecentCard";

const Recent = () => {
  return (
    <>
      <section className="recent padding">
        <div className="container">
          <Heading
            title="Recent Property Listed"
            subtitle="Browse our latest listings of properties for sale and rent. From cozy apartments to spacious houses, find your dream home today!"
          />
          <RecentCard />
        </div>
      </section>
    </>
  );
};

export default Recent;
