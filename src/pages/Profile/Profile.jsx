import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { selectUsername } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";

export default function Profile() {
  const userName = useSelector(selectUsername);
  const [changeProfile, setChangeProfile] = useState(false);
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: userName,
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
      if (userName !== name) {
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
              <h1
                style={{ paddingLeft: 175 }}
                onClick={() => {
                  changeProfile && onsubmit();
                  setChangeProfile((prevState) => !prevState);
                }}
              >
                {changeProfile ? "Change" : "Edit"}
              </h1>
            </p>
          </div>
          <div className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">
            <Link to="/create" className="flex justify-center items-center">
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Rent your room
            </Link>
            <Link to="/myListing" className="flex justify-center items-center">
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              My Rooms
            </Link>
            <Link
              to="/my-reservation"
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              My Reservation
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
