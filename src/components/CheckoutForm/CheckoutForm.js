import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import DepositSummary from "../DepositSummary/DepositSummary";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const save = () => {
    console.log("Saved");
  };
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/deposit-success",
        },
        redirect_url: "if_required",
      })
      .then((result) => {
        // ok - payment intent is bad - error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            toast.success("Payment success");
            save();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <section>
      <div className="checkout">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <card className="card">
              <DepositSummary />
            </card>
          </div>
          <div>
            <card className="pay">
              <h3>Stripe checkout</h3>
              <PaymentElement />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="button"
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {message && <div id="payment-message">{message}</div>}
            </card>
          </div>
        </form>
      </div>
    </section>
  );
};
export default CheckoutForm;
