import React from "react";
import Awards from "./Home/Awards/Awards";
import Featured from "./Home/Featured/Feature";
import Recent from "./Home/Recent/Recent";
import Location from "./Home/Location/Location";
import Hero from "./Home/Hero/Hero";
import Team from "./Home/Team/Team";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
      <Awards />
      <Location />
      <Team />
    </>
  );
};

export default Home;
