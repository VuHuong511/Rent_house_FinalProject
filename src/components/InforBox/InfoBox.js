import React from "react";
import "./InfoBox.css";

const InfoBox = ({ title, count, icon }) => {
  return (
    <div class="info-box sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div class="card bg-white shadow-lg p-4">
        <h4 class="text-black">{title}</h4>
        <div class="flex items-center justify-between mt-4">
          <h3 class="text-2xl font-bold">{count}</h3>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
