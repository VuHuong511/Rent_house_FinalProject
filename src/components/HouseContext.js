import React, { createContext, useEffect, useState } from "react";

// import data
import { housesData } from "../data";

//create context
export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [area, setArea] = useState("Location (any)");
  const [areas, setAreas] = useState([]);

  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price Range");
  const [loading, setLoading] = useState(false);

  //return all areas
  useEffect(() => {
    const allAreas = houses.map((house) => {
      return house.area;
    });

    //remove duplicate areas
    const uniqueAreas = ["Location(any)", ...new Set(allAreas)];

    //set areas state
    setAreas(uniqueAreas);
  }, []);

  //return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });

    //remove duplicate properties
    const uniqueProperties = ["Location(any)", ...new Set(allProperties)];

    //set  properties state
    setProperties(uniqueProperties);
  }, []);

  return (
    <HouseContext.Provider
      value={{
        area,
        setArea,
        areas,
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
