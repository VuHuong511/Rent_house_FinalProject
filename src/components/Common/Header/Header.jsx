import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/img/Logo.png";
import User from "../../../assets/img/user.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_USER } from "../../../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../../../redux/slice/authSlice";
import { CALCULATE_TOTAL_QUANTITY } from "../../../redux/slice/wishListSlice";
import { toast } from "react-toastify";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
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
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);
  const wishList = (
    <span className="wishList">
      <Link to="/wishlist">Wish List</Link>
    </span>
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
        setPageState(
          <img
            className="w-[50px] h-[50px]"
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
          <div
            style={{ fontWeight: 600 }}
            className="ml-4 text-lg text-black hover:text-blue-800 focus:text-blue-800 duration-500"
          >
            {wishList}
          </div>
        );
        setListState(
          <Link
            style={{ fontWeight: 600 }}
            className="ml-4 text-xl text-black hover:text-blue-800 focus:text-blue-800 duration-500"
            to="/reservation-history"
          >
            Reservation history
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
            userName: user.displayName ? user.displayName : displayName,
            email: user.email,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER);
        setPageState(
          <Link to="/login" style={{ fontWeight: 600 }}>
            <button style={{ marginLeft: 265 }}>
              <i className="fa fa-sign-in"></i>Login
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
  }, [auth, dispatch, displayName]);
  function matchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  const [open, setOpen] = useState(false);
  function onLogout() {
    auth.signOut();
    toast.success("Logged out");
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
              <Link to="homeLogin">
                <img src={Logo} alt="/logo" />
              </Link>
            </div>
          </span>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>
        <div className="nav">
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            {homeState}
            {aboutState}
            {addState}
            {listState}
            {contactState}
            {pageState}
          </ul>
          {openProfile && (
            <div className="flex flex-col dropDownProfile">
              <ul className="flex flex-col gap-4 ">
                <Link
                  onClick={() => setOpenProfile(false)}
                  className="hover:text-blue-800 flex"
                  to="/profile"
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
                <Link
                  onClick={() => {
                    setOpenProfile(false);
                    onLogout();
                  }}
                  className="hover:text-blue-800 flex"
                  to="/"
                >
                  <FaSignOutAlt className="mr-2" />
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
