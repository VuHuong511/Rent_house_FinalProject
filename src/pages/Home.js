// import React from "react";

// // import components
// import Banner from "../components/Banner";
// import HouseList from "../components/HouseList";

// const Home = () => {
//   return (
//     <div className="min-h-[1800px]">
//       <Banner />
//       <HouseList />
//     </div>
//   );
// };

// export default Home;

import React from "react"
import Awards from "../components/Home/Awards/Awards"
import Featured from "../components/Home/Featured/FeatureCard"
import Hero from "../components/Home/Hero/Hero"
import Location from "./Location/Location"
import Price from "./Price/Price"
import Recent from "./Recent/Recent"
import Team from "./Team/Team"

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
  )
}

export default Home
