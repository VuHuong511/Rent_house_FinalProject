import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/img/login.jpg";
import { signInWithEmailAndPassword, getAuth  } from "firebase/auth";
import {toast } from "react-toastify"

export default function LogIn() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e){
    e.preventDefault()
    try{
      const auth = getAuth();
      const userCredential =  await signInWithEmailAndPassword(auth, 
        email, password);
        if(userCredential.user){
          navigate("/")
        }
          toast.success("Login was successfully");
          navigate("/")
        
    } catch (error){
      toast.error("Bad user credentials")

    }
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-screen object-cover" src={login} alt="" />
      </div>
      <form onSubmit={onSubmit}>
        <div className="bg-gray-800 flex flex-col justify-center">
          <h2 className="text-4xl text-white font-bold text-center">LOG IN</h2>
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
          <div className="flex flex-col text-gray-400 py-2 relative">
            <label>Password</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={onChange}
            />
            {showPassword ? (
              <AiFillEye
                className="absolute right-3 top-12 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            ) : (
              <AiFillEyeInvisible
                className="absolute right-3 top-12 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            )}
          </div>
          <div className="flex justify-between text-gray-500 py-2">
            <p className=" flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <Link className="text-green-500" to="/forgotpassword">
              Forgot Password?
            </Link>
          </div>
          <button className="w-full my-5 py-2 bg-teal-500 text-white font-bold">
            LOG IN
          </button>

          <div className="text-white">
            <p>
              Don't have a account?
              <Link className="text-blue-500" to="/register">
                Register
              </Link>
            </p>
          </div>
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
