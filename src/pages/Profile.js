import { getAuth } from "firebase/auth";
import { Input } from "postcss";
import React,  { useState } from "react";
import { Form, Link } from "react-router-dom";
import OAuth from "../components/OAuth";


export default function Profile() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name, email} = formData;
  return (

  
    <form>
  <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
    <div className="w-full md:w-[50%] mt-6 px-3">
        <div className="bg-gray-800 flex flex-col justify-center">
          <h2 className="text-4xl text-white font-bold text-center">
            MY PROFILE
          </h2>

          <div className="flex flex-col text-gray-400 py-2">
            <label>User Name</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              id="name"
              value={name}
              />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
              id="email"
              value={email}
              
              />
          </div>
      
          <div className="flex justify-between text-gray-500 py-2">
            <p className="text-white">
              Do you want to edit profile ?
              <Link className="text-blue-500" to="/login">
                edit
              </Link>
            </p>
          </div>
          <button className="w-full my-5 py-2 bg-teal-500 text-white font-bold">
            RENT YOUR HOME
          </button>
          
        </div>
    </div>
  </section>
      </form>
              
  )
}
