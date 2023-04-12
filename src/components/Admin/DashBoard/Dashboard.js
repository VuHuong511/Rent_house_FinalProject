import React from "react";
import "./Dashboard.css";
import InfoBox from "../../InforBox/InfoBox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;
const Dashboard = () => {
  return (
    <div>
      <h2>DashBoard</h2>
      <div className="info-box"></div>
      <InfoBox
        className="card"
        title={"Earnings"}
        count={188}
        icon={earningIcon}
      />
      <InfoBox
        className="card"
        title={"Rooms"}
        count={188}
        icon={productIcon}
      />
      <InfoBox
        className="card"
        title={"Reservation"}
        count={188}
        icon={ordersIcon}
      />
    </div>
  );
};

export default Dashboard;
