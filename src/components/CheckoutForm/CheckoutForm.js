import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import DepositSummary from "../DepositSummary/DepositSummary";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectUserID,
  selectUsername,
} from "../../redux/slice/authSlice";
import {
  CLEAR_WISH_LIST,
  selectWishItems,
  selectWishListTotalAmount,
} from "../../redux/slice/wishListSlice";
import { selectBillingAddress } from "../../redux/slice/depositSlice";
import { db } from "../../firebase/firebase";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const userName = useSelector(selectUsername);
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const wishListItems = useSelector(selectWishItems);
  const billingAddress = useSelector(selectBillingAddress);
  const wishListTotalPrice = useSelector(selectWishListTotalAmount);
  const save = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const reservationConfig = {
      userID,
      userName,
      userEmail,
      reservationDate: date,
      reservationTime: time,
      reservationAmount: wishListTotalPrice,
      reservationStatus: "Reservation Placed...",
      wishListItems,
      billingAddress,
      timestamp: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reservation"), reservationConfig);
      toast.success("Reservation Saved");
      dispatch(CLEAR_WISH_LIST());
      navigate("/deposit-success");
    } catch (error) {
      toast.error(error.message);
    }
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
        redirect: "if_required",
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
    <section className="px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 m-auto w-max">
          Checkout
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <DepositSummary />
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Stripe checkout
              </h3>
              <PaymentElement />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {message && (
                <div
                  id="payment-message"
                  className="text-sm text-gray-500 mt-2"
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default CheckoutForm;
