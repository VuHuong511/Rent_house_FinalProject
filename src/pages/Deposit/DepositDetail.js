import { useState } from "react";
import { SAVE_BILLING_ADDRESS } from "../../redux/slice/depositSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Deposit from "./Deposit";
import DepositSummary from "../../components/DepositSummary/DepositSummary";
const initialAddressState = {
  name: "",
  email: "",
  phone_number: "",
  address: "",
};

const DepositDetail = () => {
  const navigate = useNavigate();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const dispatch = useDispatch();

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      SAVE_BILLING_ADDRESS({
        billingAddress,
      })
    );
    navigate("/deposit");
  };

  return (
    <section>
      <div className="">
        <h2>Deposit Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <>
              <h3>Billing Address</h3>
              <label>Full name</label>
              <input
                type="text"
                placeholder="Full name"
                required
                name="name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="Email address"
                required
                name="email"
                value={billingAddress.email}
                onChange={(e) => handleBilling(e)}
              />
              <label>Phone number</label>
              <input
                type="tel"
                placeholder="Phone number"
                name="phone_number"
                value={billingAddress.phone_number}
                onChange={(e) => handleBilling(e)}
              />
              <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                required
                name="address"
                value={billingAddress.address}
                onChange={(e) => handleBilling(e)}
              />
            </>

            <button type="submit">Proceed To Checkout</button>
          </div>
          <card>
            <DepositSummary />
          </card>
        </form>
      </div>
    </section>
  );
};

export default DepositDetail;
