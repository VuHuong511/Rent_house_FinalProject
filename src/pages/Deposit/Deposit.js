import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectWishItems,
} from "../../redux/slice/wishListSlice";
import { selectEmail } from "../../redux/slice/authSlice";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { selectBillingAddress } from "../../redux/slice/depositSlice";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Deposit = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");
  const billingAddress = useSelector(selectBillingAddress);
  const wishItems = useSelector(selectWishItems);
  const customerEmail = useSelector(selectEmail);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, wishItems]);

  const description = `payment: email: ${customerEmail}`;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        billing: billingAddress,
        userEmail: customerEmail,
        items: wishItems,
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
        console.log(error);
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
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Deposit;
