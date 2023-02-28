import React, { useEffect, useState } from "react"
import "./Header.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { nav } from "../../data"
import Logo from "../../../assets/img/Logo.png"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const Header = () => {
  const [navList, setNavList] = useState(false)
  const [pageState, setPageState] = useState("login")
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect
  (() => {
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
    <>
      <header>
        <div className='container flex'>
          <div className="logo">
          <img src={Logo} alt='' />
          </div>
          <div className='nav'>
            {/* <li className={"${matchRoute("/")}"}
             onClick={() => navigate("/")}
            > */}
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
            {/* </li> */}
          </div>

          <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (matchRoute("/sign-in") || matchRoute("/profile")) &&
                "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
{/* 
            <li className={'${ (matchRoute("/login") || matchRoute("/profile"))}'}
            onClick={() => navigate("/profile")} >   {pageState}
              <Link to="/login">
          <div className='button flex'>
            <button className='btn1'>
              <i className='fa fa-sign-in'></i> Sign In
            </button>
          </div>
              </Link>
              </li> */}


          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header