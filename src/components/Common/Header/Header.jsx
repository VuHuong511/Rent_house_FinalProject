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
  // const [open, setOpen] = useState(false);

  // let menuRef = useRef();

  // useEffect(() => {
  //   let handler = (e)=>{
  //     if(!menuRef.current.contains(e.target)){
  //       setOpen(false);
  //       console.log(menuRef.current);
  //     }
  //   };

  //   document.addEventListener("mousedown", handler);

  //   return() =>{
  //     document.removeEventListener("mousedown", handler);
  //   }

  // });

  const [navList, setNavList] = useState(false);
  const [pageState, setPageState] = useState("login");
  const location = useLocation();

  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState(
          // <div className="menu-trigger" onClick={()=>{setOpen(!open)}}>

          <img className="imgUser" src={User}></img>
          // </div>
        );
      } else {
        setPageState(
          <Link to="/login">
            <div className="button flex">
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="btn1"
              >
                <i className="fa fa-sign-in"></i> Sign In
              </button>
            </div>
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

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img className="" src={Logo} alt="" />
          </div>
          <div className="nav">
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

          <div className="App">
            <div className="menu-container" ref={menuRef}>
              {/* <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={User}></img>
        </div> */}

              <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
                <ul onClick={() => navigate("/profile")}>
                  <DropDownItem img={User} text={"My Profile"} />
                </ul>

                <ul onClick={() => navigate("/create")}>
                  <DropDownItem img={Offer} text={"Add new room"} />
                </ul>

                <ul onClick={() => navigate("/listing")}>
                  <DropDownItem img={Offer} text={"Offer"} />
                </ul>

                <ul onClick={onLogout}>
                  <DropDownItem img={Logout} text={"Logout"} />
                </ul>
              </div>
            </div>
          </div>

          <div
            className={` ${matchRoute("/login") || matchRoute("/profile")}`}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {pageState}
          </div>

          {/* <li className={'${ (matchRoute("/login") || matchRoute("/profile"))}'}
            onClick={() => navigate("/profile")} >   {pageState}
        
              </li> */}

          {/* <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
         
          <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
            <ul>
              <DropDownItem img = {User} text = {"My profile"}/>
              <DropDownItem img = {Offer} text = {"Offer"}/>
              <DropDownItem img = {Logout} text = {"Logout"}/>
            </ul>
          </div> */}
        </div>
      </header>
    </>
  );
};

function DropDownItem(props) {
  return (
    <li className="dropdownItem">
      <img src={props.img}></img>
      <a>{props.text}</a>
    </li>
  );
}

export default Header;
