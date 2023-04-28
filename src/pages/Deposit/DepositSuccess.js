import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const DepositSuccess = () => {
  return (
    <section className="px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 m-auto w-max flex">
          <BsFillCheckCircleFill className="text-green-500 mr-3" />
          Checkout Successfully
        </h2>
        <div className="bg-white shadow sm:rounded-lg p-6">
          <p className="text-lg text-gray-800 mb-4 m-auto w-max">
            Your deposit was successfully submitted.
          </p>
          <Link to="/reservation-history">
            <div className="m-auto w-max">
              <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 m-auto w-max sm:w-auto">
                View Deposit Status
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DepositSuccess;
