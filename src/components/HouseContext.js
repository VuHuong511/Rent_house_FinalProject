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

  const handleClick = () => {
    //set loading
    setLoading(true);
    //create a function that checks if the sring inclues nothing
    const isDefault = (str) => {
      return str.split("").includes("(any)");
    };
    // get first value of price and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);

    //get second value of price which is the maximum price & parce it to number
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      // if all values are selected
      if (
        house.area === area &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }
      // if all values are default
      if (isDefault(area) && isDefault(property) && isDefault(price)) {
        return house;
      }

      // if country is not default
      if (!isDefault(area) && isDefault(property) && isDefault(price)) {
        return house.area === area;
      }

      // if property is not default
      if (!isDefault(property) && isDefault(area) && isDefault(price)) {
        return house.type === property;
      }

      // if price is not default
      if (!isDefault(price) && isDefault(area) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      // if area  & property is not default
      if (!isDefault(area) && !isDefault(property) && isDefault(price)) {
        return house.area === area && house.type === property;
      }

      // if area & price is not default
      if (!isDefault(area) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.area === area;
        }
      }

      // property && price is not default
      if (isDefault(area) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });
    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

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
        handleClick,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
