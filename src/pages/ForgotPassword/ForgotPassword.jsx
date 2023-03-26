import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./ForgotPassword.css";
import OAuth from "../../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState();
  function onChange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("could not send reset password ");
    }
  }
  return (
    <div className="forgotpassword">
      <div className="imgBox">
        <img
          src="https://i.pinimg.com/564x/9c/e4/06/9ce406e968f27c0128f8ee51308aebb0.jpg"
          alt=""
        />
      </div>

      <form className="contentBox" onSubmit={onSubmit}>
        <div className="formBox">
          <h2>FORGOT PASSWORD</h2>
          <div className="inputBox">
            <span>Email</span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="flex justify-between text-gray-500 py-2">
            <p style={{ fontSize: 15 }}>
              Don't have a account?
              <Link className="text-blue-500" to="/register">
                Register
              </Link>
            </p>

            <Link className="text-green-500" to="/login">
              Sign in instead
            </Link>
          </div>
          <button className="w-full my-5 py-2 bg-teal-500 text-white font-bold">
            RESET PASSWORD
          </button>

          <OAuth />
        </div>
      </form>
    </div>
  );
}
