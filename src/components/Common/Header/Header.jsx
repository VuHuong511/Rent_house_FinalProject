import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/img/Logo.png";
import User from "../../../assets/img/user.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../../../redux/slice/authSlice";
import AdminOnlyRoute from "../../AdminOnlyRoute/AdminOnlyRoute";

const Header = () => {
  const [pageState, setPageState] = useState("login");
  const [homeState, setHomeState] = useState("login");
  const [aboutState, setAboutState] = useState("login");
  const [addState, setAddState] = useState("login");
  const [listState, setListState] = useState("login");
  const [contactState, setContactState] = useState("login");

  const [openProfile, setOpenProfile] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState(
          <img
            className="w-[50px] h-[50px] ml-[300px]"
            onClick={() => setOpenProfile((prev) => !prev)}
            src={User}
          ></img>
        );
        setHomeState(
          <Link
            style={{ fontWeight: 600 }}
            className="cursor-pointer ml-4 text-lg text-black hover:text-blue-800 focus:text-blue-800 duration-500"
            to="/homeLogin"
          >
            Home
          </Link>
        );
        setAboutState(
          <Link
            style={{ fontWeight: 600 }}
            className="cursor-pointer ml-4 text-lg text-black hover:text-blue-800 focus:text-blue-800 duration-500"
            to="/offers"
          >
            Offers
          </Link>
        );
        setAddState(
          <Link
            style={{ fontWeight: 600 }}
            className="ml-4 text-lg text-black hover:text-blue-800 focus:text-blue-800 duration-500"
            to="/create"
          >
            Create room
          </Link>
        );
        setListState(
          <Link
            style={{ fontWeight: 600 }}
            className="ml-4 text-lg text-black hover:text-blue-800 focus:text-blue-800 duration-500"
            to="/myListing"
          >
            My Rooms
          </Link>
        );
        setContactState(
          <Link
            style={{ fontWeight: 600 }}
            className="ml-4 text-xl text-black hover:text-blue-800 focus:text-blue-800 duration-500"
            to="/contact"
          >
            Contact
          </Link>
        );
        dispatch(
          SET_ACTIVE_USER({
            username: user.displayName,
            email: user.email,
            useID: user.uid,
          })
        );
      } else {
        dispatch(REMOVE_ACTIVE_USER);
        setPageState(
          <Link to="/login" style={{ fontWeight: 600 }}>
            <button style={{ marginLeft: 265 }} className="btn1">
              <i className="fa fa-sign-in"></i> Sign In
            </button>
          </Link>
        );
        setHomeState(
          <Link
            style={{ fontWeight: 600 }}
            className="ml-4 text-lg text-black hover:text-blue-800 focus:text-blue-800 duration-500"
            to="/"
          >
            Home
          </Link>
        );
        setAboutState(
          <Link
            style={{ fontWeight: 600 }}
            className="ml-4 text-lg text-black hover:text-blue-800 focus:text-blue-800 duration-500"
            to="/about"
          >
            About
          </Link>
        );
        setAddState(
          <Link
            style={{ fontWeight: 600 }}
            className="ml-4 text-lg text-black hover:text-blue-800 focus:text-blue-800 duration-500"
            to="/services"
          >
            Service
          </Link>
        );
        setListState(
          <Link
            style={{ fontWeight: 600 }}
            className="ml-4 text-lg text-black hover:text-blue-800 focus:text-blue-800 duration-500"
            to="/property"
          >
            Property
          </Link>
        );
        setContactState(
          <Link
            style={{ fontWeight: 600 }}
            className="ml-4 text-lg text-black hover:text-blue-800 focus:text-blue-800 duration-500"
            to="/contact"
          >
            Contact
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

  const [open, setOpen] = useState(false);

  function onLogout() {
    auth.signOut();
    navigate("/");
  }

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
            <li>
              <AdminOnlyRoute>
                <button>Admin</button>
              </AdminOnlyRoute>
            </li>
            {homeState}
            {aboutState}
            {addState}
            {listState}
            {contactState}
            <div
              className={` ${matchRoute("/login") || matchRoute("/profile")}`}
            >
              {pageState}
            </div>
          </ul>
          {openProfile && (
            <div className="flex flex-col dropDownProfile">
              <ul className="flex flex-col gap-4 ">
                <Link
                  onClick={() => setOpenProfile(false)}
                  className="hover:text-blue-800"
                  to="/profile"
                >
                  Profile
                </Link>
                <Link
                  onClick={() => {
                    setOpenProfile(false);
                    onLogout();
                  }}
                  className="hover:text-blue-800"
                  to="/"
                >
                  Log out
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
