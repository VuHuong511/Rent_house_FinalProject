import React from "react";
import { Link } from "react-router-dom";

const DepositSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Checkout Successfully</h2>
        <br />
        <Link to="/deposit-history">
          <button>View Deposit Status</button>
        </Link>
      </div>
    </section>
  );
};

export default DepositSuccess;
