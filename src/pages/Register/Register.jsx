import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";
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
    <>
      <div className="register">
        <div className="imgBox">
          <img
            src="https://i.pinimg.com/564x/be/39/1e/be391e9ee5597ebe5ecd53182c3792f2.jpg"
            alt=""
          />
        </div>
        <form className="contentBox" onSubmit={onSubmit}>
          <div className="formBox">
            <h2>REGISTER</h2>
            <div className="inputBox">
              <span>User name</span>
              <input type="text" value={name} id="name" onChange={onChange} />
            </div>
            <div className="inputBox">
              <span>Email</span>
              <input
                type="email"
                value={email}
                id="email"
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
            <div style={{ margin: 5 }}>
              <input
                className="form-control"
                type="checkbox"
                required
                style={{ width: 20 }}
              />
              <label style={{ fontSize: 17, marginTop: 5, paddingLeft: 7 }}>
                I agree to <strong>terms</strong> and{" "}
                <strong>conditions</strong>
              </label>
            </div>
            <div className="inputBox">
              <input type="submit" value="REGISTER" />
            </div>
            <div className="inputBox">
              <p>
                Have a account?
                <Link className="pl-1" to="/login">
                  <strong>Login</strong>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
