// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvke3lqkvcr1Ka74im8Em2RbZJsEFoobw",
  authDomain: "rent-house-c5660.firebaseapp.com",
  projectId: "rent-house-c5660",
  storageBucket: "rent-house-c5660.appspot.com",
  messagingSenderId: "554368710373",
  appId: "1:554368710373:web:d76c27cb04425658e5860c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const Functions = getFunctions();
