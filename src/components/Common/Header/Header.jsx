import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { nav } from "../../data";
import Logo from "../../../assets/img/Logo.png";
import User from "../../../assets/img/user.png";
import Logout from "../../../assets/img/log-out.png";
import Offer from "../../../assets/img/question.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [pageState, setPageState] = useState("login");
  const [homeState, setHomeState] = useState("login");
  const [aboutState, setAboutState] = useState("login");
  const [addState, setAddState] = useState("login");
  const [listState, setListState] = useState("login");

  const location = useLocation();

  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState(
          <button
            onClick={onLogout}
            style={{ marginLeft: 265 }}
            className="btn1"
          >
            <i className="fa fa-sign-out"></i> Log out
          </button>
        );
        setHomeState(
          <Link
            className="ml-4 text-lg text-black hover:text-blue-800 duration-500"
            to="/homeLogin"
          >
            Home
          </Link>
        );
        setAboutState(
          <Link
            className="ml-4 text-lg text-black hover:text-blue-800 duration-500"
            to="/offers"
          >
            Offers
          </Link>
        );
        setAddState(
          <Link
            className="ml-4 text-lg text-black hover:text-blue-800 duration-500"
            to="/create"
          >
            Create room
          </Link>
        );
        setListState(
          <Link
            className="ml-4 text-lg text-black hover:text-blue-800 duration-500"
            to="/myListing"
          >
            My Rooms
          </Link>
        );
      } else {
        setPageState(
          <Link to="/login">
            <button style={{ marginLeft: 265 }} className="btn1">
              <i className="fa fa-sign-in"></i> Sign In
            </button>
          </Link>
        );
        setHomeState(
          <Link
            className="ml-4 text-lg text-black hover:text-blue-800 duration-500"
            to="/"
          >
            Home
          </Link>
        );
        setAboutState(
          <Link
            className="ml-4 text-lg text-black hover:text-blue-800 duration-500"
            to="/about"
          >
            About
          </Link>
        );
        setAddState(
          <Link
            className="ml-4 text-lg text-black hover:text-blue-800 duration-500"
            to="/services"
          >
            Service
          </Link>
        );
        setListState(
          <Link
            className="ml-4 text-lg text-black hover:text-blue-800 duration-500"
            to="/property"
          >
            Property
          </Link>
        );
      }
    });
  }, [auth]);

  function matchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  // const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  let [open, setOpen] = useState(true);

  return (
    <div className="shadow-md w-full top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-2 px-10">
        <div
          className=" flex items-center font-[Poppins]
      text-gray-800"
        >
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <div className="logo">
              <img src={Logo} alt="logo" />
            </div>
          </span>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>
        <div style={{ marginLeft: 185 }} className="nav">
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            {homeState}
            {aboutState}

            {addState}
            {listState}

            <Link
              className="ml-2 text-lg text-black hover:text-blue-800 duration-500"
              to="/Contact"
            >
              Contact
            </Link>

            <div
              className={` ${matchRoute("/login") || matchRoute("/profile")}`}
              onClick={() => {
                setOpen(!open);
              }}
            >
              {pageState}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

// function DropDownItem(props) {
//   return (
//     <li className="dropdownItem">
//       <img src={props.img}></img>
//       <a>{props.text}</a>
//     </li>
//   );
// }

export default Header;
