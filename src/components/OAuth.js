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
      navigate("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
    }
  }
  return (
    <div>
      <div
        className="flex items-center my-4 before:border-t 
          before:flex-1 before:border-black after:border-black
          after:border-t after:flex-1"
      >
        <p className="text-center text-black font-semibold mx-4">OR</p>
      </div>
      <button
        style={{ backgroundColor: "red" }}
        type="button"
        onClick={onGoogleClick}
        className="flex uppercase"
      >
        <FcGoogle className="text-2xl  bg-white rounded-full" />
        Continue with Google
      </button>
    </div>
  );
}
