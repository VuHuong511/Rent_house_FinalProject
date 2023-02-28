import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
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
    <div className="login">
      <div className="imgBox">
        <img src="https://images.pexels.com/photos/2826787/pexels-photo-2826787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>
      <form className="contentBox" onSubmit={onSubmit}>
        
          <div className="formBox">
          

          <h2>Log in</h2>
          <div className="inputBox">
            <span>Email</span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="inputBox">
            <span>Password</span>
            <input 
              
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
          <div className="remember">
            <label>
              <input className="mr-2" type="checkbox" /> Remember Me
            </label>
            <Link className="text-green-500" to="/forgotpassword">
              Forgot Password?
            </Link>
          </div>
          <button>
            LOG IN
          </button>
          <div className="inputBox">
            <p>
              Don't have a account?
              <Link className="text-blue-500" to="/register">
                Register
              </Link>
            </p>
          </div>
  

          <OAuth /> 
      </div>
    
      </form>
    </div>
  );
}

// import "./Login.css";

// export default function LogIn() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const { email, password } = formData;
//   const [showPassword, setShowPassword] = useState(false);
//   function onChange(e) {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.id]: e.target.value,
//     }));
//   }
//   async function onSubmit(e) {
//     e.preventDefault();
//     try {
//       const auth = getAuth();
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       if (userCredential.user) {
//         navigate("/");
//       }
//       toast.success("Login was successfully");
//       navigate("/");
//     } catch (error) {
//       toast.error("Bad user credentials");
//     }
//   }
//   return (
//     <>
//       <section className="login">
//           <form onSubmit={onSubmit}>
//         <div className="imgBox">
//           <img
//             src="https://images.pexels.com/photos/2826787/pexels-photo-2826787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//             alt=""
//           />
//         </div>
//         <div className="contentBox" >
//           <div className="formBox">
//             <h2>Login</h2>
//               <div className="inputBox">
//                 <span>Email</span>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   onChange={onChange}
//                 />
//                 {showPassword ? (
//                   <AiFillEye className="eye"
//                     onClick={() => setShowPassword((prevState) => !prevState)}
//                   />
//                 ) : (
//                   <AiFillEyeInvisible
//                     onClick={() => setShowPassword((prevState) => !prevState)}
//                   />
//                 )}
//               </div>
//               <div className="inputBox">
//                 <span>Password</span>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   onChange={onChange}
//                 />
//               </div>
//               <div className="remember">
//                 <label >
//                   <p className=" flex items-center">
//                     <input className="mr-2" type="checkbox" /> Remember Me
//                   </p>
//                   <Link className="text-green-500" to="/forgotpassword">
//                     Forgot Password?
//                   </Link>
//                 </label>
//               </div>
//               <div className="inputBox">
//                 <input type="submit" value="Log in" name="" />
//               </div>
//               <div className="inputBox">
//                 <p>
//                   Don't have a account?
//                   <Link className="text-blue-500" to="/register">
//                     Register
//                   </Link>
//                 </p>
//               </div>

//             <OAuth />
//             {/* <button>Login with Google</button> */}
//           </div>
//         </div>
//             </form>
//       </section>
//     </>
//   );
// }
