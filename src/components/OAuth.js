import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //check for the user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/login");
    } catch (error) {
      toast.error("Could not authorize with Google");
      console.log(error);
    }
  }
  return (
    <div>
      <div
        className="flex items-center my-4 before:border-t 
          before:flex-1 before:border-gray-300 after:border-gray-300
          after:border-t after:flex-1
          after:bordeer-gray-300"
      >
        <p className="text-center text-white font-semibold mx-4">OR</p>
      </div>
      <button
        type="button"
        onClick={onGoogleClick}
        className="w-full my-5 py-2 bg-red-500"
      >
        <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
        CONTINUE WITH GOOGLE
      </button>
    </div>
  );
}
