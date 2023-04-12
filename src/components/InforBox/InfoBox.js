import React from "react";
import "./InfoBox.css";

const InfoBox = ({ title, count, icon }) => {
  return (
    <div className="info-box">
      <card className="card">
        <h4 style={{ color: "black" }}>{title}</h4>
        <span>
          <h3>${count}</h3>
          {icon}
        </span>
      </card>
    </div>
  );
};

export default InfoBox;
