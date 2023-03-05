import { getAuth, updateProfile } from "firebase/auth";
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import "./Profile.css"
import { useNavigate } from "react-router-dom";
import ListingItem from "../../components/ListingItem";

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
