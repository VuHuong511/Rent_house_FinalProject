import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import OAuth from "../../components/OAuth";
import "./Login.css";

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
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user && user.email === "admin2@gmail.com") {
        toast.success("Welcome Admin");
        navigate("/admin/dashboard");
      } else {
        toast.success("Login successfully");
        navigate("/homeLogin");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  }
  return (
    <div className="login">
      <div className="imgBox">
        <img
          src="https://i.pinimg.com/564x/fb/d1/b7/fbd1b7c8e51247cd11f7ce5784465db8.jpg"
          alt=""
        />
      </div>
      <form className="contentBox" onSubmit={onSubmit}>
        <div className="formBox" style={{ marginTop: 50 }}>
          <h2>Log in</h2>
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
          <div className="inputBox">
            <span>Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={onChange}
                value={password}
                id="password"
                required
              />
              {showPassword ? (
                <AiFillEye
                  className="absolute right-4 top-4 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="absolute right-4 top-4 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
          </div>
          <div className="remember">
            <div>
              <input
                className="form-control"
                type="checkbox"
                style={{ width: 20 }}
              />
              <label style={{ fontSize: 15, marginTop: 5, paddingLeft: 7 }}>
                Remember me
              </label>
            </div>
            <Link className="text-blue-500" to="/forgotpassword">
              Forgot Password?
            </Link>
          </div>
          <button>LOG IN</button>
          <div>
            <p style={{ fontSize: 15 }}>
              Don't have a account?
              <Link className="text-blue-500 pl-1" to="/register">
                <strong>Register</strong>
              </Link>
            </p>
          </div>
          <OAuth />
        </div>
      </form>
    </div>
  );
}
