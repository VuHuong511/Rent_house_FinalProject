import React from "react";

// import link
import { Link } from "react-router-dom";

// import logo
import Logo from "../assets/img/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto flex justify-between items-center">
        {}
        <Link>
          <img className="w-20  " src={Logo} alt="" />
        </Link>
        {}
        <div className="flex items-center gap-6">
          <Link className="hover:text-blue-900 transition" to="">
            Home
          </Link>
          <Link className="hover:text-blue-900 transition" to="/about">
            About
          </Link>
          <Link
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg transition"
            to="/login"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;