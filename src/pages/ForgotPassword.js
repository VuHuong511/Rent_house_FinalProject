import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import login from "../assets/img/login.jpg";

export default function ForgotPassword() {
  const [email, setEmail] = useState();
  function onChange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e){
    e.preventDefault()
    try{
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent")
    }catch(error){
      toast.error("could not send reset password ")
    }
  }
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-screen object-cover" src={login} alt="" />
      </div>

        <form  onSubmit={onSubmit}>
      <div className="bg-gray-800 flex flex-col justify-center">
          <h2 className="text-4xl text-white font-bold text-center">
            FORGOT PASSWORD
          </h2>

          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="flex justify-between text-gray-500 py-2">
            <p className="text-white">
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

          <div
            className="flex items-center my-4 before:border-t 
          before:flex-1 before:border-gray-300 after:border-gray-300
          after:border-t after:flex-1
          after:border-gray-300"
          >
            <p className="text-center text-white font-semibold mx-4">OR</p>
          </div>
          <button className="w-full my-5 py-2 bg-red-500">
            <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
            CONTINUE WITH GOOGLE
          </button>
      </div>
        </form>
    </div>
  );
}
