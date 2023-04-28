import React from "react";
import { footer } from "../../data";
import "./Footer.css";
import Logo from "../../../assets/img/Logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <section className="footerContact">
        <div className="container">
          <div
            style={{ justifyContent: "space-between" }}
            className="send flex"
          >
            <div className="text">
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
            <Link to="/contact">
              <button className="btn5">Contact Us Today</button>
            </Link>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="">
            <div className="">
              <img src={Logo} alt="" />
              <h2>Do You Need Help With Anything?</h2>
              <p>
                Receive updates, hot deals, tutorials, discounts sent straignt
                in your inbox every month
              </p>
              <div className="input flex">
                <input type="text" placeholder="Email Address" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
          {footer.map((val) => (
            <div className="box">
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className="legal">
        <span>© 2023 RentRoom. Designed By VuHuong.</span>
      </div>
    </>
  );
};

export default Footer;
