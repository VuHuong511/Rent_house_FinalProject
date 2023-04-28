import React from "react";
import Back from "../Common/Back";
import "../Home/Recent/Recent.css";
import RecentCard from "../Home/Recent/RecentCard";
import img from "../images/about.jpg";

const Property = () => {
  return (
    <>
      <section className="blog-out mb">
        <Back
          className="mt-[50px]"
          name="Property"
          title="Recent Property Listed"
          cover={img}
        />
        <div style={{ marginTop: 50 }} className="container recent pb-[30px]">
          <RecentCard />
        </div>
      </section>
    </>
  );
};

export default Property;
