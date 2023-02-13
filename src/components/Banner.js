import React from "react";

// import image
import Image from "../assets/img/banner2.jpg";

//import component
import Search from "../components/Search";

const Banner = () => {
  return (
    <section className="h-full max-h-[640px] mb-8 xl:mb-24">
      <div className="flex flex-col lg:flex-row">
        <div
          className="lg:ml-8 xl:ml[135px] flex flex-col
        items-center lg:items-start text-center lg:text-left
        justify-center flex-1 px-4 lg:px-0"
        >
          <h1 className="text-4xl lg:text-[58px] font-semibold leading-non mb-6">
            <span className="text-blue-700">Rent</span> Your Dream House With
            Us.
          </h1>
          <p className="max-w-[480px] mb-8">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam,
            laborum amet incidunt consequuntur eligendi labore! In eos a,
            corrupti unde doloribus fuga qui porro laudantium doloremque itaque
            dolorum earum. Assumenda.
          </p>
        </div>
        {}
        <div
          className="hidden flex-1 lg:flex 
        justify-end items-end"
        >
          <img src={Image} alt="" />
        </div>
      </div>
      <Search />
    </section>
  );
};

export default Banner;
