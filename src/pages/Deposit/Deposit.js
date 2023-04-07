import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectWishItems,
} from "../../redux/slice/wishListSlice";
import { selectEmail } from "../../redux/slice/authSlice";
import { selectBillingAddress } from "../../redux/slice/depositSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Deposit = () => {
  const [message, setMessage] = useState("Initializing checkout");
  const wishItems = useSelector(selectWishItems);
  const billingAddress = useSelector(selectBillingAddress);
  const email = useSelector(selectEmail);
  const [clientSecret, setClientSecret] = useState("");
  const description = `RentRoom payment: email: ${email}`;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, wishItems]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: wishItems,
        userMail: email,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      <div>{clientSecret && (<h3>{message}</h3>)()}</div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Deposit;
