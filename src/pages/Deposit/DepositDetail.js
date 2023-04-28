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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

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
        <form onSubmit={handleSubmit} className="">
          <div className="container-xl">
            <div className="card mb-4">
              <div className="row " style={{ display: "flex" }}>
                <div className="w-2/4 m-9 border-r-2 border-solid">
                  <h1 className="text-3xl text-center font-bold">
                    Billing Address
                  </h1>
                  <div className="col-md-4 w-max m-auto">
                    <label>Your Name</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      style={{
                        padding: 7,
                        borderRadius: 10,
                        border: "1px solid",
                        width: 300,
                      }}
                      name="name"
                      value={billingAddress.name}
                      onChange={(e) => handleBilling(e)}
                    />
                  </div>
                  <div className="col-md-4 w-max m-auto">
                    <label>Email</label>
                    <br />
                    <input
                      style={{
                        padding: 7,
                        borderRadius: 10,
                        border: "1px solid",
                        width: 300,
                      }}
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={billingAddress.email}
                      onChange={(e) => handleBilling(e)}
                    />
                  </div>
                  <div className="col-md-4 w-max m-auto">
                    <label>Phone number</label>
                    <br />
                    <input
                      style={{
                        padding: 7,
                        borderRadius: 10,
                        border: "1px solid",
                        width: 300,
                      }}
                      type="tel"
                      placeholder="Phone Number"
                      required
                      name="phone_number"
                      value={billingAddress.phone_number}
                      onChange={(e) => handleBilling(e)}
                    />
                  </div>
                  <div className="col-md-4 w-max m-auto">
                    <label>Address</label>
                    <br />
                    <input
                      style={{
                        padding: 7,
                        borderRadius: 10,
                        border: "1px solid",
                        width: 300,
                      }}
                      type="text"
                      placeholder="Address"
                      required
                      name="address"
                      value={billingAddress.country}
                      onChange={(e) => handleBilling(e)}
                    />
                  </div>
                  <div className="col-md-4 w-max m-auto mt-5">
                    <button
                      style={{
                        padding: 7,
                        borderRadius: 10,
                        border: "1px solid",
                        margin: "auto",
                        width: 300,
                      }}
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
                <div className="w-2/4 m-9">
                  <DepositSummary />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
