import React from "react";
import Back from "../Common/Back";
import Heading from "../Common/Heading";
import img from "../images/about.jpg";
import "./about.css";

const About = () => {
  return (
    <>
      <section className="about">
        <Back name="About Us" title="About Us - Who We Are?" cover={img} />
        <div className="container flex mtop">
          <div className="left row">
            <Heading
              title="Welcome to Rent Room App"
              subtitle="Check out our organization story and work process"
            />
            <p>
              Our mission is to provide a seamless and convenient platform for
              users to rent and book rooms of their choice. We understand the
              challenges of finding affordable and comfortable accommodation in
              a new city, and that's why we have created a reliable and
              easy-to-use platform that offers a wide range of options for every
              budget. Our team is dedicated to ensuring that our users have a
              stress-free experience from start to finish.
            </p>
            <button className="btn2">More About Us</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
