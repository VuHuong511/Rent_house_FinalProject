import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.png";

export default function Header() {
  const [pageState, setPageState] = useState("login")
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      if(user){
        setPageState("profile");
      }
      else {
        setPageState("login");
      }
    });
  }, [auth]);
  function matchRoute(route) {
    if (route === location.pathname){
      return true;
    }
  }
  return (
    <header>
      <div className="container mx-auto flex justify-between items-center">
        {}
        <Link>
          <img className="w-20  " src={Logo} alt="" />
        </Link>
        {}
        <div className="flex items-center gap-6">
        <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                matchRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
          <Link className="hover:text-blue-900 transition" to="/about">
            About
          </Link>
          <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (matchRoute("/sign-in") || matchRoute("/profile")) &&
                "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
      
        </div>
      </div>
    </header>
  );
}