import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import "./Profile.css";
import { Link } from "react-router-dom";
import { selectUsername } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import useFetchCollection from "../../hooks/useFetchCollection";
export default function Profile() {
  const userName = useSelector(selectUsername);
  const [changeProfile, setChangeProfile] = useState(false);
  const auth = getAuth();
  const { data } = useFetchCollection("reviews");
  console.log(data);
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
          <div className="inputBox">
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-4">
              <Link
                to="/create"
                className="group p-2 bg-black rounded-full hover:bg-black transition duration-1000 ease-out flex"
              >
                <i className="fas fa-plus text-white"></i>
                <span className="hidden group-hover:block text-white">
                  Create Room
                </span>
              </Link>
              <Link
                to="/myListing"
                className="group p-2 bg-black rounded-full hover:bg-black transition duration-1000 ease-out flex"
              >
                <i className="fas fa-bed text-white"></i>
                <span className="hidden group-hover:block text-white">
                  My Rooms
                </span>
              </Link>
              <Link
                to="/my-reservation"
                className="group p-2 bg-black rounded-full hover:bg-black transition duration-1000 ease-out flex"
              >
                <i className="fas fa-calendar-check text-white"></i>
                <span className="hidden group-hover:block text-white">
                  Reservations
                </span>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
