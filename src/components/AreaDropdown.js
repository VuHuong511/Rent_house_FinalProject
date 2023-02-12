import { Menu } from "@headlessui/react";
import React, { useContext, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine, RiMapPinLine } from "react-icons/ri";

//import icons

//import House context
import { HouseContext } from "./HouseContext";

const AreaDropdown = () => {
  const { area, setArea, areas } = useContext(HouseContext);
  console.log(areas);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="drop-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">{area}</div>
          <div className="text-[13px]">Select Your Place</div>
          {isOpen ? (
            <RiArrowUpSLine className="dropdown-icon-secondary" />
          ) : (
            <RiArrowDownSLine className="dropdown-icon-secondary" />
          )}
        </div>
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {areas.map((area, index) => {
          return (
            <Menu.Item
              onClick={() => setArea(area)}
              className="cursor-pointer hover:text-blue-700 transition"
              as="li"
              key={index}
            >
              {area}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default AreaDropdown;
