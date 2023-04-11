import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DepositSummary from "../../components/DepositSummary/DepositSummary";
import { SAVE_BILLING_ADDRESS } from "../../redux/slice/depositSlice";

const initialAddressState = {
  name: "",
  email: "",
  address: "",
  phone_number: "",
};

const CheckoutDetails = () => {
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate("/deposit");
  };

  return (
    <section>
      <div>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {/* BILLING ADDRESS */}
            <card>
              <h3>Billing Address</h3>
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={billingAddress.email}
                onChange={(e) => handleBilling(e)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                name="phone_number"
                value={billingAddress.phone_number}
                onChange={(e) => handleBilling(e)}
              />

              <input
                type="text"
                placeholder="Address"
                required
                name="address"
                value={billingAddress.country}
                onChange={(e) => handleBilling(e)}
              />
              <button type="submit" className="text-black">
                Proceed To Checkout
              </button>
            </card>
          </div>
          <div>
            <card>
              <DepositSummary />
            </card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
