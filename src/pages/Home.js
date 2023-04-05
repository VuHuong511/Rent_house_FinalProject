import React from "react";
import Awards from "../components/Home/Awards/Awards";
import Featured from "../components/Home/Featured/FeatureCard";
import Hero from "../components/Home/Hero/Hero";
import Location from "./components/Home/Location/Location";
import Price from "./components/Home/Price/Price";
import Recent from "../components/Home/Recent/Recent";
import Team from "./components/Home/Team/Team";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
      <Awards />
      <Location />
      <Team />
      <Price />
    </>
  );
};

export default Home;
