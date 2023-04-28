import React from "react";
import { useSelector } from "react-redux";
import { selectUsername } from "../../../redux/slice/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const userName = useSelector(selectUsername);
  return (
    <div className="navbar">
      <div className="user">
        <FaUserCircle size={40} color="ffff" />
        <h3>{userName}</h3>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="all-room">All Room</NavLink>
          </li>
          <li>
            <NavLink to="all-Reservation">All Reservation</NavLink>
          </li>
          <li>
            <NavLink to="all-user">All User</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
