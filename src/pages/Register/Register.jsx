import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css"
import OAuth from "../../components/OAuth";
import { app, db } from "../../firebase";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  console.log(name);
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Register was successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
    //   <div className="hidden sm:block">
    //     <img className="w-full h-screen object-cover" src={login} alt="" />
    //   </div>

    //   <form onSubmit={onSubmit}>
    //     <div className="bg-gray-800 flex flex-col justify-center">
    //       <h2 className="text-4xl text-white font-bold text-center">
    //         REGISTER
    //       </h2>

    //       <div className="flex flex-col text-gray-400 py-2">
    //         <label>User Name</label>
    //         <input
    //           className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
    //           type="text"
    //           id="name"
    //           value={name}
    //           onChange={onChange}
    //         />
    //       </div>
    //       <div className="flex flex-col text-gray-400 py-2">
    //         <label>Email</label>
    //         <input
    //           className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
    //           type="email"
    //           id="email"
    //           value={email}
    //           onChange={onChange}
    //         />
    //       </div>
    //       <div className="flex flex-col text-gray-400 py-2 relative">
    //         <label>Password</label>
    //         <input
    //           className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
    //           type={showPassword ? "text" : "password"}
    //           id="password"
    //           value={password}
    //           onChange={onChange}
    //         />
    //         {showPassword ? (
    //           <AiFillEyeInvisible
    //             className="absolute right-3 top-12 text-xl cursor-pointer"
    //             onClick={() => setShowPassword((prevState) => !prevState)}
    //           />
    //         ) : (
    //           <AiFillEye
    //             className="absolute right-3 top-12 text-xl cursor-pointer"
    //             onClick={() => setShowPassword((prevState) => !prevState)}
    //           />
    //         )}
    //       </div>
    //       <div className="flex justify-between text-gray-500 py-2">
    //         <p className="text-white">
    //           Have a account?
    //           <Link className="text-blue-500" to="/login">
    //             Log in
    //           </Link>
    //         </p>
    //         <Link className="text-green-500" to="/forgotpassword">
    //           Forgot Password?
    //         </Link>
    //       </div>
    //       <button className="w-full my-5 py-2 bg-teal-500 text-white font-bold">
    //         REGISTER
    //       </button>

    //     </div>
    //   </form>
    // </div>

    <>
      <section className="register">
        <div className="imgBox">
          <img
            src="https://images.pexels.com/photos/2826787/pexels-photo-2826787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="contentBox">
          <div className="formBox">
            <h2>Register</h2>
            <form  onSubmit={onSubmit}>
            <div className="inputBox">
                <span>User name</span>
                <input
                  type="text"
                  value={name}
                  id="name"
                  onChange={onChange}
                />
              </div>
              <div className="inputBox">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  id="email"
                  onChange={onChange}
                />
              </div>
              <div className="inputBox">
                <span>Password</span>
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={onChange}
                  value ={password}
                  id="password"
                />
                {showPassword ? (
                  <AiFillEye
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                )}
              </div>
              <div className="remember">
                <label>
                  <p className=" flex items-center">
                    <input className="mr-2" type="checkbox" /> Remember Me
                  </p>
                </label>
              </div>
              <div className="inputBox">
                <input type="submit" value="Register" name="" />
              </div>
              <div className="inputBox">
                <p>
                  Have a account?
                  <Link className="text-blue-500" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
