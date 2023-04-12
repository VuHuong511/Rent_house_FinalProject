import React from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../../redux/slice/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const userName = useSelector(selectEmail);
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
            <NavLink to="all-customer">All Customer</NavLink>
          </li>
          <li>
            <NavLink to="all-seller">All Seller</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
