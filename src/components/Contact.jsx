import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    }
    getLandlord();
  }, [userRef]);
  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p className="mt-6 text-lg">
            Contact <strong>{landlord.name}</strong> about{" "}
            {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              style={{ border: "1px solid" }}
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="w-full p-2 text-base text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600"
            ></textarea>
          </div>
          <a
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button
              style={{ marginBottom: 10 }}
              className="px-8 bg-blue-600 text-white rounded text-base uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6"
              type="button"
            >
              Send Mail
            </button>
          </a>
        </div>
      )}
    </>
  );
}
