import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import "./Profile.css"

export default function Profile() {
  const [changeProfile, setChangeProfile] = useState(false);
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onsubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth.currentUser, { displayName: name });
        //update the name in store
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("profile updated successfully");
    } catch (error) {
      toast.error("Could not update the profile");
    }
  }
  return (
    //   <form>
    // <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
    //   <div className="w-full md:w-[50%] mt-6 px-3">
    //       <div className="bg-gray-800 flex flex-col justify-center">
    //         <h2 className="text-4xl text-white font-bold text-center">
    //           MY PROFILE
    //         </h2>

    //         <div className="flex flex-col text-gray-400 py-2">
    //           <label>User Name</label>
    //           <input
    //             className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
    //             type="text"
    //             id="name"
    //             value={name}
    //             disabled={!changeProfile}
    //             onChange= {onChange}
    //             />
    //         </div>
    //         <div className="flex flex-col text-gray-400 py-2">
    //           <label>Email</label>
    //           <input
    //             className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
    //             type="email"
    //             id="email"
    //             value={email}

    //             />
    //         </div>

    //         <div className="flex justify-between text-gray-500 py-2">
    //           <p className="text-blue">
    //             Do you want to edit profile ?
    //             <div onClick={() => {changeProfile && onsubmit()
    //             setChangeProfile((prevState) => !prevState )}}
    //             >
    //               {changeProfile ? "Change": "Edit"}
    //             </div>
    //           </p>
    //         </div>
    //         <button className="w-full my-5 py-2 bg-teal-500 text-white font-bold">
    //           RENT YOUR HOME
    //         </button>

    //       </div>
    //   </div>
    // </section>
    //     </form>

    <div className="profile">
      <form className="contentBox">
        <div className="formBox">
          <h2>My Profile</h2>
          <div className="inputBox">
            <span>User Name</span>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeProfile}
              onChange={onChange}
            />
          </div>
          <div className="inputBox">
            <span>Email</span>
            <input type="email" id="email" value={email} />
          </div>
          <div className="inputBox">
            <p>
              Do you want to edit profile?
              <div
                onClick={() => {
                  changeProfile && onsubmit();
                  setChangeProfile((prevState) => !prevState);
                }}
              >
                {changeProfile ? "Change" : "Edit"}
              </div>
              {/* <Link className="text-blue-500" to="/register">
            Register
          </Link> */}
            </p>
          </div>
          {/* <button onClick={() => {changeProfile && onsubmit() 
      setChangeProfile((prevState) => !prevState )}}>
        {changeProfile ? "Change": "Edit"}
      </button> */}
        </div>
      </form>
    </div>
  );
}
