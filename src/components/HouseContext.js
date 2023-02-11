import React, { createContext, useState } from "react";

// import data
import { housesData } from "../data";

//create context
export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [area, setArea] = useState("Location (any)");
  const [areaes, setAreaes] = useState([]);

  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price Range");
  const [loading, setLoading] = useState(false);

  return (
    <HouseContext.Provider
      value={{
        area,
        setArea,
        areaes,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
